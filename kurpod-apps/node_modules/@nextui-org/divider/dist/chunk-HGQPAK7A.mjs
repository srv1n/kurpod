import {
  useSeparator
} from "./chunk-LVTFMK47.mjs";

// src/use-divider.ts
import { divider } from "@nextui-org/theme";
import { useCallback, useMemo } from "react";
function useDivider(props) {
  const { as, className, orientation, ...otherProps } = props;
  let Component = as || "hr";
  if (Component === "hr" && orientation === "vertical") {
    Component = "div";
  }
  const { separatorProps } = useSeparator({
    elementType: typeof Component === "string" ? Component : "hr",
    orientation
  });
  const styles = useMemo(
    () => divider({
      orientation,
      className
    }),
    [orientation, className]
  );
  const getDividerProps = useCallback(
    (props2 = {}) => ({
      className: styles,
      role: "separator",
      "data-orientation": orientation,
      ...separatorProps,
      ...otherProps,
      ...props2
    }),
    [styles, orientation, separatorProps, otherProps]
  );
  return { Component, getDividerProps };
}

export {
  useDivider
};
