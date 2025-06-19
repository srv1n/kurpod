#![allow(clippy::needless_return)]
#![allow(clippy::needless_late_init)]
#![allow(clippy::type_complexity)]
#![allow(clippy::useless_format)]
#![allow(clippy::unwrap_or_default)]

mod auth;
mod session;
mod state;

use crate::{auth::AuthContext, state::AppState};
use axum::extract::{ConnectInfo, Extension};
use axum::{
    extract::{DefaultBodyLimit, Path, Query},
    http::{
        header::{CONTENT_DISPOSITION, CONTENT_TYPE},
        StatusCode,
    },
    response::{IntoResponse, Response},
    routing::{delete, get, post},
    Json,
};
use axum_extra::extract::Multipart;
use clap::Parser;
use encryption_core::{
    add_file, compact_blob, get_file, init_blob, remove_file, remove_folder, rename_file,
    unlock_blob,
};
use local_ip_address::local_ip;
use log;
use mime_guess::{from_path, mime};
use rand::{rngs::OsRng, RngCore};
use rust_embed::RustEmbed;
use serde::{Deserialize, Serialize};
use std::fs;
use std::{net::SocketAddr, path::PathBuf};
use tokio::net::TcpListener;
use tower::ServiceBuilder;

/// Command-line arguments
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
#[command(group(
    clap::ArgGroup::new("storage")
        .args(&["single", "dir"]),
))]
struct Args {
    /// Port to listen on
    #[arg(short, long, default_value_t = 3000)]
    port: u16,

    /// Path to a single blob file – enables single-blob mode
    #[arg(short = 's', long = "single", value_name = "FILE", group = "storage")]
    single: Option<PathBuf>,

    /// Path to a directory that will hold (or already holds) blob files – enables directory mode
    #[arg(short = 'd', long = "dir", value_name = "DIR", group = "storage")]
    dir: Option<PathBuf>,
}

// Server mode for blob handling
#[derive(Clone, Debug)]
enum ServerMode {
    Single(PathBuf),    // Single blob file
    Directory(PathBuf), // Directory containing blobs
}

// App context that includes the blob mode and application state
#[derive(Clone)]
struct AppContext {
    mode: ServerMode,
    app_state: AppState,
}

/// API response
#[derive(Serialize)]
struct ApiResponse<T> {
    success: bool,
    data: Option<T>,
    message: Option<String>,
}

/// File list
#[derive(Serialize)]
struct FileList {
    files: Vec<FileInfo>,
}

/// File info
#[derive(Serialize)]
struct FileInfo {
    path: String,
    size: usize,
}

/// Init response
#[derive(Serialize)]
struct InitResponse {
    token: String,
    files: Vec<FileInfo>,
    volume_type: String,
}

/// Init payload - updated
#[derive(Deserialize)]
struct InitPayload {
    password_s: String,         // Standard/Decoy password
    password_h: Option<String>, // Optional hidden password
    #[allow(dead_code)]
    blob_path: Option<String>, // Optional blob path override (single mode only)
    blob_name: Option<String>,  // Optional blob name (directory mode only)
}

/// Unlock payload
#[derive(Deserialize)]
struct UnlockPayload {
    password: String,
    #[allow(dead_code)]
    blob_path: Option<String>, // Optional blob path override (single mode only)
    blob_name: Option<String>, // Optional blob name (directory mode only)
}

/// Rename payload
#[derive(Deserialize)]
struct RenamePayload {
    old_path: String,
    new_path: String,
}

/// Delete params
#[derive(Deserialize)]
struct DeleteParams {
    path: String,
}

/// Download params
#[derive(Deserialize)]
struct DownloadParams {
    path: String,
}

// Add a new struct for batch upload
#[derive(Deserialize)]
struct BatchInfo {
    is_final_batch: bool,
    batch_id: String,
    current_folder: Option<String>,
}

/// Delete blob payload
#[derive(Deserialize)]
struct DeleteBlobPayload {
    blob_name: String,
}

/// Compaction payload
#[derive(Deserialize)]
struct CompactPayload {
    password_s: String,
    password_h: String,
}

// Helper function to validate or create directory
fn validate_or_create_directory(dir_path: &PathBuf) {
    if dir_path.exists() {
        if !dir_path.is_dir() {
            eprintln!(
                "Error: {} exists but is not a directory",
                dir_path.display()
            );
            std::process::exit(1);
        }
        // Check if we can write to it
        match fs::metadata(dir_path) {
            Ok(metadata) => {
                if metadata.permissions().readonly() {
                    eprintln!("Error: Directory {} is read-only", dir_path.display());
                    std::process::exit(1);
                }
            }
            Err(e) => {
                eprintln!(
                    "Error: Cannot access directory {}: {}",
                    dir_path.display(),
                    e
                );
                std::process::exit(1);
            }
        }
    } else {
        // Try to create the directory
        match fs::create_dir_all(dir_path) {
            Ok(()) => {
                println!("Created directory: {}", dir_path.display());
            }
            Err(e) => {
                eprintln!(
                    "Error: Cannot create directory {}: {}",
                    dir_path.display(),
                    e
                );
                std::process::exit(1);
            }
        }
    }
}

// Helper function to get available blob files in a directory
fn get_available_blobs(dir_path: &PathBuf) -> Vec<String> {
    let mut blobs = Vec::new();

    if let Ok(entries) = fs::read_dir(dir_path) {
        for entry in entries.flatten() {
            if let Ok(metadata) = entry.metadata() {
                if metadata.is_file() {
                    if let Some(file_name) = entry.file_name().to_str() {
                        // Include all files as potential blobs (user can disguise them)
                        blobs.push(file_name.to_string());
                    }
                }
            }
        }
    }

    // Sort for consistent ordering
    blobs.sort();
    blobs
}

#[derive(RustEmbed)]
#[folder = "../frontend/dist/"]
struct Assets;

