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

// src/colors/index.ts
var colors_exports = {};
__export(colors_exports, {
  colors: () => colors,
  commonColors: () => commonColors,
  semanticColors: () => semanticColors
});
module.exports = __toCommonJS(colors_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colors,
  commonColors,
  semanticColors
});
