use encryption_core::*;
use std::fs;
use tempfile::tempdir;

#[test]
fn test_png_steganography_basic() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("carrier.png");
    let stego_path = dir.path().join("stego.png");

    // Create a test PNG carrier
    let test_png = create_test_png();
    fs::write(&carrier_path, test_png).unwrap();

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    // Initialize steganographic blob
    let carrier = PngChunkCarrier::new();
    init_stego_blob(&carrier_path, &stego_path, &carrier, pass_s, pass_h).unwrap();

    // Verify the stego file exists and is a valid PNG
    assert!(stego_path.exists());
    let stego_data = fs::read(&stego_path).unwrap();
    assert!(stego_data.starts_with(&[0x89, 0x50, 0x4E, 0x47])); // PNG signature

    // Unlock the steganographic blob
    let carriers = vec![carrier];
    let (volume_type, key, mut metadata) =
        unlock_stego_blob(&stego_path, &carriers, pass_s).unwrap();
    assert_eq!(volume_type, VolumeType::Standard);
    assert!(metadata.is_empty()); // Should be empty initially

    // Add a file to the steganographic blob
    let test_content = b"Hello from steganographic world!";
    add_file_stego(
        &stego_path,
        &carrier_path, // Pass the original carrier path
        &carriers[0],
        volume_type,
        &key,
        &mut metadata,
        "test.txt",
        test_content,
        "text/plain",
    )
    .unwrap();

    // Verify we can retrieve the file
    let file_metadata = metadata.get("test.txt").unwrap();
    let retrieved_content = get_file_stego(&stego_path, &carriers[0], &key, file_metadata).unwrap();
    assert_eq!(retrieved_content, test_content);

    // Verify the stego file is still a valid PNG after modification
    let updated_stego_data = fs::read(&stego_path).unwrap();
    assert!(updated_stego_data.starts_with(&[0x89, 0x50, 0x4E, 0x47])); // PNG signature
}

#[test]
fn test_png_steganography_hidden_volume() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("carrier.png");
    let stego_path = dir.path().join("stego.png");

    let test_png = create_test_png();
    fs::write(&carrier_path, test_png).unwrap();

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    let carrier = PngChunkCarrier::new();
    init_stego_blob(&carrier_path, &stego_path, &carrier, pass_s, pass_h).unwrap();

    let carriers = vec![carrier];

    // Test both volumes can be unlocked
    let (vol_type_s, _key_s, _meta_s) = unlock_stego_blob(&stego_path, &carriers, pass_s).unwrap();
    assert_eq!(vol_type_s, VolumeType::Standard);

    let (vol_type_h, _key_h, _meta_h) = unlock_stego_blob(&stego_path, &carriers, pass_h).unwrap();
    assert_eq!(vol_type_h, VolumeType::Hidden);
}

#[test]
fn test_png_steganography_capacity_limit() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("small_carrier.png");

    // Create a minimal PNG
    let minimal_png = create_minimal_png();
    fs::write(&carrier_path, minimal_png).unwrap();

    let carrier = PngChunkCarrier::new();
    let capacity = carrier.capacity(&fs::read(&carrier_path).unwrap());

    // Should have substantial capacity (100MB for PNG)
    assert!(capacity > 1024 * 1024); // At least 1MB
}

#[test]
fn test_png_steganography_backwards_compatibility() {
    let dir = tempdir().unwrap();
    let normal_blob_path = dir.path().join("normal.blob");

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    // Create a normal blob
    init_blob(&normal_blob_path, pass_s, pass_h).unwrap();

    // Should be able to unlock it with stego functions (backwards compatibility)
    let carriers = vec![PngChunkCarrier::new()];
    let result = unlock_stego_blob(&normal_blob_path, &carriers, pass_s);

    // Should succeed via fallback to normal blob unlock
    assert!(result.is_ok());
}

fn create_test_png() -> Vec<u8> {
    // Create a more realistic test PNG (100x100 pixels, RGB)
    let mut png_data = vec![0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]; // PNG signature

    // IHDR chunk (100x100 RGB)
    let ihdr_data = [
        0x00, 0x00, 0x00, 0x64, // width: 100
        0x00, 0x00, 0x00, 0x64, // height: 100
        0x08, // bit depth: 8
        0x02, // color type: RGB
        0x00, // compression: deflate
        0x00, // filter: none
        0x00, // interlace: none
    ];

    png_data.extend_from_slice(&(ihdr_data.len() as u32).to_be_bytes());
    png_data.extend_from_slice(b"IHDR");
    png_data.extend_from_slice(&ihdr_data);
    png_data.extend_from_slice(&0x7d4cc5f7u32.to_be_bytes()); // CRC for 100x100 RGB

    // IDAT chunk with some compressed pixel data (simplified)
    // This is a minimal deflate stream for a 100x100 RGB image (all pixels black)
    let idat_data = [
        0x78, 0x9c, 0xed, 0xc1, 0x01, 0x01, 0x00, 0x00, 0x00, 0x80, 0x90, 0xfe, 0x37, 0x1e, 0x00,
        0x03, 0x00, 0x01,
    ];

    png_data.extend_from_slice(&(idat_data.len() as u32).to_be_bytes());
    png_data.extend_from_slice(b"IDAT");
    png_data.extend_from_slice(&idat_data);
    png_data.extend_from_slice(&0x8ed80f4cu32.to_be_bytes()); // CRC

    // IEND chunk
    png_data.extend_from_slice(&0u32.to_be_bytes());
    png_data.extend_from_slice(b"IEND");
    png_data.extend_from_slice(&0xae426082u32.to_be_bytes()); // CRC

    png_data
}

fn create_minimal_png() -> Vec<u8> {
    // PNG signature
    let mut png_data = vec![0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

    // IHDR chunk (1x1 grayscale)
    let ihdr_data = [
        0x00, 0x00, 0x00, 0x01, // width: 1
        0x00, 0x00, 0x00, 0x01, // height: 1
        0x08, // bit depth: 8
        0x00, // color type: grayscale
        0x00, // compression: deflate
        0x00, // filter: none
        0x00, // interlace: none
    ];

    png_data.extend_from_slice(&(ihdr_data.len() as u32).to_be_bytes());
    png_data.extend_from_slice(b"IHDR");
    png_data.extend_from_slice(&ihdr_data);
    png_data.extend_from_slice(&0x376ef9dbu32.to_be_bytes()); // CRC

    // IDAT chunk (compressed pixel data)
    let idat_data = [0x78, 0x9c, 0x62, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01];
    png_data.extend_from_slice(&(idat_data.len() as u32).to_be_bytes());
    png_data.extend_from_slice(b"IDAT");
    png_data.extend_from_slice(&idat_data);
    png_data.extend_from_slice(&0x25be6486u32.to_be_bytes()); // CRC

    // IEND chunk
    png_data.extend_from_slice(&0u32.to_be_bytes());
    png_data.extend_from_slice(b"IEND");
    png_data.extend_from_slice(&0xae426082u32.to_be_bytes()); // CRC

    png_data
}
