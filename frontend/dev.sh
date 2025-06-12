#!/bin/bash

# This script runs the frontend development server with hot reload

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}Starting frontend development server...${NC}"

# Check if backend is running
if ! curl -s http://localhost:3000/api/status > /dev/null; then
    echo -e "${YELLOW}Warning: Backend server is not running on port 3000${NC}"
    echo -e "${YELLOW}Start the backend with: ./run.sh${NC}"
    echo ""
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies...${NC}"
    bun install
fi

# Start development server
echo -e "${GREEN}Starting Vite development server...${NC}"
echo -e "${BLUE}Frontend URL: http://localhost:5173${NC}"
echo -e "${BLUE}Backend proxy: http://localhost:3000${NC}"
echo ""

bun run dev