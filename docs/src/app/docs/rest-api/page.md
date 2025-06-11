---
title: REST API
---

Integrate Kurpod into your applications using our comprehensive REST API. Full functionality available programmatically. {% .lead %}

---

## Overview

The Kurpod REST API provides complete access to all functionality:

- **Base URL**: `http://localhost:3000/api`
- **Authentication**: Token-based (in headers)
- **Content-Type**: `application/json`
- **Responses**: JSON with consistent structure

All file data is encrypted/decrypted client-side. The API handles encrypted blobs only.

---

## Authentication

### Unlock storage

Before accessing files, unlock your storage:

```bash
POST /api/unlock
Content-Type: application/json

{
  "password": "your-secure-password"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "volume": "standard",
  "expires_in": 3600
}
```

Use the token in subsequent requests:
```bash
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Create new storage

Initialize a new encrypted storage:

```bash
POST /api/create
Content-Type: application/json

{
  "password_standard": "standard-password",
  "password_hidden": "hidden-password",  // Optional
  "enable_hidden": true                  // Optional
}
```

---

## File operations

### List files

Get directory contents:

```bash
GET /api/files?path=/folder/subfolder
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "path": "/folder/subfolder",
    "items": [
      {
        "name": "document.pdf",
        "type": "file",
        "size": 1048576,
        "modified": "2024-01-15T10:30:00Z",
        "encrypted_id": "a3f4b2c1..."
      },
      {
        "name": "photos",
        "type": "directory",
        "size": 0,
        "modified": "2024-01-14T15:20:00Z",
        "encrypted_id": "b5e6d3a2..."
      }
    ]
  }
}
```

### Upload file

Upload an encrypted file:

```bash
POST /api/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="encrypted.bin"
Content-Type: application/octet-stream

<encrypted file data>
------WebKitFormBoundary
Content-Disposition: form-data; name="metadata"

{
  "path": "/documents",
  "encrypted_name": "ZG9jdW1lbnQucGRm",
  "nonce": "base64_nonce",
  "size": 1048576
}
------WebKitFormBoundary--
```

### Download file

Retrieve an encrypted file:

```bash
GET /api/files/download/{encrypted_id}
Authorization: Bearer <token>
```

Returns raw encrypted binary data with headers:
```
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="encrypted.bin"
X-Encrypted-Name: ZG9jdW1lbnQucGRm
X-Nonce: base64_nonce
```

### Delete file

Remove a file or directory:

```bash
DELETE /api/files/{encrypted_id}
Authorization: Bearer <token>
```

### Move/Rename

Move or rename files:

```bash
PUT /api/files/{encrypted_id}/move
Authorization: Bearer <token>
Content-Type: application/json

{
  "new_path": "/new/location",
  "new_name": "renamed.pdf"
}
```

### Create directory

Create a new folder:

```bash
POST /api/files/directory
Authorization: Bearer <token>
Content-Type: application/json

{
  "path": "/parent/folder",
  "name": "new-folder"
}
```

---

## Volume management

### Switch volume

Switch between standard and hidden volumes:

```bash
POST /api/volume/switch
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "hidden-volume-password"
}
```

### Volume info

Get current volume information:

```bash
GET /api/volume/info
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "type": "standard",
    "size_used": 104857600,
    "size_total": 1073741824,
    "file_count": 42,
    "created": "2024-01-01T00:00:00Z"
  }
}
```

---

## System operations

### Server status

Check server health:

```bash
GET /api/status
```

Response:
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "uptime": 3600,
    "blob_loaded": true,
    "locked": false
  }
}
```

### Compact storage

Reclaim space by compacting the blob:

```bash
POST /api/compact
Authorization: Bearer <token>
Content-Type: application/json

{
  "password_standard": "standard-password",
  "password_hidden": "hidden-password"  // If hidden volume exists
}
```

### Lock storage

Immediately lock the storage:

```bash
POST /api/lock
Authorization: Bearer <token>
```

---

## Search

### Search files

Search for files by name:

```bash
GET /api/search?q=budget&path=/documents
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "query": "budget",
    "results": [
      {
        "name": "budget-2024.xlsx",
        "path": "/documents/finance",
        "type": "file",
        "size": 524288,
        "encrypted_id": "c7f8e9d0..."
      }
    ],
    "count": 1
  }
}
```

---

## Batch operations

### Multiple file upload

Upload multiple files at once:

```bash
POST /api/files/upload/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "files": [
    {
      "path": "/documents",
      "name": "file1.pdf",
      "data": "base64_encrypted_data",
      "nonce": "base64_nonce"
    },
    {
      "path": "/photos",
      "name": "image.jpg",
      "data": "base64_encrypted_data",
      "nonce": "base64_nonce"
    }
  ]
}
```

### Batch delete

Delete multiple items:

```bash
DELETE /api/files/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "ids": ["a3f4b2c1...", "b5e6d3a2...", "c7f8e9d0..."]
}
```

---

