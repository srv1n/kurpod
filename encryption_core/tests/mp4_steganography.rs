use encryption_core::*;
use std::fs;
use tempfile::tempdir;

#[test]
fn test_mp4_steganography_basic() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("carrier.mp4");
    let stego_path = dir.path().join("stego.mp4");

    // Create a very small dummy MP4 (just an ftyp box). This is enough for our
    // minimal validation routine which only checks the presence of the ftyp box
    // at the start of the file.
    let dummy_mp4 = create_dummy_mp4();
    fs::write(&carrier_path, dummy_mp4).unwrap();

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    let carrier = Mp4FreeBoxCarrier::new();
    init_stego_blob(&carrier_path, &stego_path, &carrier, pass_s, pass_h).unwrap();

    // Verify stego file exists and still begins with an ftyp box.
    assert!(stego_path.exists());
    let stego_data = fs::read(&stego_path).unwrap();
    assert_eq!(&stego_data[4..8], b"ftyp");

    // Unlock the stego blob and make sure we can add / retrieve a file.
    let carriers = vec![carrier];
    let (volume_type, key, mut metadata) =
        unlock_stego_blob(&stego_path, &carriers, pass_s).unwrap();
    assert_eq!(volume_type, VolumeType::Standard);

    let test_content = b"Hello from MP4 steganography!";
    add_file_stego(
        &stego_path,
        &carrier_path,
        &carriers[0],
        volume_type,
        &key,
        &mut metadata,
        "greeting.txt",
        test_content,
        "text/plain",
    )
    .unwrap();

    let file_metadata = metadata.get("greeting.txt").unwrap();
    let extracted = get_file_stego(&stego_path, &carriers[0], &key, file_metadata).unwrap();
    assert_eq!(extracted, test_content);
}

fn create_dummy_mp4() -> Vec<u8> {
    // Construct an 24-byte ftyp box with minimal content.
    let mut buf = Vec::new();
    buf.extend_from_slice(&24u32.to_be_bytes()); // size
    buf.extend_from_slice(b"ftyp"); // type
    buf.extend_from_slice(b"isom"); // major brand
    buf.extend_from_slice(&0u32.to_be_bytes()); // minor version
    buf.extend_from_slice(b"isom"); // compatible brand (one entry)
    buf.extend_from_slice(&0u32.to_be_bytes()); // padding to reach 24 bytes
    buf
}
