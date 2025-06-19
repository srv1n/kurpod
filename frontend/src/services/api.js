// API service for KURPOD with session-based authentication

class ApiService {
  constructor() {
    this.baseUrl = '';
  }

  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('kurpod_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Generic API call with auth handling
  async apiCall(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 responses by clearing token
    if (response.status === 401) {
      localStorage.removeItem('kurpod_token');
      window.dispatchEvent(new CustomEvent('auth:logout'));
      throw new Error('Authentication required');
    }

    return response;
  }

  // Public endpoints (no auth required)
  async getStatus() {
    const response = await fetch('/api/status');
    return response.json();
  }

  async initStorage(payload) {
    const response = await fetch('/api/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response;
  }

  async unlock(payload) {
    const response = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response;
  }

  async getInfo() {
    const response = await fetch('/api/info');
    return response.json();
  }

  // Protected endpoints (require auth)
  async logout() {
    return this.apiCall('/api/logout', { method: 'POST' });
  }

  async getSession() {
    return this.apiCall('/api/session');
  }

  async getFiles() {
    return this.apiCall('/api/files');
  }

  async uploadFiles(formData, signal) {
    return this.apiCall('/api/files', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...this.getAuthHeaders(),
      },
      signal,
    });
  }

  async downloadFile(path) {
    return this.apiCall(`/api/files/${encodeURIComponent(path)}`);
  }

  async deleteFile(path) {
    return this.apiCall(`/api/files/${encodeURIComponent(path)}`, {
      method: 'DELETE',
    });
  }

  async streamFile(path) {
    return this.apiCall(`/api/files/${encodeURIComponent(path)}/stream`);
  }

  async getThumbnail(path) {
    return this.apiCall(`/api/files/${encodeURIComponent(path)}/thumbnail`);
  }

  async getStorageStats() {
    return this.apiCall('/api/storage/stats');
  }

  async compactStorage(payload) {
    return this.apiCall('/api/storage/compact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Legacy endpoints for backward compatibility
  async getTree() {
    return this.getFiles();
  }

  async uploadBatch(formData, batchId, isFinalBatch, currentFolder, signal) {
    const url = `/api/batch-upload?batch_id=${encodeURIComponent(batchId)}&is_final_batch=${isFinalBatch}&current_folder=${encodeURIComponent(currentFolder || '')}`;
    return this.apiCall(url, {
      method: 'POST',
      body: formData,
      headers: {
        ...this.getAuthHeaders(),
      },
      signal,
    });
  }

  async renameFile(oldPath, newPath) {
    return this.apiCall('/api/rename', {
      method: 'POST',
      body: JSON.stringify({
        old_path: oldPath,
        new_path: newPath,
      }),
    });
  }

  async deleteFileByQuery(path) {
    return this.apiCall(`/api/delete?path=${encodeURIComponent(path)}`, {
      method: 'DELETE',
    });
  }

  async deleteFolder(path) {
    return this.apiCall(`/api/delete-folder?path=${encodeURIComponent(path)}`, {
      method: 'DELETE',
    });
  }

  async deleteBlob(blobName) {
    return this.apiCall('/api/delete-blob', {
      method: 'DELETE',
      body: JSON.stringify({ blob_name: blobName }),
    });
  }

  async compactLegacy(passwordS, passwordH) {
    return this.apiCall('/api/compact', {
      method: 'POST',
      body: JSON.stringify({
        password_s: passwordS,
        password_h: passwordH,
      }),
    });
  }
}

export default new ApiService();