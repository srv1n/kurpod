// src/use-accordion-item.ts
import {
  useId,
  useCallback,
  useEffect
} from "react";
import { focusSafely } from "@react-aria/focus";
import { useButton } from "@react-aria/button";
function useReactAriaAccordionItem(props, state, ref) {
  let { item, isDisabled: isDisabledProp } = props;
  let key = item.key;
  let manager = state.selectionManager;
  let buttonId = useId();
  let regionId = useId();
  let isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;
  useEffect(() => {
    let isFocused = key === state.focusedKey;
    if (isFocused && document.activeElement !== ref.current) {
      ref.current && focusSafely(ref.current);
    }
  }, [ref, key, state.focusedKey]);
  let onSelect = useCallback(
    (e) => {
      if (!manager.canSelectItem(key)) {
        return;
      }
      manager.select(key, e);
      state.toggleKey(key);
    },
    [key, manager]
  );
  const extendFocusSelection = useCallback(
    (toKey) => {
      if (manager.selectionBehavior === "replace") {
        manager.extendSelection(toKey);
      }
      manager.setFocusedKey(toKey);
    },
    [manager]
  );
  const onKeyDown = useCallback(
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
  let { buttonProps } = useButton(
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

export {
  useReactAriaAccordionItem
};
