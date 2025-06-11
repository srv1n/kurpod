---
title: Backup strategies
nextjs:
  metadata:
    title: Backup strategies
    description: Learn how to safely backup your encrypted Kurpod volumes, implement automated backups, and recover from disasters.
---

Protect your encrypted data with comprehensive backup strategies. This guide covers manual backups, automation, cloud storage, and disaster recovery procedures for Kurpod volumes. {% .lead %}

---

## Backup fundamentals

### Understanding Kurpod backups

Kurpod backups maintain full encryption:

- **Encrypted at rest**: Backup files remain encrypted
- **No key exposure**: Encryption keys never included in backups
- **Volume integrity**: Hidden volumes preserved invisibly
- **Incremental support**: Backup only changes
- **Version history**: Maintain multiple backup generations

{% callout type="warning" title="Critical reminder" %}
Backups are only useful if you remember your passwords. Store passwords securely in a password manager or use a memorable passphrase. Without the password, backups cannot be decrypted.
{% /callout %}

### What to backup

Essential components for full recovery:

```bash
# 1. Encrypted volume blobs
/path/to/kurpod/blobs/*.blob

# 2. Configuration (optional, for settings)
/path/to/kurpod/config.json

# 3. Server keys (for API access)
/path/to/kurpod/keys/

# Password storage (separate, secure location)
# Never store passwords with backups!
```

---

## Manual backup methods

### Simple file copy

Basic backup for single volumes:

```bash
# Create backup directory
mkdir -p /backup/kurpod/$(date +%Y%m%d)

# Copy volume blob
cp /var/lib/kurpod/blobs/volume_abc123.blob \
   /backup/kurpod/$(date +%Y%m%d)/

# Verify integrity
sha256sum /var/lib/kurpod/blobs/volume_abc123.blob
sha256sum /backup/kurpod/$(date +%Y%m%d)/volume_abc123.blob
```

### Compressed archives

Save space with compression:

```bash
# Backup with timestamp
tar -czf kurpod_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
    -C /var/lib/kurpod blobs/

# With encryption (additional layer)
tar -czf - -C /var/lib/kurpod blobs/ | \
    gpg --symmetric --cipher-algo AES256 > \
    kurpod_backup_$(date +%Y%m%d).tar.gz.gpg
```

### Snapshot backups

For filesystem-level snapshots:

```bash
# LVM snapshot
lvcreate -L 1G -s -n kurpod_snap /dev/vg0/kurpod

# Backup from snapshot
mount /dev/vg0/kurpod_snap /mnt/snapshot
rsync -av /mnt/snapshot/blobs/ /backup/kurpod/

# Clean up
umount /mnt/snapshot
lvremove -f /dev/vg0/kurpod_snap
```

---

## Automated backups

### Cron-based automation

Schedule regular backups:

```bash
# /etc/cron.d/kurpod-backup
# Daily backups at 3 AM
0 3 * * * kurpod /usr/local/bin/kurpod-backup.sh

# Weekly full backup on Sunday
0 2 * * 0 kurpod /usr/local/bin/kurpod-backup.sh --full

# Monthly archive on the 1st
0 1 1 * * kurpod /usr/local/bin/kurpod-backup.sh --archive
```

### Backup script

Comprehensive backup automation:

```bash
#!/bin/bash
# /usr/local/bin/kurpod-backup.sh

# Configuration
KURPOD_DIR="/var/lib/kurpod"
BACKUP_DIR="/backup/kurpod"
RETENTION_DAYS=30
LOG_FILE="/var/log/kurpod-backup.log"

# Create dated backup directory
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$BACKUP_DATE"
mkdir -p "$BACKUP_PATH"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Start backup
log "Starting Kurpod backup to $BACKUP_PATH"

# Backup blobs with progress
rsync -av --progress \
    "$KURPOD_DIR/blobs/" \
    "$BACKUP_PATH/blobs/" \
    2>&1 | tee -a "$LOG_FILE"

# Backup configuration
cp "$KURPOD_DIR/config.json" "$BACKUP_PATH/" 2>/dev/null

# Create checksum file
cd "$BACKUP_PATH"
find . -type f -exec sha256sum {} \; > checksums.txt

# Compress if requested
if [[ "$1" == "--compress" ]]; then
    log "Compressing backup..."
    tar -czf "../kurpod_$BACKUP_DATE.tar.gz" .
    cd ..
    rm -rf "$BACKUP_DATE"
fi

# Clean old backups
log "Cleaning backups older than $RETENTION_DAYS days"
find "$BACKUP_DIR" -type f -name "kurpod_*.tar.gz" \
    -mtime +$RETENTION_DAYS -delete

log "Backup completed successfully"
```

### Incremental backups

Efficient incremental strategy:

