use encryption_core::{
    add_file, get_file, init_blob, remove_file, rename_file, unlock_blob, MetadataMap,
    VolumeType, remove_folder,
};
use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;
use rand::{rngs::OsRng, RngCore};
use hex;
use tauri::{AppHandle, Manager, Emitter};
use std::io::Write;

// iOS file picker removed - using directory mode instead

#[derive(Serialize)]
struct FileInfo {
    path: String,
    size: usize,
}

#[derive(Serialize)]
struct FileList {
    files: Vec<FileInfo>,
}

#[derive(Serialize)]
struct ApiResponse<T> {
    success: bool,
    data: Option<T>,
    message: Option<String>,
}

#[derive(Serialize)]
struct StatusResponse {
    status: String,
    mode: String,
    blob_path: Option<String>,        // for single mode  
    blob_dir: Option<String>,         // for directory mode
    available_blobs: Option<Vec<String>>, // for directory mode
    volume_type: Option<String>,
}

struct AppState {
    password: String,
    blob_path: PathBuf,
    metadata: MetadataMap,
    derived_key: [u8; 32],
    volume_type: VolumeType,
    #[allow(dead_code)]
    mode: ServerMode,
}

#[derive(Debug, Clone)]
enum ServerMode {
    Desktop,           // Full file system access (macOS/Windows/Linux)
    MobileDirectory,   // iOS/Android - use app sandbox directory
}

struct AppStateManager(Mutex<Option<AppState>>);

fn generate_random_hidden_password() -> String {
    let mut password_h_bytes = [0u8; 32];
    OsRng.fill_bytes(&mut password_h_bytes);
    format!("hidden_{}", hex::encode(password_h_bytes))
}

fn get_server_mode() -> ServerMode {
    #[cfg(any(target_os = "ios", target_os = "android"))]
    {
        ServerMode::MobileDirectory
    }
    #[cfg(not(any(target_os = "ios", target_os = "android")))]
    {
        ServerMode::Desktop
    }
}

fn get_blobs_directory(app_handle: &AppHandle) -> Result<PathBuf, String> {
    let docs_dir = app_handle.path().document_dir()
        .map_err(|e| format!("Failed to get documents directory: {}", e))?;
    let blobs_dir = docs_dir.join("blobs");
    
    // Create directory if it doesn't exist
    if !blobs_dir.exists() {
        std::fs::create_dir_all(&blobs_dir)
            .map_err(|e| format!("Failed to create blobs directory: {}", e))?;
    }
    
    Ok(blobs_dir)
}

#[tauri::command]
fn get_status(
    app_handle: AppHandle,
    state: State<AppStateManager>,
) -> ApiResponse<StatusResponse> {
    let guard = state.0.lock().unwrap();
    let mode = get_server_mode();
    
    if let Some(app_state) = &*guard {
        // Already unlocked
        let volume_type_str = match app_state.volume_type {
            VolumeType::Standard => "Standard",
            VolumeType::Hidden => "Hidden",
        };
        
        match mode {
            ServerMode::Desktop => {
                ApiResponse {
                    success: true,
                    data: Some(StatusResponse {
                        status: "ready".to_string(),
                        mode: "desktop".to_string(),
                        blob_path: Some(app_state.blob_path.to_string_lossy().to_string()),
                        blob_dir: None,
                        available_blobs: None,
                        volume_type: Some(volume_type_str.to_string()),
                    }),
                    message: None,
                }
            }
            ServerMode::MobileDirectory => {
                let blobs_dir = match get_blobs_directory(&app_handle) {
                    Ok(dir) => dir,
                    Err(e) => {
                        return ApiResponse {
                            success: false,
                            data: None,
                            message: Some(e),
                        }
                    }
                };
                
                // List available blobs
                let available_blobs = match std::fs::read_dir(&blobs_dir) {
                    Ok(entries) => {
                        let blobs: Vec<String> = entries
                            .filter_map(Result::ok)
                            .filter(|entry| entry.path().is_file())
                            .filter_map(|entry| {
                                let path = entry.path();
                                path.file_name().map(|name| name.to_string_lossy().into_owned())
                            })
                            .collect();
                        println!("[get_status] Ready state - Found {} blob files: {:?}", blobs.len(), blobs);
                        blobs
                    }
                    Err(e) => {
                        println!("[get_status] Ready state - Failed to read blobs directory: {}", e);
                        Vec::new()
                    },
                };
                
                ApiResponse {
                    success: true,
                    data: Some(StatusResponse {
                        status: "ready".to_string(),
                        mode: "directory".to_string(),
                        blob_path: None,
                        blob_dir: Some(blobs_dir.to_string_lossy().to_string()),
                        available_blobs: Some(available_blobs),
                        volume_type: Some(volume_type_str.to_string()),
                    }),
                    message: None,
                }
            }
        }
    } else {
        // Not unlocked yet
        match mode {
            ServerMode::Desktop => {
                ApiResponse {
                    success: true,
                    data: Some(StatusResponse {
                        status: "locked".to_string(),
                        mode: "desktop".to_string(),
                        blob_path: None,
                        blob_dir: None,
                        available_blobs: None,
                        volume_type: None,
                    }),
                    message: None,
                }
            }
            ServerMode::MobileDirectory => {
                let blobs_dir = match get_blobs_directory(&app_handle) {
                    Ok(dir) => dir,
                    Err(e) => {
                        return ApiResponse {
                            success: false,
                            data: None,
                            message: Some(e),
                        }
                    }
                };
                
                // List available blobs
                let available_blobs = match std::fs::read_dir(&blobs_dir) {
                    Ok(entries) => {
                        let blobs: Vec<String> = entries
                            .filter_map(Result::ok)
                            .filter(|entry| entry.path().is_file())
                            .filter_map(|entry| {
                                let path = entry.path();
                                path.file_name().map(|name| name.to_string_lossy().into_owned())
                            })
                            .collect();
                        println!("[get_status] Locked state - Found {} blob files: {:?}", blobs.len(), blobs);
                        blobs
                    }
                    Err(e) => {
                        println!("[get_status] Locked state - Failed to read blobs directory: {}", e);
                        Vec::new()
                    },
                };
                
                ApiResponse {
                    success: true,
                    data: Some(StatusResponse {
                        status: "locked".to_string(),
                        mode: "directory".to_string(),
                        blob_path: None,
                        blob_dir: Some(blobs_dir.to_string_lossy().to_string()),
                        available_blobs: Some(available_blobs),
                        volume_type: None,
                    }),
                    message: None,
                }
            }
        }
    }
}

