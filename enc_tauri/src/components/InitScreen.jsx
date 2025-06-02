import React from 'react';
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
  // uploadFiles, // Removed - no longer used
  // onFileSelectForInit, // Removed - no longer used
  isUploading,
  setMode,
  serverMode,
  newBlobName,
  setNewBlobName,
  // Pass error/message props if you want local display
}) {

  const [showHiddenFields, setShowHiddenFields] = React.useState(false);

  // TODO: Replace this placeholder with HeroUI components
  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-y-auto">
      <Card className="w-full max-w-xl p-4">
        <CardHeader className="flex flex-col items-center gap-2 pb-4 text-center">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-2">
             {/* Replace with a suitable icon for creation/init */}
             <AddIcon className="h-8 w-8 text-green-600" />
           </div>
           <h1 className="text-2xl font-bold text-gray-900">Create New Storage</h1>
           <p className="text-gray-600">Set up your secure blob file</p>
        </CardHeader>
        <CardContent className="py-4">
            <form onSubmit={handleInit} className="flex flex-col gap-4">
              {/* Conditional rendering based on server mode */}
              {serverMode === 'directory' && (
                <div className="space-y-2">
                  <Label htmlFor="newBlobName">New Blob Name</Label>
                  <Input
                    id="newBlobName"
                    type="text"
                    placeholder="e.g., personal.pdf, work-docs.txt, mydata.jpg"
                    value={newBlobName}
                    onChange={(e) => setNewBlobName(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Use any extension for privacy - your data will be encrypted regardless
                  </p>
                </div>
              )}
              
              {serverMode === 'desktop' && (
                <div className="space-y-2">
                  <Label htmlFor="initBlobPath">Blob File Location</Label>
                  {blobPath ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L9 5.414V13a1 1 0 11-2 0V5.414L5.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-green-600 font-medium">Selected location:</div>
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
                        className="text-green-600 hover:text-green-800"
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors">
                      <div className="flex items-center gap-2 flex-1 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L9 5.414V13a1 1 0 11-2 0V5.414L5.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">No save location selected</span>
                      </div>
                      <Button
                        type="button"
                        variant="default"
                        onClick={selectBlobFile}
                      >
                        Choose Location
                      </Button>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">This file will store your encrypted data.</p>
                </div>
              )}

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
                   <p className="text-sm text-orange-600 -mb-2">
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

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isUploading || (serverMode === 'desktop' && !blobPath) || (serverMode === 'directory' && !newBlobName.trim()) || !password || password !== confirmPassword || (showHiddenFields && (hiddenPassword.trim() !== '' && (hiddenPassword !== confirmHiddenPassword || password === hiddenPassword)))}
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
        <CardFooter className="flex flex-col items-center pt-4 mt-4 border-t text-center">
            <p className="text-sm text-gray-600">Already have storage?</p>
             <Button
                variant="ghost"
                size="sm"
                onClick={() => { setMode('unlock'); /* Add necessary state resets */ }}
                className="mt-2 text-blue-600 hover:text-blue-800"
            >
                Unlock Existing Storage
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default InitScreen; 