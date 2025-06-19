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