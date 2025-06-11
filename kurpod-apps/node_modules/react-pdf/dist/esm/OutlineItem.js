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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import invariant from 'tiny-invariant';
import Ref from './Ref.js';
import useCachedValue from './shared/hooks/useCachedValue.js';
import useDocumentContext from './shared/hooks/useDocumentContext.js';
import useOutlineContext from './shared/hooks/useOutlineContext.js';
export default function OutlineItem(props) {
    const documentContext = useDocumentContext();
    const outlineContext = useOutlineContext();
    invariant(outlineContext, 'Unable to find Outline context.');
    const mergedProps = Object.assign(Object.assign(Object.assign({}, documentContext), outlineContext), props);
    const { item, linkService, onItemClick, pdf } = mergedProps, otherProps = __rest(mergedProps, ["item", "linkService", "onItemClick", "pdf"]);
    invariant(pdf, 'Attempted to load an outline, but no document was specified. Wrap <Outline /> in a <Document /> or pass explicit `pdf` prop.');
    const getDestination = useCachedValue(() => {
        if (typeof item.dest === 'string') {
            return pdf.getDestination(item.dest);
        }
        return item.dest;
    });
    const getPageIndex = useCachedValue(() => __awaiter(this, void 0, void 0, function* () {
        const destination = yield getDestination();
        if (!destination) {
            throw new Error('Destination not found.');
        }
        const [ref] = destination;
        return pdf.getPageIndex(new Ref(ref));
    }));
    const getPageNumber = useCachedValue(() => __awaiter(this, void 0, void 0, function* () {
        const pageIndex = yield getPageIndex();
        return pageIndex + 1;
    }));
    function onClick(event) {
        event.preventDefault();
        invariant(onItemClick || linkService, 'Either onItemClick callback or linkService must be defined in order to navigate to an outline item.');
        if (onItemClick) {
            Promise.all([getDestination(), getPageIndex(), getPageNumber()]).then(([dest, pageIndex, pageNumber]) => {
                onItemClick({
                    dest,
                    pageIndex,
                    pageNumber,
                });
            });
        }
        else if (linkService) {
            linkService.goToDestination(item.dest);
        }
    }
    function renderSubitems() {
        if (!item.items || !item.items.length) {
            return null;
        }
        const { items: subitems } = item;
        return (_jsx("ul", { children: subitems.map((subitem, subitemIndex) => (_jsx(OutlineItem, Object.assign({ item: subitem, pdf: pdf }, otherProps), typeof subitem.dest === 'string' ? subitem.dest : subitemIndex))) }));
    }
    return (_jsxs("li", { children: [_jsx("a", { href: "#", onClick: onClick, children: item.title }), renderSubitems()] }));
}
