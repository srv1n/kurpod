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

// src/use-accordion-item.ts
var use_accordion_item_exports = {};
__export(use_accordion_item_exports, {
  useReactAriaAccordionItem: () => useReactAriaAccordionItem
});
module.exports = __toCommonJS(use_accordion_item_exports);
var import_react = require("react");
var import_focus = require("@react-aria/focus");
var import_button = require("@react-aria/button");
function useReactAriaAccordionItem(props, state, ref) {
  let { item, isDisabled: isDisabledProp } = props;
  let key = item.key;
  let manager = state.selectionManager;
  let buttonId = (0, import_react.useId)();
  let regionId = (0, import_react.useId)();
  let isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;
  (0, import_react.useEffect)(() => {
    let isFocused = key === state.focusedKey;
    if (isFocused && document.activeElement !== ref.current) {
      ref.current && (0, import_focus.focusSafely)(ref.current);
    }
  }, [ref, key, state.focusedKey]);
  let onSelect = (0, import_react.useCallback)(
    (e) => {
      if (!manager.canSelectItem(key)) {
        return;
      }
      manager.select(key, e);
      state.toggleKey(key);
    },
    [key, manager]
  );
  const extendFocusSelection = (0, import_react.useCallback)(
    (toKey) => {
      if (manager.selectionBehavior === "replace") {
        manager.extendSelection(toKey);
      }
      manager.setFocusedKey(toKey);
    },
    [manager]
  );
  const onKeyDown = (0, import_react.useCallback)(
    (event) => {
      const keyMap = {
        ArrowDown: () => {
          const nextKey = state.collection.getKeyAfter(key);
          if (nextKey && state.disabledKeys.has(nextKey)) {
            const nextEnabledKey = state.collection.getKeyAfter(nextKey);
            nextEnabledKey && extendFocusSelection(nextEnabledKey);
          } else {
            nextKey && extendFocusSelection(nextKey);
          }
        },
        ArrowUp: () => {
          const prevKey = state.collection.getKeyBefore(key);
          if (prevKey && state.disabledKeys.has(prevKey)) {
            const prevEnabledKey = state.collection.getKeyBefore(prevKey);
            prevEnabledKey && extendFocusSelection(prevEnabledKey);
          } else {
            prevKey && extendFocusSelection(prevKey);
          }
        },
        Home: () => {
          const firstKey = state.collection.getFirstKey();
          firstKey && extendFocusSelection(firstKey);
        },
        End: () => {
          const lastKey = state.collection.getLastKey();
          lastKey && extendFocusSelection(lastKey);
        }
      };
      const action = keyMap[event.key];
      if (action) {
        event.preventDefault();
        if (manager.canSelectItem(key)) {
          action(event);
        }
      }
    },
    [key, manager]
  );
  let { buttonProps } = (0, import_button.useButton)(
    {
      id: buttonId,
      elementType: "button",
      isDisabled,
      onKeyDown,
      onPress: onSelect
    },
    ref
  );
  let isExpanded = state.selectionManager.isSelected(item.key);
  return {
    buttonProps: {
      ...buttonProps,
      "aria-expanded": isExpanded,
      "aria-controls": isExpanded ? regionId : void 0
    },
    regionProps: {
      id: regionId,
      role: "region",
      "aria-labelledby": buttonId
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useReactAriaAccordionItem
});
