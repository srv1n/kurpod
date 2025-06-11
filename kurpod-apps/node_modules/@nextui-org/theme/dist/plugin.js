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

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  nextui: () => nextui
});
module.exports = __toCommonJS(plugin_exports);
var import_color = __toESM(require("color"));
var import_plugin = __toESM(require("tailwindcss/plugin.js"));
var import_deepmerge = __toESM(require("deepmerge"));
var import_shared_utils = require("@nextui-org/shared-utils");

// src/colors/blue.ts
var blue = {
  50: "#e6f1fe",
  100: "#cce3fd",
  200: "#99c7fb",
  300: "#66aaf9",
  400: "#338ef7",
  500: "#006FEE",
  600: "#005bc4",
  700: "#004493",
  800: "#002e62",
  900: "#001731"
};

// src/colors/green.ts
var green = {
  50: "#e8faf0",
  100: "#d1f4e0",
  200: "#a2e9c1",
  300: "#74dfa2",
  400: "#45d483",
  500: "#17c964",
  600: "#12a150",
  700: "#0e793c",
  800: "#095028",
  900: "#052814"
};

// src/colors/pink.ts
var pink = {
  50: "#ffedfa",
  100: "#ffdcf5",
  200: "#ffb8eb",
  300: "#ff95e1",
  400: "#ff71d7",
  500: "#ff4ecd",
  600: "#cc3ea4",
  700: "#992f7b",
  800: "#661f52",
  900: "#331029"
};

// src/colors/purple.ts
var purple = {
  50: "#f2eafa",
  100: "#e4d4f4",
  200: "#c9a9e9",
  300: "#ae7ede",
  400: "#9353d3",
  500: "#7828c8",
  600: "#6020a0",
  700: "#481878",
  800: "#301050",
  900: "#180828"
};

// src/colors/red.ts
var red = {
  50: "#fee7ef",
  100: "#fdd0df",
  200: "#faa0bf",
  300: "#f871a0",
  400: "#f54180",
  500: "#f31260",
  600: "#c20e4d",
  700: "#920b3a",
  800: "#610726",
  900: "#310413"
};

// src/colors/yellow.ts
var yellow = {
  50: "#fefce8",
  100: "#fdedd3",
  200: "#fbdba7",
  300: "#f9c97c",
  400: "#f7b750",
  500: "#f5a524",
  600: "#c4841d",
  700: "#936316",
  800: "#62420e",
  900: "#312107"
};

// src/colors/cyan.ts
var cyan = {
  50: "#F0FCFF",
  100: "#E6FAFE",
  200: "#D7F8FE",
  300: "#C3F4FD",
  400: "#A5EEFD",
  500: "#7EE7FC",
  600: "#06B7DB",
  700: "#09AACD",
  800: "#0E8AAA",
  900: "#053B48"
};

// src/colors/zinc.ts
var zinc = {
  "50": "#fafafa",
  "100": "#f4f4f5",
  "200": "#e4e4e7",
  "300": "#d4d4d8",
  "400": "#a1a1aa",
  "500": "#71717a",
  "600": "#52525b",
  "700": "#3f3f46",
  "800": "#27272a",
  "900": "#18181b"
};

// src/colors/common.ts
var commonColors = {
  white: "#ffffff",
  black: "#000000",
  blue,
  green,
  pink,
  purple,
  red,
  yellow,
  cyan,
  zinc
};

// src/colors/semantic.ts
var import_color2k = require("color2k");

// src/utils/object.ts
var import_flat = __toESM(require("flat"));
function swapColorValues(colors2) {
  const swappedColors = {};
  const keys = Object.keys(colors2);
  const length = keys.length;
  for (let i = 0; i < length / 2; i++) {
    const key1 = keys[i];
    const key2 = keys[length - 1 - i];
    swappedColors[key1] = colors2[key2];
    swappedColors[key2] = colors2[key1];
  }
  if (length % 2 !== 0) {
    const middleKey = keys[Math.floor(length / 2)];
    swappedColors[middleKey] = colors2[middleKey];
  }
  return swappedColors;
}
function removeDefaultKeys(obj) {
  const newObj = {};
  for (const key in obj) {
    if (key.endsWith("-DEFAULT")) {
      newObj[key.replace("-DEFAULT", "")] = obj[key];
      continue;
    }
    newObj[key] = obj[key];
  }
  return newObj;
}
var flattenThemeObject = (obj) => removeDefaultKeys(
  (0, import_flat.default)(obj, {
    safe: true,
    delimiter: "-"
  })
);

