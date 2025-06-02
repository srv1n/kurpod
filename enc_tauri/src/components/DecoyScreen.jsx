import React, { useState, useCallback, useRef, useEffect } from 'react';

// Placeholder Icons (replace with actual icons if using an icon library)
const PlayIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
      <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
    </svg>
);


const SkipBackIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M19.5 21a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 1.5 0v16.5a.75.75 0 0 1-.75.75Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M16.07 4.91a.75.75 0 0 1 0 1.06L9.128 12l6.942 6.03a.75.75 0 1 1-1.004 1.118l-7.5-6.5a.75.75 0 0 1 0-1.118l7.5-6.5a.75.75 0 0 1 1.004 0Z" clipRule="evenodd" />
  </svg>
);

const SkipForwardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 21a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-1.5 0v16.5a.75.75 0 0 0 .75.75Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M7.93 4.91a.75.75 0 0 0 0 1.06L14.872 12l-6.942 6.03a.75.75 0 1 0 1.004 1.118l7.5-6.5a.75.75 0 0 0 0-1.118l-7.5-6.5a.75.75 0 0 0-1.004 0Z" clipRule="evenodd" />
  </svg>
);


const DecoyScreen = ({ onTrigger }) => {
  const [tapCount, setTapCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Start progress in the middle
  const tapTimeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const totalDuration = 270; // Example: 4:30 in seconds

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const stopProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress(); // Clear any existing interval
    // Ensure progress starts if it was at 0 or 100
    setProgress(p => (p === 0 || p === 100 ? 30 : p));
    progressIntervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          stopProgress();
          setIsPlaying(false); // Stop playback visually
          return 100;
        }
        return prevProgress + (100 / totalDuration); // Increment based on duration
      });
    }, 1000); // Update every second
  }, [stopProgress, totalDuration]);


  const handlePlayTap = useCallback(() => {
    const newTapCount = tapCount + 1;
    console.log(`[DecoyScreen] Tap detected. Count: ${newTapCount}`);
    setTapCount(newTapCount);

    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      startProgress();
    } else {
      stopProgress();
    }


    if (newTapCount === 3) {
      console.log('[DecoyScreen] 3 taps detected! Triggering app reveal...');
      onTrigger();
      setTapCount(0);
      setIsPlaying(false); // Ensure it's visually paused
      setProgress(30); // Reset progress visually
      stopProgress(); // Stop timer
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
        tapTimeoutRef.current = null;
      }
      return;
    }

    // Reset taps if timeout occurs
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    tapTimeoutRef.current = setTimeout(() => {
      console.log('[DecoyScreen] Tap timeout, resetting count to 0');
      setTapCount(0);
      // Don't reset isPlaying or progress on tap timeout
      tapTimeoutRef.current = null;
    }, 1500);

  }, [tapCount, onTrigger, isPlaying, startProgress, stopProgress]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      stopProgress(); // Clear progress interval on unmount
    };
  }, [stopProgress]);

  const currentTime = (progress / 100) * totalDuration;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold mb-8">Meditation Timer</h1>

      {/* Placeholder Image */}
      <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-teal-100 to-cyan-200 dark:from-teal-700 dark:to-cyan-800 rounded-lg shadow-md mb-6 flex items-center justify-center text-gray-500 dark:text-gray-300">
        {/* Optional: Add a simple nature icon or similar */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 opacity-50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12H.75m.386-6.364l1.591 1.591" />
        </svg>
      </div>

      {/* Track Info */}
      <div className="text-center mb-8">
        <p className="text-lg font-medium">Mindfulness Session</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Guided Meditation</p>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <SkipBackIcon />
        </button>

        {/* Play/Pause Button - The Trigger */}
        <button
          onClick={handlePlayTap}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Play/Pause - Tap 3 times"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <SkipForwardIcon />
        </button>
      </div>

      {/* Progress bar */}
       <div className="w-full max-w-xs md:max-w-sm mt-8">
          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden"> {/* Added overflow-hidden */}
             <div
                className="h-1 bg-blue-500 rounded-full transition-all duration-1000 ease-linear" // Use transition for smoothness
                style={{ width: `${progress}%` }} // Dynamic width
             ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
             <span>{formatTime(currentTime)}</span>
             <span>{formatTime(totalDuration)}</span>
          </div>
       </div>

      {/* Hint for development/debugging - remove later */}
      {/* <p className="mt-4 text-xs text-gray-500">(Taps: {tapCount})</p> */}
    </div>
  );
};

export default DecoyScreen; 