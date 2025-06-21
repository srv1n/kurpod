import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

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
        <Card
            className={cn(
                'group relative p-4',
                'hover:shadow-lg',
                'transition-all duration-200',
                className
            )}
        >
            {children}
        </Card>
    );
}