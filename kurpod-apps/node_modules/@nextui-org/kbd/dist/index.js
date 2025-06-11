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
  Kbd: () => kbd_default,
  useKbd: () => useKbd
});
module.exports = __toCommonJS(src_exports);

// src/kbd.tsx
var import_react2 = require("react");
var import_system_rsc2 = require("@nextui-org/system-rsc");

// src/use-kbd.ts
var import_system_rsc = require("@nextui-org/system-rsc");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useKbd(originalProps) {
  const [props, variantProps] = (0, import_system_rsc.mapPropsVariants)(originalProps, import_theme.kbd.variantKeys);
  const { as, children, className, keys, title, classNames, ...otherProps } = props;
  const Component = as || "kbd";
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.kbd)({
      ...variantProps
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps)]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const keysToRender = typeof keys === "string" ? [keys] : Array.isArray(keys) ? keys : [];
  const getKbdProps = (props2 = {}) => ({
    ...otherProps,
    ...props2,
    className: (0, import_shared_utils.clsx)(slots.base({ class: (0, import_shared_utils.clsx)(baseStyles, props2.className) }))
  });
  return { Component, slots, classNames, title, children, keysToRender, getKbdProps };
}

// src/utils.ts
var kbdKeysMap = {
  command: "\u2318",
  shift: "\u21E7",
  ctrl: "\u2303",
  option: "\u2325",
  enter: "\u21B5",
  delete: "\u232B",
  escape: "\u238B",
  tab: "\u21E5",
  capslock: "\u21EA",
  up: "\u2191",
  right: "\u2192",
  down: "\u2193",
  left: "\u2190",
  pageup: "\u21DE",
  pagedown: "\u21DF",
  home: "\u2196",
  end: "\u2198",
  help: "?",
  space: "\u2423"
};
var kbdKeysLabelMap = {
  command: "Command",
  shift: "Shift",
  ctrl: "Control",
  option: "Option",
  enter: "Enter",
  delete: "Delete",
  escape: "Escape",
  tab: "Tab",
  capslock: "Caps Lock",
  up: "Up",
  right: "Right",
  down: "Down",
  left: "Left",
  pageup: "Page Up",
  pagedown: "Page Down",
  home: "Home",
  end: "End",
  help: "Help",
  space: "Space"
};

// src/kbd.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Kbd = (0, import_system_rsc2.forwardRef)((props, ref) => {
  const { Component, children, slots, classNames, keysToRender, getKbdProps } = useKbd({
    ...props
  });
  const keysContent = (0, import_react2.useMemo)(() => {
    return keysToRender.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "abbr",
      {
        className: slots.abbr({ class: classNames == null ? void 0 : classNames.abbr }),
        title: kbdKeysLabelMap[key],
        children: kbdKeysMap[key]
      },
      key
    ));
  }, [keysToRender]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ref, ...getKbdProps(), children: [
    keysContent,
    children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slots.content({ class: classNames == null ? void 0 : classNames.content }), children })
  ] });
});
Kbd.displayName = "NextUI.Kbd";
var kbd_default = Kbd;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Kbd,
  useKbd
});
