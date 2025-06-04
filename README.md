# ENC Server - Secure Encrypted File Storage

<p align="center">
  <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/rust-%231.75+-orange.svg" alt="Rust">
  <img src="https://img.shields.io/badge/status-production--ready-green.svg" alt="Status">
</p>

**ENC Server** is a high-security encrypted file storage server that provides military-grade encryption for your sensitive data. Store and access files through a modern web interface while ensuring complete privacy with client-side encryption and plausible deniability features.

## 🚨 License & Commercial Use

This software is licensed under the **GNU Affero General Public License v3.0 (AGPLv3)** with additional commercial restrictions:

- ✅ **FREE** for personal use
- ✅ **FREE** for educational use
- ✅ **FREE** for non-profit organizations
- ❌ **PROHIBITED** to sell or monetize without permission
- ❌ **PROHIBITED** to offer as a commercial service
- ❌ **PROHIBITED** to include in commercial products

**If you want to use this commercially, you must obtain a license. Contact: [your-email@example.com]**

### What This Means

- You can run this on your own server for free
- You can modify the code for your needs
- You MUST share your modifications (AGPLv3 requirement)
- You CANNOT charge others for access
- You CANNOT rebrand and sell this software
- Network use triggers source code sharing obligations

## 🔐 Security Features

### Military-Grade Encryption
- **XChaCha20-Poly1305** AEAD encryption (256-bit keys)
- **Argon2id** password hashing (64 MiB RAM, 3 iterations)
- **192-bit nonces** for encryption uniqueness
- **Constant-time operations** to prevent timing attacks

### Plausible Deniability
- **Dual Volume Support**: Standard + Hidden volumes
- **Independent passwords** for each volume
- **No identifiable headers** - looks like random data
- **Decoy mode** with fake error messages

### Zero-Knowledge Architecture
- Server never sees unencrypted data
- All encryption/decryption happens client-side
- No logs of file access or operations
- Memory wiped after sensitive operations

## 📋 System Requirements

### Minimum Requirements
- **CPU**: 2 cores (x86_64 or ARM64)
- **RAM**: 512MB (+ 64MB per concurrent user)
- **Storage**: 100MB for application + your data
- **OS**: Linux, macOS, Windows

### Recommended for Production
- **CPU**: 4+ cores
- **RAM**: 2GB+
- **Storage**: SSD with 2x expected data size
- **Network**: Dedicated IP with HTTPS reverse proxy

## 🚀 Quick Start

### Option 1: Download Pre-built Binary

#### Quick Install (Linux/macOS)
```bash
# Automatic installation
curl -sSf https://github.com/yourusername/enc-server/releases/latest/download/install.sh | bash

# Manual verification
curl -sSf https://github.com/yourusername/enc-server/releases/latest/download/install.sh > install.sh
chmod +x install.sh && ./install.sh
```

