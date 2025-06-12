# KURPOD

**Secure encrypted file storage server** with plausible deniability and zero-knowledge architecture.

Your own encrypted file vault - self-hosted or on-device - under 10 MB.
No accounts. No analytics. Just a single password-protected blob that looks like random data.

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
# Run latest version
docker run -p 3000:3000 -v ./data:/app/data ghcr.io/srv1n/kurpod:latest

# Open browser to http://localhost:3000
```

### Option 2: Auto-Install Script
```bash
# Auto-install for Linux/macOS
curl -sSf https://github.com/srv1n/kurpod/releases/latest/download/install.sh | bash

# Then run
kurpod_server
```

### Option 3: Manual Download
Download the appropriate binary for your platform from the [releases page](https://github.com/srv1n/kurpod/releases).

---

## 📋 System Requirements

### Minimum Requirements
- **RAM**: 64 MB minimum, 256 MB recommended
- **Storage**: 50 MB for application, plus storage for your encrypted data
- **Network**: TCP port 3000 (configurable)

### Supported Operating Systems

#### Linux
- **x86_64** (Intel/AMD 64-bit)
  - Ubuntu 18.04+ / Debian 10+
  - RHEL/CentOS 7+ / Rocky Linux 8+
  - Fedora 30+
  - Arch Linux (current)
- **ARM64** (64-bit ARM)
  - Raspberry Pi 3B+ and newer (64-bit OS)
  - ARM-based servers and containers
- **MUSL variants** for Alpine Linux and static deployments

#### macOS
- **Intel x86_64**: macOS 10.14 (Mojave) or later
- **Apple Silicon (M1/M2/M3)**: macOS 11.0 (Big Sur) or later
- Signed and notarized binaries (no Gatekeeper warnings)

#### Windows
- **x86_64**: Windows 10 version 1903 or later
- **ARM64**: Windows 11 on ARM (Surface Pro X, etc.)
- No additional dependencies required

#### Docker
- **Platforms**: linux/amd64, linux/arm64
- **Base Image**: Distroless (no shell, minimal attack surface)
- **Size**: ~30 MB compressed, ~60 MB uncompressed
- Docker 20.10+ or compatible runtime

---

## ✨ Features

### Security & Privacy
- **🔒 Zero-knowledge architecture** - Server never sees unencrypted data
- **🔐 Military-grade encryption** - XChaCha20-Poly1305 (256-bit key, 192-bit nonce)
- **🛡️ Strong key derivation** - Argon2id (64 MiB memory, 3 iterations)
- **🎭 Plausible deniability** - Optional hidden volume with separate password
- **🧹 Memory security** - Automatic cryptographic material cleanup
- **✅ File integrity** - Authenticated encryption prevents tampering

### User Experience
- **🌐 Modern web interface** - Drag-and-drop file management
- **📱 Cross-platform** - Access from any device with a web browser
- **📦 Single binary** - No complex installation or dependencies
- **🚀 Lightweight** - Uses minimal system resources
- **⚡ Fast startup** - Ready in seconds, not minutes

### Technical
- **📊 Efficient storage** - Deduplication and compression
- **🔄 Session management** - Automatic timeout and cleanup
- **📈 Scalable** - Handles large files and many concurrent uploads
- **🐳 Container-ready** - Docker images with multi-arch support
- **🔧 Configurable** - Custom ports, storage locations, and settings

---

## 🔐 How It Works

1. **Start KURPOD** - Run the binary or Docker container
2. **Create a blob** - Choose a filename and one (or two) passwords
3. **Upload files** - Browser encrypts chunks and streams them securely
4. **Access anywhere** - Files are encrypted at rest and in transit

### Encryption Details
- **Algorithm**: XChaCha20-Poly1305 AEAD (Authenticated Encryption with Associated Data)
- **Key derivation**: Argon2id with 64 MiB memory usage and 3 passes
- **Nonce**: 192-bit random nonce per chunk (never reused)
- **Authentication**: Each chunk includes authentication tag to prevent tampering
- **Metadata**: File names and structure are also encrypted

### Plausible Deniability
The hidden volume feature allows you to have two separate encrypted volumes within the same blob file:
- **Standard volume**: Accessed with your regular password
- **Hidden volume**: Accessed with a different password
- **Deniability**: Nobody can prove the hidden volume exists

⚠️ **Important**: This provides cryptographic deniability, not legal immunity. Under coercion, an attacker may demand both passwords.

---

## 📦 Installation Options

### Docker Installation

#### Basic Usage
```bash
# Pull and run latest version
docker run -p 3000:3000 ghcr.io/srv1n/kurpod:latest

