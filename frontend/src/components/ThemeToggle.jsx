import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ThemeToggle({ variant = 'button' }) {
    const { theme, toggleTheme } = useTheme();

    if (variant === 'switch') {
        return (
            <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                    aria-label="Toggle theme"
                />
                <Moon className="h-4 w-4" />
            </div>
        );
    }

    if (variant === 'switch-labeled') {
        return (
            <div className="flex items-center justify-between">
                <Label htmlFor="theme-toggle" className="flex items-center gap-2">
                    {theme === 'light' ? (
                        <>
                            <Sun className="h-4 w-4" />
                            Light mode
                        </>
                    ) : (
                        <>
                            <Moon className="h-4 w-4" />
                            Dark mode
                        </>
                    )}
                </Label>
                <Switch
                    id="theme-toggle"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                />
            </div>
        );
    }

    // Default button variant
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Button>
    );
}