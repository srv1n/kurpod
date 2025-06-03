mod state;

use crate::state::AppState;
use axum::extract::Extension;
use axum::{
    extract::{DefaultBodyLimit, Query, Path},
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
    init_blob, unlock_blob, add_file, get_file, remove_file, remove_folder, rename_file
};
use env_logger;
use hex;
use local_ip_address::local_ip;
use log::{error, info, warn};
use mime_guess::from_path;
use rand::{rngs::OsRng, RngCore};
use serde::{Deserialize, Serialize};
use std::fs;
use std::{
    net::SocketAddr,
    path::PathBuf,
    sync::{Arc, Mutex},
};
use tokio::net::TcpListener;
use rust_embed::RustEmbed;

/// Command-line arguments
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Port to listen on
    #[arg(short, long, default_value_t = 3000)]
    port: u16,
    /// Specific blob file path (single-blob mode)
    #[arg(short, long)]
    blob: Option<String>,
    /// Directory containing blob files (directory mode)
    #[arg(long)]
    blob_dir: Option<String>,
}

// Shared application state
type SharedState = Arc<Mutex<Option<AppState>>>;

// Server mode for blob handling
#[derive(Clone, Debug)]
enum ServerMode {
    Single(PathBuf),    // Single blob file
    Directory(PathBuf), // Directory containing blobs
}

// App context that includes the blob mode and path
#[derive(Clone)]
struct AppContext {
    mode: ServerMode,
    state: SharedState,
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

/// Init payload - updated
#[derive(Deserialize)]
struct InitPayload {
    password_s: String,         // Standard/Decoy password
    password_h: Option<String>, // Optional hidden password
    blob_path: Option<String>,  // Optional blob path override (single mode only)
    blob_name: Option<String>,  // Optional blob name (directory mode only)
}

/// Unlock payload
#[derive(Deserialize)]
struct UnlockPayload {
    password: String,
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
async fn static_handler(Path(path): Path<String>) -> impl IntoResponse {
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
                Some(content) => {
                    Response::builder()
                        .status(StatusCode::OK)
                        .header(CONTENT_TYPE, "text/html")
                        .body(axum::body::Body::from(content.data))
                        .unwrap()
                }
                None => {
                    Response::builder()
                        .status(StatusCode::NOT_FOUND)
                        .body(axum::body::Body::from("Frontend not found"))
                        .unwrap()
                }
            }
        }
    }
}

