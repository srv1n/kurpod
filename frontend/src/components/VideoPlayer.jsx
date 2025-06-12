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