---
title: Systemd service
---

Configure Kurpod to run as a system service on Linux using systemd. Ensure automatic startup and proper process management. {% .lead %}

---

## Quick setup

Get Kurpod running as a service in minutes:

```bash
# Download service file
sudo curl -o /etc/systemd/system/kurpod.service \
  https://raw.githubusercontent.com/srv1n/kurpod/main/kurpod.service

# Reload systemd
sudo systemctl daemon-reload

# Enable and start
sudo systemctl enable kurpod
sudo systemctl start kurpod

# Check status
sudo systemctl status kurpod
```

---

## Service configuration

### Basic service file

Create `/etc/systemd/system/kurpod.service`:

```ini
[Unit]
Description=Kurpod Encrypted File Storage
Documentation=https://kurpod.org/docs
After=network.target

[Service]
Type=simple
User=kurpod
Group=kurpod
WorkingDirectory=/var/lib/kurpod
ExecStart=/usr/local/bin/kurpod_server
Restart=on-failure
RestartSec=5

# Security
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### Advanced service file

Full production configuration:

```ini
[Unit]
Description=Kurpod Encrypted File Storage
Documentation=https://kurpod.org/docs
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=kurpod
Group=kurpod
WorkingDirectory=/var/lib/kurpod

# Command with options
ExecStart=/usr/local/bin/kurpod_server \
  --port 3000 \
  --blob-dir /var/lib/kurpod/blobs \
  --config /etc/kurpod/config.toml

# Process management
Restart=always
RestartSec=5
StartLimitInterval=60
StartLimitBurst=3

# Environment
Environment="RUST_LOG=info"
Environment="RUST_BACKTRACE=1"
EnvironmentFile=-/etc/kurpod/environment

# Resource limits
LimitNOFILE=65536
LimitNPROC=4096
MemoryLimit=2G
CPUQuota=200%

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/kurpod
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=true
LockPersonality=true
MemoryDenyWriteExecute=true
RestrictRealtime=true
RestrictSUIDSGID=true
RemoveIPC=true
PrivateMounts=true

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=kurpod

[Install]
WantedBy=multi-user.target
```

---

## User and permissions

### Create system user

Dedicated user for security:

```bash
# Create system user (no login shell)
sudo useradd --system \
  --shell /bin/false \
  --home /var/lib/kurpod \
  --create-home \
  kurpod

# Set ownership
sudo chown -R kurpod:kurpod /var/lib/kurpod
```

### Directory structure

Standard layout:

```bash
# Create directories
sudo mkdir -p /var/lib/kurpod/blobs
sudo mkdir -p /etc/kurpod
sudo mkdir -p /var/log/kurpod

# Set permissions
sudo chown -R kurpod:kurpod /var/lib/kurpod
sudo chown -R kurpod:kurpod /var/log/kurpod
sudo chmod 750 /var/lib/kurpod
sudo chmod 750 /var/log/kurpod
```

### File permissions

Secure your files:

```bash
# Binary
sudo chown root:root /usr/local/bin/kurpod_server
sudo chmod 755 /usr/local/bin/kurpod_server

# Config
sudo chown root:kurpod /etc/kurpod/config.toml
sudo chmod 640 /etc/kurpod/config.toml

