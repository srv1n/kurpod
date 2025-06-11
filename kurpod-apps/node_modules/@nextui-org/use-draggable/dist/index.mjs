// src/index.ts
import { useEffect, useRef, useCallback } from "react";
import { useMove } from "@react-aria/interactions";
function useDraggable(props) {
  const { targetRef, isDisabled = false, canOverflow = false } = props;
  const boundary = useRef({ minLeft: 0, minTop: 0, maxLeft: 0, maxTop: 0 });
  let transform = { offsetX: 0, offsetY: 0 };
  const onMoveStart = useCallback(() => {
    var _a, _b, _c, _d, _e;
    const { offsetX, offsetY } = transform;
    const targetRect = (_a = targetRef == null ? void 0 : targetRef.current) == null ? void 0 : _a.getBoundingClientRect();
    const targetLeft = (_b = targetRect == null ? void 0 : targetRect.left) != null ? _b : 0;
    const targetTop = (_c = targetRect == null ? void 0 : targetRect.top) != null ? _c : 0;
    const targetWidth = (_d = targetRect == null ? void 0 : targetRect.width) != null ? _d : 0;
    const targetHeight = (_e = targetRect == null ? void 0 : targetRect.height) != null ? _e : 0;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;
    boundary.current = {
      minLeft,
      minTop,
      maxLeft,
      maxTop
    };
  }, [transform, targetRef == null ? void 0 : targetRef.current]);
  const onMove = useCallback(
    (e) => {
      if (isDisabled) {
        return;
      }
      const { offsetX, offsetY } = transform;
      const { minLeft, minTop, maxLeft, maxTop } = boundary.current;
      let moveX = offsetX + e.deltaX;
      let moveY = offsetY + e.deltaY;
      if (!canOverflow) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
        moveY = Math.min(Math.max(moveY, minTop), maxTop);
      }
      transform = {
        offsetX: moveX,
        offsetY: moveY
      };
      if (targetRef == null ? void 0 : targetRef.current) {
        targetRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    },
    [isDisabled, transform, boundary.current, canOverflow, targetRef == null ? void 0 : targetRef.current]
  );
  const { moveProps } = useMove({
    onMoveStart,
    onMove
  });
  const preventDefault = useCallback((e) => {
    e.preventDefault();
  }, []);
  useEffect(() => {
    if (!isDisabled) {
      document.body.addEventListener("touchmove", preventDefault, { passive: false });
    }
    return () => {
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, [isDisabled]);
  return {
    moveProps: {
      ...moveProps,
      style: { cursor: !isDisabled ? "move" : void 0 }
    }
  };
}
export {
  useDraggable
};
