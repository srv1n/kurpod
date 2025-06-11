import { useState, useEffect, useCallback } from 'react';
import { 
  iOSFileManagerInstance, 
  iOSFileManager, 
  SecurityScopedBookmark 
} from '../services/iOSFileManager';

interface UseIOSFileAccessResult {
  isIOSPlatform: boolean;
  hasStoredBookmark: boolean;
  currentAccessPath: string | null;
  isInitializing: boolean;
  pickBlobFile: () => Promise<SecurityScopedBookmark | null>;
  restoreAccess: () => Promise<string | null>;
  releaseAccess: () => Promise<void>;
  clearBookmark: () => void;
}

/**
 * React hook for managing iOS security-scoped bookmark file access
 */
export function useIOSFileAccess(): UseIOSFileAccessResult {
  const [isIOSPlatform, setIsIOSPlatform] = useState(false);
  const [hasStoredBookmark, setHasStoredBookmark] = useState(false);
  const [currentAccessPath, setCurrentAccessPath] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize platform detection and restore access
  useEffect(() => {
    const initialize = async () => {
      setIsInitializing(true);
      
      try {
        const isIOS = await iOSFileManager.isIOSPlatform();
        setIsIOSPlatform(isIOS);
        
        if (isIOS) {
          setHasStoredBookmark(iOSFileManagerInstance.hasStoredBookmark());
          
          // Try to restore previous access
          const restoredPath = await iOSFileManagerInstance.initialize();
          setCurrentAccessPath(restoredPath);
        }
      } catch (error) {
        console.error('Failed to initialize iOS file access:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  // Pick a new blob file
  const pickBlobFile = useCallback(async (): Promise<SecurityScopedBookmark | null> => {
    if (!isIOSPlatform) {
      console.warn('File picking with security-scoped bookmarks is only available on iOS');
      return null;
    }

    try {
      const bookmark = await iOSFileManagerInstance.pickBlobFile();
      setHasStoredBookmark(true);
      setCurrentAccessPath(bookmark.path);
      return bookmark;
    } catch (error) {
      console.error('Failed to pick blob file:', error);
      throw error;
    }
  }, [isIOSPlatform]);

  // Restore access to previously selected file
  const restoreAccess = useCallback(async (): Promise<string | null> => {
    if (!isIOSPlatform) {
      return null;
    }

    try {
      const accessPath = await iOSFileManagerInstance.accessStoredBlob();
      setCurrentAccessPath(accessPath);
      return accessPath;
    } catch (error) {
      if (error === 'BOOKMARK_STALE') {
        // Bookmark is stale, clear it
        setHasStoredBookmark(false);
        setCurrentAccessPath(null);
        throw new Error('The previously selected file is no longer accessible. Please select it again.');
      }
      console.error('Failed to restore access:', error);
      return null;
    }
  }, [isIOSPlatform]);

  // Release current access
  const releaseAccess = useCallback(async (): Promise<void> => {
    if (!isIOSPlatform) {
      return;
    }

    try {
      await iOSFileManagerInstance.releaseBlobAccess();
      setCurrentAccessPath(null);
    } catch (error) {
      console.error('Failed to release access:', error);
    }
  }, [isIOSPlatform]);

  // Clear stored bookmark
  const clearBookmark = useCallback((): void => {
    iOSFileManagerInstance.clearStoredBookmark();
    setHasStoredBookmark(false);
    setCurrentAccessPath(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isIOSPlatform && currentAccessPath) {
        iOSFileManagerInstance.releaseBlobAccess().catch(console.error);
      }
    };
  }, [isIOSPlatform, currentAccessPath]);

  return {
    isIOSPlatform,
    hasStoredBookmark,
    currentAccessPath,
    isInitializing,
    pickBlobFile,
    restoreAccess,
    releaseAccess,
    clearBookmark,
  };
}