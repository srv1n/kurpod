---
title: Encryption overview
---

Understand the cryptographic foundations that make Kurpod secure. This guide explains our encryption choices and implementation details. {% .lead %}

---

## Encryption stack

Kurpod uses a carefully selected stack of modern cryptographic primitives:

```
User Password
     ↓
Argon2id (Key Derivation)
     ↓
XChaCha20-Poly1305 (Encryption)
     ↓
Encrypted Blob Storage
```

Each component is chosen for specific security properties and has undergone extensive peer review.

---

## Key derivation: Argon2id

### Why Argon2id?

Argon2id won the Password Hashing Competition (2015) and represents the state-of-the-art in password-based key derivation:

- **Memory-hard**: Requires significant RAM, defeating GPU/ASIC attacks
- **Time-hard**: Computational cost prevents brute force
- **Side-channel resistant**: The 'id' variant resists timing attacks
- **Proven**: Years of cryptanalysis with no breaks

### Our parameters

```rust
Memory cost: 64 MiB (65536 KiB)
Iterations: 3
Parallelism: 4
Salt: 32 bytes (random)
Output: 32 bytes (256-bit key)
```

These parameters provide:
- ~0.5 second derivation on modern hardware
- Protection against parallel attacks
- Balance between security and usability

### Security properties

With a 12-character random password:
- **GPU attack**: ~1,000 years with 1000 GPUs
- **ASIC attack**: Cost-prohibitive even for nation-states
- **Rainbow tables**: Impossible due to salting

---

## Encryption: XChaCha20-Poly1305

### Why XChaCha20-Poly1305?

This authenticated encryption algorithm combines the best of modern cryptography:

- **ChaCha20**: Stream cipher by Daniel Bernstein
- **Extended nonce**: 192-bit vs standard 96-bit
- **Poly1305**: Authentication prevents tampering
- **AEAD**: Authenticated Encryption with Associated Data

### Technical specifications

```
Key size: 256 bits
Nonce size: 192 bits
Tag size: 128 bits
Block size: 64 bytes
Max message: 2^64 bytes
```

### Advantages over AES-GCM

1. **No timing side-channels**: Constant-time by design
2. **Faster without AES-NI**: Better on mobile/embedded
3. **Larger nonce**: Practically eliminates nonce reuse
4. **Simpler implementation**: Less room for error

### Security level

- **Encryption strength**: 256-bit (unbreakable with current technology)
- **Authentication**: 128-bit (forgery probability: 2^-128)
- **Combined**: Post-quantum security level ~128 bits

---

## Implementation details

### File encryption process

```python
# Pseudocode for clarity
def encrypt_file(plaintext, password):
    # 1. Derive key from password
    salt = random_bytes(32)
    key = argon2id(password, salt, params)
    
    # 2. Generate nonce
    nonce = random_bytes(24)  # 192 bits
    
    # 3. Encrypt with authentication
    ciphertext, tag = xchacha20_poly1305_encrypt(
        key, nonce, plaintext
    )
    
    # 4. Package for storage
    return salt + nonce + tag + ciphertext
```

### Blob structure

Each encrypted file in the blob:

```
[File Entry]
├── Metadata (encrypted)
│   ├── Filename
│   ├── Size
│   ├── Timestamps
│   └── Permissions
├── Content (encrypted)
│   ├── Original file data
│   └── Padding (if needed)
└── Authentication tag
```

### Padding scheme

To prevent file size analysis:
- Files padded to nearest 4KB boundary
- Small files: minimum 4KB
- Large files: 1% random padding
- Metadata size also obscured

---

## Cryptographic properties

### Confidentiality

- **Semantic security**: Ciphertext reveals nothing about plaintext
- **Chosen-plaintext secure**: Safe even if attacker chooses messages
- **Nonce-misuse resistant**: XChaCha's large nonce space

### Integrity