// src/colors/semantic.ts
var base = {
  light: {
    background: {
      DEFAULT: "#FFFFFF"
    },
    foreground: {
      ...commonColors.zinc,
      DEFAULT: "#11181C"
    },
    divider: {
      DEFAULT: "rgba(17, 17, 17, 0.15)"
    },
    focus: {
      DEFAULT: commonColors.blue[500]
    },
    overlay: {
      DEFAULT: "#000000"
    },
    content1: {
      DEFAULT: "#FFFFFF",
      foreground: "#11181C"
    },
    content2: {
      DEFAULT: commonColors.zinc[100],
      foreground: commonColors.zinc[800]
    },
    content3: {
      DEFAULT: commonColors.zinc[200],
      foreground: commonColors.zinc[700]
    },
    content4: {
      DEFAULT: commonColors.zinc[300],
      foreground: commonColors.zinc[600]
    }
  },
  dark: {
    background: {
      DEFAULT: "#000000"
    },
    foreground: {
      ...swapColorValues(commonColors.zinc),
      DEFAULT: "#ECEDEE"
    },
    focus: {
      DEFAULT: commonColors.blue[500]
    },
    overlay: {
      DEFAULT: "#000000"
    },
    divider: {
      DEFAULT: "rgba(255, 255, 255, 0.15)"
    },
    content1: {
      DEFAULT: commonColors.zinc[900],
      foreground: commonColors.zinc[50]
    },
    content2: {
      DEFAULT: commonColors.zinc[800],
      foreground: commonColors.zinc[100]
    },
    content3: {
      DEFAULT: commonColors.zinc[700],
      foreground: commonColors.zinc[200]
    },
    content4: {
      DEFAULT: commonColors.zinc[600],
      foreground: commonColors.zinc[300]
    }
  }
};
var themeColorsLight = {
  ...base.light,
  default: {
    ...commonColors.zinc,
    foreground: (0, import_color2k.readableColor)(commonColors.zinc[300]),
    DEFAULT: commonColors.zinc[300]
  },
  primary: {
    ...commonColors.blue,
    foreground: (0, import_color2k.readableColor)(commonColors.blue[500]),
    DEFAULT: commonColors.blue[500]
  },
  secondary: {
    ...commonColors.purple,
    foreground: (0, import_color2k.readableColor)(commonColors.purple[500]),
    DEFAULT: commonColors.purple[500]
  },
  success: {
    ...commonColors.green,
    foreground: (0, import_color2k.readableColor)(commonColors.green[500]),
    DEFAULT: commonColors.green[500]
  },
  warning: {
    ...commonColors.yellow,
    foreground: (0, import_color2k.readableColor)(commonColors.yellow[500]),
    DEFAULT: commonColors.yellow[500]
  },
  danger: {
    ...commonColors.red,
    foreground: commonColors.white,
    DEFAULT: commonColors.red[500]
  }
};
var themeColorsDark = {
  ...base.dark,
  default: {
    ...swapColorValues(commonColors.zinc),
    foreground: (0, import_color2k.readableColor)(commonColors.zinc[700]),
    DEFAULT: commonColors.zinc[700]
  },
  primary: {
    ...swapColorValues(commonColors.blue),
    foreground: (0, import_color2k.readableColor)(commonColors.blue[500]),
    DEFAULT: commonColors.blue[500]
  },
  secondary: {
    ...swapColorValues(commonColors.purple),
    foreground: (0, import_color2k.readableColor)(commonColors.purple[400]),
    DEFAULT: commonColors.purple[400]
  },
  success: {
    ...swapColorValues(commonColors.green),
    foreground: (0, import_color2k.readableColor)(commonColors.green[500]),
    DEFAULT: commonColors.green[500]
  },
  warning: {
    ...swapColorValues(commonColors.yellow),
    foreground: (0, import_color2k.readableColor)(commonColors.yellow[500]),
    DEFAULT: commonColors.yellow[500]
  },
  danger: {
    ...swapColorValues(commonColors.red),
    foreground: commonColors.white,
    DEFAULT: commonColors.red[500]
  }
};
var semanticColors = {
  light: themeColorsLight,
  dark: themeColorsDark
};

