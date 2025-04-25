mod blob;
mod state;

use axum::{
    extract::{Query, DefaultBodyLimit}, http::{header::{CONTENT_DISPOSITION, CONTENT_TYPE}, StatusCode}, response::{IntoResponse, Response}, routing::{delete, get, post}, Json,
};
use axum_extra::extract::Multipart;
use mime_guess::from_path;
use serde::{Serialize, Deserialize};
use std::{net::SocketAddr, sync::{Arc, Mutex}, path::PathBuf};
use tower_http::services::ServeDir;
use axum::extract::Extension;
use crate::blob::{MetadataMap, FileMetadata, init_blob, unlock_blob, add_file, get_file, remove_file, rename_file};
use crate::state::AppState;
use local_ip_address::local_ip;
use clap::Parser;
use rand::{rngs::OsRng, RngCore};

/// Command-line arguments
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Port to listen on
    #[arg(short, long, default_value_t = 3000)]
    port: u16,
    /// Blob file path
    #[arg(short, long, default_value = "data.blob")]
    blob: String,
}

// Shared application state
type SharedState = Arc<Mutex<Option<AppState>>>;

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

/// Init payload
#[derive(Deserialize)]
struct InitPayload {
    password: String,
}

/// Unlock payload
#[derive(Deserialize)]
struct UnlockPayload {
    password: String,
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

#[tokio::main]
async fn main() {
    let args = Args::parse();
    let blob_path: PathBuf = args.blob.into();
    let state: SharedState = Arc::new(Mutex::new(None));

    let app = axum::Router::new()
        .route("/api/init", post(init_handler))
        .route("/api/unlock", post(unlock_handler))
        .route("/api/tree", get(tree_handler))
        .route("/api/batch-upload", post({
            let state = state.clone();
            async move |Query(batch_info): Query<BatchInfo>, mut multipart: Multipart| {
                // Use a static map to store files between batches
                use std::collections::HashMap;
                use std::sync::Mutex;
                use once_cell::sync::Lazy;
                
                static BATCH_FILES: Lazy<Mutex<HashMap<String, Vec<(String, Vec<u8>)>>>> = 
                    Lazy::new(|| Mutex::new(HashMap::new()));
                
                println!("Batch upload started, batch_id: {}, is_final: {}", 
                          batch_info.batch_id, batch_info.is_final_batch);
                
                // Get the app state reference (but don't lock the state yet)
                let is_locked = {
                    let guard = state.lock().unwrap();
                    guard.is_none()
                };
                
                if is_locked {
                    let resp: ApiResponse<FileList> = ApiResponse { 
                        success: false, 
                        data: None, 
                        message: Some("Locked".into()) 
                    };
                    return (StatusCode::FORBIDDEN, Json(resp));
                }
                
                // Extract blob_path before processing files
                let blob_path = {
                    let guard = state.lock().unwrap();
                    guard.as_ref().unwrap().blob_path.clone()
                };
                
                let mut file_count = 0;
                let mut total_size = 0;
                let mut current_batch_files = Vec::new();
                
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
                                        },
                                        Err(e) => {
                                            println!("Error reading file data: {}", e);
                                            let resp: ApiResponse<FileList> = ApiResponse { 
                                                success: false, 
                                                data: None, 
                                                message: Some(format!("Error reading file data: {}", e)) 
                                            };
                                            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                                        }
                                    }
                                },
                                None => {
                                    println!("File field without filename");
                                }
                            }
                        }
                    }
                }
                
                println!("Processed {} files, total size: {} bytes", file_count, total_size);
                
                // Store the files in the batch map
                {
                    let mut batch_map = BATCH_FILES.lock().unwrap();
                    let batch_files = batch_map.entry(batch_info.batch_id.clone())
                        .or_insert_with(Vec::new);
                    batch_files.extend(current_batch_files);
                    
                    println!("Added to batch {}, total files so far: {}", 
                              batch_info.batch_id, batch_files.len());
                }
                
                // If this is the final batch, save all files to the blob
                if batch_info.is_final_batch {
                    println!("Final batch received, saving all files to blob");
                    
                    // Get all files for this batch
                    let all_batch_files = {
                        let mut batch_map = BATCH_FILES.lock().unwrap();
                        batch_map.remove(&batch_info.batch_id)
                                 .unwrap_or_default()
                    };
                    
                    println!("Retrieved {} files for final save", all_batch_files.len());
                    
                    // Lock state
                    let mut guard = match state.lock() {
                        Ok(guard) => guard,
                        Err(e) => {
                            println!("Failed to acquire lock: {}", e);
                            let resp: ApiResponse<FileList> = ApiResponse { 
                                success: false, 
                                data: None, 
                                message: Some(format!("Server error: failed to acquire lock")) 
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
                                message: Some(format!("Server error: app state is invalid")) 
                            };
                            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                        }
                    };
                    
                    // Add each file to the blob
                    for (path, content) in all_batch_files {
                        // Determine mime type
                        let mime_type = from_path(&path).first_or_octet_stream().to_string();
                        
                        // Add file to the blob
                        if let Err(e) = add_file(&app.blob_path, &app.derived_key, &mut app.metadata, &path, &content, &mime_type) {
                            println!("Error adding file {}: {}", path, e);
                            let resp: ApiResponse<FileList> = ApiResponse { 
                                success: false, 
                                data: None, 
                                message: Some(format!("Error adding file {}: {}", path, e)) 
                            };
                            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                        }
                    }
                    
                    println!("All files saved successfully");
                    
                    // Return updated list
                    let files = app.metadata.iter()
                                .map(|(path, meta)| FileInfo { path: path.clone(), size: meta.size as usize })
                                .collect::<Vec<_>>();
                    
                    let resp: ApiResponse<FileList> = ApiResponse { 
                        success: true, 
                        data: Some(FileList { files }), 
                        message: None 
                    };
                    return (StatusCode::OK, Json(resp));
                }
                
                // For non-final batches, just return success
                let resp: ApiResponse<FileList> = ApiResponse { 
                    success: true, 
                    data: None, 
                    message: None 
                };
                (StatusCode::OK, Json(resp))
            }
        }))
        .route("/api/upload", post({
            let state = state.clone();
            async move |mut multipart: Multipart| {
                // Check if state is locked and extract necessary info
                let blob_path = {
                    let guard = state.lock().unwrap();
                    if guard.is_none() {
                        let resp: ApiResponse<FileList> = ApiResponse { success: false, data: None, message: Some("Locked".into()) };
                        return (StatusCode::FORBIDDEN, Json(resp));
                    }
                    guard.as_ref().unwrap().blob_path.clone()
                };
                
                println!("Upload started, processing multipart data");
                let mut file_count = 0;
                let mut total_size = 0;
                let mut uploaded_files = Vec::new();
                
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
                                        },
                                        Err(e) => {
                                            println!("Error reading file data: {}", e);
                                            let resp: ApiResponse<FileList> = ApiResponse { 
                                                success: false, 
                                                data: None, 
                                                message: Some(format!("Error reading file data: {}", e)) 
                                            };
                                            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                                        }
                                    }
                                },
                                None => {
                                    println!("File field without filename");
                                }
                            }
                        }
                    }
                }
                
                println!("Processed {} files, total size: {} bytes", file_count, total_size);
                
                if !uploaded_files.is_empty() {
                    // Now lock the state and update files
                    let mut guard = match state.lock() {
                        Ok(guard) => guard,
                        Err(e) => {
                            println!("Failed to acquire lock: {}", e);
                            let resp: ApiResponse<FileList> = ApiResponse { 
                                success: false, 
                                data: None, 
                                message: Some(format!("Server error: failed to acquire lock")) 
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
                                message: Some(format!("Server error: app state is invalid")) 
                            };
                            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
                        }
                    };
                    
                    // Add each file to the blob
                    for (path, content) in uploaded_files {
                        // Determine mime type
                        let mime_type = from_path(&path).first_or_octet_stream().to_string();
                        
                        // Add file to the blob
                        if let Err(e) = add_file(&app.blob_path, &app.derived_key, &mut app.metadata, &path, &content, &mime_type) {
                            println!("Error adding file {}: {}", path, e);
                            let resp: ApiResponse<FileList> = ApiResponse { 
                                success: false, 
                                data: None, 
                                message: Some(format!("Error adding file {}: {}", path, e)) 
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
                    let guard = state.lock().unwrap();
                    let app = guard.as_ref().unwrap();
                    app.metadata.iter()
                        .map(|(path, meta)| FileInfo { path: path.clone(), size: meta.size as usize })
                        .collect::<Vec<_>>()
                };
                
                let resp: ApiResponse<FileList> = ApiResponse { success: true, data: Some(FileList { files }), message: None };
                (StatusCode::OK, Json(resp))
            }
        }))
        .route("/api/rename", post(rename_handler))
        .route("/api/delete", delete(delete_handler))
        .route("/api/download", get(download_handler))
        .with_state(())
        .layer(DefaultBodyLimit::max(100 * 1024 * 1024)) // 100MB limit
        .fallback_service(ServeDir::new("frontend/dist"))
        .layer(axum::extract::Extension(state.clone()));

    let addr = format!("0.0.0.0:{}", args.port);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    let local_ip = local_ip().ok();
    println!("Listening on http://{}", addr);
    if let Some(ip) = local_ip {
        println!("Accessible on http://{}:{}", ip, args.port);
    } else {
        println!("(Could not determine LAN IP address)");
    }
    axum::serve(listener, app).await.unwrap();
}

async fn init_handler(
    Extension(state): Extension<SharedState>,
    Json(payload): Json<InitPayload>,
) -> impl IntoResponse {
    let mut guard = state.lock().unwrap();
    if guard.is_some() {
        let resp: ApiResponse<FileList> = ApiResponse { success: false, data: None, message: Some("Already initialized".into()) };
        return (StatusCode::BAD_REQUEST, Json(resp));
    }
    let blob_path = PathBuf::from(std::env::args().nth(1).unwrap_or_else(|| "data.blob".into()));
    let password = payload.password;
    
    // Initialize new blob
    match init_blob(&blob_path, &password) {
        Ok((key, metadata)) => {
            *guard = Some(AppState { 
                password, 
                blob_path: blob_path.clone(), 
                metadata,
                derived_key: key,
            });
            let resp: ApiResponse<FileList> = ApiResponse { success: true, data: Some(FileList{ files: vec![] }), message: None };
            return (StatusCode::OK, Json(resp));
        }
        Err(e) => {
            let resp: ApiResponse<FileList> = ApiResponse { success: false, data: None, message: Some(format!("Init error: {}", e)) };
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
        }
    }
}

async fn unlock_handler(
    Extension(state): Extension<SharedState>,
    Json(payload): Json<UnlockPayload>,
) -> impl IntoResponse {
    let mut guard = state.lock().unwrap();
    if let Some(app) = guard.as_ref() {
        // Already unlocked, check if the password matches
        if app.password == payload.password {
            // Passwords match, return current state
            let files = app.metadata.iter()
                .map(|(path, meta)| FileInfo{ path: path.clone(), size: meta.size as usize })
                .collect();
            let resp: ApiResponse<FileList> = ApiResponse { success: true, data: Some(FileList{ files }), message: Some("Already unlocked, session confirmed".into()) };
            return (StatusCode::OK, Json(resp));
        } else {
            // Passwords don't match
            let resp: ApiResponse<FileList> = ApiResponse { success: false, data: None, message: Some("Incorrect password".into()) };
            return (StatusCode::UNAUTHORIZED, Json(resp));
        }
    }

    // Not unlocked, proceed with unlocking
    let blob_path = PathBuf::from(std::env::args().nth(1).unwrap_or_else(|| "data.blob".into()));
    
    // Unlock blob and get metadata
    match unlock_blob(&blob_path, &payload.password) {
        Ok((key, metadata)) => {
            // Convert metadata to file list
            let files = metadata.iter()
                .map(|(path, meta)| FileInfo{ path: path.clone(), size: meta.size as usize })
                .collect();
            
            *guard = Some(AppState { 
                password: payload.password.clone(), 
                blob_path: blob_path.clone(), 
                metadata,
                derived_key: key,
            });
            
            let resp: ApiResponse<FileList> = ApiResponse { success: true, data: Some(FileList{ files }), message: None };
            return (StatusCode::OK, Json(resp));
        }
        Err(_) => {
            let resp: ApiResponse<FileList> = ApiResponse { success: false, data: None, message: Some("Invalid password or corrupt blob".into())};
            return (StatusCode::UNAUTHORIZED, Json(resp));
        }
    }
}

