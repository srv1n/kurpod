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

// src/components/input-otp.ts
var input_otp_exports = {};
__export(input_otp_exports, {
  inputOtp: () => inputOtp
});
module.exports = __toCommonJS(input_otp_exports);

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

// src/components/input-otp.ts
var inputOtp = tv({
  slots: {
    base: ["relative", "flex", "flex-col", "w-fit"],
    wrapper: ["group", "flex items-center", "has-[:disabled]:opacity-60"],
    input: [
      "absolute",
      "inset-0",
      "border-none",
      "outline-none",
      "bg-transparent",
      "text-transparent"
    ],
    segmentWrapper: ["inline-flex", "gap-x-1", "py-2"],
    segment: [
      "h-10",
      "w-10",
      "font-semibold",
      "flex",
      "justify-center",
      "items-center",
      "border-default-200",
      "data-[active=true]:border-default-400",
      "data-[active=true]:scale-110",
      "shadow-sm",
      "hover:bg-danger",
      ...dataFocusVisibleClasses
    ],
    passwordChar: ["w-1", "h-1", "bg-default-800", "rounded-full"],
    caret: [
      "animate-[appearance-in_1s_infinite]",
      "font-extralight",
      "h-full",
      "w-full",
      "flex",
      "justify-center",
      "items-center",
      "text-2xl",
      "h-[50%]",
      "w-px",
      "bg-foreground"
    ],
    helperWrapper: ["text-tiny", "mt-0.5", "font-extralight", ""],
    errorMessage: ["text-tiny text-danger w-full"],
    description: ["text-tiny text-foreground-400"]
  },
  variants: {
    variant: {
      flat: {
        segment: ["border-transparent", "bg-default-100", "data-[active=true]:bg-default-200"]
      },
      faded: {
        segment: ["bg-default-100", "border-medium"]
      },
      bordered: {
        segment: ["border-medium"]
      },
      underlined: {
        segment: [
          "shadow-none",
          "relative",
          "box-border",
          "!rounded-none",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "data-[active=true]:border-default-300",
          "data-[active=true]:after:w-full",
          "data-[active=true]:scale-100"
        ]
      }
    },
    isDisabled: {
      true: {
        segment: "opacity-disabled pointer-events-none",
        input: "pointer-events-none"
      }
    },
    isInvalid: {
      true: {}
    },
    isReadOnly: {
      true: {
        caret: "bg-transparent",
        segment: "transition-none data-[active=true]:scale-100"
      }
    },
    fullWidth: {
      true: {
        base: "w-full"
      }
    },
    radius: {
      none: {
        segment: "rounded-none"
      },
      sm: {
        segment: "rounded-sm"
      },
      md: {
        segment: "rounded-md"
      },
      lg: {
        segment: "rounded-lg"
      },
      full: {
        segment: "rounded-full"
      }
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
        segment: "h-8 min-h-8 w-8 min-w-8 text-small"
      },
      md: {
        segment: "h-10 min-h-10 w-10 min-w-10 text-small"
      },
      lg: {
        segment: "h-12 min-h-12 w-12 min-w-12 text-medium"
      }
    },
    disableAnimation: {
      true: {
        segment: "transition-none",
        caret: "animate-none"
      },
      false: {
        segment: "transition duration-150"
      }
    }
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    radius: "md",
    size: "md"
  },
  compoundVariants: [
    {
      variant: "flat",
      color: "default",
      class: {
        segment: ["bg-default-100", "data-[active=true]:bg-default-200"]
      }
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        segment: ["bg-primary-100", "data-[active=true]:bg-primary-200", "text-primary"],
        caret: ["bg-primary"],
        passwordChar: ["bg-primary"]
      }
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        segment: ["bg-secondary-100", "data-[active=true]:bg-secondary-200", "text-secondary"],
        caret: ["bg-secondary"],
        passwordChar: ["bg-secondary"]
      }
    },
    {
      variant: "flat",
      color: "success",
      class: {
        segment: ["bg-success-100", "data-[active=true]:bg-success-200", "text-success"],
        caret: ["bg-success"],
        passwordChar: ["bg-success"]
      }
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        segment: ["bg-warning-100", "data-[active=true]:bg-warning-200", "text-warning"],
        caret: ["bg-warning"],
        passwordChar: ["bg-warning"]
      }
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        segment: ["bg-danger-100", "data-[active=true]:bg-danger-200", "text-danger"],
        caret: ["bg-danger"],
        passwordChar: ["bg-danger"]
      }
    },
    {
      variant: "faded",
      color: "default",
      class: {
        segment: ""
      }
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        segment: [
          "bg-primary-100",
          "text-primary",
          "border-primary-200",
          "data-[active=true]:border-primary"
        ],
        caret: ["bg-primary"],
        passwordChar: ["bg-primary"]
      }
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        segment: [
          "bg-secondary-100",
          "text-secondary",
          "border-secondary-200",
          "data-[active=true]:border-secondary"
        ],
        caret: ["bg-secondary"],
        passwordChar: ["bg-secondary"]
      }
    },
    {
      variant: "faded",
      color: "success",
      class: {
        segment: [
          "bg-success-100",
          "text-success",
          "border-success-200",
          "data-[active=true]:border-success"
        ],
        caret: ["bg-success"],
        passwordChar: ["bg-success"]
      }
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        segment: [
          "bg-warning-100",
          "text-warning",
          "border-warning-200",
          "data-[active=true]:border-warning"
        ],
        caret: ["bg-warning"],
        passwordChar: ["bg-warning"]
      }
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        segment: [
          "bg-danger-100",
          "text-danger",
          "border-danger-200",
          "data-[active=true]:border-danger"
        ],
        caret: ["bg-danger"],
        passwordChar: ["bg-danger"]
      }
    },
    {
      variant: "bordered",
      color: "default",
      class: {
        segment: "data-[has-value=true]:text-default-foreground data-[active=true]:border-foreground"
      }
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        segment: ["border-primary-200", "text-primary", "data-[active=true]:border-primary"],
        caret: ["bg-primary"],
        passwordChar: ["bg-primary"]
      }
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        segment: ["border-secondary-200", "text-secondary", "data-[active=true]:border-secondary"],
        caret: ["bg-secondary"],
        passwordChar: ["bg-secondary"]
      }
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        segment: ["border-success-200", "text-success", "data-[active=true]:border-success"],
        caret: ["bg-success"],
        passwordChar: ["bg-success"]
      }
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        segment: ["border-warning-200", "text-warning", "data-[active=true]:border-warning"],
        caret: ["bg-warning"],
        passwordChar: ["bg-warning"]
      }
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        segment: ["border-danger-200", "text-danger", "data-[active=true]:border-danger"],
        caret: ["bg-danger"],
        passwordChar: ["bg-danger"]
      }
    },
    {
      variant: "underlined",
      color: "default",
      class: {
        segment: "data-[has-value=true]:text-default-foreground after:bg-foreground"
      }
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        segment: ["border-primary-200", "text-primary", "after:bg-primary"],
        caret: ["bg-primary"],
        passwordChar: ["bg-primary"]
      }
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        segment: ["border-secondary-200", "text-secondary", "after:bg-secondary"],
        caret: ["bg-secondary"],
        passwordChar: ["bg-secondary"]
      }
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        segment: ["border-success-200", "text-success", "after:bg-success"],
        caret: ["bg-success"],
        passwordChar: ["bg-success"]
      }
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        segment: ["border-warning-200", "text-warning", "after:bg-warning"],
        caret: ["bg-warning"],
        passwordChar: ["bg-warning"]
      }
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        segment: ["border-danger-200", "text-danger", "after:bg-danger"],
        caret: ["bg-danger"],
        passwordChar: ["bg-danger"]
      }
    },
    {
      variant: "flat",
      isInvalid: true,
      class: {
        segment: ["bg-danger-50", "data-[active=true]:bg-danger-100", "text-danger"],
        caret: ["bg-danger"]
      }
    },
    {
      variant: "faded",
      isInvalid: true,
      class: {
        segment: [
          "bg-danger-50",
          "text-danger",
          "border-danger-200",
          "data-[active=true]:border-danger-400"
        ],
        caret: ["bg-danger"]
      }
    },
    {
      variant: "bordered",
      isInvalid: true,
      class: {
        segment: ["border-danger-200", "text-danger", "data-[active=true]:border-danger-400"],
        caret: ["bg-danger"]
      }
    },
    {
      variant: "underlined",
      isInvalid: true,
      class: {
        segment: ["border-danger-200", "text-danger", "data-[active=true]:after:bg-danger-400"],
        caret: ["bg-danger"]
      }
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        segment: "after:transition-width motion-reduce:after:transition-none"
      }
    }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  inputOtp
});
