# Media and Video Implementation

## Overview
This document details the video rendering, thumbnail generation, and media handling features implemented for KURPOD, including browser-based video playback and file type detection.

## Video File Type Detection

### Magic Byte Detection (`frontend/src/utils/fileTypes.js`)

```javascript
// File type detection based on magic bytes
const FILE_SIGNATURES = {
    // Images
    'FFD8FF': { ext: 'jpg', mime: 'image/jpeg', type: 'image' },
    '89504E47': { ext: 'png', mime: 'image/png', type: 'image' },
    '47494638': { ext: 'gif', mime: 'image/gif', type: 'image' },
    '424D': { ext: 'bmp', mime: 'image/bmp', type: 'image' },
    '49492A00': { ext: 'tif', mime: 'image/tiff', type: 'image' },
    '4D4D002A': { ext: 'tif', mime: 'image/tiff', type: 'image' },
    
    // Videos
    '000000186674797069736F6D': { ext: 'mp4', mime: 'video/mp4', type: 'video' },
    '00000020667479706D703432': { ext: 'mp4', mime: 'video/mp4', type: 'video' },
    '1A45DFA3': { ext: 'webm', mime: 'video/webm', type: 'video' },
    '52494646': { ext: 'avi', mime: 'video/x-msvideo', type: 'video' },
    '000001BA': { ext: 'mpg', mime: 'video/mpeg', type: 'video' },
    '000001B3': { ext: 'mpg', mime: 'video/mpeg', type: 'video' },
    '6D6F6F76': { ext: 'mov', mime: 'video/quicktime', type: 'video' },
    
    // Audio
    'FFFB': { ext: 'mp3', mime: 'audio/mpeg', type: 'audio' },
    'FFF3': { ext: 'mp3', mime: 'audio/mpeg', type: 'audio' },
    'FFF2': { ext: 'mp3', mime: 'audio/mpeg', type: 'audio' },
    '4F676753': { ext: 'ogg', mime: 'audio/ogg', type: 'audio' },
    '524946464': { ext: 'wav', mime: 'audio/wav', type: 'audio' },
    '664C6143': { ext: 'flac', mime: 'audio/flac', type: 'audio' },
    
    // Documents
    '25504446': { ext: 'pdf', mime: 'application/pdf', type: 'document' },
    '504B0304': { ext: 'zip', mime: 'application/zip', type: 'archive' },
    '504B0506': { ext: 'zip', mime: 'application/zip', type: 'archive' },
    '504B0708': { ext: 'zip', mime: 'application/zip', type: 'archive' },
};

export async function detectFileType(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onloadend = (e) => {
            if (!e.target.result) {
                resolve(getTypeFromExtension(file.name));
                return;
            }
            
            const arr = new Uint8Array(e.target.result);
            const header = Array.from(arr.slice(0, 20))
                .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
                .join('');
            
            // Check signatures
            for (const [signature, info] of Object.entries(FILE_SIGNATURES)) {
                if (header.startsWith(signature)) {
                    resolve({
                        ...info,
                        detected: true,
                        signature,
                    });
                    return;
                }
            }
            
            // Fallback to extension
            resolve(getTypeFromExtension(file.name));
        };
        
        // Read first 20 bytes
        reader.readAsArrayBuffer(file.slice(0, 20));
    });
}

function getTypeFromExtension(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
        // Images
        jpg: { mime: 'image/jpeg', type: 'image' },
        jpeg: { mime: 'image/jpeg', type: 'image' },
        png: { mime: 'image/png', type: 'image' },
        gif: { mime: 'image/gif', type: 'image' },
        bmp: { mime: 'image/bmp', type: 'image' },
        webp: { mime: 'image/webp', type: 'image' },
        svg: { mime: 'image/svg+xml', type: 'image' },
        
        // Videos
        mp4: { mime: 'video/mp4', type: 'video' },
        webm: { mime: 'video/webm', type: 'video' },
        avi: { mime: 'video/x-msvideo', type: 'video' },
        mov: { mime: 'video/quicktime', type: 'video' },
        wmv: { mime: 'video/x-ms-wmv', type: 'video' },
        flv: { mime: 'video/x-flv', type: 'video' },
        mkv: { mime: 'video/x-matroska', type: 'video' },
        
        // Audio
        mp3: { mime: 'audio/mpeg', type: 'audio' },
        wav: { mime: 'audio/wav', type: 'audio' },
        ogg: { mime: 'audio/ogg', type: 'audio' },
        m4a: { mime: 'audio/mp4', type: 'audio' },
        flac: { mime: 'audio/flac', type: 'audio' },
        
        // Documents
        pdf: { mime: 'application/pdf', type: 'document' },
        doc: { mime: 'application/msword', type: 'document' },
        docx: { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', type: 'document' },
        txt: { mime: 'text/plain', type: 'document' },
        
        // Default
        default: { mime: 'application/octet-stream', type: 'unknown' },
    };
    
    return {
        ext,
        ...mimeTypes[ext] || mimeTypes.default,
        detected: false,
    };
}
```

