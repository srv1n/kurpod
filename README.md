# KURPOD

**Self-hosted encrypted file storage system** with XChaCha20-Poly1305 encryption, plausible deniability, and a modern web interface.

Your own encrypted file vault - self-hosted and delivered in a single ~2MB binary.
No accounts. No tracking. No cloud dependencies.

---
## ELI5 

Think of a Kurpod file as a **portable, encrypted hard drive packed into a single file**. It's like a super secure ZIP archive or a virtual disk that you can disguise as anything you want.

Here’s how it works:

1.  **Create Your Secure Containers:** You can create as many separate Kurpod files as you need one for work projects, one for personal photos, another for tax documents. Each file acts as its own independent, secure container. When you want to access one, you open it with your password to manage its contents, just like mounting a private file system.

2.  **Fill Them Up:** Pack each container with as many private files as you need: documents, photos, videos, and even entire folders. They are all stored neatly inside that one file.

3.  **Disguise Them:** This is where the magic happens. You can name each container file anything you want, like `vacation_photos.jpg` or `project_report.pdf`. To your operating system and anyone else, they look and behave just like normal, innocent files.

4.  **Keep Them Private & Portable:** Everything inside is powerfully encrypted. The only way to see the contents is with your password. Since each container is just a single file, you can easily copy them to a USB drive, back them up, or share them with others.

### **The Hidden Compartment: Ultimate Plausible Deniability**

This is Kurpod's most powerful feature. Every Kurpod file you create actually contains a secret, secondary storage space inside it.

You set **two different passwords** for the same file:

*   **Password #1 (The Decoy):** Unlocks a "public-facing" space. You can fill this with plausible, everyday files that you wouldn't mind showing someone.
*   **Password #2 (The Real Deal):** Unlocks the hidden compartment containing your most sensitive data.

If you are ever forced to reveal a password, you can give up the decoy one. The other person will see a perfectly normal set of files and will have no way of knowing that a second, completely separate set of data is secretly hidden within the very same file, appearing as nothing more than random, unreadable data.


## How it works

1. Run kurpod server (single binary, Docker, hombrew or build from source)
2. Create encrypted blob with password
3. Access through web interface
4. Upload files - they get encrypted and stored
5. Optional: create second encrypted volume with different password

---

## Technical details

### Encryption
- Password hashing: Argon2id (64MB memory, 3 iterations)
- File encryption: XChaCha20-Poly1305 (256-bit keys, 192-bit nonces)
- Built in Rust
---

## 🚀 Quick Start

### Option 1: Homebrew (macOS - Recommended)
```bash
# Add tap and install
brew tap srv1n/kurpod https://github.com/srv1n/kurpod.git
brew install kurpod

# Start server
kurpod_server

# Access at http://localhost:3000
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

## 📋 Supported Platforms

### Desktop & Server
- **Linux**: x86_64, ARM64 (including Raspberry Pi with 64-bit OS)
- **macOS**: Intel and Apple Silicon (M1/M2/M3)
- **Windows**: x86_64 and ARM64

### Container
- **Docker**: Multi-architecture images (~4.8MB compressed)
- **Platforms**: linux/amd64, linux/arm64

---

## ✨ Features

### 🔐 Security & Privacy
- **Zero-knowledge architecture** - Server never sees unencrypted data
- **Modern encryption** - XChaCha20-Poly1305 with 256-bit keys
- **Strong key derivation** - Argon2id with 64MB memory cost
- **Plausible deniability** - Hidden volumes indistinguishable from random data
- **Session-based security** - Split-key authentication with automatic cleanup
- **Memory protection** - Cryptographic material zeroized on timeout
- **File integrity** - Authenticated encryption prevents tampering
- **No metadata leakage** - Filenames, sizes, and structure encrypted

### 🎨 User Experience
- **Modern web interface** - Drag-and-drop with real-time feedback
- **Dark/light themes** - System-aware with manual toggle
- **Multi-format preview** - Images, videos, PDFs, text, and audio
- **Mobile-responsive** - Full functionality on phones and tablets
- **Keyboard navigation** - Complete accessibility support
- **Toast notifications** - Elegant error handling and progress updates
- **File organization** - Folders, search, sorting, and batch operations
- **Video streaming** - HTTP range requests with custom controls

### ⚡ Performance & Technical
- **Streaming encryption** - Process files of any size
- **Concurrent sessions** - Multiple users with isolated authentication
- **Efficient storage** - Deduplication and compression
- **Single binary** - No external dependencies or databases
- **Container-optimized** - Multi-arch Docker images (~4.8MB)
- **Structured logging** - Configurable log levels and health checks
- **Cross-platform** - Linux, macOS, Windows (Intel and ARM)

### 🛠️ Developer Experience
- **REST API** - 15 endpoints with authentication
- **WebSocket support** - Real-time updates and notifications
- **Comprehensive testing** - Unit, integration, and security tests
- **Modern tech stack** - Rust backend, React frontend, Vite build
- **Hot reload** - Development server with instant feedback
- **Extensive documentation** - API docs, architecture guide, user manual

---

## 🔐 How It Works

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

⚠️ **Security Note**: Plausible deniability provides cryptographic protection, not legal immunity. Understand your jurisdiction's laws regarding encryption and disclosure.

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

#### macOS (Homebrew - Recommended)
```bash
# Add tap and install
brew tap srv1n/kurpod https://github.com/srv1n/kurpod.git
brew install kurpod

