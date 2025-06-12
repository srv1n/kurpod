# UI Components Addendum

## Overview
This document contains the missing UI component implementations that were not included in the main FRONTEND_UI_IMPLEMENTATION.md file.

## Base UI Components

### Button Component (`frontend/src/components/Button.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

const buttonVariants = {
    variant: {
        default: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    },
    size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
    },
};

export const Button = React.forwardRef(({
    className,
    variant = 'default',
    size = 'md',
    loading = false,
    disabled,
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                buttonVariants.variant[variant],
                buttonVariants.size[size],
                className
            )}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
});

Button.displayName = 'Button';
```

### Input Component (`frontend/src/components/Input.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

export const Input = React.forwardRef(({
    className,
    type = 'text',
    error,
    label,
    helper,
    prefix,
    suffix,
    ...props
}, ref) => {
    const id = React.useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {prefix && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{prefix}</span>
                    </div>
                )}
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    className={cn(
                        'block w-full rounded-md border-gray-300 shadow-sm',
                        'focus:border-indigo-500 focus:ring-indigo-500',
                        'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
                        'disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900',
                        error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
                        prefix && 'pl-10',
                        suffix && 'pr-10',
                        className
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
                    {...props}
                />
                {suffix && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{suffix}</span>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" id={`${id}-error`}>
                    {error}
                </p>
            )}
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" id={`${id}-helper`}>
                    {helper}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
```

### Card Component (`frontend/src/components/Card.jsx`)

```jsx
import React from 'react';
import { cn } from '../lib/utils';

export const Card = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'rounded-lg border bg-card text-card-foreground shadow-sm',
                'border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-800',
                className
            )}
            {...props}
        />
    );
});

Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        />
    );
});

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={cn(
                'text-2xl font-semibold leading-none tracking-tight',
                className
            )}
            {...props}
        />
    );
});

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
});

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    );
});

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        />
    );
});

CardFooter.displayName = 'CardFooter';
```

### DropdownMenu Component (`frontend/src/components/DropdownMenu.jsx`)

```jsx
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '../lib/utils';

export function DropdownMenu({ trigger, children, align = 'right' }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button as={Fragment}>{trigger}</Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={cn(
                        'absolute z-10 mt-2 w-56 origin-top-right rounded-md',
                        'bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5',
                        'focus:outline-none',
                        align === 'right' && 'right-0',
                        align === 'left' && 'left-0'
                    )}
                >
                    <div className="py-1">{children}</div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export function DropdownMenuItem({ onClick, disabled, children, className }) {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={cn(
                        'block w-full px-4 py-2 text-left text-sm',
                        active
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300',
                        disabled && 'opacity-50 cursor-not-allowed',
                        className
                    )}
                >
                    {children}
                </button>
            )}
        </Menu.Item>
    );
}