#[tauri::command(rename_all = "snake_case")]
fn init_encryption(
    app_handle: AppHandle,
    state: State<AppStateManager>,
    password_s: String,
    password_h: Option<String>,
    blob_path: Option<String>,
    blob_name: Option<String>,
) -> ApiResponse<FileList> {
    let mut guard = state.0.lock().unwrap();

    if guard.is_some() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some("Already initialized".into()),
        };
    }

    let mode = get_server_mode();
    
    let blob_path_buf = match mode {
        ServerMode::Desktop => {
            // Desktop mode: use provided path or default
            match blob_path {
                Some(path) => PathBuf::from(path),
                None => PathBuf::from("data.blob"), // Default for desktop
            }
        }
        ServerMode::MobileDirectory => {
            // Mobile directory mode: use blobs directory with provided or default name
            let blobs_dir = match get_blobs_directory(&app_handle) {
                Ok(dir) => dir,
                Err(e) => {
                    return ApiResponse {
                        success: false,
                        data: None,
                        message: Some(e),
                    }
                }
            };
            
            let filename = match blob_name {
                Some(name) if !name.trim().is_empty() => name.trim().to_string(),
                _ => "data.blob".to_string(), // Default filename
            };
            
            blobs_dir.join(filename)
        }
    };

    let password_h_final: String;
    match password_h {
        Some(ph) if !ph.trim().is_empty() => {
            if ph == password_s {
                return ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Standard and hidden passwords must be different".into()),
                };
            }
            password_h_final = ph;
        }
        _ => {
            password_h_final = generate_random_hidden_password();
        }
    }

    match init_blob(&blob_path_buf, &password_s, &password_h_final) {
        Ok(()) => {
            match unlock_blob(&blob_path_buf, &password_s) {
                Ok((volume_type, key, metadata)) => {
                    *guard = Some(AppState {
                        password: password_s,
                        blob_path: blob_path_buf.clone(),
                        metadata,
                        derived_key: key,
                        volume_type,
                        mode: mode.clone(),
                    });

                    ApiResponse {
                        success: true,
                        data: Some(FileList { files: Vec::new() }),
                        message: Some(format!("Blob initialized and unlocked ({:?}) at '{}'", volume_type, blob_path_buf.display())),
                    }
                }
                Err(e) => {
                     let _ = fs::remove_file(&blob_path_buf);
                     ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to unlock after init: {}. Blob path: '{}'", e, blob_path_buf.display())),
                    }
                }
            }
        }
        Err(e) => {
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Init error (core) for path '{}': {}", blob_path_buf.display(), e)),
            }
        }
    }
}

