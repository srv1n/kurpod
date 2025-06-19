import React from 'react';
import { cn } from '../lib/utils';

export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
                className
            )}
            {...props}
        />
    );
}

export function SkeletonText({ lines = 3, className }) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-4"
                    style={{
                        width: i === lines - 1 ? '80%' : '100%',
                    }}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className }) {
    return (
        <div className={cn('rounded-lg border bg-card p-6', className)}>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <SkeletonText lines={3} className="mt-4" />
        </div>
    );
}