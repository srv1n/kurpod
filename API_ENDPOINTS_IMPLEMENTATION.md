# API Endpoints Implementation

## Overview
This document details all the API endpoints that were implemented, including authentication requirements, request/response formats, and security measures.

## Authentication Flow

### 1. Initialize Blob Storage
**Endpoint**: `POST /api/init`  
**Authentication**: None required  
**Description**: Creates a new encrypted blob file with optional hidden volume

```rust
#[derive(Debug, Serialize, Deserialize)]
struct InitRequest {
    password: String,
    hidden_password: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct InitResponse {
    success: bool,
    blob_size: u64,
    has_hidden_volume: bool,
}

async fn init_handler(
    State(app_state): State<Arc<AppState>>,
    Json(request): Json<InitRequest>,
) -> Result<Json<InitResponse>, StatusCode> {
    // Check if blob already exists
    if app_state.blob_manager.blob_exists().await {
        return Err(StatusCode::CONFLICT); // 409 - Already exists
    }
    
    // Create new blob with optional hidden volume
    let blob_size = app_state.blob_manager
        .create_blob(
            &request.password,
            request.hidden_password.as_deref(),
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    Ok(Json(InitResponse {
        success: true,
        blob_size,
        has_hidden_volume: request.hidden_password.is_some(),
    }))
}
```

### 2. Unlock Blob (Authenticate)
**Endpoint**: `POST /api/unlock`  
**Authentication**: None required  
**Description**: Validates password and creates authenticated session

```rust
#[derive(Debug, Serialize, Deserialize)]
struct UnlockRequest {
    password: String,
    volume_type: VolumeType,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
enum VolumeType {
    Standard,
    Hidden,
}

#[derive(Debug, Serialize, Deserialize)]
struct UnlockResponse {
    token: String,
    volume_type: VolumeType,
    expires_in: u64,
    session_id: String,
}

async fn unlock_handler(
    State(app_state): State<Arc<AppState>>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    TypedHeader(user_agent): TypedHeader<UserAgent>,
    Json(request): Json<UnlockRequest>,
) -> Result<Json<UnlockResponse>, StatusCode> {
    // Validate password based on volume type
    let encryption_key = match request.volume_type {
        VolumeType::Standard => {
            app_state.blob_manager
                .validate_standard_password(&request.password)
                .await
                .map_err(|_| StatusCode::UNAUTHORIZED)?
        }
        VolumeType::Hidden => {
            app_state.blob_manager
                .validate_hidden_password(&request.password)
                .await
                .map_err(|_| StatusCode::UNAUTHORIZED)?
        }
    };
    
    // Create session with split-key architecture
    let signed_token = app_state.auth_manager
        .create_session(
            &encryption_key,
            addr.ip(),
            user_agent.to_string(),
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    let response = UnlockResponse {
        token: serde_json::to_string(&signed_token)
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
        volume_type: request.volume_type,
        expires_in: 900, // 15 minutes
        session_id: signed_token.token.session_id.clone(),
    };
    
    Ok(Json(response))
}
```

### 3. Logout
**Endpoint**: `POST /api/logout`  
**Authentication**: Required  
**Description**: Invalidates current session

```rust
async fn logout_handler(
    State(app_state): State<Arc<AppState>>,
    auth: AuthenticatedUser,
) -> impl IntoResponse {
    app_state.auth_manager.logout(&auth.session_id).await;
    StatusCode::NO_CONTENT
}
```

### 4. Session Status
**Endpoint**: `GET /api/session`  
**Authentication**: Required  
**Description**: Returns current session information

```rust
#[derive(Debug, Serialize, Deserialize)]
struct SessionStatus {
    session_id: String,
    volume_type: VolumeType,
    expires_at: i64,
    created_at: i64,
    idle_timeout: u64,
}

async fn session_status_handler(
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<Json<SessionStatus>, StatusCode> {
    let session_info = app_state.auth_manager
        .get_session_info(&auth.session_id)
        .await
        .ok_or(StatusCode::NOT_FOUND)?;
    
    Ok(Json(SessionStatus {
        session_id: auth.session_id,
        volume_type: auth.volume_type,
        expires_at: session_info.expires_at.timestamp(),
        created_at: session_info.created_at.timestamp(),
        idle_timeout: 900,
    }))
}
```

