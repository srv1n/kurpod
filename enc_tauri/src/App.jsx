import { useState, useEffect, useMemo, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';
import { pdfjs } from 'react-pdf';
// import { Document, Page } from 'react-pdf';
import { listen } from '@tauri-apps/api/event';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './App.css';

// Import new components
import UnlockScreen from './components/UnlockScreen';
import InitScreen from './components/InitScreen';
import ReadyScreen from './components/ReadyScreen';
import DecoyScreen from './components/DecoyScreen';
import {ModeToggle} from './components/mode-toggle';
import GlobalMessages from './components/GlobalMessages';

// Set PDF.js worker source
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// Example Lock Icon (replace with actual import if you have an icon library)
const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);
// Example Add Icon (replace as needed)
const AddIcon = (props) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a5 5 0 00-5 5v1h1a1 1 0 010 2v1a7 7 0 007 7h1a1 1 0 012 0h1a5 5 0 005-5v-1a1 1 0 012 0v1a7 7 0 01-7 7h-1a1 1 0 01-2 0H8a5 5 0 01-5-5V8a1 1 0 010-2h1V5a7 7 0 017-7h1a1 1 0 110 2h-1z" />
   </svg>
);

function App() {
  const [mode, setMode] = useState('decoy'); // 'decoy', 'unlock','init','ready'
  const [files, setFiles] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blobPath, setBlobPath] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(null);
  const [viewerType, setViewerType] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [isUploading, setIsUploading] = useState(false); // Keep track of ongoing operations
  const [dragActive, setDragActive] = useState(false);
  const [galleryView, setGalleryView] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openFolderMenu, setOpenFolderMenu] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [confirmHiddenPassword, setConfirmHiddenPassword] = useState('');
  const [currentVolumeType, setCurrentVolumeType] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [loadingDataUrl, setLoadingDataUrl] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const isFullscreenApiAvailable = useMemo(() => {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  }, []);

  // Function to clear messages after a delay
  const setTemporaryMessage = useCallback((msg, isError = false) => {
    if (isError) {
      setError(msg);
      setTimeout(() => setError(''), 5000);
    } else {
      setMessage(msg);
      setTimeout(() => setMessage(''), 5000);
    }
  }, [setError, setMessage]); // Add state setters as dependencies

  // --- START: Define navigation functions BEFORE refreshFileList ---

  // Function to navigate to a folder (used by ReadyScreen)
  // NOTE: Needs to be wrapped in useCallback AFTER refreshFileList is defined if refreshFileList depends on it.
  // For now, define it simply.
  const _navigateToFolder = (folderPath) => {
    // Prevent navigating to the same folder
    if (folderPath === currentFolder) return;

    // Add current folder to history *only if* navigating deeper or sideways, not going back via breadcrumbs/refresh
    setNavigationHistory(prev => {
        // Avoid duplicates if navigating back and forth quickly?
        if (prev[prev.length - 1] !== currentFolder) {
            return [...prev, currentFolder];
        }
        return prev;
    });
    setCurrentFolder(folderPath);
    setSelected(null); // Clear selection when changing folder
    setViewerType(null);
    setFileDataUrl(null);
    setOpenFolderMenu(null);
  };

  // Function to go back to the previous folder (used by ReadyScreen)
  // NOTE: Needs useCallback if depended upon.
  const goBack = () => {
    if (navigationHistory.length > 0) {
      const prevFolder = navigationHistory[navigationHistory.length - 1];
      setCurrentFolder(prevFolder);
      setNavigationHistory(prev => prev.slice(0, -1));
      setSelected(null);
      setViewerType(null);
      setFileDataUrl(null);
      setOpenFolderMenu(null);
    } else {
       // If history is empty, we are likely at root, do nothing or ensure root state
       if (currentFolder !== '') {
           setCurrentFolder('');
           setSelected(null);
           setViewerType(null);
           setFileDataUrl(null);
           setOpenFolderMenu(null);
       }
    }
  };

  // --- END: Define navigation functions ---


  // Now define refreshFileList, using the _navigateToFolder defined above
  const refreshFileList = useCallback(async () => {
    console.log("[refreshFileList] Attempting to refresh...");
    // Don't clear messages here, might overwrite feedback from previous actions
    try {
      const response = await invoke('get_file_tree');
      console.log("[refreshFileList] Backend response:", response);
      if (response.success) {
        console.log("[refreshFileList] Received files data:", response.data?.files);
        const fetchedFiles = response.data?.files || [];
        setFiles(fetchedFiles); // Handle potentially missing files array
        console.log("[refreshFileList] Files state updated.");

        // Check if selected file still exists
        if (selected && !fetchedFiles.some(f => f.path === selected)) {
            console.log("[refreshFileList] Selected file no longer exists, clearing selection.");
            setSelected(null);
            setViewerType(null);
            setFileDataUrl(null);
        }

         // Check if current folder still exists
         if (currentFolder && !fetchedFiles.some(f => f.path.startsWith(currentFolder + '/') || f.path === currentFolder)) {
            console.log("[refreshFileList] Current folder seems to no longer exist, navigating back.");
            // Find the nearest existing parent or go to root
            let parent = currentFolder.substring(0, currentFolder.lastIndexOf('/'));
            while (parent && !fetchedFiles.some(f => f.path.startsWith(parent + '/') || f.path === parent)) {
                parent = parent.substring(0, parent.lastIndexOf('/'));
            }
            // Use the internal _navigateToFolder directly as it's in scope
            _navigateToFolder(parent || '');
         }

         // If refresh was successful and we are not in 'decoy' or 'ready' mode, set to 'ready'
         if (mode !== 'decoy' && mode !== 'ready') {
             console.log("[refreshFileList] Refresh successful, setting mode to 'ready'.");
             setMode('ready');
         }

      } else {
        console.warn("[refreshFileList] Failed to get file list:", response.message);
        if (response.message === 'Locked' || response.message?.includes('No encryption key set')) {
           console.log("[refreshFileList] Detected locked state, switching to unlock mode.");
           setMode('unlock');
           setPassword('');
           setHiddenPassword('');
           setConfirmPassword('');
           setConfirmHiddenPassword('');
           setFiles([]);
           setSelected(null);
           setViewerType(null);
           setCurrentFolder('');
           setNavigationHistory([]);
           setCurrentVolumeType(null);
           setGalleryView(false);
           setIsFullscreen(false);
           setFileDataUrl(null);
           setError('Session locked or expired. Please unlock again.');
           setMessage('');
        } else {
           setTemporaryMessage(response.message || 'Failed to get file list', true);
           if (mode !== 'decoy') {
               setMode('unlock');
           }
        }
      }
    } catch (e) {
      setTemporaryMessage(`Error getting file list: ${e.message || e}`, true);
      console.error("[refreshFileList] Error invoking get_file_tree:", e);
       if (e.toString().includes('Locked') || e.toString().includes('No encryption key set')) {
           console.log("[refreshFileList] Detected locked state from error, switching to unlock mode.");
           setMode('unlock');
           setPassword('');
           setHiddenPassword('');
           setConfirmPassword('');
           setConfirmHiddenPassword('');
           setFiles([]);
           setSelected(null);
           setViewerType(null);
           setCurrentFolder('');
           setNavigationHistory([]);
           setCurrentVolumeType(null);
           setGalleryView(false);
           setIsFullscreen(false);
           setFileDataUrl(null);
           setError('Session locked or expired. Please unlock again.');
           setMessage('');
       } else {
           if (mode !== 'decoy') {
               setMode('unlock');
           }
       }
    }
    // NOTE: _navigateToFolder is defined above, so it's stable and doesn't strictly need to be in the deps
    // But including relevant state values is good practice.
  }, [mode, selected, currentFolder]);

  // Now, wrap _navigateToFolder in useCallback so it can be passed down stably
  const navigateToFolder = useCallback(_navigateToFolder, [currentFolder]);

  useEffect(() => {
    // Do NOT attempt initial refresh if we are starting in decoy mode.
    // The refresh will be triggered by revealApp.
    if (mode !== 'decoy') {
        console.log("Initial check: Attempting to refresh file list...");
        refreshFileList();
    }
  }, []); // Run only once on mount, but conditionally based on initial mode

  // Add keyboard event listener for gallery navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (galleryView && viewerType === 'image' && mode === 'ready') { // Ensure only active in ready mode
        if (e.key === 'ArrowLeft') {
          goPrev();
        } else if (e.key === 'ArrowRight') {
          goNext();
        } else if (e.key === 'Escape') {
          exitFullscreenAndGallery();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryView, viewerType, selected, mode]); // Added mode dependency

  // Add listener for fullscreen changes
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

  // Function to toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreenApiAvailable) {
      console.warn("Fullscreen API is not available in this browser.");
      return;
    }
    try {
      const element = document.documentElement;
      if (!isFullscreen) {
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
        else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
        else if (element.msRequestFullscreen) element.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen API error:", err);
    }
  }, [isFullscreen, isFullscreenApiAvailable]);

  // Function to exit fullscreen and gallery view
  const exitFullscreenAndGallery = useCallback(() => {
    console.log("[exitFullscreenAndGallery] Called.");
    if (isFullscreen) {
      console.log("[exitFullscreenAndGallery] Exiting fullscreen...");
      try {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      } catch (err) {
        console.error("Error exiting fullscreen:", err);
      }
    }
    if (window.history.state?.galleryActive) {
        console.log("[exitFullscreenAndGallery] Clearing history state.");
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    console.log("[exitFullscreenAndGallery] Setting galleryView to false.");
    setGalleryView(false);
  }, [isFullscreen]);

  // Handle back button press while gallery is open
  useEffect(() => {
    const handlePopState = (event) => {
      if (galleryView) {
          setGalleryView(false);
          // Exit fullscreen as well if active?
          if (isFullscreen) {
            try {
              if (document.exitFullscreen) document.exitFullscreen();
              else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
              else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
              else if (document.msExitFullscreen) document.msExitFullscreen();
            } catch (err) {
              console.error("Error exiting fullscreen on popstate:", err);
            }
          }
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [galleryView, isFullscreen]); // Added isFullscreen dependency

  // --- START: Define action handlers BEFORE renderContent ---

  // Logout function (used by ReadyScreen)
  const handleLogout = useCallback(async () => {
    console.log('[handleLogout] Attempting to logout...');
    setError('');
    setMessage('');
    try {
      const response = await invoke('logout_encryption');
      console.log("[handleLogout] Backend response:", response);
      if (response.success) {
        console.log('Logout successful');
        setMode('unlock');
        setPassword('');
        setHiddenPassword('');
        setConfirmPassword('');
        setConfirmHiddenPassword('');
        // setBlobPath(''); // Keep blobPath? User likely wants to unlock same blob.
        setFiles([]);
        setSelected(null);
        setViewerType(null);
        setCurrentFolder('');
        setNavigationHistory([]);
        setCurrentVolumeType(null);
        setGalleryView(false);
        setIsFullscreen(false);
        setFileDataUrl(null);
        // Use temporary message for consistency
        setTemporaryMessage('Logged out successfully');
      } else {
        console.error('Logout failed on backend:', response.message);
        setTemporaryMessage(`Logout failed: ${response.message || 'Unknown error'}`, true);
      }
    } catch (e) {
      console.error('Logout invoke error:', e);
      setTemporaryMessage(`Error during logout: ${e.message || e}`, true);
    }
    // Dependencies: state setters are stable, invoke is stable.
    // setTemporaryMessage is defined outside and stable.
    // Need mode if we change it?
  }, [setTemporaryMessage]); // Add dependencies if needed later

  // Initialize or unlock the encryption blob
  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!password) {
      setTemporaryMessage('Password is required', true);
      return;
    }
    if (!blobPath) {
      setTemporaryMessage('Please select a blob file', true);
      return;
    }
    setIsUploading(true);
    setError('');
    setMessage('');
    try {
      const response = await invoke('unlock_encryption', {
        password,
        blobPath
      });
      if (response.success) {
        // Don't set mode directly, let refreshFileList handle it
        // setMode('ready');
        // setFiles(response.data.files || []); // Let refreshFileList handle it
        const message = response.message || '';
        const match = message.match(/Unlocked (\w+) volume/);
        setCurrentVolumeType(match && match[1] ? match[1] : 'Unknown');
        setTemporaryMessage(message || 'Blob unlocked successfully');
        setPassword('');
        setConfirmPassword('');
        setHiddenPassword('');
        setConfirmHiddenPassword('');
        setUploadFiles([]);
        refreshFileList(); // Trigger refresh after successful unlock
      } else {
        setTemporaryMessage(response.message || 'Failed to unlock blob', true);
        setCurrentVolumeType(null);
      }
    } catch (e) {
      setTemporaryMessage(`Error: ${e.message || e}`, true);
      setCurrentVolumeType(null);
    } finally {
      setIsUploading(false);
    }
  };

  // Initialize a new blob
  const handleInit = async (e) => {
    e.preventDefault();
    if (!password) {
      setTemporaryMessage('Standard Password is required', true);
      return;
    }
    if (!blobPath) {
      setTemporaryMessage('Please select a blob file path', true); // Changed message slightly
      return;
    }
    if (password !== confirmPassword) {
      setTemporaryMessage('Standard passwords do not match', true);
      return;
    }
    const hiddenPassTrimmed = hiddenPassword.trim();
    if (hiddenPassTrimmed !== '') {
      if (hiddenPassword !== confirmHiddenPassword) {
        setTemporaryMessage('Hidden passwords do not match', true);
        return;
      }
      if (password === hiddenPassword) {
        setTemporaryMessage('Standard and hidden passwords must be different', true);
        return;
      }
    }

    setIsUploading(true);
    setError('');
    setMessage('');
    try {
      const args = {
        password_s: password,
        password_h: hiddenPassTrimmed === '' ? null : hiddenPassword,
        blob_path: blobPath
      };
      console.log('[handleInit] Invoking init_encryption with args:', JSON.stringify(args)); // Log arguments
      const response = await invoke('init_encryption', args);

      if (response.success) {
        // Don't set mode directly, let auto-unlock and refreshFileList handle it
        // setMode('ready');
        // setFiles([]);
        // setCurrentVolumeType('Standard'); // Let unlock determine type
        setTemporaryMessage(response.message || 'New blob created successfully');
        const initialPassword = password; // Store standard pass to unlock after init
        setPassword('');
        setConfirmPassword('');
        setHiddenPassword('');
        setConfirmHiddenPassword('');

        // --- Auto-unlock after init --- 
        console.log("Attempting auto-unlock after init...");
        try {
           // Determine which password to use for the initial unlock
           const passwordForAutoUnlock = hiddenPassTrimmed !== '' ? hiddenPassword : initialPassword;
           console.log(`Auto-unlocking with ${hiddenPassTrimmed !== '' ? 'HIDDEN' : 'STANDARD'} password.`);

           const unlockResponse = await invoke('unlock_encryption', {
              password: passwordForAutoUnlock, // Use the determined password
              blobPath
           });
           if (unlockResponse.success) {
              console.log("Auto-unlock successful.");
              // setFiles(unlockResponse.data.files || []); // Let refresh handle this
              const unlockMsg = unlockResponse.message || '';
              const match = unlockMsg.match(/Unlocked (\w+) volume/);
              setCurrentVolumeType(match && match[1] ? match[1] : 'Unknown');
              // Upload initial files *after* unlocking
              if (uploadFiles.length) {
                console.log(`Uploading ${uploadFiles.length} initial files...`);
                let uploadSuccessCount = 0;
                let uploadErrorCount = 0;
                // Use path-based upload for initial files if possible
                const initialFilePaths = uploadFiles.map(f => f.path).filter(Boolean);
                if (initialFilePaths.length === uploadFiles.length) {
                    console.log("[handleInit] Using path-based upload for initial files.");
                    try {
                        await invoke('upload_files_by_path', { absolutePaths: initialFilePaths, currentFolder: '' });
                        // Success/error message handled by upload_complete event
                        // We still need to wait for it, but don't need counts here
                    } catch (uploadErr) {
                        console.error("Error invoking initial path-based upload:", uploadErr);
                        setTemporaryMessage('Blob created, but failed to start initial file upload.', true);
                        // Need to trigger refresh manually if invoke fails? Or let it happen anyway?
                        // Let refreshFileList run below
                    }
                } else {
                    console.warn("[handleInit] Some initial files lack paths, falling back to data-based upload.");
                    // Fallback to original data-based upload
                    for (const file of uploadFiles) {
                        try {
                            const fileBuffer = await file.arrayBuffer();
                            const fileData = Array.from(new Uint8Array(fileBuffer));
                            const savePath = file.webkitRelativePath || file.name;
                            console.log(`Initial upload (data): ${savePath}`);
                            await invoke('upload_file_data', { fileData, savePath });
                            uploadSuccessCount++;
                        } catch (error) {
                            console.error(`Error uploading initial file ${file.name}:`, error);
                            uploadErrorCount++;
                        }
                    }
                    if (uploadErrorCount > 0) {
                       setTemporaryMessage(`Blob created, but ${uploadErrorCount} initial files failed to upload.`, true);
                    } else if (uploadSuccessCount > 0) {
                       setTemporaryMessage(`Blob created and ${uploadSuccessCount} initial files uploaded.`);
                    }
                }
                // Refresh needed regardless of upload method to show new files
                refreshFileList(); // Refresh after uploads initiated/completed (data-based)
              } else {
                 const successMsg = unlockResponse.message
                     ? `${unlockResponse.message}. ${hiddenPassTrimmed !== '' ? 'Logged into HIDDEN volume.': ''}`
                     : `Blob created and unlocked${hiddenPassTrimmed !== '' ? ' (HIDDEN volume)': ''}.`;
                 setTemporaryMessage(successMsg.trim()); // Update message post-unlock with hidden info
                 refreshFileList(); // Refresh even if no files uploaded
              }
           } else {
              console.error("Auto-unlock failed after init:", unlockResponse.message);
              const failureMsg = `Blob created, but failed to auto-unlock with ${hiddenPassTrimmed !== '' ? 'HIDDEN' : 'STANDARD'} password. Please try unlocking manually.`;
              setTemporaryMessage(failureMsg, true);
              setMode('unlock'); // Go back to unlock screen
           }
        } catch (unlockErr) {
           console.error("Error during auto-unlock:", unlockErr);
           setTemporaryMessage('Blob created, but an error occurred during auto-unlock. Please unlock manually.', true);
           setMode('unlock'); // Go back to unlock screen
        }
        setUploadFiles([]); // Clear upload list regardless of upload success

      } else {
        setTemporaryMessage(response.message || 'Failed to create new blob', true);
        setCurrentVolumeType(null);
      }
    } catch (e) {
      setTemporaryMessage(`Error: ${e.message || e}`, true);
      setCurrentVolumeType(null);
    } finally {
      setIsUploading(false);
    }
  };

  // Select a blob file (used by Unlock and Init)
  const selectBlobFile = async (forSave = false) => {
    setError('');
    setMessage('');
    try {
      let selectedPath;
      if (forSave) {
          selectedPath = await save({
            // WORKAROUND: Add a dummy extension based on GH issue #1596
            // to potentially force Files app picker on iOS instead of Photos.
            // filters: [{ extensions: ['blob', 'txt'] }],
          });
      } else {
          selectedPath = await open({
            // WORKAROUND: Add a dummy extension based on GH issue #1596
            // to potentially force Files app picker on iOS instead of Photos.
            // filters: [{  extensions: ['blob', 'txt'] }],
            defaultPath: blobPath || undefined,
            // Ensure directory selection is explicitly false (though it's default)
            // and multiple selection is false.
            directory: false,
            multiple: false,
          });
      }

      if (selectedPath) {
        setBlobPath(selectedPath);
      }
    } catch (e) {
      setTemporaryMessage(`Error selecting file: ${e.message || e}`, true);
    }
  };

  // Helper to get file paths from DataTransferItem entries
  const getFilesFromDataTransferItems = (items) => {
      return new Promise((resolve) => { // Removed reject for simplicity, just return paths found
          const filePaths = [];
          const queue = [];
          let entriesProcessed = 0;
          let entriesLaunched = 0;

          const checkCompletion = () => {
              if (entriesProcessed === entriesLaunched && queue.length === 0) {
                  console.log(`[getFilesFromDataTransferItems] Processed ${entriesProcessed} entries.`);
                  resolve(filePaths);
              }
          };

          for (let i = 0; i < items.length; i++) {
              const item = items[i];
              if (item.webkitGetAsEntry) {
                  const entry = item.webkitGetAsEntry();
                  if (entry) {
                      queue.push(entry);
                      entriesLaunched++;
                  }
              }
          }
          console.log(`[getFilesFromDataTransferItems] Launched ${entriesLaunched} top-level entries.`);
          checkCompletion(); // Check if queue was empty initially

          const processNext = () => {
              const entry = queue.shift();
              if (!entry) {
                  checkCompletion(); // Might be the end
                  return;
              }

              if (entry.isFile) {
                  entry.file(
                      (file) => {
                          if (file.path) filePaths.push(file.path);
                          entriesProcessed++;
                          setTimeout(processNext, 0);
                      },
                      (err) => {
                          console.warn("[getFilesFromDataTransferItems] File entry error:", err);
                          entriesProcessed++; // Count error as processed
                          setTimeout(processNext, 0);
                      }
                  );
              } else if (entry.isDirectory) {
                  const reader = entry.createReader();
                  reader.readEntries(
                      (entries) => {
                          for (const e of entries) {
                              queue.push(e);
                              entriesLaunched++;
                          }
                          entriesProcessed++; // Mark directory itself as processed
                          setTimeout(processNext, 0);
                      },
                      (err) => {
                          console.warn("[getFilesFromDataTransferItems] Directory read error:", err);
                          entriesProcessed++; // Count error as processed
                          setTimeout(processNext, 0);
                      }
                  );
              } else {
                  // Skip unknown entry types
                  entriesProcessed++;
                  setTimeout(processNext, 0);
              }
          };

          if (queue.length > 0) {
              processNext(); // Start processing if queue has items
          }
      });
  };

  // Upload file data (used by ReadyScreen)
  const handleUpload = async (eventOrFileList) => {
    let filesToProcess = [];
    let isDragDrop = false;
    if (eventOrFileList?.dataTransfer) {
      isDragDrop = true;
      eventOrFileList.preventDefault();
      eventOrFileList.stopPropagation();
      filesToProcess = Array.from(eventOrFileList.dataTransfer.files || []);
    } else if (eventOrFileList instanceof FileList) {
      filesToProcess = Array.from(eventOrFileList);
    }
    if (!filesToProcess.length) {
      setTemporaryMessage('No files selected for upload.', true);
      setDragActive(false);
      return;
    }

    setError('');
    setMessage('');
    setDragActive(false);
    setIsUploading(true);
    setUploadProgress({ current: 0, total: filesToProcess.length, filename: 'Preparing upload...' });
    await new Promise(res => setTimeout(res, 0));

    let absolutePaths = [];
    if (isDragDrop && eventOrFileList.dataTransfer.items) {
      console.log("[handleUpload] Attempting drag-drop path discovery...");
      try {
        absolutePaths = await getFilesFromDataTransferItems(eventOrFileList.dataTransfer.items);
        console.log(`[handleUpload] Path discovery yielded ${absolutePaths.length} paths.`);
      } catch (err) {
        console.warn("[handleUpload] Error getting paths from items:", err);
      }
    }

    if (absolutePaths.length > 0) {
      const validPaths = absolutePaths.filter(p => typeof p === 'string' && p.length > 0);
      if (validPaths.length > 0) {
          console.log(`[handleUpload] Starting PATH-BASED upload: ${validPaths.length} files.`);
          setUploadProgress({ current: 0, total: validPaths.length, filename: `Uploading ${validPaths.length} files/folders...` });
          try {
              await invoke('upload_files_by_path', { absolutePaths: validPaths, currentFolder });
              // Completion/error message handled by 'upload_complete' event
              console.log("[handleUpload] Path-based upload initiated. Waiting for completion event.");
              // Keep isUploading true until completion event
              return; // Exit early
          } catch (err) {
              console.error(`[handleUpload] Error invoking path-based upload:`, err);
              setTemporaryMessage(`Failed to start path-based upload: ${err.message || err}`, true);
              setIsUploading(false); // Stop loading on immediate invoke error
              setUploadProgress(null);
              return;
          }
      } else {
          console.warn("[handleUpload] Path discovery yielded no valid paths. Falling back to data-based upload.");
      }
    }

    // --- Fallback to Data-based upload ---
    console.log(`[handleUpload] Starting DATA-BASED upload: Reading ${filesToProcess.length} files.`);
    const filesArray = [];
    const savePaths = [];
    let totalBytes = 0;

    setUploadProgress({
      current: 0,
      total: filesToProcess.length,
      filename: `Reading ${filesToProcess.length} files...`,
    });

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      try {
        setUploadProgress({
          current: i + 1,
          total: filesToProcess.length,
          filename: `Reading: ${file.name}`,
        });
        const buffer = await file.arrayBuffer();
        totalBytes += buffer.byteLength;
        const fileData = Array.from(new Uint8Array(buffer));
        const basePath = file.webkitRelativePath || file.name;
        const savePathStr = currentFolder ? `${currentFolder}/${basePath}` : basePath;
        filesArray.push([file.name, fileData]);
        savePaths.push(savePathStr);
      } catch (err) {
        console.error(`Error reading file ${file.name}:`, err);
        setTemporaryMessage(`Skipping file ${file.name} due to read error`, true);
      }
      if (i % 5 === 0) await new Promise(res => setTimeout(res, 0));
    }

    if (!filesArray.length) {
      setTemporaryMessage('No files prepared for data upload.', true);
      setIsUploading(false);
      setUploadProgress(null);
      return;
    }

    console.log(`[handleUpload] Data-based upload: Prepared ${filesArray.length} files, ~${Math.round(totalBytes / 1024 / 1024)} MB. Invoking...`);
    try {
      await invoke('upload_files_by_data', { files: filesArray, savePaths });
      console.log(`[handleUpload] Data-based upload initiated. Waiting for completion event.`);
    } catch (err) {
        console.error(`[handleUpload] Error invoking data-based upload:`, err);
        setTemporaryMessage(`Failed to start data upload: ${err.message || err}`, true);
        setIsUploading(false);
        setUploadProgress(null);
    }
  };

  // Download a file (used by ReadyScreen)
  const handleDownload = async (path) => {
    setError('');
    setMessage('');
    try {
      const fileDataArray = await invoke('download_file_from_blob', { path });
      const fileDataUint8Array = new Uint8Array(fileDataArray);
      const savePath = await save({
        defaultPath: path.split('/').pop(),
      });
      if (!savePath) return;
      await writeFile(savePath, fileDataUint8Array);
      setTemporaryMessage(`Downloaded ${path} successfully`);
    } catch (e) {
      setTemporaryMessage(`Error downloading file: ${e.message || e}`, true);
    }
  };

  // Delete a file (used by ReadyScreen)
  const handleDelete = async (path) => {
    if (!window.confirm(`Are you sure you want to delete the file '${path.split('/').pop()}'?`)) return;
    setError('');
    setMessage('');
    try {
      const response = await invoke('delete_file_from_blob', { path });
      if (response.success) {
        setTemporaryMessage(`Deleted ${path} successfully`);
        refreshFileList();
        if (selected === path) {
          setSelected(null);
          setViewerType(null);
          setFileDataUrl(null);
        }
      } else {
        setTemporaryMessage(response.message || 'Failed to delete file', true);
      }
    } catch (e) {
      setTemporaryMessage(`Error deleting file: ${e.message || e}`, true);
    }
  };

  // Delete a folder (used by ReadyScreen)
  const handleDeleteFolder = async (path) => {
     if (!window.confirm(`Delete folder '${path.split('/').pop()}' and all its contents? This cannot be undone!`)) return;
     setError('');
     setMessage('');
     try {
       const response = await invoke('delete_folder_from_blob', { path });
       if (response.success) {
         setTemporaryMessage(`Deleted folder ${path} successfully`);
         refreshFileList();
         if (currentFolder === path || currentFolder.startsWith(path + '/')) {
             goBack();
         }
       } else {
         setTemporaryMessage(response.message || 'Failed to delete folder', true);
       }
     } catch (e) {
       setTemporaryMessage(`Error deleting folder: ${e.message || e}`, true);
     }
  };

  // Rename a file (used by ReadyScreen)
  const handleRename = async (path) => {
    const currentName = path.split('/').pop();
    const newName = window.prompt('Enter new name:', currentName);
    if (!newName || newName === currentName || !newName.trim()) return;
    const trimmedNewName = newName.trim();
    if (trimmedNewName.includes('/')) {
        setTemporaryMessage('File names cannot contain slashes.', true);
        return;
    }
    const pathParts = path.split('/');
    pathParts.pop();
    const newPath = pathParts.length > 0 ? `${pathParts.join('/')}/${trimmedNewName}` : trimmedNewName;

    setError('');
    setMessage('');
    try {
      const response = await invoke('rename_file_in_blob', { oldPath: path, newPath });
      if (response.success) {
        setTemporaryMessage(`Renamed to ${trimmedNewName} successfully`);
        refreshFileList();
        if (selected === path) {
          setSelected(newPath);
        }
      } else {
        setTemporaryMessage(response.message || 'Failed to rename file', true);
      }
    } catch (e) {
      setTemporaryMessage(`Error renaming file: ${e.message || e}`, true);
    }
  };

  // Viewer and navigation functions
  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const openViewer = useCallback(async (path) => {
    setSelected(path);
    let fileType = 'other';
    if (path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)) {
      fileType = 'image';
    } else if (path.endsWith('.pdf')) {
      fileType = 'pdf';
    }
    setViewerType(fileType);
    if (fileType === 'pdf') {
      setPageNumber(1);
      setNumPages(null);
    }
    // Data URL fetched by useEffect
  }, []);

  // Handler for selecting files for initial upload
  const onFileSelectForInit = e => {
    const fileList = Array.from(e.target.files || []);
    console.log(`Files selected for init: ${fileList.length}`);
    setUploadFiles(fileList);
  };

  // Get files in the current folder
  const getCurrentFolderFiles = useCallback(() => {
    let filteredFiles;
    if (!currentFolder) {
      filteredFiles = files.filter(file => !file.path.includes('/'));
    } else {
      const prefix = currentFolder + '/';
      filteredFiles = files.filter(file => {
        if (!file.path.startsWith(prefix)) return false;
        const relativePath = file.path.substring(prefix.length);
        return !relativePath.includes('/');
      });
    }
    return filteredFiles.sort((a, b) => a.path.localeCompare(b.path));
  }, [files, currentFolder]);

  // Get images in the current folder
  const getCurrentFolderImages = useCallback(() => {
    return getCurrentFolderFiles().filter(file =>
      file.path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)
    );
  }, [getCurrentFolderFiles]);

  const folderImages = useMemo(() => getCurrentFolderImages(), [getCurrentFolderImages]);
  const imageIdx = useMemo(() => folderImages.findIndex(f => f.path === selected), [folderImages, selected]);

  const goPrev = useCallback(() => {
    if (imageIdx > 0) {
      openViewer(folderImages[imageIdx - 1].path);
    }
  }, [imageIdx, folderImages, openViewer]);

  const goNext = useCallback(() => {
    if (imageIdx < folderImages.length - 1) {
      openViewer(folderImages[imageIdx + 1].path);
    }
  }, [imageIdx, folderImages, openViewer]);

  // Get folders in the current directory
  const getCurrentFolders = useCallback(() => {
    const folders = new Set();
    const prefix = currentFolder ? currentFolder + '/' : '';
    const prefixLen = prefix.length;
    files.forEach(file => {
      if (file.path.startsWith(prefix)) {
        const pathAfterPrefix = file.path.substring(prefixLen);
        const firstSlashIndex = pathAfterPrefix.indexOf('/');
        if (firstSlashIndex !== -1) {
          folders.add(pathAfterPrefix.substring(0, firstSlashIndex));
        }
      }
    });
    const folderArray = Array.from(folders).sort();
    return folderArray;
  }, [files, currentFolder]);

  // Function to handle file clicks
  const handleFileClick = async (path) => {
    const isImage = path.match(/\.(png|jpe?g|gif|bmp|webp)$/i);
    const isPdf = path.endsWith('.pdf');

    if (selected === path && viewerType === 'image') {
      if (!loadingDataUrl && fileDataUrl) {
        setGalleryView(true);
      } else {
        console.log("Image data still loading, please wait...");
        setTemporaryMessage("Preview loading...");
      }
      return;
    }

    setSelected(path);
    setGalleryView(false);
    setFileDataUrl(null);
    setLoadingDataUrl(true);

    if (isImage) {
      setViewerType('image');
      setTemporaryMessage('Loading image preview...');
    } else if (isPdf) {
      setViewerType('pdf');
      setTemporaryMessage('Loading PDF preview...');
    } else {
      setViewerType('other');
      setLoadingDataUrl(false);
    }
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (mode !== 'ready' || isUploading) return;
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
        return;
      }
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (mode !== 'ready' || isUploading) return;
    setDragActive(false);
    handleUpload(e);
  };

  // Fetch data URL for image/pdf viewer
  useEffect(() => {
    let isMounted = true;
    let objectUrlToRevoke = null; // Keep track of the URL created by this specific effect run

    const executeFetch = async (pathToFetch) => { // Pass path as argument
      // Ensure we only proceed if the path matches the *current* selection
      // This helps abort stale fetches if the user clicks quickly
      if (!isMounted || pathToFetch !== selected) {
          console.log(`[fetchDataUrl] Aborting fetch for ${pathToFetch} as component unmounted or selection changed to ${selected}`);
          // If this fetch is aborted early because it's stale, the loading state
          // might have been set to true by a *newer* fetch. Don't set it to false here.
          // setLoadingDataUrl(false);
          return;
      }

      setLoadingDataUrl(true);
      setFileDataUrl(null); // Clear previous URL immediately for this path
      try {
        console.log(`[fetchDataUrl] Fetching blob data for: ${pathToFetch}`);
        const fileDataArray = await invoke('download_file_from_blob', { path: pathToFetch });

        // Double-check after await if component is still mounted AND selection is still the same
        if (!isMounted || pathToFetch !== selected) { 
            console.log(`[fetchDataUrl] Aborting processing for ${pathToFetch} after await as component unmounted or selection changed to ${selected}`);
            // Data was fetched but is now stale. If a new fetch started, loading is true.
            // If no new fetch started, loading should become false.
            // We can't reliably know here, so let the finally block handle loading state.
            return;
        }

        const fileDataUint8Array = new Uint8Array(fileDataArray);
        let mimeType = 'application/octet-stream';
        if (viewerType === 'pdf') {
          mimeType = 'application/pdf';
        } else if (viewerType === 'image') {
          const ext = pathToFetch.split('.').pop().toLowerCase();
          if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(ext)) {
            mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
          }
        }
        const blob = new Blob([fileDataUint8Array], { type: mimeType });
        const url = URL.createObjectURL(blob);
        objectUrlToRevoke = url; // Store the URL *created by this run* to revoke later

        console.log(`[fetchDataUrl] Created Object URL for: ${pathToFetch}`);
        // Final check before setting state
        if (isMounted && pathToFetch === selected) {
            setFileDataUrl(url); // Set the state
        }

      } catch (error) {
        console.error(`Error fetching data for ${pathToFetch}:`, error);
        // Only update state if mounted and this error corresponds to the current selection
        if (isMounted && pathToFetch === selected) { 
            setTemporaryMessage(`Error loading preview for ${pathToFetch}: ${error.message}`, true);
            setFileDataUrl(null);
        }
      } finally {
         // Only set loading to false if this fetch corresponds to the *current* selection
         // AND the component is still mounted.
         if (isMounted && pathToFetch === selected) {
            setLoadingDataUrl(false);
         } else if (isMounted) {
            // If this fetch was for a stale selection, loading might have already been
            // set to true by the *new* fetch. Don't set it to false here.
            console.log(`[fetchDataUrl] Not setting loading to false for stale fetch ${pathToFetch}`);
         }
      }
    };

    // Initial check for valid selection and type before calling executeFetch
    if (selected && (viewerType === 'image' || viewerType === 'pdf')) {
      executeFetch(selected); // Call the async helper with the current selected path
    } else {
      // If selection/type is invalid, ensure URL is cleared and loading is false
      setFileDataUrl(null);
      setLoadingDataUrl(false);
    }

    // Cleanup function: Will revoke the URL created by *this specific effect run*
    return () => {
      isMounted = false;
      if (objectUrlToRevoke) {
        console.log(`[fetchDataUrl] Revoking Object URL: ${objectUrlToRevoke} (associated with fetch for ${selected})`);
        URL.revokeObjectURL(objectUrlToRevoke);
      }
      // Avoid setting loading to false here, as the finally block handles it more accurately
      // based on whether the fetch was stale or not.
    };
  }, [selected, viewerType, setTemporaryMessage]); // Ensure setTemporaryMessage is stable or included

  // Event listeners for uploads
  useEffect(() => {
    let unlistenProgress, unlistenComplete, unlistenError; // Added unlistenError

    (async () => {
      try {
        unlistenProgress = await listen('upload_progress', (event) => {
          console.log("Upload Progress:", event.payload);
          setUploadProgress(event.payload);
        });

        // Modify the upload_complete listener
        unlistenComplete = await listen('upload_complete', (event) => {
          console.log("Upload Complete Event:", event.payload);
          setUploadProgress(null); // Hide progress indicator

          const status = event.payload; // Payload is UploadCompletionStatus
          if (status.success) {
              setTemporaryMessage(`Upload finished successfully (${status.processed_files}/${status.total_files} files).`);
          } else {
              const errorMsg = status.errors && status.errors.length > 0
                              ? `Upload finished with errors. First error: ${status.errors[0]}`
                              : 'Upload finished with unknown errors.';
              setTemporaryMessage(`${errorMsg} (${status.processed_files}/${status.total_files} processed).`, true);
              console.error("Upload failed with errors:", status.errors);
          }
          // Refresh the file list AFTER the upload is fully complete
          refreshFileList();
        });

        // Optional: Add listener for general upload errors (like lock failure)
        unlistenError = await listen('upload_error', (event) => {
          console.error("General Upload Error:", event.payload);
          setUploadProgress(null); // Hide progress on general error
          setTemporaryMessage(`Upload failed: ${event.payload}`, true);
          // No refresh needed usually if the whole process failed early
        });

      } catch (e) {
         console.error("Error setting up event listeners:", e);
         // Handle listener setup error
      }
    })();

    // Cleanup function
    return () => {
      if (unlistenProgress) unlistenProgress();
      if (unlistenComplete) unlistenComplete();
      if (unlistenError) unlistenError(); // Cleanup error listener
    };
  }, [refreshFileList, setTemporaryMessage]); // Ensure dependencies are stable or included

  // Reveal app function
  const revealApp = useCallback(() => {
      console.log("Revealing app, checking status...");
      refreshFileList();
  }, [refreshFileList]);

  // Function to go back to the decoy screen
  const goBackToDecoy = useCallback(() => {
      console.log("Going back to decoy screen...");
      setMode('decoy');
      // Reset relevant state, similar to logout but without backend call
      // Keep blobPath so user doesn't have to re-select it immediately
      setPassword('');
      setHiddenPassword('');
      setConfirmPassword('');
      setConfirmHiddenPassword('');
      setFiles([]);
      setSelected(null);
      setViewerType(null);
      setCurrentFolder('');
      setNavigationHistory([]);
      setCurrentVolumeType(null);
      setGalleryView(false);
      setIsFullscreen(false);
      setFileDataUrl(null);
      setError('');
      setMessage('');
      setUploadProgress(null);
      setIsUploading(false);
      // No need to call backend logout
  }, []); // No dependencies needed as it only uses setters

  const zoomIn = () => setScale(s => s + 0.25);
  const zoomOut = () => setScale(s => Math.max(0.25, s - 0.25));

  // --- END: Define action handlers ---

  useEffect(() => {
    // Listen for upload progress events
    let unlistenProgress, unlistenComplete, unlistenError; // Added unlistenError

    (async () => {
      try {
        unlistenProgress = await listen('upload_progress', (event) => {
          console.log("Upload Progress:", event.payload);
          setUploadProgress(event.payload);
        });

        // Modify the upload_complete listener
        unlistenComplete = await listen('upload_complete', (event) => {
          console.log("Upload Complete Event:", event.payload);
          setUploadProgress(null); // Hide progress indicator

          const status = event.payload; // Payload is UploadCompletionStatus
          if (status.success) {
              setTemporaryMessage(`Upload finished successfully (${status.processed_files}/${status.total_files} files).`);
          } else {
              const errorMsg = status.errors && status.errors.length > 0
                              ? `Upload finished with errors. First error: ${status.errors[0]}`
                              : 'Upload finished with unknown errors.';
              setTemporaryMessage(`${errorMsg} (${status.processed_files}/${status.total_files} processed).`, true);
              console.error("Upload failed with errors:", status.errors);
          }
          // Refresh the file list AFTER the upload is fully complete
          refreshFileList();
        });

        // Optional: Add listener for general upload errors (like lock failure)
        unlistenError = await listen('upload_error', (event) => {
          console.error("General Upload Error:", event.payload);
          setUploadProgress(null); // Hide progress on general error
          setTemporaryMessage(`Upload failed: ${event.payload}`, true);
          // No refresh needed usually if the whole process failed early
        });

      } catch (e) {
         console.error("Error setting up event listeners:", e);
         // Handle listener setup error
      }
    })();

    // Cleanup function
    return () => {
      if (unlistenProgress) unlistenProgress();
      if (unlistenComplete) unlistenComplete();
      if (unlistenError) unlistenError(); // Cleanup error listener
    };
  }, [refreshFileList, setTemporaryMessage]); // Ensure dependencies are stable or included

  // --- Render Logic --- decidir based on mode

  const renderContent = () => {
    switch (mode) {
      case 'decoy':
        return (
          <DecoyScreen onTrigger={revealApp} />
        );
      case 'unlock':
        return (
          <UnlockScreen
            password={password}
            setPassword={setPassword}
            blobPath={blobPath}
            setBlobPath={setBlobPath}
            selectBlobFile={() => selectBlobFile(false)}
            handleUnlock={handleUnlock}
            setMode={setMode}
            isUploading={isUploading}
          />
        );
      case 'init':
        return (
          <InitScreen
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            confirmHiddenPassword={confirmHiddenPassword}
            setConfirmHiddenPassword={setConfirmHiddenPassword}
            blobPath={blobPath}
            selectBlobFile={() => selectBlobFile(true)}
            handleInit={handleInit}
            uploadFiles={uploadFiles}
            onFileSelectForInit={onFileSelectForInit}
            isUploading={isUploading}
            setMode={setMode}
          />
        );
      case 'ready':
        return (
          <ReadyScreen
            files={files}
            currentFolder={currentFolder}
            navigateToFolder={navigateToFolder}
            goBack={goBack}
            handleFileClick={handleFileClick}
            handleUpload={handleUpload}
            handleDownload={handleDownload}
            handleDelete={handleDelete}
            handleRename={handleRename}
            handleLogout={handleLogout}
            selected={selected}
            viewerType={viewerType}
            fileDataUrl={fileDataUrl}
            loadingDataUrl={loadingDataUrl}
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            galleryView={galleryView}
            setGalleryView={setGalleryView}
            exitFullscreenAndGallery={exitFullscreenAndGallery}
            goPrev={goPrev}
            goNext={goNext}
            toggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
            currentVolumeType={currentVolumeType}
            handleDeleteFolder={handleDeleteFolder}
            refreshFileList={refreshFileList}
            isUploading={isUploading}
            dragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            getCurrentFolders={getCurrentFolders}
            getCurrentFolderFiles={getCurrentFolderFiles}
            folderImages={folderImages}
            openFolderMenu={openFolderMenu}
            setOpenFolderMenu={setOpenFolderMenu}
            navigationHistory={navigationHistory}
            setTemporaryMessage={setTemporaryMessage}
            uploadProgress={uploadProgress}
            goBackToDecoy={goBackToDecoy}
          />
        );
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-full overflow-hidden">
      {mode !== 'decoy' && uploadProgress && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg rounded px-6 py-4 z-50 flex flex-col items-center">
          <span className="mb-2 font-semibold">Uploading and Encrypting...</span>
          <span className="mb-2 text-sm">{uploadProgress.filename} ({uploadProgress.current} / {uploadProgress.total})</span>
          <progress value={uploadProgress.current} max={uploadProgress.total} className="w-48 h-2" />
        </div>
      )}
      {mode !== 'decoy' && (
          <div className="mode-toggle-fixed">
            <ModeToggle />
          </div>
      )}
      {renderContent()}

      {mode !== 'decoy' && (
          <GlobalMessages error={error} message={message} setError={setError} setMessage={setMessage} />
      )}
    </div>
  );
}

export default App;
