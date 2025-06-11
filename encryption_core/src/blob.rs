use anyhow::{anyhow, Result};
use argon2::{Argon2, Params};
use chacha20poly1305::{
    aead::{Aead, AeadCore, KeyInit},
    Key, XChaCha20Poly1305, XNonce,
};
use log::{error, info, warn};
use rand::rngs::OsRng;
use rand::RngCore;
use serde::{Deserialize, Serialize}; // Make sure 'serde' features = ["derive"] is in Cargo.toml
use std::{
    collections::HashMap,
    fs::{self, File, OpenOptions},
    io::{Read, Seek, SeekFrom, Write},
    path::Path,
};

// --- Constants ---
const MAGIC: &[u8] = b"ENC_BLOB";
const VERSION: u8 = 3; // Version indicating hidden volume support
const SALT_LEN: usize = 16;
pub const XNONCE_LEN: usize = 24; // For XChaCha20Poly1305

// --- Offsets and lengths ---
const HEADER_COMMON_LEN: usize = MAGIC.len() + 1; // Magic + Version byte
const STANDARD_HEADER_LEN: usize = HEADER_COMMON_LEN + SALT_LEN + XNONCE_LEN + 8; // Common + Salt_S + MetaNonce_S + MetaSize_S
const HIDDEN_HEADER_LEN: usize = SALT_LEN + XNONCE_LEN + 8; // Salt_H + MetaNonce_H + MetaSize_H

const STANDARD_METADATA_OFFSET: u64 = STANDARD_HEADER_LEN as u64;
const HIDDEN_HEADER_OFFSET: u64 = 65536; // Standard 64 KiB offset for hidden header
const HIDDEN_METADATA_OFFSET: u64 = HIDDEN_HEADER_OFFSET + HIDDEN_HEADER_LEN as u64;
// Ensure data area starts well after potential hidden metadata block, allowing space for it
const DATA_AREA_START_OFFSET: u64 = HIDDEN_METADATA_OFFSET + 1024 * 1024; // Start data 1MB after hidden meta starts

// --- Core Public Structs & Enums ---

/// Identifies which volume (Standard/Decoy or Hidden) is currently active.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum VolumeType {
    Standard,
    Hidden,
}

/// Represents metadata for a single file stored within the blob.
/// This is stored in the encrypted metadata block.
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FileMetadata {
    /// Original size of the file content in bytes.
    pub size: u64,
    /// Offset within the blob file where the file's encrypted data block (Nonce + Ciphertext) begins.
    pub data_offset: u64,
    /// Total length of the file's encrypted data block (Nonce + Ciphertext) in bytes.
    pub data_length: u64,
    /// MIME type of the file (e.g., "image/jpeg", "application/pdf"). Used for HTTP responses.
    pub mime_type: String,
}

/// The map holding all file metadata for the currently unlocked volume.
/// The key is the full path string (e.g., "images/cat.jpg", "docs/report.pdf").
/// This map is serialized using `bincode` and encrypted as the metadata block.
pub type MetadataMap = HashMap<String, FileMetadata>;

// --- Internal Header Info Structs ---
// Used temporarily when reading/writing headers
struct StandardHeaderInfo {
    salt: [u8; SALT_LEN],
    nonce: [u8; XNONCE_LEN], // Metadata nonce
    size: u64,               // Metadata size
}
struct HiddenHeaderInfo {
    salt: [u8; SALT_LEN],
    nonce: [u8; XNONCE_LEN], // Metadata nonce
    size: u64,               // Metadata size
}

// --- Cryptographic Functions ---

/// Derives a 32-byte key from a password and salt using Argon2id.
/// Uses recommended parameters: 64 MiB memory, 3 iterations, 1 parallelism.
fn derive_key(password: &str, salt: &[u8]) -> Result<[u8; 32]> {
    let params =
        Params::new(65536, 3, 1, None).map_err(|e| anyhow!("argon2 params error: {}", e))?;
    let argon2 = Argon2::new(argon2::Algorithm::Argon2id, argon2::Version::V0x13, params);
    let mut key = [0u8; 32];
    argon2
        .hash_password_into(password.as_bytes(), salt, &mut key)
        .map_err(|e| anyhow!("argon2 hash error: {}", e))?;
    Ok(key)
}

/// Helper to get an AEAD cipher instance (XChaCha20-Poly1305).
fn get_cipher(key: &[u8; 32]) -> XChaCha20Poly1305 {
    XChaCha20Poly1305::new(Key::from_slice(key))
}

// --- Low-Level Header I/O ---

