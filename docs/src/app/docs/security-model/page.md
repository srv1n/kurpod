---
title: Security model
---

Understand Kurpod's security architecture and design decisions. Learn how we protect your data at every layer. {% .lead %}

---

## Security principles

Kurpod is built on five fundamental security principles:

### 1. Zero knowledge
The server knows nothing about your data:
- Encryption happens client-side
- Passwords never leave your browser
- No plaintext on the server
- No metadata about file contents

### 2. Defense in depth
Multiple layers of protection:
- Strong encryption (XChaCha20-Poly1305)
- Secure key derivation (Argon2id)
- Plausible deniability (dual volumes)
- Operational security features

### 3. Fail secure
When something goes wrong, we fail safely:
- Errors don't leak information
- Crashes leave data encrypted
- Network failures maintain security
- No fallback to weaker modes

### 4. Minimal attack surface
Less code means fewer vulnerabilities:
- Single-purpose application
- No unnecessary features
- Minimal dependencies
- Regular security audits

### 5. Transparency
Security through openness:
- Open source code
- Published security audits
- Documented threat model
- Community review

---

## Architecture overview

```
┌─────────────────────────────────────────────────────┐
│                   Client (Browser)                   │
├─────────────────────────────────────────────────────┤
│  • Password input (never transmitted)               │
│  • Key derivation (Argon2id)                        │
│  • Encryption/Decryption (XChaCha20-Poly1305)      │
│  • File chunking and streaming                     │
└────────────────────┬───────────────────────────────┘
                     │ HTTPS
                     │ (Encrypted blob data only)
┌────────────────────▼───────────────────────────────┐
│                   Server (Rust)                     │
├─────────────────────────────────────────────────────┤
│  • Blob storage management                          │
│  • No knowledge of contents                         │
│  • No password handling                             │
│  • Rate limiting and access control                │
└────────────────────┬───────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────┐
│              Storage (Encrypted Blob)               │
├─────────────────────────────────────────────────────┤
│  • Encrypted file contents                          │
│  • Encrypted metadata                               │
│  • Random padding                                   │
│  • Optional hidden volume                           │
└─────────────────────────────────────────────────────┘
```

---

## Cryptographic design

### Key hierarchy

```
User Password
     │
     ├─[Argon2id]─→ Master Key (256 bits)
     │                    │
     │                    ├─[HKDF]─→ Encryption Key
     │                    ├─[HKDF]─→ Authentication Key
     │                    └─[HKDF]─→ Metadata Key
     │
     └─[Different path for hidden volume]
```

### Encryption flow

1. **File preparation**
   - Read file in chunks
   - Compress if beneficial
   - Pad to obscure size

2. **Encryption**
   - Generate random nonce (192 bits)
   - Encrypt with XChaCha20
   - Authenticate with Poly1305
   - Combine into AEAD ciphertext

3. **Storage**
   - Prepend nonce to ciphertext
   - Store in blob with metadata
   - Update encrypted index

### Authentication

Every operation is authenticated:
- File contents (Poly1305 tags)
- Metadata (separate authentication)
- API requests (JWT tokens)
- WebSocket connections (token auth)

---

## Threat model

### What we protect against

#### 1. Server compromise
- **Threat**: Attacker gains server access
- **Protection**: All data encrypted, no keys on server
- **Result**: Attacker gets encrypted blobs only

#### 2. Network eavesdropping
- **Threat**: Man-in-the-middle attacks
- **Protection**: HTTPS + pre-encrypted data
- **Result**: Double encryption, no plaintext

#### 3. Legal compulsion
- **Threat**: Forced password disclosure
- **Protection**: Plausible deniability
- **Result**: Reveal standard volume only

#### 4. Physical theft
- **Threat**: Device/drive stolen
- **Protection**: Everything encrypted at rest
- **Result**: Thief gets encrypted data only

#### 5. Memory analysis
- **Threat**: RAM dump while running
- **Protection**: Key zeroing, minimal lifetime
- **Result**: Limited exposure window

### What we DON'T protect against

#### 1. Compromised client
- Keyloggers capturing passwords
- Malware on user's device
- Browser vulnerabilities

#### 2. Weak passwords
- Brute force attacks
- Dictionary attacks
- Social engineering

#### 3. Implementation bugs
- Undiscovered vulnerabilities
- Side-channel attacks
- Zero-day exploits

