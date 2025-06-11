import {
  useKbd
} from "./chunk-HXMFKBAZ.mjs";
import {
  kbdKeysLabelMap,
  kbdKeysMap
} from "./chunk-7BVYOJX6.mjs";

// src/kbd.tsx
import { useMemo } from "react";
import { forwardRef } from "@nextui-org/system-rsc";
import { jsx, jsxs } from "react/jsx-runtime";
var Kbd = forwardRef((props, ref) => {
  const { Component, children, slots, classNames, keysToRender, getKbdProps } = useKbd({
    ...props
  });
  const keysContent = useMemo(() => {
    return keysToRender.map((key) => /* @__PURE__ */ jsx(
      "abbr",
      {
        className: slots.abbr({ class: classNames == null ? void 0 : classNames.abbr }),
        title: kbdKeysLabelMap[key],
        children: kbdKeysMap[key]
      },
      key
    ));
  }, [keysToRender]);
  return /* @__PURE__ */ jsxs(Component, { ref, ...getKbdProps(), children: [
    keysContent,
    children && /* @__PURE__ */ jsx("span", { className: slots.content({ class: classNames == null ? void 0 : classNames.content }), children })
  ] });
});
Kbd.displayName = "NextUI.Kbd";
var kbd_default = Kbd;

export {
  kbd_default
};
