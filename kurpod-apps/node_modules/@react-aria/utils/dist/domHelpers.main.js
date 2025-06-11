
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "getOwnerDocument", () => $aaa611146751592e$export$b204af158042fbac);
$parcel$export(module.exports, "getOwnerWindow", () => $aaa611146751592e$export$f21a1ffae260145a);
const $aaa611146751592e$export$b204af158042fbac = (el)=>{
    var _el_ownerDocument;
    return (_el_ownerDocument = el === null || el === void 0 ? void 0 : el.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
};
const $aaa611146751592e$export$f21a1ffae260145a = (el)=>{
    if (el && 'window' in el && el.window === el) return el;
    const doc = $aaa611146751592e$export$b204af158042fbac(el);
    return doc.defaultView || window;
};


//# sourceMappingURL=domHelpers.main.js.map
