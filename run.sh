#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Default values
PORT="${PORT:-3000}"
BLOB_PATH="${BLOB_PATH:-./blobs}"
LOG_LEVEL="${LOG_LEVEL:-info}"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --port)
            PORT="$2"
            shift 2
            ;;
        --blob)
            BLOB_PATH="$2"
            shift 2
            ;;
        --blob-dir)
            BLOB_PATH="$2"
            shift 2
            ;;
        --log-level)
            LOG_LEVEL="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --port PORT         Server port (default: 3000)"
            echo "  --blob PATH         Blob file path (single file mode)"
            echo "  --blob-dir PATH     Blob directory path (directory mode, default: ./blobs)"
            echo "  --log-level LEVEL   Log level: error, warn, info, debug, trace (default: info)"
            echo "  --help              Show this help message"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

echo -e "${GREEN}Starting KURPOD development server...${NC}"

# Always rebuild frontend and backend for development
echo -e "${YELLOW}Building project...${NC}"

# Build frontend
echo -e "${BLUE}Building frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    bun install
fi

bun run build
cd ..

# Build backend in debug mode
echo -e "${BLUE}Building backend...${NC}"
cargo build -p kurpod_server

# Create blob directory if it doesn't exist
if [ ! -d "$BLOB_PATH" ]; then
    echo -e "${YELLOW}Creating blob storage directory: $BLOB_PATH${NC}"
    mkdir -p "$BLOB_PATH"
fi

# Set environment variables
export RUST_LOG="kurpod_server=$LOG_LEVEL,encryption_core=$LOG_LEVEL"
export KURPOD_PORT="$PORT"
export KURPOD_BLOB_PATH="$BLOB_PATH"

# Start the server
echo -e "${GREEN}Server configuration:${NC}"
echo -e "  Port: ${BLUE}$PORT${NC}"
echo -e "  Blob path: ${BLUE}$BLOB_PATH${NC}"
echo -e "  Log level: ${BLUE}$LOG_LEVEL${NC}"
echo ""
echo -e "${GREEN}Server starting at: ${BLUE}http://localhost:$PORT${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
echo ""

# Run the server
cargo run -p kurpod_server -- --port "$PORT" --dir "$BLOB_PATH" 