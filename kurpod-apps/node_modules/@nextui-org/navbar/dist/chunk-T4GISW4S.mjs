"use client";
import {
  useNavbarContext
} from "./chunk-CLWTNWD4.mjs";

// src/navbar-menu-item.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var NavbarMenuItem = forwardRef((props, ref) => {
  var _a;
  const { className, children, isActive, ...otherProps } = props;
  const domRef = useDOMRef(ref);
  const { slots, isMenuOpen, classNames } = useNavbarContext();
  const styles = clsx(classNames == null ? void 0 : classNames.menuItem, className);
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref: domRef,
      className: (_a = slots.menuItem) == null ? void 0 : _a.call(slots, { class: styles }),
      "data-active": dataAttr(isActive),
      "data-open": dataAttr(isMenuOpen),
      ...otherProps,
      children
    }
  );
});
NavbarMenuItem.displayName = "NextUI.NavbarMenuItem";
var navbar_menu_item_default = NavbarMenuItem;

export {
  navbar_menu_item_default
};
