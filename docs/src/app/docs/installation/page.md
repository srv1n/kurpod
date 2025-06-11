---
title: Installation
---

How to install Kurpod. It's just a single binary that runs a web server. {% .lead %}

---

## Requirements

- A computer (Linux, macOS, or Windows)
- 512 MB RAM
- Some disk space for your files
- A web browser

## Quick install

### Linux
```shell
# Intel/AMD
wget https://github.com/srv1n/kurpod/releases/latest/download/kurpod-linux-amd64.tar.gz
tar -xzf kurpod-linux-amd64.tar.gz
./kurpod_server

# ARM (Raspberry Pi)
wget https://github.com/srv1n/kurpod/releases/latest/download/kurpod-linux-arm64.tar.gz
tar -xzf kurpod-linux-arm64.tar.gz
./kurpod_server
```

### macOS
```shell
# Intel
curl -L https://github.com/srv1n/kurpod/releases/latest/download/kurpod-darwin-amd64.tar.gz -o kurpod.tar.gz
tar -xzf kurpod.tar.gz
./kurpod_server

# Apple Silicon
curl -L https://github.com/srv1n/kurpod/releases/latest/download/kurpod-darwin-arm64.tar.gz -o kurpod.tar.gz
tar -xzf kurpod.tar.gz
./kurpod_server
```

**Note**: macOS will complain about unsigned binaries. You'll need to allow it in System Preferences.

### Windows

Download from GitHub, extract, run `kurpod_server.exe`. That's it.

---

## Docker

If you prefer Docker:

```shell
docker run -d -p 3000:3000 -v kurpod_data:/app/blobs srv1n/kurpod:latest
```

Or with docker-compose:

```yaml
version: '3.8'
services:
  kurpod:
    image: srv1n/kurpod:latest
    ports:
      - "3000:3000"
    volumes:
      - ./blobs:/app/blobs
```

---

## Building from source

Need to build it yourself? You'll need:
- Rust (1.75+)
- Bun (for the frontend)
- Git

```shell
git clone https://github.com/srv1n/kurpod.git
cd kurpod
./build.sh
./kurpod_server
```

**Important**: The build script embeds the frontend into the binary. If you build manually, do the frontend first.

---

## Running it

Once installed:
1. Run `./kurpod_server` (or `kurpod_server.exe` on Windows)
2. Open http://localhost:3000 in your browser
3. Create a volume and start using it

Default port is 3000. Change with `--port 8080` if needed.

---

## Options

```shell
./kurpod_server --port 8080              # Different port
./kurpod_server --blob-dir /my/files     # Specific storage location
RUST_LOG=debug ./kurpod_server           # Debug logging
```

---

## Troubleshooting

**Can't connect?**
- Check firewall (port 3000)
- Make sure nothing else is using that port
- Look at the terminal output for errors

**Binary won't run?**
- Linux/macOS: `chmod +x kurpod_server`
- macOS: Allow in Security preferences
- Windows: Allow in Windows Defender

## Next steps

That's it. You're running Kurpod. Create a volume and start using it. Remember: **this is beta software** - don't trust it with anything you can't afford to lose.