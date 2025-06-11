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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Badge: () => badge_default,
  useBadge: () => useBadge
});
module.exports = __toCommonJS(src_exports);

// src/use-badge.ts
var import_theme = require("@nextui-org/theme");
var import_system = require("@nextui-org/system");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useBadge(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.badge.variantKeys);
  const { as, children, className, content, classNames, ...otherProps } = props;
  const Component = as || "span";
  const isOneChar = (0, import_react.useMemo)(
    () => {
      var _a2;
      return ((_a2 = String(content)) == null ? void 0 : _a2.length) === 1 || (originalProps == null ? void 0 : originalProps.isOneChar);
    },
    [content, originalProps == null ? void 0 : originalProps.isOneChar]
  );
  const isDot = (0, import_react.useMemo)(() => {
    var _a2;
    return ((_a2 = String(content)) == null ? void 0 : _a2.length) === 0;
  }, [content]);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.badge, className);
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.badge)({
      ...variantProps,
      showOutline: !!(originalProps == null ? void 0 : originalProps.disableOutline) ? !(originalProps == null ? void 0 : originalProps.disableOutline) : originalProps == null ? void 0 : originalProps.showOutline,
      isOneChar,
      isDot
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), isOneChar, isDot]
  );
  const getBadgeProps = () => {
    return {
      className: slots.badge({ class: baseStyles }),
      "data-invisible": originalProps.isInvisible,
      ...otherProps
    };
  };
  return {
    Component,
    children,
    content,
    slots,
    classNames,
    disableAnimation,
    isInvisible: originalProps == null ? void 0 : originalProps.isInvisible,
    getBadgeProps
  };
}

// src/badge.tsx
var import_system2 = require("@nextui-org/system");
var import_jsx_runtime = require("react/jsx-runtime");
var Badge = (0, import_system2.forwardRef)((props, ref) => {
  const { Component, children, content, slots, classNames, getBadgeProps } = useBadge({
    ...props
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: slots.base({ class: classNames == null ? void 0 : classNames.base }), children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ref, ...getBadgeProps(), children: content })
  ] });
});
Badge.displayName = "NextUI.Badge";
var badge_default = Badge;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Badge,
  useBadge
});