#### Manual Download
Download from [Releases](https://github.com/yourusername/enc-server/releases) for your platform:

**Linux:**
- `enc_server-vX.X.X-linux-amd64.tar.gz` (Standard Linux)
- `enc_server-vX.X.X-linux-arm64.tar.gz` (ARM64/Raspberry Pi)
- `enc_server-vX.X.X-linux-amd64-musl.tar.gz` (Alpine Linux)

**macOS:**
- `enc_server-vX.X.X-darwin-amd64.tar.gz` (Intel Macs)
- `enc_server-vX.X.X-darwin-arm64.tar.gz` (M1/M2/M3 Macs)

**Windows:**
- `enc_server-vX.X.X-windows-amd64.zip` (Standard Windows)
- `enc_server-vX.X.X-windows-arm64.zip` (ARM Windows)

```bash
# Extract and run (Linux/macOS)
tar -xzf enc_server-*.tar.gz
./enc_server

# Windows: Extract ZIP and run enc_server.exe
```

### Option 2: Build from Source

```bash
# Prerequisites
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
curl -fsSL https://bun.sh/install | bash

# Clone and build
git clone https://github.com/yourusername/enc-server.git
cd enc-server
./build.sh

# Run
./run.sh
```

## 📖 Usage Guide

### Starting the Server

```bash
# Basic usage (defaults to port 3000)
./enc_server

# Custom configuration
./enc_server --port 8080 --blob /secure/storage.blob

# With environment variables
RUST_LOG=info ./enc_server --port 443
```

### Command Line Options

```
Usage: enc_server [OPTIONS]

Options:
  -p, --port <PORT>        Server port [default: 3000]
  -b, --blob <BLOB>        Path to blob storage file [default: ./storage.blob]
  -h, --help               Print help information
  -V, --version            Print version information

Environment Variables:
  RUST_LOG                 Set log level (error, warn, info, debug, trace)
  BIND_ADDRESS            Override bind address [default: 0.0.0.0]
```

### Web Interface

1. Navigate to `http://localhost:3000` in your browser
2. **First Time Setup**:
   - Choose "Create New Storage"
   - Enter a strong password (minimum 12 characters recommended)
   - Optionally create a hidden volume
3. **Returning User**:
   - Choose "Unlock Storage"
   - Enter your password
   - Access your encrypted files

### Security Best Practices

1. **Password Selection**:
   - Use 20+ character passwords
   - Include uppercase, lowercase, numbers, symbols
   - Different passwords for standard/hidden volumes
   - Consider using a password manager

2. **Network Security**:
   ```nginx
   # Nginx reverse proxy with HTTPS
   server {
       listen 443 ssl http2;
       server_name secure.example.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **File System Security**:
   ```bash
   # Secure blob file permissions
   chmod 600 storage.blob
   chown $USER:$USER storage.blob

   # Optional: encrypted file system
   # Create encrypted volume for blob storage
   ```

### Data Deletion & Compaction

Deleting a file or folder removes its entry from the metadata map only. The
encrypted bytes remain in the blob file until you run the compaction routine or
wipe the blob entirely. Run compaction periodically to reclaim space and ensure
deleted data cannot be recovered:

```bash
# Compact a blob file (server must be stopped)
./enc_server --compact /path/to/storage.blob
```

Be aware that residual data persists until compaction or a full wipe, so plan
your security procedures accordingly.

## 🏗️ Architecture

See [Architecture Documentation](docs/ARCHITECTURE.md) for detailed technical documentation.

### High-Level Overview
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  Web Server │────▶│  Encryption │
│  (React UI) │◀────│   (Axum)    │◀────│    Core     │
└─────────────┘     └─────────────┘     └─────────────┘
                            │
                            ▼
                    ┌─────────────┐
                    │ Blob Storage │
                    │  (Encrypted) │
                    └─────────────┘
```

## 🛠️ Development

### Project Structure
```
enc-server/
├── encryption_core/    # Cryptographic operations
├── enc_server/         # HTTP server implementation
├── frontend/           # React web interface
└── docs/              # Documentation
```

### Building Components

```bash
# Run development server with hot-reload
./run.sh

# Run tests
cargo test

# Format code
cargo fmt

# Lint
cargo clippy -- -D warnings

# Frontend development
cd frontend
bun dev    # Development server
bun build  # Production build
bun lint   # Run ESLint
```

### Contributing

Please read [Contributing Guidelines](docs/CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Documentation

- [User Manual](docs/USER_MANUAL.md) - Comprehensive usage guide
- [Architecture](docs/ARCHITECTURE.md) - Technical design documentation
- [Contributing](docs/CONTRIBUTING.md) - Guidelines for contributors

## ⚠️ Important Disclaimers

1. **No Warranty**: This software is provided "as-is" without any warranty
2. **Data Loss**: Always maintain backups - we are not responsible for data loss
3. **Legal Compliance**: Ensure usage complies with your local laws
4. **Security**: No system is 100% secure - use at your own risk
5. **Export Controls**: Strong encryption may be regulated in your jurisdiction

## 🤝 Support

- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/enc-server/issues)
- **Security Issues**: [your-email@example.com] (PGP key available)
- **Commercial Licensing**: [your-email@example.com]
- **Community**: [Discord/Forum link]

## 📜 License

GNU Affero General Public License v3.0 (AGPLv3) with additional commercial restrictions.

**This means**:
- Source code must be disclosed when running as a network service
- Modifications must be shared under the same license
- Commercial use requires separate licensing agreement

Copyright (C) 2025 ENC Server Team. All rights reserved.

---

**Remember**: Your security is your responsibility. Use strong passwords, keep your systems updated, and follow security best practices.