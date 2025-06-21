import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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
            
            toast.success('All files uploaded successfully!');
            onUploadComplete?.();
            setTimeout(() => {
                onClose();
                clearFiles();
            }, 1000);
            
        } catch (error) {
            toast.error('Some files failed to upload');
        } finally {
            setUploading(false);
        }
    }, [files, currentFolder, onUploadComplete, onClose, clearFiles]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <Card className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            {uploadType === 'folder' ? (
                                <FolderPlusIcon className="h-5 w-5 text-primary" />
                            ) : (
                                <ArrowUpTrayIcon className="h-5 w-5 text-primary" />
                            )}
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                Upload {uploadType === 'folder' ? 'Folder' : 'Files'}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {uploadType === 'folder' ? 'Select a folder to upload' : 'Select files to upload'}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        disabled={uploading}
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden flex flex-col space-y-6">
                    {/* Drop zone */}
                    <div
                        className={`
                            relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer
                            ${dragActive 
                                ? 'border-primary bg-primary/5 scale-[1.02]' 
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }
                            ${files.length === 0 ? 'min-h-[200px] sm:min-h-[240px]' : 'min-h-[120px] sm:min-h-[140px]'}
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => {
                            if (uploadType === 'folder') {
                                folderInputRef.current?.click();
                            } else {
                                fileInputRef.current?.click();
                            }
                        }}
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-200 ${
                                dragActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                                {uploadType === 'folder' ? (
                                    <FolderPlusIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                                ) : (
                                    <ArrowUpTrayIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-subheading font-medium text-foreground">
                                    {dragActive 
                                        ? `Drop ${uploadType === 'folder' ? 'folder' : 'files'} here` 
                                        : `Drag and drop ${uploadType === 'folder' ? 'a folder' : 'files'} here`
                                    }
                                </p>
                                <p className="text-body text-muted-foreground">or click to browse</p>
                                
                                {files.length === 0 && (
                                    <p className="text-caption text-muted-foreground mt-2">
                                        Supports all file types • No size limit
                                    </p>
                                )}
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
                        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-subheading font-medium">
                                        {files.length} file{files.length !== 1 ? 's' : ''} selected
                                    </h3>
                                    <p className="text-caption text-muted-foreground">
                                        {files.reduce((acc, file) => acc + file.size, 0) > 0 && 
                                            `Total size: ${formatSize(files.reduce((acc, file) => acc + file.size, 0))}`
                                        }
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={clearFiles}
                                    disabled={uploading}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    Clear All
                                </Button>
                            </div>

                            {/* Progress bar */}
                            {uploading && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-body font-medium">Uploading files...</span>
                                        <span className="text-body text-muted-foreground">
                                            {completedFiles} of {totalFiles} completed
                                        </span>
                                    </div>
                                    <Progress value={overallProgress} className="w-full" />
                                    {errorFiles > 0 && (
                                        <p className="text-caption text-destructive flex items-center gap-1">
                                            <ExclamationCircleIcon className="h-3 w-3" />
                                            {errorFiles} file{errorFiles !== 1 ? 's' : ''} failed to upload
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* File list */}
                            <div className="flex-1 overflow-auto border border-border rounded-lg">
                                <div className="divide-y divide-border">
                                    {files.map((fileItem) => {
                                        const IconComponent = getFileIcon(fileItem);
                                        
                                        return (
                                            <div
                                                key={fileItem.id}
                                                className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors duration-200"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                                                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-body font-medium truncate">
                                                        {fileItem.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-caption text-muted-foreground">
                                                        <span>{formatSize(fileItem.size)}</span>
                                                        {fileItem.path !== fileItem.name && (
                                                            <>
                                                                <span className="hidden sm:inline">•</span>
                                                                <span className="hidden sm:inline truncate">{fileItem.path}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    {fileItem.status === 'completed' && (
                                                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                            Done
                                                        </Badge>
                                                    )}
                                                    {fileItem.status === 'error' && (
                                                        <Badge variant="destructive">
                                                            <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                                                            Error
                                                        </Badge>
                                                    )}
                                                    {fileItem.status === 'uploading' && (
                                                        <div className="flex h-6 w-6 items-center justify-center">
                                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                                                        </div>
                                                    )}
                                                    
                                                    {!uploading && fileItem.status === 'pending' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeFile(fileItem.id);
                                                            }}
                                                            className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <XMarkIcon className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t bg-muted/30">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {files.length > 0 && !uploading && (
                            <span>Ready to upload {files.length} file{files.length !== 1 ? 's' : ''}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={uploading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={uploadFiles}
                            disabled={files.length === 0 || uploading}
                        >
                            {uploading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                    <span className="hidden sm:inline">Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                                    <span>Upload {files.length > 0 ? `(${files.length})` : ''}</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UploadManager;