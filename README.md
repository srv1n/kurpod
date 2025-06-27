# KURPOD

**Hide your private documents, photos, files inside "vacation.jpg"**

Encrypted file containers with innocent filenames. Your 1,000 personal files become one disguised blob - portable, secure, and tiny.

A self-hosted a single ~2MB binary.
No accounts. No tracking. No cloud dependencies.

## What This Actually Does

**KURPOD creates encrypted blob files that you can name anything.** 

- Name it `vacation.jpg` - looks like a photo to casual observers
- Name it `work_report.pdf` - appears to be a document  
- Name it `music_playlist.m3u` - seems like a music file

**Important**: This is filename disguise, not true file format mimicry. Technical inspection (`file` command) will show it's encrypted data. But for everyday privacy i.e shared computers, cloud storage, basic inspection the innocent filename provides excellent camouflage. True steganography is planned in the future. 

The real magic is the **dual-volume encryption** that lets you hide a second encrypted space inside the same file.

## The Hidden Compartment Trick

Every KURPOD container has **two encrypted volumes**:
- **Password #1**: Opens decoy files (fake spreadsheets, boring documents)  
- **Password #2**: Opens your real files (private photos, crypto wallets, sensitive docs)

Someone forces you to unlock it? Give them Password #1. They see innocent files. Your real data stays completely hidden in a second encrypted volume.

```
my_vacation.jpg  (2.3MB encrypted container)
├── Password "summer2023" → Decoy: 25 vacation photos
└── Password "dolphins847" → Hidden: crypto keys, private documents, job applications
```

**What they see**: Vacation photos in a JPEG file  
**What you know**: Dual-encrypted vault with everything that matters


## How it works

1. Run kurpod server (single binary, Docker, hombrew or build from source)
2. Create encrypted blob with password
3. Access through web interface
4. Upload files - they get encrypted and stored
5. Optional: create second encrypted volume with different password

---
## Short Video
https://github.com/user-attachments/assets/467464f6-91fe-48e1-b7fb-bd431302d7a3

---
## Technical details

### Encryption
- Password hashing: Argon2id (64MB memory, 3 iterations)
- File encryption: XChaCha20-Poly1305 (256-bit keys, 192-bit nonces)
- No external dependencies or databases (~2.5MB)
- Built in Rust
---

## Quick Start

### Option 1: Homebrew (macOS - Recommended)
```bash
# Add tap and install
brew tap srv1n/kurpod https://github.com/srv1n/kurpod.git
brew install kurpod

# Start server (defaults to port 3000 and ./blobs directory)
kurpod_server

# Access at http://localhost:3000
# → Need a different port or storage location? See the
#   "🔧 Configuration & Usage" section below for all flags.
```

**Troubleshooting Homebrew Cache Issues:**
```bash
# If you get "already installed" with old version or SHA256 mismatch:
brew update                    # Refresh formula from tap
brew reinstall kurpod         # Force reinstall latest version

# If that doesn't work, clear cache:
brew cleanup -s               # Clear all caches
brew uninstall kurpod        # Remove old version
brew install kurpod          # Fresh install
```

**Uninstall:**
```bash
# Remove KURPOD
brew uninstall kurpod

# Remove tap (optional - removes the formula repository)
brew untap srv1n/kurpod

# Clean up any remaining dependencies
brew autoremove
```

### Option 2: Docker (Cross-platform)
```bash
# Run latest version
docker run -p 3000:3000 -v ./data:/app/data ghcr.io/srv1n/kurpod:latest

# Open browser to http://localhost:3000
```

**Cleanup:**
```bash
# Stop and remove running container
docker stop $(docker ps -q --filter ancestor=ghcr.io/srv1n/kurpod)
docker rm $(docker ps -aq --filter ancestor=ghcr.io/srv1n/kurpod)

# Remove downloaded image
docker rmi ghcr.io/srv1n/kurpod:latest

# Remove all unused images, containers, and volumes (optional)
docker system prune -a --volumes
```

### Option 3: Auto-Install Script
```bash
# Auto-install for Linux/macOS
curl -L https://github.com/srv1n/kurpod/releases/latest/download/install.sh | bash

# Then run
kurpod_server
```

**Uninstall:**
```bash
# Remove from user installation directory
rm -f ~/.local/bin/kurpod_server

# Or remove from system-wide installation
sudo rm -f /usr/local/bin/kurpod_server

# Clean up PATH entries in shell profile (if added manually)
# Edit ~/.bashrc or ~/.zshrc and remove the ~/.local/bin PATH export line
```

