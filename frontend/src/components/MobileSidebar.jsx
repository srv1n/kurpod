import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BreadcrumbIcon } from './FileTypeIcon';
import { ThemeToggle } from './ThemeToggle';
import {
    Menu,
    Home,
    Folder,
    ChevronRight,
    LogOut,
    Upload,
    FolderPlus,
    Settings,
    ArrowLeft
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const MobileSidebar = ({ 
    currentPath = '',
    onNavigate,
    onUploadStart,
    onCompactStorage,
    className = '' 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, volumeType } = useAuth();

    // Parse current path into navigation items
    const pathSegments = currentPath
        .split('/')
        .filter(segment => segment.length > 0);

    const navigationItems = [
        { name: 'Home', path: '', icon: Home },
        ...pathSegments.map((segment, index) => ({
            name: segment,
            path: pathSegments.slice(0, index + 1).join('/'),
            icon: Folder
        }))
    ];

    // Close sidebar when path changes
    useEffect(() => {
        setIsOpen(false);
    }, [currentPath]);

    const handleNavigate = (path) => {
        onNavigate?.(path);
        setIsOpen(false);
    };

    const handleUpload = (type) => {
        onUploadStart?.(type);
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const handleCompactStorage = () => {
        onCompactStorage?.();
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`md:hidden ${className}`}
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            
            <SheetContent side="left" className="w-80 p-0">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <SheetHeader className="p-6 border-b">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    K
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <SheetTitle className="text-lg font-semibold">
                                    KURPOD
                                </SheetTitle>
                                {volumeType && (
                                    <SheetDescription className="text-xs">
                                        {volumeType} volume
                                    </SheetDescription>
                                )}
                            </div>
                        </div>
                    </SheetHeader>

                    {/* Quick actions */}
                    <div className="p-4">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                onClick={() => handleUpload('single')}
                                className="w-full justify-start"
                            >
                                <Upload className="h-4 w-4 mr-2 text-blue-600" />
                                Upload File
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleUpload('folder')}
                                className="w-full justify-start"
                            >
                                <FolderPlus className="h-4 w-4 mr-2 text-green-600" />
                                Upload Folder
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Navigation */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Navigation
                        </h3>
                        <nav className="space-y-1">
                            {navigationItems.map((item, index) => {
                                const isActive = item.path === currentPath;
                                const IconComponent = item.icon;
                                
                                return (
                                    <Button
                                        key={item.path}
                                        variant={isActive ? "secondary" : "ghost"}
                                        onClick={() => handleNavigate(item.path)}
                                        className="w-full justify-start"
                                        style={{ paddingLeft: `${12 + (index * 16)}px` }}
                                    >
                                        {index === 0 ? (
                                            <Home className="h-4 w-4 mr-2" />
                                        ) : (
                                            <BreadcrumbIcon 
                                                filename={item.name}
                                                isFolder={true}
                                                className="mr-2"
                                            />
                                        )}
                                        <span className="truncate">{item.name}</span>
                                        {index > 0 && (
                                            <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                                        )}
                                    </Button>
                                );
                            })}
                        </nav>

                        {/* Back button for deep navigation */}
                        {pathSegments.length > 0 && (
                            <div className="mt-6 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const parentPath = pathSegments.slice(0, -1).join('/');
                                        handleNavigate(parentPath);
                                    }}
                                    className="w-full justify-start"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Bottom section */}
                    <div className="p-4 space-y-4">
                        {/* Theme toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Theme</span>
                            <ThemeToggle variant="switch" />
                        </div>

                        <Separator />

                        {/* Storage management */}
                        <Button 
                            variant="outline"
                            onClick={handleCompactStorage}
                            className="w-full justify-start"
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            Compact Storage
                        </Button>

                        {/* Logout */}
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

// Quick action buttons for mobile using shadcn components
export const MobileQuickActions = ({ 
    onUploadStart,
    className = '' 
}) => {
    return (
        <div className={`flex items-center gap-2 md:hidden ${className}`}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onUploadStart?.('single')}
                aria-label="Upload file"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
                <Upload className="h-5 w-5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onUploadStart?.('folder')}
                aria-label="Upload folder"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
                <FolderPlus className="h-5 w-5" />
            </Button>
        </div>
    );
};

// Floating action button for mobile using shadcn components
export const MobileFloatingActions = ({ 
    onUploadStart,
    className = '' 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`fixed bottom-6 right-6 md:hidden ${className}`}>
            {/* Expanded actions */}
            {isExpanded && (
                <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2">
                    <Button
                        onClick={() => {
                            onUploadStart?.('folder');
                            setIsExpanded(false);
                        }}
                        className="bg-green-600 hover:bg-green-700 shadow-lg"
                        size="sm"
                    >
                        <FolderPlus className="h-4 w-4 mr-2" />
                        Folder
                    </Button>
                    <Button
                        onClick={() => {
                            onUploadStart?.('single');
                            setIsExpanded(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                        size="sm"
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        File
                    </Button>
                </div>
            )}

            {/* Main FAB */}
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                size="icon"
                className={`h-14 w-14 rounded-full shadow-xl transition-transform duration-200 ${
                    isExpanded ? 'rotate-45' : 'hover:scale-105'
                }`}
            >
                <Upload className="h-6 w-6" />
            </Button>
        </div>
    );
};

export default MobileSidebar;