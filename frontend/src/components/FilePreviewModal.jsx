import React from 'react';
import { X, Download } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { detectFileType } from '../utils/fileTypes';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import { Card } from '@/components/ui/card';

export function FilePreviewModal({ file, isOpen, onClose }) {
    const { apiCall } = useAuth();
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
                toast.error(error.message || 'Failed to load file');
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
            toast.success('Download started');
        } catch (error) {
            toast.error(error.message || 'Download failed');
        }
    };

    const renderPreview = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-96">
                    <LoadingSpinner size="lg" />
                </div>
            );
        }

        if (!fileType || !fileUrl) {
            return (
                <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                    <p>Unable to preview this file</p>
                    <Button
                        onClick={handleDownload}
                        className="mt-4"
                    >
                        Download File
                    </Button>
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
                        <Card className="p-8 text-center">
                            <div className="text-6xl mb-4">🎵</div>
                            <h3 className="text-lg font-medium mb-4">{file.path}</h3>
                            <audio
                                controls
                                className="w-full"
                                src={fileUrl}
                            />
                        </Card>
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
                        <Card className="p-4 m-4 max-h-[70vh] overflow-auto">
                            <pre className="whitespace-pre-wrap text-sm">
                                <TextFileViewer url={fileUrl} />
                            </pre>
                        </Card>
                    );
                }
                break;
        }

        return (
            <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                <p>Preview not available for {fileType.ext} files</p>
                <Button
                    onClick={handleDownload}
                    className="mt-4"
                >
                    Download File
                </Button>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                <DialogHeader className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-medium truncate pr-4">
                            {file?.path}
                        </DialogTitle>
                        <div className="flex items-center space-x-2">
                            <Button
                                onClick={handleDownload}
                                variant="ghost"
                                size="icon"
                                title="Download"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="relative overflow-auto">
                    {renderPreview()}
                </div>
            </DialogContent>
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