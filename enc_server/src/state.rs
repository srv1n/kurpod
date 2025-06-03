use encryption_core::{MetadataMap, VolumeType};
use std::path::PathBuf;

pub struct AppState {
    pub password: String,
    pub blob_path: PathBuf,
    pub metadata: MetadataMap,
    pub derived_key: [u8; 32], // Store the derived key to avoid recalculation
    pub volume_type: VolumeType, // Track which volume is unlocked
}
