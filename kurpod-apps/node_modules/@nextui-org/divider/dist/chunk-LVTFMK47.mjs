// src/use-separator.ts
import { filterDOMProps } from "@nextui-org/react-rsc-utils";
function useSeparator(props) {
  let domProps = filterDOMProps(props, {
    enabled: typeof props.elementType === "string"
  });
  let ariaOrientation;
  if (props.orientation === "vertical") {
    ariaOrientation = "vertical";
  }
  if (props.elementType !== "hr") {
    return {
      separatorProps: {
        ...domProps,
        role: "separator",
        "aria-orientation": ariaOrientation
      }
    };
  }
  return { separatorProps: domProps };
}

export {
  useSeparator
};
