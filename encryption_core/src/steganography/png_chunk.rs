use super::StegoCarrier;
use anyhow::{anyhow, Result};
use std::io::{Cursor, Read};

/// PNG steganography using ancillary chunks
/// Embeds data in custom chunks that are ignored by most PNG viewers
pub struct PngChunkCarrier {
    /// Chunk type used for storing data (4 bytes, ancillary type)
    /// Using 'ruNd' - lowercase 'r' makes it ancillary (safe to ignore)
    chunk_type: [u8; 4],
    /// Maximum size per chunk to avoid suspicion
    max_chunk_size: usize,
}

impl Default for PngChunkCarrier {
    fn default() -> Self {
        Self {
            chunk_type: *b"ruNd",       // Ancillary chunk type
            max_chunk_size: 256 * 1024, // 256 KiB per chunk
        }
    }
}

impl PngChunkCarrier {
    pub fn new() -> Self {
        Self::default()
    }

    /// Validates that the input is a valid PNG file
    fn validate_png(&self, data: &[u8]) -> Result<()> {
        if data.len() < 8 {
            return Err(anyhow!("Data too short to be a PNG file"));
        }

        let png_signature = &[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
        if &data[0..8] != png_signature {
            return Err(anyhow!("Invalid PNG signature"));
        }

        Ok(())
    }

    /// Reads PNG chunks and extracts our custom chunks
    fn extract_custom_chunks(&self, data: &[u8]) -> Result<Vec<Vec<u8>>> {
        self.validate_png(data)?;

        let mut cursor = Cursor::new(data);
        cursor.set_position(8); // Skip PNG signature

        let mut custom_chunks = Vec::new();

        while cursor.position() < data.len() as u64 {
            // Read chunk length
            let mut length_bytes = [0u8; 4];
            if cursor.read_exact(&mut length_bytes).is_err() {
                break; // End of file
            }
            let length = u32::from_be_bytes(length_bytes) as usize;

            // Read chunk type
            let mut type_bytes = [0u8; 4];
            if cursor.read_exact(&mut type_bytes).is_err() {
                break;
            }

            // Read chunk data
            let mut chunk_data = vec![0u8; length];
            if cursor.read_exact(&mut chunk_data).is_err() {
                break;
            }

            // Skip CRC
            let mut crc_bytes = [0u8; 4];
            if cursor.read_exact(&mut crc_bytes).is_err() {
                break;
            }

            // Check if this is our custom chunk
            if type_bytes == self.chunk_type {
                custom_chunks.push(chunk_data);
            }

            // Stop at IEND chunk
            if &type_bytes == b"IEND" {
                break;
            }
        }

        Ok(custom_chunks)
    }

    /// Embeds data chunks into PNG file
    fn embed_custom_chunks(&self, png_data: &[u8], payload_chunks: &[Vec<u8>]) -> Result<Vec<u8>> {
        self.validate_png(png_data)?;

        let mut result = Vec::new();
        let mut cursor = Cursor::new(png_data);

        // Copy PNG signature
        let mut signature = [0u8; 8];
        cursor.read_exact(&mut signature)?;
        result.extend_from_slice(&signature);

        // Copy chunks until we find IDAT (where we'll insert our chunks)
        let mut found_idat = false;

        while cursor.position() < png_data.len() as u64 {
            let chunk_start = cursor.position();

            // Read chunk header
            let mut length_bytes = [0u8; 4];
            if cursor.read_exact(&mut length_bytes).is_err() {
                break;
            }
            let length = u32::from_be_bytes(length_bytes) as usize;

            let mut type_bytes = [0u8; 4];
            if cursor.read_exact(&mut type_bytes).is_err() {
                break;
            }

            // If this is IDAT and we haven't inserted our chunks yet, insert them first
            if &type_bytes == b"IDAT" && !found_idat {
                found_idat = true;

                // Insert our custom chunks before IDAT
                for chunk_data in payload_chunks {
                    self.write_chunk(&mut result, &self.chunk_type, chunk_data)?;
                }
            }

            // Copy the original chunk
            cursor.set_position(chunk_start);
            let chunk_size = 4 + 4 + length + 4; // length + type + data + crc
            let mut chunk_bytes = vec![0u8; chunk_size];
            cursor.read_exact(&mut chunk_bytes)?;
            result.extend_from_slice(&chunk_bytes);

            // Stop at IEND
            if &type_bytes == b"IEND" {
                break;
            }
        }

        Ok(result)
    }

    /// Writes a PNG chunk with proper CRC
    fn write_chunk(&self, writer: &mut Vec<u8>, chunk_type: &[u8; 4], data: &[u8]) -> Result<()> {
        // Write length
        writer.extend_from_slice(&(data.len() as u32).to_be_bytes());

        // Write type
        writer.extend_from_slice(chunk_type);

        // Write data
        writer.extend_from_slice(data);

        // Calculate and write CRC
        let crc = self.calculate_crc(chunk_type, data);
        writer.extend_from_slice(&crc.to_be_bytes());

        Ok(())
    }

    /// Calculate CRC32 for PNG chunk (type + data)
    fn calculate_crc(&self, chunk_type: &[u8; 4], data: &[u8]) -> u32 {
        let mut hasher = crc32fast::Hasher::new();
        hasher.update(chunk_type);
        hasher.update(data);
        hasher.finalize()
    }

    /// Split payload into chunks of maximum size
    fn split_payload(&self, payload: &[u8]) -> Vec<Vec<u8>> {
        payload
            .chunks(self.max_chunk_size)
            .map(|chunk| chunk.to_vec())
            .collect()
    }
}

impl StegoCarrier for PngChunkCarrier {
    fn capacity(&self, carrier_bytes: &[u8]) -> usize {
        // PNG can theoretically hold unlimited data in ancillary chunks
        // We'll be conservative and say 100MB to avoid suspicion
        if self.validate_png(carrier_bytes).is_ok() {
            100 * 1024 * 1024 // 100 MB
        } else {
            0
        }
    }

