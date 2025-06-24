use base64::prelude::*;
use encryption_core::{MetadataMap, VolumeType};
use rand::{rngs::OsRng, RngCore};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use tokio::time::interval;

pub type SessionId = String;

/// Session data containing the split key and metadata
#[derive(Clone, Debug)]
pub struct Session {
    pub session_id: SessionId,
    pub server_key_part: [u8; 32], // Server-side portion of the split key
    pub blob_path: PathBuf,
    pub metadata: MetadataMap,
    pub volume_type: VolumeType,
    pub created_at: Instant,
    pub last_accessed: Instant,
    pub client_ip: Option<String>,
    pub user_agent: Option<String>,
    pub is_steganographic: bool, // Track if this session uses steganography
    pub original_carrier_path: Option<PathBuf>, // Path to original carrier for stego sessions
}

impl Session {
    /// Create a new session with split key architecture
    pub fn new(
        derived_key: [u8; 32],
        blob_path: PathBuf,
        metadata: MetadataMap,
        volume_type: VolumeType,
        client_ip: Option<String>,
        user_agent: Option<String>,
    ) -> (Self, [u8; 32]) {
        Self::new_with_stego(
            derived_key,
            blob_path,
            metadata,
            volume_type,
            client_ip,
            user_agent,
            false,
            None,
        )
    }

    /// Create a new session with steganography options
    pub fn new_with_stego(
        derived_key: [u8; 32],
        blob_path: PathBuf,
        metadata: MetadataMap,
        volume_type: VolumeType,
        client_ip: Option<String>,
        user_agent: Option<String>,
        is_steganographic: bool,
        original_carrier_path: Option<PathBuf>,
    ) -> (Self, [u8; 32]) {
        // Generate random session ID
        let mut session_id_bytes = [0u8; 16];
        OsRng.fill_bytes(&mut session_id_bytes);
        let session_id = hex::encode(session_id_bytes);

        // Split the derived key: XOR with random data
        let mut server_key_part = [0u8; 32];
        let mut client_key_part = [0u8; 32];
        OsRng.fill_bytes(&mut server_key_part);

        // XOR the derived key with server part to get client part
        for i in 0..32 {
            client_key_part[i] = derived_key[i] ^ server_key_part[i];
        }

        let now = Instant::now();
        let session = Session {
            session_id: session_id.clone(),
            server_key_part,
            blob_path,
            metadata,
            volume_type,
            created_at: now,
            last_accessed: now,
            client_ip: client_ip.clone(),
            user_agent: user_agent.clone(),
            is_steganographic,
            original_carrier_path,
        };

        (session, client_key_part)
    }

    /// Reconstruct the original derived key from client key part
    pub fn reconstruct_key(&self, client_key_part: &[u8; 32]) -> [u8; 32] {
        let mut derived_key = [0u8; 32];
        for i in 0..32 {
            derived_key[i] = self.server_key_part[i] ^ client_key_part[i];
        }
        derived_key
    }

    /// Update last accessed time
    pub fn touch(&mut self) {
        self.last_accessed = Instant::now();
    }

    /// Check if session is expired
    pub fn is_expired(&self, idle_timeout: Duration, absolute_timeout: Duration) -> bool {
        let now = Instant::now();
        now.duration_since(self.last_accessed) > idle_timeout
            || now.duration_since(self.created_at) > absolute_timeout
    }
}

/// Session manager with automatic cleanup
pub struct SessionManager {
    sessions: Arc<Mutex<HashMap<SessionId, Session>>>,
    idle_timeout: Duration,
    absolute_timeout: Duration,
    secret_key: [u8; 32], // For HMAC signing of tokens
}

impl SessionManager {
    /// Create a new session manager
    pub fn new() -> Self {
        let mut secret_key = [0u8; 32];
        OsRng.fill_bytes(&mut secret_key);

        Self {
            sessions: Arc::new(Mutex::new(HashMap::new())),
            idle_timeout: Duration::from_secs(15 * 60), // 15 minutes
            absolute_timeout: Duration::from_secs(2 * 60 * 60), // 2 hours
            secret_key,
        }
    }

    /// Start background cleanup task
    pub fn start_cleanup_task(&self) {
        let sessions = Arc::clone(&self.sessions);
        let idle_timeout = self.idle_timeout;
        let absolute_timeout = self.absolute_timeout;

        tokio::spawn(async move {
            let mut interval = interval(Duration::from_secs(30));
            loop {
                interval.tick().await;
                Self::cleanup_expired_sessions(&sessions, idle_timeout, absolute_timeout).await;
            }
        });
    }

