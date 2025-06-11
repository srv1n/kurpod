// src/index.ts
import { useRef, useEffect, useCallback } from "react";
var isBrowser = typeof window !== "undefined";
function getScrollPosition(element) {
  if (!isBrowser)
    return { x: 0, y: 0 };
  if (!element) {
    return { x: window.scrollX, y: window.scrollY };
  }
  return { x: element.scrollLeft, y: element.scrollTop };
}
var useScrollPosition = (props) => {
  const { elementRef, delay = 30, callback, isEnabled } = props;
  const position = useRef(
    isEnabled ? getScrollPosition(elementRef == null ? void 0 : elementRef.current) : { x: 0, y: 0 }
  );
  const throttleTimeout = useRef(null);
  const handler = useCallback(() => {
    const currPos = getScrollPosition(elementRef == null ? void 0 : elementRef.current);
    if (typeof callback === "function") {
      callback({ prevPos: position.current, currPos });
    }
    position.current = currPos;
    throttleTimeout.current = null;
  }, [callback, elementRef]);
  useEffect(() => {
    if (!isEnabled)
      return;
    const handleScroll = () => {
      if (delay) {
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current);
        }
        throttleTimeout.current = setTimeout(handler, delay);
      } else {
        handler();
      }
    };
    const target = (elementRef == null ? void 0 : elementRef.current) || window;
    target.addEventListener("scroll", handleScroll);
    return () => {
      target.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
        throttleTimeout.current = null;
      }
    };
  }, [elementRef == null ? void 0 : elementRef.current, delay, handler, isEnabled]);
  return position.current;
};
export {
  useScrollPosition
};
