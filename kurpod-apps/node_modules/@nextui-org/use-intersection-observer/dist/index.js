"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useIntersectionObserver: () => useIntersectionObserver
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  isEnabled = true,
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange
} = {}) {
  var _a;
  const [ref, setRef] = (0, import_react.useState)(null);
  const [state, setState] = (0, import_react.useState)(() => ({
    isIntersecting: initialIsIntersecting,
    entry: void 0
  }));
  const callbackRef = (0, import_react.useRef)();
  callbackRef.current = onChange;
  const frozen = ((_a = state.entry) == null ? void 0 : _a.isIntersecting) && freezeOnceVisible;
  (0, import_react.useEffect)(() => {
    if (!isEnabled)
      return;
    if (!ref)
      return;
    if (!("IntersectionObserver" in window))
      return;
    if (frozen)
      return;
    let unobserve;
    const observer = new IntersectionObserver(
      (entries) => {
        const thresholds = Array.isArray(observer.thresholds) ? observer.thresholds : [observer.thresholds];
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting && thresholds.some((threshold2) => entry.intersectionRatio >= threshold2);
          setState({ isIntersecting, entry });
          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }
          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = void 0;
          }
        });
      },
      { threshold, root, rootMargin }
    );
    observer.observe(ref);
    return () => {
      observer.disconnect();
    };
  }, [
    ref,
    isEnabled,
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    freezeOnceVisible
  ]);
  const prevRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    var _a2;
    if (!ref && ((_a2 = state.entry) == null ? void 0 : _a2.target) && !freezeOnceVisible && !frozen && prevRef.current !== state.entry.target) {
      prevRef.current = state.entry.target;
      setState({ isIntersecting: initialIsIntersecting, entry: void 0 });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);
  const result = [setRef, !!state.isIntersecting, state.entry];
  result.ref = result[0];
  result.isIntersecting = result[1];
  result.entry = result[2];
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useIntersectionObserver
});
