// src/index.ts
import { useEffect, useRef, useState } from "react";
function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  isEnabled = true,
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange
} = {}) {
  var _a;
  const [ref, setRef] = useState(null);
  const [state, setState] = useState(() => ({
    isIntersecting: initialIsIntersecting,
    entry: void 0
  }));
  const callbackRef = useRef();
  callbackRef.current = onChange;
  const frozen = ((_a = state.entry) == null ? void 0 : _a.isIntersecting) && freezeOnceVisible;
  useEffect(() => {
    if (!isEnabled)
      return;
    if (!ref)
      return;
    if (!("IntersectionObserver" in window))
      return;
    if (frozen)
      return;
    let unobserve;
    const observer = new IntersectionObserver(
      (entries) => {
        const thresholds = Array.isArray(observer.thresholds) ? observer.thresholds : [observer.thresholds];
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting && thresholds.some((threshold2) => entry.intersectionRatio >= threshold2);
          setState({ isIntersecting, entry });
          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }
          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = void 0;
          }
        });
      },
      { threshold, root, rootMargin }
    );
    observer.observe(ref);
    return () => {
      observer.disconnect();
    };
  }, [
    ref,
    isEnabled,
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    freezeOnceVisible
  ]);
  const prevRef = useRef(null);
  useEffect(() => {
    var _a2;
    if (!ref && ((_a2 = state.entry) == null ? void 0 : _a2.target) && !freezeOnceVisible && !frozen && prevRef.current !== state.entry.target) {
      prevRef.current = state.entry.target;
      setState({ isIntersecting: initialIsIntersecting, entry: void 0 });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);
  const result = [setRef, !!state.isIntersecting, state.entry];
  result.ref = result[0];
  result.isIntersecting = result[1];
  result.entry = result[2];
  return result;
}
export {
  useIntersectionObserver
};
