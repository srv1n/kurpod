import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf';
// Make sure to include the CSS for react-pdf for proper rendering
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Import our improved components
import Button from './components/Button';
import Input from './components/Input';
import { Card, CardHeader, CardContent, CardFooter } from './components/Card';
import LoadingSpinner from './components/LoadingSpinner';
 
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    
// Helper function to check server status and extract mode info    
const checkServerStatus = async (setServerMode, setAvailableBlobs) => {   
  try { 
    const res = await fetch('/api/status');
    if (res.ok) { 
      const response = await res.json(); 
      const data = response.data;
      
      // Set server mode and available blobs
      setServerMode(data.mode);
      if (data.mode === 'directory' && data.available_blobs) {
        setAvailableBlobs(data.available_blobs);
      }
      
      return data.status === 'ready';
    }
    // If status endpoint gives 401 or similar, it means not unlocked
    if (res.status === 401) {
      return false;
    }
    // Treat other errors as potentially unlocked but unable to confirm, default to unlock screen
    return false;
  } catch (error) {
    console.error('Failed to check server status:', error);
    return false; // Default to unlock if status check fails
  }
};

function App() {
  const [mode, setMode] = useState('checking'); // 'checking', 'unlock','init','ready'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blobPath, setBlobPath] = useState(() => {
    // Load last used blob path from localStorage (only used for single mode)
    return localStorage.getItem('lastBlobPath') || 'data.blob';
  });
  // New state for blob mode handling
  const [serverMode, setServerMode] = useState(null); // 'single' | 'directory'
  const [availableBlobs, setAvailableBlobs] = useState([]);
  const [selectedBlob, setSelectedBlob] = useState('');
  const [newBlobName, setNewBlobName] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [viewerType, setViewerType] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [galleryView, setGalleryView] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openFolderMenu, setOpenFolderMenu] = useState(null);
  const isFullscreenApiAvailable = useMemo(() => {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  }, []);
  // Add state for hidden password
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [confirmHiddenPassword, setConfirmHiddenPassword] = useState('');
  const [currentVolumeType, setCurrentVolumeType] = useState(null); // Add state to track volume type
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (mode === 'ready') refreshTree();
  }, [mode]);

  // Add keyboard event listener for gallery navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (galleryView && viewerType === 'image') {
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
  }, [galleryView, viewerType, selected]);

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
        // Request fullscreen
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen(); /* Safari */
        else if (element.mozRequestFullScreen) element.mozRequestFullScreen(); /* Firefox */
        else if (element.msRequestFullscreen) element.msRequestFullscreen(); /* IE11 */
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); /* Safari */
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen(); /* Firefox */
        else if (document.msExitFullscreen) document.msExitFullscreen(); /* IE11 */
      }
    } catch (err) {
      console.error("Fullscreen API error:", err);
      // Fallback or error message if needed
    }
  }, [isFullscreen, isFullscreenApiAvailable]);

  // Function to exit fullscreen and gallery view
  const exitFullscreenAndGallery = useCallback(() => {
    if (isFullscreen) {
      try {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      } catch (err) {
        console.error("Error exiting fullscreen:", err);
      }
    }
    // Check if we might have pushed a state for the gallery
    // Using replaceState avoids issues if the user manually navigated back already
    if (window.history.state?.galleryActive) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setGalleryView(false);
  }, [isFullscreen]);

  // Handle back button press while gallery is open
  useEffect(() => {
    const handlePopState = (event) => {
      // If gallery is open when user navigates back, close it
      if (galleryView) {
          // We don't need to call exitFullscreen here as the browser handles it on back
          // Just make sure our state is correct and the gallery closes
          setGalleryView(false);
          setIsFullscreen(false); // Assume fullscreen exited on back navigation
          // Ensure our state reflects the URL change
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [galleryView]); // Rerun if galleryView changes

  // Check login status on initial mount
  useEffect(() => {
    checkServerStatus(setServerMode, setAvailableBlobs).then(isReady => {
      if (isReady) {
        setMode('ready');
      } else {
        setMode('unlock'); // Or 'init' based on some other logic if needed
      }
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  const refreshTree = async () => {
    try {
      const res = await fetch('/api/tree');
      if (res.ok) {
        const json = await res.json();
        setFiles(json.data.files);
      }
    } catch (error) {
      console.error('Failed to refresh files:', error);
    }
  };

  const handleUnlock = async e => {
    e.preventDefault();
    try {
      setIsUploading(true);
      
      // Prepare payload based on server mode
      let payload = { password };
      
      if (serverMode === 'single') {
        console.log('Trying to unlock single blob with password:', password);
        // In single mode, no blob selection needed
      } else if (serverMode === 'directory') {
        if (!selectedBlob) {
          alert('Please select a blob file');
          return;
        }
        console.log('Trying to unlock blob:', selectedBlob, 'with password:', password);
        payload.blob_name = selectedBlob;
      }
      
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Unlock response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('Unlock response data:', data);
        // Attempt to parse volume type from message (improve this later if backend sends structured data)
        const message = data.message || '';
        if (message.includes('Standard')) {
          setCurrentVolumeType('Standard');
        } else if (message.includes('Hidden')) {
          setCurrentVolumeType('Hidden');
        } else {
          setCurrentVolumeType('Unknown'); // Fallback
        }
        setMode('ready');
        refreshTree(); // Refresh tree on successful unlock
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
        console.error('Unlock error response:', errorData);
        // Check if the error indicates it's already unlocked
        // Adjust the condition based on the actual error message/code from your backend
        if (res.status === 400 && errorData.message?.includes('already unlocked')) {
           console.log('Storage already unlocked, proceeding.');
           setMode('ready');
        } else {
          alert(`Unlock failed: ${errorData.message || 'Please check your password and try again.'}`);
        }
        setCurrentVolumeType(null); // Clear volume type on failed unlock
      }
    } catch (error) {
      console.error('Unlock error:', error);
      alert('An error occurred during unlock');
      setCurrentVolumeType(null); // Clear volume type on error
    } finally {
      setIsUploading(false);
    }
  };

  const handleInit = async e => {
    e.preventDefault();
    
    // --- Validation ---
    if (password !== confirmPassword) { 
      alert('Standard passwords do not match'); 
      return; 
    }
    if (password.trim() === '') {
      alert('Standard password cannot be empty');
      return;
    }
    // Validate hidden password only if provided
    if (hiddenPassword.trim() !== '') {
      if (hiddenPassword !== confirmHiddenPassword) {
        alert('Hidden passwords do not match');
        return;
      }
      if (password === hiddenPassword) {
        alert('Standard and hidden passwords must be different');
        return;
      }
    }
    // --- End Validation ---

    try {
      setIsUploading(true);
      console.log('Initializing with standard password:', password);
      if (hiddenPassword.trim() !== '') {
        console.log('Using provided hidden password.');
      } else {
        console.log('No hidden password provided (backend will generate one).');
      }
      
      // Prepare payload based on server mode
      const initPayload = {
        password_s: password,
        password_h: hiddenPassword.trim() === '' ? null : hiddenPassword, // Send null if empty
      };
      
      if (serverMode === 'single') {
        console.log('Initializing single blob');
        // In single mode, no blob selection needed
      } else if (serverMode === 'directory') {
        if (!newBlobName.trim()) {
          alert('Please enter a blob name');
          return;
        }
        console.log('Initializing new blob:', newBlobName);
        initPayload.blob_name = newBlobName.trim();
      }
      
      let res = await fetch('/api/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initPayload), // Send updated payload
      });
      
      console.log('Init response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('Init response data:', data);
        // Parse volume type from init message
         const message = data.message || '';
         if (message.includes('standard volume')) {
           setCurrentVolumeType('Standard');
         } else if (message.includes('hidden volume')) { // If we change default login later
           setCurrentVolumeType('Hidden');
         } else {
           setCurrentVolumeType('Unknown');
         }
        
        // Files can be uploaded after blob creation through the main interface
        
        setMode('ready');
        refreshTree(); // Refresh tree after successful init/upload
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Init error response:', errorData);
        alert('Initialization failed: ' + (errorData.message || 'Unknown error')); 
        setCurrentVolumeType(null); // Clear volume type on failed init
      }
    } catch (error) {
      console.error('Init error:', error);
      alert('An error occurred during initialization');
      setCurrentVolumeType(null); // Clear volume type on error
    } finally {
      setIsUploading(false);
    }
  };
 
  const onFileSelect = e => {
    const fileList = Array.from(e.target.files);
    console.log(`Files selected via input: ${fileList.length}`);
    setUploadFiles(fileList);
  };

  const handleUpload = async (eventOrFileList) => {
    let items;
    // Check if it's an event or a FileList/Array
    if (eventOrFileList.target && eventOrFileList.target.files) {
      // From file input event
      items = eventOrFileList.target.files;
      console.log(`Files from input event: ${items.length}`);
    } else if (eventOrFileList.dataTransfer && eventOrFileList.dataTransfer.files) {
      // From drop event
      items = eventOrFileList.dataTransfer.files;
      console.log(`Files from drop event: ${items.length}`);
    } else if (Array.isArray(eventOrFileList) || eventOrFileList instanceof FileList) {
       // Directly passed FileList or Array
       items = eventOrFileList;
       console.log(`Files from list: ${items.length}`);
    } else {
      console.log('No valid files source found for upload');
      return;
    }

    if (!items || !items.length) {
      console.log('No files selected for upload');
      setDragActive(false); // Ensure drag state is reset
      return;
    }

    console.log('Files selected for upload:', items.length);
    
    try {
      setIsUploading(true);
      
      // Generate a unique batch ID for this upload session
      const batchId = 'batch-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
      console.log(`Using batch ID: ${batchId}`);
      
      // Process files in batches for UI responsiveness, but use the new batch API
      const MAX_FILES_PER_BATCH = 5; // Can be larger since we're not saving after each batch
      const batches = [];
      
      // Create batches of files
      for (let i = 0; i < items.length; i += MAX_FILES_PER_BATCH) {
        batches.push(Array.from(items).slice(i, i + MAX_FILES_PER_BATCH));
      }
      
      console.log(`Split upload into ${batches.length} batches`);
      
      for (let [batchIndex, batch] of batches.entries()) {
        const isLastBatch = batchIndex === batches.length - 1;
        console.log(`Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} files), is final: ${isLastBatch}`);
        
        const fd = new FormData();
        batch.forEach(f => {
          console.log('Adding file to upload:', f.name, f.webkitRelativePath || '(no path)');
          fd.append('file', f, f.webkitRelativePath || f.name);
        });
        
        console.log(`Sending batch upload request for batch ${batchIndex + 1}...`);
        
        // Use custom fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
        
        try {
          const url = `/api/batch-upload?batch_id=${encodeURIComponent(batchId)}&is_final_batch=${isLastBatch}`;
          const res = await fetch(url, { 
            method: 'POST', 
            body: fd,
            signal: controller.signal 
          });
          
          clearTimeout(timeoutId);
          console.log(`Batch ${batchIndex + 1} response status:`, res.status);
          
          if (!res.ok) {
            const errorText = await res.text().catch(() => 'No error details available');
            console.error(`Batch ${batchIndex + 1} failed with status:`, res.status, errorText);
            alert(`Upload failed on batch ${batchIndex + 1}: ${res.status === 413 ? 'Files may be too large' : errorText}`);
            return; // Stop processing batches if one fails
          }
          
          // If this is the last batch and it completed successfully, refresh the file tree
          if (isLastBatch) {
            console.log('Final batch uploaded successfully, refreshing tree');
            refreshTree();
          }
        } catch (error) {
          console.error(`Batch ${batchIndex + 1} error:`, error.name, error.message);
          alert(`Upload error on batch ${batchIndex + 1}: ${error.name === 'AbortError' ? 'Request timed out after 2 minutes' : error.toString()}`);
          return; // Stop processing batches if one fails
        }
      }
      
    } catch (error) {
      console.error('Upload error:', error.name, error.message);
      alert('Upload error: ' + (error.name === 'AbortError' ? 'Request timed out after 2 minutes' : error.toString()));
    } finally {
      setIsUploading(false);
      setDragActive(false);
    }
  };

  const handleRename = async path => {
    const currentName = path.split('/').pop();
    const np = prompt('New name', currentName);
    if (!np || np === currentName) return;

    // Construct the new full path
    const pathParts = path.split('/');
    pathParts.pop(); // Remove old name
    const newPath = pathParts.length > 0 ? `${pathParts.join('/')}/${np}` : np;

    try {
      const res = await fetch('/api/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ old_path: path, new_path: newPath }),
      });
      if (res.ok) refreshTree();
      else {
        const errorData = await res.json().catch(() => ({ message: 'Rename failed' }));
        alert(`Rename failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Rename error:', error);
      alert('An error occurred while renaming');
    }
  };

  const handleDelete = async path => {
    if (!window.confirm(`Delete ${path}?`)) return;
    
    try {
      const res = await fetch(`/api/delete?path=${encodeURIComponent(path)}`, { method: 'DELETE' });
      if (res.ok) {
        refreshTree();
        if (selected === path) {
          setSelected(null);
          setViewerType(null);
        }
      } else alert('Delete failed');
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting');
    }
  };

  const handleDeleteFolder = async path => {
    if (!window.confirm(`Delete folder ${path} and all its files? This cannot be undone!`)) return;
    
    try {
      const res = await fetch(`/api/delete-folder?path=${encodeURIComponent(path)}`, { method: 'DELETE' });
      if (res.ok) {
        refreshTree();
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Delete failed' }));
        alert(`Delete failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
  
  const openViewer = useCallback(path => {
    setSelected(path);
    if (path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)) {
      setViewerType('image');
      setIsImageLoading(true); // Start loading spinner
    } else if (path.endsWith('.pdf')) {
      setViewerType('pdf');
      setPageNumber(1);
      setNumPages(null);
    } else {
      // Fallback for non-image/pdf files (optional: could add text viewer etc.)
      // Maybe trigger download directly
      // window.open(`/api/download?path=${encodeURIComponent(path)}`);
      setViewerType('other'); // Indicate a non-previewable file is selected
    }
  }, [setSelected, setViewerType, setPageNumber, setNumPages]); // Dependencies are stable state setters
  
  // Get files in the current folder only
  const getCurrentFolderFiles = useCallback(() => {
    // If no current folder, return only root-level files
    if (!currentFolder) {
      return files.filter(file => !file.path.includes('/'));
    }
    
    // Filter files that are directly in the current folder
    return files.filter(file => {
      const filePath = file.path;
      const relativePath = filePath.startsWith(currentFolder) 
        ? filePath.substring(currentFolder.length) 
        : filePath;
      
      // Files directly in this folder won't have additional slashes
      return relativePath.startsWith('/') && !relativePath.substring(1).includes('/');
    });
  }, [files, currentFolder]);
  
  // Get images in the current folder only
  const getCurrentFolderImages = useCallback(() => {
    return getCurrentFolderFiles().filter(file => 
      file.path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)
    );
  }, [getCurrentFolderFiles]);
  
  // Find index of current image among folder images
  const folderImages = useMemo(() => getCurrentFolderImages(), [getCurrentFolderImages]);
  const imageIdx = folderImages.findIndex(f => f.path === selected);
  
  const goPrev = useCallback(() => {
    if (imageIdx > 0) {
      openViewer(folderImages[imageIdx - 1].path);
    }
  }, [imageIdx, folderImages, openViewer]); // Added openViewer dependency
  
  const goNext = useCallback(() => {
    if (imageIdx < folderImages.length - 1) {
      openViewer(folderImages[imageIdx + 1].path);
    }
  }, [imageIdx, folderImages, openViewer]); // Added openViewer dependency
  
  const zoomIn = () => setScale(s => s + 0.25);
  const zoomOut = () => setScale(s => Math.max(0.25, s - 0.25));
  
  // Function to navigate to a folder
  const navigateToFolder = (folderPath) => {
    // Add current folder to history before changing
    if (currentFolder) {
      setNavigationHistory(prev => [...prev, currentFolder]);
    }
    setCurrentFolder(folderPath);
    setSelected(null);
    setViewerType(null);
  };
  
  // Function to go back to the previous folder
  const goBack = () => {
    if (navigationHistory.length > 0) {
      const prevFolder = navigationHistory[navigationHistory.length - 1];
      setCurrentFolder(prevFolder);
      setNavigationHistory(prev => prev.slice(0, -1));
      setSelected(null);
      setViewerType(null);
    } else {
      // If no history, go to root
      setCurrentFolder('');
      setSelected(null);
      setViewerType(null);
    }
  };
  
  // Get folders in the current directory
  const getCurrentFolders = useCallback(() => {
    const folders = new Set();
    
    files.forEach(file => {
      const filePath = file.path;
      
      // If at root level, get only top-level folders
      if (currentFolder === '') {
        const parts = filePath.split('/');
        if (parts.length > 1) {
          folders.add(parts[0]);
        }
      } 
      // If in a subfolder, get only the immediate child folders
      else if (filePath.startsWith(currentFolder + '/')) {
        const relativePath = filePath.substring(currentFolder.length + 1);
        const parts = relativePath.split('/');
        if (parts.length > 1) {
          folders.add(parts[0]);
        }
      } 
    });
    
    return Array.from(folders).sort();
  }, [files, currentFolder]);
  
  // Function to handle file clicks
  const handleFileClick = path => {
    // Check if it's an image
    if (path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)) {
      // For images, open viewer and show gallery
      openViewer(path);
      setGalleryView(true);
      setIsImageLoading(true); // Show spinner when opening gallery
      // Push state to handle back button
      window.history.pushState({ galleryActive: true }, "", window.location.pathname + window.location.search + "#gallery");
    } else {
      // For non-images, just open viewer
      openViewer(path);
    }
  };
  
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false); // Deactivate drag UI immediately
    handleUpload(e); // Pass the event to handleUpload
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        console.log('Logout successful');
        // Reset state
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
        setCurrentVolumeType(null); // Clear volume type
        // Optionally clear other states like galleryView, isFullscreen etc.
        setGalleryView(false);
        setIsFullscreen(false);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Logout failed:', errorData);
        alert(`Logout failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };

  // Loading/Checking state
  if (mode === 'checking') return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoadingSpinner size="lg" text="Checking status..." centered />
    </div>
  );

  // Authentication screens
  if (mode === 'unlock') return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Unlock your secure storage to continue</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleUnlock} className="space-y-6">
            {/* Conditional rendering based on server mode */}
            {serverMode === 'directory' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">Select Blob File</label>
                <select
                  value={selectedBlob}
                  onChange={(e) => setSelectedBlob(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose an existing blob file...</option>
                  {availableBlobs.map(blob => (
                    <option key={blob} value={blob}>{blob}</option>
                  ))}
                </select>
              </div>
            )}
            
            {serverMode === 'single' && (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700">Using pre-configured blob file</p>
                  </div>
                </div>
              </div>
            )}
            
            <Input
              id="password"
              type="password" 
              label="Password"
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
            
            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isUploading}
              loading={isUploading}
            >
              Unlock Storage
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Don't have storage yet?
          </p>
          <Button 
            variant="link"
            onClick={() => setMode('init')} 
            className="mt-2"
          >
            Create New Storage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  if (mode === 'init') return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Secure Storage</h1>
          <p className="text-gray-600 mt-2">Set up your encrypted storage space</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleInit} className="space-y-6">
            {/* Conditional rendering based on server mode */}
            {serverMode === 'directory' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">New Blob Name</label>
                <Input
                  type="text"
                  placeholder="e.g., personal.pdf, work-docs.txt, mydata.jpg"
                  value={newBlobName}
                  onChange={(e) => setNewBlobName(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Use any extension for privacy - your data will be encrypted regardless
                </p>
              </div>
            )}
            
            {serverMode === 'single' && (
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-700">Will create blob at pre-configured location</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Standard Password */}
            <fieldset className="border border-gray-200 rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium text-gray-700 px-2">Standard (Decoy) Volume</legend>
              <Input
                id="create-password-s"
                type="password" 
                label="Password"
                placeholder="Main storage password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
              />
              <Input
                id="confirm-password-s"
                type="password" 
                label="Confirm Password"
                placeholder="Confirm main password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                error={password && confirmPassword && password !== confirmPassword ? 'Passwords do not match' : ''}
                required
              />
            </fieldset>

            {/* Hidden Password (Optional) */}
            <fieldset className="border border-orange-200 rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium text-orange-700 px-2">Hidden Volume (Optional)</legend>
              <p className="text-xs text-orange-600 -mt-2">Provides plausible deniability. Use a different password to access a separate hidden storage area.</p>
              <Input
                id="create-password-h"
                type="password" 
                label="Hidden Password"
                placeholder="Optional hidden password" 
                value={hiddenPassword} 
                onChange={e => setHiddenPassword(e.target.value)} 
                className="focus:ring-orange-500 focus:border-orange-500"
              />
              {/* Show confirm field only if hidden password is being entered */}
              {hiddenPassword.trim() !== '' && (
                <Input
                  id="confirm-password-h"
                  type="password" 
                  label="Confirm Hidden Password"
                  placeholder="Confirm hidden password" 
                  value={confirmHiddenPassword} 
                  onChange={e => setConfirmHiddenPassword(e.target.value)} 
                  error={hiddenPassword && confirmHiddenPassword && hiddenPassword !== confirmHiddenPassword ? 'Hidden passwords do not match' : ''}
                  className="focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              )}
            </fieldset>
          
             
            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isUploading}
              loading={isUploading}
            >
              Create Secure Storage 
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have storage?
          </p>
          <Button 
            variant="link"
            onClick={() => setMode('unlock')} 
            className="mt-2"
          >
            Unlock Existing Storage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  // Main app UI (mode === 'ready')
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-full overflow-hidden">
      {/* Header with upload and controls */}
      <header className="bg-white border-b border-gray-200 shadow-sm px-4 py-3 z-10">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-gray-900 truncate">Secure Storage</h1>
              {/* Display current volume type */}
              {currentVolumeType && (
                <span 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${ 
                    currentVolumeType === 'Hidden' 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-blue-100 text-blue-800' 
                  }`}
                >
                  {currentVolumeType} Volume
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="upload-files">
              <Button 
                variant="secondary" 
                size="sm"
                className="cursor-pointer"
                as="span"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Upload
              </Button>
              <input 
                id="upload-files"
                type="file" 
                multiple 
                onChange={handleUpload} 
                className="hidden"
              />
            </label>
            
            <label htmlFor="upload-folders">
              <Button 
                variant="secondary" 
                size="sm"
                className="cursor-pointer"
                as="span"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                  <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                Folders
              </Button>
              <input 
                id="upload-folders"
                type="file" 
                webkitdirectory="true" 
                directory="true" 
                multiple 
                onChange={handleUpload} 
                className="hidden"
              />
            </label>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={refreshTree}
              title="Refresh files"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Logout and lock storage"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content area with file list and viewer */}
      <div 
        className="flex flex-1 overflow-hidden max-w-full flex-col sm:flex-row"
        onDragEnter={handleDrag}
      >
        {/* File browser sidebar */}
        <aside className={`w-full sm:w-1/3 md:w-1/4 bg-white overflow-auto border-r border-gray-200 flex-shrink-0 ${galleryView ? 'hidden' : ''} ${selected ? 'hidden sm:block' : ''}`}>
          <div className="p-2 sm:p-4">
            {/* Folder navigation */}
            <div className="mb-3 sm:mb-4 flex flex-col">
              <div className="flex items-center mb-2 sm:mb-3 pb-2 border-b border-gray-100">
                <button 
                  onClick={goBack}
                  disabled={!currentFolder && navigationHistory.length === 0} // Also disable if no history
                  className={`mr-2 p-1 sm:p-1.5 rounded-full ${(!currentFolder && navigationHistory.length === 0) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-blue-500'} transition-colors duration-200`}
                  title="Go back" // Add title
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="text-xs sm:text-sm text-gray-600 font-medium truncate flex-1">
                  {currentFolder ? (
                    <>
                      <span 
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => setCurrentFolder('')}
                      >
                        Root
                      </span>
                      <span className="text-gray-400"> / {currentFolder.split('/').join(' / ')}</span>
                    </>
                  ) : (
                    <span>Root Directory</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Files & Folders</h2>
              
              {selected && (
                <button 
                  onClick={() => setSelected(null)}
                  className="sm:hidden text-blue-500 flex items-center text-xs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to files
                </button>
              )}
            </div>
            
            {files.length === 0 ? (
              <div className="text-center py-8 sm:py-12 px-4 rounded-xl bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-700 font-medium text-sm sm:text-base">No files yet</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Upload files to get started</p>
              </div>
            ) : (
              <div className="space-y-0.5 sm:space-y-1">
                {/* Folders */}
                {getCurrentFolders().map(folder => {
                  const folderPath = currentFolder ? `${currentFolder}/${folder}` : folder;
                  return (
                    <div 
                      key={folder} 
                      className="flex items-center p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 relative"
                    >
                      <div
                        className="flex items-center flex-1 min-w-0"
                        onClick={() => navigateToFolder(folderPath)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                          <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                        </svg>
                        <span className="truncate font-medium text-gray-700 text-sm sm:text-base">{folder}</span>
                      </div>
                      {/* Three-dot menu */}
                      <div className="relative ml-2">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors duration-200"
                          title="Folder actions"
                          onClick={e => {
                            e.stopPropagation();
                            setOpenFolderMenu(openFolderMenu === folderPath ? null : folderPath);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="5" cy="12" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="19" cy="12" r="1.5" />
                          </svg>
                        </button>
                        {openFolderMenu === folderPath && (
                          <div
                            style={{position: 'absolute', right: 0, top: '120%', zIndex: 10, minWidth: 120, boxShadow: '0 6px 24px 0 rgba(0,0,0,0.10)', background: 'white', borderRadius: 6, border: '1px solid #eee'}}
                            className="py-1 text-sm"
                            onClick={e => e.stopPropagation()}
                          >
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                              onClick={async () => {
                                setOpenFolderMenu(null);
                                if (window.confirm(`Delete folder '${folderPath}' and all its files? This cannot be undone!`)) {
                                  try {
                                    const res = await fetch(`/api/delete-folder?path=${encodeURIComponent(folderPath)}`, { method: 'DELETE' });
                                    if (!res.ok) {
                                      const err = await res.json().catch(() => ({}));
                                      alert(`Delete failed: ${err.message || res.status}`);
                                    } else {
                                      refreshTree();
                                    }
                                  } catch (error) {
                                    alert('Delete failed: ' + error);
                                  }
                                }
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                              onClick={() => {
                                setOpenFolderMenu(null);
                                refreshTree();
                              }}
                            >
                              Refresh
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Files */}
                {getCurrentFolderFiles().map(file => {
                  // Only display files directly in this folder
                  const fileName = file.path.split('/').pop();
                  const isImage = file.path.match(/\.(png|jpe?g|gif|bmp|webp)$/i);
                  const isPdf = file.path.endsWith('.pdf');
                  
                  return (
                    <div key={file.path} className="group flex items-center justify-between p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer">
                      <button 
                        onClick={() => handleFileClick(file.path)} 
                        className="flex items-center flex-1 text-left truncate text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base"
                        title={file.path}
                      >
                        {isImage ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-emerald-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        ) : isPdf ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="truncate">{fileName}</span>
                      </button>
                      <div className="flex space-x-1 ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRename(file.path);
                          }} 
                          className="p-1 sm:p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
                          title="Rename"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(file.path);
                          }} 
                          className="p-1 sm:p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-all duration-200"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0111 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
        
        {/* Content viewer */}
        <main 
          className={`flex-1 bg-gray-50 p-2 sm:p-6 overflow-auto flex flex-col items-center justify-center min-w-0
            ${dragActive ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}
            ${galleryView ? 'w-full' : ''}`}
          onDragEnter={handleDrag}
        >
          {selected && !galleryView && (
            <div className="w-full sm:hidden flex items-center mb-4 pb-2 border-b border-gray-200">
              <button 
                onClick={() => setSelected(null)}
                className="flex items-center text-blue-500 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to files
              </button>
            </div>
          )}

          {dragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-10">
              <div className="text-center p-4 sm:p-10 rounded-xl bg-blue-50 border border-blue-100">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">Drop to upload</h3>
                <p className="text-gray-600 text-sm sm:text-base">Release your files to add them to secure storage</p>
              </div>
            </div>
          )}

          {!selected && !dragActive && (
            <div className="text-center max-w-md w-full p-4 sm:p-10 bg-white rounded-xl shadow-sm border border-gray-100 placeholder-container">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-50 mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">No file selected</h2>
              <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">Select a file from the sidebar or drop files here to upload</p>
              
              <div className="flex justify-center">
                <label 
                  htmlFor="main-upload" 
                  className="cursor-pointer inline-flex items-center bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Upload Files
                  <input 
                    id="main-upload"
                    type="file" 
                    multiple 
                    onChange={handleUpload} 
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {selected && viewerType === 'image' && !galleryView && (
            <div className="w-full h-full flex flex-col">
              <div className="bg-white border border-gray-200 rounded-lg p-2 mb-4 flex flex-wrap items-center justify-center gap-2 shadow-sm">
                <button
                  onClick={goPrev}
                  disabled={imageIdx <= 0}
                  className={`p-2 rounded-md ${imageIdx > 0 ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Previous file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={goNext}
                  disabled={imageIdx >= folderImages.length - 1}
                  className={`p-2 rounded-md ${imageIdx < folderImages.length - 1 ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Next file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="hidden sm:block h-6 border-r border-gray-200 mx-2"></div>
                
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                  title="Zoom out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <span className="text-sm text-gray-600 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
                
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                  title="Zoom in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full overflow-auto p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative">
                {/* Loading spinner */}
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <LoadingSpinner size="md" />
                  </div>
                )}
                <img
                  key={selected} // Force re-render on selection change
                  src={`/api/download?path=${encodeURIComponent(selected)}`}
                  alt={selected.split('/').pop()} // Use filename for alt text
                  className="max-h-full max-w-full object-contain rounded-md transition-transform duration-300"
                  style={{ transform: `scale(${scale})` }}
                  onClick={() => {
                    setGalleryView(true);
                    setIsImageLoading(true); // Show spinner when entering gallery
                  }}
                  onLoad={() => setIsImageLoading(false)} // Hide spinner when loaded
                  onError={(e) => { // Handle loading errors
                     console.error("Error loading image:", selected);
                     e.target.alt = "Error loading image";
                     setIsImageLoading(false); // Hide spinner on error too
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Full Screen Gallery View */}
          {galleryView && viewerType === 'image' && (
            <div className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center ${isFullscreen ? 'fullscreen-mode' : ''}`} onClick={() => exitFullscreenAndGallery()}>
              {/* Header controls */}
              <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-2 sm:p-4 bg-gradient-to-b from-black/50 to-transparent">
                {/* Close Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); exitFullscreenAndGallery(); }}
                  className="p-1 text-white/60 hover:text-white transition-opacity duration-200 mobile-touch-target"
                  title="Close gallery (Esc)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Placeholder for potential future icons or title */} 
                <div></div>
                
                {/* Fullscreen toggle (conditionally rendered) */}
                {isFullscreenApiAvailable && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className="p-1 text-white/60 hover:text-white transition-opacity duration-200 mobile-touch-target"
                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 3h-6m0 0v6m0-6L6 15M2 21h6m0 0v-6m0 6L18 9" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                  </button>
                )}
              </div>

              {/* Navigation Controls - Always visible with fixed positioning */}
              <div className="fixed z-30 inset-0 pointer-events-none">
                <div className="h-full flex items-center justify-between">
                  {/* Previous Button (Left) */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    disabled={imageIdx <= 0}
                    className={`pointer-events-auto ml-2 md:ml-6 p-2 rounded-full bg-black/30 backdrop-blur-sm mobile-touch-target
                      ${imageIdx > 0 ? 'text-white/70 hover:text-white hover:bg-black/50' : 'text-white/20 cursor-not-allowed'} 
                      transition-all duration-200`}
                    title="Previous image (Left Arrow)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Next Button (Right) */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    disabled={imageIdx >= folderImages.length - 1}
                    className={`pointer-events-auto mr-2 md:mr-6 p-2 rounded-full bg-black/30 backdrop-blur-sm mobile-touch-target
                      ${imageIdx < folderImages.length - 1 ? 'text-white/70 hover:text-white hover:bg-black/50' : 'text-white/20 cursor-not-allowed'} 
                      transition-all duration-200`}
                    title="Next image (Right Arrow)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Counter (Removed) */}
              {/* 
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm">
                <div className="text-white/80 font-medium">
                  {imageIdx + 1} / {folderImages.length}
                </div>
              </div> 
              */}

              {/* Image Container */}
              <div 
                className="flex-1 flex items-center justify-center w-full h-full max-w-full max-h-full overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
              >
                {/* Loading spinner */}
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                {/* Add key to force re-render, handle loading/error states */}
                <img
                  key={selected} // Force re-render when 'selected' changes
                  src={`/api/download?path=${encodeURIComponent(selected)}`}
                  alt={selected.split('/').pop()} // Use filename for alt text
                  className="block max-h-full max-w-full object-contain transition-opacity duration-300 ease-in-out"
                  onLoad={() => setIsImageLoading(false)} // Hide spinner when loaded
                  onError={(e) => { // Handle loading errors
                     console.error("Error loading gallery image:", selected);
                     e.target.alt = "Error loading image";
                     setIsImageLoading(false); // Hide spinner on error too
                  }}
                />
              </div>
            </div>
          )}
          
          {selected && viewerType === 'pdf' && (
            <div className="w-full h-full flex flex-col">
              <div className="bg-white border border-gray-200 rounded-lg p-2 mb-4 flex flex-wrap items-center justify-center gap-2 shadow-sm">
                <button
                  onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className={`p-2 rounded-md ${pageNumber > 1 ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="text-sm text-gray-600 min-w-[80px] text-center">
                  Page {pageNumber} of {numPages || '?'}
                </div>
                
                <button
                  onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= numPages}
                  className={`p-2 rounded-md ${pageNumber < numPages ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="hidden sm:block h-6 border-r border-gray-200 mx-2"></div>
                
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                  title="Zoom out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <span className="text-sm text-gray-600 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
                
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                  title="Zoom in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-sm p-2 sm:p-4">
                <Document 
                  file={`/api/download?path=${encodeURIComponent(selected)}`} 
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="mx-auto flex justify-center" // Center the document
                  loading={ // Custom loading indicator
                    <div className="flex justify-center items-center p-8">
                      <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  }
                  error={ // Custom error message
                     <div className="text-center p-4 text-red-600 bg-red-50 rounded border border-red-200">
                       Failed to load PDF file. It might be corrupted or password protected.
                     </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={false} // Keep false unless text selection is needed
                    renderAnnotationLayer={false} // Keep false unless annotations are needed
                    className="flex justify-center shadow-md" // Center page content and add shadow
                    width={window.innerWidth > 768 ? undefined : Math.min(window.innerWidth - 32, 600)}
                  />
                </Document>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
