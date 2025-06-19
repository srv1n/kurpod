import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { VideoPlayer } from './VideoPlayer';
import { detectFileType } from '../utils/fileTypes';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';

export function FilePreviewModal({ file, isOpen, onClose }) {
    const { apiCall } = useAuth();
    const { showToast } = useToast();
    const [fileUrl, setFileUrl] = React.useState(null);
    const [fileType, setFileType] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!file || !isOpen) return;

        const loadFile = async () => {
            try {
                setLoading(true);
                const encodedPath = file.path.split('/').map(segment => encodeURIComponent(segment)).join('/');
                const response = await apiCall(`/api/files/${encodedPath}`);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
                
                // Detect file type
                const type = await detectFileType(new File([blob], file.path));
                setFileType(type);
            } catch (error) {
                showToast(error.message || 'Failed to load file', 'error');
                onClose();
            } finally {
                setLoading(false);
            }
        };

        loadFile();

        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [file, isOpen, apiCall, showToast, onClose]);

    const handleDownload = async () => {
        try {
            const encodedPath = file.path.split('/').map(segment => encodeURIComponent(segment)).join('/');
            const response = await apiCall(`/api/files/${encodedPath}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.path;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('Download started', 'success');
        } catch (error) {
            showToast(error.message || 'Download failed', 'error');
        }
    };

    const renderPreview = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
                </div>
            );
        }

        if (!fileType || !fileUrl) {
            return (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                    <p>Unable to preview this file</p>
                    <button
                        onClick={handleDownload}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Download File
                    </button>
                </div>
            );
        }

        switch (fileType.type) {
            case 'video':
                return (
                    <VideoPlayer
                        src={fileUrl}
                        type={fileType.mime}
                        className="w-full max-h-[70vh]"
                    />
                );
                
            case 'audio':
                return (
                    <div className="p-8">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                            <div className="text-6xl mb-4">🎵</div>
                            <h3 className="text-lg font-medium mb-4">{file.path}</h3>
                            <audio
                                controls
                                className="w-full"
                                src={fileUrl}
                            />
                        </div>
                    </div>
                );
                
            case 'image':
                return (
                    <div className="flex items-center justify-center">
                        <img
                            src={fileUrl}
                            alt={file.path}
                            className="max-w-full max-h-[70vh] object-contain"
                        />
                    </div>
                );
                
            case 'document':
                if (fileType.ext === 'pdf') {
                    return (
                        <iframe
                            src={fileUrl}
                            className="w-full h-[70vh]"
                            title={file.path}
                        />
                    );
                } else if (fileType.ext === 'txt') {
                    return (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg max-h-[70vh] overflow-auto">
                            <pre className="whitespace-pre-wrap text-sm">
                                <TextFileViewer url={fileUrl} />
                            </pre>
                        </div>
                    );
                }
                break;
        }

        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                <p>Preview not available for {fileType.ext} files</p>
                <button
                    onClick={handleDownload}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Download File
                </button>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
            
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <Dialog.Title className="text-lg font-medium">
                                {file?.path}
                            </Dialog.Title>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleDownload}
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    title="Download"
                                >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative">
                            {renderPreview()}
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}

// Helper component for text file viewing
function TextFileViewer({ url }) {
    const [content, setContent] = React.useState('');
    
    React.useEffect(() => {
        fetch(url)
            .then(res => res.text())
            .then(setContent)
            .catch(() => setContent('Failed to load file content'));
    }, [url]);
    
    return content;
}