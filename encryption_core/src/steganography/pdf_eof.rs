use super::StegoCarrier;
use anyhow::{anyhow, Result};

/// Steganography carrier that hides data by appending it after the `%%EOF` marker of a PDF file.
///
/// Most PDF readers ignore any extra bytes that appear after the final `%%EOF`, which makes this
/// technique simple yet effective.  We store a small marker, the length of the payload, and then
/// the raw payload bytes.
///
/// File structure after embedding:
///
/// ```text
/// ... existing PDF bytes ...
/// %%EOF\n
/// KURPODSTEGO <8-byte BE length> <payload bytes>
/// ```
///
/// When embedding again we first strip a previous embedded payload (if any) to avoid unbounded
/// growth of the file.
pub struct PdfEofCarrier {
    /// Identifier placed right after the final `%%EOF` that signals where the stego data begins.
    marker: &'static [u8; 11], // "KURPODSTEGO" (without newline)
}

impl Default for PdfEofCarrier {
    fn default() -> Self {
        Self {
            marker: b"KURPODSTEGO",
        }
    }
}

impl PdfEofCarrier {
    pub fn new() -> Self {
        Self::default()
    }

    /// Very small validation that the bytes look like a PDF file.
    fn validate_pdf(&self, data: &[u8]) -> Result<()> {
        if data.len() < 8 {
            return Err(anyhow!("Data too short to be a PDF file"));
        }
        // PDF header is at the very beginning: %PDF-x.y
        if &data[0..5] != b"%PDF-" {
            return Err(anyhow!("Invalid PDF header"));
        }
        // Must contain at least one %%EOF marker
        if !data.windows(5).any(|w| w == b"%%EOF") {
            return Err(anyhow!("No %%EOF marker found"));
        }
        Ok(())
    }

    /// Locate the *last* occurrence of `%%EOF` in the file and return the index of the byte just
    /// after the end of that marker and its terminating newline (if any).
    fn locate_eof(&self, data: &[u8]) -> Option<usize> {
        // look for pattern "%%EOF" starting from the end.
        let pattern = b"%%EOF";
        data.windows(pattern.len())
            .rposition(|w| w == pattern)
            .map(|pos| {
                // Advance past the pattern.
                let mut idx = pos + pattern.len();
                // Skip optional \r or \n characters.
                while idx < data.len() && (data[idx] == b'\n' || data[idx] == b'\r') {
                    idx += 1;
                }
                idx
            })
    }

    /// Remove existing embedded payload (if present).  Returns slice of the original PDF without
    /// our marker/trailing bytes.
    fn strip_existing_payload<'a>(&self, data: &'a [u8]) -> &'a [u8] {
        if let Some(pos) = self.find_marker_start(data) {
            &data[..pos]
        } else {
            data
        }
    }

    /// Find where our marker starts (exact bytes of marker).
    fn find_marker_start(&self, data: &[u8]) -> Option<usize> {
        data.windows(self.marker.len())
            .rposition(|w| w == self.marker)
            .map(|idx| idx)
    }
}

impl StegoCarrier for PdfEofCarrier {
    fn capacity(&self, carrier_bytes: &[u8]) -> usize {
        // Very lenient: allow up to 100 MB if the bytes form a valid PDF.
        self.validate_pdf(carrier_bytes)
            .map(|_| 100 * 1024 * 1024)
            .unwrap_or(0)
    }

    fn embed(&self, carrier_bytes: &[u8], payload: &[u8]) -> Result<Vec<u8>> {
        // Fast-path: no payload, return original bytes.
        if payload.is_empty() {
            return Ok(carrier_bytes.to_vec());
        }

        self.validate_pdf(carrier_bytes)?;
        if payload.len() > self.capacity(carrier_bytes) {
            return Err(anyhow!(
                "Payload ({} bytes) exceeds maximum supported size",
                payload.len()
            ));
        }

        // Remove any previously embedded payload so the file size does not grow indefinitely.
        let clean_pdf = self.strip_existing_payload(carrier_bytes);

        // Locate EOF position on the clean PDF.
        let eof_idx = self
            .locate_eof(clean_pdf)
            .ok_or_else(|| anyhow!("Failed to locate %%EOF marker in PDF"))?;

        // Build resulting vector: up to eof_idx (which includes bytes before payload location)
        let mut result = Vec::with_capacity(clean_pdf.len() + 11 + 8 + payload.len());
        result.extend_from_slice(&clean_pdf[..eof_idx]);

        // Ensure there is at least one newline before we add our marker for cleanliness.
        if eof_idx == 0 || !(clean_pdf[eof_idx - 1] == b'\n' || clean_pdf[eof_idx - 1] == b'\r') {
            result.push(b'\n');
        }

        // Append the marker, 8-byte big-endian length, and payload.
        result.extend_from_slice(self.marker);
        let len_be = (payload.len() as u64).to_be_bytes();
        result.extend_from_slice(&len_be);
        result.extend_from_slice(payload);

        Ok(result)
    }

    fn extract(&self, carrier_bytes: &[u8]) -> Option<Vec<u8>> {
        self.validate_pdf(carrier_bytes).ok()?;
        let marker_pos = self.find_marker_start(carrier_bytes)?;
        let len_start = marker_pos + self.marker.len();
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
