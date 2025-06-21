import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { FileGridIcon, ListIcon } from './FileTypeIcon';
import BreadcrumbNavigation from './BreadcrumbNavigation';
import { LoadingSpinner } from './LoadingSpinner';
import {
    Folder,
    Grid3X3,
    List,
    Upload,
    Trash2,
    FolderPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

const FileExplorer = ({ 
    onFilePreview,
    onUploadStart,
    onNavigate,
    currentPath = '',
    refreshTrigger = 0,
    className = '' 
}) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedFiles, setSelectedFiles] = useState(new Set());
    const { apiCall } = useAuth();

    // Load files for current path
    const loadFiles = useCallback(async (path = '') => {
        try {
            setLoading(true);
            const response = await apiCall('/api/files');
            const data = await response.json();
            
            if (data.success) {
                // Process ALL files to create folder structure - don't pre-filter
                // The processFilesForDisplay function will handle the hierarchy correctly
                const processedFiles = processFilesForDisplay(data.data.files, path);
                setFiles(processedFiles);
            } else {
                throw new Error(data.message || 'Failed to load files');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to load files');
        } finally {
            setLoading(false);
        }
    }, [apiCall]);

    // Process files to create virtual folder structure
    const processFilesForDisplay = (allFiles, currentPath) => {
        const items = new Map();
        
        allFiles.forEach(file => {
            let shouldInclude = false;
            let relativePath = '';
            
            if (!currentPath) {
                // Root level - we want to show items at the top level
                relativePath = file.path;
                shouldInclude = true;
            } else {
                // We're in a subfolder - only show files that start with currentPath/
                if (file.path.startsWith(currentPath + '/')) {
                    relativePath = file.path.substring(currentPath.length + 1);
                    shouldInclude = true;
                }
            }
            
            if (!shouldInclude) return;
            
            const segments = relativePath.split('/').filter(Boolean);
            
            if (segments.length === 1) {
                // It's a file in current directory
                items.set(file.path, {
                    ...file,
                    type: 'file',
                    displayName: segments[0]
                });
            } else if (segments.length > 1) {
                // It's in a subdirectory, create folder entry
                const folderName = segments[0];
                const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;
                
                if (!items.has(folderPath)) {
                    items.set(folderPath, {
                        path: folderPath,
                        displayName: folderName,
                        type: 'folder',
                        size: 0,
                        modified: new Date().toISOString()
                    });
                }
            }
        });
        
        return Array.from(items.values()).sort((a, b) => {
            // Folders first, then files
            if (a.type !== b.type) {
                return a.type === 'folder' ? -1 : 1;
            }
            return a.displayName.localeCompare(b.displayName);
        });
    };

    // Navigate to a path
    const handleNavigate = useCallback((path) => {
        console.log('FileExplorer handleNavigate called with path:', path);
        setSelectedFiles(new Set());
        // Notify parent component about navigation (parent manages currentPath state)
        if (onNavigate) {
            onNavigate(path);
        }
    }, [onNavigate]);

    // Handle file/folder click
    const handleItemClick = (item) => {
        if (item.type === 'folder') {
            handleNavigate(item.path);
        } else {
            // Pass only the files (not folders) for gallery navigation
            const fileItems = files.filter(f => f.type === 'file');
            onFilePreview(item, fileItems);
        }
    };

    // Handle file selection (for batch operations)
    const handleItemSelect = (item, isSelected) => {
        const newSelected = new Set(selectedFiles);
        if (isSelected) {
            newSelected.add(item.path);
        } else {
            newSelected.delete(item.path);
        }
        setSelectedFiles(newSelected);
    };

    // Delete selected files
    const handleDeleteSelected = async () => {
        if (selectedFiles.size === 0) return;
        
        const fileList = Array.from(selectedFiles).join(', ');
        if (!confirm(`Delete ${selectedFiles.size} items: ${fileList}?`)) return;
        
        const errors = [];
        let successCount = 0;
        
        try {
            for (const filePath of selectedFiles) {
                try {
                    const encodedPath = filePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
                    const response = await apiCall(`/api/files/${encodedPath}`, {
                        method: 'DELETE'
                    });
                    const data = await response.json();
                    
                    if (data.success) {
                        successCount++;
                    } else {
                        errors.push(`${filePath}: ${data.message || 'Unknown error'}`);
                    }
                } catch (error) {
                    errors.push(`${filePath}: ${error.message}`);
                }
            }
            
            // Always refresh the file list after attempting deletions
            setSelectedFiles(new Set());
            await loadFiles(currentPath);
            
            // Show appropriate toast messages
            if (successCount > 0) {
                toast.success(`Deleted ${successCount} item${successCount > 1 ? 's' : ''}`);
            }
            if (errors.length > 0) {
                toast.error(`Failed to delete ${errors.length} item${errors.length > 1 ? 's' : ''}`);
                console.error('Deletion errors:', errors);
            }
        } catch (error) {
            toast.error('Failed to delete files');
            console.error('Bulk delete error:', error);
            // Still refresh the list in case some deletions succeeded
            setSelectedFiles(new Set());
            await loadFiles(currentPath);
        }
    };

    // Format file size
    const formatSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${units[i]}`;
    };


    // Load files on mount, path change, and refresh trigger
    useEffect(() => {
        loadFiles(currentPath);
    }, [currentPath, refreshTrigger, loadFiles]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Mobile delete button - only show when files are selected */}
            {selectedFiles.size > 0 && (
                <Card className="mb-4 md:hidden">
                    <CardContent className="p-2">
                        <div className="flex items-center justify-center">
                            <Button
                                onClick={handleDeleteSelected}
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete ({selectedFiles.size})</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Desktop layout - with breadcrumb and view toggle */}
            <Card className="hidden md:block mb-6">
                <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <BreadcrumbNavigation 
                                currentPath={currentPath}
                                onNavigate={handleNavigate}
                            />
                            {/* Delete selected */}
                            {selectedFiles.size > 0 && (
                                <Button
                                    onClick={handleDeleteSelected}
                                    variant="destructive"
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete ({selectedFiles.size})</span>
                                </Button>
                            )}
                        </div>

                        {/* View mode toggle */}
                        <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                            <ToggleGroupItem value="grid" aria-label="Grid view">
                                <Grid3X3 className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="list" aria-label="List view">
                                <List className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </CardContent>
            </Card>

            {/* File display area */}
            <div className="flex-1 overflow-auto">
                {files.length === 0 ? (
                    <EmptyState />
                ) : viewMode === 'grid' ? (
                    <GridView 
                        files={files}
                        selectedFiles={selectedFiles}
                        onItemClick={handleItemClick}
                        onItemSelect={handleItemSelect}
                        formatSize={formatSize}
                    />
                ) : (
                    <ListView 
                        files={files}
                        selectedFiles={selectedFiles}
                        onItemClick={handleItemClick}
                        onItemSelect={handleItemSelect}
                        formatSize={formatSize}
                    />
                )}
            </div>
        </div>
    );
};

// Empty state component
const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-6">
        <Card className="p-8 w-fit">
            <Folder className="h-16 w-16 text-muted-foreground" />
        </Card>
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No files yet</h3>
            <p className="text-sm text-muted-foreground">
                Use the upload buttons in the header to get started
            </p>
        </div>
    </div>
);

// Grid view component
const GridView = ({ files, selectedFiles, onItemClick, onItemSelect, formatSize }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4">
        {files.map((item) => (
            <FileGridItem
                key={item.path}
                item={item}
                isSelected={selectedFiles.has(item.path)}
                onClick={() => onItemClick(item)}
                onSelect={(selected) => onItemSelect(item, selected)}
                formatSize={formatSize}
            />
        ))}
    </div>
);

// List view component
const ListView = ({ files, selectedFiles, onItemClick, onItemSelect, formatSize }) => (
    <div className="p-4">
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <Checkbox
                                    checked={files.length > 0 && files.every(file => selectedFiles.has(file.path))}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            files.forEach(file => onItemSelect(file, true));
                                        } else {
                                            files.forEach(file => onItemSelect(file, false));
                                        }
                                    }}
                                />
                            </th>
                            <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Size</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {files.map((item) => (
                            <FileListItem
                                key={item.path}
                                item={item}
                                isSelected={selectedFiles.has(item.path)}
                                onClick={() => onItemClick(item)}
                                onSelect={(selected) => onItemSelect(item, selected)}
                                formatSize={formatSize}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

// Grid item component
const FileGridItem = ({ item, isSelected, onClick, onSelect, formatSize }) => (
    <div className="animate-in fade-in-50">
        <Card
            className={cn(
                "p-4 transition-all duration-200 relative hover:shadow-md",
                isSelected && "ring-2 ring-primary"
            )}
        >
            {/* Selection checkbox - larger clickable area */}
            <div 
                className="absolute top-3 left-3 cursor-pointer z-10"
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(!isSelected);
                }}
            >
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={onSelect}
                />
            </div>

            {/* File content - clickable to open */}
            <div 
                className="flex flex-col items-center text-center cursor-pointer pt-6"
                onClick={onClick}
            >
                <FileGridIcon 
                    filename={item.displayName}
                    isFolder={item.type === 'folder'}
                />
                
                {/* File name */}
                <h3 className="text-sm font-medium text-foreground truncate w-full mt-2">
                    {item.displayName}
                </h3>
                
                {/* File size */}
                {item.type === 'file' && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {formatSize(item.size)}
                    </p>
                )}
            </div>
        </Card>
    </div>
);

// List item component
const FileListItem = ({ item, isSelected, onClick, onSelect, formatSize }) => (
    <tr 
        className={cn(
            "hover:bg-muted/50 transition-colors duration-200",
            isSelected && "bg-primary/10"
        )}
    >
        <td className="px-4 py-3">
            <div 
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(!isSelected);
                }}
            >
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={onSelect}
                />
            </div>
        </td>
        <td className="px-4 py-3 cursor-pointer" onClick={onClick}>
            <div className="flex items-center space-x-3">
                <ListIcon 
                    filename={item.displayName}
                    isFolder={item.type === 'folder'}
                />
                <span className="text-sm font-medium text-foreground truncate">
                    {item.displayName}
                </span>
            </div>
        </td>
        <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell cursor-pointer" onClick={onClick}>
            {item.type === 'file' ? formatSize(item.size) : '—'}
        </td>
    </tr>
);

export default FileExplorer;