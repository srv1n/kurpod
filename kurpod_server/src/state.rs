use crate::session::SessionManager;
use std::sync::Arc;

/// Application state for the server
/// This now uses session-based authentication instead of global state
#[derive(Clone)]
pub struct AppState {
    pub session_manager: Arc<SessionManager>,
}

impl AppState {
    pub fn new() -> Self {
        let session_manager = Arc::new(SessionManager::new());

        // Start the background cleanup task
        session_manager.start_cleanup_task();

        Self { session_manager }
    }
}

impl Default for AppState {
    fn default() -> Self {
        Self::new()
    }
}
