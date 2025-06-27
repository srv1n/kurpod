use encryption_core::*;
use std::fs;
use tempfile::tempdir;

#[test]
fn test_pdf_steganography_basic() {
    let dir = tempdir().unwrap();
    let carrier_path = dir.path().join("carrier.pdf");
    let stego_path = dir.path().join("stego.pdf");

    // Create a minimal PDF
    let minimal_pdf = create_minimal_pdf();
    fs::write(&carrier_path, minimal_pdf).unwrap();

    let pass_s = "standard_password";
    let pass_h = "hidden_password";

    let carrier = steganography::pdf_eof::PdfEofCarrier::new();
    init_stego_blob(&carrier_path, &stego_path, &carrier, pass_s, pass_h).unwrap();

    // Verify stego file exists and starts with %PDF-
    assert!(stego_path.exists());
    let stego_data = fs::read(&stego_path).unwrap();
    assert!(stego_data.starts_with(b"%PDF-"));

    // Unlock stego blob
    let carriers = vec![carrier];
    let (volume_type, key, mut metadata) =
        unlock_stego_blob(&stego_path, &carriers, pass_s).unwrap();
    assert_eq!(volume_type, VolumeType::Standard);
    assert!(metadata.is_empty());

    // Add file
    let test_content = b"Hello world via PDF stego!";
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
}

fn create_minimal_pdf() -> Vec<u8> {
    // Very small, valid-ish PDF. Not full spec but good enough for most readers/parsers.
    let mut pdf = Vec::new();
    pdf.extend_from_slice(b"%PDF-1.4\n");
    pdf.extend_from_slice(b"1 0 obj<<>>endobj\n");
    pdf.extend_from_slice(b"trailer<<>>\n");
    pdf.extend_from_slice(b"%%EOF\n");
    pdf
}