## Video Thumbnail Generation

### Thumbnail Generator Component (`frontend/src/components/VideoThumbnail.jsx`)

```jsx
import React, { useEffect, useState, useRef } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

export function VideoThumbnail({ src, className, onClick }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!src) return;

        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.muted = true;
        
        const generateThumbnail = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size to video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Draw the video frame to canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert to data URL
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    setThumbnail(url);
                }
            }, 'image/jpeg', 0.8);
            
            setDuration(video.duration);
        };

        video.addEventListener('loadeddata', () => {
            // Seek to 25% of video duration for thumbnail
            video.currentTime = video.duration * 0.25;
        });

        video.addEventListener('seeked', generateThumbnail);
        
        video.addEventListener('error', () => {
            setError(true);
        });

        video.src = src;
        video.load();

        return () => {
            if (thumbnail) {
                URL.revokeObjectURL(thumbnail);
            }
            video.remove();
        };
    }, [src]);

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (error) {
        return (
            <div className={cn('relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden', className)}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon className="h-12 w-12 text-gray-400" />
                </div>
            </div>
        );
    }

    return (
        <div 
            className={cn('relative cursor-pointer group rounded-lg overflow-hidden', className)}
            onClick={onClick}
        >
            {thumbnail ? (
                <img 
                    src={thumbnail} 
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3">
                    <PlayIcon className="h-8 w-8 text-gray-900" />
                </div>
            </div>
            
            {/* Duration badge */}
            {duration > 0 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(duration)}
                </div>
            )}
        </div>
    );
}
```

## Enhanced Media Player with Controls

### Advanced Video Player (`frontend/src/components/VideoPlayer.jsx`)

