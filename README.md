# Encrypted-Blob Server

A secure file storage solution that encrypts all your data in a single blob file while providing an intuitive web interface for access from any device on your local network. Includes support for a plausibly deniable hidden volume.

## Project Structure

This project is organized as a Rust workspace with multiple crates:

- **encryption_core**: Core encryption logic for blob files (shared by all implementations)
- **enc_server**: HTTP server implementation for web access
- **enc**: Standalone CLI tool using `encryption_core`
- **enc_tauri**: Tauri-based desktop and mobile application (to be implemented)

## Features

### Encryption & Security
- **Fully encrypted storage**: All file contents, directory structure, and filenames are encrypted within a single blob file.
- **Strong encryption**: Uses Argon2id KDF (64 MiB RAM, t=3, p=1) and XChaCha20-Poly1305 AEAD cipher (256-bit key, 192-bit nonce).
- **Plausible Deniability**: Supports an optional, independent **hidden volume** within the same blob file, protected by a separate password. Accessing the blob with the standard password reveals only the standard volume; accessing with the hidden password reveals only the hidden volume.
- **Data Integrity**: AEAD encryption provides authentication, detecting tampering attempts.
- **What it does well**: Data at rest is fully encrypted. The hidden volume provides a layer against coercion scenarios.
- **Limitations**: Transmission over standard HTTP means data in transit is *not* encrypted (use HTTPS/reverse proxy for security over untrusted networks). No automatic session timeouts.

### Media Gallery
- **Image viewing**: Fullscreen gallery with lightbox view, zoom functionality, and keyboard navigation (left/right arrows).
- **PDF support**: In-browser PDF viewing with page navigation and zoom controls.
- **Thumbnails**: (Future - currently loads full images)

### Multiple Device Access
- Server runs on `0.0.0.0` making it accessible to all devices on your local network.
- Responsive design works on both desktop and mobile devices.
- Access your files from any device with a web browser on your network.

### Single Blob Storage
- All data (standard and hidden volumes) stored in one file that can be named anything (e.g., `data.pdf`, `secret.bin`).
- Blob grows automatically as files are added.
- Easily backup or transfer your entire encrypted file collection with a single file.

## Building and Running

### Web Server Version

```bash
# Build the server
cargo build --bin enc_server

# Run the server (defaults to port 3000 and data.blob)
# Enable info logging for core and server:
RUST_LOG=encryption_core=info,enc_server=info cargo run --bin enc_server

# Run with custom port and blob file
RUST_LOG=info cargo run --bin enc_server -- --port 8080 --blob my_data.blob

# Using the convenience script (if available)
./run.sh

# With custom parameters
./run.sh --port 8080 --blob my_data.blob
```

### Building for Release

```bash
# Build optimized release version
cargo build --release --bin enc_server

# The binary will be in target/release/enc_server
```

### Tauri Application (Future)

The Tauri application for desktop and mobile platforms is planned for future implementation.

## Getting Started

1.  Build and run the server (see above).
2.  Access the web interface at `http://localhost:3000` (or your specified port).
3.  **Initialization (First Time):**
    *   Click "Create New Storage".
    *   Enter a strong password for the **Standard (Decoy) Volume**. This is the primary volume you'll likely use.
    *   Optionally, enter a *different*, strong password for the **Hidden Volume**. If you set this, you can later log in with this password to access a completely separate, hidden storage area. If you leave this blank, a random password will be generated internally, making the hidden volume inaccessible unless explicitly set during init.
    *   Confirm passwords and click "Create Secure Storage".
4.  **Login:**
    *   Enter the password for the volume you wish to access (either Standard or Hidden).
    *   The server will unlock the corresponding volume.
5.  Access the web interface from other devices on your local network at `http://<your-server-ip>:<port>`.

## Usage

- **Interface:** The UI will indicate whether the "Standard Volume" or "Hidden Volume" is currently active.
- **Upload:** Upload files/folders using drag-and-drop or the buttons. Files are added to the currently active volume.
- **Navigation:** Navigate the directory structure for the active volume.
- **Preview:** Preview images and PDFs.
- **Manage:** Download, rename, or delete files within the active volume.
- **Logout:** Use the Logout button to lock the storage on the server before closing your browser or leaving your device unattended.

## Encryption Core CLI (`enc`)

A standalone command-line tool for working with encrypted blob files using the `encryption_core` library. This tool provides direct access to encrypted blob functionality without requiring a server component.

### Features

