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

// src/warning.tsx
var warning_exports = {};
__export(warning_exports, {
  WarningIcon: () => WarningIcon
});
module.exports = __toCommonJS(warning_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var WarningIcon = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      fill: "none",
      height: "24",
      viewBox: "0 0 24 24",
      width: "24",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          clipRule: "evenodd",
          d: "M3 10.417C3 7.219 3 5.62 3.378 5.082C3.755 4.545 5.258 4.03 8.265 3.001L8.838 2.805C10.405 2.268 11.188 2 12 2C12.812 2 13.595 2.268 15.162 2.805L15.735 3.001C18.742 4.03 20.245 4.545 20.622 5.082C21 5.62 21 7.22 21 10.417V11.991C21 17.629 16.761 20.366 14.101 21.527C13.38 21.842 13.02 22 12 22C10.98 22 10.62 21.842 9.899 21.527C7.239 20.365 3 17.63 3 11.991V10.417ZM12 7.25C12.1989 7.25 12.3897 7.32902 12.5303 7.46967C12.671 7.61032 12.75 7.80109 12.75 8V12C12.75 12.1989 12.671 12.3897 12.5303 12.5303C12.3897 12.671 12.1989 12.75 12 12.75C11.8011 12.75 11.6103 12.671 11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.80109 11.329 7.61032 11.4697 7.46967C11.6103 7.32902 11.8011 7.25 12 7.25ZM12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15C13 14.7348 12.8946 14.4804 12.7071 14.2929C12.5196 14.1054 12.2652 14 12 14C11.7348 14 11.4804 14.1054 11.2929 14.2929C11.1054 14.4804 11 14.7348 11 15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16Z",
          fill: "currentColor",
          fillRule: "evenodd"
        }
      )
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WarningIcon
});
