"use client";
import {
  useNavbarContext
} from "./chunk-CLWTNWD4.mjs";

// src/navbar-item.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var NavbarItem = forwardRef((props, ref) => {
  var _a;
  const { as, className, children, isActive, ...otherProps } = props;
  const Component = as || "li";
  const domRef = useDOMRef(ref);
  const { slots, classNames } = useNavbarContext();
  const styles = clsx(classNames == null ? void 0 : classNames.item, className);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      className: (_a = slots.item) == null ? void 0 : _a.call(slots, { class: styles }),
      "data-active": dataAttr(isActive),
      ...otherProps,
      children
    }
  );
});
NavbarItem.displayName = "NextUI.NavbarItem";
var navbar_item_default = NavbarItem;

export {
  navbar_item_default
};