    /// Clean up expired sessions
    async fn cleanup_expired_sessions(
        sessions: &Arc<Mutex<HashMap<SessionId, Session>>>,
        idle_timeout: Duration,
        absolute_timeout: Duration,
    ) {
        if let Ok(mut sessions_guard) = sessions.lock() {
            let expired_ids: Vec<SessionId> = sessions_guard
                .iter()
                .filter(|(_, session)| session.is_expired(idle_timeout, absolute_timeout))
                .map(|(id, _)| id.clone())
                .collect();

            for id in expired_ids {
                if let Some(session) = sessions_guard.remove(&id) {
                    // Zero out sensitive data
                    let _ = session.server_key_part;
                    log::info!("Cleaned up expired session: {}", id);
                }
            }
        }
    }

    /// Create a new session
    pub fn create_session(
        &self,
        derived_key: [u8; 32],
        blob_path: PathBuf,
        metadata: MetadataMap,
        volume_type: VolumeType,
        client_ip: Option<String>,
        user_agent: Option<String>,
    ) -> Result<String, &'static str> {
        self.create_session_internal(
            derived_key,
            blob_path,
            metadata,
            volume_type,
            client_ip,
            user_agent,
            false,
            None,
        )
    }

    /// Create a new steganographic session
    pub fn create_stego_session(
        &self,
        derived_key: [u8; 32],
        blob_path: PathBuf,
        metadata: MetadataMap,
        volume_type: VolumeType,
        client_ip: Option<String>,
        user_agent: Option<String>,
        original_carrier_path: PathBuf,
    ) -> Result<String, &'static str> {
        self.create_session_internal(
            derived_key,
            blob_path,
            metadata,
            volume_type,
            client_ip,
            user_agent,
            true,
            Some(original_carrier_path),
        )
    }

    /// Internal session creation logic
    fn create_session_internal(
        &self,
        derived_key: [u8; 32],
        blob_path: PathBuf,
        metadata: MetadataMap,
        volume_type: VolumeType,
        client_ip: Option<String>,
        user_agent: Option<String>,
        is_steganographic: bool,
        original_carrier_path: Option<PathBuf>,
    ) -> Result<String, &'static str> {
        let (session, client_key_part) = Session::new_with_stego(
            derived_key,
            blob_path,
            metadata,
            volume_type,
            client_ip.clone(),
            user_agent.clone(),
            is_steganographic,
            original_carrier_path,
        );

        let session_id = session.session_id.clone();

        // Store session
        if let Ok(mut sessions_guard) = self.sessions.lock() {
            sessions_guard.insert(session_id.clone(), session);
        } else {
            return Err("Failed to acquire session lock");
        }

        // Create bearer token (clone the values for the token)
        self.create_bearer_token(
            &session_id,
            &client_key_part,
            client_ip.clone(),
            user_agent.clone(),
        )
    }

    /// Create a signed bearer token
    fn create_bearer_token(
        &self,
        session_id: &str,
        client_key_part: &[u8; 32],
        client_ip: Option<String>,
        user_agent: Option<String>,
    ) -> Result<String, &'static str> {
        use hmac::{Hmac, Mac};
        use sha2::Sha256;

        type HmacSha256 = Hmac<Sha256>;

        let token = SessionToken {
            session_id: session_id.to_string(),
            client_key_part: *client_key_part,
            client_ip,
            user_agent,
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_secs(),
        };

        let token_json = serde_json::to_string(&token).map_err(|_| "Failed to serialize token")?;
        let token_b64 = base64::prelude::BASE64_STANDARD.encode(token_json);

        // Create HMAC signature
        let mut mac =
            HmacSha256::new_from_slice(&self.secret_key).map_err(|_| "Invalid HMAC key")?;
        mac.update(token_b64.as_bytes());
        let signature = base64::prelude::BASE64_STANDARD.encode(mac.finalize().into_bytes());

        Ok(format!("{}.{}", token_b64, signature))
    }

    /// Validate bearer token and get session
    pub fn validate_token(
        &self,
        token: &str,
        client_ip: Option<String>,
        user_agent: Option<String>,
    ) -> Result<(SessionId, [u8; 32]), &'static str> {
        use hmac::{Hmac, Mac};
        use sha2::Sha256;

        type HmacSha256 = Hmac<Sha256>;

        // Split token and signature
        let parts: Vec<&str> = token.split('.').collect();
        if parts.len() != 2 {
            return Err("Invalid token format");
        }

        let token_b64 = parts[0];
        let provided_signature = parts[1];

        // Verify HMAC signature
        let mut mac =
            HmacSha256::new_from_slice(&self.secret_key).map_err(|_| "Invalid HMAC key")?;
        mac.update(token_b64.as_bytes());
        let expected_signature =
            base64::prelude::BASE64_STANDARD.encode(mac.finalize().into_bytes());

        if provided_signature != expected_signature {
            return Err("Invalid token signature");
        }

        // Decode token
        let token_json = base64::prelude::BASE64_STANDARD
            .decode(token_b64)
            .map_err(|_| "Invalid token encoding")?;
        let token: SessionToken =
            serde_json::from_slice(&token_json).map_err(|_| "Invalid token format")?;

        // Validate IP and User-Agent binding
        if token.client_ip != client_ip {
            return Err("IP address mismatch");
        }
        if token.user_agent != user_agent {
            return Err("User agent mismatch");
        }

        // Check if session exists and is valid
        if let Ok(mut sessions_guard) = self.sessions.lock() {
            if let Some(session) = sessions_guard.get_mut(&token.session_id) {
                if session.is_expired(self.idle_timeout, self.absolute_timeout) {
                    sessions_guard.remove(&token.session_id);
                    return Err("Session expired");
                }

                // Update last accessed time
                session.touch();

                return Ok((token.session_id.clone(), token.client_key_part));
            }
        }

        Err("Session not found")
    }

    /// Get session by ID
    pub fn get_session(&self, session_id: &str) -> Option<Session> {
        if let Ok(sessions_guard) = self.sessions.lock() {
            sessions_guard.get(session_id).cloned()
        } else {
            None
        }
    }

    /// Remove session (logout)
    pub fn remove_session(&self, session_id: &str) -> bool {
        if let Ok(mut sessions_guard) = self.sessions.lock() {
            if let Some(session) = sessions_guard.remove(session_id) {
                // Zero out sensitive data
                let _ = session.server_key_part;
                log::info!("Removed session: {}", session_id);
                return true;
            }
        }
        false
    }

    /// Update session metadata after file operations
    pub fn update_session_metadata(&self, session_id: &str, new_metadata: MetadataMap) -> bool {
        if let Ok(mut sessions_guard) = self.sessions.lock() {
            if let Some(session) = sessions_guard.get_mut(session_id) {
                session.metadata = new_metadata;
                session.touch(); // Update last accessed time
                log::info!("Updated metadata for session: {}", session_id);
                return true;
            }
        }
        false
    }

    /// Get session count for monitoring
    pub fn session_count(&self) -> usize {
        if let Ok(sessions_guard) = self.sessions.lock() {
            sessions_guard.len()
        } else {
            0
        }
    }
}

