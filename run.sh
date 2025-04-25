#!/bin/bash

echo "Starting encrypted file server..."
echo "This will build the frontend if needed and run the server."

# Run the server
cargo run "$@" 