// Static file handler using embedded assets
async fn static_handler(Path(path): Path<String>) -> Response {
    let path = if path.is_empty() { "index.html" } else { &path };

    match Assets::get(path) {
        Some(content) => {
            let mime = mime_guess::from_path(path).first_or_octet_stream();
            Response::builder()
                .status(StatusCode::OK)
                .header(CONTENT_TYPE, mime.as_ref())
                .body(axum::body::Body::from(content.data))
                .unwrap()
        }
        None => {
            // For SPA routing, serve index.html for unmatched paths
            match Assets::get("index.html") {
                Some(content) => Response::builder()
                    .status(StatusCode::OK)
                    .header(CONTENT_TYPE, "text/html")
                    .body(axum::body::Body::from(content.data))
                    .unwrap(),
                None => Response::builder()
                    .status(StatusCode::NOT_FOUND)
                    .body(axum::body::Body::from("Frontend not found"))
                    .unwrap(),
            }
        }
    }
}

#[tokio::main]
async fn main() {
    // Initialize logger (e.g., RUST_LOG=info cargo run)
    // Use try_init if multiple binaries might use it, otherwise init is fine.
    let _ = env_logger::builder()
        .filter_level(log::LevelFilter::Info)
        .try_init();

    let args = Args::parse();

    // Determine server mode from args and environment variables
    let mode = match (
        args.single,
        args.dir,
        std::env::var("BLOB_FILE"),
        std::env::var("BLOB_DIR"),
    ) {
        // CLI args take precedence
        (Some(single), None, _, _) => {
            let path = single;
            println!("Single-blob mode: {}", path.display());
            // Validate that parent directory exists if file doesn't exist
            if !path.exists() {
                if let Some(parent) = path.parent() {
                    if !parent.exists() {
                        eprintln!(
                            "Error: Parent directory {} does not exist",
                            parent.display()
                        );
                        std::process::exit(1);
                    }
                }
                println!(
                    "Note: Blob file {} will be created on first init",
                    path.display()
                );
            }
            ServerMode::Single(path)
        }
        (None, Some(dir), _, _) => {
            let dir_path = dir;
            println!("Directory mode: {}", dir_path.display());
            validate_or_create_directory(&dir_path);
            ServerMode::Directory(dir_path)
        }
        (None, None, Ok(blob_file), _) => {
            let path = PathBuf::from(blob_file);
            println!("Single-blob mode (env): {}", path.display());
            if !path.exists() {
                if let Some(parent) = path.parent() {
                    if !parent.exists() {
                        eprintln!(
                            "Error: Parent directory {} does not exist",
                            parent.display()
                        );
                        std::process::exit(1);
                    }
                }
                println!(
                    "Note: Blob file {} will be created on first init",
                    path.display()
                );
            }
            ServerMode::Single(path)
        }
        (None, None, _, Ok(blob_dir)) => {
            let dir_path = PathBuf::from(blob_dir);
            println!("Directory mode (env): {}", dir_path.display());
            validate_or_create_directory(&dir_path);
            ServerMode::Directory(dir_path)
        }
        // Default mode: use ./blobs/ directory
        (None, None, _, _) => {
            let dir_path = PathBuf::from("./blobs");
            println!("Default mode: {}", dir_path.display());
            validate_or_create_directory(&dir_path);
            ServerMode::Directory(dir_path)
        }
        // Error: both blob and blob_dir specified
        (Some(_), Some(_), _, _) => {
            eprintln!("Error: Cannot specify both --single and --dir");
            std::process::exit(1);
        }
    };

    println!("Starting server at http://localhost:{}", args.port);

    match local_ip() {
        Ok(ip) => println!("Also available at http://{}:{}", ip, args.port),
        Err(_) => println!("Could not determine local IP address"),
    }

    let app_state = AppState::new();
    let app_context = AppContext {
        mode: mode.clone(),
        app_state: app_state.clone(),
    };

    let app = axum::Router::new()
        // Public routes (no authentication required)
        .route("/api/status", get(status_handler))
        .route("/api/init", post(init_handler))
        .route("/api/unlock", post(unlock_handler))
        .route("/api/info", get(info_handler))
        // Protected routes (require authentication)
        .route("/api/logout", post(logout_handler))
        .route("/api/session", get(session_status_handler))
        .route("/api/files", get(files_handler))
        .route("/api/files", post(upload_handler))
        .route("/api/batch-upload", post(batch_upload_handler))
        .route("/api/files/*filepath", get(file_get_handler))
        .route("/api/files/*filepath", delete(file_delete_handler))
        .route("/api/storage/stats", get(storage_stats_handler))
        .route("/api/storage/compact", post(compact_handler))
        // Legacy routes updated for session authentication
        .route("/api/tree", get(tree_handler))
        .route("/api/rename", post(rename_handler))
        .route("/api/delete", delete(delete_query_handler))
        .route("/api/delete-folder", delete(delete_folder_handler))
        .route("/api/download", get(download_query_handler))
        .route("/api/compact", post(compact_legacy_handler))
        // Static file serving
        .route("/*path", get(static_handler))
        .route(
            "/",
            get(|| async { static_handler(Path("index.html".to_string())).await }),
        )
        .layer(
            ServiceBuilder::new()
                .layer(DefaultBodyLimit::disable())
                .layer(Extension(app_context.clone()))
                .layer(Extension(app_state.session_manager.clone())),
        );

    let addr = SocketAddr::from(([0, 0, 0, 0], args.port));
    let listener = TcpListener::bind(&addr).await.unwrap();
    match &mode {
        ServerMode::Single(path) => println!("\nSingle blob mode: {}", path.display()),
        ServerMode::Directory(dir) => println!("\nDirectory mode: {}", dir.display()),
    }
    println!("Waiting for client connection and authentication...");
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .unwrap();
}

/// Status response
#[derive(Serialize)]
struct StatusResponse {
    status: String,
    mode: String,
    blob_path: Option<String>,            // for single mode
    blob_dir: Option<String>,             // for directory mode
    available_blobs: Option<Vec<String>>, // for directory mode
    volume_type: Option<String>,
}

