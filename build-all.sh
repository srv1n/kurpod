#!/bin/bash

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Building KURPOD for all platforms...${NC}"

# Build frontend first
echo -e "${BLUE}Building frontend...${NC}"
cd frontend
bun install --frozen-lockfile
bun run build
cd ..

# Platforms to build
PLATFORMS=(
    "x86_64-unknown-linux-gnu"
    "x86_64-unknown-linux-musl"
    "x86_64-apple-darwin"
    "aarch64-apple-darwin"
    "x86_64-pc-windows-msvc"
)

# Create output directory
OUTPUT_DIR="release"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Build for each platform
for PLATFORM in "${PLATFORMS[@]}"; do
    echo -e "${YELLOW}Building for $PLATFORM...${NC}"
    
    if command -v cross &> /dev/null; then
        # Use cross for cross-compilation
        cross build --release --target "$PLATFORM" -p kurpod_server
    else
        # Try native compilation
        cargo build --release --target "$PLATFORM" -p kurpod_server || {
            echo -e "${RED}Failed to build for $PLATFORM${NC}"
            continue
        }
    fi
    
    # Copy binary to output
    BINARY_NAME="kurpod_server"
    if [[ "$PLATFORM" == *"windows"* ]]; then
        BINARY_NAME="kurpod_server.exe"
    fi
    
    PLATFORM_DIR="$OUTPUT_DIR/$PLATFORM"
    mkdir -p "$PLATFORM_DIR"
    cp "target/$PLATFORM/release/$BINARY_NAME" "$PLATFORM_DIR/"
    
    # Create archive
    cd "$PLATFORM_DIR"
    if [[ "$PLATFORM" == *"windows"* ]]; then
        zip "../kurpod-$PLATFORM.zip" "$BINARY_NAME"
    else
        tar -czf "../kurpod-$PLATFORM.tar.gz" "$BINARY_NAME"
    fi
    cd ../..
done

echo -e "${GREEN}Build complete! Check the $OUTPUT_DIR directory${NC}"