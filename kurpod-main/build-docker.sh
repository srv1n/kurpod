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

echo -e "${GREEN}Building Kurpod Docker image with scratch optimization...${NC}"

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

if [ "$AVAILABLE_SPACE" != "unknown" ] && [ "$AVAILABLE_SPACE" -lt 3 ] 2>/dev/null; then
    echo -e "${RED}Warning: Less than 3GB available. Consider cleaning up Docker first:${NC}"
    echo "docker system prune -a --volumes"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get version for tagging
VERSION=${VERSION:-$(date +%Y%m%d-%H%M%S)}

echo -e "${YELLOW}Building optimized scratch-based image...${NC}"

# Build with optimizations
docker build \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    --build-arg VERSION="$VERSION" \
    --progress=plain \
    --tag kurpod:latest \
    --tag kurpod:$VERSION \
    .

echo -e "${GREEN}Build completed successfully!${NC}"
echo -e "${GREEN}Image size optimization: Using scratch base for minimal footprint${NC}"

# Show image size
echo -e "${YELLOW}Image details:${NC}"
docker images kurpod:latest

echo -e "${YELLOW}To run the container:${NC}"
echo -e "${GREEN}Basic usage:${NC}"
echo "docker run -p 3000:3000 kurpod:latest"
echo ""
echo -e "${GREEN}With persistent storage:${NC}"
echo "docker run -p 3000:3000 -v \$(pwd)/data:/app/data kurpod:latest"
echo ""
echo -e "${GREEN}Custom port:${NC}"
echo "docker run -p 8080:8080 -v \$(pwd)/data:/app/data kurpod:latest --port 8080" 