- **Authentication tags**: Every byte is authenticated
- **AEAD construction**: Encrypt-then-MAC security
- **Tamper-evident**: Any modification detected

### Forward secrecy

While Kurpod doesn't provide forward secrecy by default (same password encrypts all files), you can achieve it by:
- Regular password rotation
- Using different blobs for different time periods
- Implementing key versioning

---

## Security analysis

### What we protect against

✅ **Brute force attacks**: Argon2id makes this infeasible
✅ **Cryptanalysis**: No known attacks on primitives
✅ **Side channels**: Constant-time implementations
✅ **Tampering**: Authentication detects any changes
✅ **Replay attacks**: Nonce prevents reuse
✅ **Quantum computers**: 128-bit post-quantum security

### Attack scenarios

#### Offline attack on blob
**Scenario**: Attacker has your encrypted blob
**Protection**: Must break Argon2id + XChaCha20-Poly1305
**Time required**: Billions of years

#### Online password guessing
**Scenario**: Attacker tries passwords via web interface
**Protection**: Rate limiting, account lockout
**Attempts possible**: ~10 per minute

#### Cryptographic breakthrough
**Scenario**: XChaCha20 or Poly1305 broken
**Protection**: Would require fundamental mathematical discovery
**Likelihood**: Extremely low (would break most of internet)

---

## Best practices

### Password selection

For maximum security:
```
Entropy calculation:
- 20 random characters: ~130 bits
- 6 random words: ~77 bits
- 12 char mixed: ~72 bits

Recommended: 20+ characters or 6+ words
```

### Key management

1. **Never reuse passwords** across volumes
2. **Use a password manager** for storage
3. **Consider passphrases** for memorability
4. **Regular rotation** for high-security use

### Operational security

- **Memory protection**: Keys zeroed after use
- **Secure deletion**: Overwrite temporary files
- **Cache clearing**: No plaintext in browser cache
- **Network security**: Always use HTTPS

---

## Comparison with alternatives

### vs. AES-256-GCM
- ✅ Better side-channel resistance
- ✅ Faster on devices without AES-NI
- ✅ Larger nonce prevents reuse
- ≈ Similar security level

### vs. GPG/PGP
- ✅ Simpler key management
- ✅ Modern cryptography
- ✅ Better usability
- ❌ No public key features

### vs. Full disk encryption
- ✅ File-level granularity
- ✅ Remote access possible
- ✅ Cross-platform
- ❌ Higher overhead

---

## Future considerations

### Post-quantum cryptography

Current assessment:
- **Grover's algorithm**: Effectively 128-bit security
- **Shor's algorithm**: Doesn't apply (symmetric crypto)
- **Timeline**: 10-20 years before concern

Planned upgrades:
- Kyber for key exchange
- Dilithium for signatures
- Larger key sizes

### Algorithm agility

Kurpod is designed for future algorithm changes:
- Version field in blob header
- Abstracted crypto layer
- Backward compatibility
- Smooth migration path

---

## Cryptographic guarantees

When using Kurpod correctly, we guarantee:

1. **Confidentiality**: Only password holders can read files
2. **Integrity**: Any tampering is detected
3. **Authenticity**: Files haven't been modified
4. **Non-malleability**: Can't create valid ciphertexts

We do NOT guarantee:
- **Non-repudiation**: No digital signatures
- **Forward secrecy**: Same key encrypts all files
- **Deniability**: Can't deny files are encrypted

---

## Summary

Kurpod's encryption is built on:
- **Argon2id**: State-of-the-art password hashing
- **XChaCha20-Poly1305**: Modern authenticated encryption
- **Defense in depth**: Multiple security layers
- **Conservative choices**: Proven algorithms only

This provides bank-grade security for your files, ensuring they remain private even against sophisticated adversaries.

For implementation details, see:
- [Security model](/docs/security-model)
- [Threat model](/docs/threat-model)
- [Architecture guide](/docs/architecture-guide)