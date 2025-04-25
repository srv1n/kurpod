use crate::blob::{MetadataMap, FileMetadata};
use std::path::PathBuf;
use std::collections::HashMap;

pub struct AppState {
    pub password: String,
    pub blob_path: PathBuf,
    pub metadata: MetadataMap,
    pub derived_key: [u8; 32], // Store the derived key to avoid recalculation
}
