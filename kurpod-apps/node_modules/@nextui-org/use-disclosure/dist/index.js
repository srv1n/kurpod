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
  useDisclosure: () => useDisclosure
});
module.exports = __toCommonJS(src_exports);
var import_utils = require("@react-aria/utils");
var import_utils2 = require("@react-stately/utils");
var import_use_callback_ref = require("@nextui-org/use-callback-ref");
var import_react = require("react");
function useDisclosure(props = {}) {
  const {
    id: idProp,
    defaultOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange = () => {
    }
  } = props;
  const onOpenPropCallbackRef = (0, import_use_callback_ref.useCallbackRef)(onOpenProp);
  const onClosePropCallbackRef = (0, import_use_callback_ref.useCallbackRef)(onCloseProp);
  const [isOpen, setIsOpen] = (0, import_utils2.useControlledState)(isOpenProp, defaultOpen || false, onChange);
  const reactId = (0, import_react.useId)();
  const id = idProp || reactId;
  const isControlled = isOpenProp !== void 0;
  const onClose = (0, import_react.useCallback)(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef == null ? void 0 : onClosePropCallbackRef();
  }, [isControlled, onClosePropCallbackRef]);
  const onOpen = (0, import_react.useCallback)(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef == null ? void 0 : onOpenPropCallbackRef();
  }, [isControlled, onOpenPropCallbackRef]);
  const onOpenChange = (0, import_react.useCallback)(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);
  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps: (props2 = {}) => ({
      ...props2,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick: (0, import_utils.chain)(props2.onClick, onOpenChange)
    }),
    getDisclosureProps: (props2 = {}) => ({
      ...props2,
      hidden: !isOpen,
      id
    })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDisclosure
});
