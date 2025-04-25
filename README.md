# Encrypted-Blob Server

A secure file storage solution that encrypts all your data in a single blob file while providing an intuitive web interface for access from any device on your local network.

## Features

### Encryption
- **Fully encrypted storage**: All file contents, directory structure, and filenames are encrypted in a single blob file
- **Strong encryption**: Uses Argon2id KDF (64 MiB RAM, t=3, p=1) and XChaCha20-Poly1305 AEAD cipher (256-bit key, 192-bit nonce)
- **What it does well**: Data at rest is fully encrypted, only decrypted when accessed through the server
- **Limitations**: Plain HTTP transmission (data in transit not encrypted), no session timeouts

### Media Gallery
- **Image viewing**: Fullscreen gallery with lightbox view, zoom functionality, and left/right navigation
- **PDF support**: In-browser PDF viewing with page navigation and zoom controls
- **Thumbnails**: Generated on-the-fly for faster browsing

### Multiple Device Access
- Server runs on 0.0.0.0 making it accessible to all devices on your local network
- Responsive design works on both desktop and mobile devices
- Access your files from any device with a web browser on your network

### Single Blob Storage
- All data stored in one file that can be named anything (e.g., data.pdf, secret.bin)
- Blob grows and shrinks automatically as files are added or removed
- Easily backup or transfer your entire encrypted file collection with a single file

## Getting Started

1. Download the binary for your platform (macOS, Linux, Windows)
2. Run the binary (`./enc_server` or equivalent for your OS)
3. Enter your password when prompted (or create a new password if first time)
4. Access the web interface at http://localhost:8080 or http://[your-ip]:8080 from other devices

## Usage

- Upload files/folders using drag-and-drop or the file dialog
- Navigate through your directory structure with the tree view
- Preview images and PDFs directly in the browser
- Download, rename, or delete files as needed 