// src/colors/index.ts
var colors = {
  ...commonColors,
  ...semanticColors
};

// src/animations/index.ts
var animations = {
  animation: {
    "drip-expand": "drip-expand 420ms linear",
    "spinner-ease-spin": "spinner-spin 0.8s ease infinite",
    "spinner-linear-spin": "spinner-spin 0.8s linear infinite",
    "appearance-in": "appearance-in 250ms ease-out normal both",
    "appearance-out": "appearance-out 60ms ease-in normal both",
    "indeterminate-bar": "indeterminate-bar 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite normal none running"
  },
  keyframes: {
    shimmer: {
      "100%": {
        transform: "translateX(100%)"
      }
    },
    "spinner-spin": {
      "0%": {
        transform: "rotate(0deg)"
      },
      "100%": {
        transform: "rotate(360deg)"
      }
    },
    "drip-expand": {
      "0%": {
        opacity: "0.2",
        transform: "scale(0)"
      },
      "100%": {
        opacity: "0",
        transform: "scale(2)"
      }
    },
    "appearance-in": {
      "0%": {
        opacity: "0",
        transform: "translateZ(0)  scale(0.95)"
      },
      "60%": {
        opacity: "0.75",
        backfaceVisibility: "hidden",
        webkitFontSmoothing: "antialiased",
        transform: "translateZ(0) scale(1.05)"
      },
      "100%": {
        opacity: "1",
        transform: "translateZ(0) scale(1)"
      }
    },
    "appearance-out": {
      "0%": {
        opacity: "1",
        transform: "scale(1)"
      },
      "100%": {
        opacity: "0",
        transform: "scale(0.85)"
      }
    },
    "indeterminate-bar": {
      "0%": {
        transform: "translateX(-50%) scaleX(0.2)"
      },
      "100%": {
        transform: "translateX(100%) scaleX(1)"
      }
    }
  }
};