async fn tree_handler(
    Extension(state): Extension<SharedState>,
) -> impl IntoResponse {
    let guard = state.lock().unwrap();
    if let Some(app) = &*guard {
        let files = app.metadata.iter()
            .map(|(path, meta)| FileInfo{ path: path.clone(), size: meta.size as usize })
            .collect();
        let resp: ApiResponse<FileList> = ApiResponse { success: true, data: Some(FileList{ files }), message: None };
        return (StatusCode::OK, Json(resp));
    } else {
        let resp: ApiResponse<FileList> = ApiResponse { success: false, data: None, message: Some("Locked".into())};
        return (StatusCode::FORBIDDEN, Json(resp));
    }
}

async fn rename_handler(
    Extension(state): Extension<SharedState>,
    Json(payload): Json<RenamePayload>,
) -> impl IntoResponse {
    let mut guard = state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some("Locked".into())};
        return (StatusCode::FORBIDDEN, Json(resp));
    }
    let app = guard.as_mut().unwrap();
    
    match rename_file(&app.blob_path, &app.derived_key, &mut app.metadata, &payload.old_path, &payload.new_path) {
        Ok(true) => {
            let resp: ApiResponse<()> = ApiResponse{ success:true, data:None, message:None};
            return (StatusCode::OK, Json(resp));
        },
        Ok(false) => {
            let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some("File not found".into())};
            return (StatusCode::NOT_FOUND, Json(resp));
        },
        Err(e) => {
            let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some(format!("Rename error: {}", e))};
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
        }
    }
}