#### 4. Advanced persistent threats
- Nation-state actors
- Hardware implants
- Supply chain attacks

---

## Access control

### Authentication layers

1. **Password verification**
   - Argon2id verification
   - Timing-safe comparison
   - Rate limiting

2. **Token generation**
   - JWT with expiration
   - Secure random generation
   - Single-use refresh tokens

3. **Session management**
   - Automatic timeout
   - Secure cookie flags
   - CSRF protection

### Authorization model

```
User → Password → Volume → Files
                    │
                    ├─ Standard Volume
                    │   └─ Files A, B, C
                    │
                    └─ Hidden Volume
                        └─ Files X, Y, Z
```

Each volume is completely isolated:
- Independent file systems
- Separate encryption keys
- No cross-references

---

## Network security

### HTTPS enforcement

Production deployments must use HTTPS:
```nginx
server {
    listen 443 ssl http2;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
}
```

### API security

- Rate limiting per IP
- Request size limits
- CORS configuration
- Input validation
- Output sanitization

### WebSocket security

- Token-based auth
- Origin validation
- Message size limits
- Automatic disconnection

---

## Operational security

### Logging

What we log:
- Access timestamps
- Error conditions
- Performance metrics

What we DON'T log:
- Passwords (any form)
- File names
- File contents
- Search queries
- User behavior

### Memory security

- Sensitive data in protected memory
- Explicit zeroing after use
- No swap to disk
- Minimal key lifetime

### Process isolation

- Run as non-root user
- Minimal capabilities
- Seccomp filters (Linux)
- Sandbox restrictions

---

## Client-side security

### Browser environment

```javascript
// Secure context required
if (!window.isSecureContext) {
    throw new Error('HTTPS required');
}

// Crypto API usage
const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
);
```

### Memory management

- Clear sensitive data
- Avoid string operations
- Use TypedArrays
- Garbage collection aware

### Storage

- No localStorage for secrets
- IndexedDB encryption
- Session-only cookies
- Cache control headers

---

## Security features

### Plausible deniability
- Dual-volume architecture
- Hidden volume undetectable
- Appears as random data
- Legal protection

### Anti-forensics
- No activity logs
- Timestamp obfuscation
- Size padding
- Pattern masking

### Side-channel resistance
- Constant-time operations
- Cache-timing resistant
- Power analysis resistant
- No conditional branches

---

## Incident response

### Security disclosure

Found a vulnerability?

1. **Don't**: Post publicly
2. **Do**: Email security@kurpod.org
3. **Include**: 
   - Description
   - Proof of concept
   - Impact assessment
4. **Timeline**: 90-day disclosure

### Update process

1. Security patch developed
2. Private testing
3. Coordinated disclosure
4. Public release
5. Advisory published

---

## Compliance

### Standards alignment

- **NIST**: Following cryptographic guidelines
- **OWASP**: Web security best practices
- **GDPR**: Privacy by design
- **SOC2**: Security controls (pending)

### Certifications

- Regular security audits
- Penetration testing
- Code review
- Compliance validation

---

## Security checklist

For administrators:

- [ ] HTTPS enabled with valid certificate
- [ ] Strong admin passwords (25+ characters)
- [ ] Regular security updates applied
- [ ] Firewall configured correctly
- [ ] Logs monitored for anomalies
- [ ] Backups encrypted and tested
- [ ] Access controls reviewed
- [ ] Incident response plan ready

For users:

- [ ] Strong unique passwords
- [ ] Password manager usage
- [ ] 2FA where available
- [ ] Regular security training
- [ ] Suspicious activity reporting
- [ ] Clean device hygiene
- [ ] Secure network usage
- [ ] Backup verification

---

## Future enhancements

Planned security improvements:

1. **Hardware key support**: FIDO2/WebAuthn
2. **Post-quantum crypto**: Preparing for quantum computers
3. **Formal verification**: Mathematical proof of security
4. **Bug bounty program**: Incentivized security research
5. **Security audit**: Third-party assessment

---

## Summary

Kurpod's security model provides:

- **Strong encryption**: State-of-the-art algorithms
- **Zero knowledge**: Server can't access data
- **Plausible deniability**: Hidden volume protection
- **Defense in depth**: Multiple security layers
- **Open source**: Transparent and auditable

Security is not a feature - it's the foundation of everything we build.