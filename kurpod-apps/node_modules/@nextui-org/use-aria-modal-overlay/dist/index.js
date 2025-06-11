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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useAriaModalOverlay: () => useAriaModalOverlay
});
module.exports = __toCommonJS(src_exports);
var import_overlays = require("@react-aria/overlays");
var import_utils = require("@react-aria/utils");
var import_react = require("react");
function useAriaModalOverlay(props = {
  shouldBlockScroll: true
}, state, ref) {
  let { overlayProps, underlayProps } = (0, import_overlays.useOverlay)(
    {
      ...props,
      isOpen: state.isOpen,
      onClose: state.close
    },
    ref
  );
  (0, import_overlays.usePreventScroll)({
    isDisabled: !state.isOpen || !props.shouldBlockScroll
  });
  (0, import_overlays.useOverlayFocusContain)();
  (0, import_react.useEffect)(() => {
    if (state.isOpen && ref.current) {
      return (0, import_overlays.ariaHideOutside)([ref.current]);
    }
  }, [state.isOpen, ref]);
  return {
    modalProps: (0, import_utils.mergeProps)(overlayProps),
    underlayProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAriaModalOverlay
});
