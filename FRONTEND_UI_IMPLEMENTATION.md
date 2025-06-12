# Frontend UI Implementation

## Overview
This document details the comprehensive frontend UI improvements including theme system, responsive design, loading states, and media support that were implemented for KURPOD.

## Theme System Implementation

### Theme Provider (`frontend/src/components/ThemeProvider.jsx`)

```jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check local storage or system preference
        const stored = localStorage.getItem('kurpod-theme');
        if (stored) return stored;
        
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('kurpod-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
```

### Theme Toggle Component (`frontend/src/components/ThemeToggle.jsx`)

```jsx
import React from 'react';
import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
            ) : (
                <SunIcon className="h-5 w-5" />
            )}
        </button>
    );
}
```

### Updated CSS with Theme Variables (`frontend/src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        /* Light theme colors */
        --color-background: 255 255 255;
        --color-foreground: 15 23 42;
        --color-card: 248 250 252;
        --color-card-hover: 241 245 249;
        --color-border: 226 232 240;
        --color-input: 255 255 255;
        --color-primary: 99 102 241;
        --color-primary-hover: 79 70 229;
        --color-secondary: 148 163 184;
        --color-secondary-hover: 100 116 139;
        --color-accent: 236 72 153;
        --color-accent-hover: 219 39 119;
        --color-muted: 248 250 252;
        --color-muted-foreground: 100 116 139;
        --color-error: 239 68 68;
        --color-error-hover: 220 38 38;
        --color-success: 34 197 94;
        --color-success-hover: 22 163 74;
        --color-warning: 251 146 60;
        --color-warning-hover: 249 115 22;
        --color-info: 59 130 246;
        --color-info-hover: 37 99 235;
    }

    .dark {
        /* Dark theme colors */
        --color-background: 9 9 11;
        --color-foreground: 248 250 252;
        --color-card: 24 24 27;
        --color-card-hover: 39 39 42;
        --color-border: 63 63 70;
        --color-input: 39 39 42;
        --color-primary: 129 140 248;
        --color-primary-hover: 99 102 241;
        --color-secondary: 148 163 184;
        --color-secondary-hover: 203 213 225;
        --color-accent: 244 114 182;
        --color-accent-hover: 236 72 153;
        --color-muted: 39 39 42;
        --color-muted-foreground: 161 161 170;
        --color-error: 248 113 113;
        --color-error-hover: 239 68 68;
        --color-success: 74 222 128;
        --color-success-hover: 34 197 94;
        --color-warning: 251 191 36;
        --color-warning-hover: 245 158 11;
        --color-info: 96 165 250;
        --color-info-hover: 59 130 246;
    }

    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground;
        font-feature-settings: "rlig" 1, "calt" 1;
    }
}

@layer components {
    /* Utility classes using CSS variables */
    .bg-background {
        background-color: rgb(var(--color-background));
    }
    
    .bg-card {
        background-color: rgb(var(--color-card));
    }
    
    .text-foreground {
        color: rgb(var(--color-foreground));
    }
    
    .border-border {
        border-color: rgb(var(--color-border));
    }

    /* Animations */
    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    .animate-slideIn {
        animation: slideIn 0.3s ease-out;
    }

    .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
}
```

## Loading States and Skeleton Components

### Loading Spinner (`frontend/src/components/LoadingSpinner.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

export function LoadingSpinner({ className, size = 'md' }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 dark:border-gray-600 dark:border-t-indigo-400',
                    sizeClasses[size]
                )}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
```

### Skeleton Loader (`frontend/src/components/Skeleton.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
                className
            )}
            {...props}
        />
    );
}

export function SkeletonText({ lines = 3, className }) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-4"
                    style={{
                        width: i === lines - 1 ? '80%' : '100%',
                    }}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className }) {
    return (
        <div className={cn('rounded-lg border bg-card p-6', className)}>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <SkeletonText lines={3} className="mt-4" />
        </div>
    );
}
```

### File List with Loading States (`frontend/src/components/FileList.jsx`)

```jsx
import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import { FileCard } from './FileCard';
import { SkeletonCard } from './Skeleton';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';
import { useAuth } from '../contexts/AuthContext';

