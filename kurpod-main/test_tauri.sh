#!/bin/bash
cd /Users/sarav/Downloads/play/kurpod/enc_tauri

echo "Building Tauri app..."
bun tauri build --debug

echo "Build complete. The app should be in src-tauri/target/debug/"
ls -la src-tauri/target/debug/kurpod-tauri 2>/dev/null || echo "App not found in expected location"