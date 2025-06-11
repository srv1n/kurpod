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
exports.default = Outline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const make_cancellable_promise_1 = __importDefault(require("make-cancellable-promise"));
const make_event_props_1 = __importDefault(require("make-event-props"));
const clsx_1 = __importDefault(require("clsx"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const warning_1 = __importDefault(require("warning"));
const OutlineContext_js_1 = __importDefault(require("./OutlineContext.js"));
const OutlineItem_js_1 = __importDefault(require("./OutlineItem.js"));
const utils_js_1 = require("./shared/utils.js");
const useDocumentContext_js_1 = __importDefault(require("./shared/hooks/useDocumentContext.js"));
const useResolver_js_1 = __importDefault(require("./shared/hooks/useResolver.js"));
/**
 * Displays an outline (table of contents).
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function.
 */
function Outline(props) {
    const documentContext = (0, useDocumentContext_js_1.default)();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { className, inputRef, onItemClick, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, pdf } = mergedProps, otherProps = __rest(mergedProps, ["className", "inputRef", "onItemClick", "onLoadError", "onLoadSuccess", "pdf"]);
    (0, tiny_invariant_1.default)(pdf, 'Attempted to load an outline, but no document was specified. Wrap <Outline /> in a <Document /> or pass explicit `pdf` prop.');
    const [outlineState, outlineDispatch] = (0, useResolver_js_1.default)();
    const { value: outline, error: outlineError } = outlineState;
    /**
     * Called when an outline is read successfully
     */
    function onLoadSuccess() {
        if (typeof outline === 'undefined' || outline === false) {
            return;
        }
        if (onLoadSuccessProps) {
            onLoadSuccessProps(outline);
        }
    }
    /**
     * Called when an outline failed to read successfully
     */
    function onLoadError() {
        if (!outlineError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        (0, warning_1.default)(false, outlineError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(outlineError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on pdf change
    (0, react_1.useEffect)(function resetOutline() {
        outlineDispatch({ type: 'RESET' });
    }, [outlineDispatch, pdf]);
    (0, react_1.useEffect)(function loadOutline() {
        if (!pdf) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        const cancellable = (0, make_cancellable_promise_1.default)(pdf.getOutline());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextOutline) => {
            outlineDispatch({ type: 'RESOLVE', value: nextOutline });
        })
            .catch((error) => {
            outlineDispatch({ type: 'REJECT', error });
        });
        return () => (0, utils_js_1.cancelRunningTask)(runningTask);
    }, [outlineDispatch, pdf]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    (0, react_1.useEffect)(() => {
        if (outline === undefined) {
            return;
        }
        if (outline === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [outline]);
    const childContext = (0, react_1.useMemo)(() => ({
        onItemClick,
    }), [onItemClick]);
    const eventProps = (0, react_1.useMemo)(() => (0, make_event_props_1.default)(otherProps, () => outline), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps, outline]);
    if (!outline) {
        return null;
    }
    function renderOutline() {
        if (!outline) {
            return null;
        }
        return ((0, jsx_runtime_1.jsx)("ul", { children: outline.map((item, itemIndex) => ((0, jsx_runtime_1.jsx)(OutlineItem_js_1.default, { item: item, pdf: pdf }, typeof item.dest === 'string' ? item.dest : itemIndex))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, clsx_1.default)('react-pdf__Outline', className), ref: inputRef }, eventProps, { children: (0, jsx_runtime_1.jsx)(OutlineContext_js_1.default.Provider, { value: childContext, children: renderOutline() }) })));
}
