# syntax=docker/dockerfile:1.7

# Build frontend first
FROM --platform=$BUILDPLATFORM oven/bun:slim AS frontend-builder

WORKDIR /usr/src/app
COPY frontend/package.json frontend/bun.lock ./
RUN bun install --frozen-lockfile

COPY frontend ./
RUN bun run build \
    && rm -rf node_modules \
    && bun pm cache rm

# Build stage - using official Rust image for better compatibility
FROM --platform=$BUILDPLATFORM rust:1.78-slim-bookworm AS builder

WORKDIR /usr/src/app

# Copy workspace files first
COPY Cargo.toml Cargo.lock ./
COPY encryption_core ./encryption_core
COPY kurpod_server ./kurpod_server

# Copy the built frontend from frontend-builder stage - rust-embed will embed this
COPY --from=frontend-builder /usr/src/app/dist ./frontend/dist

# Fetch dependencies after all source is available
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    cargo fetch

# Build with cargo cache mounts
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/src/app/target \
    cargo build --release --locked --bin kurpod_server

# Runtime stage - use Debian slim for better compatibility
FROM debian:bookworm-slim AS runtime

# Install CA certificates for HTTPS
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Create app directory for data storage
RUN mkdir -p /app/data

# Copy the binary from the standard cargo build location
COPY --from=builder /usr/src/app/target/release/kurpod_server /kurpod_server

# Expose port
EXPOSE 3000

# Add build-time metadata
ARG VERSION
LABEL org.opencontainers.image.title="KURPOD Server"
LABEL org.opencontainers.image.description="Secure encrypted file storage server with plausible deniability"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.source="https://github.com/srv1n/kurpod"
LABEL org.opencontainers.image.licenses="AGPL-3.0"
LABEL org.opencontainers.image.vendor="KURPOD"

# Default command - store data in /app/data
# Volume mounting works normally: docker run -v /host/path:/app/data kurpod
ENTRYPOINT ["/kurpod_server"]
CMD ["--port", "3000", "--blob", "/app/data/storage.blob"]