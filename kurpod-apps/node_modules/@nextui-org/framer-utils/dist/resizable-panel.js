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

// src/resizable-panel.tsx
var resizable_panel_exports = {};
__export(resizable_panel_exports, {
  ResizablePanel: () => ResizablePanel
});
module.exports = __toCommonJS(resizable_panel_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_use_measure = require("@nextui-org/use-measure");
var import_jsx_runtime = require("react/jsx-runtime");
var ResizablePanel = (0, import_react.forwardRef)(
  (originalProps, ref) => {
    const { children, ...props } = originalProps;
    let [measureRef, bounds] = (0, import_use_measure.useMeasure)();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.LazyMotion, { features: import_framer_motion.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.m.div,
      {
        ref,
        animate: {
          width: bounds.width && (bounds == null ? void 0 : bounds.width) > 0 ? bounds.width : "auto",
          height: bounds.height && bounds.height > 0 ? bounds.height : "auto"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: measureRef, ...props, children })
      }
    ) });
  }
);
ResizablePanel.displayName = "NextUI - ResizablePanel";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResizablePanel
});
