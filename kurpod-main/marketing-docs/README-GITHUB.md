# 🔐 Encapsule - Military-Grade Encrypted File Storage

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Rust](https://img.shields.io/badge/rust-1.70%2B-orange.svg)
![Security](https://img.shields.io/badge/security-A%2B-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Desktop%20%7C%20Mobile-lightgrey.svg)

**Encapsule** is a high-security encrypted file storage system that provides military-grade encryption with a unique twist: **plausible deniability through dual-volume support**. Store your files in an innocuous blob file that reveals different content based on which password you use.

## 🎯 Why Encapsule?

In an era of increasing digital surveillance and data breaches, Encapsule offers what cloud storage providers can't: **true zero-knowledge encryption** with **plausible deniability**. Unlike traditional encrypted storage:

- **No cloud dependency** - Your data never leaves your control
- **Plausible deniability** - Hidden volumes are mathematically indistinguishable from random data
- **Cross-platform** - One codebase for web, desktop, and mobile
- **Single file simplicity** - All your encrypted data in one portable blob file
- **No file format giveaways** - Blob files can have any extension (.jpg, .zip, .dat, etc.)

## 🚀 Key Features

### 🛡️ Military-Grade Security
- **XChaCha20-Poly1305** AEAD encryption (256-bit keys, 192-bit nonces)
- **Argon2id** password hashing (64 MiB RAM, 3 iterations) - resistant to GPU/ASIC attacks
- **Constant-time operations** to prevent timing attacks
- **Secure random generation** using OS-provided CSPRNG

### 🎭 Plausible Deniability
- **Dual Volume System**: Standard volume + Hidden volume
- **Independent passwords**: Each volume has its own password
- **No headers or signatures**: Blob files appear as random data
- **Decoy mode**: Wrong password? Show fake errors or decoy content

### 🌐 Universal Access
- **Web Server**: Self-host and access from any browser
- **Desktop App**: Native performance on Windows/macOS/Linux
- **Mobile App**: iOS and Android support (via Tauri)
- **Single Binary**: One executable, no dependencies

### 🎨 Modern User Experience
- **Drag-and-drop** file uploads
- **Folder organization** with navigation
- **Built-in media viewer** (images, PDFs)
- **Batch operations** for efficiency
- **Real-time progress** tracking
- **Responsive design** for all screen sizes

## 🔧 Technical Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│   Web Browser   │────▶│   KURPOD Server     │────▶│  Blob Storage   │
│                 │     │  (Rust + Axum)   │     │  (.blob file)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               │ Shared
                               ▼
┌─────────────────┐     ┌──────────────────┐
│                 │     │                  │
│  Desktop/Mobile │────▶│ Encryption Core  │
│  (Tauri + React)│     │  (Rust Library)  │
└─────────────────┘     └──────────────────┘
```

## 🚦 Quick Start

### Option 1: Run the Server (Easiest)

```bash
# Clone the repository
git clone https://github.com/srv1n/kurpod.git
cd kurpod

# Run with default settings (creates storage.blob)
./run.sh

# Or specify custom port and blob file
./run.sh --port 8080 --blob secret.dat
```

Visit `http://localhost:3000` (or your configured port) to access the web interface.

### Option 2: Build From Source

```bash
# Install Rust (https://rustup.rs)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Build optimized binary
./build.sh

# Run the server
./target/release/kurpod_server --blob my-storage.blob
```

### Option 3: Docker (Coming Soon)

```bash
docker run -p 3000:3000 -v ./data:/data srv1n/kurpod
```

## 📖 Usage Example

1. **Initialize Storage**: Create a new blob file with your master password
2. **Upload Files**: Drag and drop files or folders into the web interface
3. **Organize**: Create folders and organize your encrypted files
4. **Access Anywhere**: Open the blob file from any device with Encapsule

### Hidden Volume Setup (Optional)

1. After creating standard volume, click "Setup Hidden Volume"
2. Choose a different password for your hidden data
3. Switch between volumes by using different passwords at login

## 🔒 Security Considerations

### What Encapsule Protects Against:
- ✅ Unauthorized file system access
- ✅ Network traffic interception (use HTTPS)
- ✅ Brute force attacks (Argon2id)
- ✅ File tampering (AEAD)
- ✅ Metadata leakage
- ✅ Forced password disclosure (plausible deniability)

### What Encapsule Does NOT Protect Against:
- ❌ Memory dumps while unlocked
- ❌ Keyloggers on your system
- ❌ Physical access to unlocked device
- ❌ Sophisticated side-channel attacks
- ❌ Quantum computers (use post-quantum crypto when available)

## 🛠️ Advanced Configuration

### Environment Variables
```bash
RUST_LOG=info           # Logging level
ENC_BIND=0.0.0.0:3000  # Bind address
ENC_BLOB=storage.blob   # Default blob path
```

### Nginx Reverse Proxy
```nginx
server {
    listen 443 ssl http2;
    server_name secure.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🤝 Contributing

We welcome contributions! Especially in these areas:

- 🔐 Security audits and penetration testing
- 🌍 Internationalization (i18n)
- 📱 Mobile app UI/UX improvements
- 🧪 Additional test coverage
- 📚 Documentation and tutorials

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## 🎯 Use Cases

### Personal Privacy
- Secure storage for tax documents, medical records, passwords
- Protection from device theft or loss
- Privacy from cloud providers

### Journalism & Activism
- Protect sources with hidden volumes
- Cross-border data transport
- Resistance to coercion

### Business & Compliance
- GDPR/HIPAA compliant storage
- Trade secret protection
- Secure collaboration via shared blobs

### Travel & Digital Nomads
- Secure data across borders
- Protection from device inspection
- Access files from any cyber café

## 📊 Performance

- **Encryption Speed**: ~500 MB/s on modern hardware
- **Memory Usage**: <100 MB for server
- **Blob Size**: Limited by file system (tested up to 1TB)
- **Concurrent Users**: Single-user design (multi-user coming soon)

## 🗺️ Roadmap

- [ ] Multi-user support with permissions
- [ ] Blob synchronization across devices
- [ ] File versioning and snapshots
- [ ] Hardware key support (YubiKey, etc.)
- [ ] Post-quantum cryptography option
- [ ] Audit logging (optional)
- [ ] File sharing via time-limited links

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The Rust community for excellent cryptographic libraries
- Signal Protocol for inspiration on security design
- VeraCrypt for plausible deniability concepts
- Our early users and security researchers

## ⚠️ Disclaimer

This software is provided as-is. While we strive for security excellence, no system is perfect. For highest security requirements, consider additional measures like air-gapped systems and professional security audits.

---

<p align="center">
Built with ❤️ and 🦀 by <a href="https://github.com/srv1n">srv1n</a>
</p>

<p align="center">
⭐ Star us on GitHub if you find this useful!
</p>