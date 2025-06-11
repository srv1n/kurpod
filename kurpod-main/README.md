# KURPOD

**Secure encrypted file storage server** with plausible deniability and zero-knowledge architecture.

Your own encrypted file vault - self-hosted or on-device - under 10 MB.
No accounts. No analytics. Just a single password-protected blob that looks like random data.

## 🚀 Quick Start

### Docker (Recommended)
```bash
# Run latest version
docker run -p 3000:3000 -v ./data:/app/data ghcr.io/srv1n/kurpod:latest

# Open browser to http://localhost:3000
```

### Binary Download
```bash
# Auto-install (Linux/macOS)
curl -sSf https://github.com/srv1n/kurpod/releases/latest/download/install.sh | bash

# Manual download from releases page
# https://github.com/srv1n/kurpod/releases
```

## ✨ What it does

- **🔒 Private** - files are encrypted before they touch the server
- **📦 Portable** - one blob you can move, copy, or back up like any other file  
- **🎭 Plausibly hidden** - add an optional second password that nobody can prove exists
- **🌐 Web interface** - drag and drop files from any device
- **🚀 Single binary** - no complex installation required

## 🔐 How it works

1. **Start KURPOD** - run a 30 MB Docker container or an 8 MB binary
2. **Create a blob** - pick a file name, pick one (or two) passwords
3. **Drag files in** - your browser chops them into chunks, encrypts with XChaCha20-Poly1305, and streams them to the blob
4. **Done** - the server stores opaque bytes. Lose the password? The math wins; we can't help.

## 🛡️ Security Features

- **XChaCha20-Poly1305** (256-bit key, 192-bit nonce)
- **Argon2id** (64 MiB, 3 passes) 
- **Optional hidden volume** - a second password unlocks a hidden area inside the same blob
- **Zero-knowledge architecture** - server never sees unencrypted data
- **Memory security** - automatic key cleanup

**Important caveat**: Under coercion an attacker may demand both passwords. KURPOD only provides cryptographic deniability - not legal immunity.

## 📋 Platform Support

| Platform | Architecture | Binary Name |
|----------|-------------|-------------|
| **Linux x86_64** | GNU/musl libc | `kurpod-v*-linux-x86_64.tar.gz` |
| **Linux ARM64** | Raspberry Pi, ARM servers | `kurpod-v*-linux-arm64.tar.gz` |
| **macOS Intel** | x86_64 | `kurpod-v*-darwin-intel.tar.gz` |
| **macOS Apple Silicon** | M1/M2/M3 | `kurpod-v*-darwin-apple-silicon.tar.gz` |
| **Windows x86_64** | 64-bit Windows | `kurpod-v*-windows-x86_64.zip` |
| **Windows ARM64** | ARM Windows | `kurpod-v*-windows-arm64.zip` |
| **Docker** | Multi-arch | `ghcr.io/srv1n/kurpod:latest` |

## 🐳 Docker Usage

```bash
# Basic usage
docker run -p 3000:3000 ghcr.io/srv1n/kurpod:latest

# With persistent storage
docker run -p 3000:3000 -v ./data:/app/data ghcr.io/srv1n/kurpod:latest

# Specific version
docker run -p 3000:3000 ghcr.io/srv1n/kurpod:v0.2.0

# Custom port and blob location
docker run -p 8080:8080 -v ./secure:/app/data ghcr.io/srv1n/kurpod:latest --port 8080
```

### Docker Image Details
- **Registry**: GitHub Container Registry (GHCR) - Free for public repos
- **Multi-arch**: Supports both `linux/amd64` and `linux/arm64`
- **Size**: ~30 MB compressed, ~60 MB uncompressed
- **Base**: Distroless for security (no shell, minimal attack surface)

**View containers**: https://github.com/srv1n/kurpod/pkgs/container/kurpod

## 💾 Binary Usage

