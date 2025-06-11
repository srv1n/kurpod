// src/link.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var LinkIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    shapeRendering: "geometricPrecision",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" }),
      /* @__PURE__ */ jsx("path", { d: "M15 3h6v6" }),
      /* @__PURE__ */ jsx("path", { d: "M10 14L21 3" })
    ]
  }
);

export {
  LinkIcon
};