    fn embed(&self, carrier_bytes: &[u8], payload: &[u8]) -> Result<Vec<u8>> {
        if payload.is_empty() {
            return Ok(carrier_bytes.to_vec());
        }

        // Split payload into manageable chunks
        let payload_chunks = self.split_payload(payload);

        // Embed the chunks
        self.embed_custom_chunks(carrier_bytes, &payload_chunks)
    }

    fn extract(&self, carrier_bytes: &[u8]) -> Option<Vec<u8>> {
        // Extract all custom chunks
        let chunks = self.extract_custom_chunks(carrier_bytes).ok()?;

        if chunks.is_empty() {
            return None;
        }

        // Concatenate all chunks to reconstruct the payload
        let mut payload = Vec::new();
        for chunk in chunks {
            payload.extend_from_slice(&chunk);
        }

        Some(payload)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_png_chunk_basic() {
        // Create a minimal valid PNG (1x1 pixel, grayscale)
        let minimal_png = create_minimal_png();

        let carrier = PngChunkCarrier::new();
        let payload = b"Hello, steganography!";

        // Test embedding
        let stego_png = carrier.embed(&minimal_png, payload).unwrap();

        // Test extraction
        let extracted = carrier.extract(&stego_png).unwrap();
        assert_eq!(extracted, payload);

        // Verify the PNG is still valid
        assert!(carrier.validate_png(&stego_png).is_ok());
    }

    fn create_minimal_png() -> Vec<u8> {
        // PNG signature
        let mut png_data = vec![0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

        // IHDR chunk (1x1 grayscale)
        let ihdr_data = [
            0x00, 0x00, 0x00, 0x01, // width: 1
            0x00, 0x00, 0x00, 0x01, // height: 1
            0x08, // bit depth: 8
            0x00, // color type: grayscale
            0x00, // compression: deflate
            0x00, // filter: none
            0x00, // interlace: none
        ];

        png_data.extend_from_slice(&(ihdr_data.len() as u32).to_be_bytes());
        png_data.extend_from_slice(b"IHDR");
        png_data.extend_from_slice(&ihdr_data);
        png_data.extend_from_slice(&0x376ef9dbu32.to_be_bytes()); // CRC

        // IDAT chunk (compressed pixel data)
        let idat_data = [0x78, 0x9c, 0x62, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01]; // deflated single grayscale pixel
        png_data.extend_from_slice(&(idat_data.len() as u32).to_be_bytes());
        png_data.extend_from_slice(b"IDAT");
        png_data.extend_from_slice(&idat_data);
        png_data.extend_from_slice(&0x25be6486u32.to_be_bytes()); // CRC

        // IEND chunk
        png_data.extend_from_slice(&0u32.to_be_bytes()); // length: 0
        png_data.extend_from_slice(b"IEND");
        png_data.extend_from_slice(&0xae426082u32.to_be_bytes()); // CRC

        png_data
    }
}