/// Reads the standard header section from the beginning of the file.
fn read_standard_header(file: &mut File) -> Result<StandardHeaderInfo> {
    file.seek(SeekFrom::Start(0))?;
    // Verify Magic Bytes
    let mut magic = [0u8; MAGIC.len()];
    file.read_exact(&mut magic)?;
    if magic != *MAGIC {
        return Err(anyhow!("Invalid blob format"));
    }
    // Verify Version
    let mut ver = [0u8; 1];
    file.read_exact(&mut ver)?;
    if ver[0] != VERSION {
        return Err(anyhow!("Unsupported blob version (requires v{})", VERSION));
    }
    // Read Standard Header fields
    let mut salt = [0u8; SALT_LEN];
    file.read_exact(&mut salt)?;
    let mut nonce = [0u8; XNONCE_LEN];
    file.read_exact(&mut nonce)?;
    let mut size_bytes = [0u8; 8];
    file.read_exact(&mut size_bytes)?;
    let size = u64::from_le_bytes(size_bytes);
    Ok(StandardHeaderInfo { salt, nonce, size })
}

/// Reads the hidden header section from its fixed offset.
fn read_hidden_header(file: &mut File) -> Result<HiddenHeaderInfo> {
    file.seek(SeekFrom::Start(HIDDEN_HEADER_OFFSET))?;
    // Read Hidden Header fields
    let mut salt = [0u8; SALT_LEN];
    file.read_exact(&mut salt)?;
    let mut nonce = [0u8; XNONCE_LEN];
    file.read_exact(&mut nonce)?;
    let mut size_bytes = [0u8; 8];
    file.read_exact(&mut size_bytes)?;
    let size = u64::from_le_bytes(size_bytes);
    Ok(HiddenHeaderInfo { salt, nonce, size })
}

/// Writes the *entire* standard header (Magic, Version, Salt, Nonce, Size). Used during init.
fn write_full_standard_header(file: &mut File, header: &StandardHeaderInfo) -> Result<()> {
    file.seek(SeekFrom::Start(0))?;
    file.write_all(MAGIC)?;
    file.write_all(&[VERSION])?;
    file.write_all(&header.salt)?;
    file.write_all(&header.nonce)?;
    file.write_all(&header.size.to_le_bytes())?;
    file.sync_data()?; // Ensure this header write is flushed
    Ok(())
}

/// Writes the *entire* hidden header (Salt, Nonce, Size) at its fixed offset. Used during init.
fn write_full_hidden_header(file: &mut File, header: &HiddenHeaderInfo) -> Result<()> {
    file.seek(SeekFrom::Start(HIDDEN_HEADER_OFFSET))?;
    file.write_all(&header.salt)?;
    file.write_all(&header.nonce)?;
    file.write_all(&header.size.to_le_bytes())?;
    file.sync_data()?; // Ensure this header write is flushed
    Ok(())
}

/// Updates only the metadata nonce and size fields within an *existing* header block.
fn update_header_metadata(
    file: &mut File,
    volume_type: VolumeType,
    nonce: &[u8; XNONCE_LEN],
    size: u64,
) -> Result<()> {
    let offset = match volume_type {
        VolumeType::Standard => (HEADER_COMMON_LEN + SALT_LEN) as u64, // Offset after Magic+Ver+Salt_S
        VolumeType::Hidden => HIDDEN_HEADER_OFFSET + SALT_LEN as u64,  // Offset after Salt_H
    };
    file.seek(SeekFrom::Start(offset))?;
    file.write_all(nonce)?; // Write new metadata nonce
    file.write_all(&size.to_le_bytes())?; // Write new metadata size
    Ok(())
}

// --- Low-Level Metadata Block I/O ---

