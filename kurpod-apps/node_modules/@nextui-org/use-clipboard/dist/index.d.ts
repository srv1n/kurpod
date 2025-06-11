interface UseClipboardProps {
    /**
     * The time in milliseconds to wait before resetting the clipboard.
     * @default 2000
     */
    timeout?: number;
}
/**
 * Copies the given text to the clipboard.
 * @param {number} timeout - timeout in ms, default 2000
 * @returns {copy, copied, error, reset} - copy function, copied state, error state, reset function
 */
declare function useClipboard({ timeout }?: UseClipboardProps): {
    copy: (valueToCopy: any) => void;
    reset: () => void;
    error: Error | null;
    copied: boolean;
};
type UseClipboardReturn = ReturnType<typeof useClipboard>;

export { UseClipboardProps, UseClipboardReturn, useClipboard };