#[tauri::command(rename_all = "snake_case")]
fn unlock_encryption(
    app_handle: AppHandle,
    state: State<AppStateManager>,
    password: String,
    blob_path: Option<String>,
    blob_name: Option<String>,
) -> ApiResponse<FileList> {
    // ===== COMPREHENSIVE DEBUG LOGGING =====
    println!("=== UNLOCK_ENCRYPTION DEBUG START ===");
    println!("[unlock_encryption] Function called with parameters:");
    println!("  - password: [HIDDEN] (length: {})", password.len());
    println!("  - blob_path: {:?}", blob_path);
    println!("  - blob_name: {:?}", blob_name);
    println!("  - blob_name is_some(): {}", blob_name.is_some());
    
    if let Some(ref name) = blob_name {
        println!("  - blob_name unwrapped: '{}'", name);
        println!("  - blob_name length: {}", name.len());
        println!("  - blob_name bytes: {:?}", name.as_bytes());
        println!("  - blob_name.trim(): '{}'", name.trim());
        println!("  - blob_name.trim().len(): {}", name.trim().len());
        println!("  - blob_name.trim().is_empty(): {}", name.trim().is_empty());
        println!("  - !blob_name.trim().is_empty(): {}", !name.trim().is_empty());
    }
    println!("=== UNLOCK_ENCRYPTION DEBUG END ===");
    // ===== END DEBUG LOGGING =====
    
    let mut guard = state.0.lock().unwrap();

    let mode = get_server_mode();
    println!("[unlock_encryption] Server mode: {:?}", mode);
    
    let blob_path_buf = match mode {
        ServerMode::Desktop => {
            // Desktop mode: use provided path 
            match blob_path {
                Some(path) => PathBuf::from(path),
                None => {
                    return ApiResponse {
                        success: false,
                        data: None,
                        message: Some("Blob path required for desktop mode".to_string()),
                    }
                }
            }
        }
        ServerMode::MobileDirectory => {
            // Mobile directory mode: use blobs directory with selected blob name
            let blobs_dir = match get_blobs_directory(&app_handle) {
                Ok(dir) => dir,
                Err(e) => {
                    return ApiResponse {
                        success: false,
                        data: None,
                        message: Some(e),
                    }
                }
            };
            
            println!("[unlock_encryption] MobileDirectory mode, checking blob_name...");
            let filename = match blob_name {
                Some(name) if !name.trim().is_empty() => {
                    println!("[unlock_encryption] blob_name validation PASSED: '{}'", name.trim());
                    name.trim().to_string()
                },
                Some(name) => {
                    println!("[unlock_encryption] blob_name validation FAILED - empty after trim: '{}'", name);
                    return ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Blob name is empty after trim. Original: '{}', Trimmed: '{}'", name, name.trim())),
                    }
                },
                None => {
                    println!("[unlock_encryption] blob_name validation FAILED - None value");
                    return ApiResponse {
                        success: false,
                        data: None,
                        message: Some("Blob name required for mobile directory mode".to_string()),
                    }
                }
            };
            
            println!("[unlock_encryption] Using filename: '{}'", filename);
            blobs_dir.join(filename)
        }
    };

    println!("[unlock_encryption] Final blob_path_buf: {}", blob_path_buf.display());
    println!("=== UNLOCK_ENCRYPTION MOBILE DEBUG END ===");

    if let Some(app) = guard.as_ref() {
        println!("=== CHECKING FOR EXISTING SESSION ===");
        println!("[unlock_encryption] Current session blob_path: {}", app.blob_path.display());
        println!("[unlock_encryption] New request blob_path: {}", blob_path_buf.display());
        
        // Enhanced path comparison for iOS file:// URLs
        let paths_match = {
            #[cfg(target_os = "ios")]
            {
                // Compare canonical paths on iOS to handle file:// URL differences
                let current_canonical = app.blob_path.canonicalize().unwrap_or_else(|_| app.blob_path.clone());
                let new_canonical = blob_path_buf.canonicalize().unwrap_or_else(|_| blob_path_buf.clone());
                println!("[unlock_encryption] Current canonical: {}", current_canonical.display());
                println!("[unlock_encryption] New canonical: {}", new_canonical.display());
                println!("[unlock_encryption] Canonical paths match: {}", current_canonical == new_canonical);
                current_canonical == new_canonical
            }
            #[cfg(not(target_os = "ios"))]
            {
                app.blob_path == blob_path_buf
            }
        };
        
        println!("[unlock_encryption] Paths match result: {}", paths_match);
        
        if paths_match {
            if app.password == password {
                let files = app
                    .metadata
                    .iter()
                    .map(|(path, meta)| FileInfo {
                        path: path.clone(),
                        size: meta.size as usize,
                    })
                    .collect();

                return ApiResponse {
                    success: true,
                    data: Some(FileList { files }),
                    message: Some(format!(
                        "Already unlocked ({:?}) at '{}', session confirmed",
                        app.volume_type,
                        app.blob_path.display()
                    )),
                };
            } else {
                return ApiResponse {
                    success: false,
                    data: None,
                    message: Some("Incorrect password for current session".into()),
                };
            }
        } else {
            return ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Another blob ('{}') is currently open. Please logout first.", app.blob_path.display())),
            };
        }
    }

    println!("=== CALLING UNLOCK_BLOB ===");
    println!("[unlock_encryption] About to call unlock_blob with path: {}", blob_path_buf.display());
    println!("[unlock_encryption] Password length: {}", password.len());
    
    match unlock_blob(&blob_path_buf, &password) {
        Ok((volume_type, key, metadata)) => {
            println!("[unlock_encryption] ✅ Successfully unlocked {:?} volume", volume_type);
            println!("[unlock_encryption] Metadata contains {} files", metadata.len());
            
            let files = metadata
                .iter()
                .map(|(path, meta)| FileInfo {
                    path: path.clone(),
                    size: meta.size as usize,
                })
                .collect();

            *guard = Some(AppState {
                password,
                blob_path: blob_path_buf.clone(),
                metadata,
                derived_key: key,
                volume_type,
                mode: mode.clone(),
            });

            println!("[unlock_encryption] ✅ State updated successfully");

            ApiResponse {
                success: true,
                data: Some(FileList { files }),
                message: Some(format!("Unlocked {:?} volume at '{}'", volume_type, blob_path_buf.display())),
            }
        }
        Err(e) => {
            println!("[unlock_encryption] ❌ Failed to unlock blob: {}", e);
            println!("[unlock_encryption] Path used: {}", blob_path_buf.display());
            
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Invalid password or corrupt blob at '{}': {}", blob_path_buf.display(), e)),
            }
        },
    }
}

#[tauri::command]
fn logout_encryption(state: State<AppStateManager>) -> ApiResponse<()> {
    let mut guard = state.0.lock().unwrap();
    if guard.is_some() {
        *guard = None;
        ApiResponse {
            success: true,
            data: None,
            message: Some("Logged out successfully".into()),
        }
    } else {
        ApiResponse {
            success: true,
            data: None,
            message: Some("Already logged out".into()),
        }
    }
}

