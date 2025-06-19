use crate::session::{SessionId, SessionManager};
use axum::{
    extract::{ConnectInfo, FromRequestParts},
    http::{header::AUTHORIZATION, HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;
use std::net::SocketAddr;
use std::sync::Arc;

/// Authentication error types
#[derive(Debug)]
pub enum AuthError {
    MissingToken,
    InvalidToken,
    SessionExpired,
    InvalidFormat,
    Forbidden,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AuthError::MissingToken => (StatusCode::UNAUTHORIZED, "Missing authorization token"),
            AuthError::InvalidToken => (StatusCode::UNAUTHORIZED, "Invalid authorization token"),
            AuthError::SessionExpired => (StatusCode::UNAUTHORIZED, "Session expired"),
            AuthError::InvalidFormat => (StatusCode::BAD_REQUEST, "Invalid token format"),
            AuthError::Forbidden => (StatusCode::FORBIDDEN, "Access forbidden"),
        };

        let response = ErrorResponse {
            success: false,
            message: message.to_string(),
        };

        (status, Json(response)).into_response()
    }
}

#[derive(Serialize)]
struct ErrorResponse {
    success: bool,
    message: String,
}

/// Authentication context containing session information
#[derive(Debug, Clone)]
pub struct AuthContext {
    pub session_id: SessionId,
    pub derived_key: [u8; 32],
}

impl AuthContext {
    pub fn new(session_id: SessionId, derived_key: [u8; 32]) -> Self {
        Self {
            session_id,
            derived_key,
        }
    }
}

/// Extract authentication context from request
#[axum::async_trait]
impl<S> FromRequestParts<S> for AuthContext
where
    S: Send + Sync,
{
    type Rejection = AuthError;

    async fn from_request_parts(
        parts: &mut axum::http::request::Parts,
        state: &S,
    ) -> Result<Self, Self::Rejection> {
        // Extract session manager from extensions
        let session_manager = parts
            .extensions
            .get::<Arc<SessionManager>>()
            .ok_or(AuthError::Forbidden)?;

        // Extract authorization header
        let auth_header = parts
            .headers
            .get(AUTHORIZATION)
            .ok_or(AuthError::MissingToken)?
            .to_str()
            .map_err(|_| AuthError::InvalidFormat)?;

        // Parse bearer token
        let token = auth_header
            .strip_prefix("Bearer ")
            .ok_or(AuthError::InvalidFormat)?;

        // Extract client IP from ConnectInfo (consistent with login handlers)
        let connect_info = parts.extensions.get::<ConnectInfo<SocketAddr>>();
        let client_ip = connect_info.map(|info| info.0.ip().to_string());

        let user_agent = parts
            .headers
            .get("user-agent")
            .and_then(|h| h.to_str().ok())
            .map(|s| s.to_string());

        // Validate token and get session info
        let (session_id, client_key_part) = session_manager
            .validate_token(token, client_ip, user_agent)
            .map_err(|_| AuthError::InvalidToken)?;

        // Get session to reconstruct key
        let session = session_manager
            .get_session(&session_id)
            .ok_or(AuthError::SessionExpired)?;

        let derived_key = session.reconstruct_key(&client_key_part);

        Ok(AuthContext::new(session_id, derived_key))
    }
}

/// Extract client IP from headers (considering proxies)
fn extract_client_ip(headers: &HeaderMap) -> Option<String> {
    // Try X-Forwarded-For first (for reverse proxies)
    if let Some(xff) = headers.get("x-forwarded-for") {
        if let Ok(xff_str) = xff.to_str() {
            // Take the first IP in the chain
            if let Some(first_ip) = xff_str.split(',').next() {
                return Some(first_ip.trim().to_string());
            }
        }
    }

    // Try X-Real-IP (common in nginx setups)
    if let Some(real_ip) = headers.get("x-real-ip") {
        if let Ok(ip_str) = real_ip.to_str() {
            return Some(ip_str.to_string());
        }
    }

    // Note: We can't get the direct connection IP from headers alone
    // The connection info would need to be passed differently
    None
}

/// Middleware for requiring authentication on specific routes
pub struct RequireAuth;

impl RequireAuth {
    /// Create a new authentication requirement
    pub fn new() -> Self {
        Self
    }
}

/// Authentication state for dependency injection
#[derive(Clone)]
pub struct AuthState {
    pub session_manager: Arc<SessionManager>,
}

