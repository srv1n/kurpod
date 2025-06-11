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
import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import invariant from 'tiny-invariant';
import Page from './Page.js';
import { isProvided } from './shared/utils.js';
import useDocumentContext from './shared/hooks/useDocumentContext.js';
/**
 * Displays a thumbnail of a page. Does not render the annotation layer or the text layer. Does not register itself as a link target, so the user will not be scrolled to a Thumbnail component when clicked on an internal link (e.g. in Table of Contents). When clicked, attempts to navigate to the page clicked (similarly to a link in Outline).
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function.
 */
export default function Thumbnail(props) {
    const documentContext = useDocumentContext();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { className, linkService, onItemClick, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf, } = mergedProps;
    invariant(pdf, 'Attempted to load a thumbnail, but no document was specified. Wrap <Thumbnail /> in a <Document /> or pass explicit `pdf` prop.');
    const pageIndex = isProvided(pageNumberProps) ? pageNumberProps - 1 : (pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null);
    const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : (isProvided(pageIndexProps) ? pageIndexProps + 1 : null);
    function onClick(event) {
        event.preventDefault();
        if (!isProvided(pageIndex) || !pageNumber) {
            return;
        }
        invariant(onItemClick || linkService, 'Either onItemClick callback or linkService must be defined in order to navigate to an outline item.');
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
    return (_jsx("a", { className: clsx('react-pdf__Thumbnail', className), href: pageNumber ? '#' : undefined, onClick: onClick, children: _jsx(Page, Object.assign({}, pageProps, { _className: "react-pdf__Thumbnail__page", _enableRegisterUnregisterPage: false, renderAnnotationLayer: false, renderTextLayer: false })) }));
}
