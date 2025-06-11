"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StructTree;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const make_cancellable_promise_1 = __importDefault(require("make-cancellable-promise"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const warning_1 = __importDefault(require("warning"));
const StructTreeItem_js_1 = __importDefault(require("./StructTreeItem.js"));
const usePageContext_js_1 = __importDefault(require("./shared/hooks/usePageContext.js"));
const useResolver_js_1 = __importDefault(require("./shared/hooks/useResolver.js"));
const utils_js_1 = require("./shared/utils.js");
function StructTree() {
    const pageContext = (0, usePageContext_js_1.default)();
    (0, tiny_invariant_1.default)(pageContext, 'Unable to find Page context.');
    const { onGetStructTreeError: onGetStructTreeErrorProps, onGetStructTreeSuccess: onGetStructTreeSuccessProps, } = pageContext;
    const [structTreeState, structTreeDispatch] = (0, useResolver_js_1.default)();
    const { value: structTree, error: structTreeError } = structTreeState;
    const { customTextRenderer, page } = pageContext;
    function onLoadSuccess() {
        if (!structTree) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        if (onGetStructTreeSuccessProps) {
            onGetStructTreeSuccessProps(structTree);
        }
    }
    function onLoadError() {
        if (!structTreeError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        (0, warning_1.default)(false, structTreeError.toString());
        if (onGetStructTreeErrorProps) {
            onGetStructTreeErrorProps(structTreeError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on page change
    (0, react_1.useEffect)(function resetStructTree() {
        structTreeDispatch({ type: 'RESET' });
    }, [structTreeDispatch, page]);
    (0, react_1.useEffect)(function loadStructTree() {
        if (customTextRenderer) {
            // TODO: Document why this is necessary
            return;
        }
        if (!page) {
            return;
        }
        const cancellable = (0, make_cancellable_promise_1.default)(page.getStructTree());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextStructTree) => {
            structTreeDispatch({ type: 'RESOLVE', value: nextStructTree });
        })
            .catch((error) => {
            structTreeDispatch({ type: 'REJECT', error });
        });
        return () => (0, utils_js_1.cancelRunningTask)(runningTask);
    }, [customTextRenderer, page, structTreeDispatch]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    (0, react_1.useEffect)(() => {
        if (structTree === undefined) {
            return;
        }
        if (structTree === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [structTree]);
    if (!structTree) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(StructTreeItem_js_1.default, { className: "react-pdf__Page__structTree structTree", node: structTree });
}