#[tokio::main]
async fn main() {
    // Initialize logger (e.g., RUST_LOG=info cargo run)
    // Use try_init if multiple binaries might use it, otherwise init is fine.
    let _ = env_logger::builder().filter_level(log::LevelFilter::Info).try_init();

    let args = Args::parse();
    
    // Determine server mode from args and environment variables
    let mode = match (args.blob, args.blob_dir, std::env::var("BLOB_FILE"), std::env::var("BLOB_DIR")) {
        // CLI args take precedence
        (Some(blob_file), None, _, _) => {
            let path = PathBuf::from(blob_file);
            println!("Single-blob mode: {}", path.display());
            // Validate that parent directory exists if file doesn't exist
            if !path.exists() {
                if let Some(parent) = path.parent() {
                    if !parent.exists() {
                        eprintln!("Error: Parent directory {} does not exist", parent.display());
                        std::process::exit(1);
                    }
                }
                println!("Note: Blob file {} will be created on first init", path.display());
            }
            ServerMode::Single(path)
        },
        (None, Some(blob_dir), _, _) => {
            let dir_path = PathBuf::from(blob_dir);
            println!("Directory mode: {}", dir_path.display());
            validate_or_create_directory(&dir_path);
            ServerMode::Directory(dir_path)
        },
        (None, None, Ok(blob_file), _) => {
            let path = PathBuf::from(blob_file);
            println!("Single-blob mode (env): {}", path.display());
            if !path.exists() {
                if let Some(parent) = path.parent() {
                    if !parent.exists() {
                        eprintln!("Error: Parent directory {} does not exist", parent.display());
                        std::process::exit(1);
                    }
                }
                println!("Note: Blob file {} will be created on first init", path.display());
            }
            ServerMode::Single(path)
        },
        (None, None, _, Ok(blob_dir)) => {
            let dir_path = PathBuf::from(blob_dir);
            println!("Directory mode (env): {}", dir_path.display());
            validate_or_create_directory(&dir_path);
            ServerMode::Directory(dir_path)
        },
        // Default mode: use ./blobs/ directory
        (None, None, _, _) => {
            let dir_path = PathBuf::from("./blobs");
            println!("Default mode: {}", dir_path.display());
            validate_or_create_directory(&dir_path);
            ServerMode::Directory(dir_path)
        },
        // Error: both blob and blob_dir specified
        (Some(_), Some(_), _, _) => {
            eprintln!("Error: Cannot specify both --blob and --blob-dir");
            std::process::exit(1);
        }
    };
    
    println!("Starting server at http://localhost:{}", args.port);
    
    match local_ip() {
        Ok(ip) => println!("Also available at http://{}:{}", ip, args.port),
        Err(_) => println!("Could not determine local IP address"),
    }
    
    let state: SharedState = Arc::new(Mutex::new(None));
    let app_context = AppContext {
        mode: mode.clone(),
        state: state.clone(),
    };
    
    let app = axum::Router::new()
        .route("/api/status", get(status_handler))
        .route("/api/init", post(init_handler))
        .route("/api/unlock", post(unlock_handler))
        .route("/api/logout", post(logout_handler))
        .route("/api/tree", get(tree_handler))
        .route("/api/batch-upload", post(batch_upload_handler))
        .route("/api/upload", post(upload_handler))
        .route("/api/rename", post(rename_handler))
        .route("/api/delete", delete(delete_handler))
        .route("/api/delete-folder", delete(delete_folder_handler))
        .route("/api/download", get(download_handler))
        .route("/*path", get(static_handler))
        .route("/", get(|| async { static_handler(Path("index.html".to_string())).await }))
        .layer(DefaultBodyLimit::disable())
        .layer(Extension(app_context));

    let addr = SocketAddr::from(([0, 0, 0, 0], args.port));
    let listener = TcpListener::bind(&addr).await.unwrap();
    match &mode {
        ServerMode::Single(path) => println!("\nSingle blob mode: {}", path.display()),
        ServerMode::Directory(dir) => println!("\nDirectory mode: {}", dir.display()),
    }
    println!("Waiting for client connection and authentication...");
    axum::serve(listener, app).await.unwrap();
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

async fn status_handler(Extension(app_context): Extension<AppContext>) -> impl IntoResponse {
    let guard = app_context.state.lock().unwrap();

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

    if let Some(app) = &*guard {
        let resp: ApiResponse<StatusResponse> = ApiResponse {
            success: true,
            data: Some(StatusResponse {
                status: "ready".to_string(),
                mode: mode_str,
                blob_path,
                blob_dir,
                available_blobs,
                volume_type: Some(format!("{:?}", app.volume_type)),
            }),
            message: None,
        };
        (StatusCode::OK, Json(resp))
    } else {
        let resp: ApiResponse<StatusResponse> = ApiResponse {
            success: true,
            data: Some(StatusResponse {
                status: "locked".to_string(),
                mode: mode_str,
                blob_path,
                blob_dir,
                available_blobs,
                volume_type: None,
            }),
            message: None,
        };
        (StatusCode::OK, Json(resp))
    }
}

async fn init_handler(
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<InitPayload>,
) -> impl IntoResponse {
    let mut guard = app_context.state.lock().unwrap();
    if guard.is_some() {
        let resp: ApiResponse<FileList> = ApiResponse {
            success: false,
            data: None,
            message: Some("Already initialized".into()),
        };
        return (StatusCode::BAD_REQUEST, Json(resp));
    }

    // Get blob path based on server mode
    let blob_path: PathBuf = match &app_context.mode {
        ServerMode::Single(path) => {
            // In single mode, use the configured path, ignore payload blob_name
            if payload.blob_name.is_some() {
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Cannot specify blob_name in single-blob mode".into()),
                };
                return (StatusCode::BAD_REQUEST, Json(resp));
            }
            path.clone()
        }
        ServerMode::Directory(dir) => {
            // In directory mode, require blob_name
            match payload.blob_name {
                Some(name) => {
                    if name.is_empty() {
                        let resp: ApiResponse<FileList> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some("blob_name cannot be empty".into()),
                        };
                        return (StatusCode::BAD_REQUEST, Json(resp));
                    }
                    let blob_path = dir.join(&name);
                    // Check if file already exists
                    if blob_path.exists() {
                        let resp: ApiResponse<FileList> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some(format!("Blob file {} already exists", name)),
                        };
                        return (StatusCode::BAD_REQUEST, Json(resp));
                    }
                    blob_path
                }
                None => {
                    let resp: ApiResponse<FileList> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some("blob_name required in directory mode".into()),
                    };
                    return (StatusCode::BAD_REQUEST, Json(resp));
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
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Standard and hidden passwords must be different".into()),
                };
                return (StatusCode::BAD_REQUEST, Json(resp));
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
                    *guard = Some(AppState {
                        password: password_s, // Store the standard password for session validation
                        blob_path: blob_path.clone(),
                        metadata,
                        derived_key: key,
                        volume_type,
                    });
                    // Success Case: Return file list (empty initially)
                    let resp: ApiResponse<FileList> = ApiResponse {
                        success: true,
                        data: Some(FileList { files: vec![] }),
                        message: Some("Blob initialized and unlocked (standard volume)".into()),
                    };
                    (StatusCode::OK, Json(resp))
                }
                Err(e) => {
                    // Error Case 3: Failed unlock after init
                    let resp: ApiResponse<FileList> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to unlock after init: {}", e)),
                    };
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(resp))
                }
            }
        }
        Err(e) => {
            // Error Case 4: Failed init_blob
            let resp: ApiResponse<FileList> = ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Init error: {}", e)),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(resp))
        }
    }
}

