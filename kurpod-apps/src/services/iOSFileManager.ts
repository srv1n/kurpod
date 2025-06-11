import { invoke, platform } from '@tauri-apps/api/core';

export interface SecurityScopedBookmark {
  path: string;
  bookmark: string;
  created_at: number;
}

export interface BookmarkAccessResult {
  path: string;
  is_stale: boolean;
}

export class iOSFileManager {
  private static readonly BOOKMARK_STORAGE_KEY = 'ios_security_scoped_bookmark';
  private currentBookmark: SecurityScopedBookmark | null = null;
  private currentAccessPath: string | null = null;

  /**
   * Check if the current platform is iOS
   */
  public static async isIOSPlatform(): Promise<boolean> {
    try {
      const platformName = await platform();
      return platformName === 'ios';
    } catch (error) {
      console.warn('Failed to detect platform:', error);
      return false;
    }
  }

  /**
   * Pick a blob file using iOS document picker with security-scoped bookmarks
   */
  public async pickBlobFile(): Promise<SecurityScopedBookmark> {
    if (!(await iOSFileManager.isIOSPlatform())) {
      throw new Error('Security-scoped bookmark file picking is only available on iOS');
    }

    try {
      // Call the native iOS file picker
      const urlString = await invoke<string>('ios_pick_blob_file');
      
      // Create bookmark for persistence
      let bookmarkData = '';
      try {
        bookmarkData = await invoke<string>('ios_create_bookmark', { url: urlString });
      } catch (bookmarkError) {
        console.warn('Failed to create bookmark, file access may not persist:', bookmarkError);
      }

      const result: SecurityScopedBookmark = {
        path: urlString,
        bookmark: bookmarkData,
        created_at: Date.now() / 1000, // Unix timestamp
      };
      
      // Store the bookmark for persistence
      this.currentBookmark = result;
      this.persistBookmark(result);
      
      return result;
    } catch (error) {
      // For now, the native picker is not ready, so inform the user to use existing methods
      console.log('Native iOS picker not ready:', error);
      throw new Error('Native iOS file picker is still in development. Please use the existing file browser for now.');
    }
  }

  /**
   * Access a previously stored blob file using its security-scoped bookmark
   */
  public async accessStoredBlob(): Promise<string | null> {
    if (!(await iOSFileManager.isIOSPlatform())) {
      return null;
    }

    try {
      const storedBookmark = this.getStoredBookmark();
      if (!storedBookmark || !storedBookmark.bookmark) {
        return null;
      }

      const urlString = await invoke<string>('ios_restore_bookmark', {
        bookmarkData: storedBookmark.bookmark
      });

      this.currentAccessPath = urlString;
      return urlString;
    } catch (error) {
      if (error && typeof error === 'string' && error.includes('stale')) {
        // Bookmark is stale, need to re-pick the file
        this.clearStoredBookmark();
        throw new Error('BOOKMARK_STALE');
      }
      console.error('Failed to access stored blob:', error);
      return null;
    }
  }

  /**
   * Release access to the currently accessed blob file
   */
  public async releaseBlobAccess(): Promise<void> {
    if (!(await iOSFileManager.isIOSPlatform()) || !this.currentAccessPath) {
      return;
    }

    try {
      await invoke('ios_stop_accessing', {
        url: this.currentAccessPath
      });
      
      this.currentAccessPath = null;
    } catch (error) {
      console.error('Failed to release blob access:', error);
      // Still reset the path even if the call failed
      this.currentAccessPath = null;
    }
  }

  /**
   * Get the current bookmark data
   */
  public getCurrentBookmark(): SecurityScopedBookmark | null {
    return this.currentBookmark;
  }

  /**
   * Get the current access path
   */
  public getCurrentAccessPath(): string | null {
    return this.currentAccessPath;
  }

  /**
   * Check if there's a stored bookmark available
   */
  public hasStoredBookmark(): boolean {
    return this.getStoredBookmark() !== null;
  }

  /**
   * Clear the stored bookmark (useful when it becomes stale)
   */
  public clearStoredBookmark(): void {
    try {
      localStorage.removeItem(iOSFileManager.BOOKMARK_STORAGE_KEY);
      this.currentBookmark = null;
    } catch (error) {
      console.error('Failed to clear stored bookmark:', error);
    }
  }

  /**
   * Store bookmark data in localStorage
   */
  private persistBookmark(bookmark: SecurityScopedBookmark): void {
    try {
      localStorage.setItem(
        iOSFileManager.BOOKMARK_STORAGE_KEY,
        JSON.stringify(bookmark)
      );
    } catch (error) {
      console.error('Failed to persist bookmark:', error);
    }
  }

  /**
   * Retrieve stored bookmark from localStorage
   */
  private getStoredBookmark(): SecurityScopedBookmark | null {
    try {
      const stored = localStorage.getItem(iOSFileManager.BOOKMARK_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as SecurityScopedBookmark;
      }
    } catch (error) {
      console.error('Failed to retrieve stored bookmark:', error);
    }
    return null;
  }

  /**
   * Initialize the file manager and attempt to restore previous access
   */
  public async initialize(): Promise<string | null> {
    if (!(await iOSFileManager.isIOSPlatform())) {
      return null;
    }

    try {
      return await this.accessStoredBlob();
    } catch (error) {
      if (error === 'BOOKMARK_STALE') {
        // Bookmark is stale, clear it so user can pick a new file
        this.clearStoredBookmark();
      }
      return null;
    }
  }

  /**
   * Cleanup method to be called on app shutdown/beforeunload
   */
  public async cleanup(): Promise<void> {
    await this.releaseBlobAccess();
  }
}

// Global instance for use throughout the app
export const iOSFileManagerInstance = new iOSFileManager();

// Auto-cleanup on page unload (web environment)
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    iOSFileManagerInstance.cleanup().catch(console.error);
  });
}