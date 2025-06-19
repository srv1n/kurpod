import React from 'react';
import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
            ) : (
                <SunIcon className="h-5 w-5" />
            )}
        </button>
    );
}