use super::StegoCarrier;
use anyhow::{anyhow, Result};

/// MP4 steganography carrier that hides data in a custom `free` box that
/// is appended to the file. MP4 players ignore `free` boxes, so this is a
/// convenient place to smuggle bytes without affecting playback.
///
/// Structure of the appended box:
/// ```text
/// <4-byte size> "free" KURPODSTEGO <8-byte big-endian length> <payload bytes>
/// ```
///
/// When embedding again we first remove any previously inserted stego box so
/// file size does not grow without bound.
///
/// This implementation purposely keeps the parser extremely small – it only
/// validates that the file starts with a valid `ftyp` box and searches for our
/// marker when extracting / stripping.
pub struct Mp4FreeBoxCarrier {
    /// Marker that uniquely identifies our stego box contents.
    marker: &'static [u8; 11], // "KURPODSTEGO"
                               // No size limit is enforced here; the practical limit is the 4 GiB box size in the MP4/ISOBMFF spec.
}

impl Default for Mp4FreeBoxCarrier {
    fn default() -> Self {
        Self {
            marker: b"KURPODSTEGO",
        }
    }
}

impl Mp4FreeBoxCarrier {
    pub fn new() -> Self {
        Self::default()
    }

    /// Very lightweight MP4 validation – we simply confirm that the second
    /// box in the file is an `ftyp` box. (The first 4 bytes are the size, then
    /// comes the 4-char box type.)
    fn validate_mp4(&self, data: &[u8]) -> Result<()> {
        if data.len() < 12 {
            return Err(anyhow!("Data too short to be an MP4 file"));
        }
        // In most MP4 files the first box is `ftyp`, but some tools add a
        //  small "free" or similar box before it.  As a compromise we just
        //  look for the ASCII string "ftyp" within the first 1 KiB.
        const SEARCH_LIMIT: usize = 1024;
        let haystack = if data.len() < SEARCH_LIMIT {
            data
        } else {
            &data[..SEARCH_LIMIT]
        };
        if !haystack.windows(4).any(|w| w == b"ftyp") {
            return Err(anyhow!("Missing ftyp box – not a valid MP4/ISOBMFF file"));
        }
        Ok(())
    }

    /// Search for our marker in the byte slice and return its index, or None
    /// if not found.
    fn find_marker(&self, data: &[u8]) -> Option<usize> {
        data.windows(self.marker.len())
            .position(|w| w == self.marker)
    }

    /// Remove a previously embedded stego `free` box (if any) and return the
    /// cleaned bytes. If no payload is present the original bytes are cloned
    /// into a new `Vec`.
    fn strip_existing_payload(&self, data: &[u8]) -> Vec<u8> {
        if let Some(marker_idx) = self.find_marker(data) {
            // Our marker lives **inside** the box. The box header is 8 bytes
            // (size + type) immediately *before* the marker.
            if marker_idx < 8 {
                // Not enough bytes – malformed – just return copy of original.
                return data.to_vec();
            }
            let box_start = marker_idx - 8;
            // Read size from the header.
            let mut size_bytes = [0u8; 4];
            size_bytes.copy_from_slice(&data[box_start..box_start + 4]);
            let box_size = u32::from_be_bytes(size_bytes) as usize;
            // Sanity-check the size – it must encompass the marker and remain in bounds.
            if box_start + box_size > data.len() {
                return data.to_vec(); // malformed – ignore
            }
            // Build vector without the stego box.
            let mut result = Vec::with_capacity(data.len() - box_size);
            result.extend_from_slice(&data[..box_start]);
            result.extend_from_slice(&data[box_start + box_size..]);
            return result;
        }
        // No marker – return original bytes.
        data.to_vec()
    }

    /// Create the bytes for a `free` box holding the provided payload.
    fn build_free_box(&self, payload: &[u8]) -> Result<Vec<u8>> {
        // Total box size = 8-byte header + marker + 8-byte length + payload.
        let total_size = 8 + self.marker.len() + 8 + payload.len();
        if total_size > u32::MAX as usize {
            return Err(anyhow!("Payload too large for MP4 free box"));
        }
        let mut box_bytes = Vec::with_capacity(total_size);
        box_bytes.extend_from_slice(&(total_size as u32).to_be_bytes());
        box_bytes.extend_from_slice(b"free");
        box_bytes.extend_from_slice(self.marker);
        box_bytes.extend_from_slice(&(payload.len() as u64).to_be_bytes());
        box_bytes.extend_from_slice(payload);
        Ok(box_bytes)
    }
}

impl StegoCarrier for Mp4FreeBoxCarrier {
    fn capacity(&self, carrier_bytes: &[u8]) -> usize {
        self.validate_mp4(carrier_bytes)
            .map(|_| (u32::MAX as usize) - 8 - self.marker.len() - 8)
            .unwrap_or(0)
    }

    fn embed(&self, carrier_bytes: &[u8], payload: &[u8]) -> Result<Vec<u8>> {
        // If no payload provided, return original.
        if payload.is_empty() {
            return Ok(carrier_bytes.to_vec());
        }

        // Validate carrier and capacity.
        self.validate_mp4(carrier_bytes)?;
        if payload.len() > self.capacity(carrier_bytes) {
            return Err(anyhow!(
                "Payload ({} bytes) exceeds MP4 capacity",
                payload.len()
            ));
        }

        // Strip previous payload (if any).
        let mut clean_mp4 = self.strip_existing_payload(carrier_bytes);

        // Build new free box and append to file.
        let free_box = self.build_free_box(payload)?;
        clean_mp4.extend_from_slice(&free_box);

        Ok(clean_mp4)
    }

    fn extract(&self, carrier_bytes: &[u8]) -> Option<Vec<u8>> {
        self.validate_mp4(carrier_bytes).ok()?;

        let marker_idx = self.find_marker(carrier_bytes)?;
        let len_start = marker_idx + self.marker.len();
        if len_start + 8 > carrier_bytes.len() {
            return None;
        }
        let mut len_bytes = [0u8; 8];
        len_bytes.copy_from_slice(&carrier_bytes[len_start..len_start + 8]);
        let payload_len = u64::from_be_bytes(len_bytes) as usize;
        let payload_start = len_start + 8;
        if payload_start + payload_len > carrier_bytes.len() {
            return None;
        }
        Some(carrier_bytes[payload_start..payload_start + payload_len].to_vec())
    }
}
