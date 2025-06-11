"use client";
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

// src/modal-body.tsx
var modal_body_exports = {};
__export(modal_body_exports, {
  default: () => modal_body_default
});
module.exports = __toCommonJS(modal_body_exports);
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");

// src/modal-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [ModalProvider, useModalContext] = (0, import_react_utils.createContext)({
  name: "ModalContext",
  errorMessage: "useModalContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Modal />`"
});

// src/modal-body.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ModalBody = (0, import_system.forwardRef)((props, ref) => {
  const { as, children, className, ...otherProps } = props;
  const { slots, classNames, bodyId, setBodyMounted } = useModalContext();
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const Component = as || "div";
  (0, import_react.useEffect)(() => {
    setBodyMounted(true);
    return () => setBodyMounted(false);
  }, [setBodyMounted]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref: domRef,
      className: slots.body({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.body, className) }),
      id: bodyId,
      ...otherProps,
      children
    }
  );
});
ModalBody.displayName = "NextUI.ModalBody";
var modal_body_default = ModalBody;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