```jsx
import React, { useRef, useState, useEffect } from 'react';
import { 
    PlayIcon, 
    PauseIcon, 
    SpeakerWaveIcon, 
    SpeakerXMarkIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

export function VideoPlayer({ src, type, poster, onClose }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [buffered, setBuffered] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlers = {
            play: () => setIsPlaying(true),
            pause: () => setIsPlaying(false),
            ended: () => setIsPlaying(false),
            loadstart: () => setIsLoading(true),
            loadeddata: () => setIsLoading(false),
            timeupdate: () => setCurrentTime(video.currentTime),
            loadedmetadata: () => setDuration(video.duration),
            progress: () => {
                if (video.buffered.length > 0) {
                    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                    const percent = (bufferedEnd / video.duration) * 100;
                    setBuffered(percent);
                }
            },
        };

        Object.entries(handlers).forEach(([event, handler]) => {
            video.addEventListener(event, handler);
        });

        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                video.removeEventListener(event, handler);
            });
        };
    }, []);

    // Auto-hide controls
    useEffect(() => {
        const hideControls = () => {
            if (isPlaying) {
                setShowControls(false);
            }
        };

        const showControlsTemporarily = () => {
            setShowControls(true);
            clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(hideControls, 3000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', showControlsTemporarily);
            container.addEventListener('touchstart', showControlsTemporarily);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', showControlsTemporarily);
                container.removeEventListener('touchstart', showControlsTemporarily);
            }
            clearTimeout(controlsTimeoutRef.current);
        };
    }, [isPlaying]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!videoRef.current) return;
            
            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    videoRef.current.currentTime -= 10;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    videoRef.current.currentTime += 10;
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    changeVolume(0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    changeVolume(-0.1);
                    break;
                case 'm':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'f':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const changeVolume = (delta) => {
        if (videoRef.current) {
            const newVolume = Math.max(0, Math.min(1, volume + delta));
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            if (newVolume === 0) {
                setIsMuted(true);
            } else if (isMuted) {
                setIsMuted(false);
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            if (newVolume === 0) {
                setIsMuted(true);
            } else if (isMuted) {
                setIsMuted(false);
            }
        }
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * duration;
        
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handlePlaybackRateChange = (rate) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
            setPlaybackRate(rate);
            setShowSettings(false);
        }
    };

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div 
            ref={containerRef}
            className={cn(
                'relative bg-black rounded-lg overflow-hidden',
                isFullscreen && 'fixed inset-0 z-50'
            )}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full cursor-pointer"
                onClick={togglePlay}
                playsInline
            />

            {/* Loading spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
                </div>
            )}

            {/* Controls overlay */}
            <div
                className={cn(
                    'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300',
                    showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
            >
                {/* Progress bar */}
                <div 
                    className="relative h-1 bg-white/20 rounded-full mb-4 cursor-pointer group"
                    onClick={handleSeek}
                >
                    {/* Buffered progress */}
                    <div 
                        className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                        style={{ width: `${buffered}%` }}
                    />
                    
                    {/* Playback progress */}
                    <div 
                        className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full group-hover:h-2 transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            className="p-2 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-colors"
                        >
                            {isPlaying ? (
                                <PauseIcon className="h-6 w-6" />
                            ) : (
                                <PlayIcon className="h-6 w-6" />
                            )}
                        </button>

                        {/* Time display */}
                        <div className="text-white text-sm font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>

                        {/* Volume controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleMute}
                                className="p-1 text-white hover:text-gray-300"
                            >
                                {isMuted || volume === 0 ? (
                                    <SpeakerXMarkIcon className="h-5 w-5" />
                                ) : (
                                    <SpeakerWaveIcon className="h-5 w-5" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                         [&::-webkit-slider-thumb]:appearance-none
                                         [&::-webkit-slider-thumb]:w-3
                                         [&::-webkit-slider-thumb]:h-3
                                         [&::-webkit-slider-thumb]:bg-white
                                         [&::-webkit-slider-thumb]:rounded-full
                                         [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Settings */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 text-white hover:text-gray-300"
                            >
                                <Cog6ToothIcon className="h-5 w-5" />
                            </button>
                            
                            {showSettings && (
                                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg p-2 min-w-[120px]">
                                    <div className="text-xs text-gray-400 px-2 py-1">Playback Speed</div>
                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                                        <button
                                            key={rate}
                                            onClick={() => handlePlaybackRateChange(rate)}
                                            className={cn(
                                                'block w-full text-left px-2 py-1 text-sm text-white hover:bg-gray-800 rounded',
                                                playbackRate === rate && 'bg-gray-800'
                                            )}
                                        >
                                            {rate}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fullscreen */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 text-white hover:text-gray-300"
                        >
                            {isFullscreen ? (
                                <ArrowsPointingInIcon className="h-5 w-5" />
                            ) : (
                                <ArrowsPointingOutIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Keyboard shortcuts help */}
            {showControls && (
                <div className="absolute top-4 right-4 text-white/60 text-xs space-y-1">
                    <div>Space/K: Play/Pause</div>
                    <div>← →: Seek 10s</div>
                    <div>↑ ↓: Volume</div>
                    <div>M: Mute</div>
                    <div>F: Fullscreen</div>
                </div>
            )}
        </div>
    );
}
```

## File Preview Modal with Media Support

### Preview Modal (`frontend/src/components/FilePreviewModal.jsx`)

```jsx
import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { VideoPlayer } from './VideoPlayer';
import { detectFileType } from '../utils/fileTypes';
import { apiClient } from '../services/api';
import { useToast } from './Toast';

export function FilePreviewModal({ file, isOpen, onClose }) {
    const { showToast } = useToast();
    const [fileUrl, setFileUrl] = React.useState(null);
    const [fileType, setFileType] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!file || !isOpen) return;

        const loadFile = async () => {
            try {
                setLoading(true);
                const blob = await apiClient.downloadFile(file.id);
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
                
                // Detect file type
                const type = await detectFileType(new File([blob], file.name));
                setFileType(type);
            } catch (error) {
                showToast('Failed to load file', 'error');
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
    }, [file, isOpen]);

    const handleDownload = async () => {
        try {
            const blob = await apiClient.downloadFile(file.id);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('Download started', 'success');
        } catch (error) {
            showToast('Download failed', 'error');
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
                            <h3 className="text-lg font-medium mb-4">{file.name}</h3>
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
                            alt={file.name}
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
                            title={file.name}
                        />
                    );
                } else if (fileType.ext === 'txt') {
                    return (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg max-h-[70vh] overflow-auto">
                            <pre className="whitespace-pre-wrap text-sm">
                                {/* Text content would be loaded here */}
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
                                {file?.name}
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
```