/// Reads and decrypts the metadata block for a given volume.
fn read_metadata_block(
    file: &mut File,
    key: &[u8; 32],
    nonce: &[u8; XNONCE_LEN],
    size: u64,
    offset: u64,
) -> Result<MetadataMap> {
    // Added Logging
    info!(
        "Attempting read_metadata_block: Offset={}, Size={}, Nonce starts with: {:x?}",
        offset,
        size,
        &nonce[..4]
    );

    // Handle case where volume might be empty (size 0) during initial load
    if size == 0 {
        info!("Metadata size is 0, returning empty map.");
        return Ok(MetadataMap::new());
    }
    // Basic sanity check for size
    if size > 50 * 1024 * 1024 {
        // e.g., 50 MiB limit for metadata
        error!(
            "Metadata block size {} at offset {} is excessively large. Aborting read.",
            size, offset
        );
        return Err(anyhow!("metadata block size too large"));
    }

    if let Err(e) = file.seek(SeekFrom::Start(offset)) {
        error!("Failed to seek to metadata offset {}: {}", offset, e);
        return Err(anyhow!("seek to metadata offset failed: {}", e));
    }
    info!("Seeked to offset {} successfully.", offset);

    let mut encrypted_metadata = vec![0u8; size as usize];
    if let Err(e) = file.read_exact(&mut encrypted_metadata) {
        error!(
            "Failed to read exactly {} bytes for metadata at offset {}: {}",
            size, offset, e
        );
        // Consider logging file size here: let file_len = file.seek(SeekFrom::End(0)).unwrap_or(0); info!("File size: {}", file_len);
        return Err(anyhow!("read metadata failed: {}", e));
    }
    info!(
        "Read {} encrypted bytes successfully for metadata.",
        encrypted_metadata.len()
    );

    let cipher = get_cipher(key);
    let nonce_obj = XNonce::from_slice(nonce);

    // Decrypt
    match cipher.decrypt(nonce_obj, encrypted_metadata.as_ref()) {
        Ok(plaintext) => {
            info!(
                "AEAD decryption successful for offset {}. Plaintext size: {}",
                offset,
                plaintext.len()
            );
            // Deserialize
            match bincode::deserialize(&plaintext) {
                Ok(map) => {
                    info!("Bincode deserialization successful for offset {}.", offset);
                    Ok(map)
                }
                Err(e) => {
                    error!(
                        "Bincode deserialization FAILED for offset {}: {}",
                        offset, e
                    );
                    Err(anyhow!("metadata deserialization failed: {}", e))
                }
            }
        }
        Err(aead_err) => {
            // Capture AEAD error if needed, though it's often opaque
            error!(
                "AEAD decryption FAILED for offset {}. AEAD Error: {:?}",
                offset, aead_err
            );
            Err(anyhow!("metadata decryption failed")) // Keep generic API error
        }
    }
}

/// Encrypts and writes the metadata map to the specified offset. Returns the new (nonce, size).
fn write_metadata_block(
    file: &mut File,
    key: &[u8; 32],
    map: &MetadataMap,
    offset: u64,
) -> Result<([u8; XNONCE_LEN], u64)> {
    // Serialize the map using bincode
    let plaintext = bincode::serialize(map)?;

    // Encrypt the serialized data
    let cipher = get_cipher(key);
    let nonce = XChaCha20Poly1305::generate_nonce(&mut OsRng); // Generate a fresh random nonce
    let ciphertext = cipher
        .encrypt(&nonce, plaintext.as_ref())
        .map_err(|e| anyhow!("metadata encryption failed: {}", e))?;

    // Write the encrypted block to the specified offset
    file.seek(SeekFrom::Start(offset))?;
    file.write_all(&ciphertext)?;
    // Note: This overwrites. If the new block is smaller, old data might remain after it.
    // Consider f.set_len() if precise cleanup is needed, but overwrite is generally safe.
    file.sync_data()?; // Ensure metadata block write is flushed to disk

    // Return the nonce used and the size of the ciphertext written
    let mut nonce_bytes = [0u8; XNONCE_LEN];
    nonce_bytes.copy_from_slice(nonce.as_slice());
    Ok((nonce_bytes, ciphertext.len() as u64))
}

// --- Low-Level File Data Block I/O ---

/// Encrypts content and appends it (with its nonce) to the end of the data area.
/// Returns metadata describing the location and size of the written block.
fn append_file_data(
    file: &mut File,
    key: &[u8; 32],
    content: &[u8],
    mime_type: &str,
) -> Result<FileMetadata> {
    // Seek to the current end of the file
    let mut current_offset = file.seek(SeekFrom::End(0))?;

    // Pad with random data if the file end is before the designated data start area
    // This ensures headers/metadata aren't overwritten and data starts at a known point.
    if current_offset < DATA_AREA_START_OFFSET {
        let padding_size = (DATA_AREA_START_OFFSET - current_offset) as usize;
        let mut padding = vec![0u8; padding_size];
        OsRng.fill_bytes(&mut padding); // Use cryptographically secure random padding
        file.write_all(&padding)?;
        current_offset = DATA_AREA_START_OFFSET; // Update offset to the actual start of data area
    }

    let data_offset = current_offset; // This is where the Nonce + Ciphertext block will start

    // Encrypt the file content
    let cipher = get_cipher(key);
    let nonce = XChaCha20Poly1305::generate_nonce(&mut OsRng); // Fresh random nonce for this file block
    let ciphertext = cipher
        .encrypt(&nonce, content)
        .map_err(|e| anyhow!("file data encryption failed: {}", e))?;

    // Write the Nonce first, then the Ciphertext
    file.write_all(nonce.as_slice())?;
    file.write_all(&ciphertext)?;
    file.sync_data()?; // Ensure file data block write is flushed to disk

    // Create metadata describing the block just written
    Ok(FileMetadata {
        size: content.len() as u64, // Original content size
        data_offset,                // Starting offset of Nonce+Ciphertext
        data_length: (XNONCE_LEN as u64) + (ciphertext.len() as u64), // Total length (Nonce + CT)
        mime_type: mime_type.to_string(),
    })
}