async fn status_handler(Extension(app_context): Extension<AppContext>) -> Response {
    // Get available blobs for directory mode
    let (mode_str, blob_path, blob_dir, available_blobs) = match &app_context.mode {
        ServerMode::Single(path) => (
            "single".to_string(),
            Some(path.to_string_lossy().to_string()),
            None,
            None,
        ),
        ServerMode::Directory(dir) => {
            let blobs = get_available_blobs(dir);
            (
                "directory".to_string(),
                None,
                Some(dir.to_string_lossy().to_string()),
                Some(blobs),
            )
        }
    };

    let session_count = app_context.app_state.session_manager.session_count();
    let status = if session_count > 0 { "ready" } else { "locked" };

    let resp: ApiResponse<StatusResponse> = ApiResponse {
        success: true,
        data: Some(StatusResponse {
            status: status.to_string(),
            mode: mode_str,
            blob_path,
            blob_dir,
            available_blobs,
            volume_type: None, // Will be provided by session endpoint
        }),
        message: None,
    };
    (StatusCode::OK, Json(resp)).into_response()
}

/// Helper to extract client IP from request
fn extract_client_ip_from_connect_info(
    connect_info: Option<ConnectInfo<SocketAddr>>,
) -> Option<String> {
    connect_info.map(|info| info.0.ip().to_string())
}

/// Helper to extract user agent from headers
fn extract_user_agent(headers: &axum::http::HeaderMap) -> Option<String> {
    headers
        .get("user-agent")
        .and_then(|h| h.to_str().ok())
        .map(|s| s.to_string())
}

async fn init_handler(
    Extension(app_context): Extension<AppContext>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    headers: axum::http::HeaderMap,
    Json(payload): Json<InitPayload>,
) -> Response {
    // Extract client info
    let client_ip = Some(addr.ip().to_string());
    let user_agent = extract_user_agent(&headers);

    // Allow multiple sessions to access the same blob - this is important for privacy
    // Each browser session should be able to independently unlock the blob

    // Get blob path based on server mode
    let blob_path: PathBuf = match &app_context.mode {
        ServerMode::Single(path) => {
            // In single mode, use the configured path, ignore payload blob_name
            if payload.blob_name.is_some() {
                let resp: ApiResponse<String> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Cannot specify blob_name in single-blob mode".into()),
                };
                return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
            }
            path.clone()
        }
        ServerMode::Directory(dir) => {
            // In directory mode, require blob_name
            match payload.blob_name {
                Some(name) => {
                    if name.is_empty() {
                        let resp: ApiResponse<String> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some("blob_name cannot be empty".into()),
                        };
                        return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
                    }
                    let blob_path = dir.join(&name);
                    // Check if file already exists
                    if blob_path.exists() {
                        let resp: ApiResponse<String> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some(format!("Blob file {} already exists", name)),
                        };
                        return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
                    }
                    blob_path
                }
                None => {
                    let resp: ApiResponse<String> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some("blob_name required in directory mode".into()),
                    };
                    return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
                }
            }
        }
    };

    println!("Initializing blob at: {}", blob_path.display());

    let password_s = payload.password_s;
    let password_h_final: String; // Will hold the final hidden password

    // Validate and determine the hidden password
    match payload.password_h {
        Some(ph) if !ph.trim().is_empty() => {
            // User provided a hidden password
            if ph == password_s {
                let resp: ApiResponse<String> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Standard and hidden passwords must be different".into()),
                };
                return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
            }
            println!("Using provided password for hidden volume.");
            password_h_final = ph;
        }
        _ => {
            // User did not provide a hidden password, or it was empty - generate a random one
            println!("Generating temporary random password for hidden volume.");
            let mut password_h_bytes = [0u8; 32];
            OsRng.fill_bytes(&mut password_h_bytes);
            // Prefix ensures it's unlikely to match user's standard password by chance
            password_h_final = format!("hidden_{}", hex::encode(password_h_bytes));
        }
    }

    println!("Using provided password for standard volume.");

    // Initialize new blob with both passwords
    match init_blob(&blob_path, &password_s, &password_h_final) {
        Ok(()) => {
            // Unlock immediately using the standard password to get initial state
            match unlock_blob(&blob_path, &password_s) {
                Ok((volume_type, key, metadata)) => {
                    // Create session instead of storing in global state
                    match app_context.app_state.session_manager.create_session(
                        key,
                        blob_path.clone(),
                        metadata.clone(),
                        volume_type,
                        client_ip,
                        user_agent,
                    ) {
                        Ok(token) => {
                            let files = metadata
                                .iter()
                                .map(|(path, meta)| FileInfo {
                                    path: path.clone(),
                                    size: meta.size as usize,
                                })
                                .collect();

                            let resp: ApiResponse<InitResponse> = ApiResponse {
                                success: true,
                                data: Some(InitResponse {
                                    token,
                                    files,
                                    volume_type: format!("{:?}", volume_type),
                                }),
                                message: Some("Blob initialized and session created".into()),
                            };
                            (StatusCode::OK, Json(resp)).into_response()
                        }
                        Err(e) => {
                            let resp: ApiResponse<String> = ApiResponse {
                                success: false,
                                data: None,
                                message: Some(format!("Failed to create session: {}", e)),
                            };
                            (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                        }
                    }
                }
                Err(e) => {
                    // Error Case 3: Failed unlock after init
                    let resp: ApiResponse<String> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to unlock after init: {}", e)),
                    };
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                }
            }
        }
        Err(e) => {
            // Error Case 4: Failed init_blob
            let resp: ApiResponse<String> = ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Init error: {}", e)),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
        }
    }
}

/// Unlock response
#[derive(Serialize)]
struct UnlockResponse {
    token: String,
    files: Vec<FileInfo>,
    volume_type: String,
}

