# Kurpod User Manual

A comprehensive guide to using Kurpod for secure encrypted file storage.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [First Time Setup](#first-time-setup)
4. [Using the Web Interface](#using-the-web-interface)
5. [File Management](#file-management)
6. [Security Features](#security-features)
7. [Advanced Usage](#advanced-usage)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

## Getting Started

### What is Kurpod?

Kurpod is a secure file storage system that encrypts all your files in a single blob file while providing an easy-to-use web interface. It's designed for users who need:

- **Privacy**: All files are encrypted with XChaCha20-Poly1305 encryption
- **Plausible Deniability**: Hidden volumes for sensitive data
- **Multi-Device Access**: Web interface accessible from any device on your network
- **Simplicity**: No complex setup or user management

### System Overview

```
Your Device (Phone/Computer) ──── Network ──── Server Computer
         │                                           │
    Web Browser                                 Kurpod
    (File Upload/Download)                (Encrypted Storage)
```

## Installation

### Option 1: Download Pre-built Binary (Recommended)

1. Go to the [Releases page](https://github.com/srv1n/kurpod/releases)
2. Download the appropriate file for your system:
   - **Linux**: `kurpod_server-vX.X.X-linux-amd64.tar.gz`
   - **macOS (Apple Silicon/M1/M2)**: `kurpod_server-vX.X.X-darwin-arm64.tar.gz`
   - **macOS (Intel)**: `kurpod_server-vX.X.X-darwin-amd64.tar.gz`

3. Extract the file:
   ```bash
   tar -xzf kurpod_server-*.tar.gz
   ```

4. Make it executable (Linux/macOS):
   ```bash
   chmod +x kurpod_server
   ```

### Option 2: Build from Source

If you're comfortable with development tools:

1. Install Rust and Bun:
   ```bash
   # Install Rust
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # Install Bun
   curl -fsSL https://bun.sh/install | bash
   ```

2. Clone and build:
   ```bash
   git clone https://github.com/srv1n/kurpod.git
   cd kurpod
   ./build.sh
   ```

## First Time Setup

### Starting the Server

1. Open a terminal/command prompt
2. Navigate to where you extracted the `kurpod_server` binary
3. Run the server:
   ```bash
   ./kurpod_server
   ```

You should see output like:
```
2025-02-06T10:30:00.000Z INFO  Starting Kurpod...
2025-02-06T10:30:00.000Z INFO  Server running on http://0.0.0.0:3000
2025-02-06T10:30:00.000Z INFO  Local access: http://localhost:3000
2025-02-06T10:30:00.000Z INFO  Network access: http://192.168.1.100:3000
```

### Initial Configuration

1. Open your web browser and go to `http://localhost:3000`
2. You'll see the **Initial Setup** screen

#### Creating Your Storage

1. **Standard Volume Password**: This is your main password
   - Must be at least 8 characters (20+ recommended)
   - Use a mix of uppercase, lowercase, numbers, and symbols
   - Example: `MySecure!Storage2025`

2. **Hidden Volume Password** (Optional but Recommended):
   - Completely different from your standard password
   - Creates a secret storage area accessible only with this password
   - Example: `Hidden$Vault!2025`

3. Click **"Create Secure Storage"**

⚠️ **Important**: Write down both passwords and store them safely! There's no password recovery.

### Understanding Volumes

Kurpod supports two independent storage volumes:

- **Standard Volume**: Your main storage, accessed with the standard password
- **Hidden Volume**: Secret storage, accessed with the hidden password

When someone asks for your password under duress, you can give them the standard password. They'll see only the standard volume and won't know the hidden volume exists.

## Using the Web Interface

### Unlocking Your Storage

When you start Kurpod and visit the web interface:

1. You'll see the **Unlock Storage** screen
2. Enter either your standard or hidden password
3. Click **"Unlock Storage"**
4. The interface will show which volume you've unlocked

### Main Interface Overview

Once unlocked, you'll see:

```
┌─────────────────────────────────────────────────────────┐
│ Kurpod - [Standard Volume] or [Hidden Volume]          │
├─────────────────────────────────────────────────────────┤
│ [Upload Files] [Create Folder] [Select All] [Logout]   │
├─────────────────────────────────────────────────────────┤
│ Current Path: /                                         │
├─────────────────────────────────────────────────────────┤
│ 📁 Documents                               Modified     │
│ 📁 Photos                                  Yesterday    │
│ 📄 report.pdf                    1.2 MB   2 hours ago  │
│ 🖼️ vacation.jpg                  3.4 MB   Last week    │
└─────────────────────────────────────────────────────────┘
```

### Navigation

- **Click folders** to enter them
- **Click the path breadcrumb** to go back to parent folders
- **Double-click files** to preview (images/PDFs) or download
- **Right-click files/folders** for context menu (rename, delete)

## File Management

### Uploading Files

#### Method 1: Drag and Drop
1. Select files on your computer
2. Drag them into the Kurpod window
3. Drop them anywhere in the file area
4. Files will upload and encrypt automatically

#### Method 2: Upload Button
1. Click **"Upload Files"** button
2. Select files using the file picker
3. Click **"Open"** to start upload

#### Method 3: Upload Folders
1. Click **"Upload Folder"** button (if available)
2. Select an entire folder
3. All files and subfolders will be uploaded

### Downloading Files

#### Single Files
1. Right-click the file
2. Select **"Download"**
3. File will decrypt and download to your computer

#### Multiple Files
1. Check the boxes next to files you want
2. Click **"Download Selected"**
3. Files will be packaged and downloaded as a ZIP

### Creating Folders

1. Click **"Create Folder"** button
2. Enter the folder name
3. Press Enter or click **"Create"**

### Renaming Files/Folders

1. Right-click the item
2. Select **"Rename"**
3. Enter the new name
4. Press Enter to confirm

### Deleting Files/Folders

1. Right-click the item
2. Select **"Delete"**
3. Confirm the deletion
4. Item will be removed from the metadata map

⚠️ **Warning**: `delete` removes metadata only. The encrypted bytes stay in the
blob file until you run the compaction routine or wipe the storage. Deleted
files remain recoverable until then.

## Security Features

### Password Security

Your passwords are your only protection. Follow these guidelines:

**Strong Password Examples:**
- ✅ `My$ecure!File$2025`
- ✅ `Ph0t0$&D0cument$V@ult`
- ✅ `Tr@nsfer#Station!2025`

**Weak Password Examples:**
- ❌ `password123`
- ❌ `myfiles`
- ❌ `123456789`

### Network Security

**Local Network Use** (Default):
- KURPOD Server is accessible to all devices on your local network
- Find your server's IP address in the startup logs
- Access from phones/tablets: `http://192.168.1.100:3000` (use your server's IP)

**Internet Access** (Advanced):
If you want to access your files from outside your home network, you MUST use HTTPS:

1. Set up a reverse proxy (Nginx, Caddy)
2. Get an SSL certificate (Let's Encrypt)
3. Configure proper firewall rules

**Never expose the plain HTTP server to the internet!**

### Data Integrity

KURPOD Server automatically:
- Verifies file integrity when reading
- Detects if files have been tampered with
- Uses authenticated encryption (AEAD)
- Prevents corruption from being undetected

## Advanced Usage

### Command Line Options

```bash
# Custom port
./enc_server --port 8080

# Custom storage file location
./enc_server --blob /secure/path/my_storage.blob

# Custom port and storage
./enc_server --port 8080 --blob /secure/my_storage.blob

# Enable debug logging
RUST_LOG=debug ./enc_server
```

### Running as a Service (Linux)

Create a systemd service file `/etc/systemd/system/kurpod-server.service`:

```ini
[Unit]
Description=KURPOD Server
After=network.target

[Service]
Type=simple
User=encserver
Group=encserver
WorkingDirectory=/home/encserver
ExecStart=/home/encserver/enc_server --port 3000 --blob /home/encserver/storage.blob
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable kurpod-server
sudo systemctl start kurpod-server
```

### Multiple Storage Files

You can create multiple independent storage files:

```bash
# Personal files
./enc_server --port 3001 --blob personal.blob

# Work files  
./enc_server --port 3002 --blob work.blob

# Family photos
./enc_server --port 3003 --blob photos.blob
```

Each runs on a different port with completely separate encryption.

### Compaction Routine

When you delete files, only their metadata is removed. The encrypted bytes stay
in the blob file until you compact it. To reclaim space and permanently remove
deleted data:

```bash
# 1. Stop the server
sudo systemctl stop kurpod-server

# 2. Run compaction
./enc_server --compact /home/encserver/storage.blob

# 3. Restart the server
sudo systemctl start kurpod-server
```

Run compaction whenever you've deleted sensitive files or want to reduce blob
size.

### Backup Strategy

Your blob file contains ALL your encrypted data. To backup:

1. **Stop the server** (important!)
2. **Copy the blob file** to backup location
3. **Test the backup** by starting server with backup file
4. **Store backups securely** (encrypted external drive, cloud storage)

```bash
# Example backup script
sudo systemctl stop kurpod-server
cp /home/encserver/storage.blob /backup/storage-$(date +%Y%m%d).blob
sudo systemctl start kurpod-server
```

### Reclaiming Space

Deleting files only removes their metadata. To shrink the blob file you must
compact it. Send a request to the server while it is unlocked:

```bash
curl -X POST http://localhost:3000/api/compact \
     -H 'Content-Type: application/json' \
     -d '{"password_s":"<standard>","password_h":"<hidden>"}'
```

Depending on blob size this may take a while. Always create a backup of the blob
before running compaction in case of power loss or interruption.

## Troubleshooting

### Common Issues

#### "Connection Refused" Error
- **Problem**: Can't connect to server
- **Solutions**:
  - Check if server is running
  - Verify the port number
  - Check firewall settings
  - Try `http://localhost:3000` instead of IP address

#### "Wrong Password" Error
- **Problem**: Password doesn't unlock storage
- **Solutions**:
  - Double-check password (it's case-sensitive)
  - Try the other volume password (standard vs hidden)
  - Check if Caps Lock is on
  - Ensure blob file hasn't been corrupted

#### Server Won't Start
- **Problem**: Binary fails to run
- **Solutions**:
  - Check file permissions: `chmod +x enc_server`
  - Verify you downloaded the right version for your OS
  - Check if port is already in use: `lsof -i :3000`
  - Try a different port: `./enc_server --port 8080`

#### Files Won't Upload
- **Problem**: Upload fails or hangs
- **Solutions**:
  - Check available disk space
  - Verify file isn't locked by another program
  - Try smaller files first
  - Check server logs for errors

#### Web Interface Doesn't Load
- **Problem**: Browser shows error page
- **Solutions**:
  - Clear browser cache
  - Try incognito/private mode
  - Try a different browser
  - Check server console for errors

### Getting Help

1. **Check server logs**: Look at the terminal where you started the server
2. **Enable debug logging**: Start with `RUST_LOG=debug ./enc_server`
3. **Test with small files**: Isolate the problem
4. **Check system resources**: Ensure enough RAM/disk space

### Log Levels

Control logging detail with the `RUST_LOG` environment variable:

```bash
RUST_LOG=error ./enc_server    # Errors only
RUST_LOG=warn ./enc_server     # Warnings and errors
RUST_LOG=info ./enc_server     # Normal operation info
RUST_LOG=debug ./enc_server    # Detailed debugging
RUST_LOG=trace ./enc_server    # Maximum detail
```

## Best Practices

### Security Best Practices

1. **Use Strong Passwords**:
   - 20+ characters recommended
   - Mix of letters, numbers, symbols
   - Different for standard and hidden volumes
   - Use a password manager

2. **Secure Your Server**:
   - Keep server software updated
   - Use file system permissions: `chmod 600 storage.blob`
   - Don't run as root user
   - Use HTTPS for remote access

3. **Network Security**:
   - Use firewall rules to limit access
   - Consider VPN for remote access
   - Monitor server logs for suspicious activity

4. **Backup Strategy**:
   - Regular automated backups
   - Test backup restoration
   - Store backups securely (encrypted)
   - Keep backups in multiple locations

### Operational Best Practices

1. **File Organization**:
   - Use descriptive folder names
   - Organize by date, project, or type
   - Don't store too many files in one folder

2. **Performance**:
   - Use SSD storage for blob file
   - Ensure adequate RAM (1GB+ recommended)
   - Monitor disk space usage
   - Consider file size limits

3. **Maintenance**:
   - Regular server restarts
   - Monitor log files
   - Check blob file integrity
   - Update software regularly
   - Run `./enc_server --compact <blob>` after large deletions to purge residual data

### Usage Recommendations

1. **File Types**:
   - KURPOD Server works with all file types
   - Preview available for images and PDFs
   - Large files (>100MB) may take time to upload

2. **Concurrent Access**:
   - Designed for single user access
   - Don't access same storage from multiple browsers
   - Use logout when finished

3. **Mobile Access**:
   - Web interface works on phones/tablets
   - Use WiFi for large file transfers
   - Mobile uploads may be slower

### Privacy Considerations

1. **Hidden Volume Usage**:
   - Store truly sensitive data in hidden volume
   - Keep standard volume populated with realistic files
   - Never mention hidden volume exists
   - Practice accessing both volumes

2. **Metadata Protection**:
   - File names and sizes are encrypted
   - Creation/modification times are encrypted
   - Directory structure is encrypted
   - No metadata leakage to file system

3. **Operational Security**:
   - Use secure devices for access
   - Log out when finished
   - Don't leave browser open unattended
   - Be aware of shoulder surfing

Remember: Your security is only as strong as your weakest link. Follow these practices consistently for maximum protection.