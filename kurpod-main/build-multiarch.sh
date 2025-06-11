#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Image name and tag
IMAGE_NAME="kurpod"
TAG="${TAG:-latest}"

echo -e "${GREEN}Building multi-architecture Docker images for $IMAGE_NAME:$TAG (scratch-optimized)${NC}"

# Check if Docker Buildx is available
if ! docker buildx version > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker Buildx is required for multi-architecture builds${NC}"
    echo "Please install Docker Desktop or enable buildx"
    exit 1
fi

# Create and use a new builder instance if it doesn't exist
BUILDER_NAME="multiarch-builder"
if ! docker buildx ls | grep -q "$BUILDER_NAME"; then
    echo -e "${YELLOW}Creating new buildx builder: $BUILDER_NAME${NC}"
    docker buildx create --name "$BUILDER_NAME" --driver docker-container --bootstrap
fi

echo -e "${YELLOW}Using buildx builder: $BUILDER_NAME${NC}"
docker buildx use "$BUILDER_NAME"

# Check available disk space
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

if [ "$AVAILABLE_SPACE" != "unknown" ] && [ "$AVAILABLE_SPACE" -lt 8 ] 2>/dev/null; then
    echo -e "${RED}Warning: Less than 8GB available. Multi-arch builds need more space.${NC}"
    echo "Consider cleaning up Docker first: docker system prune -a"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get version for build args
VERSION=${VERSION:-$(date +%Y%m%d-%H%M%S)}

# Build and push for multiple architectures
echo -e "${BLUE}Building for linux/amd64 and linux/arm64 with scratch optimization...${NC}"

# Build for local use (load)
if [ "$1" = "--load" ]; then
    echo -e "${YELLOW}Building for current platform only (--load)...${NC}"
    docker buildx build \
        --platform linux/amd64 \
        --build-arg VERSION="$VERSION" \
        --tag "$IMAGE_NAME:$TAG" \
        --tag "$IMAGE_NAME:$VERSION" \
        --load \
        .
else
    # Build for multiple platforms (requires push to registry)
    echo -e "${YELLOW}Building for multiple platforms...${NC}"
    echo -e "${RED}Note: Multi-arch build requires pushing to a registry${NC}"
    echo -e "${BLUE}Use --load flag to build for current platform only${NC}"
    
    read -p "Do you want to push to Docker Hub? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker buildx build \
            --platform linux/amd64,linux/arm64 \
            --build-arg VERSION="$VERSION" \
            --tag "$IMAGE_NAME:$TAG" \
            --tag "$IMAGE_NAME:$VERSION" \
            --push \
            .
    else
        echo -e "${YELLOW}Building multi-arch image locally (won't be available in docker images)...${NC}"
        docker buildx build \
            --platform linux/amd64,linux/arm64 \
            --build-arg VERSION="$VERSION" \
            --tag "$IMAGE_NAME:$TAG" \
            --tag "$IMAGE_NAME:$VERSION" \
            .
    fi
fi

echo -e "${GREEN}Multi-architecture build completed!${NC}"

# Show final image info
if [ "$1" = "--load" ]; then
    echo -e "${BLUE}Image details:${NC}"
    docker images "$IMAGE_NAME:$TAG"
    echo -e "${GREEN}Scratch-based image size optimization achieved!${NC}"
    echo ""
    echo -e "${GREEN}To run the container:${NC}"
    echo -e "${YELLOW}Basic usage:${NC}"
    echo "docker run -p 3000:3000 $IMAGE_NAME:$TAG"
    echo ""
    echo -e "${YELLOW}With persistent storage:${NC}"
    echo "docker run -p 3000:3000 -v \$(pwd)/data:/app/data $IMAGE_NAME:$TAG"
    echo ""
    echo -e "${YELLOW}Custom port:${NC}"
    echo "docker run -p 8080:8080 -v \$(pwd)/data:/app/data $IMAGE_NAME:$TAG --port 8080"
    echo ""
    echo -e "${GREEN}Or use docker-compose:${NC}"
    echo "docker-compose up -d"
else
    echo -e "${YELLOW}Multi-arch images built and pushed to registry${NC}"
    echo -e "${GREEN}To pull and run on any platform:${NC}"
    echo -e "${YELLOW}Basic:${NC} docker run -p 3000:3000 $IMAGE_NAME:$TAG"
    echo -e "${YELLOW}Persistent:${NC} docker run -p 3000:3000 -v \$(pwd)/data:/app/data $IMAGE_NAME:$TAG"
fi 