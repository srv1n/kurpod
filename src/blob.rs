use serde::{Serialize, Deserialize};
use chacha20poly1305::{
    ChaCha20Poly1305, XChaCha20Poly1305, 
    Key, XNonce, Nonce,
    aead::{Aead, AeadCore, KeyInit}
};
use argon2::{Argon2, Params};
use rand::rngs::OsRng;
use rand::RngCore;
use std::{fs::{File, OpenOptions}, io::{Read, Write, Seek, SeekFrom}, path::Path};
use anyhow::{Result, anyhow};
use std::collections::HashMap;
use bincode;

// Constants
const MAGIC: &[u8] = b"ENC_BLOB";
const VERSION: u8 = 2;  // Increment version for new format
const SALT_LEN: usize = 16;
const NONCE_LEN: usize = 12;  // For ChaCha20Poly1305
pub const XNONCE_LEN: usize = 24;  // For XChaCha20Poly1305
const HEADER_METADATA_OFFSET: u64 = MAGIC.len() as u64 + 1 + SALT_LEN as u64 + XNONCE_LEN as u64 + 8; // Magic + Version + Salt + Metadata Nonce + Metadata Size

// Represents a file's metadata within the blob
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FileMetadata {
    pub size: u64,           // Original file size
    pub data_offset: u64,    // Offset in the blob file where encrypted data starts
    pub data_length: u64,    // Length of the encrypted data block
    pub data_nonce: [u8; XNONCE_LEN], // Nonce used for this file's data
    pub mime_type: String,   // MIME type for content-type headers
}

// This map is what gets serialized and encrypted in the Metadata Block
// Key: Full path of the file (e.g., "documents/notes.txt")
pub type MetadataMap = HashMap<String, FileMetadata>;

// Header contains: Magic, Version, Salt, Metadata Nonce, Metadata Size
struct BlobHeader {
    salt: [u8; SALT_LEN],
    meta_nonce: [u8; XNONCE_LEN],
    meta_size: u64,
}

fn derive_key(password: &str, salt: &[u8]) -> Result<[u8; 32]> {
    let params = Params::new(16 * 1024, 2, 1, None)
        .map_err(|e| anyhow!("argon2 params error: {}", e))?;
    let argon2 = Argon2::default();
    let mut key = [0u8; 32];
    argon2.hash_password_into(password.as_bytes(), salt, &mut key)
        .map_err(|e| anyhow!("argon2 hash error: {}", e))?;
    Ok(key)
}

fn read_header(file: &mut File) -> Result<BlobHeader> {
    // Reset to beginning of file
    file.seek(SeekFrom::Start(0))?;
    
    // Read and verify magic
    let mut magic = [0u8; MAGIC.len()];
    file.read_exact(&mut magic)?;
    if magic != *MAGIC {
        return Err(anyhow!("Invalid blob format"));
    }
    
    // Read and verify version
    let mut ver = [0u8; 1];
    file.read_exact(&mut ver)?;
    if ver[0] != VERSION {
        return Err(anyhow!("Unsupported blob version"));
    }
    
    // Read salt
    let mut salt = [0u8; SALT_LEN];
    file.read_exact(&mut salt)?;
    
    // Read metadata nonce
    let mut meta_nonce = [0u8; XNONCE_LEN];
    file.read_exact(&mut meta_nonce)?;
    
    // Read metadata size
    let mut size_bytes = [0u8; 8];
    file.read_exact(&mut size_bytes)?;
    let meta_size = u64::from_le_bytes(size_bytes);
    
    Ok(BlobHeader {
        salt,
        meta_nonce,
        meta_size,
    })
}

fn write_header(file: &mut File, salt: &[u8; SALT_LEN], meta_nonce: &[u8; XNONCE_LEN], meta_size: u64) -> Result<()> {
    // Reset to beginning of file
    file.seek(SeekFrom::Start(0))?;
    
    // Write header
    file.write_all(MAGIC)?;
    file.write_all(&[VERSION])?;
    file.write_all(salt)?;
    file.write_all(meta_nonce)?;
    file.write_all(&meta_size.to_le_bytes())?;
    
    Ok(())
}

fn read_metadata_block(file: &mut File, key: &[u8; 32], meta_nonce: &[u8; XNONCE_LEN], meta_size: u64) -> Result<MetadataMap> {
    // Seek to metadata block
    file.seek(SeekFrom::Start(HEADER_METADATA_OFFSET))?;
    
    // Read encrypted metadata
    let mut encrypted_metadata = vec![0u8; meta_size as usize];
    file.read_exact(&mut encrypted_metadata)?;
    
    // Decrypt metadata using XChaCha20Poly1305
    let cipher = XChaCha20Poly1305::new(Key::from_slice(key));
    let nonce = XNonce::from_slice(meta_nonce);
    let plaintext = cipher
        .decrypt(nonce, encrypted_metadata.as_ref())
        .map_err(|e| anyhow!("metadata decryption failed: {}", e))?;
    
    // Deserialize metadata map
    let metadata_map: MetadataMap = bincode::deserialize(&plaintext)
        .map_err(|e| anyhow!("metadata deserialization failed: {}", e))?;
    
    Ok(metadata_map)
}