async fn unlock_handler(
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<UnlockPayload>,
) -> impl IntoResponse {
    let mut guard = app_context.state.lock().unwrap();

    // --- Check if ALREADY unlocked ---
    if let Some(app) = guard.as_ref() {
        info!(
            "Unlock handler: Already unlocked with {:?}. Comparing passwords.",
            app.volume_type
        );
        // Already unlocked, check if the password matches THE STORED one
        if app.password == payload.password {
            // Check against the password used to unlock this session
            info!("Unlock handler: Provided password matches stored password for {:?}. Session confirmed.", app.volume_type);
            // Passwords match, return current state
            let files = app
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
                message: Some(format!(
                    "Already unlocked ({:?}), session confirmed",
                    app.volume_type
                )),
            };
            return (StatusCode::OK, Json(resp));
        } else {
            // Passwords don't match THE STORED one for the current session
            warn!("Unlock handler: Provided password does NOT match stored password for {:?}. Denying access.", app.volume_type);
            // We will NOT attempt to switch volumes here yet. First implement logout.
            let resp: ApiResponse<FileList> = ApiResponse {
                success: false,
                data: None,
                message: Some("Incorrect password".into()),
            };
            return (StatusCode::UNAUTHORIZED, Json(resp)); // Returns 401
        }
    }

    // --- Not unlocked, proceed with unlocking ---
    info!("Unlock handler: State is None, proceeding to call unlock_blob.");

    // Get blob path based on server mode
    let blob_path: PathBuf = match &app_context.mode {
        ServerMode::Single(path) => {
            // In single mode, use the configured path, ignore payload blob_name
            if payload.blob_name.is_some() {
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Cannot specify blob_name in single-blob mode".into()),
                };
                return (StatusCode::BAD_REQUEST, Json(resp));
            }
            path.clone()
        }
        ServerMode::Directory(dir) => {
            // In directory mode, require blob_name
            match payload.blob_name {
                Some(name) => {
                    if name.is_empty() {
                        let resp: ApiResponse<FileList> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some("blob_name cannot be empty".into()),
                        };
                        return (StatusCode::BAD_REQUEST, Json(resp));
                    }
                    let blob_path = dir.join(&name);
                    // Check if file exists
                    if !blob_path.exists() {
                        let resp: ApiResponse<FileList> = ApiResponse {
                            success: false,
                            data: None,
                            message: Some(format!("Blob file {} not found", name)),
                        };
                        return (StatusCode::NOT_FOUND, Json(resp));
                    }
                    blob_path
                }
                None => {
                    let resp: ApiResponse<FileList> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some("blob_name required in directory mode".into()),
                    };
                    return (StatusCode::BAD_REQUEST, Json(resp));
                }
            }
        }
    };

    println!("Unlocking blob at: {}", blob_path.display());

    // Unlock blob and get metadata
    match unlock_blob(&blob_path, &payload.password) {
        Ok((volume_type, key, metadata)) => {
            // Destructure volume_type, key, and metadata
            info!(
                "Unlock handler: unlock_blob succeeded for {:?}. Storing state.",
                volume_type
            );
            // Convert metadata to file list
            let files = metadata
                .iter()
                .map(|(path, meta)| FileInfo {
                    path: path.clone(),
                    size: meta.size as usize,
                })
                .collect();

            *guard = Some(AppState {
                password: payload.password.clone(), // Store the password that successfully unlocked THIS volume
                blob_path: blob_path.clone(),
                metadata,
                derived_key: key,
                volume_type, // Store the volume type
            });

            let resp: ApiResponse<FileList> = ApiResponse {
                success: true,
                data: Some(FileList { files }),
                message: Some(format!("Unlocked {:?} volume", volume_type)),
            };
            return (StatusCode::OK, Json(resp));
        }
        Err(e) => {
            // unlock_blob failed for BOTH volumes
            error!("Unlock handler: unlock_blob failed: {}. Responding 401.", e);
            let resp: ApiResponse<FileList> = ApiResponse {
                success: false,
                data: None,
                message: Some("Invalid password or corrupt blob".into()),
            };
            return (StatusCode::UNAUTHORIZED, Json(resp));
        }
    }
}

