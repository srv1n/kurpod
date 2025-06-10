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
cargo build --release -p kurpod_server

echo "Build complete! Release binary is at: target/release/kurpod_server"
echo "Run it with: ./target/release/kurpod_server" 