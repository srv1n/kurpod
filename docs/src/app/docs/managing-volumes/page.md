---
title: Managing volumes
nextjs:
  metadata:
    title: Managing volumes
    description: Create, configure, and manage multiple encrypted volumes in Kurpod for organized and secure file storage.
---

Kurpod allows you to create and manage multiple encrypted volumes, each with its own password and optional hidden volume for plausible deniability. This guide covers everything you need to know about volume management. {% .lead %}

---

## Understanding volumes

### What is a volume?

A volume in Kurpod is an encrypted container that stores your files. Think of it as a secure vault with its own combination lock. Each volume:

- Has its own password
- Uses independent encryption keys
- Can contain a hidden volume
- Operates in complete isolation

### Volume types

**Standard volume**
- Primary encrypted storage
- Revealed with main password
- Visible in volume list when unlocked

**Hidden volume**
- Secondary storage for sensitive data
- Revealed with alternate password
- Invisible unless correct password provided
- Provides plausible deniability

```javascript
// Volume structure
{
  "standard": {
    "size": "10GB",
    "files": 1543,
    "encryption": "XChaCha20-Poly1305"
  },
  "hidden": {
    "size": "2GB",
    "files": 87,
    "undetectable": true
  }
}
```

---

## Creating volumes

### Basic volume creation

Create a new encrypted volume through the web interface:

1. Click **New Volume** in the dashboard
2. Enter a volume name (for your reference)
3. Set a strong password (20+ characters)
4. Choose volume size (can be expanded later)
5. Click **Create**

### Advanced options

Configure additional settings during creation:

```javascript
// Advanced volume configuration
{
  "name": "Work Documents",
  "size": "50GB",
  "encryption": {
    "algorithm": "XChaCha20-Poly1305",
    "kdf": "Argon2id",
    "iterations": 3,
    "memory": 65536  // 64 MiB
  },
  "hidden_volume": true,
  "auto_lock": 30,  // minutes
  "compression": true
}
```

### Creating hidden volumes

Enable plausible deniability:

1. During volume creation, check **Enable hidden volume**
2. Set primary password for standard volume
3. Set different password for hidden volume
4. Allocate space for hidden section
5. Never reveal hidden password under normal circumstances

{% callout type="warning" title="Hidden volume protection" %}
Always update the standard volume after modifying the hidden volume to maintain plausible deniability. Kurpod automatically manages this, but be aware of the concept.
{% /callout %}

### Command line creation

Create volumes programmatically:

```bash
# Create standard volume
curl -X POST http://localhost:3000/api/volumes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Backups",
    "password": "your-secure-password",
    "size": "100GB"
  }'

# Create with hidden volume
curl -X POST http://localhost:3000/api/volumes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Documents",
    "password": "standard-password",
    "size": "20GB",
    "hidden": {
      "enabled": true,
      "password": "hidden-password",
      "size": "5GB"
    }
  }'
```

---

## Unlocking and locking

### Unlocking volumes

Access your encrypted data:

1. Select volume from the list
2. Enter password
3. Click **Unlock**
4. Volume contents become accessible

### Auto-lock settings

Configure automatic locking for security:

```javascript
// In volume settings
{
  "auto_lock": {
    "idle_minutes": 30,
    "on_sleep": true,
    "on_screensaver": true,
    "on_browser_close": true
  }
}
```

### Quick lock

Immediately secure all volumes:

- Keyboard shortcut: `Ctrl+Shift+L`
- Click lock icon in toolbar
- API call: `POST /api/volumes/lock-all`

### Scheduled locking

Set time-based locking rules:

```javascript
// Lock volumes at specific times
{
  "schedule": {
    "weekdays": {
      "lock_at": "18:00",
      "unlock_at": "09:00"
    },
    "weekends": {
      "always_locked": true
    }
  }
}
```

---

## Volume configuration

### Resizing volumes

Expand volume capacity as needed:

1. Select locked volume
2. Click **Settings** → **Resize**
3. Enter new size (must be larger)
4. Confirm operation
5. Volume expands without data loss

```bash
# CLI resize
curl -X PUT http://localhost:3000/api/volumes/{id}/resize \
  -H "X-Auth-Token: your-token" \
  -d '{"new_size": "200GB"}'
```

### Performance tuning

Optimize for your use case:

**For large files (video, archives)**
```javascript
{
  "chunk_size": "4MB",
  "compression": false,
  "cache_size": "512MB"
}
```

**For many small files (documents)**
```javascript
{
  "chunk_size": "256KB",
  "compression": true,
  "cache_size": "2GB"
}
```

### Access permissions

Control who can access volumes:

```javascript
// Multi-user permissions
{
  "permissions": {
    "owner": "full",
    "users": {
      "alice": "read-write",
      "bob": "read-only"
    },
    "require_2fa": true
  }
}
```

---

## Multiple volume workflows

### Organizing with volumes