fn write_metadata_block(file: &mut File, key: &[u8; 32], map: &MetadataMap) -> Result<([u8; XNONCE_LEN], u64)> {
    // Serialize metadata map
    let plaintext = bincode::serialize(map)
        .map_err(|e| anyhow!("metadata serialization failed: {}", e))?;
    
    // Generate nonce and set up encryption
    let cipher = XChaCha20Poly1305::new(Key::from_slice(key));
    let nonce = XChaCha20Poly1305::generate_nonce(&mut OsRng);
    
    // Encrypt metadata
    let ciphertext = cipher
        .encrypt(&nonce, plaintext.as_ref())
        .map_err(|e| anyhow!("metadata encryption failed: {}", e))?;
    
    // Seek to metadata block
    file.seek(SeekFrom::Start(HEADER_METADATA_OFFSET))?;
    
    // Write encrypted metadata
    file.write_all(&ciphertext)?;
    file.sync_data()?;
    
    // Copy nonce bytes to a fixed size array
    let mut nonce_bytes = [0u8; XNONCE_LEN];
    nonce_bytes.copy_from_slice(nonce.as_slice());
    
    Ok((nonce_bytes, ciphertext.len() as u64))
}

fn append_file_data(file: &mut File, key: &[u8; 32], content: &[u8], mime_type: &str) -> Result<FileMetadata> {
    // Seek to end of file
    let data_offset = file.seek(SeekFrom::End(0))?;
    
    // Set up encryption
    let cipher = XChaCha20Poly1305::new(Key::from_slice(key));
    let nonce = XChaCha20Poly1305::generate_nonce(&mut OsRng);
    
    // Encrypt content
    let ciphertext = cipher
        .encrypt(&nonce, content)
        .map_err(|e| anyhow!("file data encryption failed: {}", e))?;
    
    // Write nonce and ciphertext
    file.write_all(nonce.as_slice())?;
    file.write_all(&ciphertext)?;
    file.sync_data()?;
    
    // Copy nonce bytes to a fixed size array
    let mut nonce_bytes = [0u8; XNONCE_LEN];
    nonce_bytes.copy_from_slice(nonce.as_slice());
    
    // Return metadata
    Ok(FileMetadata {
        size: content.len() as u64,
        data_offset,
        data_length: (XNONCE_LEN as u64) + (ciphertext.len() as u64),
        data_nonce: nonce_bytes,
        mime_type: mime_type.to_string(),
    })
}

fn read_file_data(file: &mut File, key: &[u8; 32], metadata: &FileMetadata) -> Result<Vec<u8>> {
    // Seek to data
    file.seek(SeekFrom::Start(metadata.data_offset))?;
    
    // Read entire encrypted data block (nonce + ciphertext)
    let mut encrypted_data = vec![0u8; metadata.data_length as usize];
    file.read_exact(&mut encrypted_data)?;
    
    // Extract nonce and ciphertext
    let nonce_bytes = &encrypted_data[0..XNONCE_LEN];
    let ciphertext = &encrypted_data[XNONCE_LEN..];
    
    // Set up decryption
    let cipher = XChaCha20Poly1305::new(Key::from_slice(key));
    let nonce = XNonce::from_slice(nonce_bytes);
    
    // Decrypt
    let plaintext = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|e| anyhow!("file data decryption failed: {}", e))?;
    
    Ok(plaintext)
}

/// Initialize a new blob file
pub fn init_blob(path: &Path, password: &str) -> Result<([u8; 32], MetadataMap)> {
    // Generate salt
    let mut salt = [0u8; SALT_LEN];
    OsRng.fill_bytes(&mut salt);
    
    // Derive key
    let key = derive_key(password, &salt)?;
    
    // Create empty metadata map
    let metadata = MetadataMap::new();
    
    // Create file
    let mut file = File::create(path)?;
    
    // Write empty metadata block
    let (meta_nonce, meta_size) = write_metadata_block(&mut file, &key, &metadata)?;
    
    // Write header
    write_header(&mut file, &salt, &meta_nonce, meta_size)?;
    
    Ok((key, metadata))
}

