use encryption_core::{
    add_file, get_file, init_blob, remove_file, rename_file, unlock_blob, FileMetadata, MetadataMap,
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
use std::io;
use tauri_plugin_fs::FsExt;
use std::io::Write;

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

struct AppState {
    password: String,
    blob_path: PathBuf,
    metadata: MetadataMap,
    derived_key: [u8; 32],
    volume_type: VolumeType,
}

struct AppStateManager(Mutex<Option<AppState>>);

fn generate_random_hidden_password() -> String {
    let mut password_h_bytes = [0u8; 32];
    OsRng.fill_bytes(&mut password_h_bytes);
    format!("hidden_{}", hex::encode(password_h_bytes))
}

#[tauri::command(rename_all = "snake_case")]
fn init_encryption(
    app_handle: AppHandle,
    state: State<AppStateManager>,
    password_s: String,
    password_h: Option<String>,
    blob_path: String,
) -> ApiResponse<FileList> {
    let mut guard = state.0.lock().unwrap();

    if guard.is_some() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some("Already initialized".into()),
        };
    }

    let blob_path_buf = {
        #[cfg(not(any(target_os = "ios", target_os = "android")))]
        {
            PathBuf::from(&blob_path)
        }
        
        #[cfg(any(target_os = "ios", target_os = "android"))]
        {
            let app_data_dir = match app_handle.path().app_data_dir() {
                 Ok(dir) => dir,
                 Err(e) => return ApiResponse {
                     success: false,
                     data: None,
                     message: Some(format!("Failed to get app data directory: {}", e)),
                 },
            };
            let blob_filename = match PathBuf::from(&blob_path).file_name() {
                Some(name) => name.to_os_string(),
                None => return ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Invalid blob filename provided: {}", blob_path)),
                },
            };
            let full_path = app_data_dir.join(blob_filename);

            if let Some(parent) = full_path.parent() {
                 if !parent.exists() {
                     if let Err(e) = std::fs::create_dir_all(parent) {
                          return ApiResponse {
                              success: false,
                              data: None,
                              message: Some(format!("Failed to create blob directory '{}': {}", parent.display(), e)),
                          };
                     }
                 }
            }
            println!("[init_encryption mobile] Using path: {}", full_path.display());
            full_path
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

#[tauri::command]
fn unlock_encryption(
    app_handle: AppHandle,
    state: State<AppStateManager>,
    password: String,
    blob_path: String,
) -> ApiResponse<FileList> {
    let mut guard = state.0.lock().unwrap();

    let blob_path_buf = {
        #[cfg(not(any(target_os = "ios", target_os = "android")))]
        {
            PathBuf::from(&blob_path)
        }
        #[cfg(any(target_os = "ios", target_os = "android"))]
        {
            let app_data_dir = match app_handle.path().app_data_dir() {
                 Ok(dir) => dir,
                 Err(e) => return ApiResponse {
                     success: false,
                     data: None,
                     message: Some(format!("Failed to get app data directory: {}", e)),
                 },
            };
            let blob_filename = match PathBuf::from(&blob_path).file_name() {
                Some(name) => name.to_os_string(),
                None => return ApiResponse {
                    success: false,
                    data: None,
                    message: Some(format!("Invalid blob filename provided: {}", blob_path)),
                },
            };
            let full_path = app_data_dir.join(blob_filename);
             println!("[unlock_encryption mobile] Using path: {}", full_path.display());
             full_path
        }
    };

    if let Some(app) = guard.as_ref() {
        if app.blob_path == blob_path_buf {
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

    match unlock_blob(&blob_path_buf, &password) {
        Ok((volume_type, key, metadata)) => {
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
            });

            ApiResponse {
                success: true,
                data: Some(FileList { files }),
                message: Some(format!("Unlocked {:?} volume at '{}'", volume_type, blob_path_buf.display())),
            }
        }
        Err(e) => ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Invalid password or corrupt blob at '{}': {}", blob_path_buf.display(), e)),
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
    state: State<'_, AppStateManager>,
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
    state: State<'_, AppStateManager>,
    app: AppHandle,
    absolute_paths: Vec<String>,
    current_folder: String,
) -> Result<ApiResponse<()>, String> {
    #[cfg(any(target_os = "ios", target_os = "android"))]
    {
        return Err("Uploading by path is not supported on mobile platforms due to security restrictions. Please use the data upload method.".to_string());
    }

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

// Command to list .blob files specifically in the app data directory (Mobile Only)
#[cfg(any(target_os = "ios", target_os = "android"))]
#[tauri::command]
fn list_blobs_in_app_data(app_handle: AppHandle) -> ApiResponse<Vec<String>> {
    let app_data_dir = match app_handle.path().app_data_dir() {
        Ok(dir) => dir,
        Err(e) => return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Failed to get app data directory: {}", e)),
        },
    };

    if !app_data_dir.exists() {
        // If the directory doesn't exist yet, there are no blobs
        return ApiResponse {
            success: true,
            data: Some(Vec::new()), 
            message: None,
        };
    }

    match fs::read_dir(&app_data_dir) {
        Ok(entries) => {
            let blob_files: Vec<String> = entries
                .filter_map(Result::ok) // Ignore entries that cause read errors
                .filter(|entry| entry.path().is_file()) // Only consider files
                .filter_map(|entry| {
                    let path = entry.path();
                    // Check if the file extension is ".blob" (adjust if needed)
                    if path.extension().map_or(false, |ext| ext == "blob") {
                        // Return the filename as a String
                        path.file_name().map(|name| name.to_string_lossy().into_owned())
                    } else {
                        None
                    }
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
            message: Some(format!("Failed to read app data directory '{}': {}", app_data_dir.display(), e)),
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
    // Ensure it has the correct extension
    if !blob_filename.ends_with(".blob") { // Adjust extension if needed
         return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Filename '{}' does not have the expected .blob extension", blob_filename)),
        };
    }

    let app_data_dir = match app_handle.path().app_data_dir() {
        Ok(dir) => dir,
        Err(e) => return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Failed to get app data directory: {}", e)),
        },
    };

    let file_to_delete = app_data_dir.join(&blob_filename);

    if !file_to_delete.exists() {
        return ApiResponse {
            success: false,
            data: None,
            message: Some(format!("Blob file '{}' not found in app data directory", blob_filename)),
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_shell::init())
        // Consider if tauri_plugin_fs is still needed if only using std::fs and app_handle.path
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(AppStateManager(Mutex::new(None)));

    // Conditionally add mobile-specific handlers
    #[cfg(any(target_os = "ios", target_os = "android"))]
    let builder = builder.invoke_handler(tauri::generate_handler![
        list_blobs_in_app_data,
        delete_blob_from_app_data
    ]);

    // Add common handlers (ensure no duplicates if also added conditionally)
    let final_builder = builder.invoke_handler(tauri::generate_handler![
            init_encryption,
            unlock_encryption,
            logout_encryption,
            get_file_tree,
            upload_file_data, // Works cross-platform
            rename_file_in_blob,
            delete_file_from_blob,
            delete_folder_from_blob,
            download_file_from_blob,
            upload_files_by_path, // Now guarded internally for mobile
            upload_files_by_data // Works cross-platform
            // DO NOT add mobile handlers here again if added conditionally above
        ]);

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
