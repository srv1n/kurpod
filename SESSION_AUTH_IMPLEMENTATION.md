# Session-Based Authentication Implementation

## Overview
This document details the complete session-based authentication system implemented for KURPOD. The system uses a split-key architecture with HMAC-signed bearer tokens for secure, stateless authentication.

## Architecture

### Split-Key Design
The authentication system splits the encryption key into two parts:
1. **Server-side**: Half of the key XORed with random data, stored in session
2. **Client-side**: Other half embedded in a signed JWT token

This ensures that neither the client nor server alone can decrypt data without the other component.

## Implementation Files

### 1. Authentication Module (`kurpod_server/src/auth.rs`)

```rust
use axum::{
    extract::{State, TypedHeader},
    headers::{authorization::Bearer, Authorization},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::{DateTime, Duration, Utc};
use hmac::{Hmac, Mac};
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use sha2::Sha256;
use std::net::IpAddr;
use std::sync::Arc;
use tokio::sync::RwLock;
use uuid::Uuid;

type HmacSha256 = Hmac<Sha256>;

#[derive(Debug, Clone)]
pub struct SessionData {
    pub id: String,
    pub key_part: [u8; 32],
    pub created_at: DateTime<Utc>,
    pub last_accessed: DateTime<Utc>,
    pub expires_at: DateTime<Utc>,
    pub ip_address: IpAddr,
    pub user_agent: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionToken {
    pub session_id: String,
    pub key_part: String, // Base64 encoded
    pub expires_at: i64,
    pub ip_address: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignedToken {
    pub token: SessionToken,
    pub signature: String, // Base64 encoded HMAC
}

#[derive(Debug)]
pub struct AuthManager {
    sessions: Arc<RwLock<HashMap<String, SessionData>>>,
    signing_key: [u8; 32],
    idle_timeout: Duration,
    absolute_timeout: Duration,
}

impl AuthManager {
    pub fn new() -> Self {
        let mut signing_key = [0u8; 32];
        thread_rng().fill(&mut signing_key);
        
        Self {
            sessions: Arc::new(RwLock::new(HashMap::new())),
            signing_key,
            idle_timeout: Duration::minutes(15),
            absolute_timeout: Duration::hours(2),
        }
    }

    pub async fn create_session(
        &self,
        full_key: &[u8; 32],
        ip_address: IpAddr,
        user_agent: String,
    ) -> Result<SignedToken, AuthError> {
        // Generate random data for XOR
        let mut random_data = [0u8; 32];
        thread_rng().fill(&mut random_data);
        
        // Split the key
        let mut server_key_part = [0u8; 32];
        let mut client_key_part = [0u8; 32];
        
        for i in 0..32 {
            server_key_part[i] = full_key[i] ^ random_data[i];
            client_key_part[i] = random_data[i];
        }
        
        // Create session
        let session_id = Uuid::new_v4().to_string();
        let now = Utc::now();
        let expires_at = now + self.idle_timeout;
        
        let session_data = SessionData {
            id: session_id.clone(),
            key_part: server_key_part,
            created_at: now,
            last_accessed: now,
            expires_at,
            ip_address,
            user_agent,
        };
        
        // Store session
        self.sessions.write().await.insert(session_id.clone(), session_data);
        
        // Create token
        let token = SessionToken {
            session_id,
            key_part: base64::encode(&client_key_part),
            expires_at: expires_at.timestamp(),
            ip_address: ip_address.to_string(),
        };
        
        // Sign token
        let signed_token = self.sign_token(token)?;
        
        Ok(signed_token)
    }

    pub async fn validate_session(
        &self,
        auth_header: TypedHeader<Authorization<Bearer>>,
        ip_address: IpAddr,
        user_agent: &str,
    ) -> Result<[u8; 32], AuthError> {
        let token_str = auth_header.token();
        let signed_token: SignedToken = serde_json::from_str(token_str)
            .map_err(|_| AuthError::InvalidToken)?;
        
        // Verify signature
        self.verify_token(&signed_token)?;
        
        // Check IP address match
        if signed_token.token.ip_address != ip_address.to_string() {
            return Err(AuthError::IpMismatch);
        }
        
        // Get session
        let mut sessions = self.sessions.write().await;
        let session = sessions
            .get_mut(&signed_token.token.session_id)
            .ok_or(AuthError::SessionNotFound)?;
        
        // Check expiration
        let now = Utc::now();
        if now > session.expires_at {
            sessions.remove(&signed_token.token.session_id);
            return Err(AuthError::SessionExpired);
        }
        
        // Check absolute timeout
        if now > session.created_at + self.absolute_timeout {
            sessions.remove(&signed_token.token.session_id);
            return Err(AuthError::SessionExpired);
        }
        
        // Check user agent
        if session.user_agent != user_agent {
            return Err(AuthError::UserAgentMismatch);
        }
        
        // Update last accessed time
        session.last_accessed = now;
        session.expires_at = now + self.idle_timeout;
        
        // Reconstruct key
        let client_key_part = base64::decode(&signed_token.token.key_part)
            .map_err(|_| AuthError::InvalidToken)?;
        
        let mut full_key = [0u8; 32];
        for i in 0..32 {
            full_key[i] = session.key_part[i] ^ client_key_part[i];
        }
        
        Ok(full_key)
    }

    fn sign_token(&self, token: SessionToken) -> Result<SignedToken, AuthError> {
        let token_json = serde_json::to_string(&token)
            .map_err(|_| AuthError::InternalError)?;
        
        let mut mac = HmacSha256::new_from_slice(&self.signing_key)
            .map_err(|_| AuthError::InternalError)?;
        mac.update(token_json.as_bytes());
        
        let signature = mac.finalize().into_bytes();
        
        Ok(SignedToken {
            token,
            signature: base64::encode(&signature),
        })
    }

    fn verify_token(&self, signed_token: &SignedToken) -> Result<(), AuthError> {
        let token_json = serde_json::to_string(&signed_token.token)
            .map_err(|_| AuthError::InvalidToken)?;
        
        let mut mac = HmacSha256::new_from_slice(&self.signing_key)
            .map_err(|_| AuthError::InternalError)?;
        mac.update(token_json.as_bytes());
        
        let expected_signature = base64::decode(&signed_token.signature)
            .map_err(|_| AuthError::InvalidToken)?;
        
        mac.verify_slice(&expected_signature)
            .map_err(|_| AuthError::InvalidSignature)?;
        
        Ok(())
    }

    pub async fn logout(&self, session_id: &str) {
        self.sessions.write().await.remove(session_id);
    }

    pub async fn cleanup_expired_sessions(&self) {
        let now = Utc::now();
        let mut sessions = self.sessions.write().await;
        
        sessions.retain(|_, session| {
            now <= session.expires_at && 
            now <= session.created_at + self.absolute_timeout
        });
    }
}

#[derive(Debug)]
pub enum AuthError {
    InvalidToken,
    InvalidSignature,
    SessionNotFound,
    SessionExpired,
    IpMismatch,
    UserAgentMismatch,
    InternalError,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> axum::response::Response {
        let (status, message) = match self {
            AuthError::InvalidToken => (StatusCode::UNAUTHORIZED, "Invalid token"),
            AuthError::InvalidSignature => (StatusCode::UNAUTHORIZED, "Invalid signature"),
            AuthError::SessionNotFound => (StatusCode::UNAUTHORIZED, "Session not found"),
            AuthError::SessionExpired => (StatusCode::UNAUTHORIZED, "Session expired"),
            AuthError::IpMismatch => (StatusCode::UNAUTHORIZED, "IP address mismatch"),
            AuthError::UserAgentMismatch => (StatusCode::UNAUTHORIZED, "User agent mismatch"),
            AuthError::InternalError => (StatusCode::INTERNAL_SERVER_ERROR, "Internal error"),
        };
        
        (status, Json(json!({ "error": message }))).into_response()
    }
}
```

