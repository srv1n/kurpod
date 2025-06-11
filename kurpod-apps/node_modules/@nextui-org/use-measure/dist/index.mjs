// src/index.ts
import { useCallback, useRef, useState } from "react";
function useMeasure() {
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null
  });
  const previousObserver = useRef(null);
  const customRef = useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }
    if ((node == null ? void 0 : node.nodeType) === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
          setDimensions({ width, height });
        }
      });
      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);
  return [customRef, dimensions];
}
export {
  useMeasure
};
