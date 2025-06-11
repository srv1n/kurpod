'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import makeEventProps from 'make-event-props';
import makeCancellable from 'make-cancellable-promise';
import clsx from 'clsx';
import invariant from 'tiny-invariant';
import warning from 'warning';
import { dequal } from 'dequal';
import * as pdfjs from 'pdfjs-dist';
import DocumentContext from './DocumentContext.js';
import Message from './Message.js';
import LinkService from './LinkService.js';
import PasswordResponses from './PasswordResponses.js';
import { cancelRunningTask, dataURItoByteString, displayCORSWarning, isArrayBuffer, isBlob, isBrowser, isDataURI, loadFromFile, } from './shared/utils.js';
import useResolver from './shared/hooks/useResolver.js';
const { PDFDataRangeTransport } = pdfjs;
const defaultOnPassword = (callback, reason) => {
    switch (reason) {
        case PasswordResponses.NEED_PASSWORD: {
            const password = prompt('Enter the password to open this PDF file.');
            callback(password);
            break;
        }
        case PasswordResponses.INCORRECT_PASSWORD: {
            const password = prompt('Invalid password. Please try again.');
            callback(password);
            break;
        }
        default:
    }
};
function isParameterObject(file) {
    return (typeof file === 'object' &&
        file !== null &&
        ('data' in file || 'range' in file || 'url' in file));
}
/**
 * Loads a document passed using `file` prop.
 */