## File Operations

### 5. List Files
**Endpoint**: `GET /api/files`  
**Authentication**: Required  
**Description**: Lists all files in the current volume

```rust
#[derive(Debug, Serialize, Deserialize)]
struct FileListResponse {
    files: Vec<FileMetadata>,
    total_size: u64,
    file_count: usize,
}

#[derive(Debug, Serialize, Deserialize)]
struct FileMetadata {
    id: String,
    name: String,
    size: u64,
    mime_type: String,
    created_at: i64,
    modified_at: i64,
    thumbnail_id: Option<String>,
    #[serde(rename = "type")]
    file_type: String, // image, video, audio, document, unknown
}

async fn list_files_handler(
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<Json<FileListResponse>, StatusCode> {
    let files = app_state.blob_manager
        .list_files(&auth.encryption_key, auth.volume_type)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    let total_size: u64 = files.iter().map(|f| f.size).sum();
    let file_count = files.len();
    
    Ok(Json(FileListResponse {
        files,
        total_size,
        file_count,
    }))
}
```

### 6. Upload File
**Endpoint**: `POST /api/files`  
**Authentication**: Required  
**Description**: Uploads and encrypts a new file

```rust
async fn upload_file_handler(
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
    mut multipart: Multipart,
) -> Result<Json<FileMetadata>, StatusCode> {
    let mut file_data = Vec::new();
    let mut file_name = String::new();
    let mut mime_type = String::from("application/octet-stream");
    
    // Process multipart form data
    while let Some(mut field) = multipart.next_field().await
        .map_err(|_| StatusCode::BAD_REQUEST)?
    {
        let name = field.name().unwrap_or("").to_string();
        
        if name == "file" {
            file_name = field.file_name()
                .unwrap_or("unnamed")
                .to_string();
            
            if let Some(content_type) = field.content_type() {
                mime_type = content_type.to_string();
            }
            
            // Read file data
            while let Some(chunk) = field.chunk().await
                .map_err(|_| StatusCode::BAD_REQUEST)?
            {
                file_data.extend_from_slice(&chunk);
            }
        }
    }
    
    if file_data.is_empty() || file_name.is_empty() {
        return Err(StatusCode::BAD_REQUEST);
    }
    
    // Generate file ID
    let file_id = Uuid::new_v4().to_string();
    
    // Detect file type from content
    let file_type = detect_file_type(&file_data, &mime_type);
    
    // Generate thumbnail if applicable
    let thumbnail_id = if file_type == "image" || file_type == "video" {
        Some(generate_thumbnail(&file_data, &file_type).await?)
    } else {
        None
    };
    
    // Encrypt and store file
    let metadata = app_state.blob_manager
        .store_file(
            &file_id,
            &file_name,
            &file_data,
            &mime_type,
            &auth.encryption_key,
            auth.volume_type,
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    Ok(Json(FileMetadata {
        id: file_id,
        name: file_name,
        size: file_data.len() as u64,
        mime_type,
        created_at: Utc::now().timestamp(),
        modified_at: Utc::now().timestamp(),
        thumbnail_id,
        file_type,
    }))
}
```

### 7. Download File
**Endpoint**: `GET /api/files/:id`  
**Authentication**: Required  
**Description**: Downloads and decrypts a file

