# Build frontend first
FROM --platform=$BUILDPLATFORM oven/bun:slim AS frontend-builder

WORKDIR /usr/src/app
COPY frontend/package.json frontend/bun.lock ./
RUN bun install --frozen-lockfile

COPY frontend ./
RUN bun run build \
    && rm -rf node_modules \
    && bun pm cache rm

# Get CA certificates from Alpine
FROM alpine:3.19 AS alpine
RUN apk add -U --no-cache ca-certificates

# Build stage - using native platform for each architecture
FROM rust:1.86-alpine AS builder

# Install build dependencies for musl static linking
RUN apk add --no-cache \
    musl-dev \
    pkgconfig \
    openssl-dev \
    openssl-libs-static

# Create app directory
WORKDIR /usr/src/app

# Copy workspace files
COPY Cargo.toml Cargo.lock ./
COPY encryption_core ./encryption_core
COPY kurpod_server ./kurpod_server

# Copy the built frontend from frontend-builder stage - rust-embed will embed this
COPY --from=frontend-builder /usr/src/app/dist ./frontend/dist

# Detect native architecture and set target
RUN case "$(uname -m)" in \
        "x86_64") echo "x86_64-unknown-linux-musl" > /target.txt ;; \
        "aarch64") echo "aarch64-unknown-linux-musl" > /target.txt ;; \
        *) echo "Unsupported architecture: $(uname -m)" && exit 1 ;; \
    esac

# Add the musl target for the native architecture
RUN export NATIVE_TARGET=$(cat /target.txt) && \
    rustup target add $NATIVE_TARGET

# Check what we have so far
RUN echo "Target file contents:" && cat /target.txt && \
    echo "Native architecture: $(uname -m)" && \
    echo "Available targets:" && rustup target list --installed && \
    echo "Frontend dist contents:" && ls -la frontend/

# Configure for static linking and build natively
ENV RUSTFLAGS="-C target-feature=+crt-static"
RUN export CARGO_TARGET=$(cat /target.txt) && \
    echo "Building for target: $CARGO_TARGET" && \
    cargo build --release --target $CARGO_TARGET --bin kurpod_server && \
    ls -la target/$CARGO_TARGET/release/ && \
    cp target/$CARGO_TARGET/release/kurpod_server /kurpod_server && \
    strip /kurpod_server

# Create directory structure in builder
FROM builder AS directory-creator
RUN mkdir -p /app/data

# Runtime stage - use scratch for minimal image
FROM scratch

# Copy CA certificates for HTTPS
COPY --from=alpine /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the directory structure needed for volumes
COPY --from=directory-creator /app /app

# Copy the statically linked binary
COPY --from=builder /kurpod_server /kurpod_server

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