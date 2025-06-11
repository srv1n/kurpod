// src/utils/merge-classes.ts
import { clsx } from "@nextui-org/shared-utils";
var mergeClasses = (itemClasses, itemPropsClasses) => {
  if (!itemClasses && !itemPropsClasses)
    return {};
  const keys = /* @__PURE__ */ new Set([...Object.keys(itemClasses || {}), ...Object.keys(itemPropsClasses || {})]);
  return Array.from(keys).reduce(
    (acc, key) => ({
      ...acc,
      [key]: clsx(itemClasses == null ? void 0 : itemClasses[key], itemPropsClasses == null ? void 0 : itemPropsClasses[key])
    }),
    {}
  );
};

export {
  mergeClasses
};