/// Reads and decrypts a file's data block given its metadata.
fn read_file_data(file: &mut File, key: &[u8; 32], metadata: &FileMetadata) -> Result<Vec<u8>> {
    // Seek to the start of the data block (where the nonce is)
    file.seek(SeekFrom::Start(metadata.data_offset))?;

    // Read the Nonce (which is stored prepended to the ciphertext)
    let mut nonce_bytes = [0u8; XNONCE_LEN];
    file.read_exact(&mut nonce_bytes)?;

    // Read the Ciphertext that follows the nonce
    let ciphertext_len = metadata.data_length - XNONCE_LEN as u64;
    let mut ciphertext = vec![0u8; ciphertext_len as usize];
    file.read_exact(&mut ciphertext)?;

    // Decrypt using the key and the nonce read from the file
    let cipher = get_cipher(key);
    let nonce = XNonce::from_slice(&nonce_bytes);
    cipher
        .decrypt(nonce, ciphertext.as_ref())
        .map_err(|e| anyhow!("file data decryption failed: {}", e))
}

// --- Public High-Level API Functions ---

/// Initializes a new blob file at the given path.
/// Creates both a standard (decoy) volume and a hidden volume.
/// Requires two distinct passwords. Fills padding with random data.
///
/// # Arguments
/// * `path` - Path where the new blob file will be created.
/// * `password_s` - Password for the standard (decoy) volume.
/// * `password_h` - Password for the hidden volume.
///
/// # Errors
/// Returns an error if passwords are the same, or if file I/O or crypto operations fail.
pub fn init_blob(path: &Path, password_s: &str, password_h: &str) -> Result<()> {
    if password_s == password_h {
        return Err(anyhow!("Standard and hidden passwords must be different"));
    }

    // 1. Generate distinct salts
    let mut salt_s = [0u8; SALT_LEN];
    OsRng.fill_bytes(&mut salt_s);
    let mut salt_h = [0u8; SALT_LEN];
    loop {
        OsRng.fill_bytes(&mut salt_h);
        if salt_h != salt_s {
            break;
        }
    } // Ensure salts differ

    // 2. Derive keys
    let key_s = derive_key(password_s, &salt_s)?;
    let key_h = derive_key(password_h, &salt_h)?;

    // 3. Create empty metadata maps
    let metadata_s = MetadataMap::new();
    let metadata_h = MetadataMap::new();

    // 4. Create file (overwrite if exists)
    let mut file = File::create(path)?;

    // 5. Write initial empty metadata blocks to get nonces/sizes for headers
    let (meta_nonce_s, meta_size_s) =
        write_metadata_block(&mut file, &key_s, &metadata_s, STANDARD_METADATA_OFFSET)?;
    let (meta_nonce_h, meta_size_h) =
        write_metadata_block(&mut file, &key_h, &metadata_h, HIDDEN_METADATA_OFFSET)?;

    // 6. Write the complete headers
    write_full_standard_header(
        &mut file,
        &StandardHeaderInfo {
            salt: salt_s,
            nonce: meta_nonce_s,
            size: meta_size_s,
        },
    )?;
    write_full_hidden_header(
        &mut file,
        &HiddenHeaderInfo {
            salt: salt_h,
            nonce: meta_nonce_h,
            size: meta_size_h,
        },
    )?;

    // 7. Fill padding between standard metadata end and hidden header start with random data
    let standard_meta_end = STANDARD_METADATA_OFFSET + meta_size_s;
    if standard_meta_end < HIDDEN_HEADER_OFFSET {
        let padding_len = (HIDDEN_HEADER_OFFSET - standard_meta_end) as usize;
        let mut padding = vec![0u8; padding_len];
        OsRng.fill_bytes(&mut padding); // Use cryptographically random padding
        file.seek(SeekFrom::Start(standard_meta_end))?;
        file.write_all(&padding)?;
    }

    // 8. Ensure file size extends at least to the start of the data area
    let current_len = file.seek(SeekFrom::End(0))?;
    if current_len < DATA_AREA_START_OFFSET {
        file.set_len(DATA_AREA_START_OFFSET)?; // Extend file size if needed
    }

    // 9. Sync all changes to disk
    file.sync_all()?;
    Ok(())
}

/// Attempts to unlock an existing blob file using the provided password.
/// Tries to decrypt the standard volume header/metadata first, then the hidden volume.
///
/// # Arguments
/// * `path` - Path to the blob file.
/// * `password` - The password attempt.
///
/// # Returns
/// On success: `Ok((VolumeType, derived_key, metadata_map))` indicating which volume
///             was unlocked, its derived key, and its metadata map.
/// On failure: `Err` if the password doesn't match either volume, the blob is
///             corrupted, or file I/O fails. The error is generic to avoid
///             leaking information about volume existence.
pub fn unlock_blob(path: &Path, password: &str) -> Result<(VolumeType, [u8; 32], MetadataMap)> {
    // Note: In a real app, init logger once at startup
    // let _ = env_logger::try_init();

    info!("Unlock attempt for path: {}", path.display());
    let mut file = File::open(path)
        .map_err(|e| anyhow!("Failed to open blob file {}: {}", path.display(), e))?;

    // --- Attempt 1: Unlock Standard Volume ---
    info!("Attempting Standard Volume unlock.");
    match read_standard_header(&mut file) {
        Ok(header_s) => {
            info!(
                "Standard Header: Nonce starts {:x?}, Size {}",
                &header_s.nonce[..4],
                header_s.size
            );
            match derive_key(password, &header_s.salt) {
                Ok(key_s) => {
                    info!("Derived potential standard key.");
                    match read_metadata_block(
                        &mut file,
                        &key_s,
                        &header_s.nonce,
                        header_s.size,
                        STANDARD_METADATA_OFFSET,
                    ) {
                        Ok(metadata_s) => {
                            info!("Standard volume unlocked successfully!");
                            return Ok((VolumeType::Standard, key_s, metadata_s));
                        }
                        Err(e) => {
                            warn!("Standard metadata decryption failed: {}", e);
                            // Log specific error from read_metadata_block
                        }
                    }
                }
                Err(e) => warn!("Failed to derive standard key: {}", e),
            }
        }
        Err(e) => warn!("Failed to read standard header: {}", e),
    }

    // Reset file position potentially needed if standard read failed mid-way
    if let Err(e) = file.seek(SeekFrom::Start(0)) {
        error!("Failed to seek to start before hidden attempt: {}", e);
        // Decide if this is fatal or recoverable. Let's assume fatal for now.
        return Err(anyhow!("seek failed: {}", e));
    }

    // --- Attempt 2: Unlock Hidden Volume ---
    info!("Attempting Hidden Volume unlock.");
    match read_hidden_header(&mut file) {
        Ok(header_h) => {
            info!(
                "Hidden Header: Salt starts {:x?}, Nonce starts {:x?}, Size {}",
                &header_h.salt[..4],
                &header_h.nonce[..4],
                header_h.size
            );
            match derive_key(password, &header_h.salt) {
                Ok(key_h) => {
                    let mut key_hash = [0u8; 16]; // Example hash
                    key_hash.copy_from_slice(&key_h[..16]);
                    info!(
                        "Derived potential hidden key (hash starts {:x?})",
                        &key_hash[..4]
                    );
                    match read_metadata_block(
                        &mut file,
                        &key_h,
                        &header_h.nonce,
                        header_h.size,
                        HIDDEN_METADATA_OFFSET,
                    ) {
                        Ok(metadata_h) => {
                            info!("Hidden volume unlocked successfully!");
                            return Ok((VolumeType::Hidden, key_h, metadata_h));
                        }
                        Err(e) => {
                            error!("Hidden metadata decryption FAILED: {}", e); // Log specific error
                        }
                    }
                }
                Err(e) => error!("Failed to derive hidden key: {}", e),
            }
        }
        Err(e) => error!("Failed to read hidden header: {}", e),
    }

    // If neither attempt succeeded
    warn!("Unlock failed for both volumes: Invalid password or corrupted blob.");
    Err(anyhow!("Invalid password or corrupted blob"))
}

