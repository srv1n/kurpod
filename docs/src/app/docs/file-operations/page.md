---
title: File operations
nextjs:
  metadata:
    title: File operations
    description: Learn how to upload, download, organize, and manage files in your encrypted Kurpod volumes.
---

Working with files in Kurpod is designed to be intuitive while maintaining the highest security standards. All file operations happen through encrypted channels with client-side encryption. {% .lead %}

---

## Uploading files

Kurpod supports multiple methods for uploading files to your encrypted volumes:

### Web interface upload

The easiest way to upload files is through the web interface:

1. Navigate to your desired folder
2. Click the **Upload** button or drag files directly onto the page
3. Select files from your computer (multiple selection supported)
4. Monitor upload progress in the status bar

```javascript
// Files are automatically encrypted before upload
// Maximum file size: 5GB per file
// Supported formats: All file types
```

### Bulk upload

For uploading multiple files or entire directories:

1. Use the **Bulk Upload** option in the toolbar
2. Select multiple files or folders
3. Kurpod preserves directory structure
4. Progress shown for each file

{% callout type="note" title="Upload performance" %}
Upload speed depends on your connection and file size. Files are encrypted in chunks client-side before transmission, which may add slight overhead but ensures your data is never exposed.
{% /callout %}

### Command line upload

For automated workflows, use the REST API:

```bash
# Upload a single file
curl -X POST http://localhost:3000/api/upload \
  -H "X-Auth-Token: your-token" \
  -F "file=@document.pdf" \
  -F "path=/documents/"

# Upload multiple files
for file in *.pdf; do
  curl -X POST http://localhost:3000/api/upload \
    -H "X-Auth-Token: your-token" \
    -F "file=@$file" \
    -F "path=/documents/"
done
```

---

## Downloading files

### Single file download

To download individual files:

1. Click on any file in the file browser
2. Select **Download** from the context menu
3. File is decrypted client-side and saved to your downloads folder

### Batch download

Download multiple files at once:

1. Select multiple files using Ctrl/Cmd+Click
2. Click **Download Selected**
3. Files are packaged into an encrypted ZIP archive
4. Archive is decrypted client-side after download

### Direct links

Generate temporary download links for sharing:

```bash
# Generate a temporary download link (expires in 1 hour)
curl -X POST http://localhost:3000/api/share \
  -H "X-Auth-Token: your-token" \
  -d '{"file_id": "abc123", "expires_in": 3600}'
```

{% callout type="warning" title="Security consideration" %}
Temporary links still require authentication. Never share links publicly - they're meant for secure, time-limited access.
{% /callout %}

---

## File organization

### Creating folders

Organize your encrypted files with a hierarchical folder structure:

```bash
# Via web interface:
# Right-click → New Folder → Enter name

# Via API:
curl -X POST http://localhost:3000/api/folders \
  -H "X-Auth-Token: your-token" \
  -d '{"path": "/documents/contracts/"}'
```

### Moving files

Drag and drop to reorganize:

1. Select files to move
2. Drag to destination folder
3. Confirm move operation
4. Files are re-indexed without re-encryption

### Renaming

Right-click any file or folder to rename:

- Original encryption preserved
- Only metadata updated
- Instant operation

### Batch operations

Perform operations on multiple items:

```javascript
// Select all: Ctrl/Cmd + A
// Select range: Shift + Click
// Select individual: Ctrl/Cmd + Click

// Available batch operations:
// - Move to folder
// - Download as archive
// - Delete selected
// - Change permissions
```

---

## File preview

Kurpod includes secure preview for common file types:

### Supported formats

- **Images**: JPG, PNG, GIF, WebP, SVG
- **Documents**: PDF, TXT, MD, JSON, XML
- **Media**: MP4, WebM, MP3, OGG
- **Code**: JS, Python, Go, Rust, etc.

### Preview security

All previews maintain encryption:

1. File decrypted in memory only
2. No temporary files created
3. Preview data cleared on navigation
4. Media streams are encrypted

```javascript
// Preview automatically opens for supported types
// Disable preview in settings if needed
// Large files (>50MB) show confirmation first
```

---

## Search and filtering

### Quick search

Find files instantly with encrypted search:

```bash
# Search happens client-side on decrypted metadata
# Supports partial matching
# Case-insensitive by default
```

### Advanced filters

Filter your file list by:

- **Type**: Documents, Images, Videos, etc.
- **Size**: Less than, greater than, between
- **Date**: Created, modified, accessed
- **Tags**: Custom tags you've applied

### Saved searches

Create reusable search filters:

1. Configure your search parameters
2. Click **Save Search**
3. Access from sidebar shortcuts
4. Update criteria anytime

---

## File metadata

### Viewing properties

Right-click → Properties to see:

- File size (original and encrypted)
- Upload date and time
- Encryption algorithm used
- SHA-256 checksum
- Access permissions

### Custom metadata

Add tags and descriptions:

```javascript
// Add tags for organization
tags: ["important", "contracts", "2024"]

// Add descriptions
description: "Q4 financial report - final version"

// Metadata is encrypted with file
```

### Version history

If versioning is enabled:

1. View all versions of a file
2. Compare changes between versions
3. Restore previous versions
4. Delete old versions to save space

---

## Performance optimization

### Upload optimization

Tips for faster uploads:

- **Batch small files**: Upload as ZIP archive
- **Use wired connection**: For large transfers
- **Enable compression**: In settings for text files
- **Schedule uploads**: During off-peak hours

### Caching

Kurpod intelligently caches:

- File thumbnails (encrypted)
- Directory structures
- Recently accessed files
- Search indexes

Clear cache from Settings → Storage → Clear Cache

### Bandwidth management

Configure upload/download limits:

```javascript
// In settings.json
{
  "bandwidth": {
    "upload_limit_mbps": 10,
    "download_limit_mbps": 50,
    "concurrent_transfers": 3
  }
}
```

---

## Troubleshooting

### Common issues

**Upload fails**
- Check file size limits
- Verify storage quota
- Ensure stable connection
- Check file permissions

**Download corrupted**
- Clear browser cache
- Verify file integrity
- Try alternative browser
- Check disk space

**Preview not working**
- Update browser
- Check file format support
- Verify decryption key
- Enable JavaScript

### Error codes

- `E001`: Insufficient storage
- `E002`: File too large
- `E003`: Encryption failure
- `E004`: Network timeout
- `E005`: Invalid file type

---

## Best practices

### File naming

- Use descriptive names
- Avoid special characters
- Include dates for versions
- Organize with prefixes

### Folder structure

```
/documents
  /contracts
    /2024
  /invoices
  /reports
/media
  /photos
    /family
    /work
  /videos
/backups
  /daily
  /weekly
```

### Security tips

1. Regularly audit file access logs
2. Remove unused files
3. Use strong authentication
4. Enable 2FA for sensitive files
5. Backup encryption keys securely

{% callout title="Next steps" %}
Learn about [managing volumes](/docs/managing-volumes) to organize multiple encrypted storage containers, or explore [backup strategies](/docs/backup-strategies) to protect your encrypted data.
{% /callout %}