# Start server
kurpod_server

# Access at http://localhost:3000
# Update later
brew update && brew upgrade kurpod
```

#### Linux / macOS (Install Script)
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

# Show all options
./kurpod_server --help
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

## 🚀 Project Status

This is the **initial open source release** of KURPOD. While the core functionality is working and tested, we consider this an early version and welcome community feedback.

### ✅ What's Working
- **Session-based authentication** - Split-key security with token management
- **Web interface** - Dark/light themes, drag-and-drop, responsive design
- **Media handling** - Video streaming, thumbnail generation, file previews
- **REST API** - 15 endpoints with authentication
- **Cross-platform builds** - Linux, macOS, Windows (Intel/ARM)
- **Docker support** - Multi-arch images
- **Development tooling** - Hot reload, testing, linting, documentation

### 🔄 Known Limitations
- **Single-user sessions** - Multi-user ACLs not yet implemented
- **No built-in TLS** - Requires reverse proxy for HTTPS
- **Web-only interface** - No native mobile apps yet
- **Manual backups** - No automated backup system

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

### Testing & Quality Assurance
```bash
# Comprehensive test suite
cargo test                                    # All tests
cargo test --package encryption_core         # Cryptographic tests
cargo test session::tests::security_comprehensive_test  # Security tests
cargo test session::tests::load_test_multiple_sessions  # Load tests

# Frontend testing
cd frontend && bun test                       # Unit tests with Vitest
cd frontend && bun test:coverage              # Coverage reports
cd frontend && bun lint                       # ESLint + Prettier
cd frontend && bun lint:fix                   # Auto-fix issues

# Rust quality checks
cargo clippy                                  # Advanced linting
cargo fmt                                     # Code formatting
cargo audit                                   # Security audit
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
- **📖 Documentation**: [docs/](https://kurpod.com) directory
- **🔐 Security Issues**: See [SECURITY.md](SECURITY.md)
- **💬 Discord**: [Discord](https://discord.gg/Z54tGqGGRw)

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

## 🎯 Recent Improvements

### Session Security Enhancement
- Implemented split-key authentication architecture
- Added HMAC-SHA256 signed bearer tokens with IP/UA binding
- Automatic session cleanup with cryptographic material zeroization

### UI/UX Overhaul
- Modern React interface with dark/light theme support
- Comprehensive component library with 20+ reusable components
- Mobile-responsive design with touch-friendly interactions
- Real-time notifications and progress indicators

### Media Processing
- Native video streaming with HTTP range request support
- Browser-based thumbnail generation for videos
- Multi-format file preview (images, PDFs, text, video, audio)
- Efficient file type detection using magic bytes

### Developer Experience
- Complete API documentation with 15 authenticated endpoints
- Hot reload development server with instant feedback
- Comprehensive test suite including security and load tests
- Modern build system with Vite frontend and optimized Rust backend

### Production Readiness
- Docker images optimized for size and security
- Cross-platform binaries for all major architectures
- Structured logging with configurable levels
- Health check endpoints for monitoring and load balancing

---

**Built in Rust.** Uses established cryptography: XChaCha20-Poly1305 + Argon2id.  
**Early release.** Help us improve by testing, reporting issues, and contributing.
