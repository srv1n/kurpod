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

// src/overlays/ariaShouldCloseOnInteractOutside.ts
var ariaShouldCloseOnInteractOutside_exports = {};
__export(ariaShouldCloseOnInteractOutside_exports, {
  ariaShouldCloseOnInteractOutside: () => ariaShouldCloseOnInteractOutside
});
module.exports = __toCommonJS(ariaShouldCloseOnInteractOutside_exports);
var ariaShouldCloseOnInteractOutside = (element, triggerRef, state) => {
  const trigger = triggerRef == null ? void 0 : triggerRef.current;
  if (!trigger || !trigger.contains(element)) {
    const startElements = document.querySelectorAll("body > span[data-focus-scope-start]");
    let focusScopeElements = [];
    startElements.forEach((startElement) => {
      focusScopeElements.push(startElement.nextElementSibling);
    });
    if (focusScopeElements.length === 1) {
      state.close();
      return false;
    }
  }
  return !trigger || !trigger.contains(element);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ariaShouldCloseOnInteractOutside
});
