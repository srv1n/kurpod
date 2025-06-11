"use client";
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DOMEventNames: () => import_react_rsc_utils.DOMEventNames,
  DOMPropNames: () => import_react_rsc_utils.DOMPropNames,
  areRectsIntersecting: () => areRectsIntersecting,
  assignRef: () => assignRef,
  canUseDOM: () => canUseDOM,
  createContext: () => createContext2,
  createDOMRef: () => createDOMRef,
  createFocusableRef: () => createFocusableRef,
  detectBrowser: () => detectBrowser,
  detectDeviceType: () => detectDeviceType,
  detectOS: () => detectOS,
  detectTouch: () => detectTouch,
  filterDOMProps: () => import_react_rsc_utils.filterDOMProps,
  getCSSStyleVal: () => getCSSStyleVal,
  getRealShape: () => getRealShape,
  getUserAgentBrowser: () => getUserAgentBrowser,
  getUserAgentOS: () => getUserAgentOS,
  getValidChildren: () => import_react_rsc_utils.getValidChildren,
  isBrowser: () => isBrowser,
  mergeRefs: () => mergeRefs,
  pickChildren: () => import_react_rsc_utils.pickChildren,
  renderFn: () => import_react_rsc_utils.renderFn,
  useDOMRef: () => useDOMRef,
  useFocusableRef: () => useFocusableRef,
  useIsHydrated: () => useIsHydrated,
  useSyncRef: () => useSyncRef
});
module.exports = __toCommonJS(src_exports);

// src/context.ts
var React = __toESM(require("react"));
function createContext2(options = {}) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  const Context = React.createContext(void 0);
  Context.displayName = name;
  function useContext2() {
    var _a;
    const context = React.useContext(Context);
    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = "ContextError";
      (_a = Error.captureStackTrace) == null ? void 0 : _a.call(Error, error, useContext2);
      throw error;
    }
    return context;
  }
  return [Context.Provider, useContext2, Context];
}

// src/refs.ts
var import_shared_utils = require("@nextui-org/shared-utils");
function assignRef(ref, value) {
  if (ref == null)
    return;
  if ((0, import_shared_utils.isFunction)(ref)) {
    ref(value);
    return;
  }
  try {
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}

// src/dom.ts
var import_react = require("react");
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var isBrowser = canUseDOM();
function getUserAgentBrowser(navigator) {
  const { userAgent: ua, vendor } = navigator;
  const android = /(android)/i.test(ua);
  switch (true) {
    case /CriOS/.test(ua):
      return "Chrome for iOS";
    case /Edg\//.test(ua):
      return "Edge";
    case (android && /Silk\//.test(ua)):
      return "Silk";
    case (/Chrome/.test(ua) && /Google Inc/.test(vendor)):
      return "Chrome";
    case /Firefox\/\d+\.\d+$/.test(ua):
      return "Firefox";
    case android:
      return "AOSP";
    case /MSIE|Trident/.test(ua):
      return "IE";
    case (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(ua)):
      return "Safari";
    case /AppleWebKit/.test(ua):
      return "WebKit";
    default:
      return null;
  }
}
function getUserAgentOS(navigator) {
  const { userAgent: ua, platform } = navigator;
  switch (true) {
    case /Android/.test(ua):
      return "Android";
    case /iPhone|iPad|iPod/.test(platform):
      return "iOS";
    case /Win/.test(platform):
      return "Windows";
    case /Mac/.test(platform):
      return "Mac";
    case /CrOS/.test(ua):
      return "Chrome OS";
    case /Firefox/.test(ua):
      return "Firefox OS";
    default:
      return null;
  }
}
function detectDeviceType(navigator) {
  const { userAgent: ua } = navigator;
  if (/(tablet)|(iPad)|(Nexus 9)/i.test(ua))
    return "tablet";
  if (/(mobi)/i.test(ua))
    return "phone";
  return "desktop";
}
function detectOS(os) {
  if (!isBrowser)
    return false;
  return getUserAgentOS(window.navigator) === os;
}
function detectBrowser(browser) {
  if (!isBrowser)
    return false;
  return getUserAgentBrowser(window.navigator) === browser;
}
function detectTouch() {
  if (!isBrowser)
    return false;
  return window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null;
}
function createDOMRef(ref) {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    }
  };
}
function createFocusableRef(domRef, focusableRef = domRef) {
  return {
    ...createDOMRef(domRef),
    focus() {
      if (focusableRef.current) {
        focusableRef.current.focus();
      }
    }
  };
}
function useDOMRef(ref) {
  const domRef = (0, import_react.useRef)(null);
  (0, import_react.useImperativeHandle)(ref, () => domRef.current);
  return domRef;
}
function useFocusableRef(ref, focusableRef) {
  const domRef = (0, import_react.useRef)(null);
  (0, import_react.useImperativeHandle)(ref, () => createFocusableRef(domRef, focusableRef));
  return domRef;
}
function useSyncRef(context, ref) {
  (0, import_react.useLayoutEffect)(() => {
    if (context && context.ref && ref && ref.current) {
      context.ref.current = ref.current;
      return () => {
        var _a;
        if ((_a = context.ref) == null ? void 0 : _a.current) {
          context.ref.current = null;
        }
      };
    }
  }, [context, ref]);
}
function areRectsIntersecting(rect1, rect2) {
  return rect1 && rect2 && rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}

// src/dimensions.ts
var getCSSStyleVal = (str, parentNum) => {
  if (!str)
    return 0;
  const strVal = str.includes("px") ? +str.split("px")[0] : str.includes("%") ? +str.split("%")[0] * parentNum * 0.01 : str;
  return Number.isNaN(+strVal) ? 0 : +strVal;
};
var getRealShape = (el) => {
  const defaultShape = { width: 0, height: 0 };
  if (!el || typeof window === "undefined")
    return defaultShape;
  const rect = el.getBoundingClientRect();
  const { width, height } = window.getComputedStyle(el);
  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height)
  };
};

// src/index.ts
var import_react_rsc_utils = require("@nextui-org/react-rsc-utils");

// src/use-is-hydrated.ts
var React2 = __toESM(require("react"));
function useIsHydrated() {
  const subscribe = () => () => {
  };
  return React2.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DOMEventNames,
  DOMPropNames,
  areRectsIntersecting,
  assignRef,
  canUseDOM,
  createContext,
  createDOMRef,
  createFocusableRef,
  detectBrowser,
  detectDeviceType,
  detectOS,
  detectTouch,
  filterDOMProps,
  getCSSStyleVal,
  getRealShape,
  getUserAgentBrowser,
  getUserAgentOS,
  getValidChildren,
  isBrowser,
  mergeRefs,
  pickChildren,
  renderFn,
  useDOMRef,
  useFocusableRef,
  useIsHydrated,
  useSyncRef
});
