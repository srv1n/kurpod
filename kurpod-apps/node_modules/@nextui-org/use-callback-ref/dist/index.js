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
  useCallbackRef: () => useCallbackRef
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
var import_use_safe_layout_effect = require("@nextui-org/use-safe-layout-effect");
function useCallbackRef(fn, deps = []) {
  const ref = (0, import_react.useRef)(fn);
  (0, import_use_safe_layout_effect.useSafeLayoutEffect)(() => {
    ref.current = fn;
  });
  return (0, import_react.useCallback)((...args) => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);
  }, deps);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCallbackRef
});
