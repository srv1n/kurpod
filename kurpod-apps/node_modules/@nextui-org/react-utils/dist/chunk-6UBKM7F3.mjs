"use client";

// src/use-is-hydrated.ts
import * as React from "react";
function useIsHydrated() {
  const subscribe = () => () => {
  };
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export {
  useIsHydrated
};
