import {
  tv
} from "./chunk-UWE6H66T.mjs";

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

export {
  drawer
};
