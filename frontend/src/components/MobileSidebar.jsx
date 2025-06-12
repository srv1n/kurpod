import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuth } from '../contexts/AuthContext';
import { BreadcrumbIcon } from './FileTypeIcon';
import { ThemeToggle } from './ThemeToggle';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    FolderIcon,
    ChevronRightIcon,
    ArrowRightOnRectangleIcon,
    ArrowUpTrayIcon,
    FolderPlusIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

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
        { name: 'Home', path: '', icon: HomeIcon },
        ...pathSegments.map((segment, index) => ({
            name: segment,
            path: pathSegments.slice(0, index + 1).join('/'),
            icon: FolderIcon
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
        <>
            {/* Trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`neo-button p-2 text-body hover:text-foreground md:hidden ${className}`}
                aria-label="Open navigation menu"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Sidebar dialog */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="md:hidden relative z-50"
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

                {/* Sidebar panel */}
                <div className="fixed inset-0 flex">
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                        {/* Close button */}
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Sidebar content */}
                        <div className="neo-card h-full w-full overflow-y-auto bg-background border-r border-border">
                            <div className="flex h-full flex-col">
                                {/* Header */}
                                <div className="flex items-center space-x-3 p-6 border-b border-border">
                                    <img 
                                        src="/android-chrome-192x192.png" 
                                        alt="KURPOD Logo" 
                                        className="w-8 h-8"
                                    />
                                    <div>
                                        <h1 className="text-subheading font-semibold text-foreground">
                                            KURPOD
                                        </h1>
                                        {volumeType && (
                                            <p className="text-caption text-gray-500">
                                                {volumeType} volume
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Quick actions */}
                                <div className="p-4 border-b border-border">
                                    <h2 className="text-caption font-medium text-gray-500 uppercase tracking-wider mb-3">
                                        Quick Actions
                                    </h2>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleUpload('single')}
                                            className="w-full neo-button flex items-center space-x-3 p-3 text-left text-body hover:text-foreground"
                                        >
                                            <ArrowUpTrayIcon className="w-5 h-5 text-blue-600" />
                                            <span>Upload File</span>
                                        </button>
                                        <button
                                            onClick={() => handleUpload('folder')}
                                            className="w-full neo-button flex items-center space-x-3 p-3 text-left text-body hover:text-foreground"
                                        >
                                            <FolderPlusIcon className="w-5 h-5 text-green-600" />
                                            <span>Upload Folder</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex-1 p-4">
                                    <h2 className="text-caption font-medium text-gray-500 uppercase tracking-wider mb-3">
                                        Navigation
                                    </h2>
                                    <nav className="space-y-1">
                                        {navigationItems.map((item, index) => {
                                            const isActive = item.path === currentPath;
                                            const IconComponent = item.icon;
                                            
                                            return (
                                                <button
                                                    key={item.path}
                                                    onClick={() => handleNavigate(item.path)}
                                                    className={`
                                                        w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200
                                                        ${isActive 
                                                            ? 'neo-inset text-foreground font-medium' 
                                                            : 'neo-button text-body hover:text-foreground'
                                                        }
                                                    `}
                                                    style={{ paddingLeft: `${12 + (index * 16)}px` }}
                                                >
                                                    {index === 0 ? (
                                                        <HomeIcon className="w-5 h-5 flex-shrink-0" />
                                                    ) : (
                                                        <BreadcrumbIcon 
                                                            filename={item.name}
                                                            isFolder={true}
                                                        />
                                                    )}
                                                    <span className="truncate">{item.name}</span>
                                                    {index > 0 && (
                                                        <ChevronRightIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </nav>

                                    {/* Back button for deep navigation */}
                                    {pathSegments.length > 0 && (
                                        <div className="mt-6 pt-4 border-t border-border">
                                            <button
                                                onClick={() => {
                                                    const parentPath = pathSegments.slice(0, -1).join('/');
                                                    handleNavigate(parentPath);
                                                }}
                                                className="w-full neo-button flex items-center space-x-3 p-3 text-left text-body hover:text-foreground"
                                            >
                                                <ChevronRightIcon className="w-5 h-5 rotate-180" />
                                                <span>Back</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom section */}
                                <div className="border-t border-border">
                                    {/* Theme toggle */}
                                    <div className="p-4 border-b border-border">
                                        <div className="flex items-center justify-between">
                                            <span className="text-body">Theme</span>
                                            <ThemeToggle />
                                        </div>
                                    </div>

                                    {/* Storage management */}
                                    <div className="p-4 space-y-2 border-b border-border">
                                        <button 
                                            onClick={handleCompactStorage}
                                            className="w-full neo-button flex items-center space-x-3 p-3 text-left text-body hover:text-foreground"
                                        >
                                            <WrenchScrewdriverIcon className="w-5 h-5" />
                                            <span>Compact Storage</span>
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className="p-4">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full neo-button flex items-center space-x-3 p-3 text-left text-red-600 hover:text-red-700"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

// Quick action buttons for mobile
export const MobileQuickActions = ({ 
    onUploadStart,
    className = '' 
}) => {
    return (
        <div className={`flex items-center space-x-2 md:hidden ${className}`}>
            <button
                onClick={() => onUploadStart?.('single')}
                className="neo-button p-2 text-blue-600 hover:text-blue-700"
                aria-label="Upload file"
            >
                <ArrowUpTrayIcon className="w-5 h-5" />
            </button>
            <button
                onClick={() => onUploadStart?.('folder')}
                className="neo-button p-2 text-green-600 hover:text-green-700"
                aria-label="Upload folder"
            >
                <FolderPlusIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

// Floating action button for mobile
export const MobileFloatingActions = ({ 
    onUploadStart,
    className = '' 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`fixed bottom-6 right-6 md:hidden ${className}`}>
            {/* Expanded actions */}
            {isExpanded && (
                <div className="absolute bottom-16 right-0 space-y-3 animate-slideUp">
                    <button
                        onClick={() => {
                            onUploadStart?.('folder');
                            setIsExpanded(false);
                        }}
                        className="neo-card p-3 flex items-center space-x-2 text-green-600 hover:text-green-700 shadow-lg"
                    >
                        <FolderPlusIcon className="w-5 h-5" />
                        <span className="text-body font-medium">Folder</span>
                    </button>
                    <button
                        onClick={() => {
                            onUploadStart?.('single');
                            setIsExpanded(false);
                        }}
                        className="neo-card p-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700 shadow-lg"
                    >
                        <ArrowUpTrayIcon className="w-5 h-5" />
                        <span className="text-body font-medium">File</span>
                    </button>
                </div>
            )}

            {/* Main FAB */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                    neo-card p-4 rounded-full shadow-xl transition-transform duration-200
                    ${isExpanded ? 'rotate-45' : 'hover:scale-105'}
                `}
            >
                <ArrowUpTrayIcon className="w-6 h-6 text-primary" />
            </button>
        </div>
    );
};

export default MobileSidebar;