/// Adds or updates a file within the currently unlocked volume.
/// Appends the encrypted file data and updates the volume's metadata block.
///
/// # Arguments
/// * `path` - Path to the blob file.
/// * `volume_type` - Context: Which volume (`Standard` or `Hidden`) is currently unlocked.
/// * `key` - Context: The derived key for the unlocked volume.
/// * `metadata_map` - Context: A mutable reference to the in-memory metadata map for the unlocked volume.
/// * `file_path` - The full path inside the blob where the file should be stored (e.g., "docs/file.txt").
/// * `content` - The raw byte content of the file to add.
/// * `mime_type` - The MIME type of the file (e.g., "text/plain").
///
/// # Errors
/// Returns an error on file I/O or crypto failures.
pub fn add_file(
    path: &Path,
    volume_type: VolumeType,
    key: &[u8; 32],
    metadata_map: &mut MetadataMap,
    file_path: &str,
    content: &[u8],
    mime_type: &str,
) -> Result<()> {
    // Open file for read/write access
    let mut file = OpenOptions::new().read(true).write(true).open(path)?;

    // 1. Append encrypted file data (Nonce + Ciphertext) to the data area
    let file_metadata = append_file_data(&mut file, key, content, mime_type)?;

    // 2. Add/Update entry in the in-memory metadata map (passed as mutable ref)
    metadata_map.insert(file_path.to_string(), file_metadata);

    // 3. Write the updated metadata map back to the correct block on disk
    let metadata_offset = match volume_type {
        VolumeType::Standard => STANDARD_METADATA_OFFSET,
        VolumeType::Hidden => HIDDEN_METADATA_OFFSET,
    };
    let (new_nonce, new_size) =
        write_metadata_block(&mut file, key, metadata_map, metadata_offset)?;

    // 4. Update the corresponding header (Standard or Hidden) with the new metadata nonce/size
    update_header_metadata(&mut file, volume_type, &new_nonce, new_size)?;

    // 5. Ensure changes are flushed - with enhanced iOS handling
    file.sync_data()?; // Sync after metadata and header updates

    // Additional iOS-specific file handle management
    #[cfg(target_os = "ios")]
    {
        use std::os::unix::fs::MetadataExt;

        // Force close and reopen the file handle to ensure iOS commits changes
        drop(file);

        // Verify the file size has actually changed on disk
        if let Ok(metadata) = std::fs::metadata(path) {
            info!(
                "iOS file verification: blob size on disk is {} bytes",
                metadata.size()
            );
        }

        // Reopen and sync one more time for iOS
        let mut verify_file = OpenOptions::new().read(true).write(true).open(path)?;
        verify_file.sync_all()?;
    }

    #[cfg(not(target_os = "ios"))]
    {
        // Standard platform: just ensure sync_all is called
        file.sync_all()?;
    }

    Ok(())
}

/// Retrieves the decrypted content of a file from the blob.
/// Assumes the correct volume context (key) is provided.
///
/// # Arguments
/// * `path` - Path to the blob file.
/// * `key` - Context: The derived key for the volume containing the file.
/// * `metadata` - The `FileMetadata` entry corresponding to the file to retrieve (obtained from the unlocked `MetadataMap`).
///
/// # Returns
/// `Ok(Vec<u8>)` containing the decrypted file content on success.
/// `Err` on file I/O or decryption failure.
pub fn get_file(path: &Path, key: &[u8; 32], metadata: &FileMetadata) -> Result<Vec<u8>> {
    let mut file = File::open(path)?;
    read_file_data(&mut file, key, metadata)
}

/// Removes a file's entry from the currently unlocked volume's metadata.
/// This makes the file inaccessible but does *not* reclaim the disk space used by its data block (orphaned data).
/// A separate compaction process would be needed to reclaim space.
///
/// # Arguments
/// * `path` - Path to the blob file.
/// * `volume_type` - Context: Which volume is unlocked.
/// * `key` - Context: The derived key for the unlocked volume.
/// * `metadata_map` - Context: Mutable reference to the metadata map.
/// * `file_path` - The full path of the file to remove.
///
/// # Returns
/// `Ok(true)` if the file was found and removed, `Ok(false)` if the file was not found.
/// `Err` on file I/O or crypto failures during metadata update.
pub fn remove_file(
    path: &Path,
    volume_type: VolumeType,
    key: &[u8; 32],
    metadata_map: &mut MetadataMap,
    file_path: &str,
) -> Result<bool> {
    // 1. Try removing the entry from the in-memory map
    if metadata_map.remove(file_path).is_none() {
        return Ok(false); // File not found in this volume's metadata
    }

    // 2. If removed, update the metadata block on disk
    let mut file = OpenOptions::new().read(true).write(true).open(path)?;
    let metadata_offset = match volume_type {
        VolumeType::Standard => STANDARD_METADATA_OFFSET,
        VolumeType::Hidden => HIDDEN_METADATA_OFFSET,
    };
    let (new_nonce, new_size) =
        write_metadata_block(&mut file, key, metadata_map, metadata_offset)?;
    update_header_metadata(&mut file, volume_type, &new_nonce, new_size)?;

    // Enhanced iOS file sync handling
    file.sync_data()?; // Sync after metadata and header updates

    #[cfg(target_os = "ios")]
    {
        use std::os::unix::fs::MetadataExt;

        // Force close and reopen the file handle to ensure iOS commits changes
        drop(file);

        // Verify the file size on disk for iOS
        if let Ok(metadata) = std::fs::metadata(path) {
            info!(
                "iOS file verification after remove: blob size on disk is {} bytes",
                metadata.size()
            );
        }

        // Reopen and sync one more time for iOS
        let mut verify_file = OpenOptions::new().read(true).write(true).open(path)?;
        verify_file.sync_all()?;
    }

    #[cfg(not(target_os = "ios"))]
    {
        file.sync_all()?;
    }

    Ok(true)
}

