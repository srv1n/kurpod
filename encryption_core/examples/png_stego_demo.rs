// Demo CLI for PNG Steganography in KURPOD
// Run with: cargo run --bin png_stego_demo

use encryption_core::{
    add_file_stego, get_file_stego, init_stego_blob, unlock_stego_blob, PngChunkCarrier,
    StegoCarrier, VolumeType,
};
use std::fs;
use std::path::Path;

fn create_sample_png(path: &Path) -> Result<(), Box<dyn std::error::Error>> {
    // Create a simple 100x100 red PNG image
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

    // Simple IDAT chunk (minimally compressed red image data)
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

    fs::write(path, png_data)?;
    Ok(())
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("🔐 KURPOD PNG Steganography Demo");
    println!("================================\n");

    // Create demo files
    let carrier_path = Path::new("demo_photo.png");
    let stego_path = Path::new("vacation_photo.png");

    // Step 1: Create a sample PNG carrier
    println!("1️⃣  Creating sample PNG carrier image...");
    create_sample_png(carrier_path)?;
    println!("   ✅ Created: {}", carrier_path.display());

    // Step 2: Initialize steganographic blob
    println!("\n2️⃣  Creating steganographic blob inside PNG...");
    let carrier = PngChunkCarrier::new();
    let pass_standard = "my_decoy_password";
    let pass_hidden = "my_secret_password";

    init_stego_blob(
        carrier_path,
        stego_path,
        &carrier,
        pass_standard,
        pass_hidden,
    )?;
    println!(
        "   ✅ Created steganographic file: {}",
        stego_path.display()
    );

    // Verify it's still a valid PNG
    let stego_data = fs::read(stego_path)?;
    if stego_data.starts_with(&[0x89, 0x50, 0x4E, 0x47]) {
        println!("   ✅ File is still a valid PNG image");
    }

    // Step 3: Unlock the steganographic blob
    println!("\n3️⃣  Unlocking steganographic blob...");
    let carriers = vec![carrier];
    let (volume_type, key, mut metadata) = unlock_stego_blob(stego_path, &carriers, pass_standard)?;

    match volume_type {
        VolumeType::Standard => println!("   ✅ Unlocked Standard/Decoy volume"),
        VolumeType::Hidden => println!("   ✅ Unlocked Hidden volume"),
    }

    // Step 4: Add some files to the steganographic blob
    println!("\n4️⃣  Adding files to steganographic storage...");

    let secret_document = b"CONFIDENTIAL: The real meeting is at midnight in the old warehouse.";
    add_file_stego(
        stego_path,
        carrier_path,
        &carriers[0],
        volume_type,
        &key,
        &mut metadata,
        "secret_document.txt",
        secret_document,
        "text/plain",
    )?;
    println!("   ✅ Added: secret_document.txt");

    let fake_shopping_list = b"Shopping List:\n- Milk\n- Bread\n- Eggs\n- Butter";
    add_file_stego(
        stego_path,
        carrier_path,
        &carriers[0],
        volume_type,
        &key,
        &mut metadata,
        "shopping_list.txt",
        fake_shopping_list,
        "text/plain",
    )?;
    println!("   ✅ Added: shopping_list.txt");

    // Step 5: Read files back
    println!("\n5️⃣  Reading files from steganographic storage...");

    if let Some(file_meta) = metadata.get("secret_document.txt") {
        let content = get_file_stego(stego_path, &carriers[0], &key, file_meta)?;
        println!(
            "   📄 secret_document.txt: \"{}\"",
            String::from_utf8_lossy(&content)
        );
    }

    if let Some(file_meta) = metadata.get("shopping_list.txt") {
        let content = get_file_stego(stego_path, &carriers[0], &key, file_meta)?;
        println!(
            "   📄 shopping_list.txt: \"{}\"",
            String::from_utf8_lossy(&content)
        );
    }

    // Step 6: Show file stats
    println!("\n6️⃣  Storage statistics:");
    let original_size = fs::metadata(carrier_path)?.len();
    let stego_size = fs::metadata(stego_path)?.len();
    let overhead = stego_size - original_size;

    println!("   📊 Original PNG size: {} bytes", original_size);
    println!("   📊 Steganographic PNG size: {} bytes", stego_size);
    println!("   📊 Storage overhead: {} bytes", overhead);
    println!("   📊 Files stored: {}", metadata.len());

    // Step 7: Test hidden volume
    println!("\n7️⃣  Testing hidden volume access...");
    let (hidden_vol_type, _hidden_key, hidden_metadata) =
        unlock_stego_blob(stego_path, &carriers, pass_hidden)?;

    match hidden_vol_type {
        VolumeType::Hidden => {
            println!("   ✅ Successfully accessed hidden volume");
            println!("   📊 Hidden volume files: {}", hidden_metadata.len());
        }
        VolumeType::Standard => {
            println!("   ⚠️  Got standard volume instead of hidden");
        }
    }

    println!("\n🎉 Demo completed successfully!");
    println!("\n💡 Key takeaways:");
    println!(
        "   • The PNG file '{}' looks like a normal image",
        stego_path.display()
    );
    println!("   • It can be opened by any image viewer/editor");
    println!("   • But it secretly contains encrypted files");
    println!("   • Two different passwords access different volumes");
    println!("   • Perfect for plausible deniability!");

    println!("\n🧹 Cleaning up demo files...");
    fs::remove_file(carrier_path).ok();
    fs::remove_file(stego_path).ok();
    println!("   ✅ Demo files removed");

    Ok(())
}
