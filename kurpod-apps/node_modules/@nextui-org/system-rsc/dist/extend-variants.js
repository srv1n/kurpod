"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extend-variants.js
var extend_variants_exports = {};
__export(extend_variants_exports, {
  extendVariants: () => extendVariants
});
module.exports = __toCommonJS(extend_variants_exports);
var React = __toESM(require("react"));
var import_theme = require("@nextui-org/theme");
var import_clsx = __toESM(require("clsx"));

// src/utils.ts
var import_react = require("react");
var mapPropsVariants = (props, variantKeys, removeVariantProps = true) => {
  if (!variantKeys) {
    return [props, {}];
  }
  const picked = variantKeys.reduce((acc, key) => {
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});
  if (removeVariantProps) {
    const omitted = Object.keys(props).filter((key) => !variantKeys.includes(key)).reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});
    return [omitted, picked];
  } else {
    return [props, picked];
  }
};

// src/extend-variants.js
function getSlots(variants) {
  return variants ? Object.values(variants).flatMap(Object.values).reduce((acc, slot) => {
    if (typeof slot === "object" && slot !== null && !(slot instanceof String)) {
      Object.keys(slot).forEach((key) => {
        if (!acc.hasOwnProperty(key)) {
          acc[key] = "";
        }
      });
    }
    return acc;
  }, {}) : {};
}
function getClassNamesWithProps({
  props = {},
  variants,
  slots,
  defaultVariants,
  compoundVariants,
  hasSlots,
  opts
}) {
  var _a, _b, _c;
  const keys = [];
  if (defaultVariants && typeof defaultVariants === "object") {
    for (const key in defaultVariants) {
      const value = defaultVariants[key];
      const propValue = props == null ? void 0 : props[key];
      if (propValue && propValue !== value) {
        keys.push(key);
      }
    }
  }
  const customTv = (0, import_theme.tv)(
    {
      variants,
      defaultVariants: defaultVariants && typeof defaultVariants === "object" ? Object.keys(defaultVariants).filter((k) => !keys.includes(k)).reduce((o, k) => {
        o[k] = defaultVariants[k];
        return o;
      }, []) : defaultVariants,
      compoundVariants,
      ...hasSlots && { slots }
    },
    {
      twMerge: (_a = opts.twMerge) != null ? _a : true,
      twMergeConfig: (_b = opts.twMergeConfig) != null ? _b : {}
    }
  );
  const [baseProps, variantProps] = mapPropsVariants(props, customTv.variantKeys, false);
  const newProps = { ...defaultVariants, ...baseProps };
  let classNames = {};
  const result = customTv(variantProps);
  if (!hasSlots) {
    newProps.className = (0, import_clsx.default)(result, props.className);
  } else {
    Object.entries(result).forEach(([key, value]) => {
      const slotResult = value();
      if (typeof slotResult === "string") {
        classNames[key] = slotResult;
      }
    });
    Object.entries((_c = props.classNames) != null ? _c : {}).forEach(([key, value]) => {
      classNames[key] = (0, import_clsx.default)(classNames[key], value);
    });
  }
  if (Object.keys(classNames).length !== 0) {
    newProps.classNames = classNames;
  }
  return newProps;
}
function extendVariants(BaseComponent, styles = {}, opts = {}) {
  const { variants, defaultVariants, compoundVariants } = styles || {};
  const slots = getSlots(variants);
  const hasSlots = typeof slots === "object" && Object.keys(slots).length !== 0;
  const ForwardedComponent = React.forwardRef((originalProps = {}, ref) => {
    const newProps = React.useMemo(
      () => getClassNamesWithProps(
        {
          slots,
          variants,
          compoundVariants,
          props: originalProps,
          defaultVariants,
          hasSlots,
          opts
        },
        [originalProps]
      )
    );
    return React.createElement(BaseComponent, { ...originalProps, ...newProps, ref });
  });
  if (BaseComponent.getCollectionNode) {
    ForwardedComponent.getCollectionNode = (itemProps) => {
      const newProps = getClassNamesWithProps({
        slots,
        variants,
        compoundVariants,
        props: itemProps,
        defaultVariants,
        hasSlots,
        opts
      });
      return BaseComponent.getCollectionNode({ ...itemProps, ...newProps });
    };
  }
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;
  return ForwardedComponent;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extendVariants
});