impl AuthState {
    pub fn new(session_manager: Arc<SessionManager>) -> Self {
        Self { session_manager }
    }
}

/// Helper function to create unauthorized response
pub fn unauthorized_response(message: &str) -> Response {
    let response = ErrorResponse {
        success: false,
        message: message.to_string(),
    };
    (StatusCode::UNAUTHORIZED, Json(response)).into_response()
}

/// Helper function to create forbidden response
pub fn forbidden_response(message: &str) -> Response {
    let response = ErrorResponse {
        success: false,
        message: message.to_string(),
    };
    (StatusCode::FORBIDDEN, Json(response)).into_response()
}

/// Helper to validate session manually (for custom handlers)
pub async fn validate_session_from_headers(
    headers: &HeaderMap,
    session_manager: &SessionManager,
) -> Result<AuthContext, AuthError> {
    // Extract authorization header
    let auth_header = headers
        .get(AUTHORIZATION)
        .ok_or(AuthError::MissingToken)?
        .to_str()
        .map_err(|_| AuthError::InvalidFormat)?;

    // Parse bearer token
    let token = auth_header
        .strip_prefix("Bearer ")
        .ok_or(AuthError::InvalidFormat)?;

    // Extract client IP and User-Agent for validation
    let client_ip = extract_client_ip(headers);
    let user_agent = headers
        .get("user-agent")
        .and_then(|h| h.to_str().ok())
        .map(|s| s.to_string());

    // Validate token and get session info
    let (session_id, client_key_part) = session_manager
        .validate_token(token, client_ip, user_agent)
        .map_err(|_| AuthError::InvalidToken)?;

    // Get session to reconstruct key
    let session = session_manager
        .get_session(&session_id)
        .ok_or(AuthError::SessionExpired)?;

    let derived_key = session.reconstruct_key(&client_key_part);

    Ok(AuthContext::new(session_id, derived_key))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::session::SessionManager;
    use axum::http::HeaderValue;
    use encryption_core::VolumeType;
    use std::collections::HashMap;
    use std::path::PathBuf;

    #[tokio::test]
    async fn test_auth_context_validation() {
        let session_manager = Arc::new(SessionManager::new());
        let derived_key = [42u8; 32];
        let blob_path = PathBuf::from("test.blob");
        let metadata = HashMap::new();
        let volume_type = VolumeType::Standard;
        let client_ip = Some("127.0.0.1".to_string());
        let user_agent = Some("test-agent".to_string());

        // Create session
        let token = session_manager
            .create_session(
                derived_key,
                blob_path,
                metadata,
                volume_type,
                client_ip.clone(),
                user_agent.clone(),
            )
            .unwrap();

        // Create headers with auth token
        let mut headers = HeaderMap::new();
        headers.insert(
            AUTHORIZATION,
            HeaderValue::from_str(&format!("Bearer {}", token)).unwrap(),
        );
        if let Some(ua) = &user_agent {
            headers.insert("user-agent", HeaderValue::from_str(ua).unwrap());
        }

        // Validate session
        let auth_context = validate_session_from_headers(&headers, &session_manager)
            .await
            .unwrap();

        assert_eq!(auth_context.derived_key, derived_key);
    }

    #[tokio::test]
    async fn test_invalid_token() {
        let session_manager = Arc::new(SessionManager::new());

        // Create headers with invalid token
        let mut headers = HeaderMap::new();
        headers.insert(
            AUTHORIZATION,
            HeaderValue::from_str("Bearer invalid-token").unwrap(),
        );

        // Should fail validation
        let result = validate_session_from_headers(&headers, &session_manager).await;
        assert!(result.is_err());
    }

    #[test]
    fn test_client_ip_extraction() {
        let mut headers = HeaderMap::new();

        // Test X-Forwarded-For
        headers.insert(
            "x-forwarded-for",
            HeaderValue::from_str("192.168.1.1, 10.0.0.1").unwrap(),
        );
        assert_eq!(extract_client_ip(&headers), Some("192.168.1.1".to_string()));

        // Test X-Real-IP
        headers.clear();
        headers.insert("x-real-ip", HeaderValue::from_str("203.0.113.1").unwrap());
        assert_eq!(extract_client_ip(&headers), Some("203.0.113.1".to_string()));

        // Test no headers
        headers.clear();
        assert_eq!(extract_client_ip(&headers), None);
    }
}
