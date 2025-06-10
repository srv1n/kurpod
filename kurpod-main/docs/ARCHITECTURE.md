# KURPOD Server Architecture

This document provides a comprehensive technical overview of the KURPOD Server architecture, covering all components from cryptographic implementation to web interface design.

## Table of Contents

1. [System Overview](#system-overview)
2. [Component Architecture](#component-architecture)
3. [Cryptographic Design](#cryptographic-design)
4. [Storage Format](#storage-format)
5. [Security Model](#security-model)
6. [API Design](#api-design)
7. [Frontend Architecture](#frontend-architecture)
8. [Performance Considerations](#performance-considerations)
9. [Threat Model](#threat-model)

## System Overview

KURPOD Server is designed as a three-tier architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    React    │  │ Crypto.js   │  │    File Manager     │ │
│  │     UI      │  │  (Client)   │  │      UI             │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS/HTTP
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Web Server (Rust)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    Axum     │  │   Router    │  │    Static Files     │ │
│  │  Framework  │  │ Middleware  │  │     Handler         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │ Function Calls
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                Encryption Core (Rust)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Argon2id  │  │ XChaCha20-  │  │     Blob File       │ │
│  │     KDF     │  │ Poly1305    │  │    Management       │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │ File I/O
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                File System Storage                          │
│               (Encrypted Blob File)                        │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Encryption Core (`encryption_core`)

The foundational cryptographic library that handles all encryption operations.

**Key Responsibilities:**
- Password-based key derivation using Argon2id
- File encryption/decryption using XChaCha20-Poly1305
- Blob file format management
- Dual volume (standard/hidden) support
- Memory security and cleanup

**Public API:**
```rust
// Core initialization functions
pub fn init_blob(path: &str, password: &str, hidden_password: Option<&str>) -> Result<()>
pub fn unlock_blob(path: &str, password: &str) -> Result<(BlobState, VolumeType)>

// File operations
pub fn add_file(state: &mut BlobState, content: Vec<u8>, path: &str, mime_type: Option<&str>) -> Result<()>
pub fn get_file(state: &BlobState, path: &str) -> Result<(Vec<u8>, FileMetadata)>
pub fn remove_file(state: &mut BlobState, path: &str) -> Result<()>
pub fn list_files(state: &BlobState) -> Result<Vec<(String, FileMetadata)>>
```

### 2. HTTP Server (`enc_server`)

Axum-based web server that provides REST API and serves the frontend.

**Key Components:**
- **Router**: Defines API endpoints and static file serving
- **Middleware**: CORS, logging, error handling
- **Handlers**: Business logic for each endpoint
- **State Management**: Thread-safe blob state management
- **Static Files**: Serves built React frontend

**Server Architecture:**
```rust
// Global application state
struct AppState {
    blob_state: Arc<Mutex<Option<BlobState>>>,
    volume_type: Arc<Mutex<VolumeType>>,
    blob_path: String,
}

// Main server setup
async fn main() {
    let app = Router::new()
        .route("/api/create", post(create_storage))
        .route("/api/unlock", post(unlock_storage))
        .route("/api/upload", post(upload_files))
        .route("/api/files", get(list_files))
        .route("/api/download/:id", get(download_file))
        .route("/api/delete/:id", delete(delete_file))
        .nest_service("/", ServeDir::new("frontend/dist"))
        .with_state(app_state);
    
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;
}
```

### 3. Frontend (`frontend`)

React-based single-page application providing the user interface.

**Key Components:**
- **InitScreen**: First-time setup and volume creation
- **UnlockScreen**: Authentication and volume unlocking
- **ReadyScreen**: Main file management interface
- **FileUpload**: Drag-and-drop file upload component
- **FileViewer**: Image/PDF preview functionality

**State Management:**
```jsx
// Application state using React hooks
const [appState, setAppState] = useState('init'); // 'init' | 'unlock' | 'ready'
const [volumeType, setVolumeType] = useState(null); // 'standard' | 'hidden'
const [files, setFiles] = useState([]);
const [selectedFiles, setSelectedFiles] = useState([]);
```

## Cryptographic Design

### Key Derivation

KURPOD Server uses Argon2id for password-based key derivation with the following parameters:

- **Memory**: 64 MiB (65,536 KB)
- **Iterations**: 3
- **Parallelism**: 1 thread
- **Salt**: 32 random bytes per volume
- **Output**: 32-byte key

```rust
use argon2::{Argon2, Algorithm, Version, Params};

let params = Params::new(65536, 3, 1, Some(32))?;
let argon2 = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);
let mut key = [0u8; 32];
argon2.hash_password_into(password.as_bytes(), &salt, &mut key)?;
```

### Encryption Algorithm

Files are encrypted using XChaCha20-Poly1305 AEAD cipher:

- **Key Size**: 256 bits (32 bytes)
- **Nonce Size**: 192 bits (24 bytes) 
- **Authentication**: Built-in AEAD authentication
- **Nonce Generation**: Cryptographically random for each file

```rust
use chacha20poly1305::{XChaCha20Poly1305, KeyInit, AeadInPlace};

let cipher = XChaCha20Poly1305::new(&key.into());
let nonce = XChaCha20Poly1305::generate_nonce(&mut rng);
let ciphertext = cipher.encrypt(&nonce, plaintext.as_ref())?;
```

### Memory Security

- **Key Zeroization**: All cryptographic keys are securely zeroed after use
- **Secure Random**: Uses `getrandom()` for cryptographically secure randomness
- **Constant-Time Operations**: Password comparison uses constant-time algorithms

## Storage Format

### Blob File Structure

The encrypted blob file uses a custom binary format designed for efficiency and security:

```
┌─────────────────────────────────────────────────────────────┐
│                    File Header                              │
├─────────────────────────────────────────────────────────────┤
│ Magic Bytes (16 bytes): "ENCBLOB_V1....!"                  │
│ Standard Salt (32 bytes): Random salt for standard volume  │  
│ Hidden Salt (32 bytes): Random salt for hidden volume      │
│ Reserved (64 bytes): For future extensions                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Volume Data Section                        │
├─────────────────────────────────────────────────────────────┤
│ Volume Type Marker (4 bytes): Volume identifier            │
│ Metadata Nonce (24 bytes): XChaCha20 nonce for metadata    │
│ Metadata Size (8 bytes): Size of encrypted metadata        │
│ Encrypted Metadata: JSON structure with file index         │
│ File Data Blocks: Concatenated encrypted file contents     │
└─────────────────────────────────────────────────────────────┘
```

### Metadata Format

The metadata section contains a JSON structure describing all files:

```json
{
  "version": 1,
  "files": {
    "path/to/file.txt": {
      "size": 1024,
      "mime_type": "text/plain",
      "created": 1640995200,
      "modified": 1640995200,
      "nonce": "24-byte-hex-string",
      "offset": 0,
      "encrypted_size": 1040
    }
  },
  "next_offset": 1040
}
```

### Dual Volume Implementation

Standard and hidden volumes are completely independent:

- **Different Salts**: Each volume has its own 32-byte salt
- **Different Keys**: Keys derived independently from passwords + salts
- **Different Metadata**: Separate metadata sections for each volume
- **Plausible Deniability**: No indication that hidden volume exists

## Security Model

### Threat Model

**Protected Against:**
- File system access without password
- Network traffic interception (with HTTPS)
- Metadata leakage (filenames, sizes encrypted)
- Brute force attacks (Argon2id protection)
- Tampering detection (AEAD authentication)

**NOT Protected Against:**
- Memory dumps while server is running
- Keyloggers capturing passwords
- Coercion with both passwords known
- Side-channel attacks on the host system
- Physical access to unlocked system

### Authentication Flow

```
1. User enters password
2. Server derives key using Argon2id + salt
3. Server attempts to decrypt metadata with derived key
4. If successful, volume is unlocked and available
5. All subsequent operations use the derived key
6. Key remains in memory until logout/shutdown
```

### Authorization Model

- **Volume-Level Security**: Each volume requires separate authentication
- **No User Accounts**: Single-volume access model
- **Session-Based**: Authentication persists until logout
- **File-Level Encryption**: Every file encrypted with same volume key

## API Design

### REST Endpoints

| Method | Endpoint | Purpose | Authentication |
|--------|----------|---------|----------------|
| POST | `/api/create` | Create new blob with volumes | None |
| POST | `/api/unlock` | Unlock existing blob | Password |
| GET | `/api/files` | List files in unlocked volume | Session |
| POST | `/api/upload` | Upload files to volume | Session |
| GET | `/api/download/:path` | Download specific file | Session |
| DELETE | `/api/delete/:path` | Delete specific file | Session |
| POST | `/api/logout` | Clear session and lock volume | Session |

### Request/Response Format

**Create Storage Request:**
```json
{
  "standard_password": "user_password",
  "hidden_password": "optional_hidden_password",
  "blob_path": "optional_custom_path"
}
```

**Upload Request:**
```
Content-Type: multipart/form-data
files: [File objects]
paths: ["relative/path/file1.txt", "relative/path/file2.jpg"]
```

**File List Response:**
```json
{
  "files": [
    {
      "path": "documents/report.pdf",
      "size": 1048576,
      "mime_type": "application/pdf",
      "created": 1640995200,
      "modified": 1640995200
    }
  ],
  "volume_type": "standard"
}
```

## Frontend Architecture

### Component Hierarchy

```
App
├── InitScreen
│   ├── PasswordInput (standard)
│   └── PasswordInput (hidden, optional)
├── UnlockScreen
│   └── PasswordInput
└── ReadyScreen
    ├── FileList
    │   ├── FileItem (multiple)
    │   └── FilePreview
    ├── UploadArea
    │   └── DropZone
    └── ActionButtons
        ├── UploadButton
        ├── DownloadButton
        └── LogoutButton
```

### State Management Strategy

The frontend uses React hooks for state management with the following patterns:

- **Local State**: Component-specific UI state (loading, modals)
- **Global State**: Application state, authentication status, file list
- **API State**: Loading states, error handling for API calls
- **File State**: Upload progress, selected files, preview state

### Security Considerations in Frontend

- **No Client-Side Crypto**: All encryption happens server-side
- **Secure Password Handling**: Passwords sent over HTTPS only
- **Session Management**: No persistent storage of sensitive data
- **CSRF Protection**: API calls include proper headers
- **XSS Prevention**: All user input properly sanitized

## Performance Considerations

### Server Performance

- **Async I/O**: Full async/await pattern with Tokio runtime
- **Memory Management**: Streaming for large file uploads/downloads
- **Connection Pooling**: Efficient handling of concurrent connections
- **Blob File Locking**: Prevents corruption from concurrent access

### Encryption Performance

- **Hardware Acceleration**: XChaCha20 uses CPU native instructions where available
- **Memory Efficiency**: Streaming encryption for large files
- **Key Caching**: Derived keys cached in memory during session
- **Batch Operations**: Multiple file operations in single transaction

### Frontend Performance

- **Code Splitting**: Lazy loading of heavy components
- **Virtual Scrolling**: Efficient handling of large file lists
- **Image Optimization**: Progressive loading and compression
- **Caching Strategy**: Appropriate cache headers for static assets

### Scalability Limits

- **Single User**: Designed for single concurrent user per blob
- **File Size**: Limited by available RAM during processing
- **File Count**: JSON metadata may become large with many files
- **Network**: Performance depends on local network bandwidth

## Threat Model

### Assets Being Protected

1. **File Contents**: The actual data stored in the system
2. **File Metadata**: Names, sizes, types, directory structure
3. **Volume Existence**: The fact that hidden volumes exist
4. **Access Patterns**: Which files are accessed when

### Threat Actors

1. **Unauthorized Users**: People without password access
2. **Network Attackers**: Intercepting network traffic
3. **File System Attackers**: Direct access to blob file
4. **Malicious Software**: Malware on the host system
5. **Coercive Actors**: Entities forcing password disclosure

### Attack Vectors

**Network Attacks:**
- Man-in-the-middle (mitigated by HTTPS)
- Packet sniffing (mitigated by HTTPS)
- Session hijacking (mitigated by secure headers)

**File System Attacks:**
- Direct blob file access (mitigated by encryption)
- Backup/snapshot analysis (mitigated by encryption)
- File metadata leakage (mitigated by encrypted metadata)

**Memory Attacks:**
- RAM dumps while running (partially mitigated)
- Swap file analysis (not mitigated)
- Core dumps (not mitigated)

**Side Channel Attacks:**
- Timing attacks (partially mitigated)
- Power analysis (not applicable)
- Cache timing (not mitigated)

### Security Controls

**Cryptographic Controls:**
- Strong key derivation (Argon2id)
- Authenticated encryption (XChaCha20-Poly1305)
- Secure random number generation
- Memory zeroization

**Application Controls:**
- Input validation and sanitization
- Error message sanitization
- Session timeout (manual logout)
- CORS policy enforcement

**Operational Controls:**
- HTTPS deployment recommendations
- File permission guidelines
- Backup security recommendations
- Network isolation suggestions

This architecture provides a strong foundation for secure file storage while maintaining usability and performance for typical use cases.