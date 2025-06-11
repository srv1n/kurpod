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
  Divider: () => divider_default,
  useDivider: () => useDivider
});
module.exports = __toCommonJS(src_exports);

// src/divider.tsx
var import_system_rsc = require("@nextui-org/system-rsc");

// src/use-divider.ts
var import_theme = require("@nextui-org/theme");
var import_react = require("react");

// src/use-separator.ts
var import_react_rsc_utils = require("@nextui-org/react-rsc-utils");
function useSeparator(props) {
  let domProps = (0, import_react_rsc_utils.filterDOMProps)(props, {
    enabled: typeof props.elementType === "string"
  });
  let ariaOrientation;
  if (props.orientation === "vertical") {
    ariaOrientation = "vertical";
  }
  if (props.elementType !== "hr") {
    return {
      separatorProps: {
        ...domProps,
        role: "separator",
        "aria-orientation": ariaOrientation
      }
    };
  }
  return { separatorProps: domProps };
}

// src/use-divider.ts
function useDivider(props) {
  const { as, className, orientation, ...otherProps } = props;
  let Component = as || "hr";
  if (Component === "hr" && orientation === "vertical") {
    Component = "div";
  }
  const { separatorProps } = useSeparator({
    elementType: typeof Component === "string" ? Component : "hr",
    orientation
  });
  const styles = (0, import_react.useMemo)(
    () => (0, import_theme.divider)({
      orientation,
      className
    }),
    [orientation, className]
  );
  const getDividerProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      className: styles,
      role: "separator",
      "data-orientation": orientation,
      ...separatorProps,
      ...otherProps,
      ...props2
    }),
    [styles, orientation, separatorProps, otherProps]
  );
  return { Component, getDividerProps };
}

// src/divider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Divider = (0, import_system_rsc.forwardRef)((props, ref) => {
  const { Component, getDividerProps } = useDivider({ ...props });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ref, ...getDividerProps() });
});
Divider.displayName = "NextUI.Divider";
var divider_default = Divider;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Divider,
  useDivider
});
