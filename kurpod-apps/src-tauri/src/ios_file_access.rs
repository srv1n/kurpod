#[cfg(target_os = "ios")]
use serde::{Deserialize, Serialize};

#[cfg(target_os = "ios")]
#[derive(Debug, Serialize, Deserialize)]
pub struct SecurityScopedBookmark {
    pub path: String,
    pub bookmark: String,
    pub created_at: f64,
}

#[cfg(target_os = "ios")]
#[derive(Debug, Serialize, Deserialize)]
pub struct BookmarkAccessResult {
    pub path: String,
    pub is_stale: bool,
}

#[cfg(target_os = "ios")]
extern "C" {
    fn pick_blob_file_ios(invoke_ptr: *mut std::ffi::c_void);
    fn open_bookmark_ios(invoke_ptr: *mut std::ffi::c_void, bookmark: *const std::ffi::c_char);
    fn release_bookmark_ios(invoke_ptr: *mut std::ffi::c_void, path: *const std::ffi::c_char);
}

#[cfg(target_os = "ios")]
#[tauri::command]
pub async fn pick_blob_file_ios() -> Result<SecurityScopedBookmark, String> {
    // Note: This would require proper Tauri invoke context bridging to Swift
    // For now, indicate that the Swift plugin should be called directly from Tauri commands
    Err("Direct iOS file picking should use Tauri's mobile plugin system with FileAccessPlugin.swift".into())
}

#[cfg(target_os = "ios")]
#[tauri::command]
pub async fn access_stored_blob_ios(bookmark_data: String) -> Result<BookmarkAccessResult, String> {
    // Note: This would require proper Tauri invoke context bridging to Swift
    // For now, indicate that the Swift plugin should be called directly from Tauri commands
    let _ = bookmark_data; // Suppress unused warning
    Err("Direct iOS bookmark access should use Tauri's mobile plugin system with FileAccessPlugin.swift".into())
}

#[cfg(target_os = "ios")]
#[tauri::command]
pub async fn release_blob_access_ios(path: String) -> Result<String, String> {
    // Note: This would require proper Tauri invoke context bridging to Swift
    // For now, indicate that the Swift plugin should be called directly from Tauri commands
    let _ = path; // Suppress unused warning
    Err("Direct iOS bookmark release should use Tauri's mobile plugin system with FileAccessPlugin.swift".into())
}

// Platform-agnostic wrapper commands that route to appropriate implementations
#[tauri::command]
pub async fn pick_blob_file_platform() -> Result<serde_json::Value, String> {
    #[cfg(target_os = "ios")]
    {
        match pick_blob_file_ios().await {
            Ok(bookmark) => Ok(serde_json::to_value(bookmark).map_err(|e| e.to_string())?),
            Err(e) => Err(e),
        }
    }
    
    #[cfg(not(target_os = "ios"))]
    {
        Err("File picking with security-scoped bookmarks is only available on iOS".into())
    }
}

#[tauri::command]
pub async fn access_stored_blob_platform(bookmark_data: String) -> Result<serde_json::Value, String> {
    #[cfg(target_os = "ios")]
    {
        match access_stored_blob_ios(bookmark_data).await {
            Ok(result) => Ok(serde_json::to_value(result).map_err(|e| e.to_string())?),
            Err(e) => Err(e),
        }
    }
    
    #[cfg(not(target_os = "ios"))]
    {
        let _ = bookmark_data; // Suppress unused variable warning
        Err("Security-scoped bookmark access is only available on iOS".into())
    }
}

#[tauri::command]
pub async fn release_blob_access_platform(path: String) -> Result<String, String> {
    #[cfg(target_os = "ios")]
    {
        release_blob_access_ios(path).await
    }
    
    #[cfg(not(target_os = "ios"))]
    {
        let _ = path; // Suppress unused variable warning
        Err("Security-scoped bookmark release is only available on iOS".into())
    }
}