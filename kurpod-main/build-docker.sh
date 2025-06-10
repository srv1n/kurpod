#!/bin/bash

set -e

# Enable Docker BuildKit for better performance
export DOCKER_BUILDKIT=1
export BUILDKIT_PROGRESS=plain

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Kurpod Docker image...${NC}"

# Check available disk space (macOS compatible)
if command -v df >/dev/null 2>&1; then
    # Try macOS/BSD format first, then Linux format
    AVAILABLE_SPACE=$(df -h . | awk 'NR==2 {print $4}' | sed 's/G.*//' | sed 's/[^0-9].*//')
    if [ -z "$AVAILABLE_SPACE" ]; then
        AVAILABLE_SPACE=$(df -BG . 2>/dev/null | awk 'NR==2 {print $4}' | sed 's/G//' || echo "unknown")
    fi
    echo -e "${YELLOW}Available disk space: ${AVAILABLE_SPACE}GB${NC}"
else
    AVAILABLE_SPACE="unknown"
    echo -e "${YELLOW}Could not determine disk space${NC}"
fi

if [ "$AVAILABLE_SPACE" != "unknown" ] && [ "$AVAILABLE_SPACE" -lt 5 ] 2>/dev/null; then
    echo -e "${RED}Warning: Less than 5GB available. Consider cleaning up Docker first:${NC}"
    echo "docker system prune -a --volumes"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build with optimizations
docker build \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    --progress=plain \
    --tag kurpod:latest \
    --tag kurpod:$(date +%Y%m%d-%H%M%S) \
    .

echo -e "${GREEN}Build completed successfully!${NC}"
echo -e "${YELLOW}To run the container:${NC}"
echo "docker run -p 3000:3000 -v \$(pwd)/blobs:/blobs kurpod:latest" 