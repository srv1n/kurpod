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

// src/calendar-transitions.ts
var calendar_transitions_exports = {};
__export(calendar_transitions_exports, {
  slideVariants: () => slideVariants,
  transition: () => transition
});
module.exports = __toCommonJS(calendar_transitions_exports);
var transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3
};
var slideVariants = {
  enter: (direction) => ({
    x: `${direction * 100}%`
  }),
  center: {
    x: "0%"
  },
  exit: (direction) => ({
    x: `${direction * -100}%`
  })
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  slideVariants,
  transition
});
