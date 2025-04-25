import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf';
// Make sure to include the CSS for react-pdf for proper rendering
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    
// Helper function to check server status   
const checkServerStatus = async () => { 
  try { 
    const res = await fetch('/api/status'); // Assuming a /api/status endpoint exists
    if (res.ok) {
      const data = await res.json(); 
      return data.status === 'ready'; // Assuming the endpoint returns { status: 'ready' } or similar
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
  const isFullscreenApiAvailable = useMemo(() => {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  }, []);

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
    checkServerStatus().then(isReady => {
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
      console.log('Trying to unlock with password:', password);
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      console.log('Unlock response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('Unlock response data:', data);
        setMode('ready');
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
      }
    } catch (error) {
      console.error('Unlock error:', error);
      alert('An error occurred during unlock');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) { 
      alert('Passwords do not match'); 
      return; 
    }
    
    try {
      setIsUploading(true);
      console.log('Initializing with password:', password);
      let res = await fetch('/api/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      console.log('Init response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('Init response data:', data);
        
        if (uploadFiles.length) {
          console.log('Uploading initial files:', uploadFiles.length);
          const fd = new FormData();
          uploadFiles.forEach(f => {
            console.log('Adding file to upload:', f.name, f.webkitRelativePath || '(no path)');
            fd.append('file', f, f.webkitRelativePath || f.name);
          });
          const up = await fetch('/api/upload', { method: 'POST', body: fd });
          console.log('Upload response status:', up.status);
          if (!up.ok) { 
            alert('Upload failed'); 
            return; 
          }
        }
        
        setMode('ready');
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Init error response:', errorData);
        alert('Initialization failed: ' + (errorData.message || 'Unknown error')); 
      }
    } catch (error) {
      console.error('Init error:', error);
      alert('An error occurred during initialization');
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

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
  
  const openViewer = useCallback(path => {
    setSelected(path);
    if (path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)) {
      setViewerType('image');
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

  // Loading/Checking state
  if (mode === 'checking') return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-2 text-gray-500">
        <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Checking status...</span>
      </div>
    </div>
  );

  // Authentication screens
  if (mode === 'unlock') return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transition-all duration-300">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
          <p className="text-gray-500">Unlock your secure storage to continue</p>
        </div>
        
        <form onSubmit={handleUnlock} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 flex justify-center items-center"
            disabled={isUploading}
          >
            {isUploading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Unlock Storage
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have storage yet?
          </p>
          <button 
            onClick={() => setMode('init')} 
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Create New Storage
          </button>
        </div>
      </div>
    </div>
  );

  if (mode === 'init') return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transition-all duration-300">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Secure Storage</h1>
          <p className="text-gray-500">Set up your encrypted storage space</p>
        </div>
        
        <form onSubmit={handleInit} className="space-y-5">
          <div>
            <label htmlFor="create-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              id="create-password"
              type="password" 
              placeholder="Create a strong password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              id="confirm-password"
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div className="pt-2">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-3">Initial Files (optional)</label>
            <div className="mt-1 flex flex-col space-y-4">
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="space-y-2 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        onChange={onFileSelect} // Use dedicated handler
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="space-y-2 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="folder-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload folders</span>
                      <input
                        id="folder-upload"
                        name="folder-upload"
                        type="file"
                        webkitdirectory="true"
                        directory="true"
                        multiple
                        onChange={onFileSelect} // Use dedicated handler
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
               
              <p className="text-xs text-gray-500 text-center">
                {uploadFiles.length > 0 
                  ? `${uploadFiles.length} files selected` 
                  : "Choose files to add to your secure storage"}
              </p>
            </div>
          </div>
             
          <button 
            type="submit" 
            className="w-full py-3 px-4  bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 flex justify-center items-center"
            disabled={isUploading}
          >
            {isUploading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Create Secure Storage 
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have storage?
          </p>
          <button 
            onClick={() => setMode('unlock')} 
            className="mt-2 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
          >
            Unlock Existing Storage
          </button>
        </div>
      </div>
    </div>
  );

  // Main app UI (mode === 'ready')
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-full overflow-hidden">
      {/* Header with upload and controls */}
      <header className="bg-white border-b border-gray-200 shadow-sm p-2 sm:p-4 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 max-w-full">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Secure Storage</h1>
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-2 items-center mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
            <div className="flex gap-1 sm:gap-2">
              <label 
                htmlFor="upload-files" 
                className="cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Upload
                <input 
                  id="upload-files"
                  type="file" 
                  multiple 
                  onChange={handleUpload} 
                  className="hidden"
                />
              </label>
              
              <label 
                htmlFor="upload-folders" 
                className="cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                  <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                Folders
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
            </div>
            
            <button 
              onClick={refreshTree} 
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Refresh
            </button>
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
                {getCurrentFolders().map(folder => (
                  <div 
                    key={folder} 
                    className="flex items-center p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200"
                    onClick={() => navigateToFolder(currentFolder ? `${currentFolder}/${folder}` : folder)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                      <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                    </svg>
                    <span className="truncate font-medium text-gray-700 text-sm sm:text-base">{folder}</span>
                  </div>
                ))}
                
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
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 8a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 12z" clipRule="evenodd" />
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
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
            <div className="w-full h-full flex flex-col items-center">
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
                
                <div className="h-6 border-r border-gray-200 mx-2"></div>
                
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
              
              <div className="flex-1 flex items-center justify-center w-full overflow-auto p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Add loading indicator for image */}
                <img
                  key={selected} // Force re-render on selection change
                  src={`/api/download?path=${encodeURIComponent(selected)}`}
                  alt={selected.split('/').pop()} // Use filename for alt text
                  className="max-h-full max-w-full object-contain rounded-md transition-transform duration-300 opacity-0 data-[loaded=true]:opacity-100"
                  style={{ transform: `scale(${scale})` }}
                  onClick={() => setGalleryView(true)}
                  onLoad={(e) => e.target.setAttribute('data-loaded', 'true')} // Set attribute when loaded
                  onError={(e) => { // Handle loading errors
                    console.error("Error loading image:", selected);
                    e.target.alt = "Error loading image";
                    // Optionally display a placeholder or error icon
                  }}
                  data-loaded="false"
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
                {/* Add key to force re-render, handle loading/error states */}
                <img
                  key={selected} // Force re-render when 'selected' changes
                  src={`/api/download?path=${encodeURIComponent(selected)}`}
                  alt={selected.split('/').pop()} // Use filename for alt text
                  className="block max-h-full max-w-full object-contain transition-opacity duration-300 ease-in-out opacity-0 data-[loaded=true]:opacity-100"
                  onLoad={(e) => e.target.setAttribute('data-loaded', 'true')} // Set attribute when loaded
                  onError={(e) => { // Handle loading errors
                     console.error("Error loading gallery image:", selected);
                     e.target.alt = "Error loading image";
                     e.target.parentElement.classList.add('error-state'); // Add class for potential styling
                  }}
                   data-loaded="false" // Initial state for transition
                />
                
                {/* Loading spinner */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin opacity-0 transition-opacity duration-300 data-[loading=true]:opacity-100" data-loading={!document.querySelector('[data-loaded="true"]')}></div>
                </div>
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
