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

// src/components/navbar.ts
var navbar_exports = {};
__export(navbar_exports, {
  navbar: () => navbar
});
module.exports = __toCommonJS(navbar_exports);

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

// src/components/navbar.ts
var navbar = tv({
  slots: {
    base: [
      "flex",
      "z-40",
      "w-full",
      "h-auto",
      "items-center",
      "justify-center",
      "data-[menu-open=true]:border-none"
    ],
    wrapper: [
      "z-40",
      "flex",
      "px-6",
      "gap-4",
      "w-full",
      "flex-row",
      "relative",
      "flex-nowrap",
      "items-center",
      "justify-between",
      "h-[var(--navbar-height)]"
    ],
    toggle: [
      "group",
      "flex",
      "items-center",
      "justify-center",
      "w-6",
      "h-full",
      "outline-none",
      "rounded-small",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ],
    srOnly: ["sr-only"],
    toggleIcon: [
      "w-full",
      "h-full",
      "pointer-events-none",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-inherit",
      "group-data-[pressed=true]:opacity-70",
      "transition-opacity",
      "before:content-['']",
      "before:block",
      "before:h-px",
      "before:w-6",
      "before:bg-current",
      "before:transition-transform",
      "before:duration-150",
      "before:-translate-y-1",
      "before:rotate-0",
      "group-data-[open=true]:before:translate-y-px",
      "group-data-[open=true]:before:rotate-45",
      "after:content-['']",
      "after:block",
      "after:h-px",
      "after:w-6",
      "after:bg-current",
      "after:transition-transform",
      "after:duration-150",
      "after:translate-y-1",
      "after:rotate-0",
      "group-data-[open=true]:after:translate-y-0",
      "group-data-[open=true]:after:-rotate-45"
    ],
    brand: [
      "flex",
      "basis-0",
      "flex-row",
      "flex-grow",
      "flex-nowrap",
      "justify-start",
      "bg-transparent",
      "items-center",
      "no-underline",
      "text-medium",
      "whitespace-nowrap",
      "box-border"
    ],
    content: [
      "flex",
      "gap-4",
      "h-full",
      "flex-row",
      "flex-nowrap",
      "items-center",
      "data-[justify=start]:justify-start",
      "data-[justify=start]:flex-grow",
      "data-[justify=start]:basis-0",
      "data-[justify=center]:justify-center",
      "data-[justify=end]:justify-end",
      "data-[justify=end]:flex-grow",
      "data-[justify=end]:basis-0"
    ],
    item: [
      "text-medium",
      "whitespace-nowrap",
      "box-border",
      "list-none",
      "data-[active=true]:font-semibold"
    ],
    menu: [
      "z-30",
      "px-6",
      "pt-2",
      "fixed",
      "flex",
      "max-w-full",
      "top-[var(--navbar-height)]",
      "inset-x-0",
      "bottom-0",
      "w-screen",
      "flex-col",
      "gap-2",
      "overflow-y-auto"
    ],
    menuItem: [
      "text-large",
      "data-[active=true]:font-semibold"
    ]
  },
  variants: {
    position: {
      static: {
        base: "static"
      },
      sticky: {
        base: "sticky top-0 inset-x-0"
      }
    },
    maxWidth: {
      sm: {
        wrapper: "max-w-[640px]"
      },
      md: {
        wrapper: "max-w-[768px]"
      },
      lg: {
        wrapper: "max-w-[1024px]"
      },
      xl: {
        wrapper: "max-w-[1280px]"
      },
      "2xl": {
        wrapper: "max-w-[1536px]"
      },
      full: {
        wrapper: "max-w-full"
      }
    },
    hideOnScroll: {
      true: {
        base: ["sticky", "top-0", "inset-x-0"]
      }
    },
    isBordered: {
      true: {
        base: ["border-b", "border-divider"]
      }
    },
    isBlurred: {
      false: {
        base: "bg-background",
        menu: "bg-background"
      },
      true: {
        base: [
          "backdrop-blur-lg",
          "data-[menu-open=true]:backdrop-blur-xl",
          "backdrop-saturate-150",
          "bg-background/70"
        ],
        menu: ["backdrop-blur-xl", "backdrop-saturate-150", "bg-background/70"]
      }
    },
    disableAnimation: {
      true: {
        menu: ["hidden", "h-[calc(100dvh_-_var(--navbar-height))]", "data-[open=true]:flex"]
      }
    }
  },
  defaultVariants: {
    maxWidth: "lg",
    position: "sticky",
    isBlurred: true
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  navbar
});