async fn logout_handler(Extension(app_context): Extension<AppContext>) -> impl IntoResponse {
    info!("Logout request received.");
    let mut guard = app_context.state.lock().unwrap();
    if guard.is_some() {
        *guard = None; // Clear the state
        info!("Server state cleared successfully.");
        let resp: ApiResponse<()> = ApiResponse {
            success: true,
            data: None,
            message: Some("Logged out successfully".into()),
        };
        (StatusCode::OK, Json(resp))
    } else {
        warn!("Logout attempt when already logged out.");
        // Still return success, as the desired state (logged out) is achieved
        let resp: ApiResponse<()> = ApiResponse {
            success: true,
            data: None,
            message: Some("Already logged out".into()),
        };
        (StatusCode::OK, Json(resp))
    }
}

async fn tree_handler(Extension(app_context): Extension<AppContext>) -> impl IntoResponse {
    let guard = app_context.state.lock().unwrap();
    if let Some(app) = &*guard {
        let files = app
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
        return (StatusCode::OK, Json(resp));
    } else {
        let resp: ApiResponse<FileList> = ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
        return (StatusCode::FORBIDDEN, Json(resp));
    }
}

async fn rename_handler(
    Extension(app_context): Extension<AppContext>,
    Json(payload): Json<RenamePayload>,
) -> impl IntoResponse {
    let mut guard = app_context.state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
        return (StatusCode::FORBIDDEN, Json(resp));
    }
    let app = guard.as_mut().unwrap();

    // Pass volume_type to rename_file
    match rename_file(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &payload.old_path,
        &payload.new_path,
    ) {
        Ok(true) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: true,
                data: None,
                message: None,
            };
            return (StatusCode::OK, Json(resp));
        }
        Ok(false) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some("File not found".into()),
            };
            return (StatusCode::NOT_FOUND, Json(resp));
        }
        Err(e) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Rename error: {}", e)),
            };
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
        }
    }
}

async fn delete_handler(
    Extension(app_context): Extension<AppContext>,
    Query(params): Query<DeleteParams>,
) -> impl IntoResponse {
    let mut guard = app_context.state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
        return (StatusCode::FORBIDDEN, Json(resp));
    }
    let app = guard.as_mut().unwrap();

    // Pass volume_type to remove_file
    match remove_file(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &params.path,
    ) {
        Ok(true) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: true,
                data: None,
                message: None,
            };
            return (StatusCode::OK, Json(resp));
        }
        Ok(false) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some("File not found".into()),
            };
            return (StatusCode::NOT_FOUND, Json(resp));
        }
        Err(e) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Delete error: {}", e)),
            };
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
        }
    }
}

async fn delete_folder_handler(
    Extension(app_context): Extension<AppContext>,
    Query(params): Query<DeleteParams>,
) -> impl IntoResponse {
    let mut guard = app_context.state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
        return (StatusCode::FORBIDDEN, Json(resp));
    }
    let app = guard.as_mut().unwrap();

    // Pass volume_type to remove_folder
    match remove_folder(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &params.path,
    ) {
        Ok(true) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: true,
                data: None,
                message: None,
            };
            return (StatusCode::OK, Json(resp));
        }
        Ok(false) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some("Folder not found".into()),
            };
            return (StatusCode::NOT_FOUND, Json(resp));
        }
        Err(e) => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Delete error: {}", e)),
            };
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
        }
    }
}

