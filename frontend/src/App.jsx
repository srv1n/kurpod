import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './contexts/AuthContext.jsx';
import { useToast } from './components/Toast';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeToggle } from './components/ThemeToggle';
import { BlobSelector } from './components/BlobSelector';
import { CreateBlobModal } from './components/CreateBlobModal';
import FileExplorer from './components/FileExplorer';
import FileViewer from './components/FileViewer';
import UploadManager from './components/UploadManager';
import MobileSidebar from './components/MobileSidebar';
import { MobileBreadcrumb } from './components/Breadcrumb';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './components/DropdownMenu';
import { ArrowUpTrayIcon, FolderPlusIcon, Cog6ToothIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import apiService from './services/api.js';

function UnlockScreen() {
    const [password, setPassword] = useState('');
    const [selectedBlob, setSelectedBlob] = useState('');
    const [loading, setLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();

    // Fetch server status on mount
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const status = await apiService.getStatus();
                setServerStatus(status);
            } catch (error) {
                console.error('Failed to fetch server status:', error);
                showToast('Failed to connect to server', 'error');
            }
        };
        fetchStatus();
    }, [showToast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password.trim()) {
            showToast('Please enter a password', 'error');
            return;
        }

        // Check if blob selection is required
        if (serverStatus?.data?.mode === 'directory' && !selectedBlob) {
            showToast('Please select a blob file', 'error');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                password: password,
                blob_name: serverStatus?.data?.mode === 'directory' ? selectedBlob : undefined
            };

            const response = await apiService.unlock(payload);
            const data = await response.json();

            if (response.ok && data.success) {
                login(data.data.token, data.data.volume_type);
                showToast(`Unlocked ${data.data.volume_type} volume`, 'success');
            } else {
                throw new Error(data.message || 'Authentication failed');
            }
        } catch (error) {
            showToast(error.message || 'Authentication failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleBlobChange = useCallback((blob) => {
        setSelectedBlob(blob);
    }, []);

    const handleCreateNew = useCallback(() => {
        setShowCreateModal(true);
    }, []);

    const handleCreateSuccess = useCallback((blobName, token) => {
        // Store the token and refresh status
        localStorage.setItem('kurpod_token', token);
        setSelectedBlob(blobName);
        // Refresh server status to include new blob
        window.location.reload();
    }, []);

    if (!serverStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    {/* App Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="neo-card p-6 rounded-full">
                            <img 
                                src="/android-chrome-512x512.png" 
                                alt="KURPOD Logo" 
                                className="w-20 h-20 sm:w-24 sm:h-24"
                            />
                        </div>
                    </div>
                    
                    <h1 className="text-display text-foreground mb-3">
                        KURPOD
                    </h1>
                    <p className="text-body text-gray-500 mb-2">
                        Encrypted File Storage
                    </p>
                    {serverStatus.data?.mode && (
                        <p className="text-caption text-primary">
                            {serverStatus.data.mode === 'single' ? 'Single File Mode' : 'Directory Mode'}
                        </p>
                    )}
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Blob Selection */}
                        <BlobSelector
                            serverStatus={serverStatus}
                            selectedBlob={selectedBlob}
                            onBlobChange={handleBlobChange}
                            onCreateNew={handleCreateNew}
                            disabled={loading}
                        />
                        
                        {/* Password Input */}
                        <div>
                            <label className="block text-body font-medium text-foreground mb-3">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="neo-input w-full px-5 py-4 text-body"
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || (serverStatus.data?.mode === 'directory' && !selectedBlob)}
                            className="neo-button w-full py-4 px-6 text-body font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <LoadingSpinner size="sm" />
                                    <span>Unlocking...</span>
                                </div>
                            ) : (
                                'Unlock Vault'
                            )}
                        </button>
                    </div>
                </form>
                
                <div className="flex justify-center pt-4">
                    <ThemeToggle />
                </div>
            </div>

            <CreateBlobModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
}

