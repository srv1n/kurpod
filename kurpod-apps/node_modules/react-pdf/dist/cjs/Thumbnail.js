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
exports.default = Thumbnail;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const Page_js_1 = __importDefault(require("./Page.js"));
const utils_js_1 = require("./shared/utils.js");
const useDocumentContext_js_1 = __importDefault(require("./shared/hooks/useDocumentContext.js"));
/**
 * Displays a thumbnail of a page. Does not render the annotation layer or the text layer. Does not register itself as a link target, so the user will not be scrolled to a Thumbnail component when clicked on an internal link (e.g. in Table of Contents). When clicked, attempts to navigate to the page clicked (similarly to a link in Outline).
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function.
 */
function Thumbnail(props) {
    const documentContext = (0, useDocumentContext_js_1.default)();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { className, linkService, onItemClick, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf, } = mergedProps;
    (0, tiny_invariant_1.default)(pdf, 'Attempted to load a thumbnail, but no document was specified. Wrap <Thumbnail /> in a <Document /> or pass explicit `pdf` prop.');
    const pageIndex = (0, utils_js_1.isProvided)(pageNumberProps) ? pageNumberProps - 1 : (pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null);
    const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : ((0, utils_js_1.isProvided)(pageIndexProps) ? pageIndexProps + 1 : null);
    function onClick(event) {
        event.preventDefault();
        if (!(0, utils_js_1.isProvided)(pageIndex) || !pageNumber) {
            return;
        }
        (0, tiny_invariant_1.default)(onItemClick || linkService, 'Either onItemClick callback or linkService must be defined in order to navigate to an outline item.');
        if (onItemClick) {
            onItemClick({
                pageIndex,
                pageNumber,
            });
        }
        else if (linkService) {
            linkService.goToPage(pageNumber);
        }
    }
    const { className: classNameProps, onItemClick: onItemClickProps } = props, pageProps = __rest(props, ["className", "onItemClick"]);
    return ((0, jsx_runtime_1.jsx)("a", { className: (0, clsx_1.default)('react-pdf__Thumbnail', className), href: pageNumber ? '#' : undefined, onClick: onClick, children: (0, jsx_runtime_1.jsx)(Page_js_1.default, Object.assign({}, pageProps, { _className: "react-pdf__Thumbnail__page", _enableRegisterUnregisterPage: false, renderAnnotationLayer: false, renderTextLayer: false })) }));
}
