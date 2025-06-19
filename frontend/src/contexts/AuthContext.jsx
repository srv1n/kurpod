import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [volumeType, setVolumeType] = useState(null);
  const initRef = useRef(false);

  // Load token from localStorage on mount
  useEffect(() => {
    if (initRef.current) return; // Prevent double initialization in StrictMode
    initRef.current = true;

    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem('kurpod_token');
        if (savedToken) {
          setToken(savedToken);
          // Validate token with server before setting authenticated
          await validateToken(savedToken);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        logout(); // Ensure clean state on error
      }
    };

    initializeAuth();
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('kurpod_token', token);
    } else {
      localStorage.removeItem('kurpod_token');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setVolumeType(null);
    setLoading(false);
    localStorage.removeItem('kurpod_token');
  };

  const validateToken = async (authToken) => {
    try {
      const response = await fetch('/api/session', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setVolumeType(data.data?.volume_type || null);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        // Token is invalid
        console.log('Token validation failed, status:', response.status);
        logout();
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      logout();
    }
  };

  const login = (authToken, volType = null) => {
    // Immediately save to localStorage to avoid race conditions
    localStorage.setItem('kurpod_token', authToken);
    setToken(authToken);
    setIsAuthenticated(true);
    setVolumeType(volType);
  };

  const getAuthHeaders = () => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const apiCall = async (url, options = {}) => {
    const headers = {
      ...getAuthHeaders(),
      ...options.headers,
    };

    // Only add Content-Type for non-GET requests and when not explicitly set
    if (options.method && options.method !== 'GET' && !options.headers?.['Content-Type'] && !options.body?.constructor?.name?.includes('FormData')) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 responses by logging out
    if (response.status === 401) {
      logout();
      throw new Error('Authentication required');
    }

    return response;
  };

  const value = {
    token,
    isAuthenticated,
    loading,
    volumeType,
    login,
    logout,
    getAuthHeaders,
    apiCall,
    validateToken: () => validateToken(token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};