```rust
async fn download_file_handler(
    Path(file_id): Path<String>,
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, StatusCode> {
    // Get file metadata
    let metadata = app_state.blob_manager
        .get_file_metadata(&file_id, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;
    
    // Decrypt file data
    let file_data = app_state.blob_manager
        .retrieve_file(&file_id, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    // Build response with appropriate headers
    let mut headers = HeaderMap::new();
    headers.insert(
        header::CONTENT_TYPE,
        metadata.mime_type.parse()
            .unwrap_or(HeaderValue::from_static("application/octet-stream"))
    );
    headers.insert(
        header::CONTENT_DISPOSITION,
        format!("attachment; filename=\"{}\"", metadata.name)
            .parse()
            .unwrap()
    );
    headers.insert(
        header::CONTENT_LENGTH,
        file_data.len().to_string().parse().unwrap()
    );
    
    Ok((headers, file_data))
}
```

### 8. Stream Video File
**Endpoint**: `GET /api/files/:id/stream`  
**Authentication**: Required  
**Description**: Streams video content with range support

```rust
async fn stream_file_handler(
    Path(file_id): Path<String>,
    headers: HeaderMap,
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, StatusCode> {
    // Get file metadata
    let metadata = app_state.blob_manager
        .get_file_metadata(&file_id, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;
    
    let file_size = metadata.size;
    
    // Parse Range header
    let range = headers
        .get(header::RANGE)
        .and_then(|h| h.to_str().ok())
        .and_then(|s| parse_range_header(s, file_size).ok());
    
    let (start, end) = range.unwrap_or((0, file_size - 1));
    let content_length = end - start + 1;
    
    // Get file stream
    let stream = app_state.blob_manager
        .stream_file_range(&file_id, start, content_length, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    let body = StreamBody::new(stream);
    
    // Build response headers
    let mut response_headers = HeaderMap::new();
    response_headers.insert(
        header::CONTENT_TYPE,
        metadata.mime_type.parse()
            .unwrap_or(HeaderValue::from_static("application/octet-stream"))
    );
    response_headers.insert(
        header::ACCEPT_RANGES,
        HeaderValue::from_static("bytes")
    );
    
    if range.is_some() {
        response_headers.insert(
            header::CONTENT_RANGE,
            format!("bytes {}-{}/{}", start, end, file_size)
                .parse()
                .unwrap()
        );
        response_headers.insert(
            header::CONTENT_LENGTH,
            content_length.to_string().parse().unwrap()
        );
        
        Ok((StatusCode::PARTIAL_CONTENT, response_headers, body))
    } else {
        response_headers.insert(
            header::CONTENT_LENGTH,
            file_size.to_string().parse().unwrap()
        );
        
        Ok((StatusCode::OK, response_headers, body))
    }
}
```

### 9. Delete File
**Endpoint**: `DELETE /api/files/:id`  
**Authentication**: Required  
**Description**: Marks a file for deletion

```rust
async fn delete_file_handler(
    Path(file_id): Path<String>,
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<StatusCode, StatusCode> {
    app_state.blob_manager
        .delete_file(&file_id, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;
    
    Ok(StatusCode::NO_CONTENT)
}
```

### 10. Get File Thumbnail
**Endpoint**: `GET /api/files/:id/thumbnail`  
**Authentication**: Required  
**Description**: Gets thumbnail for image/video files

```rust
async fn get_thumbnail_handler(
    Path(file_id): Path<String>,
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, StatusCode> {
    // Get thumbnail data
    let thumbnail_data = app_state.blob_manager
        .get_thumbnail(&file_id, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;
    
    let mut headers = HeaderMap::new();
    headers.insert(
        header::CONTENT_TYPE,
        HeaderValue::from_static("image/jpeg")
    );
    headers.insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("public, max-age=86400") // Cache for 1 day
    );
    
    Ok((headers, thumbnail_data))
}
```

## Storage Management

### 11. Get Storage Stats
**Endpoint**: `GET /api/storage/stats`  
**Authentication**: Required  
**Description**: Returns storage usage statistics

```rust
#[derive(Debug, Serialize, Deserialize)]
struct StorageStats {
    total_size: u64,
    used_size: u64,
    free_size: u64,
    file_count: usize,
    fragmentation_ratio: f64,
    volume_type: VolumeType,
}

async fn storage_stats_handler(
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<Json<StorageStats>, StatusCode> {
    let stats = app_state.blob_manager
        .get_storage_stats(&auth.encryption_key, auth.volume_type)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    Ok(Json(stats))
}
```

