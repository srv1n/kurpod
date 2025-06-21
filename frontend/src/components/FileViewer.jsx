import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import {
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    Maximize,
    Minimize,
    Download,
    Trash2,
    Play,
    Pause,
    Volume2,
    VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from './LoadingSpinner';

const FileViewer = ({ 
    file, 
    isOpen, 
    onClose, 
    allFiles = [], 
    onNavigate,
    onDelete,
    onFileDeleted
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [pinchDistance, setPinchDistance] = useState(0);
    const [isPinching, setIsPinching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [swipeToClose, setSwipeToClose] = useState({ startY: 0, currentY: 0, isDismissing: false });
    const [lastTap, setLastTap] = useState(0);
    
    // Video/Audio specific state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    // Preloading state
    const [preloadCache, setPreloadCache] = useState(new Map());
    const [preloadingFiles, setPreloadingFiles] = useState(new Set());
    
    const viewerRef = useRef(null);
    const contentRef = useRef(null);
    const mediaRef = useRef(null);
    const { apiCall } = useAuth();
    // Removed showToast hook since we're using sonner

    // Helper function to format time for audio player
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Get file type
    const getFileType = (filename, mimeType = '') => {
        const ext = filename.toLowerCase().split('.').pop();
        
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext) ||
            mimeType.startsWith('image/')) {
            return 'image';
        }
        
        if (['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'].includes(ext) ||
            mimeType.startsWith('video/')) {
            return 'video';
        }
        
        if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'].includes(ext) ||
            mimeType.startsWith('audio/')) {
            return 'audio';
        }
        
        if (['pdf'].includes(ext) || mimeType === 'application/pdf') {
            return 'pdf';
        }
        
        if (['txt', 'md', 'json', 'xml', 'csv'].includes(ext) ||
            mimeType.startsWith('text/')) {
            return 'text';
        }
        
        return 'other';
    };

    // Load file content with preload cache support
    const loadFile = useCallback(async (targetFile = null) => {
        const fileToLoad = targetFile || file;
        if (!fileToLoad) return null;
        
        // Check if file is already in cache
        if (preloadCache.has(fileToLoad.path)) {
            const cachedUrl = preloadCache.get(fileToLoad.path);
            if (!targetFile) {
                setFileUrl(cachedUrl);
                setIsLoading(false);
                setError(null);
            }
            return cachedUrl;
        }
        
        if (!targetFile) {
            setIsLoading(true);
            setError(null);
        }
        
        try {
            // Encode path segments individually, not the whole path
            const encodedPath = fileToLoad.path.split('/').map(segment => encodeURIComponent(segment)).join('/');
            const response = await apiCall(`/api/files/${encodedPath}`);
            
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.status}`);
            }
            
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            // Add to cache
            setPreloadCache(prev => new Map(prev).set(fileToLoad.path, url));
            
            if (!targetFile) {
                setFileUrl(url);
            }
            
            return url;
        } catch (err) {
            if (!targetFile) {
                setError(err.message);
                toast.error('Failed to load file');
            }
            return null;
        } finally {
            if (!targetFile) {
                setIsLoading(false);
            }
        }
    }, [file, apiCall, preloadCache]);

    // Preload adjacent files
    const preloadAdjacentFiles = useCallback(async () => {
        if (!file || !allFiles.length) return;
        
        const currentIndex = allFiles.findIndex(f => f.path === file.path);
        if (currentIndex === -1) return;
        
        // Determine which files to preload (previous and next)
        const filesToPreload = [];
        
        // Previous file
        if (currentIndex > 0) {
            const prevFile = allFiles[currentIndex - 1];
            const fileType = getFileType(prevFile.path, prevFile.mimeType);
            if (['image', 'video', 'audio', 'pdf'].includes(fileType)) {
                filesToPreload.push(prevFile);
            }
        }
        
        // Next file
        if (currentIndex < allFiles.length - 1) {
            const nextFile = allFiles[currentIndex + 1];
            const fileType = getFileType(nextFile.path, nextFile.mimeType);
            if (['image', 'video', 'audio', 'pdf'].includes(fileType)) {
                filesToPreload.push(nextFile);
            }
        }
        
        // Preload files that aren't already cached or being preloaded
        for (const fileToPreload of filesToPreload) {
            if (!preloadCache.has(fileToPreload.path) && !preloadingFiles.has(fileToPreload.path)) {
                setPreloadingFiles(prev => new Set(prev).add(fileToPreload.path));
                
                // Preload asynchronously without blocking UI
                loadFile(fileToPreload).finally(() => {
                    setPreloadingFiles(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(fileToPreload.path);
                        return newSet;
                    });
                });
            }
        }
    }, [file, allFiles, preloadCache, preloadingFiles, loadFile]);

    // Cleanup cache entries that are no longer needed
    const cleanupCache = useCallback(() => {
        if (!file || !allFiles.length) return;
        
        const currentIndex = allFiles.findIndex(f => f.path === file.path);
        if (currentIndex === -1) return;
        
        // Keep current file and adjacent files (n-1, n, n+1)
        const filesToKeep = new Set();
        
        // Current file
        filesToKeep.add(file.path);
        
        // Previous file
        if (currentIndex > 0) {
            filesToKeep.add(allFiles[currentIndex - 1].path);
        }
        
        // Next file
        if (currentIndex < allFiles.length - 1) {
            filesToKeep.add(allFiles[currentIndex + 1].path);
        }
        
        // Remove entries not in the keep set
        setPreloadCache(prev => {
            const newCache = new Map();
            for (const [path, url] of prev) {
                if (filesToKeep.has(path)) {
                    newCache.set(path, url);
                } else {
                    // Revoke the object URL to free memory
                    URL.revokeObjectURL(url);
                }
            }
            return newCache;
        });
    }, [file, allFiles]);

    // Navigation
    const currentIndex = allFiles.findIndex(f => f.path === file?.path);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < allFiles.length - 1;

    const navigatePrevious = useCallback(() => {
        if (hasPrevious && onNavigate) {
            const prevFile = allFiles[currentIndex - 1];
            onNavigate(prevFile);
            // Cleanup cache after navigation
            setTimeout(cleanupCache, 100);
        }
    }, [hasPrevious, onNavigate, allFiles, currentIndex, cleanupCache]);

    const navigateNext = useCallback(() => {
        if (hasNext && onNavigate) {
            const nextFile = allFiles[currentIndex + 1];
            onNavigate(nextFile);
            // Cleanup cache after navigation
            setTimeout(cleanupCache, 100);
        }
    }, [hasNext, onNavigate, allFiles, currentIndex, cleanupCache]);

    // Zoom controls
    const zoomIn = useCallback(() => {
        setZoom(prevZoom => Math.min(prevZoom * 1.2, 5));
    }, []);

    const zoomOut = useCallback(() => {
        setZoom(prevZoom => Math.max(prevZoom / 1.2, 0.1));
    }, []);

    const resetZoom = useCallback(() => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    }, []);

    // Pan controls
    const handleMouseDown = useCallback((e) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - pan.x,
                y: e.clientY - pan.y
            });
        }
    }, [zoom, pan]);

    const handleMouseMove = useCallback((e) => {
        if (isDragging && zoom > 1) {
            setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    }, [isDragging, dragStart, zoom]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Fullscreen controls
    const toggleFullscreen = useCallback(() => {
        if (!isFullscreen) {
            if (viewerRef.current?.requestFullscreen) {
                viewerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, [isFullscreen]);

    // Download file
    const downloadFile = useCallback(async () => {
        if (!file || !fileUrl) return;
        
        try {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = file.path.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success('Download started');
        } catch (err) {
            toast.error('Failed to download file');
        }
    }, [file, fileUrl]);

    // Delete file
    const handleDelete = useCallback(async () => {
        if (!file) return;
        
        if (!confirm(`Delete ${file.path}?`)) return;
        
        try {
            await onDelete?.(file);
            onClose();
            toast.success('File deleted');
            // Notify parent to refresh file list
            onFileDeleted?.();
        } catch (err) {
            toast.error('Failed to delete file');
        }
    }, [file, onDelete, onClose, onFileDeleted]);

    // Media controls
    const togglePlay = useCallback(async () => {
        if (!mediaRef.current) return;
        
        try {
            if (mediaRef.current.paused) {
                await mediaRef.current.play();
            } else {
                mediaRef.current.pause();
            }
        } catch (error) {
            console.error('Error toggling play state:', error);
            toast.error('Failed to play media');
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (mediaRef.current) {
            mediaRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    // Enhanced touch/swipe handling for mobile
    const minSwipeDistance = 50;
    const dismissThreshold = 100;

    const getDistance = (touch1, touch2) => {
        return Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) + 
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
    };

    const handleTouchStart = useCallback((e) => {
        const touches = e.targetTouches;
        
        if (touches.length === 2) {
            // Two finger pinch
            setIsPinching(true);
            setPinchDistance(getDistance(touches[0], touches[1]));
            setTouchStart(null);
            setTouchEnd(null);
        } else if (touches.length === 1) {
            // Single finger touch
            const touch = touches[0];
            setTouchEnd(null);
            setTouchStart({ x: touch.clientX, y: touch.clientY });
            setIsPinching(false);
            
            // Track vertical swipe for dismiss gesture
            setSwipeToClose({
                startY: touch.clientY,
                currentY: touch.clientY,
                isDismissing: false
            });
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        const touches = e.targetTouches;
        
        if (touches.length === 2 && isPinching) {
            // Handle pinch-to-zoom
            e.preventDefault();
            const currentDistance = getDistance(touches[0], touches[1]);
            const scaleChange = currentDistance / pinchDistance;
            const newZoom = Math.max(0.5, Math.min(5, zoom * scaleChange));
            setZoom(newZoom);
            setPinchDistance(currentDistance);
        } else if (touches.length === 1 && !isPinching) {
            // Handle single finger touch
            const touch = touches[0];
            setTouchEnd({ x: touch.clientX, y: touch.clientY });
            
            // Update vertical position for dismiss gesture
            const deltaY = touch.clientY - swipeToClose.startY;
            const isDismissing = deltaY > 30 && isMobile && zoom <= 1; // Only allow dismiss when not zoomed
            
            setSwipeToClose(prev => ({
                ...prev,
                currentY: touch.clientY,
                isDismissing
            }));
            
            // Prevent default scrolling during vertical swipe down
            if (isDismissing) {
                e.preventDefault();
            }
        }
    }, [swipeToClose.startY, isMobile, isPinching, pinchDistance, zoom]);

    const handleTouchEnd = useCallback(() => {
        if (isPinching) {
            setIsPinching(false);
            setPinchDistance(0);
            return;
        }
        
        if (!touchStart || !touchEnd) return;
        
        const verticalDistance = swipeToClose.currentY - swipeToClose.startY;
        const horizontalDistance = touchStart.x - touchEnd.x;
        const verticalMovement = Math.abs(verticalDistance);
        const horizontalMovement = Math.abs(horizontalDistance);
        
        // Check for tap (minimal movement)
        if (horizontalMovement < 10 && verticalMovement < 10) {
            // Handle tap to toggle controls (works in both fullscreen and normal mode)
            if (isMobile) {
                setShowControls(prev => !prev);
                setSwipeToClose({ startY: 0, currentY: 0, isDismissing: false });
                setTouchStart(null);
                setTouchEnd(null);
                return;
            }
        }
        
        // Check for vertical dismiss gesture (downward swipe) - only when not zoomed
        if (verticalDistance > dismissThreshold && swipeToClose.isDismissing && isMobile && zoom <= 1) {
            onClose();
            setSwipeToClose({ startY: 0, currentY: 0, isDismissing: false });
            return;
        }
        
        // Handle horizontal navigation only if not dismissing and movement is primarily horizontal and not zoomed
        if (!swipeToClose.isDismissing && horizontalMovement > verticalMovement && horizontalMovement > minSwipeDistance && zoom <= 1) {
            const isLeftSwipe = horizontalDistance > 0;
            const isRightSwipe = horizontalDistance < 0;

            if (isLeftSwipe && hasNext) {
                navigateNext();
            }
            if (isRightSwipe && hasPrevious) {
                navigatePrevious();
            }
        }
        
        // Reset swipe state
        setSwipeToClose({ startY: 0, currentY: 0, isDismissing: false });
        setTouchStart(null);
        setTouchEnd(null);
    }, [touchStart, touchEnd, hasNext, hasPrevious, navigateNext, navigatePrevious, swipeToClose, dismissThreshold, onClose, isMobile, isFullscreen, minSwipeDistance, isPinching, zoom]);

    // Auto-hide controls on mouse inactivity (desktop) or after delay (mobile)
    useEffect(() => {
        let hideTimeout;
        
        const handleMouseMove = () => {
            if (!isMobile) {
                setShowControls(true);
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => setShowControls(false), 3000);
            }
        };

        if (isFullscreen) {
            if (isMobile) {
                // On mobile, start with controls visible, then hide after 3 seconds
                setShowControls(true);
                hideTimeout = setTimeout(() => setShowControls(false), 3000);
            } else {
                // On desktop, use mouse movement detection
                document.addEventListener('mousemove', handleMouseMove);
                hideTimeout = setTimeout(() => setShowControls(false), 3000);
            }
        } else {
            // In normal mode, always show controls on desktop, show by default on mobile
            if (isMobile) {
                setShowControls(true);
            } else {
                setShowControls(true);
            }
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(hideTimeout);
        };
    }, [isFullscreen, isMobile]);

    // Auto-hide controls after user interaction on mobile
    useEffect(() => {
        let hideTimeout;
        
        if (isFullscreen && isMobile && showControls) {
            hideTimeout = setTimeout(() => setShowControls(false), 3000);
        }

        return () => clearTimeout(hideTimeout);
    }, [showControls, isFullscreen, isMobile]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            
            switch (e.key) {
                case 'Escape':
                    if (isFullscreen) {
                        toggleFullscreen();
                    } else {
                        onClose();
                    }
                    break;
                case 'ArrowLeft':
                    navigatePrevious();
                    break;
                case 'ArrowRight':
                    navigateNext();
                    break;
                case '+':
                case '=':
                    zoomIn();
                    break;
                case '-':
                    zoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
                case ' ':
                    e.preventDefault();
                    if (fileType === 'video' || fileType === 'audio') {
                        togglePlay();
                    }
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isFullscreen, navigatePrevious, navigateNext, zoomIn, zoomOut, resetZoom, togglePlay, toggleFullscreen, onClose]);

    // Fullscreen change detection
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Mouse event listeners
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    // Load file when file changes
    useEffect(() => {
        if (file && isOpen) {
            loadFile();
            setZoom(1);
            setPan({ x: 0, y: 0 });
            
            // Reset media state for new files
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            
            // Start preloading adjacent files after a short delay
            const preloadTimer = setTimeout(() => {
                preloadAdjacentFiles();
            }, 500); // Wait 500ms to let current file load first
            
            return () => clearTimeout(preloadTimer);
        }
    }, [file, isOpen, loadFile, preloadAdjacentFiles]);

    // Initialize media volume and properties
    // useEffect(() => {
    //     if (mediaRef.current && fileUrl && (fileType === 'video' || fileType === 'audio')) {
    //         const media = mediaRef.current;
    //         media.volume = volume;
    //         media.muted = isMuted;
    //     }
    // }, [fileUrl, fileType, volume, isMuted]);

    // Cleanup all cached URLs when component unmounts or closes
    useEffect(() => {
        if (!isOpen) {
            // Cleanup all cached URLs when viewer closes
            preloadCache.forEach(url => URL.revokeObjectURL(url));
            setPreloadCache(new Map());
            setPreloadingFiles(new Set());
            
            // Also cleanup current file URL
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
                setFileUrl(null);
            }
        }
    }, [isOpen, preloadCache, fileUrl]);

    if (!isOpen || !file) return null;

    const fileType = getFileType(file.path, file.mimeType);

    // Calculate volume percentage to avoid complex inline expressions that confuse the minifier
    const volumePercent = (isMuted ? 0 : volume) * 100;

    return (
        <div 
            ref={viewerRef}
            className={`
                fixed inset-0 z-50 bg-black flex flex-col
                ${isFullscreen ? 'cursor-none' : ''}
            `}
        >
            {/* Header - completely redesigned for mobile responsiveness */}
            <div 
                className={`bg-black/90 text-white relative z-30 transition-all duration-300 ${
                    isFullscreen ? 'hidden' : ''
                } ${
                    isMobile && !showControls ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'
                }`} 
                style={{ display: isFullscreen ? 'none' : 'block' }}
            >
                    {/* Mobile: Ultra-minimal header */}
                    <div className="md:hidden">
                        {/* Top row: Close button always visible */}
                        <div className="flex items-center justify-between p-3">
                            <div className="flex-1 min-w-0 mr-3">
                                <h2 className="text-sm font-medium truncate">
                                    {file.path.split('/').pop()}
                                </h2>
                            </div>
                            
                            <Button
                                onClick={onClose}
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white"
                                style={{ minWidth: '44px', minHeight: '44px' }}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        {/* Bottom row: Controls */}
                        <div className="flex items-center justify-between px-3 pb-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-300">
                                    {currentIndex + 1} of {allFiles.length}
                                </span>
                                {allFiles.length > 1 && (
                                    <>
                                        <Button
                                            onClick={navigatePrevious}
                                            disabled={!hasPrevious}
                                            variant="ghost"
                                            size="sm"
                                            className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={navigateNext}
                                            disabled={!hasNext}
                                            variant="ghost"
                                            size="sm"
                                            className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={toggleFullscreen}
                                    variant="ghost"
                                    size="sm"
                                    className="bg-white/10 hover:bg-white/20 text-white"
                                >
                                    <Maximize className="h-4 w-4" />
                                </Button>
                                <Button
                                    onClick={downloadFile}
                                    variant="ghost"
                                    size="sm"
                                    className="bg-white/10 hover:bg-white/20 text-white"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    variant="ghost"
                                    size="sm"
                                    className="bg-red-600/30 hover:bg-red-600/50 text-red-300"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Full header */}
                    <div className="hidden md:flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-lg font-medium truncate">
                                {file.path.split('/').pop()}
                            </h2>
                            <span className="text-sm text-gray-300">
                                {currentIndex + 1} of {allFiles.length}
                            </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {/* Navigation */}
                            <Button
                                onClick={navigatePrevious}
                                disabled={!hasPrevious}
                                variant="ghost"
                                size="icon"
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                onClick={navigateNext}
                                disabled={!hasNext}
                                variant="ghost"
                                size="icon"
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>

                            {/* Zoom controls for images - Desktop only */}
                            {fileType === 'image' && (
                                <>
                                    <Button
                                        onClick={zoomOut}
                                        variant="ghost"
                                        size="icon"
                                        className="bg-white/10 hover:bg-white/20 text-white"
                                    >
                                        <ZoomOut className="h-5 w-5" />
                                    </Button>
                                    <span className="text-sm px-2 text-white">
                                        {Math.round(zoom * 100)}%
                                    </span>
                                    <Button
                                        onClick={zoomIn}
                                        variant="ghost"
                                        size="icon"
                                        className="bg-white/10 hover:bg-white/20 text-white"
                                    >
                                        <ZoomIn className="h-5 w-5" />
                                    </Button>
                                </>
                            )}

                            {/* Fullscreen toggle */}
                            <Button
                                onClick={toggleFullscreen}
                                variant="ghost"
                                size="icon"
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                <Maximize className="h-5 w-5" />
                            </Button>

                            {/* Download */}
                            <Button
                                onClick={downloadFile}
                                variant="ghost"
                                size="icon"
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                <Download className="h-5 w-5" />
                            </Button>

                            {/* Delete */}
                            <Button
                                onClick={handleDelete}
                                variant="ghost"
                                size="icon"
                                className="bg-red-600/20 hover:bg-red-600/40 text-red-400"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>

                            {/* Close */}
                            <Button
                                onClick={onClose}
                                variant="ghost"
                                size="icon"
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

            {/* Mobile swipe indicator */}
            {isMobile && swipeToClose.isDismissing && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-40">
                    <div className="bg-white/20 rounded-full px-3 py-1 text-white text-xs">
                        Swipe down to close
                    </div>
                </div>
            )}

            {/* Content area */}
            <div 
                className="flex-1 relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: swipeToClose.isDismissing && isMobile
                        ? `translateY(${Math.max(0, swipeToClose.currentY - swipeToClose.startY)}px)` 
                        : 'none',
                    opacity: swipeToClose.isDismissing && isMobile
                        ? Math.max(0.3, 1 - Math.abs(swipeToClose.currentY - swipeToClose.startY) / 300)
                        : 1,
                    transition: swipeToClose.isDismissing ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
                }}
            >
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <LoadingSpinner size="lg" className="text-white" />
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                            <p className="text-xl mb-2">Failed to load file</p>
                            <p className="text-gray-400">{error}</p>
                        </div>
                    </div>
                )}

                {/* Gallery Navigation Overlays - Desktop only */}
                {!isLoading && !error && fileUrl && (fileType === 'image' || fileType === 'video' || fileType === 'audio' || fileType === 'pdf') && (
                    <>
                        {/* Previous button */}
                        {hasPrevious && (
                            <Button
                                onClick={navigatePrevious}
                                variant="ghost"
                                size="icon"
                                className={`
                                    hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-20
                                    w-12 h-12 rounded-full
                                    bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm
                                    transition-all duration-200 opacity-80 hover:opacity-100
                                    ${!showControls && (isFullscreen || isMobile) ? 'opacity-0 pointer-events-none' : ''}
                                `}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </Button>
                        )}

                        {/* Next button */}
                        {hasNext && (
                            <Button
                                onClick={navigateNext}
                                variant="ghost"
                                size="icon"
                                className={`
                                    hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-20
                                    w-12 h-12 rounded-full
                                    bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm
                                    transition-all duration-200 opacity-80 hover:opacity-100
                                    ${!showControls && (isFullscreen || isMobile) ? 'opacity-0 pointer-events-none' : ''}
                                `}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        )}
                    </>
                )}

                {!isLoading && !error && fileUrl && (
                    <div className="w-full h-full flex items-center justify-center">
                        {fileType === 'image' && (
                            <img
                                ref={contentRef}
                                src={fileUrl}
                                alt={file.path}
                                className="object-contain select-none"
                                style={{
                                    width: isFullscreen ? '100vw' : '100%',
                                    height: isFullscreen ? '100vh' : 'calc(100vh - 80px)',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                                    cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                                }}
                                onMouseDown={handleMouseDown}
                                onDoubleClick={resetZoom}
                                draggable={false}
                            />
                        )}

                        {fileType === 'video' && (
                            <div className="w-full h-full flex items-center justify-center relative">
                                <video
                                    ref={mediaRef}
                                    src={fileUrl}
                                    className="object-contain"
                                    style={{
                                        width: isFullscreen ? '100vw' : '100%',
                                        height: isFullscreen ? '100vh' : 'calc(100vh - 120px)',
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }}
                                    controls
                                    controlsList="nodownload"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                                    onDurationChange={(e) => setDuration(e.target.duration)}
                                    onLoadedMetadata={(e) => {
                                        setDuration(e.target.duration);
                                        setCurrentTime(0);
                                    }}
                                />
                            </div>
                        )}

                        {fileType === 'audio' && (
                            <div className="flex items-center justify-center min-h-full p-4">
                                <Card className={`
                                    p-6 bg-white/10 backdrop-blur border-white/20
                                    ${isMobile ? 'w-full max-w-sm mx-4' : 'max-w-lg w-full'}
                                `}>
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-medium truncate text-white mb-2">
                                            {file.path.split('/').pop()}
                                        </h3>
                                        <p className="text-sm text-gray-300">
                                            Audio File
                                        </p>
                                    </div>
                                    
                                    {/* Custom audio controls for better mobile experience */}
                                    <div className="space-y-4">
                                        {/* Native audio element (hidden on mobile, visible on desktop) */}
                                        <audio
                                            ref={mediaRef}
                                            src={fileUrl}
                                            className={isMobile ? 'hidden' : 'w-full'}
                                            controls={!isMobile}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                                            onDurationChange={(e) => setDuration(e.target.duration)}
                                            onLoadedMetadata={(e) => {
                                                setDuration(e.target.duration);
                                                setCurrentTime(0);
                                            }}
                                        />
                                        
                                        {/* Mobile-friendly controls */}
                                        {isMobile && (
                                            <div className="space-y-4">
                                                {/* Play/Pause button */}
                                                <div className="flex justify-center">
                                                    <Button
                                                        onClick={togglePlay}
                                                        variant="ghost"
                                                        size="lg"
                                                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
                                                    >
                                                        {isPlaying ? (
                                                            <Pause className="h-8 w-8" />
                                                        ) : (
                                                            <Play className="h-8 w-8" />
                                                        )}
                                                    </Button>
                                                </div>
                                                
                                                {/* Progress bar */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs text-gray-300">
                                                        <span>{formatTime(currentTime)}</span>
                                                        <span>{formatTime(duration)}</span>
                                                    </div>
                                                    <div className="w-full bg-white/20 rounded-full h-2">
                                                        <div 
                                                            className="bg-white h-2 rounded-full transition-all duration-300"
                                                            style={{
                                                                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {/* Volume control */}
                                                <div className="flex items-center justify-center space-x-3">
                                                    <Button
                                                        onClick={toggleMute}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="bg-white/10 hover:bg-white/20 text-white"
                                                    >
                                                        {isMuted ? (
                                                            <VolumeX className="h-4 w-4" />
                                                        ) : (
                                                            <Volume2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <div className="flex-1 max-w-24">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="1"
                                                            step="0.1"
                                                            value={isMuted ? 0 : volume}
                                                            onChange={(e) => {
                                                                const newVolume = parseFloat(e.target.value);
                                                                setVolume(newVolume);
                                                                if (mediaRef.current) {
                                                                    mediaRef.current.volume = newVolume;
                                                                    if (newVolume === 0) {
                                                                        setIsMuted(true);
                                                                        mediaRef.current.muted = true;
                                                                    } else {
                                                                        setIsMuted(false);
                                                                        mediaRef.current.muted = false;
                                                                    }
                                                                }
                                                            }}
                                                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                                            style={{
                                                                background: `linear-gradient(to right, #ffffff ${volumePercent}%, rgba(255,255,255,0.2) ${volumePercent}%)`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        )}

                        {fileType === 'pdf' && (
                            <iframe
                                src={fileUrl}
                                className="w-full h-full"
                                title={file.path}
                            />
                        )}

                        {fileType === 'text' && (
                            <div className="w-full h-full p-8 overflow-auto">
                                <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                                    {/* Text content would be loaded here */}
                                    Loading text content...
                                </pre>
                            </div>
                        )}

                        {fileType === 'other' && (
                            <div className="text-center text-white">
                                <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
                                    <h3 className="text-xl mb-4 text-white">Preview not available</h3>
                                    <p className="text-gray-300 mb-6">
                                        This file type cannot be previewed
                                    </p>
                                    <Button
                                        onClick={downloadFile}
                                        className="px-6 py-3"
                                    >
                                        Download File
                                    </Button>
                                </Card>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Fullscreen controls overlay */}
            {isFullscreen && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* Top controls - Show/hide based on showControls state */}
                    <div className={`
                        absolute top-4 right-4 pointer-events-auto transition-opacity duration-300
                        ${isMobile ? (showControls ? 'opacity-90' : 'opacity-0') : 'opacity-0 hover:opacity-100'}
                    `}>
                        <div className="flex items-center space-x-2">
                            <Button
                                onClick={toggleFullscreen}
                                variant="ghost"
                                size="icon"
                                className="p-3 bg-black/60 text-white hover:bg-black/80"
                            >
                                <Minimize className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    {/* Navigation controls - Show/hide based on showControls state */}
                    {hasPrevious && (
                        <div className={`
                            absolute inset-y-0 left-4 flex items-center pointer-events-auto transition-opacity duration-300
                            ${isMobile ? (showControls ? 'opacity-80' : 'opacity-0') : 'opacity-0 hover:opacity-100'}
                        `}>
                            <Button
                                onClick={navigatePrevious}
                                variant="ghost"
                                size="icon"
                                className="p-4 bg-black/60 text-white hover:bg-black/80"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </Button>
                        </div>
                    )}

                    {hasNext && (
                        <div className={`
                            absolute inset-y-0 right-4 flex items-center pointer-events-auto transition-opacity duration-300
                            ${isMobile ? (showControls ? 'opacity-80' : 'opacity-0') : 'opacity-0 hover:opacity-100'}
                            ${isMobile ? 'right-20' : 'right-4'}
                        `}>
                            <Button
                                onClick={navigateNext}
                                variant="ghost"
                                size="icon"
                                className="p-4 bg-black/60 text-white hover:bg-black/80"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        </div>
                    )}

                    {/* Bottom info - Show/hide based on showControls state */}
                    <div className={`
                        absolute bottom-4 left-4 pointer-events-auto transition-opacity duration-300
                        ${isMobile ? (showControls ? 'opacity-80' : 'opacity-0') : 'opacity-0 hover:opacity-100'}
                    `}>
                        <div className="bg-black/60 rounded-lg px-4 py-2 text-white">
                            <p className="font-medium">{file.path.split('/').pop()}</p>
                            <p className="text-sm text-gray-300">
                                {currentIndex + 1} of {allFiles.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileViewer;