"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalFileSystem = exports.isBrowser = void 0;
exports.isDefined = isDefined;
exports.isProvided = isProvided;
exports.isString = isString;
exports.isArrayBuffer = isArrayBuffer;
exports.isBlob = isBlob;
exports.isDataURI = isDataURI;
exports.dataURItoByteString = dataURItoByteString;
exports.getDevicePixelRatio = getDevicePixelRatio;
exports.displayCORSWarning = displayCORSWarning;
exports.displayWorkerWarning = displayWorkerWarning;
exports.cancelRunningTask = cancelRunningTask;
exports.makePageCallback = makePageCallback;
exports.isCancelException = isCancelException;
exports.loadFromFile = loadFromFile;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const warning_1 = __importDefault(require("warning"));
/**
 * Checks if we're running in a browser environment.
 */
exports.isBrowser = typeof window !== 'undefined';
/**
 * Checks whether we're running from a local file system.
 */
exports.isLocalFileSystem = exports.isBrowser && window.location.protocol === 'file:';
/**
 * Checks whether a variable is defined.
 *
 * @param {*} variable Variable to check
 */
function isDefined(variable) {
    return typeof variable !== 'undefined';
}
/**
 * Checks whether a variable is defined and not null.
 *
 * @param {*} variable Variable to check
 */
function isProvided(variable) {
    return isDefined(variable) && variable !== null;
}
/**
 * Checks whether a variable provided is a string.
 *
 * @param {*} variable Variable to check
 */
function isString(variable) {
    return typeof variable === 'string';
}
/**
 * Checks whether a variable provided is an ArrayBuffer.
 *
 * @param {*} variable Variable to check
 */
function isArrayBuffer(variable) {
    return variable instanceof ArrayBuffer;
}
/**
 * Checks whether a variable provided is a Blob.
 *
 * @param {*} variable Variable to check
 */
function isBlob(variable) {
    (0, tiny_invariant_1.default)(exports.isBrowser, 'isBlob can only be used in a browser environment');
    return variable instanceof Blob;
}
/**
 * Checks whether a variable provided is a data URI.
 *
 * @param {*} variable String to check
 */
function isDataURI(variable) {
    return isString(variable) && /^data:/.test(variable);
}
function dataURItoByteString(dataURI) {
    (0, tiny_invariant_1.default)(isDataURI(dataURI), 'Invalid data URI.');
    const [headersString = '', dataString = ''] = dataURI.split(',');
    const headers = headersString.split(';');
    if (headers.indexOf('base64') !== -1) {
        return atob(dataString);
    }
    return unescape(dataString);
}
function getDevicePixelRatio() {
    return (exports.isBrowser && window.devicePixelRatio) || 1;
}
const allowFileAccessFromFilesTip = 'On Chromium based browsers, you can use --allow-file-access-from-files flag for debugging purposes.';
function displayCORSWarning() {
    (0, warning_1.default)(!exports.isLocalFileSystem, `Loading PDF as base64 strings/URLs may not work on protocols other than HTTP/HTTPS. ${allowFileAccessFromFilesTip}`);
}
function displayWorkerWarning() {
    (0, warning_1.default)(!exports.isLocalFileSystem, `Loading PDF.js worker may not work on protocols other than HTTP/HTTPS. ${allowFileAccessFromFilesTip}`);
}
function cancelRunningTask(runningTask) {
    if (runningTask === null || runningTask === void 0 ? void 0 : runningTask.cancel)
        runningTask.cancel();
}
function makePageCallback(page, scale) {
    Object.defineProperty(page, 'width', {
        get() {
            return this.view[2] * scale;
        },
        configurable: true,
    });
    Object.defineProperty(page, 'height', {
        get() {
            return this.view[3] * scale;
        },
        configurable: true,
    });
    Object.defineProperty(page, 'originalWidth', {
        get() {
            return this.view[2];
        },
        configurable: true,
    });
    Object.defineProperty(page, 'originalHeight', {
        get() {
            return this.view[3];
        },
        configurable: true,
    });
    return page;
}
function isCancelException(error) {
    return error.name === 'RenderingCancelledException';
}
function loadFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (!reader.result) {
                return reject(new Error('Error while reading a file.'));
            }
            resolve(reader.result);
        };
        reader.onerror = (event) => {
            if (!event.target) {
                return reject(new Error('Error while reading a file.'));
            }
            const { error } = event.target;
            if (!error) {
                return reject(new Error('Error while reading a file.'));
            }
            switch (error.code) {
                case error.NOT_FOUND_ERR:
                    return reject(new Error('Error while reading a file: File not found.'));
                case error.SECURITY_ERR:
                    return reject(new Error('Error while reading a file: Security error.'));
                case error.ABORT_ERR:
                    return reject(new Error('Error while reading a file: Aborted.'));
                default:
                    return reject(new Error('Error while reading a file.'));
            }
        };
        reader.readAsArrayBuffer(file);
    });
}