#[tauri::command]
fn get_file_tree(state: State<AppStateManager>) -> ApiResponse<FileList> {
    let guard = state.0.lock().unwrap();

    if let Some(app) = &*guard {
        let files = app
            .metadata
            .iter()
            .map(|(path, meta)| FileInfo {
                path: path.clone(),
                size: meta.size as usize,
            })
            .collect();

        ApiResponse {
            success: true,
            data: Some(FileList { files }),
            message: None,
        }
    } else {
        ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        }
    }
}

#[tauri::command]
async fn upload_file_data(
    state: State<'_, AppStateManager>,
    file_data: Vec<u8>,
    save_path: String,
) -> Result<ApiResponse<()>, String> {
    let mut guard = match state.0.lock() {
        Ok(guard) => guard,
        Err(_) => return Err("Failed to acquire lock".into()),
    };

    if guard.is_none() {
        return Ok(ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        });
    }

    let app = guard.as_mut().unwrap();

    let mime_type = mime_guess::from_path(&save_path)
        .first_or_octet_stream()
        .to_string();

    match add_file(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &save_path,
        &file_data,
        &mime_type,
    ) {
        Ok(_) => Ok(ApiResponse {
            success: true,
            data: None,
            message: None,
        }),
        Err(e) => Ok(ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Error adding file: {}", e)),
        }),
    }
}

#[tauri::command]
fn rename_file_in_blob(
    state: State<AppStateManager>,
    old_path: String,
    new_path: String,
) -> ApiResponse<()> {
    let mut guard = state.0.lock().unwrap();

    if guard.is_none() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
    }

    let app = guard.as_mut().unwrap();

    match rename_file(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &old_path,
        &new_path,
    ) {
        Ok(true) => ApiResponse {
            success: true,
            data: None,
            message: None,
        },
        Ok(false) => ApiResponse {
            success: false,
            data: None,
            message: Some("File not found".into()),
        },
        Err(e) => ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Rename error: {}", e)),
        },
    }
}

#[tauri::command]
fn delete_file_from_blob(state: State<AppStateManager>, path: String) -> ApiResponse<()> {
    let mut guard = state.0.lock().unwrap();

    if guard.is_none() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
    }

    let app = guard.as_mut().unwrap();

    match remove_file(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &path,
    ) {
        Ok(true) => ApiResponse {
            success: true,
            data: None,
            message: None,
        },
        Ok(false) => ApiResponse {
            success: false,
            data: None,
            message: Some("File not found".into()),
        },
        Err(e) => ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Delete error: {}", e)),
        },
    }
}

#[tauri::command]
fn delete_folder_from_blob(state: State<AppStateManager>, path: String) -> ApiResponse<()> {
    let mut guard = state.0.lock().unwrap();

    if guard.is_none() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some("Locked".into()),
        };
    }

    let app = guard.as_mut().unwrap();

    match remove_folder(
        &app.blob_path,
        app.volume_type,
        &app.derived_key,
        &mut app.metadata,
        &path,
    ) {
        Ok(true) => ApiResponse {
            success: true,
            data: None,
            message: None,
        },
        Ok(false) => ApiResponse {
            success: false,
            data: None,
            message: Some("Folder not found or empty".into()),
        },
        Err(e) => ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Delete folder error: {}", e)),
        },
    }
}

#[tauri::command]
fn download_file_from_blob(state: State<AppStateManager>, path: String) -> Result<Vec<u8>, String> {
    println!("[download_file_from_blob] Requested path: {}", path);
    let guard = state.0.lock().unwrap();

    if guard.is_none() {
        println!("[download_file_from_blob] ERROR: Locked state");
        return Err("Locked".into());
    }

    let app = guard.as_ref().unwrap();

    match app.metadata.get(&path) {
        Some(metadata) => {
            match get_file(&app.blob_path, &app.derived_key, metadata) {
                Ok(content) => {
                    println!("[download_file_from_blob] File content length: {}", content.len());
                    if content.is_empty() {
                        println!("[download_file_from_blob] ERROR: Decrypted file data is empty!");
                        Err("File data is empty after decryption".into())
                    } else {
                        Ok(content)
                    }
                },
                Err(e) => {
                    println!("[download_file_from_blob] ERROR reading file: {}", e);
                    Err(format!("Error reading file: {}", e))
                },
            }
        }
        None => {
            println!("[download_file_from_blob] ERROR: File not found in metadata");
            Err("File not found".into())
        },
    }
}

#[derive(Serialize, Clone)]
pub struct UploadProgress {
    pub current: usize,
    pub total: usize,
    pub filename: String,
}

#[derive(Serialize, Clone)]
struct UploadCompletionStatus {
    success: bool,
    total_files: usize,
    processed_files: usize,
    errors: Vec<String>,
}

