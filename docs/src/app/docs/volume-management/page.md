---
title: Volume management
---

Learn how to create, manage, and maintain encrypted volumes in Kurpod. Master both standard and hidden volume operations. {% .lead %}

---

## Understanding volumes

Kurpod uses a volume-based encryption system where each volume is an independent encrypted container:

- **Standard volume**: Your primary encrypted storage
- **Hidden volume**: Optional secondary storage for plausible deniability
- **Blob file**: Physical file containing one or both volumes

### Volume structure

```
Blob File
├── Header (512 bytes)
│   ├── Version info
│   ├── Salt for key derivation
│   └── Metadata
├── Standard Volume
│   ├── Encrypted file system
│   ├── File contents
│   └── Free space (random data)
└── Hidden Volume (optional)
    ├── Overlaps "free space"
    ├── Independent file system
    └── Completely invisible
```

---

## Creating volumes

### Standard volume only

The simplest setup for most users:

1. Access Kurpod web interface
2. Click "Create New Storage"
3. Enter a strong password
4. Leave "Enable Hidden Volume" unchecked
5. Click "Create"

```javascript
// API equivalent
POST /api/create
{
  "password_standard": "your-secure-password-here",
  "enable_hidden": false
}
```

### With hidden volume

For maximum security:

1. Access Kurpod web interface
2. Click "Create New Storage"
3. Enter standard volume password
4. Check "Enable Hidden Volume"
5. Enter hidden volume password (must be different)
6. Click "Create"

{% callout type="warning" title="Critical: Different passwords" %}
Always use completely different passwords for standard and hidden volumes. Related passwords compromise plausible deniability.
{% /callout %}

### Volume sizing

Kurpod automatically allocates space:

- **Standard volume**: ~85% of blob size
- **Hidden volume**: ~15% of blob size
- **Automatic protection**: Prevents overwriting

You cannot manually set volume sizes for security reasons.

---

## Accessing volumes

### Unlock standard volume

Default behavior - enter your standard password:

```bash
# Web interface
Navigate to http://localhost:3000
Enter standard password
Click "Unlock"

# API
POST /api/unlock
{
  "password": "standard-password"
}
```

### Switch to hidden volume

Access your hidden files:

1. First unlock with standard password
2. Click user menu → "Switch Volume"
3. Enter hidden volume password
4. You now see hidden volume contents

```javascript
// API equivalent
POST /api/volume/switch
{
  "password": "hidden-password"
}
```

### Volume indicators

Know which volume you're using:

- **Status bar**: Shows "Standard" or "Hidden"
- **Color coding**: Different UI accent colors
- **File count**: Independent for each volume
- **Storage usage**: Separate measurements

---

## Managing files

### File operations

All operations work identically in both volumes:

- **Upload**: Drag & drop or click upload
- **Download**: Click to download
- **Delete**: Right-click → Delete
- **Rename**: Right-click → Rename
- **Move**: Drag to new folder

### Volume isolation

Important: Volumes are completely isolated:

- No file sharing between volumes
- No references across volumes
- Independent folder structures
- Separate trash/recycle bins

### Storage limits

Monitor your usage:

```javascript
// Check volume info
GET /api/volume/info

Response:
{
  "type": "standard",
  "used": 524288000,      // 500 MB
  "total": 1073741824,    // 1 GB
  "files": 142,
  "folders": 23
}
```

Warning signs:
- **90% full**: Yellow warning
- **95% full**: Red warning
- **100% full**: Uploads blocked

---

## Maintenance operations

### Compaction

Reclaim space from deleted files:

1. Navigate to Settings
2. Click "Compact Storage"
3. Enter both passwords (if hidden volume exists)
4. Wait for completion

```bash
# API
POST /api/compact
{
  "password_standard": "standard-password",
  "password_hidden": "hidden-password"
}
```

What compaction does:
- Removes deleted file data
- Defragments storage
- Re-randomizes free space
- Maintains plausible deniability

### Backup volumes

Always maintain backups:

```bash
# Backup entire blob
cp /path/to/storage.blob /backup/storage.blob.backup

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BLOB="/var/lib/kurpod/storage.blob"
BACKUP="/backup/kurpod_$DATE.blob"

# Stop server (optional for consistency)
systemctl stop kurpod

# Create backup
cp $BLOB $BACKUP

# Compress
gzip $BACKUP

# Restart server
systemctl start kurpod
```

### Volume verification

Check volume integrity:

```bash
# Built-in verification
POST /api/volume/verify
{
  "password": "your-password"
}

# Manual check
kurpod_tool verify --blob storage.blob
```

---

## Advanced operations

### Password changes

Change volume passwords safely:

1. **Backup first** - Critical!
2. Navigate to Settings → Security
3. Enter current password
4. Enter new password twice
5. Click "Change Password"
6. Process re-encrypts all data

