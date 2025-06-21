import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function CreateBlobModal({ isOpen, onClose, onSuccess }) {
    const [blobName, setBlobName] = useState('');
    const [passwordS, setPasswordS] = useState('');
    const [passwordH, setPasswordH] = useState('');
    const [useHiddenVolume, setUseHiddenVolume] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!blobName.trim()) {
            toast.error('Please enter a blob name');
            return;
        }

        if (!passwordS.trim()) {
            toast.error('Please enter a password');
            return;
        }

        if (useHiddenVolume && !passwordH.trim()) {
            toast.error('Please enter a hidden volume password');
            return;
        }

        if (useHiddenVolume && passwordS === passwordH) {
            toast.error('Standard and hidden passwords must be different');
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
                toast.success('Blob created successfully!');
                onSuccess(blobName.trim(), data.data.token);
                handleClose();
            } else {
                toast.error(data.message || 'Failed to create blob');
            }
        } catch (error) {
            console.error('Create blob error:', error);
            toast.error('Network error. Please try again.');
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
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <img 
                            src="/favicon-32x32.png" 
                            alt="KURPOD" 
                            className="w-6 h-6"
                        />
                        <DialogTitle>Create New Blob</DialogTitle>
                    </div>
                    <DialogDescription>
                        Create a new encrypted blob file for storing your data securely.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Blob Name */}
                    <div className="space-y-2">
                        <Label htmlFor="blobName">Blob File Name</Label>
                        <Input
                            id="blobName"
                            type="text"
                            value={blobName}
                            onChange={(e) => setBlobName(e.target.value)}
                            placeholder="e.g., my-storage.blob, documents.dat, photos.pdf"
                            disabled={loading}
                        />
                        <p className="text-xs text-muted-foreground">
                            You can use any file extension to disguise the blob file
                        </p>
                    </div>

                    {/* Standard Password */}
                    <div className="space-y-2">
                        <Label htmlFor="passwordS">Standard Volume Password</Label>
                        <Input
                            id="passwordS"
                            type="password"
                            value={passwordS}
                            onChange={(e) => setPasswordS(e.target.value)}
                            placeholder="Enter password for standard volume"
                            disabled={loading}
                        />
                    </div>

                    {/* Hidden Volume Option */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="useHiddenVolume"
                            checked={useHiddenVolume}
                            onCheckedChange={setUseHiddenVolume}
                            disabled={loading}
                        />
                        <Label 
                            htmlFor="useHiddenVolume" 
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Create hidden volume for plausible deniability
                        </Label>
                    </div>

                    {/* Hidden Password */}
                    {useHiddenVolume && (
                        <div className="space-y-2">
                            <Label htmlFor="passwordH">Hidden Volume Password</Label>
                            <Input
                                id="passwordH"
                                type="password"
                                value={passwordH}
                                onChange={(e) => setPasswordH(e.target.value)}
                                placeholder="Enter password for hidden volume"
                                disabled={loading}
                            />
                            <p className="text-xs text-muted-foreground">
                                Must be different from standard password
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Blob'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}