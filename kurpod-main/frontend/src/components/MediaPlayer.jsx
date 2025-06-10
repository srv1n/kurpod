import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, Button, Progress, Slider } from '@nextui-org/react';

const MediaPlayer = ({ src, type, fileName }) => {
  const mediaRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleLoadedMetadata = () => {
      setDuration(media.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setError('Failed to load media file');
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('error', handleError);
    media.addEventListener('loadstart', handleLoadStart);

    return () => {
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('error', handleError);
      media.removeEventListener('loadstart', handleLoadStart);
    };
  }, [src]);

  // Fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement)
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const togglePlayPause = () => {
    const media = mediaRef.current;
    if (media.paused) {
      media.play();
      setIsPlaying(true);
    } else {
      media.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value) => {
    const media = mediaRef.current;
    media.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    mediaRef.current.volume = value;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        // Request fullscreen
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.mozRequestFullScreen) {
          containerRef.current.mozRequestFullScreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardBody className="flex items-center justify-center h-64">
          <div className="text-center p-6">
            <svg className="w-12 h-12 text-danger mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-default-700 font-medium">{error}</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 bg-black flex flex-col' : ''
      }`}
    >
      <Card className={`w-full ${isFullscreen ? 'h-full rounded-none' : ''}`}>
        <CardBody className={`p-0 ${isFullscreen ? 'flex-1' : ''}`}>
          {/* Media Element */}
          {type === 'video' ? (
            <div className={`relative bg-black ${isFullscreen ? 'flex-1 flex items-center justify-center' : ''}`}>
              <video
                ref={mediaRef}
                src={src}
                className={`w-full object-contain ${isFullscreen ? 'h-full max-h-full' : 'max-h-[400px]'}`}
                preload="metadata"
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center">
              <audio
                ref={mediaRef}
                src={src}
                preload="metadata"
              />
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p className="text-lg font-semibold text-default-900">{fileName}</p>
                <p className="text-sm text-default-500">Audio File</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="p-6 space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                aria-label="Media progress"
                size="sm"
                color="primary"
                value={currentTime}
                maxValue={duration}
                onChange={handleSeek}
                className="max-w-full"
                formatOptions={{ style: 'percent' }}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-gradient-to-br shadow-small from-primary-100 to-primary-500 rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
              />
              <div className="flex justify-between text-xs text-default-500 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons and Volume */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <Button
                  isIconOnly
                  color="primary"
                  variant="shadow"
                  onClick={togglePlayPause}
                  isDisabled={isLoading}
                  className="data-[hover]:scale-105"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </Button>

                {/* File Info */}
                <div>
                  <p className="text-sm font-semibold text-default-900 truncate max-w-[200px]">{fileName}</p>
                  <p className="text-xs text-default-500 capitalize">{type} File</p>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-default-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10H4a2 2 0 00-2 2v0a2 2 0 002 2h2l4 4V6l-4 4z" />
                </svg>
                <Slider
                  aria-label="Volume"
                  size="sm"
                  color="primary"
                  value={volume}
                  maxValue={1}
                  step={0.1}
                  onChange={handleVolumeChange}
                  className="w-24"
                  renderThumb={(props) => (
                    <div
                      {...props}
                      className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                    >
                      <span className="transition-transform bg-gradient-to-br shadow-small from-primary-100 to-primary-500 rounded-full w-2 h-2 block group-data-[dragging=true]:scale-80" />
                    </div>
                  )}
                />
                <span className="text-xs text-default-500 w-10 text-right font-medium">
                  {Math.round(volume * 100)}%
                </span>

                {/* Fullscreen Button - Only show for video */}
                {type === 'video' && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MediaPlayer;