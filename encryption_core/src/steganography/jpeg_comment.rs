use super::StegoCarrier;
use anyhow::{anyhow, Result};

/// JPEG steganography carrier that hides data in JPEG comment segments (COM segments).
///
/// JPEG files support comment segments that can contain arbitrary data. Most viewers
/// ignore these segments, making them perfect for steganography. We embed data by:
/// 1. Adding custom COM segments with our marker and payload
/// 2. Ensuring segments don't exceed 65535 bytes (JPEG spec limit)
/// 3. Preserving existing image data and structure
///
/// Structure of embedded data:
/// ```text
/// ... existing JPEG segments ...
/// FF FE <length> KURPODSTEGO <8-byte BE length> <payload chunk>
/// FF FE <length> KURPODSTEGO <8-byte BE length> <payload chunk>
/// ... more segments if needed ...
/// ... rest of JPEG ...
/// ```
pub struct JpegCommentCarrier {
    /// Marker to identify our steganographic data
    marker: &'static [u8; 11], // "KURPODSTEGO"
    /// Maximum payload per comment segment (leave room for marker + length)
    max_segment_payload: usize,
}

impl Default for JpegCommentCarrier {
    fn default() -> Self {
        Self {
            marker: b"KURPODSTEGO",
            // JPEG comment segments can be max 65535 bytes total (including marker)
            // Format: FF FE <2-byte length> <marker> <8-byte length> <payload>
            // So: 65535 - 2 - 11 - 8 = 65514 bytes max payload per segment
            max_segment_payload: 65535 - 2 - 11 - 8,
        }
    }
}

impl JpegCommentCarrier {
    pub fn new() -> Self {
        Self::default()
    }

    /// Validates that the input is a valid JPEG file
    fn validate_jpeg(&self, data: &[u8]) -> Result<()> {
        if data.len() < 4 {
            return Err(anyhow!("Data too short to be a JPEG file"));
        }

        // JPEG files start with FF D8 (SOI - Start of Image)
        if data.len() < 2 || data[0] != 0xFF || data[1] != 0xD8 {
            return Err(anyhow!("Invalid JPEG signature"));
        }

        // Look for End of Image marker (FF D9) somewhere in the file
        if !data.windows(2).any(|w| w == &[0xFF, 0xD9]) {
            return Err(anyhow!("No End of Image marker found"));
        }

        Ok(())
    }

    /// Find all our steganographic comment segments
    fn find_stego_segments(&self, data: &[u8]) -> Vec<(usize, usize)> {
        let mut segments = Vec::new();
        let mut pos = 2; // Skip SOI marker

        while pos + 4 < data.len() {
            if data[pos] != 0xFF {
                pos += 1;
                continue;
            }

            let marker = data[pos + 1];

            // Check for comment segment (COM = 0xFE)
            if marker == 0xFE {
                if pos + 4 < data.len() {
                    let length = u16::from_be_bytes([data[pos + 2], data[pos + 3]]) as usize;
                    let segment_start = pos;
                    let segment_end = pos + 2 + length;

                    if segment_end <= data.len() && length >= self.marker.len() + 8 {
                        // Check if this segment contains our marker
                        let payload_start = pos + 4;
                        if payload_start + self.marker.len() <= data.len()
                            && &data[payload_start..payload_start + self.marker.len()]
                                == self.marker
                        {
                            segments.push((segment_start, segment_end));
                        }
                    }

                    pos = segment_end;
                } else {
                    break;
                }
            } else {
                // Skip other segments
                if pos + 4 < data.len() {
                    let length = u16::from_be_bytes([data[pos + 2], data[pos + 3]]) as usize;
                    pos += 2 + length;
                } else {
                    break;
                }
            }
        }

        segments
    }

    /// Extract payload from steganographic segments
    fn extract_payload_from_segments(
        &self,
        data: &[u8],
        segments: &[(usize, usize)],
    ) -> Option<Vec<u8>> {
        let mut payload = Vec::new();

        for &(start, end) in segments {
            if start + 4 + self.marker.len() + 8 >= end {
                continue; // Invalid segment
            }

            let payload_len_start = start + 4 + self.marker.len();
            let mut len_bytes = [0u8; 8];
            len_bytes.copy_from_slice(&data[payload_len_start..payload_len_start + 8]);
            let chunk_len = u64::from_be_bytes(len_bytes) as usize;

            let chunk_start = payload_len_start + 8;
            let chunk_end = chunk_start + chunk_len;

            if chunk_end <= end {
                payload.extend_from_slice(&data[chunk_start..chunk_end]);
            }
        }

        if payload.is_empty() {
            None
        } else {
            Some(payload)
        }
    }

    /// Remove existing steganographic segments
    fn strip_existing_segments(&self, data: &[u8]) -> Vec<u8> {
        let segments = self.find_stego_segments(data);
        if segments.is_empty() {
            return data.to_vec();
        }

        let mut result = Vec::new();
        let mut last_end = 0;

        for &(start, end) in &segments {
            // Copy data between segments
            result.extend_from_slice(&data[last_end..start]);
            last_end = end;
        }

        // Copy remaining data
        if last_end < data.len() {
            result.extend_from_slice(&data[last_end..]);
        }

        result
    }

    /// Split payload into chunks that fit in comment segments
    fn split_payload(&self, payload: &[u8]) -> Vec<Vec<u8>> {
        payload
            .chunks(self.max_segment_payload)
            .map(|chunk| chunk.to_vec())
            .collect()
    }

