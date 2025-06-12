import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';
import {
    ArrowUpTrayIcon,
    FolderPlusIcon,
    XMarkIcon,
    DocumentIcon,
    PhotoIcon,
    VideoCameraIcon,
    CheckCircleIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const UploadManager = ({ 
    isOpen, 
    onClose, 
    uploadType = 'single', // 'single' or 'folder'
    currentFolder = '',
    onUploadComplete 
}) => {
    console.log('UploadManager rendered with currentFolder:', currentFolder);
    console.log('UploadManager uploadType:', uploadType);
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);
    const { apiCall } = useAuth();
    const { showToast } = useToast();

    // Handle file selection
    const handleFileSelect = useCallback((selectedFiles) => {
        const fileArray = Array.from(selectedFiles).map(file => ({
            file,
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            path: file.webkitRelativePath || file.name,
            status: 'pending', // 'pending', 'uploading', 'completed', 'error'
            progress: 0,
            error: null
        }));
        
        setFiles(prevFiles => [...prevFiles, ...fileArray]);
    }, []);

    // Handle drag events
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    // Handle drop
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            handleFileSelect(droppedFiles);
        }
    }, [handleFileSelect]);

    // Remove file from list
    const removeFile = useCallback((fileId) => {
        setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    }, []);

    // Clear all files
    const clearFiles = useCallback(() => {
        setFiles([]);
        setUploadProgress({});
    }, []);

    // Upload files with batch processing and progress tracking
    const uploadFiles = useCallback(async () => {
        if (files.length === 0) return;
        
        setUploading(true);
        const batchId = Math.random().toString(36).substr(2, 9);
        const batchSize = 500; // Upload 500 files at a time
        
        try {
            for (let i = 0; i < files.length; i += batchSize) {
                const batch = files.slice(i, i + batchSize);
                const isFinalBatch = i + batchSize >= files.length;
                
                // Upload batch
                await uploadBatch(batch, batchId, isFinalBatch);
            }
            
            showToast('All files uploaded successfully!', 'success');
            onUploadComplete?.();
            setTimeout(() => {
                onClose();
                clearFiles();
            }, 1000);
            
        } catch (error) {
            showToast('Some files failed to upload', 'error');
        } finally {
            setUploading(false);
        }
    }, [files, currentFolder, onUploadComplete, onClose, clearFiles, showToast]);

    // Upload a single batch
    const uploadBatch = async (batch, batchId, isFinalBatch) => {
        const formData = new FormData();
        
        batch.forEach(fileItem => {
            if (uploadType === 'folder' && batch.some(f => f.path.includes('/'))) {
                // For batch uploads, use 'files' and 'file_paths'
                formData.append('files', fileItem.file);
                formData.append('file_paths', fileItem.path);
            } else {
                // For regular uploads, use 'file' and 'file_path'
                formData.append('file', fileItem.file);
                formData.append('file_path', fileItem.path);
            }
            // Update status to uploading
            setFiles(prevFiles => 
                prevFiles.map(f => 
                    f.id === fileItem.id 
                        ? { ...f, status: 'uploading' }
                        : f
                )
            );
        });
        
        try {
            let response;
            if (uploadType === 'folder' && batch.some(f => f.path.includes('/'))) {
                // Use batch upload for folders
                console.log('=== FRONTEND BATCH UPLOAD DEBUG ===');
                console.log('currentFolder prop:', currentFolder);
                console.log('uploadType:', uploadType);
                console.log('batchId:', batchId);
                console.log('isFinalBatch:', isFinalBatch);
                const url = `/api/batch-upload?batch_id=${encodeURIComponent(batchId)}&is_final_batch=${isFinalBatch}&current_folder=${encodeURIComponent(currentFolder || '')}`;
                console.log('Generated URL:', url);
                response = await apiCall(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        // Don't set Content-Type for FormData, let browser set it with boundary
                    }
                });
            } else {
                // Use regular upload for single files
                console.log('=== FRONTEND REGULAR UPLOAD DEBUG ===');
                console.log('currentFolder prop:', currentFolder);
                console.log('uploadType:', uploadType);
                const url = currentFolder 
                    ? `/api/files?current_folder=${encodeURIComponent(currentFolder)}`
                    : '/api/files';
                console.log('Generated URL:', url);
                response = await apiCall(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        // Don't set Content-Type for FormData, let browser set it with boundary
                    }
                });
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Mark all files in batch as completed
                batch.forEach(fileItem => {
                    setFiles(prevFiles => 
                        prevFiles.map(f => 
                            f.id === fileItem.id 
                                ? { ...f, status: 'completed', progress: 100 }
                                : f
                        )
                    );
                });
            } else {
                throw new Error(data.message || 'Upload failed');
            }
            
        } catch (error) {
            // Mark files as error
            batch.forEach(fileItem => {
                setFiles(prevFiles => 
                    prevFiles.map(f => 
                        f.id === fileItem.id 
                            ? { ...f, status: 'error', error: error.message }
                            : f
                    )
                );
            });
            throw error;
        }
    };

    // Format file size
    const formatSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${units[i]}`;
    };

    // Get file type icon
    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) return PhotoIcon;
        if (file.type.startsWith('video/')) return VideoCameraIcon;
        return DocumentIcon;
    };

    // Calculate overall progress
    const totalFiles = files.length;
    const completedFiles = files.filter(f => f.status === 'completed').length;
    const errorFiles = files.filter(f => f.status === 'error').length;
    const overallProgress = totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="neo-card w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                        {uploadType === 'folder' ? (
                            <FolderPlusIcon className="w-6 h-6 text-blue-600" />
                        ) : (
                            <ArrowUpTrayIcon className="w-6 h-6 text-blue-600" />
                        )}
                        <h2 className="text-heading">
                            Upload {uploadType === 'folder' ? 'Folder' : 'Files'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="neo-button p-2 text-gray-500 hover:text-gray-700"
                        disabled={uploading}
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Upload area */}
                <div className="flex-1 p-6 overflow-hidden flex flex-col">
                    {/* Drop zone */}
                    <div
                        className={`
                            neo-inset border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200
                            ${dragActive 
                                ? 'border-primary bg-primary/5' 
                                : 'border-gray-300 dark:border-gray-600'
                            }
                            ${files.length === 0 ? 'h-64' : 'h-32'}
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {uploadType === 'folder' ? (
                                <FolderPlusIcon className="w-12 h-12 text-gray-400" />
                            ) : (
                                <ArrowUpTrayIcon className="w-12 h-12 text-gray-400" />
                            )}
                            
                            <div>
                                <p className="text-subheading text-foreground mb-2">
                                    {dragActive 
                                        ? `Drop ${uploadType === 'folder' ? 'folder' : 'files'} here` 
                                        : `Drag and drop ${uploadType === 'folder' ? 'a folder' : 'files'} here`
                                    }
                                </p>
                                <p className="text-body text-gray-500 mb-4">or</p>
                                
                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    <button
                                        onClick={() => {
                                            if (uploadType === 'folder') {
                                                folderInputRef.current?.click();
                                            } else {
                                                fileInputRef.current?.click();
                                            }
                                        }}
                                        className="neo-button px-6 py-3 text-primary font-medium"
                                        disabled={uploading}
                                    >
                                        Browse {uploadType === 'folder' ? 'Folder' : 'Files'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File inputs */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files)}
                    />
                    <input
                        ref={folderInputRef}
                        type="file"
                        webkitdirectory=""
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files)}
                    />

                    {/* File list */}
                    {files.length > 0 && (
                        <div className="flex-1 mt-6 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-subheading">
                                    {files.length} file{files.length !== 1 ? 's' : ''} selected
                                </h3>
                                <button
                                    onClick={clearFiles}
                                    className="neo-button px-4 py-2 text-body text-red-600 hover:text-red-700"
                                    disabled={uploading}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Progress bar */}
                            {uploading && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-body">Overall Progress</span>
                                        <span className="text-body">
                                            {completedFiles} / {totalFiles} completed
                                        </span>
                                    </div>
                                    <div className="neo-progress h-3">
                                        <div 
                                            className="neo-progress-bar h-full transition-all duration-300"
                                            style={{ width: `${overallProgress}%` }}
                                        />
                                    </div>
                                    {errorFiles > 0 && (
                                        <p className="text-caption text-red-600 mt-1">
                                            {errorFiles} file{errorFiles !== 1 ? 's' : ''} failed
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* File list */}
                            <div className="flex-1 overflow-auto neo-inset rounded-xl">
                                <div className="p-4 space-y-2">
                                    {files.map((fileItem) => {
                                        const IconComponent = getFileIcon(fileItem);
                                        
                                        return (
                                            <div
                                                key={fileItem.id}
                                                className="flex items-center space-x-3 p-3 rounded-lg bg-card hover:bg-card-hover transition-colors duration-200"
                                            >
                                                <IconComponent className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-body font-medium truncate">
                                                        {fileItem.name}
                                                    </p>
                                                    <p className="text-caption text-gray-500">
                                                        {formatSize(fileItem.size)}
                                                        {fileItem.path !== fileItem.name && (
                                                            <span className="ml-2">• {fileItem.path}</span>
                                                        )}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2 flex-shrink-0">
                                                    {fileItem.status === 'completed' && (
                                                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                                    )}
                                                    {fileItem.status === 'error' && (
                                                        <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
                                                    )}
                                                    {fileItem.status === 'uploading' && (
                                                        <div className="w-5 h-5">
                                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                                                        </div>
                                                    )}
                                                    
                                                    {!uploading && fileItem.status === 'pending' && (
                                                        <button
                                                            onClick={() => removeFile(fileItem.id)}
                                                            className="neo-button p-1 text-red-600 hover:text-red-700"
                                                        >
                                                            <XMarkIcon className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
                    <button
                        onClick={onClose}
                        className="neo-button px-6 py-3 text-body"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={uploadFiles}
                        disabled={files.length === 0 || uploading}
                        className="neo-button px-6 py-3 text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                <span>Uploading...</span>
                            </div>
                        ) : (
                            `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadManager;