# Docker Deployment Guide

This guide covers building and deploying Kurpod using Docker with support for both x86_64 and ARM64 (Raspberry Pi) platforms.

## Quick Start

### Single Architecture Build (Current Platform)
```bash
# Build for your current platform
./build-docker.sh

# Run with docker-compose
docker compose up -d
```

### Multi-Architecture Build (x86_64 + ARM64)
```bash
# Build for current platform only (local testing)
./build-multiarch.sh --load

# Build for both x86_64 and ARM64 (requires registry push)
./build-multiarch.sh
```

## Image Details

- **Base Image**: `gcr.io/distroless/cc-debian12` (minimal, secure)
- **Final Size**: ~39MB
- **Architecture Support**: x86_64, ARM64 (aarch64)
- **Frontend**: Embedded via `rust-embed` (no separate serving needed)

## Docker Compose

The `docker-compose.yml` includes:

- **Main Service**: Kurpod server
- **Nginx Proxy**: Optional reverse proxy with HTTPS
- **Security**: Distroless container with minimal privileges
- **Persistence**: Named volume for encrypted data

### Configuration

```yaml
services:
  kurpod:
    image: kurpod:latest
    ports:
      - "3000:3000"
    volumes:
      - kurpod_data:/data
    environment:
      - RUST_LOG=info
```

## Platform-Specific Notes

### Raspberry Pi (ARM64)
1. Ensure you have ARM64 OS (64-bit Raspberry Pi OS)
2. Use the multi-arch build script
3. The image works on Pi 3B+ and newer

### x86_64 (Intel/AMD)
Standard Docker build works on all x86_64 systems.

## Build Scripts

### `build-docker.sh`
- Standard single-platform build
- Fast local development
- Works with docker-compose

### `build-multiarch.sh`
- Multi-platform support
- Uses Docker Buildx
- Can push to registries for distribution

## Security Features

- **Distroless base**: No shell, minimal attack surface
- **Non-root execution**: Runs as unprivileged user
- **Read-only filesystem**: Container filesystem is immutable
- **Dropped capabilities**: Minimal Linux capabilities
- **No new privileges**: Prevents privilege escalation

## Storage

- **Data Volume**: `/data` - Stores encrypted blobs
- **Persistence**: Uses Docker named volumes
- **Backup**: Volume can be backed up/restored

## Networking

- **Port 3000**: HTTP server (can be proxied)
- **Health Check**: Disabled (distroless has no tools)
- **Reverse Proxy**: Optional Nginx for HTTPS/domain

## Environment Variables

- `RUST_LOG`: Log level (debug, info, warn, error)
- `ENC_FRONTEND_PATH`: Not needed (embedded)

## Troubleshooting

### Build Issues
1. **No space left**: Run `docker system prune -a`
2. **Buildx not available**: Install Docker Desktop
3. **ARM64 build fails**: Ensure cross-compilation tools

### Runtime Issues
1. **Port conflicts**: Change port mapping in docker-compose.yml
2. **Permission errors**: Check volume permissions
3. **Memory issues**: Increase Docker memory limit

## Development

For development with live reload:
```bash
# Build and run locally
cargo run --bin kurpod_server

# Frontend development
cd frontend && npm run dev
```

## Production Deployment

1. **Build multi-arch image**:
   ```bash
   ./build-multiarch.sh
   ```

2. **Deploy with docker-compose**:
   ```bash
   docker compose up -d
   ```

3. **Setup reverse proxy** (optional):
   - Configure Nginx with SSL certificates
   - Point domain to server
   - Enable automatic renewal

4. **Backup strategy**:
   ```bash
   # Backup data volume
   docker run --rm -v kurpod_data:/data -v $(pwd):/backup alpine tar czf /backup/kurpod_data.tar.gz /data
   ```

## Registry Distribution

To distribute multi-arch images:

1. **Build and push**:
   ```bash
   TAG=v1.0.0 ./build-multiarch.sh
   ```

2. **Pull on target machine**:
   ```bash
   docker pull your-registry/kurpod:v1.0.0
   ```

3. **Run anywhere**:
   ```bash
   docker run -p 3000:3000 -v data:/data your-registry/kurpod:v1.0.0
   ``` 