// src/use-code.ts
import { code } from "@nextui-org/theme";
import { mapPropsVariants } from "@nextui-org/system-rsc";
import { useMemo } from "react";
import { objectToDeps } from "@nextui-org/shared-utils";
function useCode(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);
  const { as, children, className, ...otherProps } = props;
  const Component = as || "code";
  const classNames = useMemo(
    () => code({
      ...variantProps,
      className
    }),
    [objectToDeps(variantProps), className]
  );
  const getCodeProps = () => {
    return {
      className: classNames,
      ...otherProps
    };
  };
  return { Component, children, getCodeProps };
}

export {
  useCode
};
