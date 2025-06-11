---
title: Docker deployment
---

Deploy Kurpod using Docker for consistent, reproducible installations across any platform. Perfect for production environments. {% .lead %}

---

## Quick start

Get Kurpod running in Docker in under a minute:

```bash
docker run -d \
  --name kurpod \
  -p 3000:3000 \
  -v kurpod_data:/app/blobs \
  srv1n/kurpod:latest
```

Access at `http://localhost:3000`

---

## Docker images

### Official images

We provide official images on Docker Hub:

- `srv1n/kurpod:latest` - Latest stable release
- `srv1n/kurpod:1.0.0` - Specific version
- `srv1n/kurpod:alpine` - Alpine-based (smaller)
- `srv1n/kurpod:debian` - Debian-based (compatible)

### Architecture support

Multi-architecture images available:
- `linux/amd64` - Standard x86_64
- `linux/arm64` - ARM servers, Apple Silicon
- `linux/arm/v7` - Raspberry Pi and similar

Docker automatically selects the correct architecture.

---

## Docker Compose

### Basic setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  kurpod:
    image: srv1n/kurpod:latest
    container_name: kurpod
    ports:
      - "3000:3000"
    volumes:
      - kurpod_data:/app/blobs
    restart: unless-stopped

volumes:
  kurpod_data:
    driver: local
```

Start with:
```bash
docker-compose up -d
```

### Advanced configuration

```yaml
version: '3.8'

services:
  kurpod:
    image: srv1n/kurpod:latest
    container_name: kurpod
    ports:
      - "127.0.0.1:3000:3000"  # Bind to localhost only
    volumes:
      - ./blobs:/app/blobs      # Host directory
      - ./config:/app/config    # Configuration
    environment:
      - RUST_LOG=info          # Log level
      - BLOB_DIR=/app/blobs    # Blob directory
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - kurpod_net
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 256M

networks:
  kurpod_net:
    driver: bridge
```

### With reverse proxy

Complete setup with Nginx:

```yaml
version: '3.8'

services:
  kurpod:
    image: srv1n/kurpod:latest
    container_name: kurpod
    expose:
      - "3000"
    volumes:
      - kurpod_data:/app/blobs
    environment:
      - RUST_LOG=info
    restart: unless-stopped
    networks:
      - web

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - kurpod
    restart: unless-stopped
    networks:
      - web

volumes:
  kurpod_data:
    driver: local

networks:
  web:
    driver: bridge
```

---

## Volume management

### Data persistence

Docker volumes ensure your encrypted data persists:

```bash
# Create named volume
docker volume create kurpod_data

# Use in container
docker run -v kurpod_data:/app/blobs ...

# Backup volume
docker run --rm \
  -v kurpod_data:/source:ro \
  -v $(pwd):/backup \
  alpine tar czf /backup/kurpod-backup.tar.gz -C /source .
```

### Bind mounts

For direct host access:

```bash
# Create directory
mkdir -p /data/kurpod/blobs

# Set permissions
chmod 700 /data/kurpod/blobs

# Mount in container
docker run -v /data/kurpod/blobs:/app/blobs ...
```

### Storage drivers

Optimize for your environment:

```yaml
volumes:
  kurpod_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /fast/ssd/kurpod
```

---

## Configuration

### Environment variables

Configure Kurpod via environment:

```bash
docker run -d \
  -e RUST_LOG=debug \
  -e BLOB_FILE=/app/blobs/storage.blob \
  -e PORT=8080 \
  srv1n/kurpod:latest
```

Available variables:
- `RUST_LOG`: Log level (error, warn, info, debug, trace)
- `BLOB_FILE`: Single blob file path
- `BLOB_DIR`: Directory for multiple blobs
- `PORT`: Override default port (3000)

### Command arguments

Pass arguments directly:

```bash
docker run -d \
  srv1n/kurpod:latest \
  --port 8080 \
  --blob-dir /app/blobs
```

### Configuration file

Mount a config file:

```bash
# config.toml
port = 8080
blob_dir = "/app/blobs"
log_level = "info"

# Run with config
docker run -d \
  -v $(pwd)/config.toml:/app/config.toml \
  srv1n/kurpod:latest \
  --config /app/config.toml