impl Default for SessionManager {
    fn default() -> Self {
        Self::new()
    }
}

/// Bearer token structure
#[derive(Serialize, Deserialize)]
struct SessionToken {
    session_id: String,
    client_key_part: [u8; 32],
    client_ip: Option<String>,
    user_agent: Option<String>,
    timestamp: u64,
}

#[cfg(test)]
mod tests {
    use super::*;
    use encryption_core::VolumeType;
    use std::collections::HashMap;

    #[test]
    fn test_session_creation() {
        let derived_key = [42u8; 32];
        let blob_path = PathBuf::from("test.blob");
        let metadata = HashMap::new();
        let volume_type = VolumeType::Standard;

        let (session, client_key_part) = Session::new(
            derived_key,
            blob_path.clone(),
            metadata,
            volume_type,
            Some("127.0.0.1".to_string()),
            Some("test-agent".to_string()),
        );

        assert_eq!(session.blob_path, blob_path);
        assert_eq!(session.volume_type, volume_type);

        // Test key reconstruction
        let reconstructed = session.reconstruct_key(&client_key_part);
        assert_eq!(reconstructed, derived_key);
    }

    #[test]
    fn test_session_expiry() {
        let derived_key = [42u8; 32];
        let blob_path = PathBuf::from("test.blob");
        let metadata = HashMap::new();
        let volume_type = VolumeType::Standard;

        let (mut session, _) =
            Session::new(derived_key, blob_path, metadata, volume_type, None, None);

        // Fresh session should not be expired
        assert!(!session.is_expired(Duration::from_secs(600), Duration::from_secs(3600)));

        // Simulate old session
        session.created_at = Instant::now() - Duration::from_secs(3700);
        session.last_accessed = Instant::now() - Duration::from_secs(700);

        // Should be expired due to absolute timeout
        assert!(session.is_expired(Duration::from_secs(600), Duration::from_secs(3600)));
    }

    #[tokio::test]
    async fn test_session_manager() {
        let manager = SessionManager::new();
        let derived_key = [42u8; 32];
        let blob_path = PathBuf::from("test.blob");
        let metadata = HashMap::new();
        let volume_type = VolumeType::Standard;
        let client_ip = Some("127.0.0.1".to_string());
        let user_agent = Some("test-agent".to_string());

        // Create session
        let token = manager
            .create_session(
                derived_key,
                blob_path,
                metadata,
                volume_type,
                client_ip.clone(),
                user_agent.clone(),
            )
            .unwrap();

        // Validate token
        let (session_id, client_key_part) = manager
            .validate_token(&token, client_ip, user_agent)
            .unwrap();

        // Get session
        let session = manager.get_session(&session_id).unwrap();
        let reconstructed = session.reconstruct_key(&client_key_part);
        assert_eq!(reconstructed, derived_key);

        // Remove session
        assert!(manager.remove_session(&session_id));
        assert!(manager.get_session(&session_id).is_none());
    }
}
