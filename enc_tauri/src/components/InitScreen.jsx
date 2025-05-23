import React from 'react';
import { useRef } from 'react'; // Add useRef
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"; // Added for loading state

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


// Example Add Icon (replace as needed)
const AddIcon = (props) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a5 5 0 00-5 5v1h1a1 1 0 010 2v1a7 7 0 007 7h1a1 1 0 012 0h1a5 5 0 005-5v-1a1 1 0 012 0v1a7 7 0 01-7 7h-1a1 1 0 01-2 0H8a5 5 0 01-5-5V8a1 1 0 010-2h1V5a7 7 0 017-7h1a1 1 0 110 2h-1z" />
   </svg>
);

function InitScreen({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  hiddenPassword,
  setHiddenPassword,
  confirmHiddenPassword,
  setConfirmHiddenPassword,
  blobPath,
  selectBlobFile,
  handleInit,
  uploadFiles,
  onFileSelectForInit,
  isUploading,
  setMode,
  // Pass error/message props if you want local display
}) {

  const [showHiddenFields, setShowHiddenFields] = React.useState(false);
  const fileInputRef = useRef(null); // Add ref for file input

  // Handler to trigger file input click
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  // TODO: Replace this placeholder with HeroUI components
  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-y-auto">
      <Card className="w-full max-w-xl p-4">
        <CardHeader className="flex flex-col items-center gap-2 pb-4">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
             {/* Replace with a suitable icon for creation/init */}
             <AddIcon className="h-8 w-8 text-primary" />
           </div>
           <h1 className="text-2xl font-bold">Create New Storage</h1>
           <p className="text-default-500">Set up your secure blob file</p>
        </CardHeader>
        <CardContent className="py-4">
            <form onSubmit={handleInit} className="flex flex-col gap-4">
              {/* Blob Path Input */}
              <div className="space-y-1">
                <Label htmlFor="initBlobPath">Blob File Location</Label>
                <div className="flex items-center space-x-2">
                   <Input
                     id="initBlobPath"
                     readOnly
                     placeholder="Select where to save the blob file"
                     value={blobPath}
                     className="flex-grow"
                   />
                   <Button
                     type="button"
                     variant="outline"
                     onClick={selectBlobFile}
                     size="sm"
                   >
                     Select Location...
                   </Button>
                 </div>
                 <p className="text-sm text-muted-foreground">This file will store your encrypted data.</p>
               </div>

              {/* Standard Password */}
               <div className="space-y-1">
                <Label htmlFor="initPassword">Standard Password</Label>
                 <Input
                  id="initPassword"
                  required
                  placeholder="Enter standard password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
               <div className="space-y-1">
                <Label htmlFor="initConfirmPassword">Confirm Standard Password</Label>
                 <Input
                  id="initConfirmPassword"
                  required
                  placeholder="Confirm standard password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
                {password !== '' && confirmPassword !== '' && password !== confirmPassword && (
                  <p className="text-sm text-destructive">Standard passwords do not match</p>
                 )}
               </div>

               <div className="pt-4"></div>

              {/* Hidden Volume Option */}
               <div className="flex items-center space-x-2 pt-2">
                 <Checkbox
                  id="hiddenVolumeCheckbox"
                  checked={showHiddenFields}
                  onCheckedChange={setShowHiddenFields}
                />
                <Label htmlFor="hiddenVolumeCheckbox" className="cursor-pointer">
                  Enable Hidden Volume (Optional)
                </Label>
               </div>


              {showHiddenFields && (
                 <div className="flex flex-col gap-4 pl-6 mt-2">
                   <p className="text-sm text-orange-600 dark:text-orange-400 -mb-2">
                       Hidden volumes provide plausible deniability. Use a different password.
                   </p>
                    <div className="space-y-1">
                     <Label htmlFor="initHiddenPassword">Hidden Password</Label>
                      <Input
                        id="initHiddenPassword"
                        required
                        placeholder="Enter hidden password"
                        value={hiddenPassword}
                        onChange={(e) => setHiddenPassword(e.target.value)}
                        type="password"
                      />
                      {hiddenPassword !== '' && password !== '' && password === hiddenPassword && (
                         <p className="text-sm text-destructive">Hidden password must differ from standard password</p>
                      )}
                    </div>
                    <div className="space-y-1">
                     <Label htmlFor="initConfirmHiddenPassword">Confirm Hidden Password</Label>
                      <Input
                        id="initConfirmHiddenPassword"
                        required
                        placeholder="Confirm hidden password"
                        value={confirmHiddenPassword}
                        onChange={(e) => setConfirmHiddenPassword(e.target.value)}
                        type="password"
                      />
                       {hiddenPassword !== '' && confirmHiddenPassword !== '' && hiddenPassword !== confirmHiddenPassword && (
                         <p className="text-sm text-destructive">Hidden passwords do not match</p>
                       )}
                    </div>
                 </div>
              )}

               <div className="pt-6"></div>

              {/* Initial File Upload (Optional) */}
              <div className="pt-2 space-y-1">
                <Label className="block text-sm font-medium mb-1">Add Initial Files (Optional):</Label>
                 {/* Keep Label separate and associated via htmlFor if needed, but the button acts as the primary trigger visually */}
                <input
                  ref={fileInputRef} // Assign the ref
                  id="initFiles"
                  type="file"
                  multiple
                  onChange={onFileSelectForInit}
                  className="hidden"
                  webkitdirectory="true"
                  // @ts-ignore
                  directory="true"
                />
                 {/* Separate Button to trigger the input */}
                <Button
                  type="button" // Important: prevent form submission
                  variant="outline"
                  className="w-full"
                  onClick={handleFileInputClick} // Trigger click handler
                >
                   Choose Files/Folder...
                </Button>
                {uploadFiles.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 pl-1">{uploadFiles.length} file(s)/folder(s) selected for initial upload.</p>
                )}
              </div>

               <div className="pt-8"></div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isUploading || !blobPath || !password || password !== confirmPassword || (showHiddenFields && (!hiddenPassword || hiddenPassword !== confirmHiddenPassword || password === hiddenPassword))}
              >
                {isUploading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Creating Storage...
                   </>
                 ) : (
                  'Create Storage'
                )}
              </Button>
            </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-4 mt-4 border-t">
            <p className="text-sm text-muted-foreground">Already have storage?</p>
             <Button
                variant="link"
                size="sm"
                onClick={() => { setMode('unlock'); /* Add necessary state resets */ }}
            >
                Unlock Existing Storage
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default InitScreen; 