# Blobs
sudo chown kurpod:kurpod /var/lib/kurpod/blobs/*
sudo chmod 600 /var/lib/kurpod/blobs/*
```

---

## Service management

### Basic commands

Control the service:

```bash
# Start service
sudo systemctl start kurpod

# Stop service
sudo systemctl stop kurpod

# Restart service
sudo systemctl restart kurpod

# Reload config (if supported)
sudo systemctl reload kurpod

# Check status
sudo systemctl status kurpod

# View recent logs
sudo journalctl -u kurpod -n 50
```

### Enable at boot

Auto-start on system boot:

```bash
# Enable service
sudo systemctl enable kurpod

# Disable service
sudo systemctl disable kurpod

# Check if enabled
sudo systemctl is-enabled kurpod
```

### Service dependencies

Control startup order:

```ini
[Unit]
# Start after network
After=network-online.target

# Start after specific service
After=postgresql.service

# Require service running
Requires=redis.service

# Want but don't require
Wants=nginx.service
```

---

## Environment configuration

### Environment file

Create `/etc/kurpod/environment`:

```bash
# Kurpod environment variables
RUST_LOG=info
KURPOD_PORT=3000
KURPOD_HOST=0.0.0.0
BLOB_DIR=/var/lib/kurpod/blobs

# Performance tuning
KURPOD_WORKERS=4
KURPOD_MAX_CONNECTIONS=1000

# Security
KURPOD_RATE_LIMIT=100
KURPOD_MAX_UPLOAD=104857600
```

Load in service:
```ini
[Service]
EnvironmentFile=/etc/kurpod/environment
```

### Secrets management

For sensitive data:

```bash
# Create secrets file
sudo touch /etc/kurpod/secrets
sudo chmod 600 /etc/kurpod/secrets
sudo chown kurpod:kurpod /etc/kurpod/secrets

# Add secrets
echo "API_KEY=secret-key-here" | sudo tee /etc/kurpod/secrets

# Load in service
EnvironmentFile=-/etc/kurpod/secrets
```

---

## Logging configuration

### Journal integration

Systemd automatically captures output:

```bash
# View all logs
sudo journalctl -u kurpod

# Follow logs (tail -f)
sudo journalctl -u kurpod -f

# Since last boot
sudo journalctl -u kurpod -b

# Last hour
sudo journalctl -u kurpod --since "1 hour ago"

# Specific priority
sudo journalctl -u kurpod -p err

# Export logs
sudo journalctl -u kurpod > kurpod.log
```

### Log rotation

Configure journal limits:

```bash
# Edit journal config
sudo nano /etc/systemd/journald.conf

# Set limits
SystemMaxUse=1G
SystemKeepFree=1G
SystemMaxFileSize=100M
MaxFileSec=1month
```

### External logging

Send to syslog:

```ini
[Service]
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=kurpod
SyslogFacility=local0
```

---

## Security hardening

### Sandboxing

Isolate the service:

```ini
[Service]
# Filesystem protection
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths=/var/lib/kurpod

# Kernel protection
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
ProtectKernelLogs=true
ProtectClock=true

# Network restrictions
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
IPAddressDeny=any
IPAddressAllow=localhost
IPAddressAllow=10.0.0.0/8

# System call filtering
SystemCallFilter=@system-service
SystemCallErrorNumber=EPERM
```

### Capabilities

Limit process capabilities:

```ini
[Service]
# Drop all capabilities
CapabilityBoundingSet=
# Add only what's needed
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
```

### Resource limits

Prevent resource exhaustion:

```ini
[Service]
# Memory limits
MemoryMax=2G
MemoryHigh=1G
MemorySwapMax=0

# CPU limits
CPUQuota=200%
CPUWeight=100

# IO limits
IOWeight=100
IOReadBandwidthMax=/dev/sda 10M
IOWriteBandwidthMax=/dev/sda 10M

# Task limits
TasksMax=100
```

---

## Monitoring

### Health checks

Add health monitoring:

```ini
[Service]
# Health check
ExecStartPost=/usr/bin/timeout 30 sh -c 'while ! curl -f http://localhost:3000/health; do sleep 1; done'

# Watchdog
WatchdogSec=30
```

### Prometheus integration

Export metrics:

```bash
# Install node exporter
sudo apt install prometheus-node-exporter

# Add to Prometheus config
scrape_configs:
  - job_name: 'kurpod'
    static_configs:
      - targets: ['localhost:9090']
```

### Alerting

Configure systemd notifications:

```ini
[Service]
# Email on failure
OnFailure=notify-email@%n.service

# Custom notification
ExecStopPost=/usr/local/bin/notify-admin.sh "Kurpod stopped"
```

---

## Troubleshooting

### Service won't start

Common issues:

```bash
# Check status
sudo systemctl status kurpod

# Check full logs
sudo journalctl -xeu kurpod

# Verify binary
sudo -u kurpod /usr/local/bin/kurpod_server --version

# Check permissions
ls -la /var/lib/kurpod
ls -la /usr/local/bin/kurpod_server

# Test manually
sudo -u kurpod /usr/local/bin/kurpod_server
```

### Permission errors

Fix common permission issues:

```bash
# Reset ownership
sudo chown -R kurpod:kurpod /var/lib/kurpod

# Fix SELinux context (if applicable)
sudo restorecon -Rv /var/lib/kurpod

# Check AppArmor (if applicable)
sudo aa-status
```

### Performance issues

Debug resource problems:

```bash
# Check resource usage
systemctl status kurpod
systemd-cgtop

# Analyze startup time
systemd-analyze blame | grep kurpod

# Check limits
systemctl show kurpod | grep -i limit
```

---

## Advanced configurations

### Socket activation

For on-demand startup:

```ini
# kurpod.socket
[Unit]
Description=Kurpod Socket

[Socket]
ListenStream=3000
Accept=false

[Install]
WantedBy=sockets.target
```

```ini
# kurpod.service
[Unit]
Requires=kurpod.socket

[Service]
ExecStart=/usr/local/bin/kurpod_server
StandardInput=socket
```

### Multiple instances

Run multiple Kurpod instances:

```ini
# kurpod@.service
[Unit]
Description=Kurpod Instance %i

[Service]
ExecStart=/usr/local/bin/kurpod_server --port %i
User=kurpod-%i
```

Usage:
```bash
sudo systemctl enable kurpod@3000
sudo systemctl enable kurpod@3001
sudo systemctl start kurpod@{3000,3001}
```

### Timer-based operations

Schedule maintenance:

```ini
# kurpod-compact.timer
[Unit]
Description=Compact Kurpod storage weekly

[Timer]
OnCalendar=weekly
Persistent=true

[Install]
WantedBy=timers.target
```

```ini
# kurpod-compact.service
[Unit]
Description=Compact Kurpod storage

[Service]
Type=oneshot
ExecStart=/usr/local/bin/kurpod-compact.sh
```

---

## Best practices

### Production checklist

- [ ] Dedicated system user
- [ ] Proper file permissions
- [ ] Security hardening enabled
- [ ] Resource limits configured
- [ ] Logging configured
- [ ] Monitoring enabled
- [ ] Automatic restart
- [ ] Boot-time startup
- [ ] Regular backups
- [ ] Update procedures

### Maintenance

Regular tasks:

```bash
# Update Kurpod
sudo systemctl stop kurpod
sudo cp /path/to/new/kurpod_server /usr/local/bin/
sudo systemctl start kurpod

# Backup service config
sudo cp /etc/systemd/system/kurpod.service /backup/

# Check service health
sudo systemctl status kurpod
sudo journalctl -u kurpod --since today
```

---

## Integration examples

### With Nginx

Reverse proxy setup:

```bash
# Ensure correct order
After=network-online.target
Before=nginx.service
```

### With backup scripts

Coordinate with backups:

```bash
# Stop for consistent backup
ExecStartPre=/usr/local/bin/pre-backup.sh
ExecStopPost=/usr/local/bin/post-backup.sh
```

### With monitoring

Health check integration:

```bash
# Consul health check
ExecStartPost=/usr/bin/consul-register.sh
ExecStopPost=/usr/bin/consul-deregister.sh
```

For more deployment options, see:
- [Docker deployment](/docs/docker-deployment)
- [Reverse proxy setup](/docs/reverse-proxy)
- [Production security](/docs/security-hardening)