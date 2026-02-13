# Docker Deployment Guide

This guide covers deploying Kurpod using Docker with support for both x86_64 and ARM64 (Raspberry Pi) platforms.

## Quick Start

### Run Published Image (Recommended)
```bash
# Pull latest image and run with docker-compose
docker compose pull
docker compose up -d
```

### Build Locally (Current Platform)
```bash
# Build from this repository checkout
docker build -t kurpod:local .

# Run local image
docker run -p 3000:3000 -e BLOB_DIR=/data -v "$(pwd)/data:/data" kurpod:local
```

## Image Details

- **Base Image**: `scratch` (minimal, secure)
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
    image: ghcr.io/srv1n/kurpod-server:latest
    ports:
      - "3000:3000"
    volumes:
      - kurpod_data:/data
    environment:
      - RUST_LOG=info
      - BLOB_DIR=/data
```

## Platform-Specific Notes

### Raspberry Pi (ARM64)
1. Ensure you have ARM64 OS (64-bit Raspberry Pi OS)
2. Use the multi-arch build script
3. The image works on Pi 3B+ and newer

### x86_64 (Intel/AMD)
Standard Docker build works on all x86_64 systems.

## Build Notes

- Build locally with `docker build -t kurpod:local .`
- Multi-architecture publishing is handled by GitHub Actions release workflows

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
- `BLOB_DIR`: Directory used for blob storage (set to `/data` in compose)

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
   docker buildx build --platform linux/amd64,linux/arm64 -t your-registry/kurpod:v1.0.0 --push .
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
   docker buildx build --platform linux/amd64,linux/arm64 -t your-registry/kurpod:v1.0.0 --push .
   ```

2. **Pull on target machine**:
   ```bash
   docker pull your-registry/kurpod:v1.0.0
   ```

3. **Run anywhere**:
   ```bash
   docker run -p 3000:3000 -e BLOB_DIR=/data -v data:/data your-registry/kurpod:v1.0.0
   ```
