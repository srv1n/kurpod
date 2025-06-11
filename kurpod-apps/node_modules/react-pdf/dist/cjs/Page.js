"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const make_cancellable_promise_1 = __importDefault(require("make-cancellable-promise"));
const make_event_props_1 = __importDefault(require("make-event-props"));
const clsx_1 = __importDefault(require("clsx"));
const merge_refs_1 = __importDefault(require("merge-refs"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const warning_1 = __importDefault(require("warning"));
const PageContext_js_1 = __importDefault(require("./PageContext.js"));
const Message_js_1 = __importDefault(require("./Message.js"));
const Canvas_js_1 = __importDefault(require("./Page/Canvas.js"));
const TextLayer_js_1 = __importDefault(require("./Page/TextLayer.js"));
const AnnotationLayer_js_1 = __importDefault(require("./Page/AnnotationLayer.js"));
const utils_js_1 = require("./shared/utils.js");
const useDocumentContext_js_1 = __importDefault(require("./shared/hooks/useDocumentContext.js"));
const useResolver_js_1 = __importDefault(require("./shared/hooks/useResolver.js"));
const defaultScale = 1;
/**
 * Displays a page.
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function, however some advanced functions like linking between pages inside a document may not be working correctly.
 */
function Page(props) {
    const documentContext = (0, useDocumentContext_js_1.default)();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { _className = 'react-pdf__Page', _enableRegisterUnregisterPage = true, canvasBackground, canvasRef, children, className, customRenderer: CustomRenderer, customTextRenderer, devicePixelRatio, error = 'Failed to load the page.', height, inputRef, loading = 'Loading page…', noData = 'No page specified.', onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps, onGetTextError: onGetTextErrorProps, onGetTextSuccess: onGetTextSuccessProps, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, onRenderError: onRenderErrorProps, onRenderSuccess: onRenderSuccessProps, onRenderTextLayerError: onRenderTextLayerErrorProps, onRenderTextLayerSuccess: onRenderTextLayerSuccessProps, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf, registerPage, renderAnnotationLayer: renderAnnotationLayerProps = true, renderForms = false, renderMode = 'canvas', renderTextLayer: renderTextLayerProps = true, rotate: rotateProps, scale: scaleProps = defaultScale, unregisterPage, width } = mergedProps, otherProps = __rest(mergedProps, ["_className", "_enableRegisterUnregisterPage", "canvasBackground", "canvasRef", "children", "className", "customRenderer", "customTextRenderer", "devicePixelRatio", "error", "height", "inputRef", "loading", "noData", "onGetAnnotationsError", "onGetAnnotationsSuccess", "onGetStructTreeError", "onGetStructTreeSuccess", "onGetTextError", "onGetTextSuccess", "onLoadError", "onLoadSuccess", "onRenderAnnotationLayerError", "onRenderAnnotationLayerSuccess", "onRenderError", "onRenderSuccess", "onRenderTextLayerError", "onRenderTextLayerSuccess", "pageIndex", "pageNumber", "pdf", "registerPage", "renderAnnotationLayer", "renderForms", "renderMode", "renderTextLayer", "rotate", "scale", "unregisterPage", "width"]);
    const [pageState, pageDispatch] = (0, useResolver_js_1.default)();
    const { value: page, error: pageError } = pageState;
    const pageElement = (0, react_1.useRef)(null);
    (0, tiny_invariant_1.default)(pdf, 'Attempted to load a page, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.');
    const pageIndex = (0, utils_js_1.isProvided)(pageNumberProps) ? pageNumberProps - 1 : (pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null);
    const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : ((0, utils_js_1.isProvided)(pageIndexProps) ? pageIndexProps + 1 : null);
    const rotate = rotateProps !== null && rotateProps !== void 0 ? rotateProps : (page ? page.rotate : null);
    const scale = (0, react_1.useMemo)(() => {
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
    (0, react_1.useEffect)(function hook() {
        return () => {
            if (!(0, utils_js_1.isProvided)(pageIndex)) {
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
            onLoadSuccessProps((0, utils_js_1.makePageCallback)(page, scale));
        }
        if (_enableRegisterUnregisterPage && registerPage) {
            if (!(0, utils_js_1.isProvided)(pageIndex) || !pageElement.current) {
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
        (0, warning_1.default)(false, pageError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(pageError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on pdf and pageIndex change
    (0, react_1.useEffect)(function resetPage() {
        pageDispatch({ type: 'RESET' });
    }, [pageDispatch, pdf, pageIndex]);
    (0, react_1.useEffect)(function loadPage() {
        if (!pdf || !pageNumber) {
            return;
        }
        const cancellable = (0, make_cancellable_promise_1.default)(pdf.getPage(pageNumber));
        const runningTask = cancellable;
        cancellable.promise
            .then((nextPage) => {
            pageDispatch({ type: 'RESOLVE', value: nextPage });
        })
            .catch((error) => {
            pageDispatch({ type: 'REJECT', error });
        });
        return () => (0, utils_js_1.cancelRunningTask)(runningTask);
    }, [pageDispatch, pdf, pageNumber]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    (0, react_1.useEffect)(() => {
        if (page === undefined) {
            return;
        }
        if (page === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [page, scale]);
    const childContext = (0, react_1.useMemo)(() => 
    // Technically there cannot be page without pageIndex, pageNumber, rotate and scale, but TypeScript doesn't know that
    page && (0, utils_js_1.isProvided)(pageIndex) && pageNumber && (0, utils_js_1.isProvided)(rotate) && (0, utils_js_1.isProvided)(scale)
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
    const eventProps = (0, react_1.useMemo)(() => (0, make_event_props_1.default)(otherProps, () => page ? (scale ? (0, utils_js_1.makePageCallback)(page, scale) : undefined) : page), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps, page, scale]);
    const pageKey = `${pageIndex}@${scale}/${rotate}`;
    function renderMainLayer() {
        switch (renderMode) {
            case 'custom': {
                (0, tiny_invariant_1.default)(CustomRenderer, `renderMode was set to "custom", but no customRenderer was passed.`);
                return (0, jsx_runtime_1.jsx)(CustomRenderer, {}, `${pageKey}_custom`);
            }
            case 'none':
                return null;
            case 'canvas':
            default:
                return (0, jsx_runtime_1.jsx)(Canvas_js_1.default, { canvasRef: canvasRef }, `${pageKey}_canvas`);
        }
    }
    function renderTextLayer() {
        if (!renderTextLayerProps) {
            return null;
        }
        return (0, jsx_runtime_1.jsx)(TextLayer_js_1.default, {}, `${pageKey}_text`);
    }
    function renderAnnotationLayer() {
        if (!renderAnnotationLayerProps) {
            return null;
        }
        return (0, jsx_runtime_1.jsx)(AnnotationLayer_js_1.default, {}, `${pageKey}_annotations`);
    }
    function renderChildren() {
        return ((0, jsx_runtime_1.jsxs)(PageContext_js_1.default.Provider, { value: childContext, children: [renderMainLayer(), renderTextLayer(), renderAnnotationLayer(), children] }));
    }
    function renderContent() {
        if (!pageNumber) {
            return (0, jsx_runtime_1.jsx)(Message_js_1.default, { type: "no-data", children: typeof noData === 'function' ? noData() : noData });
        }
        if (pdf === null || page === undefined || page === null) {
            return ((0, jsx_runtime_1.jsx)(Message_js_1.default, { type: "loading", children: typeof loading === 'function' ? loading() : loading }));
        }
        if (pdf === false || page === false) {
            return (0, jsx_runtime_1.jsx)(Message_js_1.default, { type: "error", children: typeof error === 'function' ? error() : error });
        }
        return renderChildren();
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, clsx_1.default)(_className, className), "data-page-number": pageNumber, 
        // Assertion is needed for React 18 compatibility
        ref: (0, merge_refs_1.default)(inputRef, pageElement), style: {
            ['--scale-factor']: `${scale}`,
            backgroundColor: canvasBackground || 'white',
            position: 'relative',
            minWidth: 'min-content',
            minHeight: 'min-content',
        } }, eventProps, { children: renderContent() })));
}
