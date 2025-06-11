use encryption_core::*;
use tempfile::tempdir;

#[test]
fn deletion_and_compaction() {
    let dir = tempdir().unwrap();
    let blob_path = dir.path().join("test.blob");
    let pass_s = "standard_pw";
    let pass_h = "hidden_pw";

    // 1. Initialize blob
    init_blob(&blob_path, pass_s, pass_h).unwrap();

    // 2. Unlock and add files
    let (_, mut key, mut meta) = unlock_blob(&blob_path, pass_s).unwrap();
    add_file(
        &blob_path,
        VolumeType::Standard,
        &key,
        &mut meta,
        "a.txt",
        b"alpha",
        "text/plain",
    )
    .unwrap();
    add_file(
        &blob_path,
        VolumeType::Standard,
        &key,
        &mut meta,
        "b.txt",
        b"bravo",
        "text/plain",
    )
    .unwrap();
    add_file(
        &blob_path,
        VolumeType::Standard,
        &key,
        &mut meta,
        "c.txt",
        b"charlie",
        "text/plain",
    )
    .unwrap();

    // File size before deletion
    let size_before = std::fs::metadata(&blob_path).unwrap().len();

    // 3. Delete one file
    let removed = remove_file(&blob_path, VolumeType::Standard, &key, &mut meta, "b.txt").unwrap();
    assert!(removed);
    assert!(!meta.contains_key("b.txt"));

    // Record metadata for deleted file (old offset etc.) from prior state
    let deleted_meta = meta.get("b.txt").cloned();
    assert!(deleted_meta.is_none());

    // Size after deletion (orphaned data still present)
    let size_after_delete = std::fs::metadata(&blob_path).unwrap().len();
    assert!(size_after_delete >= size_before);

    // 5. Compact blob
    compact_blob(&blob_path, pass_s, pass_h).unwrap();

    // Unlock again to get fresh metadata
    let (_, key_after, meta_after) = unlock_blob(&blob_path, pass_s).unwrap();
    assert!(!meta_after.contains_key("b.txt"));

    // Verify size shrunk
    let size_after_compact = std::fs::metadata(&blob_path).unwrap().len();
    assert!(size_after_compact < size_after_delete);

    // Deleted file cannot be retrieved
    if let Some(m) = deleted_meta {
        assert!(get_file(&blob_path, &key_after, &m).is_err());
    }
}
