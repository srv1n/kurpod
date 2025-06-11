// src/use-spinner.ts
import { mapPropsVariants } from "@nextui-org/system-rsc";
import { spinner } from "@nextui-org/theme";
import { clsx, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo, useCallback } from "react";
function useSpinner(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, spinner.variantKeys);
  const { children, className, classNames, label: labelProp, ...otherProps } = props;
  const slots = useMemo(() => spinner({ ...variantProps }), [objectToDeps(variantProps)]);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const label = labelProp || children;
  const ariaLabel = useMemo(() => {
    if (label && typeof label === "string") {
      return label;
    }
    return !otherProps["aria-label"] ? "Loading" : "";
  }, [children, label, otherProps["aria-label"]]);
  const getSpinnerProps = useCallback(
    () => ({
      "aria-label": ariaLabel,
      className: slots.base({
        class: baseStyles
      }),
      ...otherProps
    }),
    [ariaLabel, slots, baseStyles, otherProps]
  );
  return { label, slots, classNames, getSpinnerProps };
}

export {
  useSpinner
};
