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

// src/components/badge.ts
var badge_exports = {};
__export(badge_exports, {
  badge: () => badge
});
module.exports = __toCommonJS(badge_exports);

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

// src/components/badge.ts
var badge = tv({
  slots: {
    base: ["relative", "inline-flex", "shrink-0"],
    badge: [
      "flex",
      "z-10",
      "flex-wrap",
      "absolute",
      "box-border",
      "rounded-full",
      "whitespace-nowrap",
      "place-content-center",
      "origin-center",
      "items-center",
      "text-inherit",
      "select-none",
      "font-regular",
      "scale-100",
      "opacity-100",
      "subpixel-antialiased",
      "data-[invisible=true]:scale-0",
      "data-[invisible=true]:opacity-0"
    ]
  },
  variants: {
    variant: {
      solid: {},
      flat: {},
      faded: {
        badge: "border-medium"
      },
      shadow: {}
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
        badge: "px-1 text-tiny"
      },
      md: {
        badge: "px-1 text-small"
      },
      lg: {
        badge: "px-1 text-small"
      }
    },
    placement: {
      "top-right": {},
      "top-left": {},
      "bottom-right": {},
      "bottom-left": {}
    },
    shape: {
      circle: {},
      rectangle: {}
    },
    isInvisible: {
      true: {}
    },
    isOneChar: {
      true: {
        badge: "px-0"
      }
    },
    isDot: {
      true: {}
    },
    disableAnimation: {
      true: {
        badge: "transition-none"
      },
      false: {
        badge: "transition-transform-opacity !ease-soft-spring !duration-300"
      }
    },
    showOutline: {
      true: {
        badge: "border-2 border-background"
      },
      false: {
        badge: "border-transparent border-0"
      }
    }
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    shape: "rectangle",
    placement: "top-right",
    showOutline: true,
    isInvisible: false
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: {
        badge: colorVariants.solid.default
      }
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        badge: colorVariants.solid.primary
      }
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        badge: colorVariants.solid.secondary
      }
    },
    {
      variant: "solid",
      color: "success",
      class: {
        badge: colorVariants.solid.success
      }
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        badge: colorVariants.solid.warning
      }
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        badge: colorVariants.solid.danger
      }
    },
    {
      variant: "shadow",
      color: "default",
      class: {
        badge: colorVariants.shadow.default
      }
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        badge: colorVariants.shadow.primary
      }
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        badge: colorVariants.shadow.secondary
      }
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        badge: colorVariants.shadow.success
      }
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        badge: colorVariants.shadow.warning
      }
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        badge: colorVariants.shadow.danger
      }
    },
    {
      variant: "flat",
      color: "default",
      class: {
        badge: colorVariants.flat.default
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        badge: colorVariants.flat.primary
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        badge: colorVariants.flat.secondary
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        badge: colorVariants.flat.success
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        badge: colorVariants.flat.warning
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        badge: colorVariants.flat.danger
      }
    },
    {
      variant: "faded",
      color: "default",
      class: {
        badge: colorVariants.faded.default
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        badge: colorVariants.faded.primary
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        badge: colorVariants.faded.secondary
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        badge: colorVariants.faded.success
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        badge: colorVariants.faded.warning
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        badge: colorVariants.faded.danger
      }
    },
    {
      isOneChar: true,
      size: "sm",
      class: {
        badge: "w-4 h-4 min-w-4 min-h-4"
      }
    },
    {
      isOneChar: true,
      size: "md",
      class: {
        badge: "w-5 h-5 min-w-5 min-h-5"
      }
    },
    {
      isOneChar: true,
      size: "lg",
      class: {
        badge: "w-6 h-6 min-w-6 min-h-6"
      }
    },
    {
      isDot: true,
      size: "sm",
      class: {
        badge: "w-3 h-3 min-w-3 min-h-3"
      }
    },
    {
      isDot: true,
      size: "md",
      class: {
        badge: "w-3.5 h-3.5 min-w-3.5 min-h-3.5"
      }
    },
    {
      isDot: true,
      size: "lg",
      class: {
        badge: "w-4 h-4 min-w-4 min-h-4"
      }
    },
    {
      placement: "top-right",
      shape: "rectangle",
      class: {
        badge: "top-[5%] right-[5%] translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "top-left",
      shape: "rectangle",
      class: {
        badge: "top-[5%] left-[5%] -translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "bottom-right",
      shape: "rectangle",
      class: {
        badge: "bottom-[5%] right-[5%] translate-x-1/2 translate-y-1/2"
      }
    },
    {
      placement: "bottom-left",
      shape: "rectangle",
      class: {
        badge: "bottom-[5%] left-[5%] -translate-x-1/2 translate-y-1/2"
      }
    },
    {
      placement: "top-right",
      shape: "circle",
      class: {
        badge: "top-[10%] right-[10%] translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "top-left",
      shape: "circle",
      class: {
        badge: "top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2"
      }
    },
    {
      placement: "bottom-right",
      shape: "circle",
      class: {
        badge: "bottom-[10%] right-[10%] translate-x-1/2 translate-y-1/2"
      }
    },
    {
      placement: "bottom-left",
      shape: "circle",
      class: {
        badge: "bottom-[10%] left-[10%] -translate-x-1/2 translate-y-1/2"
      }
    }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  badge
});
