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

// src/components/accordion.ts
var accordion_exports = {};
__export(accordion_exports, {
  accordion: () => accordion,
  accordionItem: () => accordionItem
});
module.exports = __toCommonJS(accordion_exports);

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

// src/components/accordion.ts
var accordion = tv({
  base: "px-2",
  variants: {
    variant: {
      light: "",
      shadow: "px-4 shadow-medium rounded-medium bg-content1",
      bordered: "px-4 border-medium border-divider rounded-medium",
      splitted: "flex flex-col gap-2"
    },
    fullWidth: {
      true: "w-full"
    }
  },
  defaultVariants: {
    variant: "light",
    fullWidth: true
  }
});
var accordionItem = tv({
  slots: {
    base: "",
    heading: "",
    trigger: [
      "flex py-4 w-full h-full gap-3 outline-none items-center tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ],
    startContent: "flex-shrink-0",
    indicator: "text-default-400",
    titleWrapper: "flex-1 flex flex-col text-start",
    title: "text-foreground text-medium",
    subtitle: "text-small text-foreground-500 font-normal",
    content: "py-2"
  },
  variants: {
    variant: {
      splitted: {
        base: "px-4 bg-content1 shadow-medium rounded-medium"
      }
    },
    isCompact: {
      true: {
        trigger: "py-2",
        title: "text-medium",
        subtitle: "text-small",
        indicator: "text-medium",
        content: "py-1"
      }
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none"
      }
    },
    hideIndicator: {
      true: {
        indicator: "hidden"
      }
    },
    disableAnimation: {
      true: {
        content: "hidden data-[open=true]:block"
      },
      false: {
        indicator: "transition-transform",
        trigger: "transition-opacity"
      }
    },
    disableIndicatorAnimation: {
      true: {
        indicator: "transition-none"
      },
      false: {
        indicator: "rotate-0 data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90"
      }
    }
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    isDisabled: false,
    hideIndicator: false,
    disableIndicatorAnimation: false
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accordion,
  accordionItem
});
