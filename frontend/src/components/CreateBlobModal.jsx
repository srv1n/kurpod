import React, { useState, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Info } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';

export function CreateBlobModal({ isOpen, onClose, onSuccess }) {
    const [blobName, setBlobName] = useState('');
    const [passwordS, setPasswordS] = useState('');
    const [passwordH, setPasswordH] = useState('');
    const [useHiddenVolume, setUseHiddenVolume] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Advanced options state
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [useSteganography, setUseSteganography] = useState(false);
    const [carrierFile, setCarrierFile] = useState(null);
    const fileInputRef = useRef(null);

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

        if (useSteganography && !carrierFile) {
            toast.error('Please select a PNG image file for steganography');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                password_s: passwordS,
                password_h: useHiddenVolume ? passwordH : null,
                blob_name: blobName.trim(),
                steganographic: useSteganography,
            };

            // If using steganography, convert carrier file to base64
            if (useSteganography && carrierFile) {
                const reader = new FileReader();
                const carrierBase64 = await new Promise((resolve, reject) => {
                    reader.onload = () => {
                        // Remove data:image/png;base64, prefix
                        const base64 = reader.result.split(',')[1];
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(carrierFile);
                });
                payload.carrier_data = carrierBase64;
            }

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
        setShowAdvanced(false);
        setUseSteganography(false);
        setCarrierFile(null);
        setLoading(false);
        onClose();
    };

    const handleCarrierFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                toast.error('Carrier file must be smaller than 10MB');
                return;
            }
            setCarrierFile(file);
        }
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

                    <Separator />

                    {/* Advanced Options */}
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            disabled={loading}
                        >
                            {showAdvanced ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                            Advanced Options
                        </button>

                        {showAdvanced && (
                            <div className="space-y-4 border-l-2 border-muted pl-4">
                                {/* Steganography Option */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="useSteganography"
                                            checked={useSteganography}
                                            onCheckedChange={(checked) => {
                                                setUseSteganography(checked);
                                                if (!checked) {
                                                    setCarrierFile(null);
                                                }
                                            }}
                                            disabled={loading}
                                        />
                                        <Label htmlFor="useSteganography" className="text-sm">
                                            Use steganography (hide blob in image)
                                        </Label>
                                        <div className="group relative">
                                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                            <div className="absolute left-full ml-2 bottom-0 hidden group-hover:block z-50 w-64 p-2 bg-popover border rounded-md shadow-md text-xs">
                                                Creates a PNG image that looks normal but contains your encrypted data hidden inside. More secure against detection.
                                            </div>
                                        </div>
                                    </div>

                                    {useSteganography && (
                                        <div className="space-y-2">
                                            <Label htmlFor="carrierFile">Carrier Image (PNG)</Label>
                                            <div className="space-y-2">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleCarrierFileChange}
                                                    className="hidden"
                                                    disabled={loading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={loading}
                                                    className="w-full"
                                                >
                                                    {carrierFile ? `Selected: ${carrierFile.name}` : 'Choose Image File'}
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Select a PNG image to use as a carrier. The image will remain viewable while hiding your encrypted data.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

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