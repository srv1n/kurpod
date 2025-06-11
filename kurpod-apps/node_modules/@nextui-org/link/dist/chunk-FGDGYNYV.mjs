"use client";
import {
  useLink
} from "./chunk-NBGQML4S.mjs";

// src/link.tsx
import { forwardRef } from "@nextui-org/system";
import { LinkIcon } from "@nextui-org/shared-icons";
import { linkAnchorClasses } from "@nextui-org/theme";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Link = forwardRef((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = /* @__PURE__ */ jsx(LinkIcon, { className: linkAnchorClasses }),
    getLinkProps
  } = useLink({
    ref,
    ...props
  });
  return /* @__PURE__ */ jsx(Component, { ...getLinkProps(), children: /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    showAnchorIcon && anchorIcon
  ] }) });
});
Link.displayName = "NextUI.Link";
var link_default = Link;

export {
  link_default
};