#[tauri::command]
async fn upload_files_by_data(
    _state: State<'_, AppStateManager>,
    app: AppHandle,
    files: Vec<(String, Vec<u8>)>,
    save_paths: Vec<String>,
) -> Result<ApiResponse<()>, String> {
    let app_clone = app.clone();
    let files_clone = files;
    let save_paths_clone = save_paths;

    tauri::async_runtime::spawn(async move {
        let total = files_clone.len();
        let mut errors: Vec<String> = Vec::new();
        let mut processed_count = 0;

        let state_manager = app_clone.state::<AppStateManager>();
        let mut guard = match state_manager.0.lock() {
            Ok(guard) => guard,
            Err(e) => {
                let error_msg = format!("Failed to acquire lock in background task (data mode): {}", e);
                eprintln!("{}", error_msg);
                app_clone.emit("upload_error", error_msg).ok();
                return;
            }
        };

        if guard.is_none() {
            eprintln!("Background upload task aborted (data mode): Session is locked.");
            app_clone.emit("upload_error", "Upload failed: Session is locked.").ok();
            return;
        }

        let app_state = guard.as_mut().unwrap();

        for (i, ((filename, file_data), save_path)) in files_clone.into_iter().zip(save_paths_clone.into_iter()).enumerate() {
            let progress = UploadProgress {
                current: i + 1,
                total,
                filename: filename.clone(),
            };
            app_clone.emit("upload_progress", progress.clone()).ok();

            let mime_type = mime_guess::from_path(&save_path)
                .first_or_octet_stream()
                .to_string();

            match add_file(
                &app_state.blob_path,
                app_state.volume_type,
                &app_state.derived_key,
                &mut app_state.metadata,
                &save_path,
                &file_data,
                &mime_type,
            ) {
                Ok(_) => {
                    processed_count += 1;
                }
                Err(e) => {
                    let error_msg = format!("Error adding file '{}' (data mode): {}", filename, e);
                    eprintln!("{}", error_msg);
                    errors.push(error_msg);
                }
            }
        }

        drop(guard);

        let completion_payload = UploadCompletionStatus {
            success: errors.is_empty(),
            total_files: total,
            processed_files: processed_count,
            errors: errors,
        };
        app_clone.emit("upload_complete", completion_payload).ok();
    });

    Ok(ApiResponse {
        success: true,
        data: None,
        message: Some("Upload process started (data mode).".to_string()),
    })
}

#[tauri::command]
async fn upload_files_by_path(
    _state: State<'_, AppStateManager>,
    app: AppHandle,
    absolute_paths: Vec<String>,
    current_folder: String,
) -> Result<ApiResponse<()>, String> {
    #[cfg(any(target_os = "ios", target_os = "android"))]
    {
        return Err("Uploading by path is not supported on mobile platforms due to security restrictions. Please use the data upload method.".to_string());
    }

    #[cfg(not(any(target_os = "ios", target_os = "android")))]
    {
        let app_clone = app.clone();
        let paths_clone = absolute_paths.clone();
        let current_folder_clone = current_folder.clone();

        tauri::async_runtime::spawn(async move {
            let total = paths_clone.len();
            let mut errors: Vec<String> = Vec::new();
            let mut processed_count = 0;
            let state_manager = app_clone.state::<AppStateManager>();

            let mut guard = match state_manager.0.lock() {
                 Ok(guard) => guard,
                 Err(e) => {
                     let error_msg = format!("Failed to acquire lock in background task (path mode): {}", e);
                     eprintln!("{}", error_msg);
                     app_clone.emit("upload_error", error_msg).ok();
                     return;
                 }
            };

            if guard.is_none() {
                eprintln!("Background upload task aborted (path mode): Session is locked.");
                app_clone.emit("upload_error", "Upload failed: Session is locked.").ok();
                return;
            }
            let app_state = guard.as_mut().unwrap();

            for (i, absolute_path_str) in paths_clone.into_iter().enumerate() {
                 let absolute_path = PathBuf::from(&absolute_path_str);
                 let filename = absolute_path.file_name().map_or_else(|| absolute_path_str.clone(), |os| os.to_string_lossy().into_owned());
                 let save_path = if current_folder_clone.is_empty() {
                     filename.clone()
                 } else {
                     PathBuf::from(&current_folder_clone).join(&filename).to_string_lossy().into_owned()
                 };

                 let progress = UploadProgress { current: i + 1, total, filename: filename.clone() };
                 app_clone.emit("upload_progress", progress).ok();

                 match fs::read(&absolute_path) {
                     Ok(file_data) => {
                         let mime_type = mime_guess::from_path(&save_path).first_or_octet_stream().to_string();
                         if let Err(e) = add_file(&app_state.blob_path, app_state.volume_type, &app_state.derived_key, &mut app_state.metadata, &save_path, &file_data, &mime_type) {
                             let error_msg = format!("Add file failed for '{}': {}", save_path, e);
                             eprintln!("{}", error_msg);
                             errors.push(error_msg);
                         } else {
                             processed_count += 1;
                         }
                     },
                     Err(e) => {
                         let error_msg = format!("Read file failed for '{}': {}", absolute_path_str, e);
                         eprintln!("{}", error_msg);
                         errors.push(error_msg);
                     }
                 }
            }
            drop(guard);
            let completion_payload = UploadCompletionStatus { success: errors.is_empty(), total_files: total, processed_files: processed_count, errors };
            app_clone.emit("upload_complete", completion_payload).ok();
        });

        Ok(ApiResponse { success: true, data: None, message: Some("Upload started (path mode). Note: This only works on desktop.".to_string()) })
    }
}

