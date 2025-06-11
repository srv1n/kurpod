// src/arrow-left.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ArrowLeftIcon = ({ strokeWidth = 1.5, ...otherProps }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    viewBox: "0 0 24 24",
    width: "1em",
    ...otherProps,
    children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9.57 5.92993L3.5 11.9999L9.57 18.0699",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "10",
          strokeWidth
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M20.5 12H3.67004",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "10",
          strokeWidth
        }
      )
    ]
  }
);

export {
  ArrowLeftIcon
};
