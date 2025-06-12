# Build System Updates

## Overview
This document details the build system improvements including frontend integration, development workflow enhancements, and production optimizations.

## Updated Build Script (`build.sh`)

```bash
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
cp LICENSE "$DIST_DIR/"

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
```

## Development Server Script (`run.sh`)

```bash
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
        --log-level)
            LOG_LEVEL="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --port PORT         Server port (default: 3000)"
            echo "  --blob PATH         Blob storage path (default: ./blobs)"
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

# Check if we need to build
if [ ! -f "target/debug/kurpod_server" ] || [ ! -d "frontend/dist" ]; then
    echo -e "${YELLOW}Building project first...${NC}"
    
    # Build frontend
    echo -e "${BLUE}Building frontend...${NC}"
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        bun install
    fi
    
    bun run build
    cd ..
    
    # Build backend in debug mode
    echo -e "${BLUE}Building backend...${NC}"
    cargo build -p kurpod_server
fi

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
cargo run -p kurpod_server -- --port "$PORT" --blob "$BLOB_PATH"
```

## Frontend Development Script (`frontend/dev.sh`)

```bash
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
```

## Updated Frontend Package Scripts (`frontend/package.json`)

```json
{
  "name": "kurpod-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "analyze": "vite-bundle-visualizer"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@headlessui/react": "^1.7.13",
    "@heroicons/react": "^2.0.16",
    "react-dropzone": "^14.2.3",
    "clsx": "^1.2.1",
    "date-fns": "^2.29.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vite-bundle-visualizer": "^0.10.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0"
  }
}
```

## Vite Configuration (`frontend/vite.config.js`)

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

## ESLint Configuration (`frontend/eslint.config.js`)

```javascript
export default {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

## Production Build Optimization

### Cargo.toml Optimizations

```toml
[profile.release]
opt-level = 3
lto = true
codegen-units = 1
strip = true
panic = "abort"

[profile.release.package.kurpod_server]
opt-level = "z"  # Optimize for size

# Development profile with optimizations
[profile.dev]
opt-level = 1
debug = true

[profile.dev.package."*"]
opt-level = 3  # Optimize dependencies even in dev
```

### Cross-Platform Build Script (`build-all.sh`)

```bash
#!/bin/bash

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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
```

## Docker Build Integration

### Multi-Stage Dockerfile

```dockerfile
# Build stage
FROM rust:1.75-alpine AS builder

# Install build dependencies
RUN apk add --no-cache musl-dev pkgconfig openssl-dev

# Install bun
RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

# Copy workspace files
COPY Cargo.toml Cargo.lock ./
COPY encryption_core/Cargo.toml ./encryption_core/
COPY kurpod_server/Cargo.toml ./kurpod_server/

# Create dummy files for caching
RUN mkdir -p encryption_core/src kurpod_server/src
RUN echo "fn main() {}" > kurpod_server/src/main.rs
RUN touch encryption_core/src/lib.rs

# Build dependencies
RUN cargo build --release -p kurpod_server
RUN rm -rf encryption_core/src kurpod_server/src

# Copy frontend
COPY frontend/package.json frontend/bun.lockb ./frontend/
WORKDIR /app/frontend
RUN bun install --frozen-lockfile

# Copy frontend source and build
COPY frontend/ ./
RUN bun run build

WORKDIR /app

# Copy actual source code
COPY encryption_core/src ./encryption_core/src
COPY kurpod_server/src ./kurpod_server/src
COPY build.rs ./

# Build the actual binary
RUN touch kurpod_server/src/main.rs
RUN cargo build --release -p kurpod_server

# Runtime stage
FROM scratch

# Copy the binary
COPY --from=builder /app/target/release/kurpod_server /kurpod_server

# Copy SSL certificates for HTTPS requests
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

EXPOSE 3000

ENTRYPOINT ["/kurpod_server"]
```

## GitHub Actions Integration

### Build Workflow Updates

```yaml
- name: Build frontend
  run: |
    cd frontend
    bun install --frozen-lockfile
    bun run lint
    bun run format:check
    bun run build

- name: Run frontend tests
  run: |
    cd frontend
    bun test

- name: Build release
  run: |
    ./build.sh
    
- name: Upload artifacts
  uses: actions/upload-artifact@v3
  with:
    name: kurpod-dist
    path: dist/
```

## Development Workflow

### 1. Full Development Setup

```bash
# Clone repository
git clone https://github.com/srv1n/kurpod.git
cd kurpod

# Install dependencies
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
curl -fsSL https://bun.sh/install | bash

# Start development servers
./run.sh                    # Backend on :3000
cd frontend && bun dev      # Frontend on :5173
```

### 2. Hot Reload Development

Frontend changes are automatically reloaded. For backend changes:

```bash
# Install cargo-watch
cargo install cargo-watch

# Run with auto-reload
cargo watch -x 'run -p kurpod_server'
```

### 3. Production Build

```bash
# Full production build
./build.sh

# Test production build locally
./dist/run.sh
```

## Build Optimizations Applied

1. **Frontend Optimizations**
   - Tree shaking with Vite
   - Code splitting for vendor libraries
   - Minification with Terser
   - CSS purging with Tailwind
   - Asset optimization

2. **Backend Optimizations**
   - Link-time optimization (LTO)
   - Single codegen unit
   - Strip debug symbols
   - Size optimization for server binary

3. **Docker Optimizations**
   - Multi-stage builds
   - Scratch base image
   - Dependency caching
   - Minimal runtime

4. **Development Experience**
   - Fast incremental builds
   - Hot module replacement
   - Proxy configuration
   - Unified logging