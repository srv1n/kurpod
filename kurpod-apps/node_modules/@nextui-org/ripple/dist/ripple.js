"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ripple.tsx
var ripple_exports = {};
__export(ripple_exports, {
  default: () => ripple_default
});
module.exports = __toCommonJS(ripple_exports);
var import_framer_motion = require("framer-motion");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_jsx_runtime = require("react/jsx-runtime");
var domAnimation = () => import("@nextui-org/dom-animation").then((res) => res.default);
var Ripple = (props) => {
  const { ripples = [], motionProps, color = "currentColor", style, onClear } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: ripples.map((ripple) => {
    const duration = (0, import_shared_utils.clamp)(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.LazyMotion, { features: domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.m.span,
      {
        animate: { transform: "scale(2)", opacity: 0 },
        className: "nextui-ripple",
        exit: { opacity: 0 },
        initial: { transform: "scale(0)", opacity: 0.35 },
        style: {
          position: "absolute",
          backgroundColor: color,
          borderRadius: "100%",
          transformOrigin: "center",
          pointerEvents: "none",
          overflow: "hidden",
          inset: 0,
          zIndex: 0,
          top: ripple.y,
          left: ripple.x,
          width: `${ripple.size}px`,
          height: `${ripple.size}px`,
          ...style
        },
        transition: { duration },
        onAnimationComplete: () => {
          onClear(ripple.key);
        },
        ...motionProps
      }
    ) }) }, ripple.key);
  }) });
};
Ripple.displayName = "NextUI.Ripple";
var ripple_default = Ripple;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
