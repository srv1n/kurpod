#!/bin/bash

# Build and run the iOS app in development mode
echo "Building and running the enc_tauri iOS app..."

# Make sure the frontend is built
if [ ! -d "frontend/dist" ]; then
  echo "Building frontend..."
  (cd frontend && bun install && bun run build)
fi

# Navigate to the Tauri app directory
cd enc_tauri

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing Tauri dependencies..."
  bun install
fi

# Run the iOS development build
echo "Starting iOS development server..."
cargo tauri ios dev

# # Build the whole workspace
# cargo build -p enc_server

# # Run the server
# cargo run -p enc_server -- "$@" 