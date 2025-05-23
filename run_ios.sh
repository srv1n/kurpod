#!/bin/bash

# Build and run the server in development mode
echo "Building and running the enc_server..."

# Make sure the frontend is built
if [ ! -d "frontend/dist" ]; then
  echo "Building frontend..."
  (cd frontend && bun install && bun run build)
fi

cd enc_tauri
bun run tauri ios dev
# # Build the whole workspace
# cargo build -p enc_server

# # Run the server
# cargo run -p enc_server -- "$@" 