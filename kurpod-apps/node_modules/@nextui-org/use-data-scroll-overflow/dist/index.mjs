// src/index.ts
import { capitalize } from "@nextui-org/shared-utils";
import { useEffect, useRef } from "react";
function useDataScrollOverflow(props = {}) {
  const {
    domRef,
    isEnabled = true,
    overflowCheck = "vertical",
    visibility = "auto",
    offset = 0,
    onVisibilityChange,
    updateDeps = []
  } = props;
  const visibleRef = useRef(visibility);
  useEffect(() => {
    const el = domRef == null ? void 0 : domRef.current;
    if (!el || !isEnabled)
      return;
    const setAttributes = (direction, hasBefore, hasAfter, prefix, suffix) => {
      if (visibility === "auto") {
        const both = `${prefix}${capitalize(suffix)}Scroll`;
        if (hasBefore && hasAfter) {
          el.dataset[both] = "true";
          el.removeAttribute(`data-${prefix}-scroll`);
          el.removeAttribute(`data-${suffix}-scroll`);
        } else {
          el.dataset[`${prefix}Scroll`] = hasBefore.toString();
          el.dataset[`${suffix}Scroll`] = hasAfter.toString();
          el.removeAttribute(`data-${prefix}-${suffix}-scroll`);
        }
      } else {
        const next = hasBefore && hasAfter ? "both" : hasBefore ? prefix : hasAfter ? suffix : "none";
        if (next !== visibleRef.current) {
          onVisibilityChange == null ? void 0 : onVisibilityChange(next);
          visibleRef.current = next;
        }
      }
    };
    const checkOverflow = () => {
      const directions = [
        { type: "vertical", prefix: "top", suffix: "bottom" },
        { type: "horizontal", prefix: "left", suffix: "right" }
      ];
      for (const { type, prefix, suffix } of directions) {
        if (overflowCheck === type || overflowCheck === "both") {
          const hasBefore = type === "vertical" ? el.scrollTop > offset : el.scrollLeft > offset;
          const hasAfter = type === "vertical" ? el.scrollTop + el.clientHeight + offset < el.scrollHeight : el.scrollLeft + el.clientWidth + offset < el.scrollWidth;
          setAttributes(type, hasBefore, hasAfter, prefix, suffix);
        }
      }
    };
    const clearOverflow = () => {
      ["top", "bottom", "top-bottom", "left", "right", "left-right"].forEach((attr) => {
        el.removeAttribute(`data-${attr}-scroll`);
      });
    };
    checkOverflow();
    el.addEventListener("scroll", checkOverflow);
    if (visibility !== "auto") {
      clearOverflow();
      if (visibility === "both") {
        el.dataset.topBottomScroll = String(overflowCheck === "vertical");
        el.dataset.leftRightScroll = String(overflowCheck === "horizontal");
      } else {
        el.dataset.topBottomScroll = "false";
        el.dataset.leftRightScroll = "false";
        ["top", "bottom", "left", "right"].forEach((attr) => {
          el.dataset[`${attr}Scroll`] = String(visibility === attr);
        });
      }
    }
    return () => {
      el.removeEventListener("scroll", checkOverflow);
      clearOverflow();
    };
  }, [...updateDeps, isEnabled, visibility, overflowCheck, onVisibilityChange, domRef]);
}
export {
  useDataScrollOverflow
};