# With persistent storage
mkdir -p ./kurpod-data
docker run -p 3000:3000 -v ./kurpod-data:/app/data ghcr.io/srv1n/kurpod:latest

# Custom port and configuration
docker run -p 8080:8080 -v ./kurpod-data:/app/data ghcr.io/srv1n/kurpod:latest --port 8080
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  kurpod:
    image: ghcr.io/srv1n/kurpod:latest
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    command: ["--port", "3000", "--blob", "/app/data/storage.blob"]
```

#### Available Tags
- `latest` - Latest stable release
- `v1.0.0` - Specific version tags
- `main` - Development builds (not recommended for production)

**Registry**: GitHub Container Registry (GHCR) - https://github.com/srv1n/kurpod/pkgs/container/kurpod

### Binary Installation

#### Linux / macOS
```bash
# Download auto-installer
curl -sSf https://github.com/srv1n/kurpod/releases/latest/download/install.sh | bash

# Or manual download and extract
wget https://github.com/srv1n/kurpod/releases/latest/download/kurpod-v1.0.0-linux-x86_64.tar.gz
tar -xzf kurpod-v1.0.0-linux-x86_64.tar.gz
chmod +x kurpod_server
./kurpod_server
```

#### Windows
1. Download `kurpod-v*-windows-x86_64.zip` from [releases](https://github.com/srv1n/kurpod/releases)
2. Extract the ZIP file
3. Run `kurpod_server.exe`
4. Open browser to `http://localhost:3000`

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

# Bind to specific interface
./kurpod_server --host 127.0.0.1 --port 3000

# Show all options
./kurpod_server --help
```

### Environment Variables
```bash
# Port configuration
export KURPOD_PORT=3000

# Data directory
export KURPOD_DATA_DIR=/opt/kurpod/data

# Log level (error, warn, info, debug, trace)
export RUST_LOG=kurpod_server=info,encryption_core=info
```

### Security Recommendations

#### Network Security
- **Use HTTPS**: Deploy behind a reverse proxy (nginx, Caddy, Traefik) with SSL/TLS
- **Firewall**: Restrict access to trusted networks
- **VPN**: Consider VPN access for remote usage

#### Storage Security
- **Backup**: Regularly backup your blob files
- **Storage**: Use encrypted storage (LUKS, FileVault, BitLocker) for additional protection
- **Permissions**: Restrict file permissions on blob files (`chmod 600`)

#### Operational Security
- **Passwords**: Use strong, unique passwords for both standard and hidden volumes
- **Sessions**: Log out when finished (automatic timeout after 15 minutes)
- **Updates**: Keep KURPOD updated to the latest version

---

## 📊 Performance & Sizing

### Binary Sizes (Release Build)
| Platform | Compressed | Uncompressed | Idle RAM |
|----------|------------|--------------|----------|
| Linux x86_64 (GNU) | 8.2 MB | 22 MB | ~6 MB |
| Linux x86_64 (musl) | 7.8 MB | 21 MB | ~5 MB |
| Linux ARM64 | 8.1 MB | 22 MB | ~6 MB |
| macOS Intel | 8.5 MB | 23 MB | ~8 MB |
| macOS Apple Silicon | 8.3 MB | 22 MB | ~7 MB |
| Windows x86_64 | 8.9 MB | 24 MB | ~7 MB |
| Docker Image | 30 MB | 60 MB | ~6 MB |

### Performance Characteristics
- **Startup time**: < 1 second
- **File upload**: Limited by network and storage I/O
- **Concurrent users**: Supports multiple simultaneous sessions
- **Memory usage**: Scales with number of active sessions and file operations
- **Storage efficiency**: Encrypted chunks with minimal overhead

---

## 🚧 Current Limitations (Alpha Release)

### Known Limitations
- **Single-user focus** - No multi-user access control lists (ACLs) yet
- **No server-side TLS** - Requires reverse proxy for HTTPS
- **No mobile apps** - Web interface only (mobile-friendly)
- **Limited audit** - No formal security audit or penetration testing yet
- **File size limits** - Large files (>2GB) may require optimization

### Planned Features (v1.0 Roadmap)
- [ ] Built-in HTTPS/TLS support
- [ ] Multi-user support with permissions
- [ ] Mobile applications (iOS/Android)
- [ ] Server-side search and indexing
- [ ] Backup and synchronization tools
- [ ] REST API for third-party integrations
- [ ] Formal security audit

---

## 🔒 Security Verification

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
- **Windows**: Authenticode signing planned for v1.0

---

## 🛠️ Development

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

### Testing Commands
```bash
# Rust tests
cargo test                           # All tests
cargo test --package encryption_core # Core crypto tests
cargo test session::tests           # Session management tests

