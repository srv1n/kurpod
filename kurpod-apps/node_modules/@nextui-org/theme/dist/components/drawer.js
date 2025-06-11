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

// src/components/drawer.ts
var drawer_exports = {};
__export(drawer_exports, {
  drawer: () => drawer
});
module.exports = __toCommonJS(drawer_exports);

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

// src/components/drawer.ts
var drawer = tv({
  slots: {
    base: ["absolute", "m-0", "sm:m-0", "overflow-y-auto"]
  },
  variants: {
    size: {
      xs: {
        base: "max-w-xs max-h-[20rem]"
      },
      sm: {
        base: "max-w-sm max-h-[24rem]"
      },
      md: {
        base: "max-w-md max-h-[28rem]"
      },
      lg: {
        base: "max-w-lg max-h-[32rem]"
      },
      xl: {
        base: "max-w-xl max-h-[36rem]"
      },
      "2xl": {
        base: "max-w-2xl max-h-[42rem]"
      },
      "3xl": {
        base: "max-w-3xl max-h-[48rem]"
      },
      "4xl": {
        base: "max-w-4xl max-h-[56rem]"
      },
      "5xl": {
        base: "max-w-5xl max-h-[64rem]"
      },
      full: {
        base: "max-w-full max-h-full h-[100dvh] !rounded-none"
      }
    },
    placement: {
      top: {
        base: "inset-x-0 top-0 max-w-[none] rounded-t-none"
      },
      right: {
        base: "inset-y-0 right-0 max-h-[none] rounded-r-none"
      },
      bottom: {
        base: "inset-x-0 bottom-0 max-w-[none] rounded-b-none"
      },
      left: {
        base: "inset-y-0 left-0 max-h-[none] rounded-l-none"
      }
    }
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  drawer
});