```javascript
// API (coming soon)
POST /api/volume/rekey
{
  "current_password": "old-password",
  "new_password": "new-secure-password"
}
```

{% callout type="danger" title="Backup required" %}
Password changes re-encrypt the entire volume. Always backup first. Interruption during rekey can cause data loss.
{% /callout %}

### Volume migration

Move volumes between systems:

1. **Export volume**:
   ```bash
   # Stop server
   systemctl stop kurpod
   
   # Copy blob file
   cp storage.blob /media/usb/kurpod_export.blob
   ```

2. **Import on new system**:
   ```bash
   # Copy to new location
   cp /media/usb/kurpod_export.blob /var/lib/kurpod/storage.blob
   
   # Set permissions
   chown kurpod:kurpod /var/lib/kurpod/storage.blob
   chmod 600 /var/lib/kurpod/storage.blob
   
   # Start server
   systemctl start kurpod
   ```

### Volume splitting

Split large volumes (advanced):

```bash
# Future feature
kurpod_tool split \
  --input large.blob \
  --output-dir /splits/ \
  --size 1GB
```

### Volume merging

Combine multiple volumes:

```bash
# Future feature
kurpod_tool merge \
  --inputs vol1.blob,vol2.blob \
  --output merged.blob
```

---

## Security considerations

### Operational security

Maintain plausible deniability:

1. **Regular standard volume use**
   - Add files frequently
   - Access regularly
   - Keep it realistic

2. **Minimal hidden volume access**
   - Only when necessary
   - Clear browser data after
   - Use incognito mode

3. **Content separation**
   - Innocent files in standard
   - Sensitive in hidden
   - No obvious connections

### Access patterns

Avoid revealing hidden volume:

```
Good:
Mon: Access standard (photos)
Tue: Access standard (documents)
Wed: Access standard (music)
Thu: Access hidden (5 min)
Fri: Access standard (work files)

Bad:
Mon: Access hidden (2 hours)
Tue: Access hidden (3 hours)
Wed: Never access standard
```

### Emergency procedures

If compromised:

1. **Immediate lock**:
   ```javascript
   POST /api/lock
   ```

2. **Destroy evidence**:
   ```bash
   # Secure deletion
   shred -vfz storage.blob
   
   # Or faster
   dd if=/dev/urandom of=storage.blob bs=1M
   ```

3. **Plausible denial**:
   - "I forgot the password"
   - "It's corrupted"
   - "I only have standard volume"

---

## Troubleshooting

### Cannot unlock volume

Possible causes:
- Wrong password (check Caps Lock)
- Corrupted blob file
- Wrong blob file loaded

Solutions:
1. Verify password carefully
2. Check blob file integrity
3. Restore from backup

### Hidden volume not accessible

Symptoms:
- Switch volume fails
- Wrong password error
- Files missing

Solutions:
1. Ensure hidden volume was created
2. Use correct hidden password
3. Check you're not in standard volume

### Performance issues

Large volumes may be slow:

1. **Enable caching**:
   ```toml
   [cache]
   enabled = true
   size = "1GB"
   ```

2. **Use SSD storage**:
   - Move blob to SSD
   - Dramatic speed improvement

3. **Regular compaction**:
   - Reduces fragmentation
   - Improves performance

### Corruption recovery

If blob is corrupted:

1. **Stop immediately**:
   ```bash
   systemctl stop kurpod
   ```

2. **Make backup of corrupted file**:
   ```bash
   cp storage.blob storage.blob.corrupted
   ```

3. **Attempt recovery**:
   ```bash
   kurpod_tool recover \
     --input storage.blob.corrupted \
     --output storage.blob.recovered
   ```

4. **Restore from backup** if recovery fails

---

## Best practices

### Do's

- ✅ Regular backups (encrypted)
- ✅ Strong, unique passwords
- ✅ Test recovery procedures
- ✅ Monitor storage usage
- ✅ Regular compaction
- ✅ Keep software updated
- ✅ Use hidden volume sparingly
- ✅ Maintain realistic standard volume

### Don'ts

- ❌ Share passwords
- ❌ Use predictable passwords
- ❌ Ignore backup warnings
- ❌ Fill volumes completely
- ❌ Access hidden volume frequently
- ❌ Store passwords together
- ❌ Interrupt compaction
- ❌ Mix sensitive/innocent files

### Maintenance schedule

Recommended routine:

- **Daily**: Monitor usage
- **Weekly**: Quick backup
- **Monthly**: Full backup + verify
- **Quarterly**: Compaction
- **Yearly**: Security review

---

## Summary

Effective volume management ensures:

- **Data security**: Proper encryption maintained
- **Plausible deniability**: Hidden volume protected
- **Data integrity**: Backups and verification
- **Performance**: Regular maintenance
- **Recovery options**: Prepared for disasters

Remember: volumes are only as secure as your operational practices. Technology provides the tools; you must use them wisely.