fn main() {
    tauri_build::build();
    
    #[cfg(target_os = "ios")]
    {
        // Tell Rust to link with required iOS frameworks
        println!("cargo:rustc-link-lib=framework=UIKit");
        println!("cargo:rustc-link-lib=framework=UniformTypeIdentifiers");
        println!("cargo:rustc-link-lib=framework=Foundation");
        
        // For now, we'll use weak linking to avoid linker errors
        // The actual implementation will be provided by main.mm at runtime
        println!("cargo:rustc-link-arg=-Wl,-undefined,dynamic_lookup");
        
        // Tell Cargo to rerun if files change
        println!("cargo:rerun-if-changed=src/IOSFilePicker.swift");
        println!("cargo:rerun-if-changed=src/ios_file_picker_simple.rs");
        println!("cargo:rerun-if-changed=gen/apple/Sources/app/main.mm");
    }
}