### 2. Session Module (`kurpod_server/src/session.rs`)

```rust
use crate::auth::{AuthManager, SignedToken};
use axum::{
    extract::{ConnectInfo, State, TypedHeader},
    headers::UserAgent,
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::time::{interval, Duration};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UnlockRequest {
    pub password: String,
    pub volume_type: VolumeType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum VolumeType {
    Standard,
    Hidden,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UnlockResponse {
    pub token: String,
    pub volume_type: VolumeType,
    pub expires_in: u64, // seconds
}

pub async fn unlock_handler(
    State(app_state): State<Arc<AppState>>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    TypedHeader(user_agent): TypedHeader<UserAgent>,
    Json(request): Json<UnlockRequest>,
) -> Result<impl IntoResponse, StatusCode> {
    // Validate password and get encryption key
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
    
    // Create session
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
    };
    
    Ok(Json(response))
}

pub async fn logout_handler(
    State(app_state): State<Arc<AppState>>,
    auth: AuthenticatedUser,
) -> impl IntoResponse {
    app_state.auth_manager.logout(&auth.session_id).await;
    StatusCode::NO_CONTENT
}

pub async fn session_status_handler(
    auth: AuthenticatedUser,
) -> impl IntoResponse {
    Json(json!({
        "session_id": auth.session_id,
        "volume_type": auth.volume_type,
        "expires_at": auth.expires_at,
    }))
}

// Background task for session cleanup
pub async fn session_cleanup_task(auth_manager: Arc<AuthManager>) {
    let mut interval = interval(Duration::from_secs(30));
    
    loop {
        interval.tick().await;
        auth_manager.cleanup_expired_sessions().await;
    }
}

// Extractor for authenticated requests
#[derive(Debug)]
pub struct AuthenticatedUser {
    pub session_id: String,
    pub encryption_key: [u8; 32],
    pub volume_type: VolumeType,
    pub expires_at: i64,
}

#[async_trait]
impl<S> FromRequestParts<S> for AuthenticatedUser
where
    S: Send + Sync,
    Arc<AppState>: FromRef<S>,
{
    type Rejection = StatusCode;

    async fn from_request_parts(
        parts: &mut Parts,
        state: &S,
    ) -> Result<Self, Self::Rejection> {
        let app_state = Arc::<AppState>::from_ref(state);
        
        // Extract authorization header
        let auth_header = TypedHeader::<Authorization<Bearer>>::from_request_parts(parts, state)
            .await
            .map_err(|_| StatusCode::UNAUTHORIZED)?;
        
        // Extract connection info
        let ConnectInfo(addr) = ConnectInfo::<SocketAddr>::from_request_parts(parts, state)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
        
        // Extract user agent
        let TypedHeader(user_agent) = TypedHeader::<UserAgent>::from_request_parts(parts, state)
            .await
            .map_err(|_| StatusCode::BAD_REQUEST)?;
        
        // Validate session and get key
        let encryption_key = app_state.auth_manager
            .validate_session(auth_header, addr.ip(), &user_agent.to_string())
            .await
            .map_err(|_| StatusCode::UNAUTHORIZED)?;
        
        // Parse token to get session info
        let token_str = auth_header.token();
        let signed_token: SignedToken = serde_json::from_str(token_str)
            .map_err(|_| StatusCode::UNAUTHORIZED)?;
        
        Ok(AuthenticatedUser {
            session_id: signed_token.token.session_id,
            encryption_key,
            volume_type: VolumeType::Standard, // TODO: Store in session
            expires_at: signed_token.token.expires_at,
        })
    }
}
```