function Dashboard() {
    const [currentPath, setCurrentPath] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [allFiles, setAllFiles] = useState([]);
    const [showUploadManager, setShowUploadManager] = useState(false);
    const [uploadType, setUploadType] = useState('single');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { logout, volumeType, apiCall } = useAuth();
    const { showToast } = useToast();

    // Handle file preview
    const handleFilePreview = useCallback((file, filesInDirectory = []) => {
        setPreviewFile(file);
        setAllFiles(filesInDirectory);
    }, []);

    // Handle navigation
    const handleNavigate = useCallback((path) => {
        setCurrentPath(path);
    }, []);

    // Handle upload start
    const handleUploadStart = useCallback((type) => {
        console.log('=== APP.JSX UPLOAD START DEBUG ===');
        console.log('Upload type:', type);
        console.log('Current path:', currentPath);
        setUploadType(type);
        setShowUploadManager(true);
    }, [currentPath]);

    // Handle upload complete
    const handleUploadComplete = useCallback(() => {
        // Trigger FileExplorer refresh
        setRefreshTrigger(prev => prev + 1);
        showToast('Upload completed successfully!', 'success');
    }, [showToast]);

    // Handle file delete
    const handleFileDelete = useCallback(async (file) => {
        const encodedPath = file.path.split('/').map(segment => encodeURIComponent(segment)).join('/');
        const response = await apiCall(`/api/files/${encodedPath}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Delete failed');
        }
    }, [apiCall]);

    // Handle file deleted from viewer
    const handleFileDeleted = useCallback(() => {
        // Trigger FileExplorer refresh
        setRefreshTrigger(prev => prev + 1);
    }, []);

    // Navigate in preview
    const handlePreviewNavigate = useCallback((file) => {
        setPreviewFile(file);
    }, []);

    // Handle storage compaction
    const handleCompaction = useCallback(async () => {
        if (!confirm('Compaction will optimize storage by removing deleted file space. This may take a while. Continue?')) {
            return;
        }

        // Get passwords for both volumes
        const standardPassword = prompt('Enter standard volume password:');
        if (!standardPassword) return;

        const hiddenPassword = prompt('Enter hidden volume password (or leave empty if none):');

        try {
            const payload = {
                password_s: standardPassword,
                password_h: hiddenPassword || null
            };

            const response = await apiCall('/api/storage/compact', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.success) {
                showToast('Storage compaction completed successfully', 'success');
            } else {
                // Improved error handling to distinguish password vs process errors
                if (data.message && (
                    data.message.includes('password') || 
                    data.message.includes('authentication') ||
                    data.message.includes('invalid') ||
                    data.message.includes('incorrect')
                )) {
                    showToast('Incorrect password provided. Please check your passwords and try again.', 'error');
                } else if (data.message && data.message.includes('permission')) {
                    showToast('Permission denied. Check your authentication status.', 'error');
                } else {
                    showToast(`Compaction process failed: ${data.message || 'Unknown error'}`, 'error');
                }
            }
        } catch (error) {
            if (error.message === 'Authentication required') {
                showToast('Session expired. Please log in again.', 'error');
            } else if (error.message.includes('network') || error.message.includes('fetch')) {
                showToast('Network error. Please check your connection and try again.', 'error');
            } else {
                showToast(`Compaction failed: ${error.message}`, 'error');
            }
        }
    }, [apiCall, showToast]);

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile: Breadcrumb header only */}
            <div className="md:hidden bg-background border-b border-border">
                <div className="flex items-center justify-between px-4 py-2">
                    {/* Mobile sidebar trigger */}
                    <MobileSidebar 
                        currentPath={currentPath}
                        onNavigate={handleNavigate}
                        onUploadStart={handleUploadStart}
                        onCompactStorage={handleCompaction}
                    />
                    
                    {/* Mobile breadcrumb */}
                    <div className="flex-1 mx-3">
                        <MobileBreadcrumb 
                            currentPath={currentPath}
                            onNavigate={handleNavigate}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop: Full header */}
            <header className="hidden md:block neo-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            {/* Logo and title */}
                            <div className="flex items-center space-x-3">
                                <div className="neo-card p-2 rounded-full">
                                    <img 
                                        src="/android-chrome-192x192.png" 
                                        alt="KURPOD Logo" 
                                        className="w-8 h-8"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-heading text-foreground">
                                        KURPOD
                                    </h1>
                                    {volumeType && (
                                        <p className="text-caption text-gray-500">
                                            {volumeType} volume
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            {/* Upload buttons - Desktop */}
                            <div className="hidden md:flex items-center space-x-2">
                                <button
                                    onClick={() => handleUploadStart('single')}
                                    className="neo-button px-4 py-2 flex items-center space-x-2 text-primary hover:text-primary-hover"
                                >
                                    <ArrowUpTrayIcon className="w-4 h-4" />
                                    <span>Upload</span>
                                </button>
                                <button
                                    onClick={() => handleUploadStart('folder')}
                                    className="neo-button px-4 py-2 flex items-center space-x-2 text-primary hover:text-primary-hover"
                                >
                                    <FolderPlusIcon className="w-4 h-4" />
                                    <span>Folder</span>
                                </button>
                            </div>
                            
                            {/* Storage Management Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="hidden lg:flex neo-button px-4 py-2 items-center space-x-2 text-gray-600 hover:text-gray-700">
                                        <Cog6ToothIcon className="w-4 h-4" />
                                        <span>Storage</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 neo-card border border-border">
                                    <DropdownMenuItem 
                                        onClick={handleCompaction}
                                        className="flex items-center space-x-2 cursor-pointer hover:bg-muted"
                                    >
                                        <WrenchScrewdriverIcon className="w-4 h-4" />
                                        <span>Compact Storage</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                            <ThemeToggle />
                            <button
                                onClick={logout}
                                className="hidden md:block neo-button px-4 py-2 text-body text-red-600 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8 py-2 md:py-6">
                <FileExplorer
                    currentPath={currentPath}
                    refreshTrigger={refreshTrigger}
                    onFilePreview={handleFilePreview}
                    onUploadStart={handleUploadStart}
                    onNavigate={handleNavigate}
                    className="h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)]"
                />
            </main>


            {/* Upload Manager */}
            <UploadManager
                isOpen={showUploadManager}
                onClose={() => setShowUploadManager(false)}
                uploadType={uploadType}
                currentFolder={currentPath}
                onUploadComplete={handleUploadComplete}
            />

            {/* File Viewer */}
            <FileViewer
                file={previewFile}
                isOpen={!!previewFile}
                onClose={() => setPreviewFile(null)}
                allFiles={allFiles}
                onNavigate={handlePreviewNavigate}
                onDelete={handleFileDelete}
                onFileDeleted={handleFileDeleted}
            />
        </div>
    );
}

function App() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return isAuthenticated ? <Dashboard /> : <UnlockScreen />;
}

export default App;