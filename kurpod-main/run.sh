#!/bin/bash

# Build and run the server in development mode
echo "Building and running the kurpod_server..."

# Make sure the frontend is built
if [ ! -d "frontend/dist" ]; then
  echo "Building frontend..."
  (cd frontend && bun install && bun run build)
fi

# Build the whole workspace
cargo build -p kurpod_server

# Run the server
RUST_LOG=encryption_core=info,kurpod_server=info cargo run -p kurpod_server -- "$@" 