const Document = forwardRef(function Document(_a, ref) {
    var { children, className, error = 'Failed to load PDF file.', externalLinkRel, externalLinkTarget, file, inputRef, imageResourcesPath, loading = 'Loading PDF…', noData = 'No PDF file specified.', onItemClick, onLoadError: onLoadErrorProps, onLoadProgress, onLoadSuccess: onLoadSuccessProps, onPassword = defaultOnPassword, onSourceError: onSourceErrorProps, onSourceSuccess: onSourceSuccessProps, options, renderMode, rotate } = _a, otherProps = __rest(_a, ["children", "className", "error", "externalLinkRel", "externalLinkTarget", "file", "inputRef", "imageResourcesPath", "loading", "noData", "onItemClick", "onLoadError", "onLoadProgress", "onLoadSuccess", "onPassword", "onSourceError", "onSourceSuccess", "options", "renderMode", "rotate"]);
    const [sourceState, sourceDispatch] = useResolver();
    const { value: source, error: sourceError } = sourceState;
    const [pdfState, pdfDispatch] = useResolver();
    const { value: pdf, error: pdfError } = pdfState;
    const linkService = useRef(new LinkService());
    const pages = useRef([]);
    const prevFile = useRef(undefined);
    const prevOptions = useRef(undefined);
    if (file && file !== prevFile.current && isParameterObject(file)) {
        warning(!dequal(file, prevFile.current), `File prop passed to <Document /> changed, but it's equal to previous one. This might result in unnecessary reloads. Consider memoizing the value passed to "file" prop.`);
        prevFile.current = file;
    }
    // Detect non-memoized changes in options prop
    if (options && options !== prevOptions.current) {
        warning(!dequal(options, prevOptions.current), `Options prop passed to <Document /> changed, but it's equal to previous one. This might result in unnecessary reloads. Consider memoizing the value passed to "options" prop.`);
        prevOptions.current = options;
    }
    const viewer = useRef({
        // Handling jumping to internal links target
        scrollPageIntoView: (args) => {
            const { dest, pageNumber, pageIndex = pageNumber - 1 } = args;
            // First, check if custom handling of onItemClick was provided
            if (onItemClick) {
                onItemClick({ dest, pageIndex, pageNumber });
                return;
            }
            // If not, try to look for target page within the <Document>.
            const page = pages.current[pageIndex];
            if (page) {
                // Scroll to the page automatically
                page.scrollIntoView();
                return;
            }
            warning(false, `An internal link leading to page ${pageNumber} was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>.`);
        },
    });
    useImperativeHandle(ref, () => ({
        linkService,
        pages,
        viewer,
    }), []);
    /**
     * Called when a document source is resolved correctly
     */
    function onSourceSuccess() {
        if (onSourceSuccessProps) {
            onSourceSuccessProps();
        }
    }
    /**
     * Called when a document source failed to be resolved correctly
     */
    function onSourceError() {
        if (!sourceError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning(false, sourceError.toString());
        if (onSourceErrorProps) {
            onSourceErrorProps(sourceError);
        }
    }
    function resetSource() {
        sourceDispatch({ type: 'RESET' });
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: See https://github.com/biomejs/biome/issues/3080
    useEffect(resetSource, [file, sourceDispatch]);
    const findDocumentSource = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            return null;
        }
        // File is a string
        if (typeof file === 'string') {
            if (isDataURI(file)) {
                const fileByteString = dataURItoByteString(file);
                return { data: fileByteString };
            }
            displayCORSWarning();
            return { url: file };
        }
        // File is PDFDataRangeTransport
        if (file instanceof PDFDataRangeTransport) {
            return { range: file };
        }
        // File is an ArrayBuffer
        if (isArrayBuffer(file)) {
            return { data: file };
        }
        /**
         * The cases below are browser-only.
         * If you're running on a non-browser environment, these cases will be of no use.
         */
        if (isBrowser) {
            // File is a Blob
            if (isBlob(file)) {
                const data = yield loadFromFile(file);
                return { data };
            }
        }
        // At this point, file must be an object
        invariant(typeof file === 'object', 'Invalid parameter in file, need either Uint8Array, string or a parameter object');
        invariant(isParameterObject(file), 'Invalid parameter object: need either .data, .range or .url');
        // File .url is a string
        if ('url' in file && typeof file.url === 'string') {
            if (isDataURI(file.url)) {
                const { url } = file, otherParams = __rest(file, ["url"]);
                const fileByteString = dataURItoByteString(url);
                return Object.assign({ data: fileByteString }, otherParams);
            }
            displayCORSWarning();
        }
        return file;
    }), [file]);
    useEffect(() => {
        const cancellable = makeCancellable(findDocumentSource());
        cancellable.promise
            .then((nextSource) => {
            sourceDispatch({ type: 'RESOLVE', value: nextSource });
        })
            .catch((error) => {
            sourceDispatch({ type: 'REJECT', error });
        });
        return () => {
            cancelRunningTask(cancellable);
        };
    }, [findDocumentSource, sourceDispatch]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    useEffect(() => {
        if (typeof source === 'undefined') {
            return;
        }
        if (source === false) {
            onSourceError();
            return;
        }
        onSourceSuccess();
    }, [source]);
    /**
     * Called when a document is read successfully
     */
    function onLoadSuccess() {
        if (!pdf) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onLoadSuccessProps) {
            onLoadSuccessProps(pdf);
        }
        pages.current = new Array(pdf.numPages);
        linkService.current.setDocument(pdf);
    }
    /**
     * Called when a document failed to read successfully
     */
    function onLoadError() {
        if (!pdfError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning(false, pdfError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(pdfError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on source change
    useEffect(function resetDocument() {
        pdfDispatch({ type: 'RESET' });
    }, [pdfDispatch, source]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    useEffect(function loadDocument() {
        if (!source) {
            return;
        }
        const documentInitParams = options
            ? Object.assign(Object.assign({}, source), options) : source;
        const destroyable = pdfjs.getDocument(documentInitParams);
        if (onLoadProgress) {
            destroyable.onProgress = onLoadProgress;
        }
        if (onPassword) {
            destroyable.onPassword = onPassword;
        }
        const loadingTask = destroyable;
        const loadingPromise = loadingTask.promise
            .then((nextPdf) => {
            pdfDispatch({ type: 'RESOLVE', value: nextPdf });
        })
            .catch((error) => {
            if (loadingTask.destroyed) {
                return;
            }
            pdfDispatch({ type: 'REJECT', error });
        });
        return () => {
            loadingPromise.finally(() => loadingTask.destroy());
        };
    }, [options, pdfDispatch, source]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    useEffect(() => {
        if (typeof pdf === 'undefined') {
            return;
        }
        if (pdf === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [pdf]);
    useEffect(function setupLinkService() {
        linkService.current.setViewer(viewer.current);
        linkService.current.setExternalLinkRel(externalLinkRel);
        linkService.current.setExternalLinkTarget(externalLinkTarget);
    }, [externalLinkRel, externalLinkTarget]);
    const registerPage = useCallback((pageIndex, ref) => {
        pages.current[pageIndex] = ref;
    }, []);
    const unregisterPage = useCallback((pageIndex) => {
        delete pages.current[pageIndex];
    }, []);
    const childContext = useMemo(() => ({
        imageResourcesPath,
        linkService: linkService.current,
        onItemClick,
        pdf,
        registerPage,
        renderMode,
        rotate,
        unregisterPage,
    }), [imageResourcesPath, onItemClick, pdf, registerPage, renderMode, rotate, unregisterPage]);
    const eventProps = useMemo(() => makeEventProps(otherProps, () => pdf), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps, pdf]);
    function renderChildren() {
        return _jsx(DocumentContext.Provider, { value: childContext, children: children });
    }
    function renderContent() {
        if (!file) {
            return _jsx(Message, { type: "no-data", children: typeof noData === 'function' ? noData() : noData });
        }
        if (pdf === undefined || pdf === null) {
            return (_jsx(Message, { type: "loading", children: typeof loading === 'function' ? loading() : loading }));
        }
        if (pdf === false) {
            return _jsx(Message, { type: "error", children: typeof error === 'function' ? error() : error });
        }
        return renderChildren();
    }
    return (_jsx("div", Object.assign({ className: clsx('react-pdf__Document', className), 
        // Assertion is needed for React 18 compatibility
        ref: inputRef, style: {
            ['--scale-factor']: '1',
        } }, eventProps, { children: renderContent() })));
});
export default Document;