/// Renames a file within the currently unlocked volume's metadata.
/// This only changes the path (key) in the metadata map. The file's data block remains untouched.
///
/// # Arguments
/// * `path` - Path to the blob file.
/// * `volume_type` - Context: Which volume is unlocked.
/// * `key` - Context: The derived key for the unlocked volume.
/// * `metadata_map` - Context: Mutable reference to the metadata map.
/// * `old_path` - The current full path of the file to rename.
/// * `new_path` - The desired new full path for the file.
///
/// # Returns
/// `Ok(true)` if the rename was successful, `Ok(false)` if the `old_path` was not found.
/// `Err` if the `new_path` already exists (optional check, currently allows overwrite logic via remove/insert)
/// or on file I/O or crypto failures during metadata update.
pub fn rename_file(
    path: &Path,
    volume_type: VolumeType,
    key: &[u8; 32],
    metadata_map: &mut MetadataMap,
    old_path: &str,
    new_path: &str,
) -> Result<bool> {
    // 1. Try removing the old entry, getting its metadata
    if let Some(file_metadata) = metadata_map.remove(old_path) {
        // 2. Insert the metadata back with the new path key
        // This implicitly handles overwriting new_path if it exists, adjust if needed.
        metadata_map.insert(new_path.to_string(), file_metadata);

        // 3. Update the metadata block on disk
        let mut file = OpenOptions::new().read(true).write(true).open(path)?;
        let metadata_offset = match volume_type {
            VolumeType::Standard => STANDARD_METADATA_OFFSET,
            VolumeType::Hidden => HIDDEN_METADATA_OFFSET,
        };
        let (new_nonce, new_size) =
            write_metadata_block(&mut file, key, metadata_map, metadata_offset)?;
        update_header_metadata(&mut file, volume_type, &new_nonce, new_size)?;

        // Enhanced iOS file sync handling
        file.sync_data()?;

        #[cfg(target_os = "ios")]
        {
            use std::os::unix::fs::MetadataExt;

            // Force close and reopen the file handle to ensure iOS commits changes
            drop(file);

            // Verify the file size on disk for iOS
            if let Ok(metadata) = std::fs::metadata(path) {
                info!(
                    "iOS file verification after rename: blob size on disk is {} bytes",
                    metadata.size()
                );
            }

            // Reopen and sync one more time for iOS
            let mut verify_file = OpenOptions::new().read(true).write(true).open(path)?;
            verify_file.sync_all()?;
        }

        #[cfg(not(target_os = "ios"))]
        {
            file.sync_all()?;
        }

        return Ok(true); // Rename successful
    }
    Ok(false) // Old path not found
}