### 12. Compact Storage
**Endpoint**: `POST /api/storage/compact`  
**Authentication**: Required  
**Description**: Defragments storage to reclaim space

```rust
#[derive(Debug, Serialize, Deserialize)]
struct CompactResponse {
    space_reclaimed: u64,
    duration_ms: u64,
    files_processed: usize,
}

async fn compact_storage_handler(
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<Json<CompactResponse>, StatusCode> {
    let start = Instant::now();
    
    let result = app_state.blob_manager
        .compact_storage(&auth.encryption_key, auth.volume_type)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    Ok(Json(CompactResponse {
        space_reclaimed: result.space_reclaimed,
        duration_ms: start.elapsed().as_millis() as u64,
        files_processed: result.files_processed,
    }))
}
```

## System Status

### 13. Health Check
**Endpoint**: `GET /api/status`  
**Authentication**: None required  
**Description**: Returns server health status

```rust
#[derive(Debug, Serialize, Deserialize)]
struct HealthStatus {
    status: String,
    version: String,
    blob_exists: bool,
    uptime_seconds: u64,
    active_sessions: usize,
}

async fn status_handler(
    State(app_state): State<Arc<AppState>>,
) -> Json<HealthStatus> {
    Json(HealthStatus {
        status: "healthy".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        blob_exists: app_state.blob_manager.blob_exists().await,
        uptime_seconds: app_state.start_time.elapsed().as_secs(),
        active_sessions: app_state.auth_manager.active_session_count().await,
    })
}
```

### 14. Server Information
**Endpoint**: `GET /api/info`  
**Authentication**: Required  
**Description**: Returns detailed server information

```rust
#[derive(Debug, Serialize, Deserialize)]
struct ServerInfo {
    version: String,
    features: Vec<String>,
    limits: ServerLimits,
    crypto_info: CryptoInfo,
}

#[derive(Debug, Serialize, Deserialize)]
struct ServerLimits {
    max_file_size: u64,
    max_filename_length: usize,
    chunk_size: usize,
    session_timeout: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct CryptoInfo {
    cipher: String,
    kdf: String,
    kdf_params: KdfParams,
}

#[derive(Debug, Serialize, Deserialize)]
struct KdfParams {
    memory_kib: u32,
    iterations: u32,
    parallelism: u32,
}

async fn server_info_handler(
    _auth: AuthenticatedUser,
) -> Json<ServerInfo> {
    Json(ServerInfo {
        version: env!("CARGO_PKG_VERSION").to_string(),
        features: vec![
            "dual-volume".to_string(),
            "streaming".to_string(),
            "thumbnails".to_string(),
            "compaction".to_string(),
        ],
        limits: ServerLimits {
            max_file_size: 5 * 1024 * 1024 * 1024, // 5GB
            max_filename_length: 255,
            chunk_size: 1024 * 1024, // 1MB chunks
            session_timeout: 900, // 15 minutes
        },
        crypto_info: CryptoInfo {
            cipher: "XChaCha20-Poly1305".to_string(),
            kdf: "Argon2id".to_string(),
            kdf_params: KdfParams {
                memory_kib: 65536, // 64 MiB
                iterations: 3,
                parallelism: 1,
            },
        },
    })
}
```

## WebSocket Support

### 15. Real-time Updates
**Endpoint**: `WS /api/ws`  
**Authentication**: Required via query parameter  
**Description**: WebSocket for real-time file updates

