import React from 'react';
import { cn } from '../lib/utils';

export function LoadingSpinner({ className, size = 'md' }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 dark:border-gray-600 dark:border-t-indigo-400',
                    sizeClasses[size]
                )}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}