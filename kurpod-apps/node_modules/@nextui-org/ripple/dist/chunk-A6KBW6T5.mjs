"use client";

// src/use-ripple.ts
import { getUniqueID } from "@nextui-org/shared-utils";
import { useCallback, useState } from "react";
function useRipple(props = {}) {
  const [ripples, setRipples] = useState([]);
  const onPress = useCallback((event) => {
    const trigger = event.target;
    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        size,
        x: event.x - size / 2,
        y: event.y - size / 2
      }
    ]);
  }, []);
  const onClear = useCallback((key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);
  return { ripples, onClear, onPress, ...props };
}

export {
  useRipple
};