// src/utilities/transition.ts
var DEFAULT_TRANSITION_DURATION = "250ms";
var transition_default = {
  ".transition-background": {
    "transition-property": "background",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-colors-opacity": {
    "transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-width": {
    "transition-property": "width",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-height": {
    "transition-property": "height",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-size": {
    "transition-property": "width, height",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-left": {
    "transition-property": "left",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-transform-opacity": {
    "transition-property": "transform, opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-transform-background": {
    "transition-property": "transform, background",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-transform-colors": {
    "transition-property": "transform, color, background, background-color, border-color, text-decoration-color, fill, stroke",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  },
  ".transition-transform-colors-opacity": {
    "transition-property": "transform, color, background, background-color, border-color, text-decoration-color, fill, stroke, opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION
  }
};

// src/utilities/custom.ts
var custom_default = {
  ".leading-inherit": {
    "line-height": "inherit"
  },
  ".bg-img-inherit": {
    "background-image": "inherit"
  },
  ".bg-clip-inherit": {
    "background-clip": "inherit"
  },
  ".text-fill-inherit": {
    "-webkit-text-fill-color": "inherit"
  },
  ".tap-highlight-transparent": {
    "-webkit-tap-highlight-color": "transparent"
  },
  ".input-search-cancel-button-none": {
    "&::-webkit-search-cancel-button": {
      "-webkit-appearance": "none"
    }
  }
};

// src/utilities/scrollbar-hide.ts
var scrollbar_hide_default = {
  ".scrollbar-hide": {
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  ".scrollbar-default": {
    "-ms-overflow-style": "auto",
    "scrollbar-width": "auto",
    "&::-webkit-scrollbar": {
      display: "block"
    }
  }
};

// src/utilities/index.ts
var utilities = {
  ...custom_default,
  ...transition_default,
  ...scrollbar_hide_default
};

// src/utils/theme.ts
var isBaseTheme = (theme) => theme === "light" || theme === "dark";

// src/default-layout.ts
var defaultLayout = {
  dividerWeight: "1px",
  disabledOpacity: ".5",
  fontSize: {
    tiny: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem"
  },
  lineHeight: {
    tiny: "1rem",
    small: "1.25rem",
    medium: "1.5rem",
    large: "1.75rem"
  },
  radius: {
    small: "8px",
    medium: "12px",
    large: "14px"
  },
  borderWidth: {
    small: "1px",
    medium: "2px",
    large: "3px"
  },
  boxShadow: {
    small: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    medium: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    large: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)"
  }
};
var lightLayout = {
  hoverOpacity: ".8"
};
var darkLayout = {
  hoverOpacity: ".9",
  boxShadow: {
    small: "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
    medium: "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
    large: "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)"
  }
};

// src/utils/classes.ts
var baseStyles = (prefix) => ({
  color: `hsl(var(--${prefix}-foreground))`,
  backgroundColor: `hsl(var(--${prefix}-background))`
});

// src/plugin.ts
var DEFAULT_PREFIX = "nextui";
var parsedColorsCache = {};
var resolveConfig = (themes = {}, defaultTheme, prefix) => {
  const resolved = {
    variants: [],
    utilities: {},
    colors: {}
  };
  for (const [themeName, { extend, layout, colors: colors2 }] of Object.entries(themes)) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;
    const scheme = themeName === "light" || themeName === "dark" ? themeName : extend;
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }
    resolved.utilities[cssSelector] = scheme ? {
      "color-scheme": scheme
    } : {};
    const flatColors = flattenThemeObject(colors2);
    const flatLayout = layout ? (0, import_shared_utils.mapKeys)(layout, (_, key) => (0, import_shared_utils.kebabCase)(key)) : {};
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`]
    });
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue)
        return;
      try {
        const parsedColor = parsedColorsCache[colorValue] || (0, import_color.default)(colorValue).hsl().round(2).array();
        parsedColorsCache[colorValue] = parsedColor;
        const [h, s, l, defaultAlphaValue] = parsedColor;
        const nextuiColorVariable = `--${prefix}-${colorName}`;
        const nextuiOpacityVariable = `--${prefix}-${colorName}-opacity`;
        resolved.utilities[cssSelector][nextuiColorVariable] = `${h} ${s}% ${l}%`;
        if (typeof defaultAlphaValue === "number") {
          resolved.utilities[cssSelector][nextuiOpacityVariable] = defaultAlphaValue.toFixed(2);
        }
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          if (!isNaN(+opacityValue)) {
            return `hsl(var(${nextuiColorVariable}) / ${opacityValue})`;
          }
          if (opacityVariable) {
            return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, var(${opacityVariable})))`;
          }
          return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, 1))`;
        };
      } catch (error) {
        console.log("error", error == null ? void 0 : error.message);
      }
    }
    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value)
        return;
      const layoutVariablePrefix = `--${prefix}-${key}`;
      if (typeof value === "object") {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`;
          resolved.utilities[cssSelector][nestedLayoutVariable] = nestedValue;
        }
      } else {
        const formattedValue = layoutVariablePrefix.includes("opacity") && typeof value === "number" ? value.toString().replace(/^0\./, ".") : value;
        resolved.utilities[cssSelector][layoutVariablePrefix] = formattedValue;
      }
    }
  }
  return resolved;
};
var corePlugin = (themes = {}, defaultTheme, prefix, addCommonColors) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix);
  const createStripeGradient = (stripeColor, backgroundColor) => `linear-gradient(45deg,  hsl(var(--${prefix}-${stripeColor})) 25%,  hsl(var(--${prefix}-${backgroundColor})) 25%,  hsl(var(--${prefix}-${backgroundColor})) 50%,  hsl(var(--${prefix}-${stripeColor})) 50%,  hsl(var(--${prefix}-${stripeColor})) 75%,  hsl(var(--${prefix}-${backgroundColor})) 75%,  hsl(var(--${prefix}-${backgroundColor})))`;
  return (0, import_plugin.default)(
    ({ addBase, addUtilities, addVariant }) => {
      addBase({
        [":root, [data-theme]"]: {
          ...baseStyles(prefix)
        }
      });
      addUtilities({ ...resolved == null ? void 0 : resolved.utilities, ...utilities });
      resolved == null ? void 0 : resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
    },
    {
      theme: {
        extend: {
          colors: {
            ...addCommonColors ? commonColors : {},
            ...resolved == null ? void 0 : resolved.colors
          },
          scale: {
            "80": "0.8",
            "85": "0.85"
          },
          height: {
            divider: `var(--${prefix}-divider-weight)`
          },
          width: {
            divider: `var(--${prefix}-divider-weight)`
          },
          fontSize: {
            tiny: [`var(--${prefix}-font-size-tiny)`, `var(--${prefix}-line-height-tiny)`],
            small: [`var(--${prefix}-font-size-small)`, `var(--${prefix}-line-height-small)`],
            medium: [`var(--${prefix}-font-size-medium)`, `var(--${prefix}-line-height-medium)`],
            large: [`var(--${prefix}-font-size-large)`, `var(--${prefix}-line-height-large)`]
          },
          borderRadius: {
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`
          },
          opacity: {
            hover: `var(--${prefix}-hover-opacity)`,
            disabled: `var(--${prefix}-disabled-opacity)`
          },
          borderWidth: {
            small: `var(--${prefix}-border-width-small)`,
            medium: `var(--${prefix}-border-width-medium)`,
            large: `var(--${prefix}-border-width-large)`,
            1: "1px",
            1.5: "1.5px",
            3: "3px",
            5: "5px"
          },
          boxShadow: {
            small: `var(--${prefix}-box-shadow-small)`,
            medium: `var(--${prefix}-box-shadow-medium)`,
            large: `var(--${prefix}-box-shadow-large)`
          },
          backgroundSize: {
            "stripe-size": "1.25rem 1.25rem"
          },
          backgroundImage: {
            "stripe-gradient-default": createStripeGradient("default-200", "default-400"),
            "stripe-gradient-primary": createStripeGradient("primary-200", "primary"),
            "stripe-gradient-secondary": createStripeGradient("secondary-200", "secondary"),
            "stripe-gradient-success": createStripeGradient("success-200", "success"),
            "stripe-gradient-warning": createStripeGradient("warning-200", "warning"),
            "stripe-gradient-danger": createStripeGradient("danger-200", "danger")
          },
          transitionDuration: {
            0: "0ms",
            250: "250ms",
            400: "400ms",
            DEFAULT: DEFAULT_TRANSITION_DURATION
          },
          transitionTimingFunction: {
            "soft-spring": "cubic-bezier(0.155, 1.105, 0.295, 1.12)"
          },
          ...animations
        }
      }
    }
  );
};
var nextui = (config = {}) => {
  var _a, _b, _c, _d;
  const {
    themes: themeObject = {},
    defaultTheme = "light",
    layout: userLayout,
    defaultExtendTheme = "light",
    prefix: defaultPrefix = DEFAULT_PREFIX,
    addCommonColors = false
  } = config;
  const userLightColors = ((_a = themeObject == null ? void 0 : themeObject.light) == null ? void 0 : _a.colors) || {};
  const userDarkColors = ((_b = themeObject == null ? void 0 : themeObject.dark) == null ? void 0 : _b.colors) || {};
  const defaultLayoutObj = userLayout && typeof userLayout === "object" ? (0, import_deepmerge.default)(defaultLayout, userLayout) : defaultLayout;
  const baseLayouts = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout
    }
  };
  let otherThemes = (0, import_shared_utils.omit)(themeObject, ["light", "dark"]) || {};
  Object.entries(otherThemes).forEach(([themeName, { extend, colors: colors2, layout }]) => {
    const baseTheme = extend && isBaseTheme(extend) ? extend : defaultExtendTheme;
    if (colors2 && typeof colors2 === "object") {
      otherThemes[themeName].colors = (0, import_deepmerge.default)(semanticColors[baseTheme], colors2);
    }
    if (layout && typeof layout === "object") {
      otherThemes[themeName].layout = (0, import_deepmerge.default)(
        extend ? baseLayouts[extend] : defaultLayoutObj,
        layout
      );
    }
  });
  const light = {
    layout: (0, import_deepmerge.default)(baseLayouts.light, ((_c = themeObject == null ? void 0 : themeObject.light) == null ? void 0 : _c.layout) || {}),
    colors: (0, import_deepmerge.default)(semanticColors.light, userLightColors)
  };
  const dark = {
    layout: (0, import_deepmerge.default)(baseLayouts.dark, ((_d = themeObject == null ? void 0 : themeObject.dark) == null ? void 0 : _d.layout) || {}),
    colors: (0, import_deepmerge.default)(semanticColors.dark, userDarkColors)
  };
  const themes = {
    light,
    dark,
    ...otherThemes
  };
  return corePlugin(themes, defaultTheme, defaultPrefix, addCommonColors);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nextui
});