```bash
#!/bin/bash
# Incremental backup using rsync

KURPOD_DIR="/var/lib/kurpod"
BACKUP_DIR="/backup/kurpod"
CURRENT_LINK="$BACKUP_DIR/current"
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$BACKUP_DATE"

# Create incremental backup
rsync -av --link-dest="$CURRENT_LINK" \
    "$KURPOD_DIR/blobs/" \
    "$BACKUP_PATH/blobs/"

# Update current link
rm -f "$CURRENT_LINK"
ln -s "$BACKUP_PATH" "$CURRENT_LINK"

# Keep only last 7 incremental backups
ls -dt "$BACKUP_DIR"/*/ | tail -n +8 | xargs rm -rf
```

---

## Cloud backup solutions

### AWS S3 backup

Automated S3 synchronization:

```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure

# Sync to S3 with encryption
aws s3 sync /var/lib/kurpod/blobs/ \
    s3://my-kurpod-backups/blobs/ \
    --storage-class GLACIER_IR \
    --sse AES256

# Restore from S3
aws s3 sync s3://my-kurpod-backups/blobs/ \
    /var/lib/kurpod/blobs/
```

### Automated S3 backup script

```bash
#!/bin/bash
# s3-backup.sh

BUCKET="my-kurpod-backups"
PREFIX="backups/$(hostname)/$(date +%Y/%m/%d)"

# Backup with versioning
aws s3 sync /var/lib/kurpod/blobs/ \
    "s3://$BUCKET/$PREFIX/blobs/" \
    --delete \
    --storage-class STANDARD_IA \
    --sse AES256

# Tag with retention policy
aws s3api put-object-tagging \
    --bucket "$BUCKET" \
    --key "$PREFIX/metadata.json" \
    --tagging 'TagSet=[{Key=Retention,Value=90days}]'
```

### Backblaze B2

Cost-effective cloud storage:

```bash
# Install B2 CLI
pip install b2

# Authorize
b2 authorize-account

# Create bucket
b2 create-bucket kurpod-backups allPrivate

# Sync files
b2 sync --delete --replaceNewer \
    /var/lib/kurpod/blobs/ \
    b2://kurpod-backups/blobs/
```

### Rclone for multiple clouds

Universal cloud backup tool:

```bash
# Install rclone
curl https://rclone.org/install.sh | sudo bash

# Configure remotes
rclone config

# Backup to multiple destinations
#!/bin/bash
for remote in gdrive onedrive s3; do
    rclone sync /var/lib/kurpod/blobs/ \
        "$remote:kurpod-backups/blobs/" \
        --progress \
        --transfers 4
done
```

---

## Disaster recovery

### Recovery planning

Essential recovery checklist:

```markdown
## Kurpod Disaster Recovery Plan

### Prerequisites
- [ ] Backup location documented
- [ ] Passwords stored securely (separate location)
- [ ] Recovery procedure tested quarterly
- [ ] Contact information updated

### Recovery Steps
1. Install fresh Kurpod instance
2. Stop Kurpod service
3. Restore blob files
4. Restore configuration
5. Start service
6. Verify volume access
7. Test hidden volumes

### Verification Tests
- [ ] All volumes accessible
- [ ] File integrity verified
- [ ] Hidden volumes functional
- [ ] Performance normal
```

### Recovery procedures

**From local backup**
```bash
# Stop Kurpod
systemctl stop kurpod

# Restore blobs
rsync -av /backup/kurpod/latest/blobs/ \
    /var/lib/kurpod/blobs/

# Restore config
cp /backup/kurpod/latest/config.json \
    /var/lib/kurpod/

# Fix permissions
chown -R kurpod:kurpod /var/lib/kurpod/

# Start service
systemctl start kurpod
```

**From cloud backup**
```bash
# Download from S3
aws s3 sync s3://my-kurpod-backups/blobs/ \
    /var/lib/kurpod/blobs/

# Verify checksums
cd /var/lib/kurpod/blobs/
sha256sum -c /backup/checksums.txt
```

### Testing recovery

Regular recovery drills:

```bash
#!/bin/bash
# test-recovery.sh

# Create test environment
TEST_DIR="/tmp/kurpod-recovery-test"
mkdir -p "$TEST_DIR"

# Restore to test location
rsync -av /backup/kurpod/latest/ "$TEST_DIR/"

# Start test instance
docker run -d \
    --name kurpod-test \
    -p 3001:3000 \
    -v "$TEST_DIR/blobs:/app/blobs" \
    kurpod/kurpod:latest

# Verify access
curl -f http://localhost:3001/health || exit 1

# Cleanup
docker stop kurpod-test
docker rm kurpod-test
rm -rf "$TEST_DIR"

echo "Recovery test successful!"
```

---

## Backup security

### Encryption considerations

Additional backup encryption:

```bash
# Encrypt backup with GPG
tar -czf - /var/lib/kurpod/blobs/ | \
    gpg --symmetric \
        --cipher-algo AES256 \
        --compress-algo none \
        --batch --passphrase-file /secure/backup-pass \
        > kurpod_backup.tar.gz.gpg

# Decrypt when needed
gpg --decrypt \
    --batch --passphrase-file /secure/backup-pass \
    kurpod_backup.tar.gz.gpg | \
    tar -xzf - -C /restore/path/
```

### Secure storage

Best practices for backup storage:

```yaml
# Backup storage requirements
physical:
  - location: Separate from primary
  - access: Restricted physical access
  - media: Enterprise-grade drives
  - redundancy: RAID 6 or better

cloud:
  - encryption: Provider-side + client-side
  - access: MFA required
  - versioning: Enabled
  - regions: Multi-region replication

security:
  - passwords: Separate secure storage
  - keys: Hardware security module
  - audit: Access logging enabled
  - testing: Quarterly recovery drills
```

### Access control

Limit backup access:

```bash
# Create backup user
useradd -r -s /bin/false kurpod-backup

# Restrict permissions
chmod 700 /backup/kurpod
chown kurpod-backup:kurpod-backup /backup/kurpod

# Sudoers for backup only
echo "kurpod-backup ALL=(kurpod) NOPASSWD: /usr/bin/rsync" \
    >> /etc/sudoers.d/kurpod-backup
```

---

## Monitoring and alerts

### Backup monitoring

Track backup health:

```bash
#!/bin/bash
# monitor-backups.sh

BACKUP_DIR="/backup/kurpod"
MAX_AGE_HOURS=25
ALERT_EMAIL="admin@example.com"

# Check latest backup age
LATEST=$(find "$BACKUP_DIR" -type f -name "*.blob" -printf '%T@\n' | sort -n | tail -1)
AGE=$(($(date +%s) - ${LATEST%.*}))
AGE_HOURS=$((AGE / 3600))

if [ $AGE_HOURS -gt $MAX_AGE_HOURS ]; then
    echo "CRITICAL: Latest backup is $AGE_HOURS hours old" | \
        mail -s "Kurpod Backup Alert" "$ALERT_EMAIL"
    exit 2
fi

# Check backup size
BACKUP_SIZE=$(du -sb "$BACKUP_DIR" | awk '{print $1}')
SOURCE_SIZE=$(du -sb /var/lib/kurpod/blobs/ | awk '{print $1}')
SIZE_DIFF=$((SOURCE_SIZE - BACKUP_SIZE))

if [ $SIZE_DIFF -gt $((SOURCE_SIZE / 10)) ]; then
    echo "WARNING: Backup size mismatch detected" | \
        mail -s "Kurpod Backup Warning" "$ALERT_EMAIL"
    exit 1
fi

echo "OK: Backups are current and complete"
exit 0
```

### Prometheus metrics

Export backup metrics:

```yaml
# prometheus-backup-exporter.yml
kurpod_backup_last_success_timestamp:
  type: gauge
  help: "Timestamp of last successful backup"

kurpod_backup_size_bytes:
  type: gauge
  help: "Total size of backup directory"

kurpod_backup_file_count:
  type: gauge
  help: "Number of blob files in backup"

kurpod_backup_duration_seconds:
  type: histogram
  help: "Time taken to complete backup"
```

---

## Best practices

### 3-2-1 rule

Follow the backup golden rule:

- **3** copies of important data
- **2** different storage media types
- **1** offsite backup location

```bash
# Implementation example
Primary: /var/lib/kurpod/blobs/
Local backup: /backup/kurpod/ (different disk)
Cloud backup: s3://kurpod-backups/
```

### Backup testing

Regular verification schedule:

```markdown
## Monthly Backup Tests
- [ ] Restore random file - verify contents
- [ ] Check backup integrity - run checksums
- [ ] Test recovery procedure - document time
- [ ] Verify hidden volumes - test both passwords
- [ ] Update documentation - note any changes

## Quarterly Full Recovery
- [ ] Restore to test system
- [ ] Verify all volumes accessible
- [ ] Performance benchmarks
- [ ] Update disaster recovery plan
```

### Documentation

Maintain recovery documentation:

```markdown
# Kurpod Backup Recovery Guide

## Emergency Contacts
- Primary Admin: +1-555-0123
- Backup Admin: +1-555-0124
- Cloud Provider: +1-555-0125

## Backup Locations
- Local: /backup/kurpod/
- NAS: //nas.internal/kurpod-backups/
- Cloud: s3://company-kurpod-backups/

## Recovery Passwords
- Stored in: Company password manager
- Backup copy: Safety deposit box #123

## Recovery Priority
1. Executive volumes (15 min RTO)
2. Finance data (30 min RTO)
3. General storage (2 hour RTO)
```

{% callout title="Remember" %}
The best backup strategy is one that's regularly tested. Schedule monthly verification tests and quarterly full recovery drills. Document everything and keep your recovery procedures up to date.
{% /callout %}