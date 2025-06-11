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

// src/components/date-picker.ts
var date_picker_exports = {};
__export(date_picker_exports, {
  datePicker: () => datePicker,
  dateRangePicker: () => dateRangePicker
});
module.exports = __toCommonJS(date_picker_exports);

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

// src/components/date-picker.ts
var datePicker = tv({
  slots: {
    base: "group w-full",
    selectorButton: "-mx-2 text-inherit",
    selectorIcon: "text-lg text-inherit pointer-events-none flex-shrink-0",
    popoverContent: "p-0 w-full",
    calendar: "w-[calc(var(--visible-months)_*_var(--calendar-width))] shadow-none",
    calendarContent: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    timeInputLabel: "font-medium",
    timeInput: "px-5 pb-4 flex-wrap gap-x-6"
  }
});
var dateRangePicker = tv({
  extend: datePicker,
  slots: {
    calendar: "group",
    bottomContent: "flex flex-col gap-y-2",
    timeInputWrapper: "flex flex-col group-data-[has-multiple-months=true]:flex-row",
    separator: "-mx-1 text-inherit"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  datePicker,
  dateRangePicker
});
