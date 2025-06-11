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

// src/table-row.tsx
var table_row_exports = {};
__export(table_row_exports, {
  default: () => table_row_default
});
module.exports = __toCommonJS(table_row_exports);
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var TableRow = (0, import_system.forwardRef)((props, ref) => {
  var _a, _b;
  const { as, className, children, node, slots, state, isSelectable, classNames, ...otherProps } = props;
  const Component = as || ((props == null ? void 0 : props.href) ? "a" : "tr");
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { rowProps } = (0, import_table.useTableRow)({ node }, state, domRef);
  const trStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.tr, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)();
  const isDisabled = state.disabledKeys.has(node.key);
  const isSelected = state.selectionManager.isSelected(node.key);
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const { isFirst, isLast, isMiddle, isOdd } = (0, import_react.useMemo)(() => {
    const isFirst2 = node.key === state.collection.getFirstKey();
    const isLast2 = node.key === state.collection.getLastKey();
    const isMiddle2 = !isFirst2 && !isLast2;
    const isOdd2 = (node == null ? void 0 : node.index) ? (node.index + 1) % 2 === 0 : false;
    return {
      isFirst: isFirst2,
      isLast: isLast2,
      isMiddle: isMiddle2,
      isOdd: isOdd2
    };
  }, [node, state.collection]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref: domRef,
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-first": (0, import_shared_utils.dataAttr)(isFirst),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-last": (0, import_shared_utils.dataAttr)(isLast),
      "data-middle": (0, import_shared_utils.dataAttr)(isMiddle),
      "data-odd": (0, import_shared_utils.dataAttr)(isOdd),
      "data-selected": (0, import_shared_utils.dataAttr)(isSelected),
      ...(0, import_utils.mergeProps)(
        rowProps,
        focusProps,
        isSelectable ? hoverProps : {},
        (0, import_react_utils.filterDOMProps)(node.props, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_b = slots.tr) == null ? void 0 : _b.call(slots, { class: trStyles }),
      children
    }
  );
});
TableRow.displayName = "NextUI.TableRow";
var table_row_default = TableRow;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
