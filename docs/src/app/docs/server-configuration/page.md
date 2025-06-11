---
title: Server configuration
---

Configure Kurpod server for optimal performance and security. Learn about all available options and best practices. {% .lead %}

---

## Command line options

Kurpod accepts the following command-line arguments:

```bash
kurpod_server [OPTIONS]

Options:
  -p, --port <PORT>              Port to listen on [default: 3000]
  -b, --blob <BLOB>              Path to blob file (single-blob mode)
      --blob-dir <DIR>           Directory containing blob files
  -c, --config <FILE>            Configuration file path
      --max-upload <SIZE>        Maximum upload size [default: 100MB]
      --rate-limit <N>           Max requests per minute [default: 100]
      --log-level <LEVEL>        Log verbosity [default: info]
  -h, --help                     Print help
  -V, --version                  Print version
```

### Examples

```bash
# Basic usage with defaults
./kurpod_server

# Custom port and blob location
./kurpod_server --port 8080 --blob /secure/storage.blob

# Directory mode with verbose logging
./kurpod_server --blob-dir /data/blobs --log-level debug

# Using configuration file
./kurpod_server --config /etc/kurpod/config.toml
```

---

## Environment variables

Configure Kurpod using environment variables:

```bash
# Logging
export RUST_LOG=info                    # Log level (error, warn, info, debug, trace)
export RUST_BACKTRACE=1                 # Enable backtraces

# Storage
export BLOB_FILE=/path/to/storage.blob  # Single blob file
export BLOB_DIR=/path/to/blobs          # Blob directory

# Server
export KURPOD_PORT=3000                 # Listen port
export KURPOD_HOST=0.0.0.0             # Bind address
export KURPOD_WORKERS=4                 # Worker threads

# Security
export KURPOD_MAX_UPLOAD=104857600      # Max upload size (bytes)
export KURPOD_RATE_LIMIT=100            # Requests per minute
export KURPOD_CORS_ORIGIN=*             # CORS allowed origins
```

### Precedence

Configuration precedence (highest to lowest):
1. Command-line arguments
2. Environment variables
3. Configuration file
4. Default values

---

## Configuration file

For complex setups, use a TOML configuration file:

### Basic configuration

```toml
# /etc/kurpod/config.toml

# Server settings
[server]
host = "0.0.0.0"
port = 3000
workers = 4
max_connections = 1000

# Storage settings
[storage]
mode = "directory"              # "single" or "directory"
path = "/var/lib/kurpod/blobs"
max_blob_size = "10GB"
compression = true

# Security settings
[security]
max_upload_size = "100MB"
rate_limit = 100
allowed_origins = ["https://example.com"]
require_https = true

# Logging
[logging]
level = "info"
format = "json"
file = "/var/log/kurpod/server.log"
rotate_size = "100MB"
rotate_count = 7
```

### Advanced configuration

```toml
# Advanced settings

[server]
host = "127.0.0.1"
port = 3000
workers = 8
max_connections = 10000
keep_alive = 75
request_timeout = 30
body_limit = "100MB"

[storage]
mode = "directory"
path = "/data/kurpod/blobs"
max_blob_size = "50GB"
compression = true
compression_level = 6
deduplication = true
fsync = true

[security]
max_upload_size = "500MB"
rate_limit = 1000
rate_limit_window = 60
allowed_origins = [
    "https://app.example.com",
    "https://backup.example.com"
]
allowed_methods = ["GET", "POST", "PUT", "DELETE"]
require_https = true
hsts_max_age = 31536000
csrf_protection = true
max_password_attempts = 5
lockout_duration = 900

[cache]
enabled = true
size = "1GB"
ttl = 3600
strategy = "lru"

[monitoring]
metrics_enabled = true
metrics_port = 9090
health_check_path = "/health"
status_path = "/status"

[logging]
level = "info"
format = "json"
file = "/var/log/kurpod/server.log"
stdout = true
stderr = false
rotate_size = "100MB"
rotate_count = 14
syslog = true
syslog_facility = "local0"

[database]
# Future: Multi-user support
type = "sqlite"
path = "/var/lib/kurpod/users.db"
pool_size = 10
timeout = 30

[features]
webdav = false
api_v2 = false
multi_user = false
audit_log = true
```

---

## Storage modes

### Single blob mode

Best for personal use or small deployments:

```bash
# Command line
./kurpod_server --blob /secure/storage.blob

# Config file
[storage]
mode = "single"
path = "/secure/storage.blob"
```

Characteristics:
- One file contains everything
- Easy to backup
- Simple permissions
- Limited scalability

### Directory mode

Better for larger deployments:

```bash
# Command line
./kurpod_server --blob-dir /data/blobs/

# Config file
[storage]
mode = "directory"
path = "/data/blobs/"
```

Directory structure:
```
/data/blobs/
├── default.blob      # Default blob
├── user1.blob       # Future: per-user blobs
├── user2.blob
└── shared.blob      # Future: shared storage
```

---

## Performance tuning

### Worker threads

Adjust based on CPU cores:

```toml
[server]
# Auto-detect (recommended)
workers = 0

# Manual setting
workers = 8  # For 8-core system
```

### Connection limits

Prevent resource exhaustion:

```toml
[server]
max_connections = 10000
keep_alive = 75
request_timeout = 30
```

### Memory usage

Control memory consumption:

```toml
[cache]
enabled = true
size = "2GB"        # Cache size
ttl = 7200         # 2 hours

[storage]
chunk_size = "1MB"  # Upload chunk size
buffer_size = "8KB" # I/O buffer
```

