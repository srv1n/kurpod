use anyhow::Result;

/// Trait for hiding data within various file formats
pub trait StegoCarrier {
    /// Returns how many payload bytes can fit in the carrier
    fn capacity(&self, carrier_bytes: &[u8]) -> usize;

    /// Returns new bytes with payload embedded
    fn embed(&self, carrier_bytes: &[u8], payload: &[u8]) -> Result<Vec<u8>>;

    /// Extracts payload or None if not present
    fn extract(&self, carrier_bytes: &[u8]) -> Option<Vec<u8>>;
}

pub mod jpeg_comment;
pub mod mp4_free_box;
pub mod pdf_eof;
pub mod png_chunk;