async fn download_handler(
    Extension(app_context): Extension<AppContext>,
    Query(params): Query<DownloadParams>,
) -> impl IntoResponse {
    let guard = app_context.state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
        return (StatusCode::FORBIDDEN, Json(resp)).into_response();
    }
    let app = guard.as_ref().unwrap();

    // Look up file metadata by path
    match app.metadata.get(&params.path) {
        Some(metadata) => {
            // Read file data outside of the lock
            match get_file(&app.blob_path, &app.derived_key, metadata) {
                Ok(content) => {
                    let mime = from_path(&params.path).first_or_octet_stream();
                    return Response::builder()
                        .status(StatusCode::OK)
                        .header(CONTENT_TYPE, mime.as_ref())
                        .header(
                            CONTENT_DISPOSITION,
                            format!("inline; filename=\"{}\"", params.path),
                        )
                        .body(axum::body::Body::from(content))
                        .unwrap()
                        .into_response();
                }
                Err(e) => {
                    let resp: ApiResponse<()> = ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Error reading file: {}", e)),
                    };
                    return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response();
                }
            }
        }
        None => {
            let resp: ApiResponse<()> = ApiResponse {
                success: false,
                data: None,
                message: Some("File not found".into()),
            };
            return (StatusCode::NOT_FOUND, Json(resp)).into_response();
        }
    }
}

// Batch upload handler
async fn batch_upload_handler(
    Extension(app_context): Extension<AppContext>,
    Query(batch_info): Query<BatchInfo>,
    mut multipart: Multipart,
) -> impl IntoResponse {
    // Use a static map to store files between batches
    use once_cell::sync::Lazy;
    use std::collections::HashMap;
    use std::sync::Mutex;

    static BATCH_FILES: Lazy<Mutex<HashMap<String, Vec<(String, Vec<u8>)>>>> =
        Lazy::new(|| Mutex::new(HashMap::new()));

    println!(
        "Batch upload started, batch_id: {}, is_final: {}",
        batch_info.batch_id, batch_info.is_final_batch
    );

    // Get the app state reference (but don't lock the state yet)
    let is_locked = {
        let guard = app_context.state.lock().unwrap();
        guard.is_none()
    };

    if is_locked {
        let resp: ApiResponse<FileList> = ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
        return (StatusCode::FORBIDDEN, Json(resp));
    }

    // Extract blob_path before processing files
    let blob_path = {
        let guard = app_context.state.lock().unwrap();
        guard.as_ref().unwrap().blob_path.clone()
    };

    let mut file_count = 0;
    let mut total_size = 0;
    let mut current_batch_files: Vec<(String, Vec<u8>)> = Vec::new();

    // Process multipart data
    while let Ok(Some(field)) = multipart.next_field().await {
        if let Some(name) = field.name() {
            if name == "file" {
                match field.file_name() {
                    Some(fname) => {
                        let fname_owned = fname.to_string();
                        println!("Processing file: {}", fname_owned);

                        match field.bytes().await {
                            Ok(data) => {
                                let size = data.len();
                                total_size += size;
                                println!("Received file: {} ({} bytes)", fname_owned, size);
                                current_batch_files.push((fname_owned, data.to_vec()));
                                file_count += 1;
                            }
                            Err(e) => {
                                println!("Error reading file data: {}", e);
                                let resp: ApiResponse<FileList> = ApiResponse {
                                    success: false,
                                    data: None,
                                    message: Some(format!("Error reading file data: {}", e)),
                                };
                                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                            }
                        }
                    }
                    None => {
                        println!("File field without filename");
                    }
                }
            }
        }
    }

    println!(
        "Processed {} files, total size: {} bytes",
        file_count, total_size
    );

    // Store the files in the batch map
    {
        let mut batch_map = BATCH_FILES.lock().unwrap();
        let batch_files = batch_map
            .entry(batch_info.batch_id.clone())
            .or_insert_with(Vec::new);
        batch_files.extend(current_batch_files);

        println!(
            "Added to batch {}, total files so far: {}",
            batch_info.batch_id,
            batch_files.len()
        );
    }

    // If this is the final batch, save all files to the blob
    if batch_info.is_final_batch {
        println!("Final batch received, saving all files to blob");

        // Get all files for this batch
        let all_batch_files = {
            let mut batch_map = BATCH_FILES.lock().unwrap();
            batch_map.remove(&batch_info.batch_id).unwrap_or_default()
        };

        println!("Retrieved {} files for final save", all_batch_files.len());

        // Lock state
        let mut guard = match app_context.state.lock() {
            Ok(guard) => guard,
            Err(e) => {
                println!("Failed to acquire lock: {}", e);
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Server error: failed to acquire lock")),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
            }
        };

        let app = match guard.as_mut() {
            Some(app) => app,
            None => {
                println!("App state is None while holding lock");
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Server error: app state is invalid")),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
            }
        };

        // Add each file to the blob
        for (path, content) in all_batch_files {
            // Determine mime type
            let mime_type = from_path(&path).first_or_octet_stream().to_string();

            // Add file to the blob, passing volume_type
            if let Err(e) = add_file(
                &app.blob_path,
                app.volume_type,
                &app.derived_key,
                &mut app.metadata,
                &path,
                &content,
                &mime_type,
            ) {
                println!("Error adding file {}: {}", path, e);
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Error adding file {}: {}", path, e)),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
            }
        }

        println!("All files saved successfully");

        // Return updated list
        let files = app
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
        return (StatusCode::OK, Json(resp));
    }

    // For non-final batches, just return success
    let resp: ApiResponse<FileList> = ApiResponse {
        success: true,
        data: None,
        message: None,
    };
    (StatusCode::OK, Json(resp))
}