# Frontend linting
cd frontend && bun lint              # ESLint + Prettier
cd frontend && bun lint:fix          # Auto-fix issues

# Rust linting
cargo clippy                         # Clippy lints
cargo fmt                           # Format code
```

### Project Structure
```
kurpod/
├── encryption_core/          # Core cryptographic operations
│   ├── src/blob.rs          # Blob file format and operations
│   └── tests/               # Crypto and blob tests
├── kurpod_server/           # HTTP server and web interface
│   └── src/                 # Server implementation
├── frontend/                # React web interface
│   ├── src/components/      # UI components
│   └── src/                 # Application code
├── docs/                    # Documentation
├── .github/workflows/       # CI/CD pipelines
└── build scripts           # Development and build tools
```

---

## 📚 Documentation

- **[User Manual](docs/USER_MANUAL.md)** - Comprehensive usage guide
- **[Architecture](docs/ARCHITECTURE.md)** - Technical design documentation  
- **[Contributing](docs/CONTRIBUTING.md)** - Guidelines for contributors
- **[Security](SECURITY.md)** - Security policy and reporting

---

## 🤝 Support & Community

### Getting Help
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/srv1n/kurpod/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/srv1n/kurpod/discussions)
- **📖 Documentation**: [docs/](docs/) directory
- **🔐 Security Issues**: See [SECURITY.md](SECURITY.md)

### Resources
- **📦 Releases**: [GitHub Releases](https://github.com/srv1n/kurpod/releases)
- **🐳 Docker Images**: [GitHub Container Registry](https://github.com/srv1n/kurpod/pkgs/container/kurpod)
- **📊 Project Status**: [GitHub Actions](https://github.com/srv1n/kurpod/actions)
- **🏷️ Version History**: [Releases Page](https://github.com/srv1n/kurpod/releases)

---

## ❓ Frequently Asked Questions

**Q: Can the UI prove I didn't create a hidden volume?**  
A: No. The whole point is that the blob is indistinguishable from random data, so the server/frontend cannot reveal that fact either way.

**Q: What happens when I delete files?**  
A: Deleting a file removes its metadata immediately. The encrypted data remains until you run compaction to reclaim space.

**Q: Is this production ready?**  
A: This is an alpha release. It's suitable for testing and evaluation, but always backup your blob files. We're working toward v1.0 with additional security audits.

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

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPLv3)**.

### What this means:
- ✅ **Free to use** for personal and commercial purposes
- ✅ **Free to modify** and distribute
- ✅ **Free to self-host** and run your own instance
- ⚠️ **Source code sharing required** if you run this as a network service
- ⚠️ **Modifications must be shared** under the same license

If you run KURPOD as a service (including internal company use), you must make your source code (including any modifications) available under AGPLv3.

See the [LICENSE](LICENSE) file for full details.

---

**Built in Rust.** Uses public, peer-reviewed cryptography: XChaCha20-Poly1305 + Argon2id.  
**Alpha release.** Help us reach v1.0 by testing, reporting issues, and contributing.

*Last updated: December 2024*