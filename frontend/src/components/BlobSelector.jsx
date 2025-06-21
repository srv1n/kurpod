import React, { useState, useEffect, useRef } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function BlobSelector({ 
    serverStatus, 
    selectedBlob, 
    onBlobChange, 
    onCreateNew,
    disabled = false 
}) {
    const hasInitialized = useRef(false);

    // Get stored blob preference - only run once when server status is available
    useEffect(() => {
        if (serverStatus?.data?.mode === 'directory' && 
            serverStatus?.data?.available_blobs?.length > 0 && 
            !hasInitialized.current) {
            
            hasInitialized.current = true;
            const lastBlob = localStorage.getItem('kurpod_last_blob');
            
            if (lastBlob && serverStatus.data.available_blobs.includes(lastBlob)) {
                onBlobChange(lastBlob);
            } else {
                // Default to first blob if none selected
                onBlobChange(serverStatus.data.available_blobs[0]);
            }
        }
    }, [serverStatus?.data?.mode, serverStatus?.data?.available_blobs, onBlobChange]);

    // Store blob preference when changed
    useEffect(() => {
        if (selectedBlob) {
            localStorage.setItem('kurpod_last_blob', selectedBlob);
        }
    }, [selectedBlob]);

    if (!serverStatus?.data) {
        return null;
    }

    const { mode, blob_path, available_blobs } = serverStatus.data;

    // Single file mode - show selected file
    if (mode === 'single') {
        return (
            <div className="space-y-3">
                <Label className="text-sm font-medium">
                    Selected Blob File
                </Label>
                <div className="relative">
                    <Input
                        value={blob_path?.split('/').pop() || 'Unknown'}
                        readOnly
                        className="pr-20 opacity-75"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Badge variant="secondary" className="text-xs">
                            Single File Mode
                        </Badge>
                    </div>
                </div>
            </div>
        );
    }

    // Directory mode - show dropdown
    if (mode === 'directory' && available_blobs) {
        return (
            <div className="space-y-3">
                <Label className="text-sm font-medium">
                    Select Blob File
                </Label>
                
                <div className="space-y-2">
                    <Select
                        value={selectedBlob}
                        onValueChange={onBlobChange}
                        disabled={disabled}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a blob file..." />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Create new option */}
                            <div className="p-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onCreateNew?.();
                                    }}
                                    className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create New Blob
                                </Button>
                            </div>
                            
                            {available_blobs.length > 0 && (
                                <>
                                    <Separator />
                                    {available_blobs.map((blob) => (
                                        <SelectItem key={blob} value={blob}>
                                            {blob}
                                        </SelectItem>
                                    ))}
                                </>
                            )}
                            
                            {available_blobs.length === 0 && (
                                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                    No blob files found in directory
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                </div>

                {/* Helper text */}
                <p className="text-xs text-muted-foreground">
                    {available_blobs.length > 0 
                        ? `${available_blobs.length} blob file(s) available in directory`
                        : "No blob files found. Create a new one to get started."
                    }
                </p>
            </div>
        );
    }

    return null;
}