/// Unlock an existing blob file
pub fn unlock_blob(path: &Path, password: &str) -> Result<([u8; 32], MetadataMap)> {
    // Open file
    let mut file = File::open(path)?;
    
    // Read header
    let header = read_header(&mut file)?;
    
    // Derive key
    let key = derive_key(password, &header.salt)?;
    
    // Read metadata
    let metadata = read_metadata_block(&mut file, &key, &header.meta_nonce, header.meta_size)?;
    
    Ok((key, metadata))
}

/// Add a file to the blob
pub fn add_file(path: &Path, key: &[u8; 32], metadata_map: &mut MetadataMap, file_path: &str, content: &[u8], mime_type: &str) -> Result<()> {
    // Open file for reading and writing
    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .open(path)?;
    
    // Append file data
    let file_metadata = append_file_data(&mut file, key, content, mime_type)?;
    
    // Add to metadata map
    metadata_map.insert(file_path.to_string(), file_metadata);
    
    // Update metadata block
    let (meta_nonce, meta_size) = write_metadata_block(&mut file, key, metadata_map)?;
    
    // Read header to get salt
    let header = read_header(&mut file)?;
    
    // Update header with new metadata nonce and size
    write_header(&mut file, &header.salt, &meta_nonce, meta_size)?;
    
    Ok(())
}

/// Get a file from the blob
pub fn get_file(path: &Path, key: &[u8; 32], metadata: &FileMetadata) -> Result<Vec<u8>> {
    let mut file = File::open(path)?;
    read_file_data(&mut file, key, metadata)
}

/// Remove a file from the metadata (data remains but becomes inaccessible)
pub fn remove_file(path: &Path, key: &[u8; 32], metadata_map: &mut MetadataMap, file_path: &str) -> Result<bool> {
    // Check if file exists
    if !metadata_map.contains_key(file_path) {
        return Ok(false);
    }
    
    // Remove from metadata map
    metadata_map.remove(file_path);
    
    // Open file for reading and writing
    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .open(path)?;
    
    // Update metadata block
    let (meta_nonce, meta_size) = write_metadata_block(&mut file, key, metadata_map)?;
    
    // Read header to get salt
    let header = read_header(&mut file)?;
    
    // Update header with new metadata nonce and size
    write_header(&mut file, &header.salt, &meta_nonce, meta_size)?;
    
    Ok(true)
}

/// Rename a file in the metadata
pub fn rename_file(path: &Path, key: &[u8; 32], metadata_map: &mut MetadataMap, old_path: &str, new_path: &str) -> Result<bool> {
    // Check if old file exists
    if !metadata_map.contains_key(old_path) {
        return Ok(false);
    }
    
    // Check if new file already exists
    if metadata_map.contains_key(new_path) {
        return Err(anyhow!("destination already exists"));
    }
    
    // Get old metadata
    let metadata = metadata_map.remove(old_path).unwrap();
    
    // Insert with new path
    metadata_map.insert(new_path.to_string(), metadata);
    
    // Open file for reading and writing
    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .open(path)?;
    
    // Update metadata block
    let (meta_nonce, meta_size) = write_metadata_block(&mut file, key, metadata_map)?;
    
    // Read header to get salt
    let header = read_header(&mut file)?;
    
    // Update header with new metadata nonce and size
    write_header(&mut file, &header.salt, &meta_nonce, meta_size)?;
    
    Ok(true)
}

// Legacy functions for compatibility with existing code
// These will be removed once all the handlers are updated

/// Legacy: Encrypt and save BlobData to path
#[derive(Serialize, Deserialize, Clone)]
pub struct FileEntry {
    pub path: String,
    pub content: Vec<u8>,
}

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct BlobData {
    pub files: Vec<FileEntry>,
    #[serde(default)]
    pub index: HashMap<String, usize>, // Maps file path to index in files vector
}

impl BlobData {
    // Update the index for all files
    pub fn rebuild_index(&mut self) {
        self.index.clear();
        for (i, file) in self.files.iter().enumerate() {
            self.index.insert(file.path.clone(), i);
        }
    }
    
    // Get a file by path using the index
    pub fn get_file(&self, path: &str) -> Option<&FileEntry> {
        match self.index.get(path) {
            Some(&idx) => self.files.get(idx),
            None => None
        }
    }
    
    // Add or update a file
    pub fn add_file(&mut self, file: FileEntry) {
        let path = file.path.clone();
        match self.index.get(&path) {
            Some(&idx) => {
                // Update existing file
                self.files[idx] = file;
            },
            None => {
                // Add new file
                let idx = self.files.len();
                self.files.push(file);
                self.index.insert(path, idx);
            }
        }
    }
    
    // Remove a file by path
    pub fn remove_file(&mut self, path: &str) -> bool {
        match self.index.get(path) {
            Some(&idx) => {
                self.files.remove(idx);
                self.index.remove(path);
                self.rebuild_index(); // Need to rebuild index as indices shift
                true
            },
            None => false
        }
    }
}

