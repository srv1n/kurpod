import React from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { BreadcrumbIcon } from './FileTypeIcon';

const Breadcrumb = ({ 
    currentPath = '', 
    onNavigate,
    className = '' 
}) => {
    // Parse path into segments
    const segments = currentPath
        .split('/')
        .filter(segment => segment.length > 0)
        .map((segment, index, array) => ({
            name: segment,
            path: array.slice(0, index + 1).join('/'),
            isLast: index === array.length - 1
        }));

    const handleNavigate = (path) => {
        if (onNavigate) {
            onNavigate(path);
        }
    };

    return (
        <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
            {/* Home button */}
            <button
                onClick={() => handleNavigate('')}
                className="neo-button px-3 py-2 flex items-center space-x-2 text-body hover:text-foreground transition-colors duration-200"
                aria-label="Go to root"
            >
                <HomeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
            </button>

            {/* Breadcrumb segments */}
            {segments.map((segment, index) => (
                <React.Fragment key={segment.path}>
                    {/* Separator */}
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    
                    {/* Segment button */}
                    <button
                        onClick={() => !segment.isLast && handleNavigate(segment.path)}
                        disabled={segment.isLast}
                        className={`
                            flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                            ${segment.isLast 
                                ? 'text-foreground font-medium cursor-default' 
                                : 'neo-button text-body hover:text-foreground'
                            }
                        `}
                        aria-current={segment.isLast ? 'page' : undefined}
                    >
                        <BreadcrumbIcon 
                            filename={segment.name}
                            isFolder={!segment.isLast || !segment.name.includes('.')}
                        />
                        <span className="truncate max-w-32 sm:max-w-48">
                            {segment.name}
                        </span>
                    </button>
                </React.Fragment>
            ))}
        </nav>
    );
};

// Mobile-optimized breadcrumb that shows only current and parent
export const MobileBreadcrumb = ({ 
    currentPath = '', 
    onNavigate,
    className = '' 
}) => {
    const segments = currentPath
        .split('/')
        .filter(segment => segment.length > 0);
    
    const currentSegment = segments[segments.length - 1];
    const parentPath = segments.slice(0, -1).join('/');
    const hasParent = segments.length > 0;

    return (
        <nav className={`flex items-center space-x-1 py-1 ${className}`} aria-label="Breadcrumb">
            {/* Back button for mobile */}
            {hasParent && (
                <button
                    onClick={() => onNavigate(parentPath)}
                    className="p-1.5 rounded text-body hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Go back"
                >
                    <ChevronRightIcon className="w-4 h-4 rotate-180" />
                </button>
            )}
            
            {/* Home button */}
            <button
                onClick={() => onNavigate('')}
                className="p-1.5 rounded text-body hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Go to root"
            >
                <HomeIcon className="w-4 h-4" />
            </button>
            
            {/* Current location */}
            {currentSegment && (
                <>
                    <ChevronRightIcon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                    <div className="flex items-center space-x-1 text-foreground font-medium min-w-0">
                        <BreadcrumbIcon 
                            filename={currentSegment}
                            isFolder={!currentSegment.includes('.')}
                        />
                        <span className="truncate text-sm">
                            {currentSegment}
                        </span>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Breadcrumb;