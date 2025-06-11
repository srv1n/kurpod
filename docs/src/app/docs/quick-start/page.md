---
title: Quick start
---

Get your encrypted file storage up and running in 5 minutes. This guide walks you through creating your first encrypted volume and storing files securely. {% .lead %}

---

## Prerequisites

Before starting, ensure you have:

- Kurpod installed and running (see [Installation guide](/docs/installation))
- A web browser (Chrome, Firefox, Safari, or Edge)
- A strong password ready (20+ characters recommended)

## Step 1: Access the web interface

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the Kurpod welcome screen. If you see an error:

- Check that Kurpod is running in your terminal
- Verify no other service is using port 3000
- Try `http://127.0.0.1:3000` instead

{% callout type="note" title="HTTPS setup" %}
For production use, set up HTTPS with a reverse proxy. See our [Reverse proxy guide](/docs/reverse-proxy) for instructions.
{% /callout %}

## Step 2: Create your encrypted volume

### First-time setup

1. Click **"Create New Storage"**
2. You'll see the volume creation screen

### Choose your setup mode

You have two options:

#### Option A: Standard volume only (Recommended for beginners)

1. Enter a strong password in the "Standard Password" field
2. Leave "Enable Hidden Volume" unchecked
3. Click **"Create Volume"**

#### Option B: With hidden volume (Maximum security)

1. Enter a password for your standard volume
2. Check "Enable Hidden Volume"
3. Enter a different password for your hidden volume
4. Click **"Create Volumes"**

{% callout type="warning" title="Password security" %}
- Use different passwords for standard and hidden volumes
- Store passwords in a password manager
- Never use passwords you've used elsewhere
- Consider using passphrases: "correct-horse-battery-staple"
{% /callout %}

### Wait for initialization

The volume creation process:
1. Generates encryption keys
2. Initializes the storage structure
3. Creates metadata indexes
4. Tests the encryption

This typically takes 5-10 seconds.

## Step 3: Your first file upload

Once your volume is created, you'll see the main interface.

### Upload a file

**Method 1: Drag and drop**
1. Drag any file from your computer
2. Drop it anywhere on the Kurpod interface
3. Watch the upload progress

**Method 2: Click to browse**
1. Click the **"Upload"** button
2. Select files from your computer
3. Click "Open"

**Method 3: Folder upload**
1. Drag an entire folder
2. Kurpod preserves the folder structure
3. All files are encrypted individually

### What happens during upload

1. File is read in your browser
2. Encrypted using your password-derived key
3. Uploaded to the server as encrypted chunks
4. Server stores only encrypted data

Your password and unencrypted files never leave your browser.

## Step 4: Working with files

### Viewing files

- **Images**: Click to preview inline
- **PDFs**: Built-in PDF viewer opens
- **Text files**: View and edit directly
- **Other files**: Click to download

### Organizing files

1. **Create folders**:
   - Click "New Folder"
   - Enter folder name
   - Drag files to organize

2. **Rename items**:
   - Right-click → Rename
   - Enter new name
   - Press Enter

3. **Move files**:
   - Drag to new location
   - Or cut/paste with keyboard

### Downloading files

1. Click any file to select
2. Click "Download" or right-click → Download
3. File is decrypted in your browser
4. Standard browser download starts

## Step 5: Using hidden volumes

If you created a hidden volume, here's how to use it:

### Switching volumes

1. Click your username/avatar
2. Select "Switch Volume"
3. Enter your hidden volume password
4. You now see completely different files

### Best practices

- **Keep some files in standard volume**: Makes it believable
- **Use hidden volume sparingly**: For truly sensitive data
- **Different types of content**: Don't make it obvious
- **Regular access patterns**: Don't only use hidden volume

{% callout type="warning" title="Plausible deniability" %}
The hidden volume only works if you maintain plausible deniability. Keep innocuous files in your standard volume so it appears to be your only storage.
{% /callout %}

## Common operations

### Search for files

1. Use the search bar at the top
2. Search works on filenames only
3. Search happens locally in encrypted index

### Bulk operations

- **Select multiple**: Ctrl/Cmd + Click
- **Select all**: Ctrl/Cmd + A
- **Bulk download**: Select files → Download
- **Bulk delete**: Select files → Delete

### Keyboard shortcuts

- `Ctrl/Cmd + U`: Upload files
- `Ctrl/Cmd + N`: New folder
- `Delete`: Delete selected
- `F2`: Rename selected
- `Ctrl/Cmd + A`: Select all

## Security checklist

Before using Kurpod for sensitive data:

- [ ] Using HTTPS (production only)
- [ ] Strong, unique password (20+ characters)
- [ ] Password stored securely
- [ ] Understand plausible deniability
- [ ] Regular backups configured
- [ ] Tested file recovery
- [ ] Reviewed [Security best practices](/docs/security-best-practices)

## Troubleshooting

### "Cannot connect to server"
- Verify Kurpod is running
- Check firewall settings
- Try different browser

### "Upload failed"
- Check disk space
- Verify file permissions
- Try smaller file first

### "Incorrect password"
- Passwords are case-sensitive
- Check Caps Lock
- Try both volume passwords

### "File won't preview"
- Some formats not supported
- File may be corrupted
- Try downloading instead

## Next steps

Now that you're up and running:

1. **Learn about security**:
   - [Plausible deniability](/docs/plausible-deniability)
   - [Encryption overview](/docs/encryption-overview)
   - [Threat model](/docs/threat-model)

2. **Set up for production**:
   - [Docker deployment](/docs/docker-deployment)
   - [Systemd service](/docs/systemd-service)
   - [Reverse proxy](/docs/reverse-proxy)

3. **Advanced features**:
   - [REST API](/docs/rest-api)
   - [Backup strategies](/docs/backup-strategies)
   - [Performance tuning](/docs/performance-tuning)

## Getting help

- **GitHub Issues**: [Report bugs](https://github.com/srv1n/kurpod/issues)
- **Discussions**: [Ask questions](https://github.com/srv1n/kurpod/discussions)
- **Security**: security@kurpod.org (PGP available)

Welcome to the Kurpod community. Your privacy journey starts here.