pub fn save_blob(path: &Path, password: &str, data: &BlobData) -> Result<()> {
    println!("Warning: Using legacy save_blob function");
    // Convert BlobData to new format and save
    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .truncate(true)
        .open(path)?;
    
    // Generate salt
    let mut salt = [0u8; SALT_LEN];
    OsRng.fill_bytes(&mut salt);
    
    // Derive key
    let key = derive_key(password, &salt)?;
    
    // Create empty metadata map
    let mut metadata_map = MetadataMap::new();
    
    // Write placeholder metadata to create initial header
    let (mut meta_nonce, mut meta_size) = write_metadata_block(&mut file, &key, &metadata_map)?;
    
    // Write header
    write_header(&mut file, &salt, &meta_nonce, meta_size)?;
    
    // Add each file
    for entry in &data.files {
        let mime_type = from_path(&entry.path).first_or_octet_stream().to_string();
        let file_metadata = append_file_data(&mut file, &key, &entry.content, &mime_type)?;
        metadata_map.insert(entry.path.clone(), file_metadata);
    }
    
    // Update metadata block with final data
    let (new_meta_nonce, new_meta_size) = write_metadata_block(&mut file, &key, &metadata_map)?;
    
    // Update header
    write_header(&mut file, &salt, &new_meta_nonce, new_meta_size)?;
    
    Ok(())
}

pub fn save_blob_with_key(path: &Path, key: &[u8; 32], data: &BlobData) -> Result<()> {
    println!("Warning: Using legacy save_blob_with_key function");
    
    // Open file
    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(path)?;
    
    // Try to read header for salt
    let header = if path.exists() {
        match read_header(&mut file) {
            Ok(h) => h,
            Err(_) => {
                // Generate new salt if header can't be read
                let mut salt = [0u8; SALT_LEN];
                OsRng.fill_bytes(&mut salt);
                BlobHeader {
                    salt,
                    meta_nonce: [0u8; XNONCE_LEN],
                    meta_size: 0,
                }
            }
        }
    } else {
        // Generate new salt for new file
        let mut salt = [0u8; SALT_LEN];
        OsRng.fill_bytes(&mut salt);
        BlobHeader {
            salt,
            meta_nonce: [0u8; XNONCE_LEN],
            meta_size: 0,
        }
    };
    
    // Create empty metadata map
    let mut metadata_map = MetadataMap::new();
    
    // Reset file
    file.set_len(0)?;
    file.seek(SeekFrom::Start(0))?;
    
    // Write placeholder metadata to create initial header
    let (mut meta_nonce, mut meta_size) = write_metadata_block(&mut file, key, &metadata_map)?;
    
    // Write header
    write_header(&mut file, &header.salt, &meta_nonce, meta_size)?;
    
    // Add each file
    for entry in &data.files {
        let mime_type = mime_guess::from_path(&entry.path).first_or_octet_stream().to_string();
        let file_metadata = append_file_data(&mut file, key, &entry.content, &mime_type)?;
        metadata_map.insert(entry.path.clone(), file_metadata);
    }
    
    // Update metadata block with final data
    let (new_meta_nonce, new_meta_size) = write_metadata_block(&mut file, key, &metadata_map)?;
    
    // Update header
    write_header(&mut file, &header.salt, &new_meta_nonce, new_meta_size)?;
    
    Ok(())
}

pub fn load_blob(path: &Path, password: &str) -> Result<BlobData> {
    println!("Warning: Using legacy load_blob function");
    // Unlock blob
    let (key, metadata_map) = unlock_blob(path, password)?;
    
    // Convert to old format
    let mut data = BlobData::default();
    
    // Open file
    let mut file = File::open(path)?;
    
    // Load each file
    for (path, metadata) in metadata_map {
        let content = read_file_data(&mut file, &key, &metadata)?;
        data.add_file(FileEntry {
            path,
            content,
        });
    }
    
    Ok(data)
}

pub fn load_blob_with_key(path: &Path, password: &str) -> Result<(BlobData, [u8; 32])> {
    println!("Warning: Using legacy load_blob_with_key function");
    // Unlock blob
    let (key, metadata_map) = unlock_blob(path, password)?;
    
    // Convert to old format
    let mut data = BlobData::default();
    
    // Open file
    let mut file = File::open(path)?;
    
    // Load each file
    for (path, metadata) in metadata_map {
        let content = read_file_data(&mut file, &key, &metadata)?;
        data.add_file(FileEntry {
            path,
            content,
        });
    }
    
    Ok((data, key))
}

use mime_guess;
fn from_path(path: &str) -> mime_guess::MimeGuess {
    mime_guess::from_path(path)
}
