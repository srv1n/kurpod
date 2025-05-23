import React, { useState, useCallback, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';
import { getOsType } from '@tauri-apps/api/os';
import DecoyScreen from './DecoyScreen';
import UnlockScreen from './UnlockScreen';
import InitScreen from './InitScreen';
import ReadyScreen from './ReadyScreen';
import ModeToggle from './ModeToggle';
import GlobalMessages from './GlobalMessages';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import pdfjs from 'pdfjs-dist';

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

function App() {
  console.log("--- App component function START ---");

  const [mode, setMode] = useState('decoy');
  const [osType, setOsType] = useState(null);
  const [isMobile, setIsMobile] = useState(null); // Start as null to indicate not yet determined
  const [mobileBlobList, setMobileBlobList] = useState(null); // null: not fetched, []: fetched empty, [...]: fetched list
  const [loadingBlobs, setLoadingBlobs] = useState(false); // Loading state for blobs

  // ... other state variables ...
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
  const [isUploading, setIsUploading] = useState(false);
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

  // --- START: Define setTemporaryMessage early --- 
  const setTemporaryMessage = useCallback((msg, isError = false) => {
    if (isError) {
      setError(msg);
      setTimeout(() => setError(''), 5000);
    } else {
      setMessage(msg);
      setTimeout(() => setMessage(''), 5000);
    }
  }, []); // Dependencies are stable setters
  // --- END: Define setTemporaryMessage early --- 

  // Function to fetch mobile blob list
  const fetchMobileBlobList = useCallback(async () => {
    if (!isMobile) {
      setMobileBlobList([]); // Clear list if not mobile
      return;
    }
    console.log("[fetchMobileBlobList] Fetching blobs...");
    setLoadingBlobs(true);
    setMobileBlobList(null); // Indicate loading
    setError(''); // Clear previous errors
    try {
      // Ensure the command exists before invoking (it's cfg'd in Rust)
      // We rely on the isMobile check above for this safety for now.
      const response = await invoke('list_blobs_in_app_data');
      console.log("[fetchMobileBlobList] Response:", response);
      if (response.success) {
        setMobileBlobList(response.data || []);
      } else {
        setMobileBlobList([]); // Set empty on error
        setTemporaryMessage(response.message || 'Failed to list mobile vaults', true);
      }
    } catch (e) {
      console.error("[fetchMobileBlobList] Error:", e);
      setMobileBlobList([]); // Set empty on error
      // Check if error indicates command doesn't exist (e.g., desktop build)
      if (e.message && e.message.includes('not registered')) {
         console.warn("list_blobs_in_app_data command not available (likely desktop build).");
      } else {
         setTemporaryMessage(`Error fetching mobile vaults: ${e.message || e}`, true);
      }
    } finally {
      setLoadingBlobs(false);
    }
  }, [isMobile, setTemporaryMessage]); // Dependency: isMobile flag and stable message setter

  // --- Function to Delete a Mobile Blob --- 
  const handleDeleteMobileBlob = useCallback(async (filenameToDelete) => {
    if (!isMobile || !filenameToDelete || filenameToDelete === '__type_new__' || filenameToDelete === 'loading' || filenameToDelete === 'no_blobs') {
        console.warn("[handleDeleteMobileBlob] Invalid filename or not mobile.", filenameToDelete);
        return;
    }

    if (!window.confirm(`Are you sure you want to permanently delete the vault '${filenameToDelete}'? This cannot be undone.`)) {
        return;
    }

    console.log(`[handleDeleteMobileBlob] Attempting to delete: ${filenameToDelete}`);
    setError(''); // Clear previous errors
    setMessage('Deleting vault...'); // Provide immediate feedback

    try {
        // Ensure command exists (should be safe due to isMobile check earlier)
        const response = await invoke('delete_blob_from_app_data', { blobFilename: filenameToDelete });
        console.log("[handleDeleteMobileBlob] Response:", response);

        if (response.success) {
            setTemporaryMessage(response.message || `Vault '${filenameToDelete}' deleted successfully.`);
            // If the deleted blob was the one selected in the input, clear the input
            if (blobPath === filenameToDelete) {
                setBlobPath('');
            }
            // Refresh the list of blobs
            fetchMobileBlobList(); 
        } else {
             setTemporaryMessage(response.message || 'Failed to delete vault', true);
        }

    } catch (e) {
        console.error("[handleDeleteMobileBlob] Error:", e);
        setTemporaryMessage(`Error deleting vault: ${e.message || e}`, true);
    }

  }, [isMobile, blobPath, fetchMobileBlobList, setTemporaryMessage]); // Dependencies

  // Fetch OS type on component mount
  useEffect(() => {
    let isMounted = true;
    async function determineOsAndFetchBlobs() {
      let mobileCheck = false;
      let detectedType = 'unknown'; // Variable to store detected type for logging
      try {
        const type = await getOsType();
        detectedType = type; // Store the result
        console.log("[App.jsx] OS Detection: getOsType() returned:", type);
        if (isMounted) {
          setOsType(type);
          mobileCheck = (type === 'ios' || type === 'android');
          setIsMobile(mobileCheck);
          console.log("[App.jsx] State Updated: osType=", type, ", isMobile=", mobileCheck);
        }
      } catch (e) {
        console.error("[App.jsx] Failed to get OS type:", e);
        if (isMounted) {
          setOsType('unknown');
          setIsMobile(false); // Default to non-mobile
          console.log("[App.jsx] State Updated (Error): osType=unknown, isMobile=false");
          setTemporaryMessage("Could not determine OS type.", true);
        }
      } finally {
         // Fetch blobs *after* OS type is determined
         console.log(`[App.jsx] Finally block: isMounted=${isMounted}, mobileCheck=${mobileCheck}, detectedType=${detectedType}`);
         if (isMounted && mobileCheck) {
             console.log("[App.jsx] Triggering fetchMobileBlobList...");
             fetchMobileBlobList();
         } else if (isMounted) {
             console.log("[App.jsx] Not fetching mobile blobs (not mobile or type not determined yet).");
         }
      }
    }
    console.log("[App.jsx] Running OS detection useEffect...");
    determineOsAndFetchBlobs();
    return () => { 
        console.log("[App.jsx] OS detection useEffect cleanup.");
        isMounted = false; 
    };
    // fetchMobileBlobList is stable due to useCallback
  }, [fetchMobileBlobList, setTemporaryMessage]);

  // ... isFullscreenApiAvailable ...
  // --- Navigation Functions --- (Unchanged)
  // ... _navigateToFolder, goBack ...
  // ... refreshFileList ... 
  // ... navigateToFolder ...
  // --- Event Listeners --- (Unchanged)
  // ... useEffect keydown ...
  // ... useEffect fullscreenchange ...
  // ... useEffect popstate ...
  // --- Action Handlers --- 
  // ... handleLogout ...
  // ... handleUnlock ...
  // ... handleInit ...
  // ... selectBlobFile (No changes needed here, UI changes handle mobile) ...
  // ... getFilesFromDataTransferItems ...
  // ... handleUpload ...
  // ... handleDownload ...
  // ... handleDelete ...
  // ... handleDeleteFolder ...
  // ... handleRename ...
  // ... Viewer functions ... 
  // ... Folder/Image listing functions ...
  // ... Click/Drag/Drop handlers ...
  // ... useEffect fetchDataUrl ...
  // ... useEffect upload listeners ...
  // ... revealApp, goBackToDecoy, zoomIn, zoomOut ...

  // --- Render Logic --- 
  const renderContent = () => {
    console.log("--- App renderContent called, mode:", mode, "isMobile:", isMobile, "loadingBlobs:", loadingBlobs);
    // Extend loading check
    if (isMobile === null || (isMobile && loadingBlobs)) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    switch (mode) {
      case 'decoy':
        // ... unchanged
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
            handleUnlock={handleUnlock}
            setMode={setMode}
            isUploading={isUploading}
            isMobile={isMobile}
            mobileBlobList={mobileBlobList}
            fetchMobileBlobList={fetchMobileBlobList}
            loadingBlobs={loadingBlobs}
            handleDeleteMobileBlob={handleDeleteMobileBlob}
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
            setBlobPath={setBlobPath}
            selectBlobFile={() => selectBlobFile(true)}
            handleInit={handleInit}
            uploadFiles={uploadFiles}
            onFileSelectForInit={onFileSelectForInit}
            isUploading={isUploading}
            setMode={setMode}
            isMobile={isMobile}
            mobileBlobList={mobileBlobList}
            loadingBlobs={loadingBlobs}
          />
        );
      case 'ready':
        // ... unchanged
        return (
          <ReadyScreen
            isMobile={isMobile}
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

  console.log("--- App component function END (before return) ---");

  return (
    <div className="flex flex-col h-screen max-w-full overflow-hidden">
      {/* ... Upload Progress indicator ... */}
      {mode !== 'decoy' && uploadProgress && (
         // ... existing progress indicator ...
         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg rounded px-6 py-4 z-50 flex flex-col items-center">
          <span className="mb-2 font-semibold">Uploading and Encrypting...</span>
          <span className="mb-2 text-sm">{uploadProgress.filename} ({uploadProgress.current} / {uploadProgress.total})</span>
          <progress value={uploadProgress.current} max={uploadProgress.total} className="w-48 h-2" />
        </div>
      )}
      {/* ... Mode Toggle ... */}
       {mode !== 'decoy' && (
          <div className="mode-toggle-fixed">
            <ModeToggle />
          </div>
      )}
      {renderContent()}
      {/* ... Global Messages ... */}
       {mode !== 'decoy' && (
          <GlobalMessages error={error} message={message} setError={setError} setMessage={setMessage} />
      )}
    </div>
  );
}

export default App; 