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

// src/navbar-context.ts
var navbar_context_exports = {};
__export(navbar_context_exports, {
  NavbarProvider: () => NavbarProvider,
  useNavbarContext: () => useNavbarContext
});
module.exports = __toCommonJS(navbar_context_exports);
var import_react_utils = require("@nextui-org/react-utils");
var [NavbarProvider, useNavbarContext] = (0, import_react_utils.createContext)({
  name: "NavbarContext",
  strict: true,
  errorMessage: "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavbarProvider,
  useNavbarContext
});
