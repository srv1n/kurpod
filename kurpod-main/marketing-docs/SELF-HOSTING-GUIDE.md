# 📚 Encapsule Server Self-Hosting Guide

This comprehensive guide will walk you through deploying and managing your own Encapsule server for secure, encrypted file storage.

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Basic Setup](#basic-setup)
4. [Advanced Configuration](#advanced-configuration)
5. [Security Hardening](#security-hardening)
6. [Reverse Proxy Setup](#reverse-proxy-setup)
7. [Backup and Recovery](#backup-and-recovery)
8. [Monitoring and Maintenance](#monitoring-and-maintenance)
9. [Troubleshooting](#troubleshooting)
10. [Performance Optimization](#performance-optimization)

## 🖥️ System Requirements

### Minimum Requirements
- **CPU**: 1 core (x86_64 or ARM64)
- **RAM**: 512 MB
- **Storage**: 1 GB + your data needs
- **OS**: Linux, macOS, Windows Server 2019+

### Recommended Requirements
- **CPU**: 2+ cores
- **RAM**: 2 GB
- **Storage**: SSD with 10 GB + data
- **OS**: Ubuntu 20.04+, Debian 11+, RHEL 8+

### Network Requirements
- **Ports**: 3000 (default) or custom
- **Bandwidth**: 1 Mbps per concurrent user
- **SSL Certificate**: Required for production

## 🚀 Installation Methods

### Method 1: Pre-built Binary (Easiest)

```bash
# Download the latest release
wget https://github.com/srv1n/kurpod/releases/latest/download/kurpod_server-linux-amd64
chmod +x kurpod_server-linux-amd64

# Run with default settings
./kurpod_server-linux-amd64

# Or with custom configuration
./kurpod_server-linux-amd64 --port 8080 --blob /path/to/storage.blob
```

### Method 2: Build from Source

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Clone and build
git clone https://github.com/srv1n/kurpod.git
cd kurpod
./build.sh

# The binary will be at ./target/release/kurpod_server
```

### Method 3: Docker (Coming Soon)

```bash
# Using Docker Compose
cat > docker-compose.yml << EOF
version: '3.8'
services:
  kurpod:
    image: srv1n/kurpod:latest
    ports:
      - "3000:3000"
    volumes:
      - ./data:/data
    environment:
      - RUST_LOG=info
      - ENC_BLOB=/data/storage.blob
EOF

docker-compose up -d
```

### Method 4: Systemd Service (Production)

```bash
# Create service file
sudo cat > /etc/systemd/system/kurpod.service << EOF
[Unit]
Description=Encapsule Encrypted Storage Server
After=network.target

[Service]
Type=simple
User=kurpod
Group=kurpod
WorkingDirectory=/opt/kurpod
ExecStart=/opt/kurpod/kurpod_server --blob /var/lib/kurpod/storage.blob
Restart=always
RestartSec=10

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/kurpod

[Install]
WantedBy=multi-user.target
EOF

# Create user and directories
sudo useradd -r -s /bin/false kurpod
sudo mkdir -p /opt/kurpod /var/lib/kurpod
sudo chown kurpod:kurpod /var/lib/kurpod

# Copy binary and start service
sudo cp kurpod_server /opt/kurpod/
sudo systemctl enable --now kurpod
```

## 🔧 Basic Setup

### First Run Configuration

1. **Start the server**:
   ```bash
   ./kurpod_server --blob storage.blob
   ```

2. **Access the web interface**:
   - Open `http://localhost:3000` in your browser
   - You'll see the initialization screen

3. **Create your encrypted storage**:
   - Enter a strong master password
   - The blob file will be created automatically
   - You're now ready to upload files!

### Command Line Options

```bash
enc_server [OPTIONS]

OPTIONS:
    -b, --blob <PATH>       Path to blob file [default: storage.blob]
    -p, --port <PORT>       Port to listen on [default: 3000]
    -h, --host <HOST>       Host to bind to [default: 0.0.0.0]
    -d, --dir <PATH>        Directory mode (multiple blobs)
        --help              Print help information
```

### Environment Variables

```bash
# Logging configuration
export RUST_LOG=info                    # Options: error, warn, info, debug, trace
export RUST_LOG=enc_server=debug        # Debug server only

# Server configuration
export ENC_BIND=0.0.0.0:3000          # Bind address
export ENC_BLOB=/path/to/storage.blob  # Default blob path
export ENC_MAX_UPLOAD_SIZE=5368709120  # 5GB max upload
```

## 🔒 Advanced Configuration

### Directory Mode (Multiple Users)

```bash
# Enable directory mode for multiple blob files
./enc_server --dir /var/lib/kurpod/blobs/

# Users can then select or create blob files:
# - /var/lib/kurpod/blobs/alice.blob
# - /var/lib/kurpod/blobs/bob.blob
```

### Custom Configuration File

Create `config.toml`:

```toml
# Server settings
[server]
bind = "0.0.0.0:3000"
workers = 4
max_connections = 100

# Storage settings
[storage]
blob_path = "/var/lib/kurpod/storage.blob"
temp_dir = "/var/tmp/kurpod"
max_upload_size = 5368709120  # 5GB

# Security settings
[security]
session_timeout = 3600  # 1 hour
rate_limit = 100       # requests per minute
allowed_origins = ["https://secure.example.com"]
```

Load configuration:
```bash
./enc_server --config config.toml
```

## 🛡️ Security Hardening

### 1. File System Permissions

```bash
# Restrict blob file access
chmod 600 /var/lib/kurpod/storage.blob
chown kurpod:kurpod /var/lib/kurpod/storage.blob

# SELinux (if enabled)
sudo semanage fcontext -a -t httpd_sys_rw_content_t "/var/lib/kurpod(/.*)?"
sudo restorecon -Rv /var/lib/kurpod
```

### 2. Network Security

```bash
# Firewall rules (ufw)
sudo ufw allow 22/tcp        # SSH
sudo ufw allow 443/tcp       # HTTPS only
sudo ufw enable

# iptables alternative
sudo iptables -A INPUT -p tcp --dport 3000 -s 192.168.1.0/24 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3000 -j DROP
```

### 3. SSL/TLS Configuration

Always use HTTPS in production:

```bash
# Let's Encrypt with Certbot
sudo apt install certbot
sudo certbot certonly --standalone -d secure.example.com
```

### 4. Security Headers

Add these headers via reverse proxy:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Content-Security-Policy "default-src 'self';" always;
add_header Referrer-Policy "no-referrer" always;
```

## 🌐 Reverse Proxy Setup

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/kurpod
server {
    listen 80;
    server_name secure.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name secure.example.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/secure.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/secure.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;

    # Proxy configuration
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support (for future features)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Timeouts for large file uploads
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
        
        # Max upload size
        client_max_body_size 5G;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/kurpod /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache Configuration

```apache
<VirtualHost *:443>
    ServerName secure.example.com
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/secure.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/secure.example.com/privkey.pem
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "DENY"
</VirtualHost>
```

### Caddy Configuration (Simplest)

```caddyfile
secure.example.com {
    reverse_proxy localhost:3000
    
    header {
        Strict-Transport-Security "max-age=31536000"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
    }
}
```

## 💾 Backup and Recovery

### Automated Backup Script

```bash
#!/bin/bash
# /opt/kurpod/backup.sh

BLOB_PATH="/var/lib/kurpod/storage.blob"
BACKUP_DIR="/backup/kurpod"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Stop server (optional for consistency)
systemctl stop kurpod

# Create backup with compression
tar -czf "$BACKUP_DIR/kurpod_backup_$DATE.tar.gz" "$BLOB_PATH"

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "kurpod_backup_*.tar.gz" -mtime +7 -delete

# Start server
systemctl start kurpod

# Optional: sync to remote storage
# rclone copy "$BACKUP_DIR/kurpod_backup_$DATE.tar.gz" remote:backups/
```

Add to crontab:
```bash
# Daily backup at 3 AM
0 3 * * * /opt/kurpod/backup.sh
```

### Recovery Procedure

```bash
# Stop the server
sudo systemctl stop kurpod

# Restore from backup
cd /
sudo tar -xzf /backup/kurpod/kurpod_backup_20240106_030000.tar.gz

# Verify permissions
sudo chown kurpod:kurpod /var/lib/kurpod/storage.blob
sudo chmod 600 /var/lib/kurpod/storage.blob

# Start the server
sudo systemctl start kurpod
```

## 📊 Monitoring and Maintenance

### Health Check Endpoint

```bash
# Add to monitoring system
curl -f http://localhost:3000/health || exit 1
```

### Prometheus Metrics (Future Feature)

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'kurpod'
    static_configs:
      - targets: ['localhost:3000']
```

### Log Rotation

```bash
# /etc/logrotate.d/kurpod
/var/log/kurpod/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 0640 kurpod kurpod
    postrotate
        systemctl reload kurpod
    endscript
}
```

### Monitoring Script

```bash
#!/bin/bash
# Monitor disk space and alert
BLOB_SIZE=$(du -h /var/lib/kurpod/storage.blob | cut -f1)
DISK_USAGE=$(df -h /var/lib/kurpod | tail -1 | awk '{print $5}' | sed 's/%//')

if [ $DISK_USAGE -gt 80 ]; then
    echo "Warning: Disk usage is at ${DISK_USAGE}%" | mail -s "Encapsule Disk Alert" admin@example.com
fi
```

## 🔧 Troubleshooting

### Common Issues

#### Server Won't Start
```bash
# Check logs
journalctl -u kurpod -f

# Common fixes:
# 1. Port already in use
sudo lsof -i :3000
# 2. Permission denied
sudo chown -R kurpod:kurpod /var/lib/kurpod
# 3. Blob file corrupted - restore from backup
```

#### Cannot Upload Large Files
```nginx
# Increase nginx limits
client_max_body_size 10G;
proxy_read_timeout 3600;
proxy_connect_timeout 3600;
proxy_send_timeout 3600;
```

#### Performance Issues
```bash
# Enable debug logging
RUST_LOG=debug ./enc_server

# Check system resources
htop
iotop
```

### Debug Mode

```bash
# Maximum verbosity
RUST_LOG=trace ./enc_server 2>&1 | tee debug.log

# Filter specific modules
RUST_LOG=enc_server=debug,encryption_core=trace ./enc_server
```

## ⚡ Performance Optimization

### 1. System Tuning

```bash
# /etc/sysctl.conf
net.core.somaxconn = 65535
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535
fs.file-max = 65535
```

### 2. Storage Optimization

- Use SSD for blob storage
- Enable TRIM for SSDs
- Consider ZFS for snapshots and compression

### 3. Memory Optimization

```bash
# Increase file descriptor limits
# /etc/security/limits.conf
kurpod soft nofile 65535
kurpod hard nofile 65535
```

### 4. Multi-Instance Setup (Advanced)

```nginx
# Load balance multiple instances
upstream kurpod_backend {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    location / {
        proxy_pass http://kurpod_backend;
    }
}
```

## 📝 Maintenance Checklist

### Daily
- [ ] Check service status
- [ ] Monitor disk space
- [ ] Review error logs

### Weekly
- [ ] Test backup restoration
- [ ] Update system packages
- [ ] Review access logs for anomalies

### Monthly
- [ ] Perform blob compaction
- [ ] Update Encapsule to latest version
- [ ] Security audit of configurations

### Yearly
- [ ] Rotate SSL certificates
- [ ] Review and update documentation
- [ ] Plan capacity upgrades

## 🆘 Getting Help

- **Documentation**: https://github.com/srv1n/kurpod/wiki
- **Issues**: https://github.com/srv1n/kurpod/issues
- **Community**: /r/selfhosted, /r/rust

## 🎉 Conclusion

You now have a production-ready Encapsule server! Remember:

1. **Always use HTTPS** in production
2. **Regular backups** are essential
3. **Monitor disk space** - encrypted blobs can grow quickly
4. **Keep software updated** for security patches

Happy encrypting! 🔐