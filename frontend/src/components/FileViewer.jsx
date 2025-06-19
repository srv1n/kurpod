import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';
import {
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    PlayIcon,
    PauseIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon
} from '@heroicons/react/24/outline';

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
    const { showToast } = useToast();

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
                showToast('Failed to load file', 'error');
            }
            return null;
        } finally {
            if (!targetFile) {
                setIsLoading(false);
            }
        }
    }, [file, apiCall, showToast, preloadCache]);

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
            showToast('Download started', 'success');
        } catch (err) {
            showToast('Failed to download file', 'error');
        }
    }, [file, fileUrl, showToast]);

    // Delete file
    const handleDelete = useCallback(async () => {
        if (!file) return;
        
        if (!confirm(`Delete ${file.path}?`)) return;
        
        try {
            await onDelete?.(file);
            onClose();
            showToast('File deleted', 'success');
            // Notify parent to refresh file list
            onFileDeleted?.();
        } catch (err) {
            showToast('Failed to delete file', 'error');
        }
    }, [file, onDelete, onClose, showToast, onFileDeleted]);

    // Media controls
    const togglePlay = useCallback(() => {
        if (mediaRef.current) {
            if (isPlaying) {
                mediaRef.current.pause();
            } else {
                mediaRef.current.play();
            }
        }
    }, [isPlaying]);

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
            // Handle tap to toggle controls in fullscreen mode
            if (isFullscreen && isMobile) {
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
            setShowControls(true);
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
                    togglePlay();
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
            
            // Start preloading adjacent files after a short delay
            const preloadTimer = setTimeout(() => {
                preloadAdjacentFiles();
            }, 500); // Wait 500ms to let current file load first
            
            return () => clearTimeout(preloadTimer);
        }
    }, [file, isOpen, loadFile, preloadAdjacentFiles]);

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

    return (
        <div 
            ref={viewerRef}
            className={`
                fixed inset-0 z-50 bg-black flex flex-col
                ${isFullscreen ? 'cursor-none' : ''}
            `}
        >
            {/* Header - completely redesigned for mobile responsiveness */}
            <div className={`bg-black/90 text-white relative z-30 ${isFullscreen ? 'hidden' : ''}`} style={{ display: isFullscreen ? 'none' : 'block' }}>
                    {/* Mobile: Ultra-minimal header */}
                    <div className="md:hidden">
                        {/* Top row: Close button always visible */}
                        <div className="flex items-center justify-between p-3">
                            <div className="flex-1 min-w-0 mr-3">
                                <h2 className="text-sm font-medium truncate">
                                    {file.path.split('/').pop()}
                                </h2>
                            </div>
                            
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 p-2 rounded-lg bg-white/20 hover:bg-white/30 touch-manipulation"
                                style={{ minWidth: '44px', minHeight: '44px' }}
                            >
                                <XMarkIcon className="w-5 h-5 mx-auto" />
                            </button>
                        </div>
                        
                        {/* Bottom row: Controls */}
                        <div className="flex items-center justify-between px-3 pb-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-300">
                                    {currentIndex + 1} of {allFiles.length}
                                </span>
                                {allFiles.length > 1 && (
                                    <>
                                        <button
                                            onClick={navigatePrevious}
                                            disabled={!hasPrevious}
                                            className="p-1.5 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 touch-manipulation"
                                        >
                                            <ChevronLeftIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={navigateNext}
                                            disabled={!hasNext}
                                            className="p-1.5 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 touch-manipulation"
                                        >
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 touch-manipulation"
                                >
                                    <ArrowsPointingOutIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={downloadFile}
                                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 touch-manipulation"
                                >
                                    <ArrowDownTrayIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-1.5 rounded bg-red-600/30 hover:bg-red-600/50 text-red-300 touch-manipulation"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
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
                            <button
                                onClick={navigatePrevious}
                                disabled={!hasPrevious}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={navigateNext}
                                disabled={!hasNext}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>

                            {/* Zoom controls for images - Desktop only */}
                            {fileType === 'image' && (
                                <>
                                    <button
                                        onClick={zoomOut}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                                    >
                                        <MagnifyingGlassMinusIcon className="w-5 h-5" />
                                    </button>
                                    <span className="text-sm px-2">
                                        {Math.round(zoom * 100)}%
                                    </span>
                                    <button
                                        onClick={zoomIn}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                                    >
                                        <MagnifyingGlassPlusIcon className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {/* Fullscreen toggle */}
                            <button
                                onClick={toggleFullscreen}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                            >
                                <ArrowsPointingOutIcon className="w-5 h-5" />
                            </button>

                            {/* Download */}
                            <button
                                onClick={downloadFile}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                            </button>

                            {/* Delete */}
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>

                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
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
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
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
                            <button
                                onClick={navigatePrevious}
                                className={`
                                    hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-20
                                    items-center justify-center w-12 h-12 rounded-full
                                    bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm
                                    transition-all duration-200 opacity-80 hover:opacity-100
                                    ${!showControls && isFullscreen ? 'opacity-0' : ''}
                                `}
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                        )}

                        {/* Next button */}
                        {hasNext && (
                            <button
                                onClick={navigateNext}
                                className={`
                                    hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-20
                                    items-center justify-center w-12 h-12 rounded-full
                                    bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm
                                    transition-all duration-200 opacity-80 hover:opacity-100
                                    ${!showControls && isFullscreen ? 'opacity-0' : ''}
                                `}
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
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
                            <video
                                ref={mediaRef}
                                src={fileUrl}
                                className="object-contain"
                                style={{
                                    width: isFullscreen ? '100vw' : '100%',
                                    height: isFullscreen ? '100vh' : 'calc(100vh - 80px)',
                                    maxWidth: '100%',
                                    maxHeight: '100%'
                                }}
                                controls={!isFullscreen}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                                onDurationChange={(e) => setDuration(e.target.duration)}
                            />
                        )}

                        {fileType === 'audio' && (
                            <div className="flex items-center justify-center min-h-full p-4">
                                <div className="neo-card p-6 bg-white/10 backdrop-blur max-w-lg w-full">
                                    <h3 className="text-lg mb-4 text-center truncate">{file.path.split('/').pop()}</h3>
                                    <audio
                                        ref={mediaRef}
                                        src={fileUrl}
                                        className="w-full"
                                        controls
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        style={{ maxWidth: '100%' }}
                                    />
                                </div>
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
                                <div className="neo-card p-8 bg-white/10 backdrop-blur">
                                    <h3 className="text-xl mb-4">Preview not available</h3>
                                    <p className="text-gray-300 mb-6">
                                        This file type cannot be previewed
                                    </p>
                                    <button
                                        onClick={downloadFile}
                                        className="neo-button px-6 py-3 bg-primary text-white"
                                    >
                                        Download File
                                    </button>
                                </div>
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
                            <button
                                onClick={toggleFullscreen}
                                className="p-3 rounded-lg bg-black/60 text-white hover:bg-black/80 touch-manipulation"
                            >
                                <ArrowsPointingInIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation controls - Show/hide based on showControls state */}
                    {hasPrevious && (
                        <div className={`
                            absolute inset-y-0 left-4 flex items-center pointer-events-auto transition-opacity duration-300
                            ${isMobile ? (showControls ? 'opacity-80' : 'opacity-0') : 'opacity-0 hover:opacity-100'}
                        `}>
                            <button
                                onClick={navigatePrevious}
                                className="p-4 rounded-lg bg-black/60 text-white hover:bg-black/80 touch-manipulation"
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                        </div>
                    )}

                    {hasNext && (
                        <div className={`
                            absolute inset-y-0 right-4 flex items-center pointer-events-auto transition-opacity duration-300
                            ${isMobile ? (showControls ? 'opacity-80' : 'opacity-0') : 'opacity-0 hover:opacity-100'}
                            ${isMobile ? 'right-20' : 'right-4'}
                        `}>
                            <button
                                onClick={navigateNext}
                                className="p-4 rounded-lg bg-black/60 text-white hover:bg-black/80 touch-manipulation"
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
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