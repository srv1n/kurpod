#!/usr/bin/with-contenv bashio

# Get configuration from Home Assistant
PORT=$(bashio::config 'port')
BLOB_FILE=$(bashio::config 'blob_file')

# Create directory for blob file if it doesn't exist
mkdir -p "$(dirname "$BLOB_FILE")"

# Log configuration
bashio::log.info "Starting Kurpod server on port ${PORT}"
bashio::log.info "Using blob file: ${BLOB_FILE}"

# Start Kurpod server
exec /kurpod_server --port "$PORT" --blob "$BLOB_FILE"