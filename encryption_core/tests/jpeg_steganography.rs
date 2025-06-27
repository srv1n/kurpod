use encryption_core::*;
use std::fs;
use tempfile::tempdir;

#[test]
fn test_jpeg_steganography_basic() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("carrier.jpg");
    let stego_path = dir.path().join("stego.jpg");

    // Create a minimal JPEG
    let minimal_jpeg = create_minimal_jpeg();
    fs::write(&carrier_path, minimal_jpeg).unwrap();

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    let carrier = steganography::jpeg_comment::JpegCommentCarrier::new();
    init_stego_blob(&carrier_path, &stego_path, &carrier, pass_s, pass_h).unwrap();

    // Verify stego file exists and starts with JPEG signature
    assert!(stego_path.exists());
    let stego_data = fs::read(&stego_path).unwrap();
    assert!(stego_data.starts_with(&[0xFF, 0xD8])); // JPEG SOI

    // Unlock stego blob
    let carriers = vec![carrier];
    let (volume_type, key, mut metadata) =
        unlock_stego_blob(&stego_path, &carriers, pass_s).unwrap();
    assert_eq!(volume_type, VolumeType::Standard);
    assert!(metadata.is_empty());

    // Add file
    let test_content = b"Hello world via JPEG stego!";
    add_file_stego(
        &stego_path,
        &carrier_path,
        &carriers[0],
        volume_type,
        &key,
        &mut metadata,
        "hello.txt",
        test_content,
        "text/plain",
    )
    .unwrap();

    // Retrieve file
    let file_meta = metadata.get("hello.txt").unwrap();
    let retrieved = get_file_stego(&stego_path, &carriers[0], &key, file_meta).unwrap();
    assert_eq!(retrieved, test_content);

    // Verify the stego file is still a valid JPEG
    let updated_stego_data = fs::read(&stego_path).unwrap();
    assert!(updated_stego_data.starts_with(&[0xFF, 0xD8])); // JPEG SOI
    assert!(updated_stego_data.ends_with(&[0xFF, 0xD9])); // JPEG EOI
}

#[test]
fn test_jpeg_steganography_hidden_volume() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("carrier.jpg");
    let stego_path = dir.path().join("stego.jpg");

    let minimal_jpeg = create_minimal_jpeg();
    fs::write(&carrier_path, minimal_jpeg).unwrap();

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    let carrier = steganography::jpeg_comment::JpegCommentCarrier::new();
    init_stego_blob(&carrier_path, &stego_path, &carrier, pass_s, pass_h).unwrap();

    let carriers = vec![carrier];

    // Test both volumes can be unlocked
    let (vol_type_s, _key_s, _meta_s) = unlock_stego_blob(&stego_path, &carriers, pass_s).unwrap();
    assert_eq!(vol_type_s, VolumeType::Standard);

    let (vol_type_h, _key_h, _meta_h) = unlock_stego_blob(&stego_path, &carriers, pass_h).unwrap();
    assert_eq!(vol_type_h, VolumeType::Hidden);
}

fn create_minimal_jpeg() -> Vec<u8> {
    // Minimal JPEG structure with SOI, APP0, and EOI
    let mut jpeg = Vec::new();

    // SOI (Start of Image)
    jpeg.extend_from_slice(&[0xFF, 0xD8]);

    // APP0 segment (JFIF header)
    jpeg.extend_from_slice(&[0xFF, 0xE0]); // APP0 marker
    jpeg.extend_from_slice(&[0x00, 0x10]); // Length: 16 bytes
    jpeg.extend_from_slice(b"JFIF\0"); // JFIF identifier
    jpeg.extend_from_slice(&[0x01, 0x01]); // Version 1.1
    jpeg.extend_from_slice(&[0x00]); // Density units
    jpeg.extend_from_slice(&[0x00, 0x01, 0x00, 0x01]); // X and Y density
    jpeg.extend_from_slice(&[0x00, 0x00]); // Thumbnail dimensions

    // EOI (End of Image)
    jpeg.extend_from_slice(&[0xFF, 0xD9]);

    jpeg
}
