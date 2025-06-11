import type { PDFPageProxy } from 'pdfjs-dist';
import type { PageCallback } from './types.js';
/**
 * Checks if we're running in a browser environment.
 */
export declare const isBrowser: boolean;
/**
 * Checks whether we're running from a local file system.
 */
export declare const isLocalFileSystem: boolean;
/**
 * Checks whether a variable is defined.
 *
 * @param {*} variable Variable to check
 */
export declare function isDefined<T>(variable: T | undefined): variable is T;
/**
 * Checks whether a variable is defined and not null.
 *
 * @param {*} variable Variable to check
 */
export declare function isProvided<T>(variable: T | null | undefined): variable is T;
/**
 * Checks whether a variable provided is a string.
 *
 * @param {*} variable Variable to check
 */
export declare function isString(variable: unknown): variable is string;
/**
 * Checks whether a variable provided is an ArrayBuffer.
 *
 * @param {*} variable Variable to check
 */
export declare function isArrayBuffer(variable: unknown): variable is ArrayBuffer;
/**
 * Checks whether a variable provided is a Blob.
 *
 * @param {*} variable Variable to check
 */
export declare function isBlob(variable: unknown): variable is Blob;
/**
 * Checks whether a variable provided is a data URI.
 *
 * @param {*} variable String to check
 */
export declare function isDataURI(variable: unknown): variable is `data:${string}`;
export declare function dataURItoByteString(dataURI: unknown): string;
export declare function getDevicePixelRatio(): number;
export declare function displayCORSWarning(): void;
export declare function displayWorkerWarning(): void;
export declare function cancelRunningTask(runningTask?: {
    cancel?: () => void;
} | null): void;
export declare function makePageCallback(page: PDFPageProxy, scale: number): PageCallback;
export declare function isCancelException(error: Error): boolean;
export declare function loadFromFile(file: Blob): Promise<ArrayBuffer>;