```rust
async fn websocket_handler(
    ws: WebSocketUpgrade,
    Query(params): Query<HashMap<String, String>>,
    State(app_state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, StatusCode> {
    // Validate token from query params
    let token = params.get("token")
        .ok_or(StatusCode::UNAUTHORIZED)?;
    
    // Validate session
    let session = validate_websocket_token(&app_state, token).await?;
    
    Ok(ws.on_upgrade(move |socket| handle_websocket(socket, session, app_state)))
}

async fn handle_websocket(
    socket: WebSocket,
    session: AuthenticatedUser,
    app_state: Arc<AppState>,
) {
    let (mut sender, mut receiver) = socket.split();
    
    // Subscribe to file events
    let mut file_events = app_state.file_event_bus.subscribe();
    
    // Send events to client
    let send_task = tokio::spawn(async move {
        while let Ok(event) = file_events.recv().await {
            if event.volume_type != session.volume_type {
                continue;
            }
            
            let msg = Message::Text(serde_json::to_string(&event).unwrap());
            if sender.send(msg).await.is_err() {
                break;
            }
        }
    });
    
    // Handle incoming messages
    let recv_task = tokio::spawn(async move {
        while let Some(Ok(msg)) = receiver.next().await {
            match msg {
                Message::Text(text) => {
                    // Handle client commands
                    if text == "ping" {
                        // Respond with pong
                    }
                }
                Message::Close(_) => break,
                _ => {}
            }
        }
    });
    
    // Wait for tasks to complete
    tokio::select! {
        _ = send_task => {},
        _ = recv_task => {},
    }
}
```

## Error Responses

All endpoints return consistent error responses:

```rust
#[derive(Debug, Serialize, Deserialize)]
struct ErrorResponse {
    error: String,
    code: String,
    details: Option<String>,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status_code, error_code, message) = match self {
            ApiError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "UNAUTHORIZED",
                "Invalid or expired authentication",
            ),
            ApiError::NotFound => (
                StatusCode::NOT_FOUND,
                "NOT_FOUND",
                "Resource not found",
            ),
            ApiError::InvalidInput(msg) => (
                StatusCode::BAD_REQUEST,
                "INVALID_INPUT",
                &msg,
            ),
            ApiError::StorageFull => (
                StatusCode::INSUFFICIENT_STORAGE,
                "STORAGE_FULL",
                "Storage space exhausted",
            ),
            ApiError::Internal => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "INTERNAL_ERROR",
                "An internal error occurred",
            ),
        };
        
        let body = Json(ErrorResponse {
            error: message.to_string(),
            code: error_code.to_string(),
            details: None,
        });
        
        (status_code, body).into_response()
    }
}
```

## CORS Configuration

```rust
use tower_http::cors::{CorsLayer, Any};

let cors = CorsLayer::new()
    .allow_origin(Any)
    .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
    .allow_headers([
        header::CONTENT_TYPE,
        header::AUTHORIZATION,
        header::ACCEPT,
        header::USER_AGENT,
    ])
    .expose_headers([
        header::CONTENT_LENGTH,
        header::CONTENT_TYPE,
        header::CONTENT_RANGE,
    ])
    .max_age(Duration::from_secs(86400));

app.layer(cors)
```

## Rate Limiting

```rust
use tower::ServiceBuilder;
use tower_http::limit::RateLimitLayer;

let rate_limit = ServiceBuilder::new()
    .layer(RateLimitLayer::new(100, Duration::from_secs(60))) // 100 requests per minute
    .layer(middleware::from_fn(rate_limit_by_ip));

app.layer(rate_limit)
```

## API Documentation

OpenAPI/Swagger documentation would be available at:
- `/api/docs` - Interactive API documentation
- `/api/openapi.json` - OpenAPI specification

## Security Measures

1. **Authentication Required**: All endpoints except `/api/status`, `/api/init`, and `/api/unlock` require valid session
2. **IP Binding**: Sessions are bound to originating IP address
3. **User-Agent Validation**: Additional session validation layer
4. **Rate Limiting**: Prevents brute force and DoS attacks
5. **CORS**: Properly configured for web browser security
6. **Input Validation**: All inputs are validated and sanitized
7. **Error Handling**: Consistent error responses without leaking sensitive information