async fn delete_handler(
    Extension(state): Extension<SharedState>,
    Query(params): Query<DeleteParams>,
) -> impl IntoResponse {
    let mut guard = state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some("Locked".into())};
        return (StatusCode::FORBIDDEN, Json(resp));
    }
    let app = guard.as_mut().unwrap();
    
    match remove_file(&app.blob_path, &app.derived_key, &mut app.metadata, &params.path) {
        Ok(true) => {
            let resp: ApiResponse<()> = ApiResponse{ success:true, data:None, message:None};
            return (StatusCode::OK, Json(resp));
        },
        Ok(false) => {
            let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some("File not found".into())};
            return (StatusCode::NOT_FOUND, Json(resp));
        },
        Err(e) => {
            let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some(format!("Delete error: {}", e))};
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp));
        }
    }
}

async fn download_handler(
    Extension(state): Extension<SharedState>,
    Query(params): Query<DownloadParams>,
) -> impl IntoResponse {
    let guard = state.lock().unwrap();
    if guard.is_none() {
        let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some("Locked".into())};
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
                        .header(CONTENT_DISPOSITION, format!("inline; filename=\"{}\"", params.path))
                        .body(axum::body::Body::from(content))
                        .unwrap()
                        .into_response();
                },
                Err(e) => {
                    let resp: ApiResponse<()> = ApiResponse{ 
                        success:false, 
                        data:None, 
                        message:Some(format!("Error reading file: {}", e))
                    };
                    return (StatusCode::INTERNAL_SERVER_ERROR, Json(resp)).into_response();
                }
            }
        },
        None => {
            let resp: ApiResponse<()> = ApiResponse{ success:false, data:None, message:Some("File not found".into())};
            return (StatusCode::NOT_FOUND, Json(resp)).into_response();
        }
    }
}