```bash
# Basic usage
./kurpod_server                              # uses ./blobs directory
./kurpod_server --blob /secure/storage.blob  # single blob mode
./kurpod_server --port 8080                  # custom port
```

Then:
1. Navigate to `http://localhost:3000`
2. Create new storage or unlock existing
3. Drag and drop files

## 🔧 Build from Source

```bash
# Prerequisites: Rust and Bun
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
curl -fsSL https://bun.sh/install | bash

# Clone and build
git clone https://github.com/srv1n/kurpod.git
cd kurpod
./build.sh
./run.sh
```

## 📊 Sizes (release build)

| Build | Size | Idle RAM |
|-------|------|----------|
| Static Linux binary (musl) | 8 MB | ~6 MB |
| Minimal Docker image | 30 MB | ~6 MB |
| macOS Intel/Apple Silicon | 11 MB | ~8 MB |
| Windows executable | 9 MB | ~7 MB |

## 🚧 Alpha Limitations

- **Single-user focus** - No multi-user ACL yet
- **No server-side TLS** - Use a reverse proxy for HTTPS
- **Plausible deniability is not magic** - A determined adversary can still compel multiple passwords
- **No audit or pen-test yet** - Expect bugs; back up the blob

## 🛠️ Development

```bash
./run.sh      # Run dev server with hot-reload
cargo test    # Run Rust tests
cd frontend && bun dev  # Frontend development server
cargo clippy  # Lint Rust code
cd frontend && bun lint # Lint frontend code
```

See [docs/](docs/) for detailed documentation.

## 🔄 Release Process

This project uses automated releases:

1. **Regular development** → Push to main (no builds triggered)
2. **Create release** → Manual workflow dispatch or tag push
3. **Multi-platform builds** → Automatic GitHub Actions
4. **Docker images** → Published to GHCR automatically

Release artifacts include:
- Binaries for all platforms with checksums
- Multi-arch Docker images
- Installation scripts
- Combined SHA256SUMS file

## ❓ FAQ

**Q: Can the UI prove I didn't create a hidden volume?**  
A: No. The whole point is that the blob is indistinguishable from random, so the server/front-end cannot reveal that fact either way.

**Q: What about deletion/compaction?**  
A: Deleting a file removes its metadata only. Run compaction to reclaim space.

**Q: Is this production ready?**  
A: Alpha release. Good for testing and evaluation, but back up your blob files.

**Q: How do I verify downloads?**  
A: All releases include SHA256 checksums. Download `SHA256SUMS` and verify with `sha256sum -c SHA256SUMS`.

**Q: What's the difference between GNU and musl builds?**  
A: GNU libc is standard on most Linux distros. musl is smaller and works on Alpine Linux and static deployments.

## 📚 Documentation

- [User Manual](docs/USER_MANUAL.md) - Comprehensive usage guide
- [Architecture](docs/ARCHITECTURE.md) - Technical design documentation  
- [Contributing](docs/CONTRIBUTING.md) - Guidelines for contributors

## 🤝 Support

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/srv1n/kurpod/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/srv1n/kurpod/discussions)
- **📦 Releases**: [GitHub Releases](https://github.com/srv1n/kurpod/releases)
- **🐳 Docker Images**: [GitHub Container Registry](https://github.com/srv1n/kurpod/pkgs/container/kurpod)

---

**Built in Rust.** Uses public, peer-reviewed crypto: XChaCha20-Poly1305 + Argon2id.  
**Alpha release.** Kick the tires, file issues, help shape v1.

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPLv3)**.

This means:
- ✅ **Free to use** for personal and commercial purposes
- ✅ **Free to modify** and distribute
- ✅ **Free to self-host** and run your own instance
- ⚠️ **Source code sharing required** if you run this as a network service
- ⚠️ **Modifications must be shared** under the same license

If you run KURPOD as a service (including internal company use), you must make your source code (including any modifications) available under AGPLv3.

See the [LICENSE](LICENSE) file for full details.