/// Removes a folder and all files/subfolders within it from the currently unlocked volume's metadata.
/// Uses prefix matching on the file paths stored in the metadata map.
/// Like `remove_file`, this orphans the data blocks without reclaiming space.
///
/// # Arguments
/// * `path` - Path to the blob file.
/// * `volume_type` - Context: Which volume is unlocked.
/// * `key` - Context: The derived key for the unlocked volume.
/// * `metadata_map` - Context: Mutable reference to the metadata map.
/// * `folder_path` - The path of the folder to remove (e.g., "documents/work"). Trailing slash is optional.
///
/// # Returns
/// `Ok(true)` if at least one entry was removed, `Ok(false)` if no matching entries were found.
/// `Err` on file I/O or crypto failures during metadata update.
pub fn remove_folder(
    path: &Path,
    volume_type: VolumeType,
    key: &[u8; 32],
    metadata_map: &mut MetadataMap,
    folder_path: &str,
) -> Result<bool> {
    // Ensure folder path format for prefix matching (e.g., "documents/work/")
    let prefix = if folder_path.is_empty() {
        // Handle removing root content if needed? Risky.
        "".to_string() // Or return error? Current logic allows removing everything if "" passed.
    } else if folder_path.ends_with('/') {
        folder_path.to_string()
    } else {
        format!("{}/", folder_path) // Append slash for prefix matching
    };

    // Handle removing just the folder entry itself if it's treated as a file/entry somehow
    let path_itself = folder_path.trim_end_matches('/');

    // 1. Find all keys matching the exact folder path or starting with the prefix
    let keys_to_remove: Vec<String> = metadata_map
        .keys()
        .filter(|k| k == &path_itself || (!prefix.is_empty() && k.starts_with(&prefix)))
        .cloned()
        .collect();

    if keys_to_remove.is_empty() {
        return Ok(false); // Folder or contents not found
    }

    // 2. Remove the collected keys from the in-memory map
    for key_to_remove in &keys_to_remove {
        // Use reference here
        metadata_map.remove(key_to_remove);
    }

    // 3. Update the metadata block on disk
    let mut file = OpenOptions::new().read(true).write(true).open(path)?;
    let metadata_offset = match volume_type {
        VolumeType::Standard => STANDARD_METADATA_OFFSET,
        VolumeType::Hidden => HIDDEN_METADATA_OFFSET,
    };
    let (new_nonce, new_size) =
        write_metadata_block(&mut file, key, metadata_map, metadata_offset)?;
    update_header_metadata(&mut file, volume_type, &new_nonce, new_size)?;

    // Enhanced iOS file sync handling
    file.sync_data()?; // Sync after metadata and header updates

    #[cfg(target_os = "ios")]
    {
        use std::os::unix::fs::MetadataExt;

        // Force close and reopen the file handle to ensure iOS commits changes
        drop(file);

        // Verify the file size on disk for iOS
        if let Ok(metadata) = std::fs::metadata(path) {
            info!(
                "iOS file verification after remove folder: blob size on disk is {} bytes",
                metadata.size()
            );
        }

        // Reopen and sync one more time for iOS
        let mut verify_file = OpenOptions::new().read(true).write(true).open(path)?;
        verify_file.sync_all()?;
    }

    #[cfg(not(target_os = "ios"))]
    {
        file.sync_all()?;
    }

    Ok(true)
}

pub fn compact_blob(path: &Path, password_s: &str, password_h: &str) -> Result<()> {
    // 1. Open the existing blob and read headers for both volumes
    let mut file = File::open(path)?;
    let header_s = read_standard_header(&mut file)?;
    let header_h = read_hidden_header(&mut file)?;

    // 2. Derive the old keys and read metadata blocks
    let key_s_old = derive_key(password_s, &header_s.salt)?;
    let metadata_s = read_metadata_block(
        &mut file,
        &key_s_old,
        &header_s.nonce,
        header_s.size,
        STANDARD_METADATA_OFFSET,
    )?;

    let key_h_old = derive_key(password_h, &header_h.salt)?;
    let metadata_h = read_metadata_block(
        &mut file,
        &key_h_old,
        &header_h.nonce,
        header_h.size,
        HIDDEN_METADATA_OFFSET,
    )?;

    // Drop the file handle so we can regenerate a new blob in its place
    drop(file);

    // 3. Initialize a temporary blob on disk with fresh salts
    let tmp_path = path.with_extension("compact_tmp");
    init_blob(&tmp_path, password_s, password_h)?;

    // 4. Unlock both volumes in the new blob to get fresh keys and mutable maps
    let (_, key_s_new, mut map_s_new) = unlock_blob(&tmp_path, password_s)?;
    let (_, key_h_new, mut map_h_new) = unlock_blob(&tmp_path, password_h)?;

    // 5. Iterate over every file in the standard volume, read its plaintext, and re-add it
    for (relative_path, meta) in metadata_s.iter() {
        let data = get_file(path, &key_s_old, meta)?;
        add_file(
            &tmp_path,
            VolumeType::Standard,
            &key_s_new,
            &mut map_s_new,
            relative_path,
            &data,
            &meta.mime_type,
        )?;
    }

    // 6. Do the same for every file in the hidden volume
    for (relative_path, meta) in metadata_h.iter() {
        let data = get_file(path, &key_h_old, meta)?;
        add_file(
            &tmp_path,
            VolumeType::Hidden,
            &key_h_new,
            &mut map_h_new,
            relative_path,
            &data,
            &meta.mime_type,
        )?;
    }

    // 7. Atomically swap the old blob out for the new compacted blob
    //    First, rename the original to a .bak in case something goes wrong
    let backup_path = path.with_extension("bak");
    fs::rename(path, &backup_path)?;

    //    Then, move the compacted tmp file into place
    fs::rename(&tmp_path, path)?;

    //    Finally, remove the old backup blob
    fs::remove_file(&backup_path)?;

    Ok(())
}
