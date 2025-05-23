import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { RefreshCwIcon, Trash2Icon } from 'lucide-react';

function UnlockScreen({ 
    password, setPassword, 
    blobPath, setBlobPath, 
    handleUnlock, 
    setMode,
    isUploading,
    isMobile,
    mobileBlobList,
    fetchMobileBlobList,
    loadingBlobs,
    handleDeleteMobileBlob
}) {

  const handleBlobSelection = (selectedValue) => {
    if (selectedValue === '__type_new__' || selectedValue === '__label__' || selectedValue === 'loading' || selectedValue === 'no_blobs') {
        // Don't set blobPath for special/disabled items
    } else {
        setBlobPath(selectedValue);
    }
  };

  const onDeleteClick = (e, filename) => {
    e.stopPropagation();
    handleDeleteMobileBlob(filename);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Unlock Vault</CardTitle>
          <CardDescription>
            {isMobile ? "Select or enter vault name" : "Enter password and select vault file"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleUnlock}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blob-path">
                {isMobile ? "Vault Name (.blob)" : "Vault File Path"}
              </Label>
              {isMobile && (
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Select 
                            onValueChange={handleBlobSelection} 
                            value={mobileBlobList?.includes(blobPath) ? blobPath : ''}
                            disabled={isUploading || loadingBlobs}
                        >
                            <SelectTrigger className="flex-grow">
                                <SelectValue placeholder="Select existing vault..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Available Vaults</SelectLabel>
                                    {mobileBlobList === null && <SelectItem value="loading" disabled>Loading...</SelectItem>}
                                    {mobileBlobList && mobileBlobList.length === 0 && <SelectItem value="no_blobs" disabled>No vaults found</SelectItem>}
                                    {mobileBlobList?.map((name) => (
                                        <SelectItem key={name} value={name} className="flex justify-between items-center pr-8">
                                            <span className="truncate flex-grow mr-2">{name}</span>
                                            <Button 
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-destructive hover:bg-destructive/10 p-1 z-10"
                                                onClick={(e) => onDeleteClick(e, name)}
                                                disabled={isUploading || loadingBlobs}
                                                title={`Delete ${name}`}
                                             >
                                                 <Trash2Icon className="h-4 w-4" />
                                             </Button>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={fetchMobileBlobList}
                            disabled={isUploading || loadingBlobs}
                            title="Refresh vault list"
                        >
                             <RefreshCwIcon className={`h-4 w-4 ${loadingBlobs ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                    
                    <Input 
                        id="blob-path-mobile-input"
                        type="text"
                        placeholder="Or type new vault name here..."
                        value={blobPath}
                        onChange={(e) => setBlobPath(e.target.value)} 
                        required 
                        disabled={isUploading}
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">Vaults are stored in the app's private data area.</p>
                    
                </div>
              )}

              {!isMobile && (
                <div className="flex space-x-2">
                  <Input 
                    id="blob-path-desktop"
                    type="text"
                    placeholder="Click Select or enter path"
                    value={blobPath}
                    onChange={(e) => setBlobPath(e.target.value)} 
                    required 
                    className="flex-grow"
                    disabled={isUploading}
                  />
                  <Button 
                     type="button" 
                     variant="outline" 
                     onClick={() => invoke('selectBlobFile', { forSave: false }).catch(err => console.error(err))}
                     disabled={isUploading}
                   >
                        Select File
                    </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={isUploading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch space-y-2">
            <Button type="submit" disabled={!password || !blobPath || isUploading || (isMobile && loadingBlobs)}>
              {isUploading ? 'Unlocking...' : 'Unlock Vault'}
            </Button>
            <Button type="button" variant="link" onClick={() => setMode('init')} disabled={isUploading}>
              Create New Vault
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default UnlockScreen; 