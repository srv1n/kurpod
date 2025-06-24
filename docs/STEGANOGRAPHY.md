# PNG Steganography in KURPOD

This document describes KURPOD's PNG steganography capabilities, which allow you to hide encrypted file storage inside innocent-looking PNG images.

## Overview

PNG steganography in KURPOD uses **ancillary chunks** to embed encrypted blob data inside PNG image files. The resulting files:

- ✅ **Look like normal PNG images** - can be opened by any image viewer/editor
- ✅ **Maintain visual quality** - the original image appearance is preserved
- ✅ **Support dual volumes** - both standard and hidden volumes work inside PNG
- ✅ **Large capacity** - can store 100MB+ of encrypted data
- ✅ **Low detection risk** - ancillary chunks are part of the PNG specification
- ✅ **Survive basic editing** - metadata edits typically preserve the hidden data

## How It Works

### Technical Implementation

KURPOD embeds data using PNG's **ancillary chunk** mechanism:

1. **Chunk Type**: Uses `ruNd` (custom chunk type)
   - Lowercase 'r' makes it ancillary (safe to ignore)
   - Most viewers and editors will skip unknown ancillary chunks

2. **Embedding Strategy**:
   - Creates a normal KURPOD blob (with encryption and dual volumes)
   - Splits the blob into 256KB chunks to avoid suspicion
   - Inserts chunks before the `IDAT` (image data) section
   - Calculates proper CRC32 checksums for PNG compliance

3. **Extraction Process**:
   - Scans PNG chunks for `ruNd` type
   - Reconstructs the original blob by concatenating chunk data
   - Falls back to normal blob format for backward compatibility

### Security Properties

- **Plausible Deniability**: File appears as innocent PNG image
- **Encryption**: All data is encrypted with XChaCha20-Poly1305 + Argon2id
- **Dual Volumes**: Different passwords access different encrypted spaces
- **Format Compliance**: Generated PNGs follow PNG specification exactly

## Usage Examples

### Basic Demo

Run the included demonstration:

```bash
cd encryption_core
cargo run --bin png_stego_demo
```

This creates a sample steganographic PNG and demonstrates:
- Creating a PNG with embedded storage
- Adding files to the hidden storage
- Accessing both standard and hidden volumes
- Verifying the PNG remains a valid image

### API Usage

```rust
use encryption_core::{
    init_stego_blob, unlock_stego_blob, add_file_stego, 
    PngChunkCarrier, VolumeType
};

// Create steganographic blob
let carrier = PngChunkCarrier::new();
init_stego_blob(
    Path::new("original.png"),      // Input PNG image
    Path::new("stego.png"),         // Output steganographic PNG
    &carrier,
    "decoy_password",               // Standard volume password
    "secret_password"               // Hidden volume password
)?;

// Unlock and use
let carriers = vec![carrier];
let (volume_type, key, mut metadata) = unlock_stego_blob(
    Path::new("stego.png"),
    &carriers,
    "decoy_password"
)?;

// Add files (requires original carrier for re-embedding)
add_file_stego(
    Path::new("stego.png"),         // Steganographic file
    Path::new("original.png"),      // Original carrier
    &carriers[0],
    volume_type,
    &key,
    &mut metadata,
    "secret.txt",                   // File path
    b"Secret content",              // File data
    "text/plain"                    // MIME type
)?;
```

## Capacity and Limitations

### Capacity
- **Theoretical**: Unlimited (PNG allows multiple ancillary chunks)
- **Practical**: 100MB+ per PNG (configurable limit to avoid suspicion)
- **Per-chunk**: 256KB maximum to blend in with normal metadata

### Limitations
1. **File Size Growth**: Steganographic PNGs are larger than originals
2. **Optimization Risk**: Some tools may strip unknown chunks
3. **Lossy Conversion**: Converting to JPEG destroys hidden data
4. **Compression Tools**: Aggressive PNG optimizers may remove chunks

### Compatibility
✅ **Safe Operations**:
- Opening in image viewers (Preview, Photos, GIMP, Photoshop)
- Basic metadata editing (EXIF, XMP)
- Color adjustments, crop, resize operations
- Saving in same format with most editors

⚠️ **Risky Operations**:
- PNG optimization tools (`optipng`, `pngcrush` with `-rem` flags)
- Format conversion (PNG → JPEG, WebP)
- Batch processing tools that strip metadata
- Online image compression services

