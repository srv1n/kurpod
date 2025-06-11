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

// src/components/snippet.ts
var snippet_exports = {};
__export(snippet_exports, {
  snippet: () => snippet
});
module.exports = __toCommonJS(snippet_exports);

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

// src/utils/variants.ts
var solid = {
  default: "bg-default text-default-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  foreground: "bg-foreground text-background"
};
var shadow = {
  default: "shadow-lg shadow-default/50 bg-default text-default-foreground",
  primary: "shadow-lg shadow-primary/40 bg-primary text-primary-foreground",
  secondary: "shadow-lg shadow-secondary/40 bg-secondary text-secondary-foreground",
  success: "shadow-lg shadow-success/40 bg-success text-success-foreground",
  warning: "shadow-lg shadow-warning/40 bg-warning text-warning-foreground",
  danger: "shadow-lg shadow-danger/40 bg-danger text-danger-foreground",
  foreground: "shadow-lg shadow-foreground/40 bg-foreground text-background"
};
var bordered = {
  default: "bg-transparent border-default text-foreground",
  primary: "bg-transparent border-primary text-primary",
  secondary: "bg-transparent border-secondary text-secondary",
  success: "bg-transparent border-success text-success",
  warning: "bg-transparent border-warning text-warning",
  danger: "bg-transparent border-danger text-danger",
  foreground: "bg-transparent border-foreground text-foreground"
};
var flat = {
  default: "bg-default/40 text-default-700",
  primary: "bg-primary/20 text-primary-600",
  secondary: "bg-secondary/20 text-secondary-600",
  success: "bg-success/20 text-success-700 dark:text-success",
  warning: "bg-warning/20 text-warning-700 dark:text-warning",
  danger: "bg-danger/20 text-danger-600 dark:text-danger-500",
  foreground: "bg-foreground/10 text-foreground"
};
var faded = {
  default: "border-default bg-default-100 text-default-foreground",
  primary: "border-default bg-default-100 text-primary",
  secondary: "border-default bg-default-100 text-secondary",
  success: "border-default bg-default-100 text-success",
  warning: "border-default bg-default-100 text-warning",
  danger: "border-default bg-default-100 text-danger",
  foreground: "border-default bg-default-100 text-foreground"
};
var light = {
  default: "bg-transparent text-default-foreground",
  primary: "bg-transparent text-primary",
  secondary: "bg-transparent text-secondary",
  success: "bg-transparent text-success",
  warning: "bg-transparent text-warning",
  danger: "bg-transparent text-danger",
  foreground: "bg-transparent text-foreground"
};
var ghost = {
  default: "border-default text-default-foreground",
  primary: "border-primary text-primary",
  secondary: "border-secondary text-secondary",
  success: "border-success text-success",
  warning: "border-warning text-warning",
  danger: "border-danger text-danger",
  foreground: "border-foreground text-foreground hover:!bg-foreground"
};
var colorVariants = {
  solid,
  shadow,
  bordered,
  flat,
  faded,
  light,
  ghost
};

// src/components/snippet.ts
var snippet = tv({
  slots: {
    base: "inline-flex items-center justify-between h-fit rounded-large gap-2",
    pre: "bg-transparent text-inherit font-mono font-normal inline-block whitespace-nowrap",
    content: "flex flex-col",
    symbol: "select-none",
    copyButton: [
      "group",
      "relative",
      "z-10",
      "text-large",
      "text-inherit",
      "data-[hover=true]:bg-transparent"
    ],
    copyIcon: [
      "absolute text-inherit opacity-100 scale-100 group-data-[copied=true]:opacity-0 group-data-[copied=true]:scale-50"
    ],
    checkIcon: [
      "absolute text-inherit opacity-0 scale-50 group-data-[copied=true]:opacity-100 group-data-[copied=true]:scale-100"
    ]
  },
  variants: {
    variant: {
      flat: "",
      solid: "",
      bordered: "border-medium bg-transparent",
      shadow: ""
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {}
    },
    size: {
      sm: {
        base: "px-1.5 py-0.5 text-tiny rounded-small"
      },
      md: {
        base: "px-3 py-1.5 text-small rounded-medium"
      },
      lg: {
        base: "px-4 py-2 text-medium rounded-large"
      }
    },
    radius: {
      none: {
        base: "rounded-none"
      },
      sm: {
        base: "rounded-small"
      },
      md: {
        base: "rounded-medium"
      },
      lg: {
        base: "rounded-large"
      }
    },
    fullWidth: {
      true: {
        base: "w-full"
      }
    },
    disableAnimation: {
      true: {},
      false: {
        copyIcon: "transition-transform-opacity",
        checkIcon: "transition-transform-opacity"
      }
    }
  },
  defaultVariants: {
    color: "default",
    variant: "flat",
    size: "md",
    fullWidth: false
  },
  compoundVariants: [
    {
      variant: ["solid", "shadow"],
      color: "default",
      class: {
        copyButton: "data-[focus-visible]:outline-default-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "primary",
      class: {
        copyButton: "data-[focus-visible]:outline-primary-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "secondary",
      class: {
        copyButton: "data-[focus-visible]:outline-secondary-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "success",
      class: {
        copyButton: "data-[focus-visible]:outline-success-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "warning",
      class: {
        copyButton: "data-[focus-visible]:outline-warning-foreground"
      }
    },
    {
      variant: ["solid", "shadow"],
      color: "danger",
      class: {
        copyButton: "data-[focus-visible]:outline-danger-foreground"
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        base: colorVariants.flat.default
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: colorVariants.flat.primary
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: colorVariants.flat.secondary
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: colorVariants.flat.success
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: colorVariants.flat.warning
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: colorVariants.flat.danger
      }
    },
    {
      variant: "solid",
      color: "default",
      class: {
        base: colorVariants.solid.default
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        base: colorVariants.shadow.default
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: colorVariants.shadow.primary
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: colorVariants.shadow.secondary
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: colorVariants.shadow.success
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: colorVariants.shadow.warning
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: colorVariants.shadow.danger
      }
    },
    {
      variant: "bordered",
      color: "default",
      class: {
        base: colorVariants.bordered.default
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: colorVariants.bordered.primary
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: colorVariants.bordered.secondary
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: colorVariants.bordered.success
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: colorVariants.bordered.warning
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: colorVariants.bordered.danger
      }
    }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  snippet
});
