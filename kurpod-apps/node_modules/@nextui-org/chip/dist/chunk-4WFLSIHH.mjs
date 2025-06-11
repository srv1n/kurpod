"use client";
import {
  useChip
} from "./chunk-TWKIP7BA.mjs";

// src/chip.tsx
import { CloseFilledIcon } from "@nextui-org/shared-icons";
import { forwardRef } from "@nextui-org/system";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Chip = forwardRef((props, ref) => {
  const {
    Component,
    children,
    slots,
    classNames,
    isDot,
    isCloseable,
    startContent,
    endContent,
    getCloseButtonProps,
    getChipProps
  } = useChip({
    ...props,
    ref
  });
  const start = useMemo(() => {
    if (isDot && !startContent) {
      return /* @__PURE__ */ jsx("span", { className: slots.dot({ class: classNames == null ? void 0 : classNames.dot }) });
    }
    return startContent;
  }, [slots, startContent, isDot]);
  const end = useMemo(() => {
    if (isCloseable) {
      return /* @__PURE__ */ jsx("span", { ...getCloseButtonProps(), children: endContent || /* @__PURE__ */ jsx(CloseFilledIcon, {}) });
    }
    return endContent;
  }, [endContent, isCloseable, getCloseButtonProps]);
  return /* @__PURE__ */ jsxs(Component, { ...getChipProps(), children: [
    start,
    /* @__PURE__ */ jsx("span", { className: slots.content({ class: classNames == null ? void 0 : classNames.content }), children }),
    end
  ] });
});
Chip.displayName = "NextUI.Chip";
var chip_default = Chip;

export {
  chip_default
};