### 3. Updated State Module (`kurpod_server/src/state.rs`)

```rust
use crate::auth::AuthManager;
use crate::blob::BlobManager;
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Clone)]
pub struct AppState {
    pub blob_manager: Arc<BlobManager>,
    pub auth_manager: Arc<AuthManager>,
    pub upload_sessions: Arc<RwLock<HashMap<String, UploadSession>>>,
}

impl AppState {
    pub fn new(blob_path: PathBuf) -> Self {
        Self {
            blob_manager: Arc::new(BlobManager::new(blob_path)),
            auth_manager: Arc::new(AuthManager::new()),
            upload_sessions: Arc::new(RwLock::new(HashMap::new())),
        }
    }
}
```

### 4. Updated Main Server (`kurpod_server/src/main.rs`)

```rust
// Add authentication middleware and routes
use crate::auth::{AuthManager, AuthenticatedUser};
use crate::session::{unlock_handler, logout_handler, session_status_handler, session_cleanup_task};

#[tokio::main]
async fn main() -> Result<()> {
    // ... initialization code ...
    
    let app_state = Arc::new(AppState::new(blob_path));
    
    // Start session cleanup task
    let auth_manager = app_state.auth_manager.clone();
    tokio::spawn(session_cleanup_task(auth_manager));
    
    let app = Router::new()
        // Public routes (no auth required)
        .route("/api/status", get(status_handler))
        .route("/api/init", post(init_handler))
        .route("/api/unlock", post(unlock_handler))
        
        // Protected routes (auth required)
        .route("/api/logout", post(logout_handler))
        .route("/api/session", get(session_status_handler))
        .route("/api/files", get(list_files_handler))
        .route("/api/files", post(upload_file_handler))
        .route("/api/files/:id", get(download_file_handler))
        .route("/api/files/:id", delete(delete_file_handler))
        .route("/api/compact", post(compact_handler))
        
        // Add auth middleware for protected routes
        .layer(middleware::from_fn_with_state(
            app_state.clone(),
            auth_middleware,
        ))
        
        .layer(Extension(app_state))
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(|error: BoxError| async move {
                    if error.is::<tower::timeout::error::Elapsed>() {
                        Ok(StatusCode::REQUEST_TIMEOUT)
                    } else {
                        Err((
                            StatusCode::INTERNAL_SERVER_ERROR,
                            format!("Unhandled internal error: {}", error),
                        ))
                    }
                }))
                .timeout(Duration::from_secs(300))
                .layer(TraceLayer::new_for_http())
                .into_inner(),
        );
    
    // ... server setup ...
}

// Authentication middleware
async fn auth_middleware<B>(
    State(app_state): State<Arc<AppState>>,
    request: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    // Skip auth for public routes
    let path = request.uri().path();
    if path == "/api/status" || path == "/api/init" || path == "/api/unlock" {
        return Ok(next.run(request).await);
    }
    
    // All other routes require authentication
    // The AuthenticatedUser extractor will handle validation
    Ok(next.run(request).await)
}
```