## File Card with Thumbnail Support

### Enhanced File Card (`frontend/src/components/FileCard.jsx`)

```jsx
import React, { useState } from 'react';
import { 
    DocumentIcon, 
    PhotoIcon, 
    VideoCameraIcon, 
    MusicalNoteIcon,
    ArchiveBoxIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import { VideoThumbnail } from './VideoThumbnail';
import { FilePreviewModal } from './FilePreviewModal';
import { apiClient } from '../services/api';
import { useToast } from './Toast';
import { cn } from '../lib/utils';

const fileIcons = {
    image: PhotoIcon,
    video: VideoCameraIcon,
    audio: MusicalNoteIcon,
    document: DocumentIcon,
    archive: ArchiveBoxIcon,
    unknown: DocumentIcon,
};

export function FileCard({ file, onDelete }) {
    const [showPreview, setShowPreview] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const { showToast } = useToast();

    React.useEffect(() => {
        // Generate thumbnail for images
        if (file.type === 'image' && file.thumbnail_id) {
            apiClient.downloadFile(file.thumbnail_id)
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    setThumbnailUrl(url);
                })
                .catch(() => {
                    // Thumbnail generation failed
                });
        }

        return () => {
            if (thumbnailUrl) {
                URL.revokeObjectURL(thumbnailUrl);
            }
        };
    }, [file]);

    const handleDelete = async (e) => {
        e.stopPropagation();
        
        if (!confirm(`Delete ${file.name}?`)) {
            return;
        }

        try {
            setIsDeleting(true);
            await apiClient.deleteFile(file.id);
            showToast('File deleted', 'success');
            onDelete?.(file.id);
        } catch (error) {
            showToast('Failed to delete file', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownload = async (e) => {
        e.stopPropagation();
        
        try {
            const blob = await apiClient.downloadFile(file.id);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('Download started', 'success');
        } catch (error) {
            showToast('Download failed', 'error');
        }
    };

    const formatSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${units[i]}`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const Icon = fileIcons[file.type] || fileIcons.unknown;

    return (
        <>
            <div
                className={cn(
                    'group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
                    'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
                    'transition-all duration-200 cursor-pointer',
                    isDeleting && 'opacity-50 pointer-events-none'
                )}
                onClick={() => setShowPreview(true)}
            >
                {/* Thumbnail or icon */}
                <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-900">
                    {file.type === 'video' ? (
                        <VideoThumbnail
                            src={`/api/files/${file.id}/stream`}
                            className="w-full h-full"
                        />
                    ) : file.type === 'image' && thumbnailUrl ? (
                        <img
                            src={thumbnailUrl}
                            alt={file.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <Icon className="h-16 w-16 text-gray-400" />
                        </div>
                    )}
                    
                    {/* Action buttons overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPreview(true);
                            }}
                            className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white"
                            title="Preview"
                        >
                            <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white"
                            title="Download"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 bg-red-500/90 rounded-full text-white hover:bg-red-500"
                            title="Delete"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* File info */}
                <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate" title={file.name}>
                        {file.name}
                    </h3>
                    <div className="mt-1 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{formatSize(file.size)}</span>
                        <span>{formatDate(file.created_at)}</span>
                    </div>
                </div>
            </div>

            <FilePreviewModal
                file={file}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
            />
        </>
    );
}
```

## Server-Side Video Streaming Support

### Video Streaming Endpoint (Backend)

```rust
// Add to kurpod_server/src/main.rs

use axum::body::StreamBody;
use axum::extract::{Path, Query};
use axum::http::{header, HeaderMap, StatusCode};
use axum::response::IntoResponse;
use futures::stream::StreamExt;
use tokio_util::io::ReaderStream;

