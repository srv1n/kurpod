import {
  useSpinner
} from "./chunk-GF2IUMUE.mjs";

// src/spinner.tsx
import { forwardRef } from "@nextui-org/system-rsc";
import { jsx, jsxs } from "react/jsx-runtime";
var Spinner = forwardRef((props, ref) => {
  const { slots, classNames, label, getSpinnerProps } = useSpinner({ ...props });
  return /* @__PURE__ */ jsxs("div", { ref, ...getSpinnerProps(), children: [
    /* @__PURE__ */ jsxs("div", { className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }), children: [
      /* @__PURE__ */ jsx("i", { className: slots.circle1({ class: classNames == null ? void 0 : classNames.circle1 }) }),
      /* @__PURE__ */ jsx("i", { className: slots.circle2({ class: classNames == null ? void 0 : classNames.circle2 }) })
    ] }),
    label && /* @__PURE__ */ jsx("span", { className: slots.label({ class: classNames == null ? void 0 : classNames.label }), children: label })
  ] });
});
Spinner.displayName = "NextUI.Spinner";
var spinner_default = Spinner;

export {
  spinner_default
};
