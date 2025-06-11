---
title: Key features
---

Explore the features that make Kurpod the most advanced open-source encrypted file storage system available today. {% .lead %}

---

## Security features

### Military-grade encryption

Kurpod uses the same encryption standards trusted by governments and security professionals worldwide.

- **XChaCha20-Poly1305 AEAD**
  - 256-bit encryption keys
  - 192-bit nonces (larger than standard ChaCha20)
  - Authenticated encryption prevents tampering
  - Hardware accelerated on modern CPUs

- **Argon2id key derivation**
  - Winner of the Password Hashing Competition
  - 64 MiB memory cost prevents GPU attacks
  - 3 iterations balance security and performance
  - Salted to prevent rainbow tables

- **Constant-time operations**
  - No timing side channels
  - Secure against cache-timing attacks
  - Protected memory handling

### Plausible deniability

The crown jewel of Kurpod's security model - a feature that could save your life.

- **Dual-volume architecture**
  - Standard volume for everyday files
  - Hidden volume for sensitive data
  - Both volumes in the same blob file
  - Independent passwords for each

- **Mathematically indistinguishable**
  - Hidden volume looks like random data
  - No headers or signatures to detect
  - Statistical analysis can't reveal presence
  - Even we can't prove it exists

- **Legal protection**
  - Reveal standard password under duress
  - Hidden data remains protected
  - No way to prove you're hiding anything
  - Used by journalists and activists worldwide

### Zero-knowledge design

Your privacy is protected by mathematics, not promises.

- **Client-side encryption**
  - All encryption in your browser
  - Server never sees plaintext
  - Password never transmitted
  - Keys derived locally

- **No metadata leakage**
  - Filenames encrypted
  - Folder structure hidden
  - Access patterns obscured
  - File sizes padded

- **Minimal server knowledge**
  - Can't see your files
  - Can't reset your password
  - Can't comply with subpoenas
  - Can't be hacked for your data

---

## Usability features

### Intuitive web interface

Security doesn't mean complexity. Kurpod is designed for everyone.

- **Drag-and-drop uploads**
  - Drop files anywhere
  - Folder upload support
  - Progress indicators
  - Batch operations

- **File organization**
  - Create folders
  - Move and rename
  - Search functionality
  - Sort by name/date/size

- **Built-in preview**
  - Images display inline
  - PDF viewer included
  - Text file editing
  - Video/audio playback

### Cross-platform support

Use Kurpod anywhere, on any device.

- **Server platforms**
  - Linux (x64, ARM64)
  - macOS (Intel, Apple Silicon)
  - Windows (x64)
  - Docker containers

- **Client access**
  - Any modern web browser
  - No plugins required
  - Mobile responsive
  - PWA capable

- **Native apps** (Premium)
  - Windows desktop app
  - macOS desktop app
  - iOS mobile app
  - Android mobile app

### Performance optimized

Fast and efficient, even with large files.

- **Streaming encryption**
  - Process files in chunks
  - Low memory usage
  - No file size limits
  - Parallel uploads

- **Smart caching**
  - Encrypted cache layer
  - Instant file access
  - Bandwidth efficient
  - Offline capable

- **Rust powered**
  - Native performance
  - Memory safe
  - Concurrent operations
  - Minimal resource usage

---

## Deployment features

### Simple installation

Get running in minutes, not hours.

- **Single binary**
  - No dependencies
  - No database required
  - Embedded web UI
  - Portable deployment

- **Multiple storage modes**
  - Single blob file
  - Multi-blob directory
  - Network storage support
  - Cloud storage compatible

- **Easy configuration**
  - Command line flags
  - Environment variables
  - Config file support
  - Sane defaults

### Production ready

Built for reliability and scale.

- **Battle tested**
  - Used in production
  - Extensive test suite
  - Fuzz tested
  - Security audited

- **Monitoring support**
  - Structured logging
  - Prometheus metrics
  - Health endpoints
  - Debug modes

- **High availability**
  - Stateless design
  - Load balancer ready
  - Horizontal scaling
  - Backup friendly

### Docker optimized

Container-first design for modern deployments.

- **Official images**
  - Multi-architecture builds
  - Alpine and Debian variants
  - Regular security updates
  - Minimal attack surface

- **Compose ready**
  - Example configurations
  - Volume management
  - Network isolation
  - Secret handling

- **Kubernetes friendly**
  - Helm charts available
  - StatefulSet examples
  - ConfigMap support
  - Health probes

---

## Privacy features

### No tracking

Your privacy is not for sale.

- **No analytics**
  - No Google Analytics
  - No tracking pixels
  - No user profiling
  - No behavior monitoring

- **No phone home**
  - No update checks
  - No license validation
  - No usage reporting
  - No crash reporting

- **No accounts**
  - No user registration
  - No email required
  - No personal info
  - No data mining

### Self-hosted only

You own your data, period.

- **Complete control**
  - Run on your hardware
  - Choose your location
  - Set your policies
  - Control access

- **Data sovereignty**
  - Keep data in jurisdiction
  - Comply with regulations
  - Avoid cloud providers
  - Prevent vendor lock-in

- **Network isolation**
  - Air-gap capable
  - LAN-only mode
  - VPN compatible
  - Tor friendly

---

## Advanced features

### File deduplication

Save space without sacrificing security.

- **Encrypted deduplication**
  - Content-based chunking
  - Convergent encryption
  - Space efficient
  - Invisible to server

### Version control

Never lose important changes.

- **Automatic versioning**
  - Keep file history
  - Configurable retention
  - Space-efficient storage
  - Easy restoration

### Access control

Fine-grained permissions for teams.

- **Multi-user support** (Roadmap)
  - User management
  - Role-based access
  - Folder permissions
  - Audit logging

### API access

Integrate Kurpod into your workflow.

- **REST API**
  - Full functionality
  - Token authentication
  - Rate limiting
  - OpenAPI spec

- **WebDAV support** (Roadmap)
  - Mount as drive
  - Native OS integration
  - Standard protocol
  - Wide compatibility

---

## Unique advantages

What sets Kurpod apart from alternatives:

### vs. Commercial solutions
- ✅ No subscription fees
- ✅ No storage limits
- ✅ No vendor lock-in
- ✅ Complete privacy

### vs. Other open source
- ✅ Plausible deniability
- ✅ Modern web UI
- ✅ Active development
- ✅ Security focused

### vs. Cloud providers
- ✅ You control the data
- ✅ No third-party access
- ✅ Jurisdiction choice
- ✅ Cost effective

---

## Coming soon

Features in active development:

- **Collaborative editing**
- **Mobile sync**
- **Hardware key support**
- **Distributed storage**
- **Quantum-resistant crypto**

Join our [community](/docs/how-to-contribute) to help shape Kurpod's future.