Best practices for multiple volumes:

```
Personal/
├── Daily Use          (10GB - frequently accessed)
├── Archives           (100GB - long-term storage)
├── Media             (500GB - photos/videos)
└── Sensitive         (5GB - with hidden volume)

Work/
├── Active Projects   (50GB)
├── Client Data       (200GB - encrypted backups)
└── Confidential      (20GB - hidden volume)
```

### Switching between volumes

Efficiently work with multiple volumes:

1. **Quick switch**: `Ctrl+Tab` cycles through unlocked volumes
2. **Bookmark volumes**: Pin frequently used volumes
3. **Volume groups**: Organize related volumes
4. **Batch operations**: Unlock/lock multiple volumes

### Cross-volume operations

Move or copy files between volumes:

```bash
# Copy between volumes
curl -X POST http://localhost:3000/api/files/copy \
  -H "X-Auth-Token: your-token" \
  -d '{
    "source": "/volume1/path/file.pdf",
    "destination": "/volume2/path/file.pdf"
  }'
```

---

## Backup and recovery

### Volume backups

Protect against data loss:

**Full volume backup**
```bash
# Backup entire encrypted volume
cp /path/to/blobs/volume_id.blob /backup/location/

# Verify backup integrity
sha256sum /path/to/blobs/volume_id.blob
sha256sum /backup/location/volume_id.blob
```

**Incremental backups**
```javascript
// Configure in settings
{
  "backup": {
    "type": "incremental",
    "schedule": "daily",
    "retention": 30,
    "destination": "/mnt/backup/kurpod/"
  }
}
```

### Volume recovery

Restore from backups:

1. Stop Kurpod server
2. Copy backup blob to blobs directory
3. Restart server
4. Volume appears in list
5. Unlock with original password

### Export/Import

Transfer volumes between systems:

```bash
# Export volume with metadata
kurpod export --volume work_docs --output work_docs.kpd

# Import on another system
kurpod import --file work_docs.kpd

# Maintains all encryption and hidden volumes
```

---

## Security considerations

### Password management

Strong passwords are critical:

- Use unique passwords per volume
- 20+ characters minimum
- Include mixed case, numbers, symbols
- Consider passphrase approach
- Store passwords securely (password manager)

### Hidden volume safety

Maintain plausible deniability:

1. **Regular updates**: Modify standard volume periodically
2. **Size ratios**: Keep hidden volume < 20% of total
3. **Access patterns**: Don't access hidden volume too frequently
4. **Decoy files**: Keep believable content in standard volume

### Forensic resistance

Kurpod's design resists analysis:

```javascript
// Security features
{
  "random_padding": true,          // Hides actual data size
  "fake_filesystem": true,         // Mimics empty drive
  "anti_forensics": true,          // Overwrites metadata
  "secure_deletion": true          // Multi-pass overwrite
}
```

---

## Monitoring and maintenance

### Volume health

Monitor volume status:

```bash
# Check volume integrity
curl http://localhost:3000/api/volumes/{id}/health

# Response
{
  "status": "healthy",
  "integrity": "verified",
  "last_check": "2024-01-15T10:30:00Z",
  "fragmentation": "12%",
  "errors": 0
}
```

### Maintenance tasks

Keep volumes optimized:

**Defragmentation** (monthly)
```bash
kurpod maintenance --defrag --volume {id}
```

**Integrity check** (weekly)
```bash
kurpod verify --volume {id} --deep
```

**Cleanup** (as needed)
```bash
kurpod cleanup --remove-temp --compact
```

### Usage statistics

Track volume usage:

```javascript
// Volume statistics
{
  "usage": {
    "size_used": "45.2GB",
    "size_total": "100GB",
    "file_count": 12543,
    "folder_count": 234,
    "last_modified": "2024-01-15T14:22:31Z",
    "access_count": 1872
  }
}
```

---

## Troubleshooting

### Common issues

**Volume won't unlock**
- Verify password (case-sensitive)
- Check caps lock
- Ensure volume isn't corrupted
- Try recovery mode

**Performance issues**
- Defragment volume
- Increase cache size
- Check disk space
- Reduce concurrent operations

**Hidden volume not appearing**
- Using correct password?
- Volume may be locked
- Check hidden volume exists
- Verify no corruption

### Recovery mode

Access volumes with issues:

```bash
# Start in recovery mode
kurpod_server --recovery

# Attempt repair
kurpod repair --volume {id} --aggressive
```

### Debug logging

Enable detailed logging:

```javascript
// In config.json
{
  "logging": {
    "level": "debug",
    "volume_operations": true,
    "encryption_details": false,  // Keep false for security
    "performance_metrics": true
  }
}
```

{% callout title="Next steps" %}
Explore [backup strategies](/docs/backup-strategies) to protect your volumes, or learn about [reverse proxy setup](/docs/reverse-proxy) for secure remote access to your encrypted storage.
{% /callout %}