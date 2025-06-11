"use client";
import {
  CardProvider
} from "./chunk-QVMTN7ZJ.mjs";
import {
  useCard
} from "./chunk-3GIHCET7.mjs";

// src/card.tsx
import { forwardRef } from "@nextui-org/system";
import { Ripple } from "@nextui-org/ripple";
import { jsx, jsxs } from "react/jsx-runtime";
var Card = forwardRef((props, ref) => {
  const {
    children,
    context,
    Component,
    isPressable,
    disableAnimation,
    disableRipple,
    getCardProps,
    getRippleProps
  } = useCard({ ...props, ref });
  return /* @__PURE__ */ jsxs(Component, { ...getCardProps(), children: [
    /* @__PURE__ */ jsx(CardProvider, { value: context, children }),
    isPressable && !disableAnimation && !disableRipple && /* @__PURE__ */ jsx(Ripple, { ...getRippleProps() })
  ] });
});
Card.displayName = "NextUI.Card";
var card_default = Card;

export {
  card_default
};