### Option 4: Manual Download
Download the appropriate binary for your platform from the [releases page](https://github.com/srv1n/kurpod/releases).

**Cleanup:**
```bash
# Remove the binary from wherever you placed it
rm -f /path/to/kurpod_server

# If you moved it to a system directory
sudo rm -f /usr/local/bin/kurpod_server

# Remove any data files created (optional - this deletes your encrypted blobs!)
# rm -rf ./blobs/
# rm -f ./storage.blob
```

---

## Supported Platforms

### Desktop & Server
- **Linux**: x86_64, ARM64 (including Raspberry Pi with 64-bit OS)
- **macOS**: Intel and Apple Silicon (M1/M2/M3)
- **Windows**: x86_64 and ARM64

### Container
- **Docker**: Multi-architecture images (~4.8MB compressed)
- **Platforms**: linux/amd64, linux/arm64

---

## How It Works

### Simple Setup
1. **Deploy KURPOD** - Single binary, Docker, or Homebrew installation
2. **Initialize storage** - Create encrypted blob with password(s)
3. **Access securely** - Web interface with session-based authentication
4. **Upload & manage** - Drag-and-drop files with real-time encryption

### Advanced Security Model

#### Session-Based Authentication
- **Split-key architecture** - Cryptographic keys divided between client and server
- **Bearer token auth** - HMAC-SHA256 signed tokens with IP/UA binding
- **Automatic timeouts** - 15-minute idle, 2-hour absolute session limits
- **Memory security** - All cryptographic material zeroized on cleanup

#### Encryption Implementation
- **Algorithm**: XChaCha20-Poly1305 AEAD with 256-bit keys
- **Key derivation**: Argon2id (64MB memory, 3 iterations, unique salt)
- **Nonce generation**: 192-bit cryptographically secure random per chunk
- **Chunk size**: 64KB blocks for optimal streaming performance
- **Metadata protection**: File names, sizes, and directory structure encrypted

#### Dual-Volume Architecture
**Standard Volume**: Normal encrypted storage accessed with primary password
**Hidden Volume**: Secondary encrypted space accessed with different password
- Mathematically indistinguishable from random data
- No headers, signatures, or detectible patterns
- Provides cryptographic deniability under coercion
- Independent encryption keys and data structures
---

### Build from Source

#### Prerequisites
- **Rust** 1.70+ (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)
- **Bun** 1.0+ (`curl -fsSL https://bun.sh/install | bash`)
- **Git** for cloning the repository

#### Build Steps
```bash
# Clone repository
git clone https://github.com/srv1n/kurpod.git
cd kurpod

# Build frontend and server
./build.sh

# Run development server
./run.sh

# Or run release build
cargo build --release -p kurpod_server
./target/release/kurpod_server
```

---

## 🔧 Configuration & Usage

### Command Line Options
```bash
# Basic usage (uses ./blobs directory)
./kurpod_server

# Specify custom blob file
./kurpod_server --blob /secure/path/storage.blob

# Custom port
./kurpod_server --port 8080

# Custom data directory
./kurpod_server --data-dir /opt/kurpod/data

# Show all options
./kurpod_server --help
```
---

## Performance & Sizing

### Binary Sizes
| Platform | Binary Size |
|----------|-------------|
| Linux x86_64 | ~2MB |
| Linux ARM64 | ~2MB |
| macOS (Intel/Apple Silicon) | ~2MB |
| Windows x86_64 | ~2MB |
| Docker Image | ~4.8MB  |

### Performance Characteristics
- **Startup time**: < 1 second
- **File upload**: Limited by network and storage I/O
- **Concurrent users**: Supports multiple simultaneous sessions
- **Memory usage**: Scales with number of active sessions and file operations
- **Storage efficiency**: Encrypted chunks with minimal overhead

---

## Project Status

This is the **initial open source release** of KURPOD. Expect bugs. Please report them through issues. 

### What's Working
- **Session-based authentication** - Split-key security with token management
- **Web interface** - Dark/light themes, drag-and-drop, responsive design
- **Media handling** - Video streaming, thumbnail generation, file previews
- **REST API** - 15 endpoints with authentication
- **Cross-platform builds** - Linux, macOS, Windows (Intel/ARM)
- **Docker support** - Multi-arch images
- **Development tooling** - Hot reload, testing, linting, documentation

### Known Limitations
- **Single-user sessions** - Multi-user ACLs not yet implemented
- **No built-in TLS** - Requires reverse proxy for HTTPS
- **Web-only interface** - No native mobile apps yet
- **Manual backups** - No automated backup system
- **Platform testing** - I've tested on Mac extensively. Other platforms not much. 

---

## Security Verification

### Binary Verification
All release binaries are signed and include SHA256 checksums:

```bash
# Download checksums
wget https://github.com/srv1n/kurpod/releases/latest/download/SHA256SUMS

# Verify download
sha256sum -c SHA256SUMS

# GPG verification (Linux binaries)
gpg --verify kurpod_server.asc kurpod_server
```

### Code Signing
- **macOS**: Binaries are signed with Apple Developer ID and notarized
- **Linux**: Binaries include detached GPG signatures
- **Windows**: Currently unsigned. Authenticode signing planned for v1.0

---

## Development

### Development Setup
```bash
# Clone and setup
git clone https://github.com/srv1n/kurpod.git
cd kurpod

# Install dependencies
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
curl -fsSL https://bun.sh/install | bash

# Development server with hot-reload
./run.sh

# Frontend development server (separate terminal)
cd frontend && bun dev

# Run tests
cargo test
cd frontend && bun test
```

### Project Architecture
```
kurpod/
├── encryption_core/              # Cryptographic engine
│   ├── src/blob.rs              # Dual-volume blob format
│   ├── src/lib.rs               # Public API and types
│   └── tests/                   # Comprehensive crypto tests
├── kurpod_server/               # HTTP server with embedded frontend
│   ├── src/auth.rs              # Session-based authentication
│   ├── src/session.rs           # Split-key session management
│   ├── src/main.rs              # Server with 15 API endpoints
│   └── src/state.rs             # Application state management
├── frontend/                    # Modern React web interface
│   ├── src/components/          # 20+ reusable UI components
│   ├── src/contexts/            # Authentication and theme contexts
│   ├── src/services/            # API client with error handling
│   └── src/utils/               # File type detection and utilities
├── docs/                        # Comprehensive documentation site
│   ├── src/app/docs/            # 20+ documentation pages
│   └── DesignInternal/          # Implementation details
├── marketing-docs/              # Business and marketing materials
├── .github/workflows/           # CI/CD with multi-platform builds
└── scripts/                     # Build and deployment automation
```

---

## Documentation

- **[User Manual](docs/USER_MANUAL.md)** - Comprehensive usage guide
- **[Architecture](docs/ARCHITECTURE.md)** - Technical design documentation  
- **[Contributing](docs/CONTRIBUTING.md)** - Guidelines for contributors
- **[Security](SECURITY.md)** - Security policy and reporting

---

## Support & Community

### Getting Help
- **Bug Reports**: [GitHub Issues](https://github.com/srv1n/kurpod/issues)
- **Discussions**: [GitHub Discussions](https://github.com/srv1n/kurpod/discussions)
- **Documentation**: [docs/](https://kurpod.com) directory
- **Security Issues**: See [SECURITY.md](SECURITY.md)
- **Discord**: [Discord](https://discord.gg/Z54tGqGGRw)

### Resources
- **Releases**: [GitHub Releases](https://github.com/srv1n/kurpod/releases)
- **Docker Images**: [GitHub Container Registry](https://github.com/srv1n/kurpod/pkgs/container/kurpod)
- **Project Status**: [GitHub Actions](https://github.com/srv1n/kurpod/actions)
- **Version History**: [Releases Page](https://github.com/srv1n/kurpod/releases)

---

## Frequently Asked Questions

**Q: Can the UI prove I didn't create a hidden volume?**  
A: No. The whole point is that the blob is indistinguishable from random data, so the server/frontend cannot reveal that fact either way.

**Q: What happens when I delete files?**  
A: Deleting a file removes its metadata immediately. The encrypted data remains until you run compaction to reclaim space.

**Q: Is this ready for production use?**  
A: This is an initial release that works well for personal use and testing. The core cryptography uses established algorithms (XChaCha20-Poly1305, Argon2id), but we recommend thorough testing before critical use. Community feedback is welcome.

**Q: How do I verify downloads?**  
A: All releases include SHA256 checksums and GPG signatures. Download `SHA256SUMS` and verify with `sha256sum -c SHA256SUMS`.

**Q: What's the difference between GNU and musl builds?**  
A: GNU libc is standard on most Linux distributions. musl is smaller and works on Alpine Linux and static deployments.

**Q: Can I run this on a Raspberry Pi?**  
A: Yes! Use the ARM64 builds on 64-bit Raspberry Pi OS (Raspberry Pi 3B+ or newer).

**Q: How does session management work?**  
A: Sessions timeout after 15 minutes of inactivity or 2 hours maximum. All cryptographic material is automatically cleaned from memory.

**Q: Can I use this with cloud storage?**  
A: Yes! The blob file can be stored on cloud services (Dropbox, Google Drive, etc.) for backup, but KURPOD itself handles the encryption.


---

**Early release.** Expect bugs,help by reporting issues, and contributing.
