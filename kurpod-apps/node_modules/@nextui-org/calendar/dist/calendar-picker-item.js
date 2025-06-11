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

// src/calendar-picker-item.tsx
var calendar_picker_item_exports = {};
__export(calendar_picker_item_exports, {
  CalendarPickerItem: () => CalendarPickerItem
});
module.exports = __toCommonJS(calendar_picker_item_exports);
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
var import_react = require("react");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_jsx_runtime = require("react/jsx-runtime");
var CalendarPickerItem = (0, import_react.forwardRef)(({ children, autoFocus, isDisabled, onKeyDown, ...otherProps }, ref) => {
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { buttonProps: ariaButtonProps, isPressed } = (0, import_use_aria_button.useAriaButton)(
    {
      elementType: "button",
      isDisabled,
      onKeyDown,
      ...otherProps
    },
    domRef
  );
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref: domRef,
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      "data-slot": "picker-item",
      ...(0, import_utils.mergeProps)(
        focusProps,
        hoverProps,
        ariaButtonProps,
        (0, import_react_utils.filterDOMProps)(otherProps, { enabled: true })
      ),
      children
    }
  );
});
CalendarPickerItem.displayName = "CalendarPickerItem";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendarPickerItem
});
