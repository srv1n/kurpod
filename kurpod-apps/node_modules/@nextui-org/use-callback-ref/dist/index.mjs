// src/index.ts
import { useCallback, useRef } from "react";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
function useCallbackRef(fn, deps = []) {
  const ref = useRef(fn);
  useSafeLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);
  }, deps);
}
export {
  useCallbackRef
};