#[derive(Deserialize)]
struct RangeQuery {
    range: Option<String>,
}

async fn stream_video_handler(
    Path(file_id): Path<String>,
    Query(query): Query<RangeQuery>,
    auth: AuthenticatedUser,
    State(app_state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, StatusCode> {
    // Get file metadata
    let file_meta = app_state.blob_manager
        .get_file_metadata(&file_id, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;
    
    // Parse range header
    let range = query.range.or_else(|| {
        headers.get(header::RANGE)
            .and_then(|h| h.to_str().ok())
            .map(|s| s.to_string())
    });
    
    let file_size = file_meta.size;
    let (start, end) = if let Some(range) = range {
        parse_range_header(&range, file_size)?
    } else {
        (0, file_size - 1)
    };
    
    // Create stream
    let stream = app_state.blob_manager
        .stream_file_range(&file_id, start, end - start + 1, &auth.encryption_key)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    let body = StreamBody::new(stream);
    
    // Build response headers
    let mut headers = HeaderMap::new();
    headers.insert(header::CONTENT_TYPE, file_meta.mime_type.parse().unwrap());
    headers.insert(
        header::CONTENT_RANGE,
        format!("bytes {}-{}/{}", start, end, file_size).parse().unwrap(),
    );
    headers.insert(
        header::CONTENT_LENGTH,
        (end - start + 1).to_string().parse().unwrap(),
    );
    headers.insert(header::ACCEPT_RANGES, "bytes".parse().unwrap());
    headers.insert(
        header::CACHE_CONTROL,
        "no-cache, no-store, must-revalidate".parse().unwrap(),
    );
    
    let status = if range.is_some() {
        StatusCode::PARTIAL_CONTENT
    } else {
        StatusCode::OK
    };
    
    Ok((status, headers, body))
}

fn parse_range_header(range: &str, file_size: u64) -> Result<(u64, u64), StatusCode> {
    if !range.starts_with("bytes=") {
        return Err(StatusCode::BAD_REQUEST);
    }
    
    let range = &range[6..];
    let parts: Vec<&str> = range.split('-').collect();
    
    if parts.len() != 2 {
        return Err(StatusCode::BAD_REQUEST);
    }
    
    let start = if parts[0].is_empty() {
        // bytes=-100 means last 100 bytes
        let suffix_length = parts[1].parse::<u64>()
            .map_err(|_| StatusCode::BAD_REQUEST)?;
        file_size.saturating_sub(suffix_length)
    } else {
        parts[0].parse::<u64>()
            .map_err(|_| StatusCode::BAD_REQUEST)?
    };
    
    let end = if parts[1].is_empty() {
        // bytes=100- means from byte 100 to end
        file_size - 1
    } else {
        parts[1].parse::<u64>()
            .map_err(|_| StatusCode::BAD_REQUEST)?
            .min(file_size - 1)
    };
    
    if start > end {
        return Err(StatusCode::RANGE_NOT_SATISFIABLE);
    }
    
    Ok((start, end))
}
```

## Key Features Implemented

1. **File Type Detection**
   - Magic byte analysis for accurate type detection
   - Fallback to file extension
   - Support for images, videos, audio, documents

2. **Video Thumbnail Generation**
   - Browser-based thumbnail extraction
   - Seeks to 25% of video duration
   - Fallback UI for errors

3. **Advanced Video Player**
   - Custom controls with modern UI
   - Keyboard shortcuts
   - Playback speed control
   - Volume and fullscreen support
   - Progress buffering display
   - Auto-hide controls

4. **File Preview Modal**
   - Multi-format support
   - Inline video/audio playback
   - Image viewing
   - PDF preview
   - Download option

5. **Server-Side Streaming**
   - HTTP range request support
   - Partial content delivery
   - Efficient memory usage
   - Encrypted stream decryption

## Performance Optimizations

- Lazy loading of media content
- Thumbnail caching with blob URLs
- Efficient video streaming with range requests
- Memory cleanup for blob URLs
- Progressive loading for large files

## Browser Compatibility

- Modern browsers with HTML5 video support
- Fallback for unsupported formats
- Mobile-optimized controls
- Touch gesture support
- Fullscreen API compatibility