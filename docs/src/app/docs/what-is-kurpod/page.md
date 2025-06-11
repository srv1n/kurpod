---
title: What is Kurpod?
---

Kurpod is an beta-stage encrypted file storage system with plausible deniability features. It's self-hosted and open source. {% .lead %}

---

## What it does

Kurpod encrypts your files and serves them through a web interface. The main feature is hidden volumes - you can have two separate encrypted spaces accessed with different passwords. If someone forces you to reveal a password, you can give them one that shows decoy files while keeping the real stuff hidden.

## How it works

1. You run the server on your own machine
2. Files are stored in encrypted blob files
3. Access through web browser (no special software needed)
4. Two passwords = two different sets of files
5. Hidden volume is indistinguishable from random data

---

## Technical details

### Encryption
- Password hashing: Argon2id (64MB memory)
- Encryption: XChaCha20-Poly1305
- Implementation: Rust, should be secure

### Storage
- Files go into encrypted blob files
- Header has version and salt
- Two volumes share the same blob
- Hidden volume lives in "free space"

### Access
- Web interface (included)
- REST API (if you need it)
- Desktop/mobile apps (planned, will cost money)

---

## Who might use this?

- People who need plausible deniability
- Anyone required to encrypt files
- Those who don't trust cloud storage
- People crossing borders with devices

**Note**: This is beta software. Don't use it for life-critical stuff yet.

---

## Compared to alternatives

**vs. VeraCrypt**: Easier to use, web-based, but less mature
**vs. Cloud storage**: You control it, but you maintain it
**vs. Password managers**: This is for files, not passwords

---

## Limitations

- **Beta software**: Expect bugs
- **Self-hosted only**: You need your own server
- **No mobile apps yet**: Just web for now
- **Basic features**: No sharing, collaboration, etc.
- **You manage backups**: If you lose it, it's gone

## License

Server is AGPLv3 (free forever). Desktop/mobile apps will be paid when they exist.

---

## Getting started

1. [Install it](/docs/installation)
2. Create a volume
3. Upload files
4. Don't forget your password (seriously, write it down)