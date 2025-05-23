import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileInput } from './file-input'; // Assuming you have a styled file input

function InitScreen({ 
  password, setPassword,
  confirmPassword, setConfirmPassword,
  hiddenPassword, setHiddenPassword,
  confirmHiddenPassword, setConfirmHiddenPassword,
  blobPath, setBlobPath, // Accept setBlobPath
  selectBlobFile,
  handleInit,
  uploadFiles, onFileSelectForInit,
  isUploading,
  setMode,
  isMobile,
  mobileBlobList, // <-- Accept blob list
  // loadingBlobs // Not strictly needed here unless we add a refresh button
}) {

  // Check if entered name already exists on mobile
  const vaultNameExists = isMobile && mobileBlobList && mobileBlobList.includes(blobPath.trim());

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Vault</CardTitle>
          <CardDescription>
            Set up your standard password. Optionally, set a hidden password for a decoy vault.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleInit}>
          <CardContent className="space-y-4">
            {/* Blob Path/Name Input */}
            <div className="space-y-2">
              <Label htmlFor="blob-path">
                 {isMobile ? "New Vault Name (.blob)" : "Vault File Path to Create/Replace"}
              </Label>
              <div className="flex space-x-2">
                <Input 
                  id="blob-path" 
                  type="text"
                  placeholder={isMobile ? "e.g., my_secure_vault.blob" : "Click Select or enter path"}
                  value={blobPath} 
                  onChange={(e) => setBlobPath(e.target.value)} // Use setBlobPath directly
                  required 
                  className="flex-grow"
                  disabled={isUploading}
                />
                {/* Conditionally render Select Button */} 
                {!isMobile && (
                  <Button type="button" variant="outline" onClick={() => selectBlobFile(true)} disabled={isUploading}>
                     Select Path
                  </Button>
                )}
              </div>
               {isMobile && <p className="text-xs text-muted-foreground">Vault will be created in the app's private data area.</p>}
               {isMobile && (
                  <> 
                    {vaultNameExists && (
                        <p className="text-xs text-destructive">Warning: A vault with this name already exists and will be overwritten.</p>
                    )}
                  </>
                )}
            </div>

            {/* Standard Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Standard Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isUploading}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Standard Password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isUploading}/>
            </div>

            {/* Hidden Password (Optional) */}
             <CardDescription>Optional hidden vault:</CardDescription>
             <div className="space-y-2">
              <Label htmlFor="hidden-password">Hidden Password (Optional)</Label>
              <Input id="hidden-password" type="password" value={hiddenPassword} onChange={(e) => setHiddenPassword(e.target.value)} disabled={isUploading} placeholder="Leave blank for no hidden vault"/>
            </div>
            {hiddenPassword && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-hidden-password">Confirm Hidden Password</Label>
                  <Input id="confirm-hidden-password" type="password" value={confirmHiddenPassword} onChange={(e) => setConfirmHiddenPassword(e.target.value)} required disabled={isUploading}/>
                </div>
            )}

            {/* Initial File Upload (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="init-files">Upload Initial Files (Optional)</Label>
              <FileInput 
                id="init-files"
                multiple 
                // Only allow directory selection on desktop
                {...(!isMobile && { webkitdirectory: "true" })} 
                onChange={onFileSelectForInit}
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground">
                 {isMobile ? "Select files to include." : "Select files or a folder to include."}
              </p>
              {uploadFiles.length > 0 && (
                <p className="text-xs text-green-600 dark:text-green-400">{uploadFiles.length} file(s)/folder(s) selected for initial upload.</p>
              )}
            </div>

          </CardContent>
          <CardFooter className="flex flex-col items-stretch space-y-2">
            <Button type="submit" disabled={!password || !confirmPassword || !blobPath || (hiddenPassword && !confirmHiddenPassword) || isUploading}>
              {isUploading ? 'Creating...' : 'Create Vault'}
            </Button>
            <Button type="button" variant="link" onClick={() => setMode('unlock')} disabled={isUploading}>
              Unlock Existing Vault
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default InitScreen; 