export function DropdownMenuSeparator() {
    return <div className="h-px my-1 bg-gray-200 dark:bg-gray-700" />;
}
```

### EmptyState Component (`frontend/src/components/EmptyState.jsx`)

```jsx
import React from 'react';
import { FolderOpenIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export function EmptyState({ 
    icon: Icon = FolderOpenIcon,
    title = 'No files yet',
    description = 'Get started by uploading your first file',
    action,
    actionLabel = 'Upload File',
    onAction
}) {
    return (
        <div className="text-center py-12 px-4">
            <Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
            </p>
            {action && (
                <div className="mt-6">
                    <Button onClick={onAction} size="sm">
                        <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}
```

## Icon System Implementation

### Icon Wrapper Component (`frontend/src/components/Icon.jsx`)

```jsx
import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-10 w-10',
};

export function Icon({ 
    name, 
    size = 'md', 
    solid = false,
    className,
    ...props 
}) {
    const icons = solid ? HeroIconsSolid : HeroIcons;
    const IconComponent = icons[name];
    
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }
    
    return (
        <IconComponent
            className={cn(iconSizes[size], className)}
            aria-hidden="true"
            {...props}
        />
    );
}

// Common icon exports for convenience
export const Icons = {
    // Navigation
    Menu: (props) => <Icon name="Bars3Icon" {...props} />,
    Close: (props) => <Icon name="XMarkIcon" {...props} />,
    ChevronLeft: (props) => <Icon name="ChevronLeftIcon" {...props} />,
    ChevronRight: (props) => <Icon name="ChevronRightIcon" {...props} />,
    ChevronDown: (props) => <Icon name="ChevronDownIcon" {...props} />,
    
    // Actions
    Plus: (props) => <Icon name="PlusIcon" {...props} />,
    Minus: (props) => <Icon name="MinusIcon" {...props} />,
    Edit: (props) => <Icon name="PencilIcon" {...props} />,
    Delete: (props) => <Icon name="TrashIcon" {...props} />,
    Download: (props) => <Icon name="ArrowDownTrayIcon" {...props} />,
    Upload: (props) => <Icon name="ArrowUpTrayIcon" {...props} />,
    Share: (props) => <Icon name="ShareIcon" {...props} />,
    Copy: (props) => <Icon name="ClipboardDocumentIcon" {...props} />,
    
    // Media
    Play: (props) => <Icon name="PlayIcon" {...props} solid />,
    Pause: (props) => <Icon name="PauseIcon" {...props} solid />,
    Stop: (props) => <Icon name="StopIcon" {...props} solid />,
    VolumeUp: (props) => <Icon name="SpeakerWaveIcon" {...props} />,
    VolumeOff: (props) => <Icon name="SpeakerXMarkIcon" {...props} />,
    
    // Files
    File: (props) => <Icon name="DocumentIcon" {...props} />,
    Folder: (props) => <Icon name="FolderIcon" {...props} />,
    FolderOpen: (props) => <Icon name="FolderOpenIcon" {...props} />,
    Image: (props) => <Icon name="PhotoIcon" {...props} />,
    Video: (props) => <Icon name="VideoCameraIcon" {...props} />,
    Music: (props) => <Icon name="MusicalNoteIcon" {...props} />,
    
    // Status
    Check: (props) => <Icon name="CheckIcon" {...props} />,
    Warning: (props) => <Icon name="ExclamationTriangleIcon" {...props} />,
    Error: (props) => <Icon name="XCircleIcon" {...props} />,
    Info: (props) => <Icon name="InformationCircleIcon" {...props} />,
    
    // UI
    Settings: (props) => <Icon name="Cog6ToothIcon" {...props} />,
    Search: (props) => <Icon name="MagnifyingGlassIcon" {...props} />,
    Filter: (props) => <Icon name="FunnelIcon" {...props} />,
    Sort: (props) => <Icon name="BarsArrowDownIcon" {...props} />,
    Grid: (props) => <Icon name="Squares2X2Icon" {...props} />,
    List: (props) => <Icon name="ListBulletIcon" {...props} />,
    
    // User
    User: (props) => <Icon name="UserIcon" {...props} />,
    Users: (props) => <Icon name="UsersIcon" {...props} />,
    Logout: (props) => <Icon name="ArrowRightOnRectangleIcon" {...props} />,
    Login: (props) => <Icon name="ArrowLeftOnRectangleIcon" {...props} />,
    
    // Theme
    Sun: (props) => <Icon name="SunIcon" {...props} />,
    Moon: (props) => <Icon name="MoonIcon" {...props} />,
    Computer: (props) => <Icon name="ComputerDesktopIcon" {...props} />,
};
```

### Icon Usage Examples

```jsx
// In components
import { Icons } from '../components/Icon';

// Usage examples:
<Icons.Download size="sm" className="text-gray-500" />
<Icons.Play size="lg" className="text-indigo-600" />
<Icons.Settings />

// Or direct icon usage
import { Icon } from '../components/Icon';

<Icon name="HeartIcon" size="md" solid className="text-red-500" />
```

## Layout Components

### Layout Component (`frontend/src/components/Layout.jsx`)

```jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from './DropdownMenu';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

export function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { session, logout } = useAuth();

    const navigation = [
        { name: 'Files', href: '/', icon: Icons.Folder },
        { name: 'Upload', href: '/upload', icon: Icons.Upload },
        { name: 'Settings', href: '/settings', icon: Icons.Settings },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar */}
            <div className={cn(
                'fixed inset-0 z-40 lg:hidden',
                sidebarOpen ? 'block' : 'hidden'
            )}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <Icons.Close className="text-white" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">KURPOD</h1>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                        isActive(item.href)
                                            ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <item.icon className="mr-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">KURPOD</h1>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                        isActive(item.href)
                                            ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <item.icon className="mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center w-full">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {session?.volume_type} Volume
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Session active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col flex-1">
                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                                >
                                    <Icons.Menu />
                                </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <ThemeToggle />
                                <DropdownMenu
                                    trigger={
                                        <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <Icons.User className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1" />
                                        </button>
                                    }
                                >
                                    <DropdownMenuItem disabled>
                                        <span className="block text-xs text-gray-500">Signed in as</span>
                                        <span className="block font-medium">{session?.volume_type} Volume</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                                        <Icons.Settings className="mr-2" size="sm" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>
                                        <Icons.Logout className="mr-2" size="sm" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
```

## Utility Functions

### Class Name Utility (`frontend/src/lib/utils.js`)

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
    };
    
    return new Intl.DateTimeFormat(undefined, defaultOptions).format(new Date(date));
}

export function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((resolve, reject) => {
            document.execCommand('copy') ? resolve() : reject();
            textArea.remove();
        });
    }
}
```

## Package Dependencies Update

### Updated package.json dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@headlessui/react": "^1.7.13",
    "@heroicons/react": "^2.0.16",
    "react-dropzone": "^14.2.3",
    "clsx": "^1.2.1",
    "tailwind-merge": "^1.14.0",
    "date-fns": "^2.29.3",
    "framer-motion": "^10.16.0"
  }
}
```

## Summary of Missing Components Now Documented

1. **Button Component** - Complete with variants, sizes, and loading states
2. **Input Component** - With label, error, helper text, and prefix/suffix support
3. **Card Component** - With header, title, content, and footer sub-components
4. **DropdownMenu Component** - Using Headless UI for accessibility
5. **EmptyState Component** - For empty lists and states
6. **Icon System** - Wrapper around Hero Icons with convenient exports
7. **Layout Component** - Main application layout with sidebar and navigation
8. **Utility Functions** - Common formatting and helper functions

All components follow the established patterns:
- Dark mode support via Tailwind classes
- Accessibility features (ARIA labels, keyboard navigation)
- TypeScript-ready with proper prop forwarding
- Consistent styling with the design system

These components integrate seamlessly with the theme system and other components documented in the main FRONTEND_UI_IMPLEMENTATION.md file.