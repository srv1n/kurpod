'use client';
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef } from 'react';
import makeCancellable from 'make-cancellable-promise';
import makeEventProps from 'make-event-props';
import clsx from 'clsx';
import mergeRefs from 'merge-refs';
import invariant from 'tiny-invariant';
import warning from 'warning';
import PageContext from './PageContext.js';
import Message from './Message.js';
import Canvas from './Page/Canvas.js';
import TextLayer from './Page/TextLayer.js';
import AnnotationLayer from './Page/AnnotationLayer.js';
import { cancelRunningTask, isProvided, makePageCallback } from './shared/utils.js';
import useDocumentContext from './shared/hooks/useDocumentContext.js';
import useResolver from './shared/hooks/useResolver.js';
const defaultScale = 1;
/**
 * Displays a page.
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function, however some advanced functions like linking between pages inside a document may not be working correctly.
 */
export default function Page(props) {
    const documentContext = useDocumentContext();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { _className = 'react-pdf__Page', _enableRegisterUnregisterPage = true, canvasBackground, canvasRef, children, className, customRenderer: CustomRenderer, customTextRenderer, devicePixelRatio, error = 'Failed to load the page.', height, inputRef, loading = 'Loading page…', noData = 'No page specified.', onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps, onGetTextError: onGetTextErrorProps, onGetTextSuccess: onGetTextSuccessProps, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, onRenderError: onRenderErrorProps, onRenderSuccess: onRenderSuccessProps, onRenderTextLayerError: onRenderTextLayerErrorProps, onRenderTextLayerSuccess: onRenderTextLayerSuccessProps, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf, registerPage, renderAnnotationLayer: renderAnnotationLayerProps = true, renderForms = false, renderMode = 'canvas', renderTextLayer: renderTextLayerProps = true, rotate: rotateProps, scale: scaleProps = defaultScale, unregisterPage, width } = mergedProps, otherProps = __rest(mergedProps, ["_className", "_enableRegisterUnregisterPage", "canvasBackground", "canvasRef", "children", "className", "customRenderer", "customTextRenderer", "devicePixelRatio", "error", "height", "inputRef", "loading", "noData", "onGetAnnotationsError", "onGetAnnotationsSuccess", "onGetStructTreeError", "onGetStructTreeSuccess", "onGetTextError", "onGetTextSuccess", "onLoadError", "onLoadSuccess", "onRenderAnnotationLayerError", "onRenderAnnotationLayerSuccess", "onRenderError", "onRenderSuccess", "onRenderTextLayerError", "onRenderTextLayerSuccess", "pageIndex", "pageNumber", "pdf", "registerPage", "renderAnnotationLayer", "renderForms", "renderMode", "renderTextLayer", "rotate", "scale", "unregisterPage", "width"]);
    const [pageState, pageDispatch] = useResolver();
    const { value: page, error: pageError } = pageState;
    const pageElement = useRef(null);
    invariant(pdf, 'Attempted to load a page, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.');
    const pageIndex = isProvided(pageNumberProps) ? pageNumberProps - 1 : (pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null);
    const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : (isProvided(pageIndexProps) ? pageIndexProps + 1 : null);
    const rotate = rotateProps !== null && rotateProps !== void 0 ? rotateProps : (page ? page.rotate : null);
    const scale = useMemo(() => {
        if (!page) {
            return null;
        }
        // Be default, we'll render page at 100% * scale width.
        let pageScale = 1;
        // Passing scale explicitly null would cause the page not to render
        const scaleWithDefault = scaleProps !== null && scaleProps !== void 0 ? scaleProps : defaultScale;
        // If width/height is defined, calculate the scale of the page so it could be of desired width.
        if (width || height) {
            const viewport = page.getViewport({ scale: 1, rotation: rotate });
            if (width) {
                pageScale = width / viewport.width;
            }
            else if (height) {
                pageScale = height / viewport.height;
            }
        }
        return scaleWithDefault * pageScale;
    }, [height, page, rotate, scaleProps, width]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on pdf change
    useEffect(function hook() {
        return () => {
            if (!isProvided(pageIndex)) {
                // Impossible, but TypeScript doesn't know that
                return;
            }
            if (_enableRegisterUnregisterPage && unregisterPage) {
                unregisterPage(pageIndex);
            }
        };
    }, [_enableRegisterUnregisterPage, pdf, pageIndex, unregisterPage]);
    /**
     * Called when a page is loaded successfully
     */
    function onLoadSuccess() {
        if (onLoadSuccessProps) {
            if (!page || !scale) {
                // Impossible, but TypeScript doesn't know that
                return;
            }
            onLoadSuccessProps(makePageCallback(page, scale));
        }
        if (_enableRegisterUnregisterPage && registerPage) {
            if (!isProvided(pageIndex) || !pageElement.current) {
                // Impossible, but TypeScript doesn't know that
                return;
            }
            registerPage(pageIndex, pageElement.current);
        }
    }
    /**
     * Called when a page failed to load
     */
    function onLoadError() {
        if (!pageError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning(false, pageError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(pageError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on pdf and pageIndex change
    useEffect(function resetPage() {
        pageDispatch({ type: 'RESET' });
    }, [pageDispatch, pdf, pageIndex]);
    useEffect(function loadPage() {
        if (!pdf || !pageNumber) {
            return;
        }
        const cancellable = makeCancellable(pdf.getPage(pageNumber));
        const runningTask = cancellable;
        cancellable.promise
            .then((nextPage) => {
            pageDispatch({ type: 'RESOLVE', value: nextPage });
        })
            .catch((error) => {
            pageDispatch({ type: 'REJECT', error });
        });
        return () => cancelRunningTask(runningTask);
    }, [pageDispatch, pdf, pageNumber]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    useEffect(() => {
        if (page === undefined) {
            return;
        }
        if (page === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [page, scale]);
    const childContext = useMemo(() => 
    // Technically there cannot be page without pageIndex, pageNumber, rotate and scale, but TypeScript doesn't know that
    page && isProvided(pageIndex) && pageNumber && isProvided(rotate) && isProvided(scale)
        ? {
            _className,
            canvasBackground,
            customTextRenderer,
            devicePixelRatio,
            onGetAnnotationsError: onGetAnnotationsErrorProps,
            onGetAnnotationsSuccess: onGetAnnotationsSuccessProps,
            onGetStructTreeError: onGetStructTreeErrorProps,
            onGetStructTreeSuccess: onGetStructTreeSuccessProps,
            onGetTextError: onGetTextErrorProps,
            onGetTextSuccess: onGetTextSuccessProps,
            onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps,
            onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps,
            onRenderError: onRenderErrorProps,
            onRenderSuccess: onRenderSuccessProps,
            onRenderTextLayerError: onRenderTextLayerErrorProps,
            onRenderTextLayerSuccess: onRenderTextLayerSuccessProps,
            page,
            pageIndex,
            pageNumber,
            renderForms,
            renderTextLayer: renderTextLayerProps,
            rotate,
            scale,
        }
        : null, [
        _className,
        canvasBackground,
        customTextRenderer,
        devicePixelRatio,
        onGetAnnotationsErrorProps,
        onGetAnnotationsSuccessProps,
        onGetStructTreeErrorProps,
        onGetStructTreeSuccessProps,
        onGetTextErrorProps,
        onGetTextSuccessProps,
        onRenderAnnotationLayerErrorProps,
        onRenderAnnotationLayerSuccessProps,
        onRenderErrorProps,
        onRenderSuccessProps,
        onRenderTextLayerErrorProps,
        onRenderTextLayerSuccessProps,
        page,
        pageIndex,
        pageNumber,
        renderForms,
        renderTextLayerProps,
        rotate,
        scale,
    ]);
    const eventProps = useMemo(() => makeEventProps(otherProps, () => page ? (scale ? makePageCallback(page, scale) : undefined) : page), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps, page, scale]);
    const pageKey = `${pageIndex}@${scale}/${rotate}`;
    function renderMainLayer() {
        switch (renderMode) {
            case 'custom': {
                invariant(CustomRenderer, `renderMode was set to "custom", but no customRenderer was passed.`);
                return _jsx(CustomRenderer, {}, `${pageKey}_custom`);
            }
            case 'none':
                return null;
            case 'canvas':
            default:
                return _jsx(Canvas, { canvasRef: canvasRef }, `${pageKey}_canvas`);
        }
    }
    function renderTextLayer() {
        if (!renderTextLayerProps) {
            return null;
        }
        return _jsx(TextLayer, {}, `${pageKey}_text`);
    }
    function renderAnnotationLayer() {
        if (!renderAnnotationLayerProps) {
            return null;
        }
        return _jsx(AnnotationLayer, {}, `${pageKey}_annotations`);
    }
    function renderChildren() {
        return (_jsxs(PageContext.Provider, { value: childContext, children: [renderMainLayer(), renderTextLayer(), renderAnnotationLayer(), children] }));
    }
    function renderContent() {
        if (!pageNumber) {
            return _jsx(Message, { type: "no-data", children: typeof noData === 'function' ? noData() : noData });
        }
        if (pdf === null || page === undefined || page === null) {
            return (_jsx(Message, { type: "loading", children: typeof loading === 'function' ? loading() : loading }));
        }
        if (pdf === false || page === false) {
            return _jsx(Message, { type: "error", children: typeof error === 'function' ? error() : error });
        }
        return renderChildren();
    }
    return (_jsx("div", Object.assign({ className: clsx(_className, className), "data-page-number": pageNumber, 
        // Assertion is needed for React 18 compatibility
        ref: mergeRefs(inputRef, pageElement), style: {
            ['--scale-factor']: `${scale}`,
            backgroundColor: canvasBackground || 'white',
            position: 'relative',
            minWidth: 'min-content',
            minHeight: 'min-content',
        } }, eventProps, { children: renderContent() })));
}
