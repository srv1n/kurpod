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
  useMeasure: () => useMeasure
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
function useMeasure() {
  const [dimensions, setDimensions] = (0, import_react.useState)({
    width: null,
    height: null
  });
  const previousObserver = (0, import_react.useRef)(null);
  const customRef = (0, import_react.useCallback)((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }
    if ((node == null ? void 0 : node.nodeType) === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
          setDimensions({ width, height });
        }
      });
      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);
  return [customRef, dimensions];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useMeasure
});