// Command to list .blob files specifically in the app data directory (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn list_blobs_in_app_data(app_handle: AppHandle) -> ApiResponse<Vec<String>> {
    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => dir,
        Err(e) => return ApiResponse {
            success: false,
            data: None,
            message: Some(e),
        },
    };

    if !blobs_dir.exists() {
        // If the directory doesn't exist yet, there are no blobs
        return ApiResponse {
            success: true,
            data: Some(Vec::new()), 
            message: None,
        };
    }

    match fs::read_dir(&blobs_dir) {
        Ok(entries) => {
            let blob_files: Vec<String> = entries
                .filter_map(Result::ok) // Ignore entries that cause read errors
                .filter(|entry| entry.path().is_file()) // Only consider files
                .filter_map(|entry| {
                    let path = entry.path();
                    // Return all files (blob files can have any extension for privacy)
                    path.file_name().map(|name| name.to_string_lossy().into_owned())
                })
                .collect();

            ApiResponse {
                success: true,
                data: Some(blob_files),
                message: None,
            }
        }
        Err(e) => ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Failed to read blobs directory '{}': {}", blobs_dir.display(), e)),
        },
    }
}

// Command to start chunked blob import (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn start_blob_import(app_handle: AppHandle, target_name: String, file_size: u64) -> ApiResponse<String> {
    println!("[start_blob_import] Starting chunked import: {} bytes -> {}", file_size, target_name);
    
    // Basic validation: Ensure target name is safe
    if target_name.is_empty() || target_name.contains('/') || target_name.contains('\\') || target_name == "." || target_name == ".." {
         println!("[start_blob_import] Invalid target filename: {}", target_name);
         return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Invalid target filename provided: {}", target_name)),
        };
    }

    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => {
            println!("[start_blob_import] Blobs directory: {}", dir.display());
            dir
        },
        Err(e) => {
            println!("[start_blob_import] Failed to get blobs directory: {}", e);
            return ApiResponse {
                success: false,
                data: None,
                message: Some(e),
            };
        }
    };

    let target_path = blobs_dir.join(&target_name);
    println!("[start_blob_import] Target path: {}", target_path.display());

    // Check if target already exists
    if target_path.exists() {
        println!("[start_blob_import] Target already exists: {}", target_path.display());
        return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("A blob named '{}' already exists", target_name)),
        };
    }

    // Create temporary file for chunked writing
    let temp_path = target_path.with_extension("tmp");
    match std::fs::File::create(&temp_path) {
        Ok(_) => {
            println!("[start_blob_import] Created temporary file: {}", temp_path.display());
            ApiResponse {
                success: true,
                data: Some(temp_path.to_string_lossy().to_string()),
                message: Some(format!("Import session started for '{}' ({} bytes)", target_name, file_size)),
            }
        },
        Err(e) => {
            println!("[start_blob_import] Failed to create temporary file: {}", e);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to create temporary file: {}", e)),
            }
        },
    }
}

// Command to append chunk to blob import (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn append_blob_chunk(temp_path: String, chunk_data: Vec<u8>) -> ApiResponse<()> {
    println!("[append_blob_chunk] Appending {} bytes to {}", chunk_data.len(), temp_path);
    
    match std::fs::OpenOptions::new().append(true).open(&temp_path) {
        Ok(mut file) => {
            match file.write_all(&chunk_data) {
                Ok(_) => {
                    println!("[append_blob_chunk] Successfully appended {} bytes", chunk_data.len());
                    ApiResponse {
                        success: true,
                        data: None,
                        message: None,
                    }
                },
                Err(e) => {
                    println!("[append_blob_chunk] Failed to write chunk: {}", e);
                    ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to write chunk: {}", e)),
                    }
                },
            }
        },
        Err(e) => {
            println!("[append_blob_chunk] Failed to open temp file: {}", e);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to open temp file: {}", e)),
            }
        },
    }
}

// Command to finalize chunked blob import (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn finalize_blob_import(app_handle: AppHandle, temp_path: String, target_name: String) -> ApiResponse<()> {
    println!("[finalize_blob_import] Finalizing import: {} -> {}", temp_path, target_name);
    
    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => dir,
        Err(e) => {
            println!("[finalize_blob_import] Failed to get blobs directory: {}", e);
            // Clean up temp file on error
            let _ = std::fs::remove_file(&temp_path);
            return ApiResponse {
                success: false,
                data: None,
                message: Some(e),
            };
        }
    };

    let target_path = blobs_dir.join(&target_name);
    
    // Move temp file to final location
    match std::fs::rename(&temp_path, &target_path) {
        Ok(_) => {
            let file_size = std::fs::metadata(&target_path)
                .map(|m| m.len())
                .unwrap_or(0);
            println!("[finalize_blob_import] Successfully moved to final location: {} bytes", file_size);
            ApiResponse {
                success: true,
                data: None,
                message: Some(format!("Blob '{}' imported successfully ({} bytes)", target_name, file_size)),
            }
        },
        Err(e) => {
            println!("[finalize_blob_import] Failed to move temp file: {}", e);
            // Clean up temp file on error
            let _ = std::fs::remove_file(&temp_path);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to finalize import: {}", e)),
            }
        },
    }
}

// Command to cancel chunked blob import (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn cancel_blob_import(temp_path: String) -> ApiResponse<()> {
    println!("[cancel_blob_import] Canceling import: {}", temp_path);
    
    match std::fs::remove_file(&temp_path) {
        Ok(_) => {
            println!("[cancel_blob_import] Successfully removed temp file");
            ApiResponse {
                success: true,
                data: None,
                message: Some("Import canceled and temporary file removed".to_string()),
            }
        },
        Err(e) => {
            println!("[cancel_blob_import] Failed to remove temp file: {}", e);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to clean up temp file: {}", e)),
            }
        },
    }
}