## Detection and Security Analysis

### Stegananalysis Resistance

**Low Detection Risk**:
- Uses standard PNG chunk format with proper CRC
- Chunk type follows PNG naming conventions
- No statistical anomalies in image pixel data
- Entropy appears normal for compressed data chunks

**Potential Detection Vectors**:
- Large ancillary chunks (mitigated by chunk size limits)
- Multiple unknown chunk types (we use consistent `ruNd`)
- File size analysis (can be masked with decoy data)

### Antivirus/Malware Scanners

**Generally Safe**:
- PNG format is well-understood and trusted
- Ancillary chunks are part of PNG specification
- No executable code or script injection
- High-entropy data appears as compressed content

**Mitigation Strategies**:
- Keep individual chunks under 1MB
- Use realistic PNG files as carriers
- Avoid suspicious file naming patterns

## Best Practices

### Choosing Carrier Images
1. **Use realistic photos** - vacation, family, nature photos work best
2. **Avoid tiny images** - larger images make size increases less noticeable
3. **Match context** - ensure the image makes sense in your environment
4. **Test compatibility** - verify the image opens normally after embedding

### Operational Security
1. **Backup carriers** - keep original PNG files separately
2. **Test workflows** - verify your image editing tools preserve chunks
3. **Use appropriate file names** - `vacation_hawaii_2024.png` not `secret_data.png`
4. **Cloud storage** - test that your cloud provider doesn't re-compress PNGs

### Development Integration
1. **Carrier Management** - implement systems to store/retrieve original carriers
2. **Format Detection** - auto-detect whether files are normal blobs or steganographic
3. **Graceful Degradation** - fall back to normal operation if carrier extraction fails
4. **Chunk Optimization** - balance capacity vs. detectability based on threat model

## Future Extensions

The `StegoCarrier` trait is designed for extensibility:

```rust
pub trait StegoCarrier {
    fn capacity(&self, carrier_bytes: &[u8]) -> usize;
    fn embed(&self, carrier_bytes: &[u8], payload: &[u8]) -> Result<Vec<u8>>;
    fn extract(&self, carrier_bytes: &[u8]) -> Option<Vec<u8>>;
}
```

**Planned Implementations**:
- **PDF**: Embedded file objects or incremental updates
- **JPEG**: APP segment injection or DCT coefficient modification  
- **MP4**: Custom metadata atoms or subtitle tracks
- **Audio**: LSB embedding in WAV/FLAC files

## Testing and Validation

Run the complete test suite:

```bash
cd encryption_core
cargo test png_steganography
```

**Test Coverage**:
- Basic embedding and extraction
- Dual volume functionality
- Backward compatibility with normal blobs
- Capacity limits and error handling
- PNG format validation

## Troubleshooting

### Common Issues

**"Failed to extract blob from steganographic file"**
- File may have been processed by PNG optimizer
- Carrier type mismatch - try different carrier implementations
- File corruption during transfer

**"Invalid PNG signature"**
- File has been converted to different format
- Truncated/corrupted file
- Not actually a PNG file

**Size limitations exceeded**
- Reduce blob content or use larger carrier image
- Split data across multiple steganographic files
- Use more efficient carrier format

### Debug Information

Enable debug logging to see detailed steganography operations:

```bash
RUST_LOG=debug cargo run --bin png_stego_demo
```

This provides insights into:
- Chunk detection and parsing
- Encryption/decryption operations
- Capacity calculations
- Error details

## Security Considerations

### Threat Model
This implementation is designed for:
- **Casual Inspection**: Files appear as innocent images
- **Basic Forensics**: No obvious signs of hidden data
- **Automated Scanning**: Bypasses basic entropy analysis

**NOT designed for**:
- **Advanced Stegananalysis**: Specialized tools may detect patterns
- **Deep Forensic Analysis**: Detailed chunk analysis reveals custom data
- **Nation-State Adversaries**: Consider additional operational security

### Operational Guidelines
1. **Test in Target Environment**: Verify compatibility with your systems
2. **Monitor File Sizes**: Ensure growth patterns seem natural
3. **Use Cover Stories**: Have plausible explanations for image collections
4. **Regular Updates**: Refresh steganographic files periodically
5. **Defense in Depth**: Combine with other security measures

---

*For more information about KURPOD's encryption and security architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).* 