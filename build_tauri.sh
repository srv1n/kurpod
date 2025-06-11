#!/bin/bash

# Exit on error
set -e

echo "Building Encryption Core Tauri Desktop App..."

# Navigate to Tauri directory
cd enc_tauri

# Install dependencies
echo "Installing bun dependencies..."
bun install

# Build the desktop app
echo "Building Tauri application..."
bun run tauri build

echo "Build completed successfully!"
echo "The app binary can be found in enc_tauri/src-tauri/target/release" 