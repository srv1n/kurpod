"use client";

// src/use-accordion.ts
import { useProviderContext } from "@nextui-org/system";
import { filterDOMProps } from "@nextui-org/react-utils";
import React, { useCallback } from "react";
import { useTreeState } from "@react-stately/tree";
import { mergeProps } from "@react-aria/utils";
import { accordion } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { useMemo, useState } from "react";
import { useReactAriaAccordion } from "@nextui-org/use-aria-accordion";
function useAccordion(props) {
  var _a;
  const globalContext = useProviderContext();
  const {
    ref,
    as,
    className,
    items,
    variant,
    motionProps,
    expandedKeys,
    disabledKeys,
    selectedKeys,
    children: childrenProp,
    defaultExpandedKeys,
    selectionMode = "single",
    selectionBehavior = "toggle",
    keepContentMounted = false,
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    dividerProps = {},
    isCompact = false,
    isDisabled = false,
    showDivider = true,
    hideIndicator = false,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    disableIndicatorAnimation = false,
    itemClasses,
    ...otherProps
  } = props;
  const [focusedKey, setFocusedKey] = useState(null);
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const classNames = useMemo(
    () => accordion({
      variant,
      className
    }),
    [variant, className]
  );
  const children = useMemo(() => {
    let treeChildren = [];
    React.Children.map(childrenProp, (child) => {
      var _a2;
      if (React.isValidElement(child) && typeof ((_a2 = child.props) == null ? void 0 : _a2.children) !== "string") {
        const clonedChild = React.cloneElement(child, {
          hasChildItems: false
        });
        treeChildren.push(clonedChild);
      } else {
        treeChildren.push(child);
      }
    });
    return treeChildren;
  }, [childrenProp]);
  const commonProps = {
    children,
    items
  };
  const expandableProps = {
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange
  };
  const treeProps = {
    disabledKeys,
    selectedKeys,
    selectionMode,
    selectionBehavior,
    disallowEmptySelection,
    defaultSelectedKeys: defaultSelectedKeys != null ? defaultSelectedKeys : defaultExpandedKeys,
    onSelectionChange,
    ...commonProps,
    ...expandableProps
  };
  const state = useTreeState(treeProps);
  state.selectionManager.setFocusedKey = (key) => {
    setFocusedKey(key);
  };
  const { accordionProps } = useReactAriaAccordion(
    {
      ...commonProps,
      ...expandableProps
    },
    state,
    domRef
  );
  const values = useMemo(
    () => ({
      state,
      focusedKey,
      motionProps,
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      keepContentMounted,
      disableIndicatorAnimation
    }),
    [
      focusedKey,
      isCompact,
      isDisabled,
      hideIndicator,
      selectedKeys,
      disableAnimation,
      keepContentMounted,
      state == null ? void 0 : state.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      state.disabledKeys.size,
      motionProps
    ]
  );
  const getBaseProps = useCallback((props2 = {}) => {
    return {
      ref: domRef,
      className: classNames,
      "data-orientation": "vertical",
      ...mergeProps(
        accordionProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        props2
      )
    };
  }, []);
  const handleFocusChanged = useCallback((isFocused, key) => {
    isFocused && setFocusedKey(key);
  }, []);
  return {
    Component,
    values,
    state,
    focusedKey,
    getBaseProps,
    isSplitted: variant === "splitted",
    classNames,
    showDivider,
    dividerProps,
    disableAnimation,
    handleFocusChanged,
    itemClasses
  };
}

export {
  useAccordion
};