- Initialize new encrypted blob files (supports standard and hidden passwords).
- Unlock existing encrypted blobs (tries both standard and hidden passwords).
- List files stored in the unlocked volume.
- Add files to the unlocked volume.
- Extract files from the unlocked volume.
- Remove files from the unlocked volume.
- Rename files within the unlocked volume.
- Export all files from the unlocked volume to a directory.
- Import files from a directory into the unlocked volume.

### Usage

```bash
# Initialize a new blob (Standard password only)
enc init <blob_path> <standard_password>

# Initialize a new blob (Standard AND Hidden passwords)
enc init <blob_path> <standard_password> --hidden-password <hidden_password>

# Unlock and view files (tries both passwords, indicates which volume unlocked)
enc list <blob_path> <password_attempt>

# Add a file to the blob (operates on the volume unlocked by the password)
enc add <blob_path> <password> <file_path> <save_path>

# Extract a file from the blob
enc get <blob_path> <password> <file_path> <output_path>

# Remove a file from the blob
enc remove <blob_path> <password> <file_path>

# Rename a file within the blob
enc rename <blob_path> <password> <old_path> <new_path>

# Export all files from the unlocked volume to a directory
enc export <blob_path> <password> <output_dir>

# Import all files from a directory into the unlocked volume
enc import <blob_path> <password> <input_dir>
```

### Examples

Initialize with only a standard password:
```bash
enc init ./my_data.blob mysecretpassword
```

Initialize with standard and hidden passwords:
```bash
enc init ./my_data.blob my_std_pass --hidden-password my_hidden_pass
```

Add a file (will add to standard volume if `my_std_pass` is correct, or hidden if `my_hidden_pass` is correct):
```bash
enc add ./my_data.blob my_std_pass ./document.pdf docs/report.pdf
```

List files (unlocks hidden volume if `my_hidden_pass` provided):
```bash
enc list ./my_data.blob my_hidden_pass
```

### Building

Clone the repository and build with Cargo:

```bash
cargo build --release --bin enc
```

The resulting binary will be in `target/release/enc`.

## Security Considerations

- **Hidden Volume:** Provides deniability against coercion. An attacker seeing the blob file cannot prove the existence of the hidden volume without the hidden password. The standard password only reveals the standard volume.
- **Key Derivation:** Argon2id makes brute-forcing passwords computationally expensive.
- **Encryption:** XChaCha20-Poly1305 is a modern, secure AEAD cipher.
- **Data in Transit:** The default HTTP server does **not** encrypt traffic. For use on untrusted networks, run the server behind a reverse proxy configured for HTTPS (e.g., Nginx, Caddy).
- **Session Management:** The server currently relies on the single password unlock and doesn't have automatic session timeouts. Use the Logout button.

## License

This project is licensed under the MIT License.

## Future Directions: Steganography (Deferred)

We explored the possibility of hiding the encrypted blob data within a standard "carrier" file (e.g., MP4, PDF) instead of using a dedicated `.blob` file extension. The goal was for the carrier file to remain functional (e.g., a video plays normally) while also containing the hidden encrypted volume accessible via the correct password.

Two main approaches were considered:

1.  **Simple Appending:** Appending the entire blob structure (markers, headers, metadata, file data) to the end of an arbitrary carrier file.
    *   **Pros:** Relatively simpler to implement, format-agnostic.
    *   **Cons:** Fragile (appended data easily truncated by programs modifying the carrier), potentially detectable (unusual file size increase, trailing data), adds complexity managing relative offsets.
2.  **Format-Specific Embedding (e.g., MP4):** Embedding critical pointers (salts, metadata nonces/sizes, marker) within standard file structures (like MP4 `udta` boxes) and appending the bulk encrypted data.
    *   **Pros:** Potentially more robust against *some* modifications (if the host application preserves the structure containing the pointers).
    *   **Cons:** Significantly more complex (requires format-specific libraries like `mp4rs`), actual encrypted data blocks remain vulnerable to truncation if appended, adds format dependency, potentially still detectable.

**Conclusion:** Achieving true robustness against arbitrary modifications by other programs is extremely difficult, especially for the appended data blocks. Both approaches add significant complexity and potential fragility. Given these challenges, the implementation of steganography has been **deferred**.

The current system uses a dedicated blob structure identified by internal magic bytes, not the file extension. Therefore, the blob file can be renamed to any extension (e.g., `.pdf`, `.mp4`) and will still function correctly with this library, although it won't be openable by standard applications associated with that fake extension. 