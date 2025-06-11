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
  useScrollPosition: () => useScrollPosition
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
var isBrowser = typeof window !== "undefined";
function getScrollPosition(element) {
  if (!isBrowser)
    return { x: 0, y: 0 };
  if (!element) {
    return { x: window.scrollX, y: window.scrollY };
  }
  return { x: element.scrollLeft, y: element.scrollTop };
}
var useScrollPosition = (props) => {
  const { elementRef, delay = 30, callback, isEnabled } = props;
  const position = (0, import_react.useRef)(
    isEnabled ? getScrollPosition(elementRef == null ? void 0 : elementRef.current) : { x: 0, y: 0 }
  );
  const throttleTimeout = (0, import_react.useRef)(null);
  const handler = (0, import_react.useCallback)(() => {
    const currPos = getScrollPosition(elementRef == null ? void 0 : elementRef.current);
    if (typeof callback === "function") {
      callback({ prevPos: position.current, currPos });
    }
    position.current = currPos;
    throttleTimeout.current = null;
  }, [callback, elementRef]);
  (0, import_react.useEffect)(() => {
    if (!isEnabled)
      return;
    const handleScroll = () => {
      if (delay) {
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current);
        }
        throttleTimeout.current = setTimeout(handler, delay);
      } else {
        handler();
      }
    };
    const target = (elementRef == null ? void 0 : elementRef.current) || window;
    target.addEventListener("scroll", handleScroll);
    return () => {
      target.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
        throttleTimeout.current = null;
      }
    };
  }, [elementRef == null ? void 0 : elementRef.current, delay, handler, isEnabled]);
  return position.current;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useScrollPosition
});