// Legacy command for backward compatibility (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn import_blob_by_content(app_handle: AppHandle, file_content: Vec<u8>, target_name: String) -> ApiResponse<()> {
    println!("[import_blob_by_content] Legacy import: {} bytes -> {}", file_content.len(), target_name);
    
    // For files larger than 100MB, recommend using chunked import
    if file_content.len() > 100 * 1024 * 1024 {
        println!("[import_blob_by_content] Warning: Large file detected, consider using chunked import");
    }
    
    // Basic validation: Ensure target name is safe
    if target_name.is_empty() || target_name.contains('/') || target_name.contains('\\') || target_name == "." || target_name == ".." {
         println!("[import_blob_by_content] Invalid target filename: {}", target_name);
         return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Invalid target filename provided: {}", target_name)),
        };
    }

    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => {
            println!("[import_blob_by_content] Blobs directory: {}", dir.display());
            dir
        },
        Err(e) => {
            println!("[import_blob_by_content] Failed to get blobs directory: {}", e);
            return ApiResponse {
                success: false,
                data: None,
                message: Some(e),
            };
        }
    };

    let target_path = blobs_dir.join(&target_name);
    println!("[import_blob_by_content] Target path: {}", target_path.display());

    // Check if target already exists
    if target_path.exists() {
        println!("[import_blob_by_content] Target already exists: {}", target_path.display());
        return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("A blob named '{}' already exists", target_name)),
        };
    }

    // Write the content to the target location
    println!("[import_blob_by_content] Writing {} bytes to target", file_content.len());
    match std::fs::write(&target_path, &file_content) {
        Ok(_) => {
            println!("[import_blob_by_content] Successfully wrote {} bytes to target", file_content.len());
            ApiResponse {
                success: true,
                data: None,
                message: Some(format!("Blob '{}' imported successfully ({} bytes)", target_name, file_content.len())),
            }
        },
        Err(e) => {
            println!("[import_blob_by_content] Failed to write to target: {}", e);
            // Clean up partial file
            let _ = std::fs::remove_file(&target_path);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to write imported blob '{}': {}", target_name, e)),
            }
        },
    }
}

// Command to import a blob file into the blobs directory (Mobile Only - Legacy)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn import_blob_file(app_handle: AppHandle, source_path: String, target_name: String) -> ApiResponse<()> {
    println!("[import_blob_file] Starting import: {} -> {}", source_path, target_name);
    
    // Basic validation: Ensure target name is safe
    if target_name.is_empty() || target_name.contains('/') || target_name.contains('\\') || target_name == "." || target_name == ".." {
         println!("[import_blob_file] Invalid target filename: {}", target_name);
         return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Invalid target filename provided: {}", target_name)),
        };
    }

    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => {
            println!("[import_blob_file] Blobs directory: {}", dir.display());
            dir
        },
        Err(e) => {
            println!("[import_blob_file] Failed to get blobs directory: {}", e);
            return ApiResponse {
                success: false,
                data: None,
                message: Some(e),
            };
        }
    };

    let target_path = blobs_dir.join(&target_name);
    println!("[import_blob_file] Target path: {}", target_path.display());

    // Check if target already exists
    if target_path.exists() {
        println!("[import_blob_file] Target already exists: {}", target_path.display());
        return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("A blob named '{}' already exists", target_name)),
        };
    }

    // On iOS, we need to use Tauri's file system API instead of std::fs
    // because the source path might be in a sandboxed location
    println!("[import_blob_file] Reading source file using Tauri API: {}", source_path);
    
    // First, try to read the source file content
    let source_content = match std::fs::read(&source_path) {
        Ok(content) => {
            println!("[import_blob_file] Successfully read {} bytes from source", content.len());
            content
        },
        Err(e) => {
            println!("[import_blob_file] Failed to read source file with std::fs: {}", e);
            // On iOS, the path might be a file:// URL or need special handling
            // Try to handle file:// URLs
            let clean_path = if source_path.starts_with("file://") {
                source_path.strip_prefix("file://").unwrap_or(&source_path)
            } else {
                &source_path
            };
            
            println!("[import_blob_file] Trying cleaned path: {}", clean_path);
            match std::fs::read(clean_path) {
                Ok(content) => {
                    println!("[import_blob_file] Successfully read {} bytes from cleaned path", content.len());
                    content
                },
                Err(e2) => {
                    println!("[import_blob_file] Failed to read from cleaned path: {}", e2);
                    return ApiResponse {
                        success: false,
                        data: None,
                        message: Some(format!("Failed to read source file '{}': {} (cleaned path '{}': {})", source_path, e, clean_path, e2)),
                    };
                }
            }
        }
    };
    
    // Now write the content to the target location
    println!("[import_blob_file] Writing {} bytes to target: {}", source_content.len(), target_path.display());
    match std::fs::write(&target_path, &source_content) {
        Ok(_) => {
            println!("[import_blob_file] Successfully wrote {} bytes to target", source_content.len());
            ApiResponse {
                success: true,
                data: None,
                message: Some(format!("Blob '{}' imported successfully ({} bytes)", target_name, source_content.len())),
            }
        },
        Err(e) => {
            println!("[import_blob_file] Failed to write to target: {}", e);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to write imported blob '{}': {}", target_name, e)),
            }
        },
    }
}