// Upload handler
async fn upload_handler(
    Extension(app_context): Extension<AppContext>,
    mut multipart: Multipart,
) -> impl IntoResponse {
    // Check if state is locked and extract necessary info
    let blob_path = {
        let guard = app_context.state.lock().unwrap();
        if guard.is_none() {
            let resp: ApiResponse<FileList> = ApiResponse {
                success: false,
                data: None,
                message: Some("Locked".into()),
            };
            return (StatusCode::FORBIDDEN, Json(resp));
        }
        guard.as_ref().unwrap().blob_path.clone()
    };

    println!("Upload started, processing multipart data");
    let mut file_count = 0;
    let mut total_size = 0;
    let mut uploaded_files: Vec<(String, Vec<u8>)> = Vec::new();

    // Process multipart without holding the lock
    while let Ok(Some(field)) = multipart.next_field().await {
        if let Some(name) = field.name() {
            if name == "file" {
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
                                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                            }
                        }
                    }
                    None => {
                        println!("File field without filename");
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
        // Now lock the state and update files
        let mut guard = match app_context.state.lock() {
            Ok(guard) => guard,
            Err(e) => {
                println!("Failed to acquire lock: {}", e);
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Server error: failed to acquire lock")),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
            }
        };

        let app = match guard.as_mut() {
            Some(app) => app,
            None => {
                println!("App state is None while holding lock");
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Server error: app state is invalid")),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
            }
        };

        // Add each file to the blob
        for (path, content) in uploaded_files {
            // Determine mime type
            let mime_type = from_path(&path).first_or_octet_stream().to_string();

            // Add file to the blob, passing volume_type
            if let Err(e) = add_file(
                &app.blob_path,
                app.volume_type,
                &app.derived_key,
                &mut app.metadata,
                &path,
                &content,
                &mime_type,
            ) {
                println!("Error adding file {}: {}", path, e);
                let resp: ApiResponse<FileList> = ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Error adding file {}: {}", path, e)),
                };
                return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
            }
        }

        println!("Upload completed successfully");
    } else {
        println!("No files were uploaded");
    }

    // Return updated file list
    let files = {
        let guard = app_context.state.lock().unwrap();
        let app = guard.as_ref().unwrap();
        app.metadata
            .iter()
            .map(|(path, meta)| FileInfo {
                path: path.clone(),
                size: meta.size as usize,
            })
            .collect::<Vec<_>>()
    };

    let resp: ApiResponse<FileList> = ApiResponse {
        success: true,
        data: Some(FileList { files }),
        message: None,
    };
    (StatusCode::OK, Json(resp))
}
