import {
  twMergeConfig
} from "./chunk-GIXI35A3.mjs";

// src/utils/tv.ts
import { tv as tvBase } from "tailwind-variants";
var tv = (options, config) => {
  var _a, _b, _c;
  return tvBase(options, {
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

export {
  tv
};