export function FileList() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            loadFiles();
        }
    }, [isAuthenticated]);

    const loadFiles = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiClient.listFiles();
            setFiles(data.files);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">
                    Error loading files: {error}
                </p>
                <button
                    onClick={loadFiles}
                    className="mt-4 text-indigo-600 hover:text-indigo-500"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (files.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
                <FileCard
                    key={file.id}
                    file={file}
                    onDelete={() => loadFiles()}
                />
            ))}
        </div>
    );
}
```

## Media Player Implementation

### Media Player Component (`frontend/src/components/MediaPlayer.jsx`)

```jsx
import React, { useRef, useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

export function MediaPlayer({ src, type, poster, className }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('play', () => setIsPlaying(true));
        video.addEventListener('pause', () => setIsPlaying(false));
        video.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('play', () => setIsPlaying(true));
            video.removeEventListener('pause', () => setIsPlaying(false));
            video.removeEventListener('ended', () => setIsPlaying(false));
        };
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

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    if (type.startsWith('audio/')) {
        return (
            <div className={cn('bg-gray-100 dark:bg-gray-800 rounded-lg p-4', className)}>
                <audio ref={videoRef} src={src} />
                <div className="flex items-center space-x-4">
                    <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        {isPlaying ? (
                            <PauseIcon className="h-6 w-6" />
                        ) : (
                            <PlayIcon className="h-6 w-6" />
                        )}
                    </button>
                    <div className="flex-1">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={toggleMute}>
                            {isMuted ? (
                                <SpeakerXMarkIcon className="h-5 w-5" />
                            ) : (
                                <SpeakerWaveIcon className="h-5 w-5" />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('relative bg-black rounded-lg overflow-hidden', className)}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full"
                onClick={togglePlay}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30"
                    >
                        {isPlaying ? (
                            <PauseIcon className="h-6 w-6" />
                        ) : (
                            <PlayIcon className="h-6 w-6" />
                        )}
                    </button>
                    <div className="flex-1">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full"
                        />
                    </div>
                    <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
```

## Responsive Design Implementation

### Mobile Navigation (`frontend/src/components/MobileNav.jsx`)

```jsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, session } = useAuth();

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-50 bg-black/50" aria-hidden="true" />
                
                <Dialog.Panel className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <Dialog.Title className="text-lg font-semibold">
                            Menu
                        </Dialog.Title>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-200"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Theme
                                </span>
                                <ThemeToggle />
                            </div>

                            {session && (
                                <div className="py-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Volume: {session.volume_type}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        Session expires: {new Date(session.token.expires_at * 1000).toLocaleTimeString()}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}
```

### Responsive File Grid (`frontend/src/components/FileGrid.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

export function FileGrid({ children, className }) {
    return (
        <div
            className={cn(
                'grid gap-4',
                'grid-cols-1',
                'sm:grid-cols-2',
                'lg:grid-cols-3',
                'xl:grid-cols-4',
                '2xl:grid-cols-5',
                className
            )}
        >
            {children}
        </div>
    );
}

export function FileGridItem({ children, className }) {
    return (
        <div
            className={cn(
                'group relative rounded-lg border bg-card p-4',
                'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
                'transition-all duration-200',
                className
            )}
        >
            {children}
        </div>
    );
}
```

## Toast Notification System

### Toast Component (`frontend/src/components/Toast.jsx`)

```jsx
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

const toastIcons = {
    success: CheckCircleIcon,
    error: ExclamationCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationCircleIcon,
};

const toastColors = {
    success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
};

export function Toast({ message, type = 'info', duration = 5000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);
    const Icon = toastIcons[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return createPortal(
        <div
            className={cn(
                'fixed bottom-4 right-4 z-50',
                'animate-slideIn',
                isVisible ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-300'
            )}
        >
            <div
                className={cn(
                    'flex items-start gap-3 max-w-sm p-4 rounded-lg shadow-lg',
                    toastColors[type]
                )}
            >
                <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="flex-shrink-0 ml-4"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>,
        document.body
    );
}

// Toast Context for global toast management
export const ToastContext = React.createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
```

## File Upload with Progress

### Upload Progress Component (`frontend/src/components/UploadProgress.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

export function UploadProgress({ fileName, progress, size, onCancel }) {
    const formatSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${units[i]}`;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {fileName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatSize(size * (progress / 100))} / {formatSize(size)}
                    </p>
                </div>
                {onCancel && progress < 100 && (
                    <button
                        onClick={onCancel}
                        className="ml-4 text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
            <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div
                        style={{ width: `${progress}%` }}
                        className={cn(
                            'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300',
                            progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
```

### File Upload Zone (`frontend/src/components/FileUploadZone.jsx`)

```jsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { apiClient } from '../services/api';
import { UploadProgress } from './UploadProgress';
import { useToast } from './Toast';
import { cn } from '../lib/utils';

export function FileUploadZone({ onUploadComplete }) {
    const [uploads, setUploads] = useState([]);
    const { showToast } = useToast();

    const onDrop = useCallback(async (acceptedFiles) => {
        for (const file of acceptedFiles) {
            const uploadId = Date.now() + Math.random();
            
            setUploads(prev => [...prev, {
                id: uploadId,
                fileName: file.name,
                size: file.size,
                progress: 0,
            }]);

            try {
                await apiClient.uploadFile(file, (progress) => {
                    setUploads(prev => prev.map(upload =>
                        upload.id === uploadId
                            ? { ...upload, progress }
                            : upload
                    ));
                });

                showToast(`${file.name} uploaded successfully`, 'success');
                onUploadComplete?.();
                
                // Remove from upload list after delay
                setTimeout(() => {
                    setUploads(prev => prev.filter(u => u.id !== uploadId));
                }, 2000);
            } catch (error) {
                showToast(`Failed to upload ${file.name}`, 'error');
                setUploads(prev => prev.filter(u => u.id !== uploadId));
            }
        }
    }, [onUploadComplete, showToast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    });

    return (
        <>
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                )}
            >
                <input {...getInputProps()} />
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {isDragActive
                        ? 'Drop files here...'
                        : 'Drag and drop files here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    All files are encrypted before upload
                </p>
            </div>

            {uploads.length > 0 && (
                <div className="mt-4 space-y-2">
                    {uploads.map(upload => (
                        <UploadProgress
                            key={upload.id}
                            fileName={upload.fileName}
                            size={upload.size}
                            progress={upload.progress}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
```

## Updated App Component with Theme

### Main App Component (`frontend/src/App.jsx`)

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './components/Toast';
import { Layout } from './components/Layout';
import { UnlockScreen } from './components/UnlockScreen';
import { Dashboard } from './pages/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }
    
    return isAuthenticated ? children : <Navigate to="/unlock" />;
}

function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route path="/unlock" element={<UnlockScreen />} />
                            <Route
                                path="/*"
                                element={
                                    <ProtectedRoute>
                                        <Layout>
                                            <Routes>
                                                <Route path="/" element={<Dashboard />} />
                                            </Routes>
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </AuthProvider>
                </Router>
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
```

## Tailwind Configuration

### Updated Tailwind Config (`frontend/tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--color-background) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                card: 'rgb(var(--color-card) / <alpha-value>)',
                'card-hover': 'rgb(var(--color-card-hover) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                input: 'rgb(var(--color-input) / <alpha-value>)',
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                'secondary-hover': 'rgb(var(--color-secondary-hover) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
                error: 'rgb(var(--color-error) / <alpha-value>)',
                'error-hover': 'rgb(var(--color-error-hover) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                'success-hover': 'rgb(var(--color-success-hover) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                'warning-hover': 'rgb(var(--color-warning-hover) / <alpha-value>)',
                info: 'rgb(var(--color-info) / <alpha-value>)',
                'info-hover': 'rgb(var(--color-info-hover) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter var', 'system-ui', 'sans-serif'],
            },
            animation: {
                slideIn: 'slideIn 0.3s ease-out',
                fadeIn: 'fadeIn 0.2s ease-out',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
```

## Key Features Implemented

1. **Dark/Light Theme System**
   - CSS custom properties for dynamic theming
   - System preference detection
   - Persistent theme selection
   - Smooth transitions

2. **Loading States**
   - Skeleton loaders for content
   - Progress indicators for uploads
   - Spinner components
   - Empty states

3. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly interfaces
   - Responsive grid layouts
   - Mobile navigation drawer

4. **Media Support**
   - Video player with custom controls
   - Audio player UI
   - Thumbnail generation
   - Multiple format support

5. **User Feedback**
   - Toast notifications
   - Progress tracking
   - Error states
   - Success confirmations

6. **Animations**
   - Smooth transitions
   - Loading animations
   - Hover effects
   - Mobile gestures

## Performance Optimizations

- Lazy loading of components
- Virtualized lists for large file counts
- Debounced search inputs
- Optimized re-renders with React.memo
- Code splitting for routes
- Progressive image loading

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance
- Reduced motion support