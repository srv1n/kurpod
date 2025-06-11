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

// src/components/table.ts
var table_exports = {};
__export(table_exports, {
  table: () => table
});
module.exports = __toCommonJS(table_exports);

// src/utils/classes.ts
var dataFocusVisibleClasses = [
  "outline-none",
  "data-[focus-visible=true]:z-10",
  "data-[focus-visible=true]:outline-2",
  "data-[focus-visible=true]:outline-focus",
  "data-[focus-visible=true]:outline-offset-2"
];

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
var import_tailwind_variants = require("tailwind-variants");
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

// src/components/table.ts
var table = tv({
  slots: {
    base: "flex flex-col relative gap-4",
    wrapper: [
      "p-4",
      "z-0",
      "flex",
      "flex-col",
      "relative",
      "justify-between",
      "gap-4",
      "shadow-small",
      "bg-content1",
      "overflow-auto"
    ],
    table: "min-w-full h-auto",
    thead: "[&>tr]:first:rounded-lg",
    tbody: "",
    tr: ["group/tr", "outline-none", ...dataFocusVisibleClasses],
    th: [
      "group/th",
      "px-3",
      "h-10",
      "text-start",
      "align-middle",
      "bg-default-100",
      "whitespace-nowrap",
      "text-foreground-500",
      "text-tiny",
      "font-semibold",
      "first:rounded-s-lg",
      "last:rounded-e-lg",
      "outline-none",
      "data-[sortable=true]:cursor-pointer",
      "data-[hover=true]:text-foreground-400",
      ...dataFocusVisibleClasses
    ],
    td: [
      "py-2",
      "px-3",
      "relative",
      "align-middle",
      "whitespace-normal",
      "text-small",
      "font-normal",
      "outline-none",
      "[&>*]:z-1",
      "[&>*]:relative",
      ...dataFocusVisibleClasses,
      "before:content-['']",
      "before:absolute",
      "before:z-0",
      "before:inset-0",
      "before:opacity-0",
      "data-[selected=true]:before:opacity-100",
      "group-data-[disabled=true]/tr:text-foreground-300",
      "group-data-[disabled=true]/tr:cursor-not-allowed"
    ],
    tfoot: "",
    sortIcon: [
      "ms-2",
      "mb-px",
      "opacity-0",
      "text-inherit",
      "inline-block",
      "transition-transform-opacity",
      "data-[visible=true]:opacity-100",
      "group-data-[hover=true]/th:opacity-100",
      "data-[direction=ascending]:rotate-180"
    ],
    emptyWrapper: "text-foreground-400 align-middle text-center h-40",
    loadingWrapper: "absolute inset-0 flex items-center justify-center"
  },
  variants: {
    color: {
      default: {
        td: "before:bg-default/60 data-[selected=true]:text-default-foreground"
      },
      primary: {
        td: "before:bg-primary/20 data-[selected=true]:text-primary"
      },
      secondary: {
        td: "before:bg-secondary/20 data-[selected=true]:text-secondary"
      },
      success: {
        td: "before:bg-success/20 data-[selected=true]:text-success-600 dark:data-[selected=true]:text-success"
      },
      warning: {
        td: "before:bg-warning/20 data-[selected=true]:text-warning-600 dark:data-[selected=true]:text-warning"
      },
      danger: {
        td: "before:bg-danger/20 data-[selected=true]:text-danger dark:data-[selected=true]:text-danger-500"
      }
    },
    layout: {
      auto: {
        table: "table-auto"
      },
      fixed: {
        table: "table-fixed"
      }
    },
    radius: {
      none: {
        wrapper: "rounded-none"
      },
      sm: {
        wrapper: "rounded-small"
      },
      md: {
        wrapper: "rounded-medium"
      },
      lg: {
        wrapper: "rounded-large"
      }
    },
    shadow: {
      none: {
        wrapper: "shadow-none"
      },
      sm: {
        wrapper: "shadow-small"
      },
      md: {
        wrapper: "shadow-medium"
      },
      lg: {
        wrapper: "shadow-large"
      }
    },
    hideHeader: {
      true: {
        thead: "hidden"
      }
    },
    isStriped: {
      true: {
        td: [
          "group-data-[odd=true]/tr:before:bg-default-100",
          "group-data-[odd=true]/tr:before:opacity-100",
          "group-data-[odd=true]/tr:before:-z-10"
        ]
      }
    },
    isCompact: {
      true: {
        td: "py-1"
      },
      false: {}
    },
    isHeaderSticky: {
      true: {
        thead: "sticky top-0 z-20 [&>tr]:first:shadow-small"
      }
    },
    isSelectable: {
      true: {
        tr: "cursor-default",
        td: [
          "group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:bg-default-100",
          "group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:opacity-70"
        ]
      }
    },
    isMultiSelectable: {
      true: {
        td: [
          "group-data-[first=true]/tr:first:before:rounded-ts-lg",
          "group-data-[first=true]/tr:last:before:rounded-te-lg",
          "group-data-[middle=true]/tr:before:rounded-none",
          "group-data-[last=true]/tr:first:before:rounded-bs-lg",
          "group-data-[last=true]/tr:last:before:rounded-be-lg"
        ]
      },
      false: {
        td: ["first:before:rounded-s-lg", "last:before:rounded-e-lg"]
      }
    },
    fullWidth: {
      true: {
        base: "w-full",
        wrapper: "w-full",
        table: "w-full"
      }
    },
    align: {
      start: {
        th: "text-start",
        td: "text-start"
      },
      center: {
        th: "text-center",
        td: "text-center"
      },
      end: {
        th: "text-end",
        td: "text-end"
      }
    }
  },
  defaultVariants: {
    layout: "auto",
    shadow: "sm",
    radius: "lg",
    color: "default",
    isCompact: false,
    hideHeader: false,
    isStriped: false,
    fullWidth: true,
    align: "start"
  },
  compoundVariants: [
    {
      isStriped: true,
      color: "default",
      class: {
        td: "group-data-[odd=true]/tr:data-[selected=true]/tr:before:bg-default/60"
      }
    },
    {
      isStriped: true,
      color: "primary",
      class: {
        td: "group-data-[odd=true]/tr:data-[selected=true]/tr:before:bg-primary/20"
      }
    },
    {
      isStriped: true,
      color: "secondary",
      class: {
        td: "group-data-[odd=true]/tr:data-[selected=true]/tr:before:bg-secondary/20"
      }
    },
    {
      isStriped: true,
      color: "success",
      class: {
        td: "group-data-[odd=true]/tr:data-[selected=true]/tr:before:bg-success/20"
      }
    },
    {
      isStriped: true,
      color: "warning",
      class: {
        td: "group-data-[odd=true]/tr:data-[selected=true]/tr:before:bg-warning/20"
      }
    },
    {
      isStriped: true,
      color: "danger",
      class: {
        td: "group-data-[odd=true]/tr:data-[selected=true]/tr:before:bg-danger/20"
      }
    }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  table
});
