"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnnotationLayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const make_cancellable_promise_1 = __importDefault(require("make-cancellable-promise"));
const clsx_1 = __importDefault(require("clsx"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const warning_1 = __importDefault(require("warning"));
const pdfjs = __importStar(require("pdfjs-dist"));
const useDocumentContext_js_1 = __importDefault(require("../shared/hooks/useDocumentContext.js"));
const usePageContext_js_1 = __importDefault(require("../shared/hooks/usePageContext.js"));
const useResolver_js_1 = __importDefault(require("../shared/hooks/useResolver.js"));
const utils_js_1 = require("../shared/utils.js");
function AnnotationLayer() {
    const documentContext = (0, useDocumentContext_js_1.default)();
    const pageContext = (0, usePageContext_js_1.default)();
    (0, tiny_invariant_1.default)(pageContext, 'Unable to find Page context.');
    const mergedProps = Object.assign(Object.assign({}, documentContext), pageContext);
    const { imageResourcesPath, linkService, onGetAnnotationsError: onGetAnnotationsErrorProps, onGetAnnotationsSuccess: onGetAnnotationsSuccessProps, onRenderAnnotationLayerError: onRenderAnnotationLayerErrorProps, onRenderAnnotationLayerSuccess: onRenderAnnotationLayerSuccessProps, page, pdf, renderForms, rotate, scale = 1, } = mergedProps;
    (0, tiny_invariant_1.default)(pdf, 'Attempted to load page annotations, but no document was specified. Wrap <Page /> in a <Document /> or pass explicit `pdf` prop.');
    (0, tiny_invariant_1.default)(page, 'Attempted to load page annotations, but no page was specified.');
    (0, tiny_invariant_1.default)(linkService, 'Attempted to load page annotations, but no linkService was specified.');
    const [annotationsState, annotationsDispatch] = (0, useResolver_js_1.default)();
    const { value: annotations, error: annotationsError } = annotationsState;
    const layerElement = (0, react_1.useRef)(null);
    (0, warning_1.default)(Number.parseInt(window.getComputedStyle(document.body).getPropertyValue('--react-pdf-annotation-layer'), 10) === 1, 'AnnotationLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-annotations');
    function onLoadSuccess() {
        if (!annotations) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onGetAnnotationsSuccessProps) {
            onGetAnnotationsSuccessProps(annotations);
        }
    }
    function onLoadError() {
        if (!annotationsError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        (0, warning_1.default)(false, annotationsError.toString());
        if (onGetAnnotationsErrorProps) {
            onGetAnnotationsErrorProps(annotationsError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on page change
    (0, react_1.useEffect)(function resetAnnotations() {
        annotationsDispatch({ type: 'RESET' });
    }, [annotationsDispatch, page]);
    (0, react_1.useEffect)(function loadAnnotations() {
        if (!page) {
            return;
        }
        const cancellable = (0, make_cancellable_promise_1.default)(page.getAnnotations());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextAnnotations) => {
            annotationsDispatch({ type: 'RESOLVE', value: nextAnnotations });
        })
            .catch((error) => {
            annotationsDispatch({ type: 'REJECT', error });
        });
        return () => {
            (0, utils_js_1.cancelRunningTask)(runningTask);
        };
    }, [annotationsDispatch, page]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    (0, react_1.useEffect)(() => {
        if (annotations === undefined) {
            return;
        }
        if (annotations === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [annotations]);
    function onRenderSuccess() {
        if (onRenderAnnotationLayerSuccessProps) {
            onRenderAnnotationLayerSuccessProps();
        }
    }
    function onRenderError(error) {
        (0, warning_1.default)(false, `${error}`);
        if (onRenderAnnotationLayerErrorProps) {
            onRenderAnnotationLayerErrorProps(error);
        }
    }
    const viewport = (0, react_1.useMemo)(() => page.getViewport({ scale, rotation: rotate }), [page, rotate, scale]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    (0, react_1.useEffect)(function renderAnnotationLayer() {
        if (!pdf || !page || !linkService || !annotations) {
            return;
        }
        const { current: layer } = layerElement;
        if (!layer) {
            return;
        }
        const clonedViewport = viewport.clone({ dontFlip: true });
        const annotationLayerParameters = {
            accessibilityManager: null, // TODO: Implement this
            annotationCanvasMap: null, // TODO: Implement this
            annotationEditorUIManager: null, // TODO: Implement this
            div: layer,
            l10n: null, // TODO: Implement this
            page,
            structTreeLayer: null, // TODO: Implement this
            viewport: clonedViewport,
        };
        const renderParameters = {
            annotations,
            annotationStorage: pdf.annotationStorage,
            div: layer,
            imageResourcesPath,
            linkService,
            page,
            renderForms,
            viewport: clonedViewport,
        };
        layer.innerHTML = '';
        try {
            new pdfjs.AnnotationLayer(annotationLayerParameters).render(renderParameters);
            // Intentional immediate callback
            onRenderSuccess();
        }
        catch (error) {
            onRenderError(error);
        }
        return () => {
            // TODO: Cancel running task?
        };
    }, [annotations, imageResourcesPath, linkService, page, pdf, renderForms, viewport]);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('react-pdf__Page__annotations', 'annotationLayer'), ref: layerElement }));
}