async fn unlock_handler(
    Extension(app_context): Extension<AppContext>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    headers: axum::http::HeaderMap,
    Json(payload): Json<UnlockPayload>,
) -> Response {
    // Extract client info
    let client_ip = Some(addr.ip().to_string());
    let user_agent = extract_user_agent(&headers);

    // Get blob path based on server mode
    let blob_path: PathBuf = match &app_context.mode {
        ServerMode::Single(path) => {
            // In single mode, use the configured path, ignore payload blob_name
            if payload.blob_name.is_some() {
                let resp: ApiResponse<String> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Cannot specify blob_name in single-blob mode".into()),
                };
                return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
            }
            path.clone()
        }
        ServerMode::Directory(dir) => {
            // In directory mode, require blob_name
            match payload.blob_name {
                Some(name) => {
                    if name.is_empty() {
                        let resp: ApiResponse<String> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some("blob_name cannot be empty".into()),
                        };
                        return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
                    }
                    let blob_path = dir.join(&name);
                    // Check if file exists
                    if !blob_path.exists() {
                        let resp: ApiResponse<String> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some(format!("Blob file {} not found", name)),
                        };
                        return (StatusCode::NOT_FOUND, Json(resp)).into_response();
                    }
                    blob_path
                }
                None => {
                    let resp: ApiResponse<String> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some("blob_name required in directory mode".into()),
                    };
                    return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
                }
            }
        }
    };

    println!("Unlocking blob at: {}", blob_path.display());

    // Unlock blob and get metadata
    match unlock_blob(&blob_path, &payload.password) {
        Ok((volume_type, key, metadata)) => {
            // Create session
            match app_context.app_state.session_manager.create_session(
                key,
                blob_path.clone(),
                metadata.clone(),
                volume_type,
                client_ip,
                user_agent,
            ) {
                Ok(token) => {
                    let files = metadata
                        .iter()
                        .map(|(path, meta)| FileInfo {
                            path: path.clone(),
                            size: meta.size as usize,
                        })
                        .collect();

                    let resp: ApiResponse<UnlockResponse> = ApiResponse {
                        success: true,
                        data: Some(UnlockResponse {
                            token,
                            files,
                            volume_type: format!("{:?}", volume_type),
                        }),
                        message: Some(format!("Unlocked {:?} volume", volume_type)),
                    };
                    (StatusCode::OK, Json(resp)).into_response()
                }
                Err(e) => {
                    let resp: ApiResponse<String> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to create session: {}", e)),
                    };
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                }
            }
        }
        Err(e) => {
            log::error!("Unlock failed: {}", e);
            let resp: ApiResponse<String> = ApiResponse {
                success: false,
                data: None,
                message: Some("Invalid password or corrupt blob".into()),
            };
            (StatusCode::UNAUTHORIZED, Json(resp)).into_response()
        }
    }
}

async fn logout_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
) -> Response {
    log::info!("Logout request received for session: {}", auth.session_id);

    if app_context
        .app_state
        .session_manager
        .remove_session(&auth.session_id)
    {
        log::info!("Session removed successfully: {}", auth.session_id);
        let resp: ApiResponse<String> = ApiResponse {
            success: true,
            data: None,
            message: Some("Logged out successfully".into()),
        };
        (StatusCode::OK, Json(resp)).into_response()
    } else {
        log::warn!("Session not found during logout: {}", auth.session_id);
        // Still return success, as the desired state (logged out) is achieved
        let resp: ApiResponse<String> = ApiResponse {
            success: true,
            data: None,
            message: Some("Session already removed".into()),
        };
        (StatusCode::OK, Json(resp)).into_response()
    }
}

/// Session status response
#[derive(Serialize)]
struct SessionStatusResponse {
    session_id: String,
    volume_type: String,
    blob_path: String,
    file_count: usize,
    active_since: String,
}

async fn session_status_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        let resp: ApiResponse<SessionStatusResponse> = ApiResponse {
            success: true,
            data: Some(SessionStatusResponse {
                session_id: auth.session_id,
                volume_type: format!("{:?}", session.volume_type),
                blob_path: session.blob_path.to_string_lossy().to_string(),
                file_count: session.metadata.len(),
                active_since: format!("{:?}", session.created_at),
            }),
            message: None,
        };
        (StatusCode::OK, Json(resp)).into_response()
    } else {
        let resp: ApiResponse<String> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn info_handler() -> Response {
    #[derive(Serialize)]
    struct InfoResponse {
        name: String,
        version: String,
        description: String,
    }

    let resp: ApiResponse<InfoResponse> = ApiResponse {
        success: true,
        data: Some(InfoResponse {
            name: "KURPOD Server".to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
            description: "Encrypted file storage server with session-based authentication"
                .to_string(),
        }),
        message: None,
    };
    (StatusCode::OK, Json(resp)).into_response()
}

async fn files_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        let files = session
            .metadata
            .iter()
            .map(|(path, meta)| FileInfo {
                path: path.clone(),
                size: meta.size as usize,
            })
            .collect();
        let resp: ApiResponse<FileList> = ApiResponse {
            success: true,
            data: Some(FileList { files }),
            message: None,
        };
        (StatusCode::OK, Json(resp)).into_response()
    } else {
        let resp: ApiResponse<String> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn tree_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
) -> Response {
    // Legacy handler that redirects to files_handler
    files_handler(auth, Extension(app_context)).await
}

// Unified file GET handler that supports download, stream, and thumbnail operations
async fn file_get_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Path(filepath): Path<String>,
    headers: axum::http::HeaderMap,
) -> Response {
    // Parse the operation type from the filepath
    let (file_id, operation) = if filepath.ends_with("/stream") {
        (filepath.trim_end_matches("/stream").to_string(), "stream")
    } else if filepath.ends_with("/thumbnail") {
        (
            filepath.trim_end_matches("/thumbnail").to_string(),
            "thumbnail",
        )
    } else {
        (filepath, "download")
    };

    match operation {
        "stream" => stream_handler_impl(auth, Extension(app_context), file_id, headers).await,
        "thumbnail" => thumbnail_handler_impl(auth, Extension(app_context), file_id).await,
        _ => download_handler_impl(auth, Extension(app_context), file_id).await,
    }
}

