"use client";

// src/calendar-picker-item.tsx
import { useAriaButton } from "@nextui-org/use-aria-button";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
import { forwardRef } from "react";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { dataAttr } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
import { jsx } from "react/jsx-runtime";
var CalendarPickerItem = forwardRef(({ children, autoFocus, isDisabled, onKeyDown, ...otherProps }, ref) => {
  const domRef = useDOMRef(ref);
  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
    {
      elementType: "button",
      isDisabled,
      onKeyDown,
      ...otherProps
    },
    domRef
  );
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus
  });
  const { isHovered, hoverProps } = useHover({ isDisabled });
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: domRef,
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-slot": "picker-item",
      ...mergeProps(
        focusProps,
        hoverProps,
        ariaButtonProps,
        filterDOMProps(otherProps, { enabled: true })
      ),
      children
    }
  );
});
CalendarPickerItem.displayName = "CalendarPickerItem";

export {
  CalendarPickerItem
};
