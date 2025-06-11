// src/arrow-right.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ArrowRightIcon = ({ strokeWidth = 1.5, ...otherProps }) => /* @__PURE__ */ jsxs(
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
          d: "M16.835 6.91821L23.9166 13.9999L16.835 21.0815",
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
          d: "M4.08325 14H23.7183",
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
  ArrowRightIcon
};
