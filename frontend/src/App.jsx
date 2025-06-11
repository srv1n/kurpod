import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// NextUI Components
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  Chip,
  Select,
  SelectItem,
  Progress,
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';

// Custom components that still need to be used
import MediaPlayer from './components/MediaPlayer';
import ThemeToggle from './components/ThemeToggle';
import Toast from './components/Toast';
// Using inline SVG icons instead of Radix icons for now
const FileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FolderIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SettingsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogOutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const MoreVerticalIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
 
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
  } catch {
    return false; // Default to unlock if status check fails
  }
};

function App() {
  const [mode, setMode] = useState('checking'); // 'checking', 'unlock','init','ready'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // New state for blob mode handling
  const [serverMode, setServerMode] = useState(null); // 'single' | 'directory'
  const [availableBlobs, setAvailableBlobs] = useState([]);
  const [selectedBlob, setSelectedBlob] = useState('');
  const [newBlobName, setNewBlobName] = useState('');
  const [files, setFiles] = useState([]);
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
  // Add state for hidden password
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [confirmHiddenPassword, setConfirmHiddenPassword] = useState('');
  const [_currentVolumeType, setCurrentVolumeType] = useState(null); // Add state to track volume type
  const [isImageLoading, setIsImageLoading] = useState(false);
  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });
  // Compaction state
  const [showCompactionModal, setShowCompactionModal] = useState(false);
  const [compactionPassword, setCompactionPassword] = useState('');
  const [compactionHiddenPassword, setCompactionHiddenPassword] = useState('');
  const [isCompacting, setIsCompacting] = useState(false);
  // Mobile state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (mode === 'ready') refreshTree();
  }, [mode]);

  // Helper function to show toast notifications
  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };


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
    } catch {
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
      } catch {
        // Ignore fullscreen errors
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
    const handlePopState = () => {
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
    } catch {
      // Failed to refresh files
    }
  };

  const handleUnlock = async e => {
    e.preventDefault();
    try {
      setIsUploading(true);
      
      // Prepare payload based on server mode
      let payload = { password };
      
      if (serverMode === 'directory') {
        if (!selectedBlob) {
          showToast('Please select a blob file', 'warning');
          return;
        }
        payload.blob_name = selectedBlob;
      }
      
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        const data = await res.json();
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
          // Check if the error indicates it's already unlocked
        // Adjust the condition based on the actual error message/code from your backend
        if (res.status === 400 && errorData.message?.includes('already unlocked')) {
           setMode('ready');
        } else {
          showToast(`Unlock failed: ${errorData.message || 'Please check your password and try again.'}`, 'error');
        }
        setCurrentVolumeType(null); // Clear volume type on failed unlock
      }
    } catch {
      showToast('An error occurred during unlock', 'error');
      setCurrentVolumeType(null); // Clear volume type on error
    } finally {
      setIsUploading(false);
    }
  };

  const handleInit = async e => {
    e.preventDefault();
    
    // --- Validation ---
    if (password !== confirmPassword) { 
      showToast('Standard passwords do not match', 'error'); 
      return; 
    }
    if (password.trim() === '') {
      showToast('Standard password cannot be empty', 'error');
      return;
    }
    // Validate hidden password only if provided
    if (hiddenPassword.trim() !== '') {
      if (hiddenPassword !== confirmHiddenPassword) {
        showToast('Hidden passwords do not match', 'error');
        return;
      }
      if (password === hiddenPassword) {
        showToast('Standard and hidden passwords must be different', 'error');
        return;
      }
    }
    // --- End Validation ---

    try {
      setIsUploading(true);
      
      // Prepare payload based on server mode
      const initPayload = {
        password_s: password,
        password_h: hiddenPassword.trim() === '' ? null : hiddenPassword, // Send null if empty
      };
      
      if (serverMode === 'directory') {
        if (!newBlobName.trim()) {
          showToast('Please enter a blob name', 'warning');
          return;
        }
        initPayload.blob_name = newBlobName.trim();
      }
      
      let res = await fetch('/api/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initPayload), // Send updated payload
      });
      
      
      if (res.ok) {
        const data = await res.json();
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
          showToast('Initialization failed: ' + (errorData.message || 'Unknown error'), 'error'); 
        setCurrentVolumeType(null); // Clear volume type on failed init
      }
    } catch {
      showToast('An error occurred during initialization', 'error');
      setCurrentVolumeType(null); // Clear volume type on error
    } finally {
      setIsUploading(false);
    }
  };
 

  const handleUpload = async (eventOrFileList) => {
    let items;
    // Check if it's an event or a FileList/Array
    if (eventOrFileList.target && eventOrFileList.target.files) {
      // From file input event
      items = eventOrFileList.target.files;
    } else if (eventOrFileList.dataTransfer && eventOrFileList.dataTransfer.files) {
      // From drop event
      items = eventOrFileList.dataTransfer.files;
    } else if (Array.isArray(eventOrFileList) || eventOrFileList instanceof FileList) {
       // Directly passed FileList or Array
       items = eventOrFileList;
    } else {
      return;
    }

    if (!items || !items.length) {
      setDragActive(false); // Ensure drag state is reset
      return;
    }

    
    try {
      setIsUploading(true);
      
      // Generate a unique batch ID for this upload session
      const batchId = 'batch-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
      
      // Process files in batches for UI responsiveness, but use the new batch API
      const MAX_FILES_PER_BATCH = 5; // Can be larger since we're not saving after each batch
      const batches = [];
      
      // Create batches of files
      for (let i = 0; i < items.length; i += MAX_FILES_PER_BATCH) {
        batches.push(Array.from(items).slice(i, i + MAX_FILES_PER_BATCH));
      }
      
      
      for (let [batchIndex, batch] of batches.entries()) {
        const isLastBatch = batchIndex === batches.length - 1;
        
        const fd = new FormData();
        batch.forEach(f => {
          // Prepend current folder to the file path
          const filePath = currentFolder 
            ? `${currentFolder}/${f.webkitRelativePath || f.name}`
            : (f.webkitRelativePath || f.name);
          fd.append('file', f, filePath);
        });
        
        
        // Use custom fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
        
        try {
          const url = `/api/batch-upload?batch_id=${encodeURIComponent(batchId)}&is_final_batch=${isLastBatch}&current_folder=${encodeURIComponent(currentFolder || '')}`;
          const res = await fetch(url, { 
            method: 'POST', 
            body: fd,
            signal: controller.signal 
          });
          
          clearTimeout(timeoutId);
          
          if (!res.ok) {
            const errorText = await res.text().catch(() => 'No error details available');
            showToast(`Upload failed on batch ${batchIndex + 1}: ${res.status === 413 ? 'Files may be too large' : errorText}`, 'error');
            return; // Stop processing batches if one fails
          }
          
          // If this is the last batch and it completed successfully, refresh the file tree
          if (isLastBatch) {
            refreshTree();
          }
        } catch (err) {
          showToast(`Upload error on batch ${batchIndex + 1}: ${err.name === 'AbortError' ? 'Request timed out after 2 minutes' : err.toString()}`, 'error');
          return; // Stop processing batches if one fails
        }
      }
      
    } catch (err) {
      showToast('Upload error: ' + (err.name === 'AbortError' ? 'Request timed out after 2 minutes' : err.toString()), 'error');
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
        showToast(`Rename failed: ${errorData.message}`, 'error');
      }
    } catch {
      showToast('An error occurred while renaming', 'error');
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
      } else showToast('Delete failed', 'error');
    } catch {
      showToast('An error occurred while deleting', 'error');
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
    } else if (path.match(/\.(mp4|webm|mov|avi|mkv|m4v|3gp|flv)$/i)) {
      setViewerType('video');
    } else if (path.match(/\.(mp3|wav|ogg|aac|flac|m4a|wma)$/i)) {
      setViewerType('audio');
    } else {
      // Fallback for non-previewable files
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

  // Add keyboard event listener for gallery navigation (moved after function definitions)
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
  }, [galleryView, viewerType, goPrev, goNext, exitFullscreenAndGallery]);
  
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
    // Close mobile sidebar when file is selected
    setIsMobileSidebarOpen(false);
    
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

  const handleCompaction = async (e) => {
    e.preventDefault();
    
    if (!compactionPassword.trim()) {
      showToast('Standard password is required for compaction', 'error');
      return;
    }
    
    if (!compactionHiddenPassword.trim()) {
      showToast('Hidden password is required for compaction', 'error');
      return;
    }
    
    try {
      setIsCompacting(true);
      
      const res = await fetch('/api/compact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password_s: compactionPassword,
          password_h: compactionHiddenPassword,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        showToast('Storage compaction completed successfully', 'success');
        setShowCompactionModal(false);
        setCompactionPassword('');
        setCompactionHiddenPassword('');
        refreshTree(); // Refresh after compaction
      } else {
        if (res.status === 403 && data.message === 'Locked') {
          showToast('Storage is locked. Please unlock first before compacting.', 'error');
        } else {
          showToast(`Compaction failed: ${data.message || 'Unknown error'}`, 'error');
        }
      }
    } catch (err) {
      showToast(`Compaction error: ${err.message || 'Network error'}`, 'error');
    } finally {
      setIsCompacting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
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
        showToast(`Logout failed: ${errorData.message || 'Unknown error'}`, 'error');
      }
    } catch {
      showToast('An error occurred during logout.', 'error');
    }
  };

  // Loading/Checking state
  if (mode === 'checking') return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center p-8 space-y-3">
        <Spinner size="lg" color="primary" />
        <span className="text-sm text-default-500">Checking status...</span>
      </div>
    </div>
  );

  // Authentication screens
  if (mode === 'unlock') return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-col items-center justify-center px-6 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Unlock your storage to continue</p>
        </CardHeader>
        
        <CardBody className="px-6 py-6">
          <form onSubmit={handleUnlock} className="space-y-6">
            {/* Conditional rendering based on server mode */}
            {serverMode === 'directory' && (
              <div className="space-y-3">
                <Select
                  label="Select Blob File"
                  placeholder="Choose an existing blob file..."
                  value={selectedBlob}
                  onChange={(e) => setSelectedBlob(e.target.value)}
                  required
                >
                  {availableBlobs.map(blob => (
                    <SelectItem key={blob} value={blob}>{blob}</SelectItem>
                  ))}
                </Select>
              </div>
            )}
            
            {serverMode === 'single' && (
              <div className="space-y-3">
                <Chip
                  color="primary"
                  variant="flat"
                  startContent={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  className="w-full py-4"
                >
                  Using pre-configured blob file
                </Chip>
              </div>
            )}
            
            <Input
              id="password"
              type="password" 
              label="Password"
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              isRequired
            />
            
            <Button 
              type="submit" 
              size="lg"
              color="primary"
              className="w-full"
              isDisabled={isUploading}
              isLoading={isUploading}
            >
              Unlock Storage
            </Button>
          </form>
        </CardBody>
        
        <CardFooter className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need to create storage?
          </p>
          <Button 
            variant="light"
            color="primary"
            onClick={() => setMode('init')}
          >
            Initialize Storage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  if (mode === 'init') return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="flex flex-col items-center justify-center px-6 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Create Secure Storage</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Set up your encrypted storage space</p>
        </CardHeader>
        
        <CardBody className="px-6 py-6">
          <form onSubmit={handleInit} className="space-y-6">
            {/* Conditional rendering based on server mode */}
            {serverMode === 'directory' && (
              <div className="space-y-3">
                <Input
                  type="text"
                  label="New Blob Name"
                  placeholder="e.g., personal.pdf, work-docs.txt, mydata.jpg"
                  value={newBlobName}
                  onChange={(e) => setNewBlobName(e.target.value)}
                  isRequired
                />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use any extension for privacy - your data will be encrypted regardless
                </p>
              </div>
            )}
            
            {serverMode === 'single' && (
              <div className="space-y-3">
                <Chip
                  color="success"
                  variant="flat"
                  startContent={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  className="w-full py-3"
                >
                  Will create blob at pre-configured location
                </Chip>
              </div>
            )}
            
            {/* Standard Password */}
            <fieldset className="border border-divider rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2">Standard (Decoy) Volume</legend>
              <Input
                id="create-password-s"
                type="password" 
                label="Password"
                placeholder="Main storage password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                isRequired
              />
              <Input
                id="confirm-password-s"
                type="password" 
                label="Confirm Password"
                placeholder="Confirm main password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                errorMessage={password && confirmPassword && password !== confirmPassword ? 'Passwords do not match' : ''}
                isInvalid={password && confirmPassword && password !== confirmPassword}
                isRequired
              />
            </fieldset>

            {/* Hidden Password (Optional) */}
            <fieldset className="border border-divider rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2">Hidden Volume (Optional)</legend>
              <p className="text-xs text-gray-600 dark:text-gray-400 -mt-2">Provides plausible deniability. Use a different password to access a separate hidden storage area.</p>
              <Input
                id="create-password-h"
                type="password" 
                label="Hidden Password"
                placeholder="Optional hidden password" 
                value={hiddenPassword} 
                onChange={e => setHiddenPassword(e.target.value)} 
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
                  errorMessage={hiddenPassword && confirmHiddenPassword && hiddenPassword !== confirmHiddenPassword ? 'Hidden passwords do not match' : ''}
                  isInvalid={hiddenPassword && confirmHiddenPassword && hiddenPassword !== confirmHiddenPassword}
                  isRequired
                />
              )}
            </fieldset>
          
             
            <Button 
              type="submit" 
              color="primary"
              size="lg"
              className="w-full"
              isDisabled={isUploading}
              isLoading={isUploading}
            >
              Initialize Secure Storage 
            </Button>
          </form>
        </CardBody>
        
        <CardFooter className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Access existing storage
          </p>
          <Button 
            variant="light"
            color="primary"
            onClick={() => setMode('unlock')}
          >
            Unlock Existing Storage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  // Main app UI (mode === 'ready')
  return (
    <>
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        w-64 border-r border-divider bg-content1 flex flex-col h-full
        lg:translate-x-0 lg:static lg:inset-0 lg:overflow-hidden
        fixed inset-y-0 left-0 z-30 overflow-y-auto lg:overflow-y-hidden
        transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-200 ease-in-out
      `}>
        {/* Sidebar Header - Fixed on desktop, scrollable on mobile */}
        <div className="p-6 border-b border-divider lg:flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <HomeIcon className="w-4 h-4 text-primary-contrast" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-default-900">Files</h1>
                <p className="text-xs text-default-500">Encrypted Storage</p>
              </div>
            </div>
            
            {/* Close button for mobile */}
            <Button
              variant="light"
              size="sm"
              isIconOnly
              className="lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Upload Actions - Fixed on desktop, scrollable on mobile */}
        <div className="p-4 flex flex-col gap-3 border-b border-divider lg:flex-shrink-0">
          <Button 
            variant="bordered" 
            size="sm" 
            className="w-full justify-start"
            startContent={<UploadIcon className="w-4 h-4" />}
            onClick={() => document.getElementById('sidebar-upload-files').click()}
          >
            Upload Files
          </Button>
          <input 
            id="sidebar-upload-files"
            type="file" 
            multiple 
            onChange={handleUpload} 
            className="hidden"
          />
          
          <Button 
            variant="bordered" 
            size="sm" 
            className="w-full justify-start"
            startContent={<FolderIcon className="w-4 h-4" />}
            onClick={() => document.getElementById('sidebar-upload-folders').click()}
          >
            Upload Folder
          </Button>
          <input 
            id="sidebar-upload-folders"
            type="file" 
            webkitdirectory="true" 
            directory="true" 
            multiple 
            onChange={handleUpload} 
            className="hidden"
          />
        </div>
        
        {/* Navigation and File List - Scrollable on desktop */}
        <div className="flex-1 flex flex-col lg:overflow-hidden">
          {/* Breadcrumb Navigation - Fixed within scrollable area */}
          <div className="px-4 pt-4 flex-shrink-0">
            <div className="flex items-center mb-3 pb-2 border-b border-divider">
              <Button 
                variant="light" 
                size="sm"
                isIconOnly
                onClick={goBack}
                isDisabled={!currentFolder && navigationHistory.length === 0}
                className="mr-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </Button>
              <div className="text-sm text-default-500 flex-1 truncate">
                {currentFolder ? (
                  <>
                    <span 
                      className="cursor-pointer hover:text-default-900"
                      onClick={() => setCurrentFolder('')}
                    >
                      Root
                    </span>
                    <span className="mx-1">/</span>
                    <span>{currentFolder.split('/').join(' / ')}</span>
                  </>
                ) : (
                  'All Files'
                )}
              </div>
            </div>
          </div>
          
          {/* Files and Folders List - Scrollable on desktop only */}
          <div className="flex-1 lg:overflow-y-auto px-4 pb-4">
            <div className="flex flex-col gap-1">
              {files.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  <FileIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No files uploaded</p>
                </div>
              ) : (
                <>
                  {/* Folders */}
                  {getCurrentFolders().map(folder => {
                    const folderPath = currentFolder ? `${currentFolder}/${folder}` : folder;
                    return (
                      <div key={folder} className="flex items-center group">
                        <Button
                          variant="light"
                          size="sm"
                          className="flex-1 justify-start p-2 h-auto"
                          onClick={() => navigateToFolder(folderPath)}
                          startContent={<FolderIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        >
                          <span className="truncate text-sm">{folder}</span>
                        </Button>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="light" size="sm" isIconOnly className="w-6 h-6 opacity-0 group-hover:opacity-100">
                              <MoreVerticalIcon className="w-3 h-3" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Folder actions">
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={async () => {
                                if (window.confirm(`Delete folder '${folderPath}' and all its files?`)) {
                                  try {
                                    const res = await fetch(`/api/delete-folder?path=${encodeURIComponent(folderPath)}`, { method: 'DELETE' });
                                    if (res.ok) refreshTree();
                                    else showToast('Delete failed', 'error');
                                  } catch {
                                    showToast('Delete failed', 'error');
                                  }
                                }
                              }}
                            >
                              Delete Folder
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    );
                  })}
                  
                  {/* Files */}
                  {getCurrentFolderFiles().map(file => {
                    const fileName = file.path.split('/').pop();
                    const isImage = file.path.match(/\.(png|jpe?g|gif|bmp|webp)$/i);
                    const isVideo = file.path.match(/\.(mp4|webm|mov|avi|mkv|m4v|3gp|flv)$/i);
                    const isAudio = file.path.match(/\.(mp3|wav|ogg|aac|flac|m4a|wma)$/i);
                    
                    return (
                      <div key={file.path} className="flex items-center group">
                        <Button
                          variant={selected === file.path ? "flat" : "light"}
                          size="sm"
                          className="flex-1 justify-start p-2 h-auto"
                          onClick={() => handleFileClick(file.path)}
                          startContent={
                            isVideo ? (
                              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            ) : isAudio ? (
                              <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                              </svg>
                            ) : (
                              <FileIcon className={`w-4 h-4 ${
                                isImage ? 'text-emerald-600 dark:text-emerald-400' : 'text-default-400'
                              }`} />
                            )
                          }
                        >
                          <span className="truncate text-sm">{fileName}</span>
                        </Button>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="light" size="sm" isIconOnly className="w-6 h-6 opacity-0 group-hover:opacity-100">
                              <MoreVerticalIcon className="w-3 h-3" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="File actions">
                            <DropdownItem key="rename" onClick={() => handleRename(file.path)}>
                              Rename
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={() => handleDelete(file.path)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar Footer - Fixed on desktop, scrollable on mobile */}
        <div className="p-4 border-t border-divider flex flex-col gap-3 lg:flex-shrink-0">
          <Button 
            variant="light" 
            size="sm"
            onClick={refreshTree}
            className="w-full justify-start"
            startContent={<RefreshIcon className="w-4 h-4" />}
          >
            Refresh
          </Button>
          
          <Button 
            variant="light" 
            size="sm"
            onClick={() => setShowCompactionModal(true)}
            className="w-full justify-start"
            startContent={<SettingsIcon className="w-4 h-4" />}
          >
            Compact Storage
          </Button>
          
          <Button 
            variant="light" 
            size="sm"
            color="danger"
            onClick={handleLogout}
            className="w-full justify-start"
            startContent={<LogOutIcon className="w-4 h-4" />}
          >
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-divider bg-content1/95 backdrop-blur supports-[backdrop-filter]:bg-content1/60 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile hamburger menu */}
              <Button
                variant="light"
                size="sm"
                isIconOnly
                className="lg:hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <MenuIcon className="w-5 h-5" />
              </Button>
              
              {/* Exit preview button on mobile when file is selected */}
              {selected && (
                <Button
                  variant="light"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSelected(null)}
                  startContent={<ArrowLeftIcon className="w-4 h-4" />}
                >
                  Back
                </Button>
              )}
              
              <h2 className="text-lg font-semibold">
                {selected ? selected.split('/').pop() : 'File Manager'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-sm text-default-500">
                {files.length} {files.length === 1 ? 'file' : 'files'}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        {/* Main Content Viewer */}
        <main 
          className={`flex-1 overflow-auto flex flex-col min-w-0 p-6 ${
            dragActive ? 'bg-primary/5 border-2 border-dashed border-primary/30' : 'bg-background'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {selected && !galleryView && (
            <div className="w-full sm:hidden flex items-center mb-4 pb-2 border-b border-divider">
              <button 
                onClick={() => setSelected(null)}
                className="flex items-center text-primary font-medium text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to files
              </button>
            </div>
          )}

          {dragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-default/90 backdrop-blur-sm z-10">
              <div className="text-center p-4 sm:p-10 rounded-xl bg-default-100 border border-divider">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-default-900 mb-2">Drop to upload</h3>
                <p className="text-default-500 text-sm sm:text-base">Release your files to add them to secure storage</p>
              </div>
            </div>
          )}

          {!selected && !dragActive && (
            <div className="text-center max-w-md w-full p-4 sm:p-10 bg-content1 rounded-xl shadow-sm border border-divider placeholder-container">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-default-100 mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-default-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-medium text-default-900 mb-2">No file selected</h2>
              <p className="text-default-500 text-sm sm:text-base mb-4 sm:mb-6">Select a file from the sidebar or drop files here to upload</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  color="primary"
                  variant="flat"
                  size="md"
                  className="font-semibold"
                  startContent={<UploadIcon className="w-5 h-5" />}
                  onClick={() => document.getElementById('main-upload-files').click()}
                >
                  Upload Files
                </Button>
                <input 
                  id="main-upload-files"
                  type="file" 
                  multiple 
                  onChange={handleUpload} 
                  className="hidden"
                />
                
                <Button
                  color="primary"
                  variant="flat"
                  size="md"
                  className="font-semibold"
                  startContent={<FolderIcon className="w-5 h-5" />}
                  onClick={() => document.getElementById('main-upload-folders').click()}
                >
                  Upload Folder
                </Button>
                <input 
                  id="main-upload-folders"
                  type="file" 
                  webkitdirectory="true"
                  directory="true"
                  multiple 
                  onChange={handleUpload} 
                  className="hidden"
                />
              </div>
            </div>
          )}

          {selected && viewerType === 'image' && !galleryView && (
            <div className="w-full h-full flex flex-col">
              <div className="bg-content1 border border-divider rounded-lg p-2 mb-4 flex flex-wrap items-center justify-center gap-2 shadow-sm">
                <button
                  onClick={goPrev}
                  disabled={imageIdx <= 0}
                  className={`p-2 rounded-md ${imageIdx > 0 ? 'hover:bg-default-100 text-default-700' : 'text-default-500 cursor-not-allowed'} transition-colors duration-200`}
                  title="Previous file"
                  aria-label="View previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={goNext}
                  disabled={imageIdx >= folderImages.length - 1}
                  className={`p-2 rounded-md ${imageIdx < folderImages.length - 1 ? 'hover:bg-default-100 text-default-700' : 'text-default-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Next file"
                  aria-label="View next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="hidden sm:block h-6 border-r border-divider mx-2"></div>
                
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-md hover:bg-default-100 text-default-700 transition-colors duration-200"
                  title="Zoom out"
                  aria-label="Zoom out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <span className="text-sm text-default-600 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
                
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-md hover:bg-default-100 text-default-700 transition-colors duration-200"
                  title="Zoom in"
                  aria-label="Zoom in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full overflow-auto p-4 bg-content1 rounded-lg border border-divider shadow-sm relative">
                {/* Loading spinner */}
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-content1/50 backdrop-blur-sm">
                    <Spinner size="md" color="primary" />
                  </div>
                )}
                <img
                  key={selected} // Force re-render on selection change
                  src={`/api/download?path=${encodeURIComponent(selected)}`}
                  alt={`Image: ${selected.split('/').pop()}`} // Use descriptive alt text
                  className="max-h-full max-w-full object-contain rounded-md transition-transform duration-300"
                  style={{ transform: `scale(${scale})` }}
                  onClick={() => {
                    setGalleryView(true);
                    setIsImageLoading(true); // Show spinner when entering gallery
                  }}
                  onLoad={() => setIsImageLoading(false)} // Hide spinner when loaded
                  onError={(e) => { // Handle loading errors
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
                  aria-label="Close gallery view"
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
                    aria-label={isFullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode"}
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
                  alt={`Image: ${selected.split('/').pop()}`} // Use descriptive alt text
                  className="block max-h-full max-w-full object-contain transition-opacity duration-300 ease-in-out"
                  onLoad={() => setIsImageLoading(false)} // Hide spinner when loaded
                  onError={(e) => { // Handle loading errors
                     e.target.alt = "Error loading image";
                     setIsImageLoading(false); // Hide spinner on error too
                  }}
                />
              </div>
            </div>
          )}
          
          {selected && (viewerType === 'video' || viewerType === 'audio') && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl">
                <MediaPlayer
                  src={`/api/download?path=${encodeURIComponent(selected)}`}
                  type={viewerType}
                  fileName={selected.split('/').pop()}
                />
              </div>
            </div>
          )}

          {selected && viewerType === 'pdf' && (
            <div className="w-full h-full flex flex-col">
              <div className="bg-content1 border border-divider rounded-lg p-2 mb-4 flex flex-wrap items-center justify-center gap-2 shadow-sm">
                <button
                  onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className={`p-2 rounded-md ${pageNumber > 1 ? 'hover:bg-default-100 text-default-700' : 'text-default-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="text-sm text-default-600 min-w-[80px] text-center">
                  Page {pageNumber} of {numPages || '?'}
                </div>
                
                <button
                  onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= numPages}
                  className={`p-2 rounded-md ${pageNumber < numPages ? 'hover:bg-default-100 text-default-700' : 'text-default-300 cursor-not-allowed'} transition-colors duration-200`}
                  title="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="hidden sm:block h-6 border-r border-divider mx-2"></div>
                
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-md hover:bg-default-100 text-default-700 transition-colors duration-200"
                  title="Zoom out"
                  aria-label="Zoom out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <span className="text-sm text-default-600 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
                
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-md hover:bg-default-100 text-default-700 transition-colors duration-200"
                  title="Zoom in"
                  aria-label="Zoom in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-auto bg-content1 border border-divider rounded-lg shadow-sm p-2 sm:p-4">
                <Document 
                  file={`/api/download?path=${encodeURIComponent(selected)}`} 
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="mx-auto flex justify-center" // Center the document
                  loading={ // Custom loading indicator
                    <div className="flex justify-center items-center p-8">
                      <Spinner size="lg" color="primary" />
                    </div>
                  }
                  error={ // Custom error message
                     <div className="text-center p-4 text-danger bg-danger-50 rounded border border-danger-200">
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

          {selected && viewerType === 'other' && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center max-w-md p-8 bg-content1 rounded-xl shadow-sm border border-default-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-default-50 mb-4">
                  <FileIcon className="w-8 h-8 text-default-400" />
                </div>
                <h3 className="text-lg font-medium text-default-800 mb-2">Preview not available</h3>
                <p className="text-default-500 text-sm mb-6">
                  This file type cannot be previewed. You can download it to view with an external application.
                </p>
                <a
                  href={`/api/download?path=${encodeURIComponent(selected)}`}
                  download={selected.split('/').pop()}
                  className="inline-flex items-center bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download File
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>

    {/* Compaction Modal */}
    {showCompactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-default-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-default-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-default-900">Compact Storage</h2>
              <p className="text-default-600 mt-2">Reclaim space by removing deleted file data</p>
            </CardHeader>
            
            <CardBody>
              <div className="bg-default-100 border border-divider rounded-lg p-4 mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-default-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-default-900 mb-1">Important Notes:</p>
                    <ul className="text-default-500 space-y-1 list-disc list-inside">
                      <li>This process can take several minutes for large storage</li>
                      <li>Both volume passwords are required for security</li>
                      <li>Backup your storage before proceeding (recommended)</li>
                      <li>Deleted files will become unrecoverable after compaction</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleCompaction} className="space-y-4">
                <Input
                  id="compaction-password-s"
                  type="password"
                  label="Standard Volume Password"
                  placeholder="Enter standard password"
                  value={compactionPassword}
                  onChange={(e) => setCompactionPassword(e.target.value)}
                  isRequired
                />
                
                <Input
                  id="compaction-password-h"
                  type="password"
                  label="Hidden Volume Password"
                  placeholder="Enter hidden password"
                  value={compactionHiddenPassword}
                  onChange={(e) => setCompactionHiddenPassword(e.target.value)}
                  isRequired
                />
                
                <div className="flex gap-3 pt-6">
                  <Button
                    type="button"
                    color="default"
                    variant="flat"
                    className="flex-1"
                    onClick={() => {
                      setShowCompactionModal(false);
                      setCompactionPassword('');
                      setCompactionHiddenPassword('');
                    }}
                    isDisabled={isCompacting}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    color="primary"
                    className="flex-1"
                    isDisabled={isCompacting}
                    isLoading={isCompacting}
                  >
                    {isCompacting ? 'Compacting...' : 'Start Compaction'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Toast notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}

export default App;
