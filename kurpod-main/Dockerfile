# Build frontend first
FROM --platform=$BUILDPLATFORM oven/bun:slim AS frontend-builder

WORKDIR /usr/src/app
COPY frontend/package*.json ./
RUN bun install

COPY frontend ./
RUN bun run build \
    && rm -rf node_modules \
    && bun pm cache rm

# Build stage - using slim image to reduce space
FROM --platform=$BUILDPLATFORM rust:1.86-slim AS builder

# Install build dependencies for both x86_64 and ARM64
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy workspace files
COPY Cargo.toml Cargo.lock ./
COPY encryption_core ./encryption_core
COPY kurpod_server ./kurpod_server

# Copy the built frontend from frontend-builder stage - rust-embed will embed this
COPY --from=frontend-builder /usr/src/app/dist ./frontend/dist

# Set target architecture based on platform
ARG TARGETPLATFORM
RUN case "$TARGETPLATFORM" in \
        "linux/amd64") echo "x86_64-unknown-linux-gnu" > /target.txt ;; \
        "linux/arm64") echo "aarch64-unknown-linux-gnu" > /target.txt ;; \
        *) echo "Unsupported platform: $TARGETPLATFORM" && exit 1 ;; \
    esac

# Build the application with embedded frontend for target architecture
RUN export CARGO_TARGET=$(cat /target.txt) && \
    if [ "$CARGO_TARGET" != "x86_64-unknown-linux-gnu" ]; then \
        rustup target add $CARGO_TARGET; \
    fi && \
    cargo build --release --target $CARGO_TARGET --bin kurpod_server && \
    cp target/$CARGO_TARGET/release/kurpod_server /kurpod_server && \
    strip /kurpod_server

# Runtime stage - use distroless for minimal but functional image
FROM gcr.io/distroless/cc-debian12

# Set work directory
WORKDIR /app

# Copy the binary with correct ownership
COPY --from=builder --chown=65532:65532 /kurpod_server /app/kurpod_server

# Switch to non-root user
USER 65532:65532

# Expose port
EXPOSE 3000

# Volume for persistent data
VOLUME ["/app/data"]

# Add build-time metadata
ARG VERSION
LABEL org.opencontainers.image.title="KURPOD Server"
LABEL org.opencontainers.image.description="Secure encrypted file storage server with plausible deniability"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.source="https://github.com/srv1n/kurpod"
LABEL org.opencontainers.image.licenses="AGPL-3.0"
LABEL org.opencontainers.image.vendor="KURPOD"

# Default command - store data in /app/data volume
ENTRYPOINT ["/app/kurpod_server"]
CMD ["--port", "3000", "--blob", "/app/data/storage.blob"]