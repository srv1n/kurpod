use std::process::Command;
use std::path::Path;

fn main() {
    println!("cargo:rerun-if-changed=frontend/src");
    println!("cargo:rerun-if-changed=frontend/package.json");
    
    // Check if frontend/dist exists
    let dist_path = Path::new("frontend/dist");
    let should_build = !dist_path.exists() || !dist_path.join("index.html").exists();
    
    if should_build {
        println!("cargo:warning=Building frontend...");
        // Build frontend
        let status = Command::new("npm")
            .args(["run", "build", "--prefix", "frontend"])
            .status()
            .expect("Failed to build frontend");
            
        if !status.success() {
            panic!("Failed to build frontend");
        }
        println!("cargo:warning=Frontend built successfully!");
    } else {
        println!("cargo:warning=Frontend already built, skipping...");
    }
} 