import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Example Lock Icon (replace with actual import if you have an icon library)
const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

function UnlockScreen({
  password,
  setPassword,
  blobPath,
  setBlobPath,
  selectBlobFile,
  handleUnlock,
  setMode,
  isUploading,
  serverMode,
  availableBlobs,
  selectedBlob,
  setSelectedBlob,
  handleDeleteBlob,
  handleExportBlob,
  debugInfo, // Debug information for import process
  importDialog,
  setImportDialog,
  completeImport,
  cancelImport,
  error, // Pass error/message for local display if needed
  message // Pass error/message for local display if needed
}) {
  // --- Blob path localStorage logic ---
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    // On mount, load blobPath from localStorage if available
    const storedBlobPath = localStorage.getItem("blobPath");
    if (storedBlobPath && !blobPath) {
      setBlobPath(storedBlobPath);
    }
    // if blobPath changes (e.g. from parent), update localStorage
    if (blobPath) {
      localStorage.setItem("blobPath", blobPath);
    }
  }, [blobPath, setBlobPath]);

  // Handler for selecting a blob file
  const handleSelectBlob = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Update both localStorage and parent state
      setBlobPath(file.path || file.name);
      setDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex flex-col items-center gap-2 pb-4 text-center">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2">
             <LockIcon className="h-8 w-8 text-blue-600" />
           </div>
           <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
           <p className="text-gray-600">Unlock your secure storage to continue</p>
        </CardHeader>
        <CardContent className="py-4">
           {/* Local message display (optional, could rely on global messages) */}
           {/* {error && <div className="mb-4 p-3 bg-danger/10 text-danger rounded-lg text-sm border border-danger/30">{error}</div>} */}
           {/* {message && <div className="mb-4 p-3 bg-success/10 text-success rounded-lg text-sm border border-success/30">{message}</div>} */}

           <form onSubmit={handleUnlock} className="flex flex-col gap-4">
             {/* Enhanced Debug info - remove after testing */}
             {process.env.NODE_ENV === 'development' && (
               <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
                 Debug: serverMode = {JSON.stringify(serverMode)}, availableBlobs = {JSON.stringify(availableBlobs)}
                 <br />Import available: {serverMode === 'directory' ? 'YES' : 'NO'}
               </div>
             )}
             
             {/* Live State Debug - ALWAYS SHOW for troubleshooting */}
             <div className="text-xs text-purple-700 p-3 bg-purple-50 border border-purple-200 rounded-lg">
               <strong>🐛 Live Debug State:</strong><br/>
               • selectedBlob: "{selectedBlob}" (type: {typeof selectedBlob}, length: {selectedBlob?.length || 0})<br/>
               • availableBlobs: {JSON.stringify(availableBlobs)}<br/>
               • serverMode: "{serverMode}"<br/>
               • selectedBlob exists in availableBlobs: {availableBlobs.includes(selectedBlob) ? '✅ YES' : '❌ NO'}<br/>
               • Ready to unlock: {selectedBlob && availableBlobs.includes(selectedBlob) ? '✅ YES' : '❌ NO'}<br/>
               {selectedBlob && !availableBlobs.includes(selectedBlob) && (
                 <span className="text-red-600 font-bold">⚠️ ERROR: Selected blob "{selectedBlob}" not found in available blobs!</span>
               )}
             </div>
             
             {/* Import Debug Info */}
             {debugInfo && (
               <div className="text-xs text-blue-700 p-3 bg-blue-50 border border-blue-200 rounded-lg whitespace-pre-wrap">
                 <strong>Import Debug:</strong>
                 <br />
                 {debugInfo}
               </div>
             )}
             
             {/* Conditional rendering based on server mode */}
             {serverMode === 'directory' && (
               <div className="flex flex-col gap-3">
                 <label htmlFor="selectedBlob" className="text-sm font-medium">Select Blob File</label>
                 
                 {/* Blob selection with delete options */}
                 {availableBlobs && availableBlobs.length > 0 ? (
                   <div className="space-y-2">
                     {availableBlobs.map(blob => (
                       <div key={blob} className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50">
                         <input
                           type="radio"
                           id={`blob-${blob}`}
                           name="selectedBlob"
                           value={blob}
                           checked={selectedBlob === blob}
                           onChange={(e) => setSelectedBlob(e.target.value)}
                           className="w-4 h-4 text-blue-600"
                         />
                         <label htmlFor={`blob-${blob}`} className="flex-1 cursor-pointer text-sm">
                           {blob}
                         </label>
                         <div className="flex items-center gap-1">
                           <Button
                             type="button"
                             variant="ghost"
                             size="sm"
                             onClick={() => handleExportBlob && handleExportBlob(blob)}
                             className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1"
                             title="Export blob"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                             </svg>
                           </Button>
                           <Button
                             type="button"
                             variant="ghost"
                             size="sm"
                             onClick={() => handleDeleteBlob && handleDeleteBlob(blob)}
                             className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                             title="Delete blob"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H5a1 1 0 00-1 1v3m2 0h12" />
                             </svg>
                           </Button>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center p-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-md">
                     <p className="text-sm">No blob files found</p>
                     <p className="text-xs mt-1">Create a new one or import an existing blob</p>
                   </div>
                 )}
                 
                 {/* Import blob option */}
                 <div className="text-center">
                   <p className="text-xs text-gray-500 mb-2">or</p>
                   <Button
                     type="button"
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       console.log('[UnlockScreen] Import button clicked');
                       selectBlobFile();
                     }}
                     className="w-full"
                   >
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                     </svg>
                     Import Existing Blob
                   </Button>
                   <p className="text-xs text-gray-500 mt-1">Import a blob file from your device</p>
                 </div>
               </div>
             )}
             
             {serverMode === 'desktop' && (
               <div className="flex flex-col gap-2">
                 <label htmlFor="blobPath" className="text-sm font-medium">Blob File</label>
                 <div className="flex flex-col gap-2">
                   {blobPath ? (
                     <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                       <div className="flex items-center gap-2 flex-1 min-w-0">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L9 5.414V13a1 1 0 11-2 0V5.414L5.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                         </svg>
                         <div className="flex-1 min-w-0">
                           <div className="text-xs text-blue-600 font-medium">Previously chosen file:</div>
                           <div className="text-sm text-gray-700 truncate" title={blobPath}>
                             {blobPath.split('/').pop() || blobPath}
                           </div>
                           <div className="text-xs text-gray-500 truncate" title={blobPath}>
                             {blobPath.split('/').slice(0, -1).join('/') || 'Root folder'}
                           </div>
                         </div>
                       </div>
                       <Button
                         type="button"
                         variant="ghost"
                         size="sm"
                         onClick={selectBlobFile}
                         className="text-blue-600 hover:text-blue-800"
                       >
                         Change
                       </Button>
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
                       <div className="flex items-center gap-2 flex-1 text-gray-500">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L9 5.414V13a1 1 0 11-2 0V5.414L5.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                         </svg>
                         <span className="text-sm">No blob file selected</span>
                       </div>
                       <Button
                         type="button"
                         variant="primary"
                         onClick={selectBlobFile}
                       >
                         Choose File
                       </Button>
                     </div>
                   )}
                 </div>
               </div>
             )}

             <Input
               required
               label="Password"
               placeholder="Enter your password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               id="password"
               type="password"
             />

             <Button
               color="primary"
               type="submit"
               size="lg"
               disabled={(serverMode === 'desktop' && !blobPath) || (serverMode === 'directory' && !selectedBlob) || !password || isUploading}
               className="w-full"
             >
               {isUploading ? 'Unlocking...' : 'Unlock Storage'}
             </Button>
           </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-4 mt-4 border-t text-center">
            <p className="text-sm text-gray-600">Don't have storage yet?</p>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => { setMode('init'); }}
                className="mt-2 text-blue-600 hover:text-blue-800"
            >
                Create New Storage
            </Button>
        </CardFooter>
      </Card>
      
      {/* Import Name Dialog */}
      {importDialog.open && (
        <Dialog open={importDialog.open} onOpenChange={(open) => !open && cancelImport()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Blob File</DialogTitle>
              <DialogDescription>
                Enter a name for the imported blob file. You can use any extension for privacy.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="import-name" className="text-right text-sm font-medium">
                  Name:
                </label>
                <input
                  id="import-name"
                  value={importDialog.importName}
                  onChange={(e) => setImportDialog(prev => ({ ...prev, importName: e.target.value }))}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., personal.pdf, work-docs.txt"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Original file: {importDialog.originalName}
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cancelImport}>
                Cancel
              </Button>
              <Button onClick={completeImport} disabled={!importDialog.importName.trim()}>
                Import
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default UnlockScreen; 