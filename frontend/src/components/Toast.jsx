import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

const toastIcons = {
    success: CheckCircleIcon,
    error: ExclamationCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationCircleIcon,
};

const toastColors = {
    success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
};

export function Toast({ message, type = 'info', duration = 5000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);
    const Icon = toastIcons[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return createPortal(
        <div
            className={cn(
                'fixed bottom-4 right-4 z-50',
                'animate-slideIn',
                isVisible ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-300'
            )}
        >
            <div
                className={cn(
                    'flex items-start gap-3 max-w-sm p-4 rounded-lg shadow-lg',
                    toastColors[type]
                )}
            >
                <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="flex-shrink-0 ml-4"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>,
        document.body
    );
}

// Toast Context for global toast management
export const ToastContext = React.createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};