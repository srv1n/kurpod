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
        <CardHeader className="flex flex-col items-center gap-2 pb-4">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
             <LockIcon className="h-8 w-8 text-primary" />
           </div>
           <h1 className="text-2xl font-bold">Welcome Back</h1>
           <p className="text-default-500">Unlock your secure storage</p>
        </CardHeader>
        <CardContent className="py-4">
           {/* Local message display (optional, could rely on global messages) */}
           {/* {error && <div className="mb-4 p-3 bg-danger/10 text-danger rounded-lg text-sm border border-danger/30">{error}</div>} */}
           {/* {message && <div className="mb-4 p-3 bg-success/10 text-success rounded-lg text-sm border border-success/30">{message}</div>} */}

           <form onSubmit={handleUnlock} className="flex flex-col gap-4">
             <div className="flex flex-col gap-2">
               <label htmlFor="blobPath" className="text-sm font-medium">Blob File</label>
               <div className="flex gap-2">
                 <Input
                   readOnly
                   placeholder="Select a blob file"
                   value={blobPath || ""}
                   id="blobPath"
                   className="flex-1"
                 />
                 <Button
                   type="button"
                   variant="flat"
                   onClick={selectBlobFile}
                 >
                   Browse...
                 </Button>
               </div>
             </div>

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
               disabled={!blobPath || !password || isUploading}
               className="w-full"
             >
               {isUploading ? 'Unlocking...' : 'Unlock Storage'}
             </Button>
           </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-4 mt-4 border-t border-default-100">
            <p className="text-sm text-default-500">Don't have storage yet?</p>
            <Button
                variant="light"
                color="primary"
                size="sm"
                onClick={() => { setMode('init'); }}
            >
                Create New Storage
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UnlockScreen; 