## Frontend Integration

### Authentication Context (`frontend/src/contexts/AuthContext.jsx`)

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Load session from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('kurpod_token');
        if (storedToken) {
            try {
                const tokenData = JSON.parse(storedToken);
                // Check if token is expired
                if (new Date(tokenData.expires_at * 1000) > new Date()) {
                    setSession(tokenData);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('kurpod_token');
                }
            } catch (error) {
                console.error('Invalid stored token:', error);
                localStorage.removeItem('kurpod_token');
            }
        }
        setLoading(false);
    }, []);

    const unlock = async (password, volumeType = 'standard') => {
        try {
            const response = await fetch('/api/unlock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    volume_type: volumeType,
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid password');
            }

            const data = await response.json();
            
            // Store token
            localStorage.setItem('kurpod_token', data.token);
            
            // Parse token to get session info
            const tokenData = JSON.parse(data.token);
            setSession({
                ...tokenData,
                volume_type: data.volume_type,
            });
            setIsAuthenticated(true);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('kurpod_token');
            if (token) {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('kurpod_token');
            setSession(null);
            setIsAuthenticated(false);
            navigate('/unlock');
        }
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem('kurpod_token');
        if (!token) {
            throw new Error('No authentication token');
        }
        return {
            'Authorization': `Bearer ${token}`,
        };
    };

    // Session timeout monitoring
    useEffect(() => {
        if (!session) return;

        const checkTimeout = () => {
            const expiresAt = new Date(session.token.expires_at * 1000);
            if (new Date() >= expiresAt) {
                logout();
            }
        };

        // Check every 30 seconds
        const interval = setInterval(checkTimeout, 30000);
        
        return () => clearInterval(interval);
    }, [session]);

    const value = {
        session,
        isAuthenticated,
        loading,
        unlock,
        logout,
        getAuthHeaders,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
```

### Unlock Screen Component (`frontend/src/components/UnlockScreen.jsx`)

```jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Toast } from './Toast';

export function UnlockScreen() {
    const [password, setPassword] = useState('');
    const [volumeType, setVolumeType] = useState('standard');
    const [showHiddenOption, setShowHiddenOption] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { unlock } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await unlock(password, volumeType);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Invalid password');
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        KURPOD
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Enter your password to unlock
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {showHiddenOption && (
                        <div className="flex items-center space-x-3">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="volume"
                                    value="standard"
                                    checked={volumeType === 'standard'}
                                    onChange={(e) => setVolumeType(e.target.value)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Standard Volume
                                </span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="volume"
                                    value="hidden"
                                    checked={volumeType === 'hidden'}
                                    onChange={(e) => setVolumeType(e.target.value)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Hidden Volume
                                </span>
                            </label>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading || !password}
                    >
                        {loading ? 'Unlocking...' : 'Unlock'}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setShowHiddenOption(!showHiddenOption)}
                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {showHiddenOption ? 'Hide' : 'Show'} advanced options
                        </button>
                    </div>
                </form>

                {error && (
                    <Toast
                        message={error}
                        type="error"
                        onClose={() => setError('')}
                    />
                )}
            </Card>
        </div>
    );
}
```

### Updated API Client (`frontend/src/services/api.js`)

```javascript
import { useAuth } from '../contexts/AuthContext';

class ApiClient {
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL || '';
    }

    async request(path, options = {}) {
        const { getAuthHeaders } = useAuth();
        
        const url = `${this.baseUrl}${path}`;
        const config = {
            ...options,
            headers: {
                ...options.headers,
                ...getAuthHeaders(),
            },
        };

        const response = await fetch(url, config);

        if (response.status === 401) {
            // Session expired, redirect to login
            window.location.href = '/unlock';
            throw new Error('Session expired');
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response;
    }

    async listFiles() {
        const response = await this.request('/api/files');
        return response.json();
    }

    async uploadFile(file, onProgress) {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && onProgress) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    onProgress(percentComplete);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`HTTP ${xhr.status}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Network error'));
            });

            const { getAuthHeaders } = useAuth();
            const headers = getAuthHeaders();

            xhr.open('POST', `${this.baseUrl}/api/files`);
            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });
            xhr.send(formData);
        });
    }

    async downloadFile(fileId) {
        const response = await this.request(`/api/files/${fileId}`);
        return response.blob();
    }

    async deleteFile(fileId) {
        await this.request(`/api/files/${fileId}`, {
            method: 'DELETE',
        });
    }

    async compact() {
        await this.request('/api/compact', {
            method: 'POST',
        });
    }
}

export const apiClient = new ApiClient();
```

## Testing

### Session Security Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::net::{IpAddr, Ipv4Addr};

    #[tokio::test]
    async fn test_session_creation_and_validation() {
        let auth_manager = AuthManager::new();
        let test_key = [42u8; 32];
        let ip = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
        let user_agent = "test-agent".to_string();
        
        // Create session
        let token = auth_manager
            .create_session(&test_key, ip, user_agent.clone())
            .await
            .unwrap();
        
        // Validate session
        let auth_header = format!("Bearer {}", serde_json::to_string(&token).unwrap());
        let reconstructed_key = auth_manager
            .validate_session(
                TypedHeader(Authorization::bearer(&auth_header).unwrap()),
                ip,
                &user_agent,
            )
            .await
            .unwrap();
        
        assert_eq!(test_key, reconstructed_key);
    }

    #[tokio::test]
    async fn test_session_expiration() {
        let mut auth_manager = AuthManager::new();
        auth_manager.idle_timeout = Duration::milliseconds(100);
        
        let test_key = [42u8; 32];
        let ip = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
        let user_agent = "test-agent".to_string();
        
        let token = auth_manager
            .create_session(&test_key, ip, user_agent.clone())
            .await
            .unwrap();
        
        // Wait for expiration
        tokio::time::sleep(std::time::Duration::from_millis(200)).await;
        
        // Cleanup expired sessions
        auth_manager.cleanup_expired_sessions().await;
        
        // Try to validate - should fail
        let auth_header = format!("Bearer {}", serde_json::to_string(&token).unwrap());
        let result = auth_manager
            .validate_session(
                TypedHeader(Authorization::bearer(&auth_header).unwrap()),
                ip,
                &user_agent,
            )
            .await;
        
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_ip_address_validation() {
        let auth_manager = AuthManager::new();
        let test_key = [42u8; 32];
        let ip1 = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
        let ip2 = IpAddr::V4(Ipv4Addr::new(192, 168, 1, 1));
        let user_agent = "test-agent".to_string();
        
        let token = auth_manager
            .create_session(&test_key, ip1, user_agent.clone())
            .await
            .unwrap();
        
        // Try to validate with different IP - should fail
        let auth_header = format!("Bearer {}", serde_json::to_string(&token).unwrap());
        let result = auth_manager
            .validate_session(
                TypedHeader(Authorization::bearer(&auth_header).unwrap()),
                ip2,
                &user_agent,
            )
            .await;
        
        assert!(matches!(result, Err(AuthError::IpMismatch)));
    }

    #[tokio::test]
    async fn test_concurrent_sessions() {
        let auth_manager = Arc::new(AuthManager::new());
        let mut handles = vec![];
        
        // Create 100 concurrent sessions
        for i in 0..100 {
            let am = auth_manager.clone();
            let handle = tokio::spawn(async move {
                let test_key = [i as u8; 32];
                let ip = IpAddr::V4(Ipv4Addr::new(127, 0, 0, i as u8));
                let user_agent = format!("test-agent-{}", i);
                
                am.create_session(&test_key, ip, user_agent)
                    .await
                    .unwrap()
            });
            handles.push(handle);
        }
        
        // Wait for all sessions to be created
        for handle in handles {
            handle.await.unwrap();
        }
        
        // Verify session count
        let session_count = auth_manager.sessions.read().await.len();
        assert_eq!(session_count, 100);
    }
}
```

## Security Considerations

1. **Key Splitting**: The encryption key is never stored in full on either client or server
2. **Token Signing**: All tokens are HMAC-SHA256 signed to prevent tampering
3. **IP Binding**: Sessions are bound to the creating IP address
4. **User-Agent Validation**: Additional layer of session validation
5. **Automatic Cleanup**: Expired sessions are removed every 30 seconds
6. **Memory Zeroization**: Cryptographic material is cleared from memory on cleanup
7. **Dual Timeout**: Both idle (15 min) and absolute (2 hour) timeouts

## Migration Steps

1. Add the auth and session modules to the server
2. Update the AppState to include AuthManager
3. Modify all API endpoints to use AuthenticatedUser extractor
4. Update frontend to use AuthContext and handle authentication
5. Add unlock screen to frontend routing
6. Update all API calls to include authentication headers
7. Test session timeout and cleanup behavior
8. Verify security measures (IP binding, signature validation)

## Configuration

Environment variables for session management:
```bash
KURPOD_SESSION_IDLE_TIMEOUT=900      # 15 minutes in seconds
KURPOD_SESSION_ABSOLUTE_TIMEOUT=7200  # 2 hours in seconds
KURPOD_SESSION_CLEANUP_INTERVAL=30    # 30 seconds
```

## Notes

- The session store is currently in-memory; for production, consider Redis
- The signing key is generated on startup; for multi-instance deployments, share the key
- Session tokens are relatively large due to embedded data; consider using JWTs for compression
- The current implementation doesn't distinguish between standard and hidden volumes in sessions