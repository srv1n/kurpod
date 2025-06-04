#!/bin/bash

# Exit on error
set -e

echo "Building Encryption Core Tauri iOS App..."

# Navigate to Tauri directory
cd enc_tauri

# Install dependencies
echo "Installing bun dependencies..."
bun install

# Check if building for device or simulator
if [ "$1" = "--device" ]; then
    echo "Building Tauri iOS application for device..."
    echo "Note: This requires a valid Apple Developer account and code signing setup"
    bun run tauri ios build --target aarch64
else
    echo "Building Tauri iOS application for simulator..."
    bun run tauri ios build --target aarch64-sim
fi

echo "iOS build completed successfully!"
echo "The app can be found in enc_tauri/src-tauri/gen/apple/build/" 