## Error handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid password",
    "details": {}
  }
}
```

Common error codes:
- `AUTH_FAILED`: Authentication failed
- `TOKEN_EXPIRED`: Token has expired
- `NOT_FOUND`: Resource not found
- `ALREADY_EXISTS`: Resource already exists
- `STORAGE_FULL`: Storage capacity exceeded
- `INVALID_REQUEST`: Malformed request
- `SERVER_ERROR`: Internal server error

---

## Rate limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication**: 10 attempts per minute
- **File operations**: 100 requests per minute
- **Search**: 30 requests per minute
- **System operations**: 5 requests per minute

Headers indicate rate limit status:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1673612400
```

---

## Client libraries

### JavaScript/TypeScript

```javascript
class KurpodClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  async unlock(password) {
    const response = await fetch(`${this.baseUrl}/api/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    const data = await response.json();
    if (data.success) {
      this.token = data.token;
    }
    return data;
  }

  async listFiles(path = '/') {
    const response = await fetch(
      `${this.baseUrl}/api/files?path=${encodeURIComponent(path)}`,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
    );
    return response.json();
  }

  async uploadFile(file, path, encryptedData, nonce) {
    const formData = new FormData();
    formData.append('file', new Blob([encryptedData]));
    formData.append('metadata', JSON.stringify({
      path,
      encrypted_name: btoa(file.name),
      nonce: btoa(nonce),
      size: file.size
    }));

    const response = await fetch(`${this.baseUrl}/api/files/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData
    });
    return response.json();
  }
}

// Usage
const client = new KurpodClient();
await client.unlock('my-secure-password');
const files = await client.listFiles('/documents');
```

### Python

```python
import requests
import base64
from typing import Optional, Dict, Any

class KurpodClient:
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
        self.token: Optional[str] = None
        self.session = requests.Session()
    
    def unlock(self, password: str) -> Dict[str, Any]:
        response = self.session.post(
            f"{self.base_url}/api/unlock",
            json={"password": password}
        )
        data = response.json()
        
        if data["success"]:
            self.token = data["token"]
            self.session.headers.update({
                "Authorization": f"Bearer {self.token}"
            })
        
        return data
    
    def list_files(self, path: str = "/") -> Dict[str, Any]:
        response = self.session.get(
            f"{self.base_url}/api/files",
            params={"path": path}
        )
        return response.json()
    
    def upload_file(
        self, 
        file_path: str, 
        encrypted_data: bytes,
        nonce: bytes,
        remote_path: str = "/"
    ) -> Dict[str, Any]:
        files = {
            "file": ("encrypted.bin", encrypted_data, "application/octet-stream")
        }
        metadata = {
            "path": remote_path,
            "encrypted_name": base64.b64encode(file_path.encode()).decode(),
            "nonce": base64.b64encode(nonce).decode(),
            "size": len(encrypted_data)
        }
        
        response = self.session.post(
            f"{self.base_url}/api/files/upload",
            files=files,
            data={"metadata": json.dumps(metadata)}
        )
        return response.json()

# Usage
client = KurpodClient()
client.unlock("my-secure-password")
files = client.list_files("/documents")
```

### Go

```go
package kurpod

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type Client struct {
    BaseURL string
    Token   string
    client  *http.Client
}

func NewClient(baseURL string) *Client {
    return &Client{
        BaseURL: baseURL,
        client:  &http.Client{},
    }
}

func (c *Client) Unlock(password string) error {
    payload := map[string]string{"password": password}
    data, _ := json.Marshal(payload)
    
    resp, err := c.client.Post(
        c.BaseURL+"/api/unlock",
        "application/json",
        bytes.NewBuffer(data),
    )
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    if token, ok := result["token"].(string); ok {
        c.Token = token
    }
    
    return nil
}

func (c *Client) ListFiles(path string) ([]FileInfo, error) {
    req, _ := http.NewRequest("GET", c.BaseURL+"/api/files", nil)
    req.Header.Set("Authorization", "Bearer "+c.Token)
    
    q := req.URL.Query()
    q.Add("path", path)
    req.URL.RawQuery = q.Encode()
    
    resp, err := c.client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var result struct {
        Data struct {
            Items []FileInfo `json:"items"`
        } `json:"data"`
    }
    
    json.NewDecoder(resp.Body).Decode(&result)
    return result.Data.Items, nil
}
```

---

## WebSocket API

For real-time updates, connect to the WebSocket endpoint:

```javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'your-jwt-token'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'file_uploaded':
      console.log('New file:', data.file);
      break;
    case 'file_deleted':
      console.log('File removed:', data.id);
      break;
  }
};
```

Events:
- `file_uploaded`: New file added
- `file_deleted`: File removed
- `file_moved`: File relocated
- `storage_locked`: Storage locked
- `compact_progress`: Compaction status

---

## Best practices

1. **Always encrypt client-side** before sending to API
2. **Use HTTPS in production** to protect tokens
3. **Handle token expiration** gracefully
4. **Implement exponential backoff** for retries
5. **Validate responses** before processing
6. **Clear tokens** on logout/error
7. **Use batch operations** for multiple files
8. **Monitor rate limits** to avoid throttling
9. **Cache directory listings** when possible
10. **Compress large uploads** before encryption

For more details, see our [API examples repository](https://github.com/srv1n/kurpod-api-examples).