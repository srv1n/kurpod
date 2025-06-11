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

// src/navbar-transitions.ts
var navbar_transitions_exports = {};
__export(navbar_transitions_exports, {
  hideOnScrollVariants: () => hideOnScrollVariants
});
module.exports = __toCommonJS(navbar_transitions_exports);
var import_framer_utils = require("@nextui-org/framer-utils");
var hideOnScrollVariants = {
  visible: {
    y: 0,
    transition: {
      ease: import_framer_utils.TRANSITION_EASINGS.easeOut
    }
  },
  hidden: {
    y: "-100%",
    transition: {
      ease: import_framer_utils.TRANSITION_EASINGS.easeIn
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hideOnScrollVariants
});
