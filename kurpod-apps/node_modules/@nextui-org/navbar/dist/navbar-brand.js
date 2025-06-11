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

// src/navbar-brand.tsx
var navbar_brand_exports = {};
__export(navbar_brand_exports, {
  default: () => navbar_brand_default
});
module.exports = __toCommonJS(navbar_brand_exports);
var import_system = require("@nextui-org/system");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");

// src/navbar-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [NavbarProvider, useNavbarContext] = (0, import_react_utils.createContext)({
  name: "NavbarContext",
  strict: true,
  errorMessage: "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />"
});

// src/navbar-brand.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var NavbarBrand = (0, import_system.forwardRef)((props, ref) => {
  var _a;
  const { as, className, children, ...otherProps } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const { slots, classNames } = useNavbarContext();
  const styles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.brand, className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ref: domRef, className: (_a = slots.brand) == null ? void 0 : _a.call(slots, { class: styles }), ...otherProps, children });
});
NavbarBrand.displayName = "NextUI.NavbarBrand";
var navbar_brand_default = NavbarBrand;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
