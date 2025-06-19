#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}Building KURPOD Server...${NC}"

# Check prerequisites
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 is not installed${NC}"
        echo "Please install $1 before running this script"
        exit 1
    fi
}

echo -e "${BLUE}Checking prerequisites...${NC}"
check_command cargo
check_command bun

# Clean previous builds
echo -e "${YELLOW}Cleaning previous builds...${NC}"
rm -rf target/release
rm -rf frontend/dist

# Build frontend
echo -e "${BLUE}Building frontend...${NC}"
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    bun install --frozen-lockfile
fi

# Run frontend linting
echo -e "${YELLOW}Linting frontend code...${NC}"
bun run lint || {
    echo -e "${RED}Frontend linting failed${NC}"
    echo "Run 'cd frontend && bun run lint:fix' to auto-fix issues"
    exit 1
}

# Build frontend for production
echo -e "${YELLOW}Building frontend for production...${NC}"
bun run build || {
    echo -e "${RED}Frontend build failed${NC}"
    exit 1
}

cd ..

# Build Rust backend
echo -e "${BLUE}Building Rust backend...${NC}"

# Run clippy for linting
echo -e "${YELLOW}Running clippy...${NC}"
cargo clippy --all-features --workspace -- -D warnings || {
    echo -e "${RED}Clippy found issues${NC}"
    exit 1
}

# Run tests
echo -e "${YELLOW}Running tests...${NC}"
cargo test --workspace || {
    echo -e "${RED}Tests failed${NC}"
    exit 1
}

# Build release binary
echo -e "${YELLOW}Building release binary...${NC}"
cargo build --release -p kurpod_server || {
    echo -e "${RED}Backend build failed${NC}"
    exit 1
}

# Create distribution directory
echo -e "${BLUE}Creating distribution package...${NC}"
DIST_DIR="dist"
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Copy binary
cp target/release/kurpod_server "$DIST_DIR/"

# Copy necessary files
cp README.md "$DIST_DIR/"
cp LICENSE "$DIST_DIR/" 2>/dev/null || echo "LICENSE file not found, skipping..."

# Create run script
cat > "$DIST_DIR/run.sh" << 'EOF'
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
./kurpod_server "$@"
EOF
chmod +x "$DIST_DIR/run.sh"

# Calculate binary size
BINARY_SIZE=$(ls -lh "$DIST_DIR/kurpod_server" | awk '{print $5}')

echo -e "${GREEN}Build completed successfully!${NC}"
echo -e "${BLUE}Binary size: ${BINARY_SIZE}${NC}"
echo -e "${BLUE}Distribution package: ${DIST_DIR}/${NC}"
echo ""
echo -e "${YELLOW}To run the server:${NC}"
echo "  cd $DIST_DIR && ./run.sh"
echo ""
echo -e "${YELLOW}Or directly:${NC}"
echo "  ./target/release/kurpod_server" 