// Command to delete a specific .blob file from the app data directory (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn delete_blob_from_app_data(app_handle: AppHandle, blob_filename: String) -> ApiResponse<()> {
    // Basic validation: Ensure filename is not empty and doesn't contain path separators
    if blob_filename.is_empty() || blob_filename.contains('/') || blob_filename.contains('\\') || blob_filename == "." || blob_filename == ".." {
         return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Invalid blob filename provided: {}", blob_filename)),
        };
    }

    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => dir,
        Err(e) => return ApiResponse {
            success: false,
            data: None,
            message: Some(e),
        },
    };

    let file_to_delete = blobs_dir.join(&blob_filename);

    if !file_to_delete.exists() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Blob file '{}' not found in blobs directory", blob_filename)),
        };
    }

    match fs::remove_file(&file_to_delete) {
        Ok(_) => ApiResponse {
            success: true,
            data: None,
            message: Some(format!("Blob file '{}' deleted successfully", blob_filename)),
        },
        Err(e) => ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Failed to delete blob file '{}': {}", file_to_delete.display(), e)),
        },
    }
}

// Command to export a blob file by content (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn export_blob_by_content(app_handle: AppHandle, blob_filename: String) -> ApiResponse<Vec<u8>> {
    println!("[export_blob_by_content] Starting export: {}", blob_filename);
    
    // Basic validation: Ensure filename is not empty and doesn't contain path separators
    if blob_filename.is_empty() || blob_filename.contains('/') || blob_filename.contains('\\') || blob_filename == "." || blob_filename == ".." {
         return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Invalid blob filename provided: {}", blob_filename)),
        };
    }

    let blobs_dir = match get_blobs_directory(&app_handle) {
        Ok(dir) => {
            println!("[export_blob_by_content] Blobs directory: {}", dir.display());
            dir
        },
        Err(e) => {
            println!("[export_blob_by_content] Failed to get blobs directory: {}", e);
            return ApiResponse {
                success: false,
                data: None,
                message: Some(e),
            };
        }
    };

    let source_path = blobs_dir.join(&blob_filename);
    println!("[export_blob_by_content] Source path: {}", source_path.display());

    // Check if source exists
    if !source_path.exists() {
        println!("[export_blob_by_content] Source does not exist: {}", source_path.display());
        return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Blob file '{}' not found in blobs directory", blob_filename)),
        };
    }

    // Read the content from the source location
    println!("[export_blob_by_content] Reading blob content");
    match std::fs::read(&source_path) {
        Ok(content) => {
            println!("[export_blob_by_content] Successfully read {} bytes", content.len());
            ApiResponse {
                success: true,
                data: Some(content.clone()),
                message: Some(format!("Blob '{}' exported successfully ({} bytes)", blob_filename, content.len())),
            }
        },
        Err(e) => {
            println!("[export_blob_by_content] Failed to read from source: {}", e);
            ApiResponse {
                success: false,
                data: None,
                message: Some(format!("Failed to read blob '{}': {}", blob_filename, e)),
            }
        },
    }
}

// iOS file picker commands removed - using directory mode instead

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_shell::init())
        // Consider if tauri_plugin_fs is still needed if only using std::fs and app_handle.path
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(AppStateManager(Mutex::new(None)));

    // Combine all handlers in a single call to avoid replacement
    let final_builder = builder.invoke_handler(
        {
            #[cfg(all(target_os = "ios"))]
            {
                tauri::generate_handler![
                    get_status,
                    init_encryption,
                    unlock_encryption,
                    logout_encryption,
                    get_file_tree,
                    upload_file_data,
                    rename_file_in_blob,
                    delete_file_from_blob,
                    delete_folder_from_blob,
                    download_file_from_blob,
                    upload_files_by_path,
                    upload_files_by_data,
                    list_blobs_in_app_data,
                    delete_blob_from_app_data,
                    import_blob_file,
                    import_blob_by_content,
                    export_blob_by_content,
                    start_blob_import,
                    append_blob_chunk,
                    finalize_blob_import,
                    cancel_blob_import
                ]
            }
            #[cfg(all(target_os = "android", not(target_os = "ios")))]
            {
                tauri::generate_handler![
                    get_status,
                    init_encryption,
                    unlock_encryption,
                    logout_encryption,
                    get_file_tree,
                    upload_file_data,
                    rename_file_in_blob,
                    delete_file_from_blob,
                    delete_folder_from_blob,
                    download_file_from_blob,
                    upload_files_by_path,
                    upload_files_by_data,
                    list_blobs_in_app_data,
                    delete_blob_from_app_data,
                    import_blob_file,
                    import_blob_by_content,
                    export_blob_by_content,
                    start_blob_import,
                    append_blob_chunk,
                    finalize_blob_import,
                    cancel_blob_import
                ]
            }
            #[cfg(not(any(target_os = "ios", target_os = "android")))]
            {
                tauri::generate_handler![
                    get_status,
                    init_encryption,
                    unlock_encryption,
                    logout_encryption,
                    get_file_tree,
                    upload_file_data,
                    rename_file_in_blob,
                    delete_file_from_blob,
                    delete_folder_from_blob,
                    download_file_from_blob,
                    upload_files_by_path,
                    upload_files_by_data
                ]
            }
        }
    );

    final_builder
        .setup(|app| {
            // Keep existing setup like logger
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