// Stream handler implementation for video/audio with HTTP range support
async fn stream_handler_impl(
    auth: AuthContext,
    app_context: Extension<AppContext>,
    file_id: String,
    headers: axum::http::HeaderMap,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        match session.metadata.get(&file_id) {
            Some(metadata) => {
                match get_file(&session.blob_path, &auth.derived_key, metadata) {
                    Ok(content) => {
                        let content_length = content.len();
                        let mime = from_path(&file_id).first_or_octet_stream();

                        // Check for Range header
                        if let Some(range_header) = headers.get("range") {
                            if let Ok(range_str) = range_header.to_str() {
                                if range_str.starts_with("bytes=") {
                                    let range_part = &range_str[6..];

                                    // Parse range (e.g., "0-1023" or "1024-" or "-1024")
                                    if let Some((start_str, end_str)) = range_part.split_once('-') {
                                        let start = if start_str.is_empty() {
                                            // Suffix range like "-1024"
                                            if let Ok(suffix_len) = end_str.parse::<usize>() {
                                                content_length.saturating_sub(suffix_len)
                                            } else {
                                                0
                                            }
                                        } else {
                                            start_str.parse().unwrap_or(0)
                                        };

                                        let end = if end_str.is_empty() {
                                            content_length - 1
                                        } else if start_str.is_empty() {
                                            // Suffix range, end is already calculated above
                                            content_length - 1
                                        } else {
                                            end_str
                                                .parse()
                                                .unwrap_or(content_length - 1)
                                                .min(content_length - 1)
                                        };

                                        if start < content_length && start <= end {
                                            let chunk = &content[start..=end];
                                            return Response::builder()
                                                .status(StatusCode::PARTIAL_CONTENT)
                                                .header(CONTENT_TYPE, mime.as_ref())
                                                .header(
                                                    "Content-Range",
                                                    format!(
                                                        "bytes {}-{}/{}",
                                                        start, end, content_length
                                                    ),
                                                )
                                                .header("Content-Length", chunk.len().to_string())
                                                .header("Accept-Ranges", "bytes")
                                                .body(axum::body::Body::from(chunk.to_vec()))
                                                .unwrap()
                                                .into_response();
                                        }
                                    }
                                }
                            }
                        }

                        // Return full content if no valid range requested
                        Response::builder()
                            .status(StatusCode::OK)
                            .header(CONTENT_TYPE, mime.as_ref())
                            .header("Content-Length", content_length.to_string())
                            .header("Accept-Ranges", "bytes")
                            .header(
                                CONTENT_DISPOSITION,
                                format!("inline; filename=\"{}\"", file_id),
                            )
                            .body(axum::body::Body::from(content))
                            .unwrap()
                            .into_response()
                    }
                    Err(e) => {
                        let resp: ApiResponse<()> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some(format!("Error reading file: {}", e)),
                        };
                        (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                    }
                }
            }
            None => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn thumbnail_handler_impl(
    auth: AuthContext,
    app_context: Extension<AppContext>,
    file_id: String,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        match session.metadata.get(&file_id) {
            Some(metadata) => {
                // Check if file is an image type that we can thumbnail
                let mime_guess = from_path(&file_id);
                let is_image = mime_guess.first_or_octet_stream().type_() == mime::IMAGE;

                if !is_image {
                    let resp: ApiResponse<()> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some("Thumbnails only supported for images".into()),
                    };
                    return (StatusCode::BAD_REQUEST, Json(resp)).into_response();
                }

                match get_file(&session.blob_path, &auth.derived_key, metadata) {
                    Ok(content) => {
                        // For now, return the original image as thumbnail
                        // In a full implementation, you'd use an image processing library
                        // like `image` crate to resize the image

                        // Simple size check - if image is small, return as-is
                        if content.len() < 100_000 {
                            // Less than 100KB
                            Response::builder()
                                .status(StatusCode::OK)
                                .header(CONTENT_TYPE, mime_guess.first_or_octet_stream().as_ref())
                                .header("Cache-Control", "public, max-age=3600")
                                .body(axum::body::Body::from(content))
                                .unwrap()
                                .into_response()
                        } else {
                            // For larger images, we'd normally resize here
                            // For now, return the original image (thumbnail generation would require image processing)
                            Response::builder()
                                .status(StatusCode::OK)
                                .header(CONTENT_TYPE, mime_guess.first_or_octet_stream().as_ref())
                                .header("Cache-Control", "public, max-age=3600")
                                .body(axum::body::Body::from(content))
                                .unwrap()
                                .into_response()
                        }
                    }
                    Err(e) => {
                        let resp: ApiResponse<()> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some(format!("Error reading file: {}", e)),
                        };
                        (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                    }
                }
            }
            None => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

/// Storage stats response
#[derive(Serialize)]
struct StorageStatsResponse {
    total_files: usize,
    total_size: u64,
    blob_file_size: u64,
    volume_type: String,
    blob_path: String,
}

async fn storage_stats_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        // Calculate total size of all files in metadata
        let total_size: u64 = session.metadata.values().map(|meta| meta.size).sum();

        // Get blob file size from filesystem
        let blob_file_size = match fs::metadata(&session.blob_path) {
            Ok(metadata) => metadata.len(),
            Err(_) => 0,
        };

        let stats = StorageStatsResponse {
            total_files: session.metadata.len(),
            total_size,
            blob_file_size,
            volume_type: format!("{:?}", session.volume_type),
            blob_path: session.blob_path.to_string_lossy().to_string(),
        };

        let resp: ApiResponse<StorageStatsResponse> = ApiResponse {
            success: true,
            data: Some(stats),
            message: None,
        };
        (StatusCode::OK, Json(resp)).into_response()
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

// Legacy handlers updated to use session authentication
async fn rename_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<RenamePayload>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        // Note: For now, we'll work around the mutable session issue
        // In production, session metadata should be updated through the session manager
        let mut metadata = session.metadata.clone();
        match rename_file(
            &session.blob_path,
            session.volume_type,
            &auth.derived_key,
            &mut metadata,
            &payload.old_path,
            &payload.new_path,
        ) {
            Ok(true) => {
                // Update session metadata after successful rename
                log::info!(
                    "Updating session metadata after renaming file: {} -> {}",
                    payload.old_path,
                    payload.new_path
                );
                app_context
                    .app_state
                    .session_manager
                    .update_session_metadata(&auth.session_id, metadata);
                let resp: ApiResponse<()> = ApiResponse {
                    success: true,
                    data: None,
                    message: None,
                };
                (StatusCode::OK, Json(resp)).into_response()
            }
            Ok(false) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
            Err(e) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Rename error: {}", e)),
                };
                (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

// Session-based delete handler using query params (legacy route)
async fn delete_query_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Query(params): Query<DeleteParams>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        let mut metadata = session.metadata.clone();
        match remove_file(
            &session.blob_path,
            session.volume_type,
            &auth.derived_key,
            &mut metadata,
            &params.path,
        ) {
            Ok(true) => {
                // Update session metadata after successful deletion
                log::info!(
                    "Updating session metadata after deleting file (legacy): {}",
                    params.path
                );
                app_context
                    .app_state
                    .session_manager
                    .update_session_metadata(&auth.session_id, metadata);
                let resp: ApiResponse<()> = ApiResponse {
                    success: true,
                    data: None,
                    message: None,
                };
                (StatusCode::OK, Json(resp)).into_response()
            }
            Ok(false) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
            Err(e) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Delete error: {}", e)),
                };
                (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

// Unified file DELETE handler
async fn file_delete_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Path(filepath): Path<String>,
) -> Response {
    // Remove any operation suffix from filepath
    let file_id = if filepath.ends_with("/stream") {
        filepath.trim_end_matches("/stream").to_string()
    } else if filepath.ends_with("/thumbnail") {
        filepath.trim_end_matches("/thumbnail").to_string()
    } else {
        filepath
    };

    delete_handler_impl(auth, Extension(app_context), file_id).await
}

// Delete handler implementation
async fn delete_handler_impl(
    auth: AuthContext,
    app_context: Extension<AppContext>,
    file_id: String,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        let mut metadata = session.metadata.clone();
        match remove_file(
            &session.blob_path,
            session.volume_type,
            &auth.derived_key,
            &mut metadata,
            &file_id,
        ) {
            Ok(true) => {
                // Update session metadata after successful deletion
                log::info!("Updating session metadata after deleting file: {}", file_id);
                app_context
                    .app_state
                    .session_manager
                    .update_session_metadata(&auth.session_id, metadata);
                let resp: ApiResponse<()> = ApiResponse {
                    success: true,
                    data: None,
                    message: None,
                };
                (StatusCode::OK, Json(resp)).into_response()
            }
            Ok(false) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
            Err(e) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Delete error: {}", e)),
                };
                (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn delete_folder_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Query(params): Query<DeleteParams>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        let mut metadata = session.metadata.clone();
        match remove_folder(
            &session.blob_path,
            session.volume_type,
            &auth.derived_key,
            &mut metadata,
            &params.path,
        ) {
            Ok(true) => {
                // Update session metadata after successful folder deletion
                log::info!(
                    "Updating session metadata after deleting folder: {}",
                    params.path
                );
                app_context
                    .app_state
                    .session_manager
                    .update_session_metadata(&auth.session_id, metadata);
                let resp: ApiResponse<()> = ApiResponse {
                    success: true,
                    data: None,
                    message: None,
                };
                (StatusCode::OK, Json(resp)).into_response()
            }
            Ok(false) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Folder not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
            Err(e) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Delete error: {}", e)),
                };
                (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

// Session-based download handler using query params (legacy route)
async fn download_query_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Query(params): Query<DownloadParams>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        match session.metadata.get(&params.path) {
            Some(metadata) => match get_file(&session.blob_path, &auth.derived_key, metadata) {
                Ok(content) => {
                    let mime = from_path(&params.path).first_or_octet_stream();
                    Response::builder()
                        .status(StatusCode::OK)
                        .header(CONTENT_TYPE, mime.as_ref())
                        .header(
                            CONTENT_DISPOSITION,
                            format!("inline; filename=\"{}\"", params.path),
                        )
                        .body(axum::body::Body::from(content))
                        .unwrap()
                        .into_response()
                }
                Err(e) => {
                    let resp: ApiResponse<()> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Error reading file: {}", e)),
                    };
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                }
            },
            None => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

// Download handler implementation
async fn download_handler_impl(
    auth: AuthContext,
    app_context: Extension<AppContext>,
    file_id: String,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        match session.metadata.get(&file_id) {
            Some(metadata) => match get_file(&session.blob_path, &auth.derived_key, metadata) {
                Ok(content) => {
                    let mime = from_path(&file_id).first_or_octet_stream();
                    Response::builder()
                        .status(StatusCode::OK)
                        .header(CONTENT_TYPE, mime.as_ref())
                        .header(
                            CONTENT_DISPOSITION,
                            format!("inline; filename=\"{}\"", file_id),
                        )
                        .body(axum::body::Body::from(content))
                        .unwrap()
                        .into_response()
                }
                Err(e) => {
                    let resp: ApiResponse<()> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Error reading file: {}", e)),
                    };
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                }
            },
            None => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("File not found".into()),
                };
                (StatusCode::NOT_FOUND, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn upload_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Query(current_folder_query): Query<std::collections::HashMap<String, String>>,
    mut multipart: Multipart,
) -> Response {
    if let Some(_session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        println!("Upload started, processing multipart data");
        println!("Current folder query: {:?}", current_folder_query);
        let mut file_count = 0;
        let mut total_size = 0;
        let mut uploaded_files: Vec<(String, Vec<u8>)> = Vec::new();
        let mut file_paths: Vec<String> = Vec::new();

        // Process multipart without holding any locks
        while let Ok(Some(field)) = multipart.next_field().await {
            if let Some(name) = field.name() {
                if name == "file" || name == "files" {
                    match field.file_name() {
                        Some(fname) => {
                            let fname_owned = fname.to_string();
                            println!("Processing file: {}", fname_owned);

                            match field.bytes().await {
                                Ok(bytes) => {
                                    let size = bytes.len();
                                    total_size += size;
                                    println!("Received file: {} ({} bytes)", fname_owned, size);

                                    uploaded_files.push((fname_owned, bytes.to_vec()));
                                    file_count += 1;
                                }
                                Err(e) => {
                                    println!("Error reading file data: {}", e);
                                    let resp: ApiResponse<FileList> = ApiResponse {
                                        success: false,
                                        data: None,
                                        message: Some(format!("Error reading file data: {}", e)),
                                    };
                                    return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp))
                                        .into_response();
                                }
                            }
                        }
                        None => {
                            println!("File field without filename");
                        }
                    }
                } else if name == "file_path" {
                    match field.text().await {
                        Ok(path) => {
                            file_paths.push(path);
                            println!("Received file path: {}", file_paths.last().unwrap());
                        }
                        Err(e) => {
                            println!("Error reading file path: {}", e);
                        }
                    }
                }
            }
        }

        println!(
            "Processed {} files, total size: {} bytes",
            file_count, total_size
        );

        if !uploaded_files.is_empty() {
            // Process uploads
            let mut successful_uploads = Vec::new();
            let mut failed_uploads = Vec::new();

            for (index, (filename, content)) in uploaded_files.iter().enumerate() {
                // Get a fresh session reference for each upload
                if let Some(session) = app_context
                    .app_state
                    .session_manager
                    .get_session(&auth.session_id)
                {
                    let mut metadata = session.metadata.clone();

                    // Use the full path if available, otherwise use filename
                    let relative_path = if index < file_paths.len() {
                        &file_paths[index]
                    } else {
                        filename
                    };

                    // Construct the full file path based on current folder
                    let file_path = if let Some(current_folder) =
                        current_folder_query.get("current_folder")
                    {
                        if current_folder.is_empty() {
                            relative_path.clone()
                        } else {
                            format!("{}/{}", current_folder.trim_end_matches('/'), relative_path)
                        }
                    } else {
                        relative_path.clone()
                    };

                    println!(
                        "Regular upload: Constructing file path: '{}' + '{}' = '{}'",
                        current_folder_query
                            .get("current_folder")
                            .unwrap_or(&"".to_string()),
                        relative_path,
                        file_path
                    );

                    let mime_type = from_path(&filename).first_or_octet_stream();
                    match add_file(
                        &session.blob_path,
                        session.volume_type,
                        &auth.derived_key,
                        &mut metadata,
                        &file_path,
                        &content,
                        mime_type.as_ref(),
                    ) {
                        Ok(_) => {
                            successful_uploads.push(file_path.clone());
                            println!("Successfully uploaded: {}", file_path);
                            // Update session metadata in session manager
                            app_context
                                .app_state
                                .session_manager
                                .update_session_metadata(&auth.session_id, metadata.clone());
                        }
                        Err(e) => {
                            failed_uploads.push((file_path.clone(), e.to_string()));
                            println!("Failed to upload {}: {}", file_path, e);
                        }
                    }
                } else {
                    failed_uploads.push((filename.clone(), "Session not found".to_string()));
                }
            }

            if !failed_uploads.is_empty() {
                let error_msg = failed_uploads
                    .iter()
                    .map(|(name, err)| format!("{}: {}", name, err))
                    .collect::<Vec<_>>()
                    .join(", ");

                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Upload errors: {}", error_msg)),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response();
            }

            println!("All uploads successful: {:?}", successful_uploads);
        } else {
            println!("No files were uploaded");
        }

        // Return current file list from session
        if let Some(session) = app_context
            .app_state
            .session_manager
            .get_session(&auth.session_id)
        {
            let files = session
                .metadata
                .iter()
                .map(|(path, meta)| FileInfo {
                    path: path.clone(),
                    size: meta.size as usize,
                })
                .collect::<Vec<_>>();

            let resp: ApiResponse<FileList> = ApiResponse {
                success: true,
                data: Some(FileList { files }),
                message: None,
            };
            (StatusCode::OK, Json(resp)).into_response()
        } else {
            let resp: ApiResponse<FileList> = ApiResponse {
                success: false,
                data: None,
                message: Some("Session not found".into()),
            };
            (StatusCode::NOT_FOUND, Json(resp)).into_response()
        }
    } else {
        let resp: ApiResponse<FileList> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn batch_upload_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Query(batch_info): Query<BatchInfo>,
    mut multipart: Multipart,
) -> Response {
    println!("=== BATCH UPLOAD DEBUG ===");
    println!("Raw query string would be parsed into BatchInfo");
    println!(
        "Batch info - ID: {}, final: {}, current_folder: {:?}",
        batch_info.batch_id, batch_info.is_final_batch, batch_info.current_folder
    );

    if let Some(_session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        println!("Batch upload started, processing multipart data");
        let mut file_count = 0;
        let mut total_size = 0;
        let mut uploaded_files: Vec<(String, Vec<u8>)> = Vec::new();
        let mut file_paths: Vec<String> = Vec::new();

        // Process multipart without holding any locks
        while let Ok(Some(field)) = multipart.next_field().await {
            if let Some(name) = field.name() {
                if name == "files" {
                    match field.file_name() {
                        Some(fname) => {
                            let fname_owned = fname.to_string();
                            println!("Processing batch file: {}", fname_owned);

                            match field.bytes().await {
                                Ok(bytes) => {
                                    let size = bytes.len();
                                    total_size += size;
                                    println!(
                                        "Received batch file: {} ({} bytes)",
                                        fname_owned, size
                                    );

                                    uploaded_files.push((fname_owned, bytes.to_vec()));
                                    file_count += 1;
                                }
                                Err(e) => {
                                    println!("Error reading batch file data: {}", e);
                                    let resp: ApiResponse<FileList> = ApiResponse {
                                        success: false,
                                        data: None,
                                        message: Some(format!("Error reading file data: {}", e)),
                                    };
                                    return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp))
                                        .into_response();
                                }
                            }
                        }
                        None => {
                            println!("File field without filename in batch");
                        }
                    }
                } else if name == "file_paths" {
                    match field.text().await {
                        Ok(path) => {
                            file_paths.push(path);
                            println!("Received file path: {}", file_paths.last().unwrap());
                        }
                        Err(e) => {
                            println!("Error reading file path: {}", e);
                        }
                    }
                }
            }
        }

        println!(
            "Processed {} batch files, total size: {} bytes",
            file_count, total_size
        );

        if !uploaded_files.is_empty() {
            // Process uploads
            let mut successful_uploads = Vec::new();
            let mut failed_uploads = Vec::new();

            for (index, (filename, content)) in uploaded_files.iter().enumerate() {
                // Get a fresh session reference for each upload
                if let Some(session) = app_context
                    .app_state
                    .session_manager
                    .get_session(&auth.session_id)
                {
                    let mut metadata = session.metadata.clone();

                    // Use the full path if available, otherwise use filename
                    let relative_path = if index < file_paths.len() {
                        &file_paths[index]
                    } else {
                        filename
                    };

                    // Construct the full file path based on current folder
                    let file_path = if let Some(ref folder) = batch_info.current_folder {
                        if folder.is_empty() {
                            relative_path.clone()
                        } else {
                            format!("{}/{}", folder.trim_end_matches('/'), relative_path)
                        }
                    } else {
                        relative_path.clone()
                    };

                    println!(
                        "Constructing file path: '{}' + '{}' = '{}'",
                        batch_info.current_folder.as_deref().unwrap_or(""),
                        relative_path,
                        file_path
                    );

                    let mime_type = from_path(&filename).first_or_octet_stream();
                    match add_file(
                        &session.blob_path,
                        session.volume_type,
                        &auth.derived_key,
                        &mut metadata,
                        &file_path,
                        &content,
                        mime_type.as_ref(),
                    ) {
                        Ok(_) => {
                            successful_uploads.push(file_path.clone());
                            println!("Successfully uploaded batch file: {}", file_path);
                            // Update session metadata in session manager
                            app_context
                                .app_state
                                .session_manager
                                .update_session_metadata(&auth.session_id, metadata.clone());
                        }
                        Err(e) => {
                            failed_uploads.push((file_path.clone(), e.to_string()));
                            println!("Failed to upload batch file {}: {}", file_path, e);
                        }
                    }
                } else {
                    failed_uploads.push((filename.clone(), "Session not found".to_string()));
                }
            }

            if !failed_uploads.is_empty() {
                let error_msg = failed_uploads
                    .iter()
                    .map(|(name, err)| format!("{}: {}", name, err))
                    .collect::<Vec<_>>()
                    .join(", ");

                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Batch upload errors: {}", error_msg)),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response();
            }

            println!("All batch uploads successful: {:?}", successful_uploads);
        } else {
            println!("No files were uploaded in batch");
        }

        // Return current file list from session
        if let Some(session) = app_context
            .app_state
            .session_manager
            .get_session(&auth.session_id)
        {
            let files = session
                .metadata
                .iter()
                .map(|(path, meta)| FileInfo {
                    path: path.clone(),
                    size: meta.size as usize,
                })
                .collect::<Vec<_>>();

            let resp: ApiResponse<FileList> = ApiResponse {
                success: true,
                data: Some(FileList { files }),
                message: Some(format!(
                    "Batch {} uploaded successfully",
                    batch_info.batch_id
                )),
            };
            (StatusCode::OK, Json(resp)).into_response()
        } else {
            let resp: ApiResponse<FileList> = ApiResponse {
                success: false,
                data: None,
                message: Some("Session not found".into()),
            };
            (StatusCode::NOT_FOUND, Json(resp)).into_response()
        }
    } else {
        let resp: ApiResponse<FileList> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

async fn delete_blob_handler(
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<DeleteBlobPayload>,
) -> Response {
    match &app_context.mode {
        ServerMode::Directory(dir) => {
            let path = dir.join(&payload.blob_name);
            match fs::remove_file(&path) {
                Ok(_) => {
                    let resp: ApiResponse<()> = ApiResponse {
                        success: true,
                        data: None,
                        message: None,
                    };
                    (StatusCode::OK, Json(resp)).into_response()
                }
                Err(e) => {
                    let resp: ApiResponse<()> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to delete blob: {}", e)),
                    };
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
                }
            }
        }
        ServerMode::Single(_) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some("Delete not allowed in single mode".into()),
            };
            (StatusCode::BAD_REQUEST, Json(resp)).into_response()
        }
    }
}

async fn compact_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<CompactPayload>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        match compact_blob(&session.blob_path, &payload.password_s, &payload.password_h) {
            Ok(_) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: true,
                    data: None,
                    message: None,
                };
                (StatusCode::OK, Json(resp)).into_response()
            }
            Err(e) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Compaction failed: {}", e)),
                };
                (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}

// Session-based compact handler for legacy route
async fn compact_legacy_handler(
    auth: AuthContext,
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<CompactPayload>,
) -> Response {
    if let Some(session) = app_context
        .app_state
        .session_manager
        .get_session(&auth.session_id)
    {
        match compact_blob(&session.blob_path, &payload.password_s, &payload.password_h) {
            Ok(_) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: true,
                    data: None,
                    message: None,
                };
                (StatusCode::OK, Json(resp)).into_response()
            }
            Err(e) => {
                let resp: ApiResponse<()> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Compaction failed: {}", e)),
                };
                (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response()
            }
        }
    } else {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Session not found".into()),
        };
        (StatusCode::NOT_FOUND, Json(resp)).into_response()
    }
}
