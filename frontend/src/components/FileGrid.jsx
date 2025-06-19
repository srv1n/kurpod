import React from 'react';
import { cn } from '../lib/utils';

export function FileGrid({ children, className }) {
    return (
        <div
            className={cn(
                'grid gap-4',
                'grid-cols-1',
                'sm:grid-cols-2',
                'lg:grid-cols-3',
                'xl:grid-cols-4',
                '2xl:grid-cols-5',
                className
            )}
        >
            {children}
        </div>
    );
}

export function FileGridItem({ children, className }) {
    return (
        <div
            className={cn(
                'group relative rounded-lg border bg-card p-4',
                'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
                'transition-all duration-200',
                className
            )}
        >
            {children}
        </div>
    );
}