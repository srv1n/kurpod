"use client";

// src/resizable-panel.tsx
import { forwardRef } from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { useMeasure } from "@nextui-org/use-measure";
import { jsx } from "react/jsx-runtime";
var ResizablePanel = forwardRef(
  (originalProps, ref) => {
    const { children, ...props } = originalProps;
    let [measureRef, bounds] = useMeasure();
    return /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(
      m.div,
      {
        ref,
        animate: {
          width: bounds.width && (bounds == null ? void 0 : bounds.width) > 0 ? bounds.width : "auto",
          height: bounds.height && bounds.height > 0 ? bounds.height : "auto"
        },
        children: /* @__PURE__ */ jsx("div", { ref: measureRef, ...props, children })
      }
    ) });
  }
);
ResizablePanel.displayName = "NextUI - ResizablePanel";

export {
  ResizablePanel
};
