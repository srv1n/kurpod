import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, session } = useAuth();

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-50 bg-black/50" aria-hidden="true" />
                
                <Dialog.Panel className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <Dialog.Title className="text-lg font-semibold">
                            Menu
                        </Dialog.Title>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-200"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Theme
                                </span>
                                <ThemeToggle />
                            </div>

                            {session && (
                                <div className="py-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Volume: {session.volume_type}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        Session expires: {new Date(session.token.expires_at * 1000).toLocaleTimeString()}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}