### File system

Optimize for your storage:

```toml
[storage]
fsync = true              # Durability (slower)
direct_io = false         # Bypass OS cache
read_ahead = "128KB"      # Sequential read optimization
```

---

## Security hardening

### Network security

```toml
[server]
host = "127.0.0.1"        # Localhost only
# host = "10.0.0.5"       # Specific interface

[security]
require_https = true
hsts_max_age = 63072000   # 2 years
allowed_origins = ["https://app.example.com"]
allowed_methods = ["GET", "POST", "PUT", "DELETE"]
```

### Rate limiting

Prevent abuse:

```toml
[security]
# Global rate limit
rate_limit = 100
rate_limit_window = 60    # seconds

# Per-endpoint limits
[security.endpoints]
"/api/unlock" = { limit = 10, window = 300 }
"/api/create" = { limit = 5, window = 3600 }
"/api/upload" = { limit = 50, window = 60 }
```

### Authentication

Strengthen authentication:

```toml
[security]
max_password_attempts = 5
lockout_duration = 900     # 15 minutes
token_lifetime = 3600      # 1 hour
refresh_token_lifetime = 86400  # 24 hours

# Argon2id parameters (advanced)
[security.argon2]
memory_cost = 65536        # 64 MB
time_cost = 3
parallelism = 4
```

---

## Logging configuration

### Log levels

```toml
[logging]
level = "info"  # error, warn, info, debug, trace

# Per-module levels
[logging.modules]
"kurpod::storage" = "debug"
"kurpod::api" = "trace"
"actix_web" = "warn"
```

### Output formats

```toml
[logging]
# JSON for parsing
format = "json"

# Human-readable
format = "pretty"

# Compact
format = "compact"

# Custom format
format = "custom"
custom_format = "%{timestamp} [%{level}] %{target}: %{message}"
```

### Log rotation

```toml
[logging]
file = "/var/log/kurpod/server.log"
rotate_size = "100MB"
rotate_count = 7
rotate_age = "7d"
compress = true
```

### Syslog integration

```toml
[logging]
syslog = true
syslog_host = "localhost:514"
syslog_facility = "local0"
syslog_tag = "kurpod"
```

---

## Monitoring

### Health checks

```toml
[monitoring]
health_check_path = "/health"
health_check_interval = 30
```

Health endpoint returns:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 3600,
  "blob_status": "ready"
}
```

### Metrics

Prometheus-compatible metrics:

```toml
[monitoring]
metrics_enabled = true
metrics_port = 9090
metrics_path = "/metrics"
```

Available metrics:
- `kurpod_requests_total`
- `kurpod_request_duration_seconds`
- `kurpod_active_connections`
- `kurpod_blob_size_bytes`
- `kurpod_upload_bytes_total`

### Status page

```toml
[monitoring]
status_path = "/status"
status_auth = "secret-token"
```

---

## Deployment examples

### Development

```toml
# dev.toml
[server]
host = "127.0.0.1"
port = 3000

[storage]
mode = "single"
path = "./dev.blob"

[logging]
level = "debug"
format = "pretty"
```

### Production

```toml
# prod.toml
[server]
host = "0.0.0.0"
port = 8080
workers = 16

[storage]
mode = "directory"
path = "/data/kurpod/blobs"
compression = true
fsync = true

[security]
require_https = true
rate_limit = 1000
allowed_origins = ["https://app.example.com"]

[logging]
level = "warn"
format = "json"
file = "/var/log/kurpod/server.log"
syslog = true

[monitoring]
metrics_enabled = true
health_check_path = "/health"
```

### High availability

```toml
# ha.toml
[server]
host = "0.0.0.0"
port = 8080
workers = 32
max_connections = 50000

[storage]
mode = "directory"
path = "/mnt/shared/kurpod/blobs"  # NFS/GlusterFS

[cache]
enabled = true
size = "8GB"
redis_url = "redis://cache:6379"  # Shared cache

[features]
session_affinity = true
graceful_shutdown = true
rolling_updates = true
```

---

## Troubleshooting

### Common issues

**Port already in use**
```bash
# Find process using port
lsof -i :3000
# or
netstat -tulpn | grep 3000
```

**Permission denied**
```bash
# Fix blob permissions
chown kurpod:kurpod /var/lib/kurpod/blobs
chmod 700 /var/lib/kurpod/blobs
```

**High memory usage**
```toml
[cache]
size = "512MB"  # Reduce cache

[server]
max_connections = 1000  # Limit connections
```

### Debug mode

Enable detailed logging:

```bash
RUST_LOG=trace ./kurpod_server --log-level trace
```

Or in config:
```toml
[logging]
level = "trace"
stdout = true

[debug]
print_config = true
slow_request_threshold = 1000  # ms
trace_requests = true
```

---

## Best practices

1. **Use configuration files** for production
2. **Enable HTTPS** via reverse proxy
3. **Set appropriate rate limits** based on usage
4. **Monitor logs** for security events
5. **Regular backups** of blob files
6. **Test configuration** before deployment
7. **Use systemd** for service management
8. **Enable metrics** for monitoring
9. **Rotate logs** to prevent disk fill
10. **Document changes** in version control

For platform-specific deployment guides, see:
- [Docker deployment](/docs/docker-deployment)
- [Systemd service](/docs/systemd-service)
- [Reverse proxy setup](/docs/reverse-proxy)