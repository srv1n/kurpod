"use client";

// src/utils/index.ts
import { isAppleDevice } from "@react-aria/utils";
import { isMac } from "@react-aria/utils";
function isNonContiguousSelectionModifier(e) {
  return isAppleDevice() ? e.altKey : e.ctrlKey;
}
function isCtrlKeyPressed(e) {
  if (isMac()) {
    return e.metaKey;
  }
  return e.ctrlKey;
}

export {
  isNonContiguousSelectionModifier,
  isCtrlKeyPressed
};
