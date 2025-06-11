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

// src/table-select-all-checkbox.tsx
var table_select_all_checkbox_exports = {};
__export(table_select_all_checkbox_exports, {
  default: () => table_select_all_checkbox_default
});
module.exports = __toCommonJS(table_select_all_checkbox_exports);
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_checkbox = require("@nextui-org/checkbox");
var import_visually_hidden = require("@react-aria/visually-hidden");
var import_jsx_runtime = require("react/jsx-runtime");
var TableSelectAllCheckbox = (0, import_system.forwardRef)((props, ref) => {
  var _a, _b;
  const {
    as,
    className,
    node,
    slots,
    state,
    selectionMode,
    color,
    checkboxesProps,
    disableAnimation,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "th";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { columnHeaderProps } = (0, import_table.useTableColumnHeader)({ node }, state, domRef);
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)();
  const { checkboxProps } = (0, import_table.useTableSelectAllCheckbox)(state);
  const thStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.th, className, (_a = node.props) == null ? void 0 : _a.className);
  const isSingleSelectionMode = selectionMode === "single";
  const { onChange, ...otherCheckboxProps } = checkboxProps;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref: domRef,
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      ...(0, import_utils.mergeProps)(
        columnHeaderProps,
        focusProps,
        (0, import_react_utils.filterDOMProps)(node.props, {
          enabled: shouldFilterDOMProps
        }),
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        })
      ),
      className: (_b = slots.th) == null ? void 0 : _b.call(slots, { class: thStyles }),
      children: isSingleSelectionMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_visually_hidden.VisuallyHidden, { children: checkboxProps["aria-label"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_checkbox.Checkbox,
        {
          color,
          disableAnimation,
          onValueChange: onChange,
          ...(0, import_utils.mergeProps)(checkboxesProps, otherCheckboxProps)
        }
      )
    }
  );
});
TableSelectAllCheckbox.displayName = "NextUI.TableSelectAllCheckbox";
var table_select_all_checkbox_default = TableSelectAllCheckbox;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
