#!/bin/bash

# Build script for the Encrypted-Blob Server

# Build the frontend
echo "Building the frontend..."
cd frontend
bun install
bun run build
cd ..

# Build the server in release mode
echo "Building the server in release mode..."
cargo build --release -p enc_server

echo "Build complete! Release binary is at: target/release/enc_server"
echo "Run it with: ./target/release/enc_server" 