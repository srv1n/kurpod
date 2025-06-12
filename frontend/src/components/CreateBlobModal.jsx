import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useToast } from './Toast';

export function CreateBlobModal({ isOpen, onClose, onSuccess }) {
    const [blobName, setBlobName] = useState('');
    const [passwordS, setPasswordS] = useState('');
    const [passwordH, setPasswordH] = useState('');
    const [useHiddenVolume, setUseHiddenVolume] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!blobName.trim()) {
            showToast('Please enter a blob name', 'error');
            return;
        }

        if (!passwordS.trim()) {
            showToast('Please enter a password', 'error');
            return;
        }

        if (useHiddenVolume && !passwordH.trim()) {
            showToast('Please enter a hidden volume password', 'error');
            return;
        }

        if (useHiddenVolume && passwordS === passwordH) {
            showToast('Standard and hidden passwords must be different', 'error');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                password_s: passwordS,
                password_h: useHiddenVolume ? passwordH : null,
                blob_name: blobName.trim()
            };

            const response = await fetch('/api/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showToast('Blob created successfully!', 'success');
                onSuccess(blobName.trim(), data.data.token);
                handleClose();
            } else {
                showToast(data.message || 'Failed to create blob', 'error');
            }
        } catch (error) {
            console.error('Create blob error:', error);
            showToast('Network error. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setBlobName('');
        setPasswordS('');
        setPasswordH('');
        setUseHiddenVolume(false);
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/25" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/favicon-32x32.png" 
                                alt="KURPOD" 
                                className="w-6 h-6"
                            />
                            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Blob
                            </Dialog.Title>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Blob Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Blob File Name
                            </label>
                            <input
                                type="text"
                                value={blobName}
                                onChange={(e) => setBlobName(e.target.value)}
                                placeholder="e.g., my-storage.blob, documents.dat, photos.pdf"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                You can use any file extension to disguise the blob file
                            </p>
                        </div>

                        {/* Standard Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Standard Volume Password
                            </label>
                            <input
                                type="password"
                                value={passwordS}
                                onChange={(e) => setPasswordS(e.target.value)}
                                placeholder="Enter password for standard volume"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        {/* Hidden Volume Option */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="useHiddenVolume"
                                checked={useHiddenVolume}
                                onChange={(e) => setUseHiddenVolume(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                disabled={loading}
                            />
                            <label htmlFor="useHiddenVolume" className="text-sm text-gray-700 dark:text-gray-300">
                                Create hidden volume for plausible deniability
                            </label>
                        </div>

                        {/* Hidden Password */}
                        {useHiddenVolume && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Hidden Volume Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordH}
                                    onChange={(e) => setPasswordH(e.target.value)}
                                    placeholder="Enter password for hidden volume"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={loading}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Must be different from standard password
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                                         bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                                         rounded-lg disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                                         rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : 'Create Blob'}
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}