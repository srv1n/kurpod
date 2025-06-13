# syntax=docker/dockerfile:1.7

################ 1️⃣  Front‑end ################
FROM --platform=$BUILDPLATFORM oven/bun:1.2.15-alpine AS frontend
WORKDIR /frontend

# Copy *everything* from the frontend folder up front.
COPY frontend/ ./

# Bun handles both lockfile formats; if none exist it will create one.
RUN bun install --frozen-lockfile || bun install \
 && bun run build \
 && rm -rf node_modules \
 && bun pm cache rm || true                     # Bun <1.2 has no pm‑cache command

################ 2️⃣  Rust builder (static musl) ########
# Use native platform for compilation - no cross-compilation
FROM rust:1.86-alpine AS builder
WORKDIR /usr/src/app

# Alpine tool‑chain for a fully‑static binary
RUN apk add --no-cache musl-dev openssl-dev openssl-libs-static \
            pkgconfig build-base \
 && echo "musl + static OpenSSL ready"

# ---- workspace files *before* we run any Cargo command ----
COPY Cargo.toml Cargo.lock ./
COPY encryption_core ./encryption_core
COPY kurpod_server   ./kurpod_server
COPY --from=frontend /frontend/dist ./frontend/dist

# Pre‑fetch crates (Docker cache mount)
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    cargo fetch --locked

# Determine native target architecture
RUN ARCH=$(uname -m) && \
    case "$ARCH" in \
      x86_64) echo "x86_64-unknown-linux-musl" > /tmp/target ;; \
      aarch64) echo "aarch64-unknown-linux-musl" > /tmp/target ;; \
      *) echo "Unsupported architecture: $ARCH" && exit 1 ;; \
    esac && rustup target add "$(cat /tmp/target)"

ENV RUSTFLAGS="-C target-feature=+crt-static"
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/src/app/target \
    TARGET=$(cat /tmp/target) && \
    cargo build --release --locked --target "$TARGET" --bin kurpod_server \
 && strip -s target/$TARGET/release/kurpod_server \
 && cp       target/$TARGET/release/kurpod_server /kurpod_server

################ 3️⃣  Root‑CA bundle ############
FROM alpine:3.19 AS certs
RUN apk add --no-cache ca-certificates

################ 4️⃣  Scratch runtime ###########
FROM scratch
COPY --from=certs   /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /kurpod_server /kurpod_server
EXPOSE 3000
ENTRYPOINT ["/kurpod_server"]
CMD ["--port", "3000", "--blob", "/app/data/storage.blob"]
