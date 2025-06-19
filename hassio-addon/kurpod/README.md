# Kurpod Home Assistant Add-on

[![Open this add-on in Home Assistant](https://my.home-assistant.io/badges/addon.svg?style=for-the-badge)](https://my.home-assistant.io/redirect/addon/?repository_url=https://github.com/srv1n/kurpod)

Secure encrypted file storage server with plausible deniability.

## Installation

1. Add this repository to your Home Assistant: `https://github.com/srv1n/kurpod`
2. Install the "Kurpod" add-on
3. Configure port (default: 8080) and storage location
4. Start the add-on
5. Access via Ingress or port 8080

## Configuration

- `port`: Port to run the server on (default: 8080)
- `blob_file`: Path to store encrypted data (default: /share/kurpod/storage.blob)

Uses your existing Docker image - no separate builds needed!