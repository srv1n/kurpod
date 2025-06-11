"use client";
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

// src/use-ripple.ts
var use_ripple_exports = {};
__export(use_ripple_exports, {
  useRipple: () => useRipple
});
module.exports = __toCommonJS(use_ripple_exports);
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useRipple(props = {}) {
  const [ripples, setRipples] = (0, import_react.useState)([]);
  const onPress = (0, import_react.useCallback)((event) => {
    const trigger = event.target;
    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: (0, import_shared_utils.getUniqueID)(prevRipples.length.toString()),
        size,
        x: event.x - size / 2,
        y: event.y - size / 2
      }
    ]);
  }, []);
  const onClear = (0, import_react.useCallback)((key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);
  return { ripples, onClear, onPress, ...props };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useRipple
});
