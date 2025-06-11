"use client";

// src/use-listbox.ts
import { useListBox as useAriaListbox } from "@react-aria/listbox";
import { useProviderContext } from "@nextui-org/system";
import { listbox } from "@nextui-org/theme";
import { useListState } from "@react-stately/list";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { useMemo } from "react";
import { clsx } from "@nextui-org/shared-utils";
function useListbox(props) {
  var _a;
  const globalContext = useProviderContext();
  const {
    ref,
    as,
    state: propState,
    variant,
    color,
    onAction,
    children,
    onSelectionChange,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    itemClasses,
    className,
    topContent,
    bottomContent,
    emptyContent = "No items.",
    hideSelectedIcon = false,
    hideEmptyContent = false,
    shouldHighlightOnFocus = false,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "ul";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const innerState = useListState({ ...props, children, onSelectionChange });
  const state = propState || innerState;
  const { listBoxProps } = useAriaListbox({ ...props, onAction }, state, domRef);
  const slots = useMemo(() => listbox({ className }), [className]);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-slot": "base",
      className: slots.base({ class: baseStyles }),
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      ...props2
    };
  };
  const getListProps = (props2 = {}) => {
    return {
      "data-slot": "list",
      className: slots.list({ class: classNames == null ? void 0 : classNames.list }),
      ...listBoxProps,
      ...props2
    };
  };
  const getEmptyContentProps = (props2 = {}) => {
    return {
      "data-slot": "empty-content",
      children: emptyContent,
      className: slots.emptyContent({ class: classNames == null ? void 0 : classNames.emptyContent }),
      ...props2
    };
  };
  return {
    Component,
    state,
    variant,
    color,
    slots,
    classNames,
    topContent,
    bottomContent,
    emptyContent,
    hideEmptyContent,
    shouldHighlightOnFocus,
    hideSelectedIcon,
    disableAnimation,
    className,
    itemClasses,
    getBaseProps,
    getListProps,
    getEmptyContentProps
  };
}

export {
  useListbox
};