    /// Embed payload chunks into JPEG file
    fn embed_segments(&self, jpeg_data: &[u8], payload_chunks: &[Vec<u8>]) -> Result<Vec<u8>> {
        // Find a good place to insert our segments - after SOI but before SOS (Start of Scan)
        let mut insert_pos = 2; // After SOI marker
        let mut pos = 2;

        // Look for a good insertion point (before image data)
        while pos + 4 < jpeg_data.len() {
            if jpeg_data[pos] != 0xFF {
                pos += 1;
                continue;
            }

            let marker = jpeg_data[pos + 1];

            // Stop before Start of Scan (image data begins)
            if marker == 0xDA {
                insert_pos = pos;
                break;
            }

            // Skip this segment
            if pos + 4 < jpeg_data.len() {
                let length = u16::from_be_bytes([jpeg_data[pos + 2], jpeg_data[pos + 3]]) as usize;
                pos += 2 + length;
                insert_pos = pos;
            } else {
                break;
            }
        }

        let mut result = Vec::new();

        // Copy data up to insertion point
        result.extend_from_slice(&jpeg_data[..insert_pos]);

        // Add our comment segments
        for chunk in payload_chunks {
            // COM segment: FF FE <length> <marker> <chunk_length> <chunk_data>
            result.push(0xFF);
            result.push(0xFE);

            // JPEG length field includes the length field itself (2 bytes) plus all payload
            let segment_payload_len = 2 + self.marker.len() + 8 + chunk.len();
            let total_len = segment_payload_len as u16;
            result.extend_from_slice(&total_len.to_be_bytes());

            result.extend_from_slice(self.marker);
            result.extend_from_slice(&(chunk.len() as u64).to_be_bytes());
            result.extend_from_slice(chunk);
        }

        // Copy remaining JPEG data
        result.extend_from_slice(&jpeg_data[insert_pos..]);

        Ok(result)
    }
}

impl StegoCarrier for JpegCommentCarrier {
    fn capacity(&self, carrier_bytes: &[u8]) -> usize {
        // Conservative estimate: allow multiple comment segments
        // Each segment can hold ~65KB, allow up to 100 segments = ~6.5MB
        if self.validate_jpeg(carrier_bytes).is_ok() {
            100 * self.max_segment_payload // ~6.5 MB
        } else {
            0
        }
    }

    fn embed(&self, carrier_bytes: &[u8], payload: &[u8]) -> Result<Vec<u8>> {
        if payload.is_empty() {
            return Ok(carrier_bytes.to_vec());
        }

        self.validate_jpeg(carrier_bytes)?;

        if payload.len() > self.capacity(carrier_bytes) {
            return Err(anyhow!(
                "Payload ({} bytes) exceeds JPEG capacity",
                payload.len()
            ));
        }

        // Remove any existing steganographic data
        let clean_jpeg = self.strip_existing_segments(carrier_bytes);

        // Split payload into chunks
        let chunks = self.split_payload(payload);

        // Embed chunks as comment segments
        self.embed_segments(&clean_jpeg, &chunks)
    }

    fn extract(&self, carrier_bytes: &[u8]) -> Option<Vec<u8>> {
        self.validate_jpeg(carrier_bytes).ok()?;

        let segments = self.find_stego_segments(carrier_bytes);
        if segments.is_empty() {
            return None;
        }

        self.extract_payload_from_segments(carrier_bytes, &segments)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn create_minimal_jpeg() -> Vec<u8> {
        // Minimal JPEG structure with SOI, APP0, and EOI
        let mut jpeg = Vec::new();

        // SOI (Start of Image)
        jpeg.extend_from_slice(&[0xFF, 0xD8]);

        // APP0 segment (JFIF header)
        jpeg.extend_from_slice(&[0xFF, 0xE0]); // APP0 marker
        jpeg.extend_from_slice(&[0x00, 0x10]); // Length: 16 bytes
        jpeg.extend_from_slice(b"JFIF\0"); // JFIF identifier
        jpeg.extend_from_slice(&[0x01, 0x01]); // Version 1.1
        jpeg.extend_from_slice(&[0x00]); // Density units
        jpeg.extend_from_slice(&[0x00, 0x01, 0x00, 0x01]); // X and Y density
        jpeg.extend_from_slice(&[0x00, 0x00]); // Thumbnail dimensions

        // EOI (End of Image)
        jpeg.extend_from_slice(&[0xFF, 0xD9]);

        jpeg
    }

    #[test]
    fn test_jpeg_steganography_basic() {
        let carrier = JpegCommentCarrier::new();
        let jpeg = create_minimal_jpeg();
        let payload = b"Hidden message in JPEG!";

        // Test embedding
        let stego_jpeg = carrier.embed(&jpeg, payload).unwrap();

        // Verify it's still a valid JPEG
        assert!(carrier.validate_jpeg(&stego_jpeg).is_ok());
        assert!(stego_jpeg.starts_with(&[0xFF, 0xD8])); // SOI
        assert!(stego_jpeg.ends_with(&[0xFF, 0xD9])); // EOI

        // Test extraction
        let extracted = carrier.extract(&stego_jpeg).unwrap();
        assert_eq!(extracted, payload);
    }

    #[test]
    fn test_jpeg_validation() {
        let carrier = JpegCommentCarrier::new();

        // Valid JPEG
        let valid_jpeg = create_minimal_jpeg();
        assert!(carrier.validate_jpeg(&valid_jpeg).is_ok());

        // Invalid data
        assert!(carrier.validate_jpeg(b"not a jpeg").is_err());
        assert!(carrier.validate_jpeg(&[0xFF, 0xD8]).is_err()); // Too short
    }
}
