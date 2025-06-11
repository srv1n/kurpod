"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/link.ts
var link_exports = {};
__export(link_exports, {
  link: () => link,
  linkAnchorClasses: () => linkAnchorClasses
});
module.exports = __toCommonJS(link_exports);

// src/utils/tv.ts
var import_tailwind_variants = require("tailwind-variants");

// src/utils/tw-merge-config.ts
var COMMON_UNITS = ["small", "medium", "large"];
var twMergeConfig = {
  theme: {
    opacity: ["disabled"],
    spacing: ["divider"],
    borderWidth: COMMON_UNITS,
    borderRadius: COMMON_UNITS
  },
  classGroups: {
    shadow: [{ shadow: COMMON_UNITS }],
    "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
    "bg-image": [
      "bg-stripe-gradient-default",
      "bg-stripe-gradient-primary",
      "bg-stripe-gradient-secondary",
      "bg-stripe-gradient-success",
      "bg-stripe-gradient-warning",
      "bg-stripe-gradient-danger"
    ]
  }
};

// src/utils/tv.ts
var tv = (options, config) => {
  var _a, _b, _c;
  return (0, import_tailwind_variants.tv)(options, {
    ...config,
    twMerge: (_a = config == null ? void 0 : config.twMerge) != null ? _a : true,
    twMergeConfig: {
      ...config == null ? void 0 : config.twMergeConfig,
      theme: {
        ...(_b = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _b.theme,
        ...twMergeConfig.theme
      },
      classGroups: {
        ...(_c = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _c.classGroups,
        ...twMergeConfig.classGroups
      }
    }
  });
};

// src/utils/classes.ts
var dataFocusVisibleClasses = [
  "outline-none",
  "data-[focus-visible=true]:z-10",
  "data-[focus-visible=true]:outline-2",
  "data-[focus-visible=true]:outline-focus",
  "data-[focus-visible=true]:outline-offset-2"
];

// src/components/link.ts
var link = tv({
  base: [
    "relative inline-flex items-center outline-none tap-highlight-transparent",
    ...dataFocusVisibleClasses
  ],
  variants: {
    size: {
      sm: "text-small",
      md: "text-medium",
      lg: "text-large"
    },
    color: {
      foreground: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger"
    },
    underline: {
      none: "no-underline",
      hover: "hover:underline",
      always: "underline",
      active: "active:underline",
      focus: "focus:underline"
    },
    isBlock: {
      true: [
        "px-2",
        "py-1",
        "hover:after:opacity-100",
        "after:content-['']",
        "after:inset-0",
        "after:opacity-0",
        "after:w-full",
        "after:h-full",
        "after:rounded-xl",
        "after:transition-background",
        "after:absolute"
      ],
      false: "hover:opacity-80 active:opacity-disabled transition-opacity"
    },
    isDisabled: {
      true: "opacity-disabled cursor-default pointer-events-none"
    },
    disableAnimation: {
      true: "after:transition-none transition-none"
    }
  },
  compoundVariants: [
    {
      isBlock: true,
      color: "foreground",
      class: "hover:after:bg-foreground/10"
    },
    {
      isBlock: true,
      color: "primary",
      class: "hover:after:bg-primary/20"
    },
    {
      isBlock: true,
      color: "secondary",
      class: "hover:after:bg-secondary/20"
    },
    {
      isBlock: true,
      color: "success",
      class: "hover:after:bg-success/20"
    },
    {
      isBlock: true,
      color: "warning",
      class: "hover:after:bg-warning/20"
    },
    {
      isBlock: true,
      color: "danger",
      class: "hover:after:bg-danger/20"
    },
    {
      underline: ["hover", "always", "active", "focus"],
      class: "underline-offset-4"
    }
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    isBlock: false,
    underline: "none",
    isDisabled: false
  }
});
var linkAnchorClasses = "flex mx-1 text-current self-center";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  link,
  linkAnchorClasses
});
