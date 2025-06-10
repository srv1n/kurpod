# Kurpod

**Alpha release** - expect rough edges.

Your own encrypted file vault - self-hosted or on-device - under 10 MB.
No accounts. No analytics. Just a single password-protected blob that looks like random data.

## What it does

- **Private** - files are encrypted before they touch the server
- **Portable** - one blob you can move, copy, or back up like any other file
- **Plausibly hidden** - add an optional second password that nobody can prove exists

## How it works

1. **Start Kurpod** - run a 30 MB Docker container or an 8 MB binary
2. **Create a blob** - pick a file name, pick one (or two) passwords
3. **Drag files in** - your browser/app chops them into chunks, encrypts with XChaCha20-Poly1305, and streams them to the blob
4. **Done** - the server stores opaque bytes. Lose the password? The math wins; we can't help.

## Security details

- XChaCha20-Poly1305 (256-bit key, 192-bit nonce)
- Argon2id (64 MiB, 3 passes)
- Optional hidden volume - a second password unlocks a hidden area inside the same blob

**Important caveat**: Under coercion an attacker may demand both passwords. Kurpod only provides cryptographic deniability - not legal immunity.

## Try it in 30 seconds

```bash
docker run -it -p 3000:3000 ghcr.io/kurpod/kurpod:latest
open http://localhost:3000      # then pick a password
```

## Build from source

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

## Usage

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

## Sizes (release build)

| Build                      | Size  | Idle RAM |
| -------------------------- | ----- | -------- |
| Static Linux binary (musl) | 8 MB  | ~6 MB    |
| Minimal Docker image       | 30 MB | ~6 MB    |
| macOS universal app        | 11 MB | ~8 MB    |

## Alpha limitations

- **Single-user focus** - No multi-user ACL yet
- **No server-side TLS** - Use a reverse proxy
- **Plausible deniability is not magic** - A determined adversary can still compel multiple passwords. The feature only removes evidence of a second vault.
- **No audit or pen-test yet** - Expect bugs; back up the blob

## Development

```bash
./run.sh      # Run dev server
cargo test    # Run tests
```

See [docs](docs/) for more.

## FAQ

**Q: Can the UI prove I didn't create a hidden volume?**  
A: No. The whole point is that the blob is indistinguishable from random, so the server/front-end cannot reveal that fact either way.

**Q: What about deletion/compaction?**  
A: Deleting a file removes its metadata only. Run compaction to reclaim space.

## License

AGPL-3.0 - If you run this as a service, you must share your modifications.

---

**Built in Rust.** Uses public, peer-reviewed crypto: XChaCha20-Poly1305 + Argon2id.  
**Alpha release.** Kick the tires, file issues, help shape v1.