```

---

## Security hardening

### Run as non-root

Our images include a non-root user:

```yaml
services:
  kurpod:
    image: srv1n/kurpod:latest
    user: "1000:1000"  # Non-root user
```

### Read-only filesystem

Enhance security with read-only root:

```yaml
services:
  kurpod:
    image: srv1n/kurpod:latest
    read_only: true
    tmpfs:
      - /tmp
      - /run
    volumes:
      - kurpod_data:/app/blobs
```

### Security options

Apply additional restrictions:

```yaml
services:
  kurpod:
    image: srv1n/kurpod:latest
    security_opt:
      - no-new-privileges:true
      - seccomp:unconfined  # Or custom profile
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
```

### Network isolation

Isolate from external networks:

```yaml
services:
  kurpod:
    image: srv1n/kurpod:latest
    networks:
      - internal
    # No ports exposed externally

networks:
  internal:
    driver: bridge
    internal: true
```

---

## Production deployment

### Health checks

Monitor container health:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

Or in compose:

```yaml
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logging

Configure logging driver:

```yaml
services:
  kurpod:
    image: srv1n/kurpod:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=kurpod"
```

### Resource limits

Prevent resource exhaustion:

```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 256M
```

### Backup strategy

Automated backups:

```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups/kurpod"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Stop container
docker stop kurpod

# Backup volume
docker run --rm \
  -v kurpod_data:/source:ro \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/kurpod_$TIMESTAMP.tar.gz -C /source .

# Start container
docker start kurpod

# Keep last 7 days
find $BACKUP_DIR -name "kurpod_*.tar.gz" -mtime +7 -delete
```

---

## Orchestration

### Docker Swarm

Deploy as a service:

```bash
# Initialize swarm
docker swarm init

# Create service
docker service create \
  --name kurpod \
  --publish published=3000,target=3000 \
  --mount type=volume,source=kurpod_data,destination=/app/blobs \
  --replicas 1 \
  --constraint 'node.role==worker' \
  srv1n/kurpod:latest
```

### Kubernetes

Basic deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kurpod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kurpod
  template:
    metadata:
      labels:
        app: kurpod
    spec:
      containers:
      - name: kurpod
        image: srv1n/kurpod:latest
        ports:
        - containerPort: 3000
        volumeMounts:
        - name: data
          mountPath: /app/blobs
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: kurpod-pvc
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs kurpod

# Inspect container
docker inspect kurpod

# Run interactively
docker run -it --rm srv1n/kurpod:latest /bin/sh
```

### Permission issues

```bash
# Fix volume permissions
docker run --rm \
  -v kurpod_data:/app/blobs \
  alpine chown -R 1000:1000 /app/blobs
```

### Performance issues

```bash
# Monitor resources
docker stats kurpod

# Check I/O
docker exec kurpod iostat -x 1

# Profile CPU
docker exec kurpod top
```

### Network problems

```bash
# Test connectivity
docker exec kurpod ping -c 4 google.com

# Check ports
docker port kurpod

# Inspect network
docker network inspect bridge
```

---

## Building custom images

### Dockerfile example

```dockerfile
FROM srv1n/kurpod:latest

# Add custom config
COPY config.toml /app/config.toml

# Install additional tools
RUN apk add --no-cache curl

# Set custom entrypoint
ENTRYPOINT ["/app/kurpod_server", "--config", "/app/config.toml"]
```

Build and run:
```bash
docker build -t my-kurpod .
docker run -d my-kurpod
```

---

## Best practices

1. **Always use volumes** for data persistence
2. **Run as non-root** user when possible
3. **Use health checks** for monitoring
4. **Limit resources** to prevent DoS
5. **Keep images updated** for security
6. **Use specific tags** in production
7. **Implement backups** before going live
8. **Monitor logs** for issues
9. **Use secrets** for sensitive config
10. **Test upgrades** in staging first

---

## Next steps

- Set up [Reverse proxy](/docs/reverse-proxy) for HTTPS
- Configure [Backup strategies](/docs/backup-strategies)
- Review [Security hardening](/docs/security-hardening)
- Monitor with [Prometheus/Grafana](/docs/monitoring)