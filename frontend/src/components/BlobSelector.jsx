import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';

export function BlobSelector({ 
    serverStatus, 
    selectedBlob, 
    onBlobChange, 
    onCreateNew,
    disabled = false 
}) {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleBlobSelect = (blob) => {
        onBlobChange(blob);
        setIsOpen(false);
    };

    const handleCreateNew = () => {
        setIsOpen(false);
        onCreateNew?.();
    };

    if (!serverStatus?.data) {
        return null;
    }

    const { mode, blob_path, available_blobs } = serverStatus.data;

    // Single file mode - show selected file
    if (mode === 'single') {
        return (
            <div className="space-y-3">
                <label className="block text-body font-medium text-foreground">
                    Selected Blob File
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={blob_path?.split('/').pop() || 'Unknown'}
                        readOnly
                        className="neo-inset w-full px-5 py-4 text-body opacity-75"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <span className="text-caption text-primary neo-card px-3 py-1">
                            Single File Mode
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Directory mode - show dropdown
    if (mode === 'directory' && available_blobs) {
        return (
            <div className="space-y-3">
                <label className="block text-body font-medium text-foreground">
                    Select Blob File
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        className="neo-button w-full px-5 py-4 text-left text-body 
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center justify-between"
                    >
                        <span className={selectedBlob ? "text-foreground" : "text-gray-500"}>
                            {selectedBlob || "Choose a blob file..."}
                        </span>
                        <ChevronDownIcon 
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                isOpen ? 'transform rotate-180' : ''
                            }`} 
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 w-full mt-2 neo-card border border-border max-h-60 overflow-auto animate-fadeIn">
                            {/* Create new option */}
                            <button
                                type="button"
                                onClick={handleCreateNew}
                                className="w-full px-5 py-4 text-left hover:bg-card-hover 
                                         flex items-center space-x-3 text-primary border-b border-border"
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span className="text-body font-medium">Create New Blob</span>
                            </button>

                            {/* Available blobs */}
                            {available_blobs.length > 0 ? (
                                available_blobs.map((blob) => (
                                    <button
                                        key={blob}
                                        type="button"
                                        onClick={() => handleBlobSelect(blob)}
                                        className={`w-full px-5 py-4 text-left hover:bg-card-hover text-body transition-colors duration-200
                                                   ${selectedBlob === blob ? 'neo-inset text-primary font-medium' : ''}`}
                                    >
                                        {blob}
                                    </button>
                                ))
                            ) : (
                                <div className="px-5 py-4 text-gray-500 italic text-body">
                                    No blob files found in directory
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Helper text */}
                <p className="text-caption text-gray-500">
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