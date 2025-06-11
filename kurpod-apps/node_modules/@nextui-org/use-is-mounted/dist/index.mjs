// src/index.ts
import { useCallback, useEffect, useRef, useState } from "react";
function useIsMounted(props = {}) {
  const { rerender = false, delay = 0 } = props;
  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    isMountedRef.current = true;
    let timer = null;
    if (rerender) {
      if (delay > 0) {
        timer = setTimeout(() => {
          setIsMounted(true);
        }, delay);
      } else {
        setIsMounted(true);
      }
    }
    return () => {
      isMountedRef.current = false;
      if (rerender) {
        setIsMounted(false);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [rerender]);
  return [useCallback(() => isMountedRef.current, []), isMounted];
}
export {
  useIsMounted
};
