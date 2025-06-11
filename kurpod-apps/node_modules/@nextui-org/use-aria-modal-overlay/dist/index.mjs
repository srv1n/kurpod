// src/index.ts
import {
  ariaHideOutside,
  useOverlay,
  usePreventScroll,
  useOverlayFocusContain
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useEffect } from "react";
function useAriaModalOverlay(props = {
  shouldBlockScroll: true
}, state, ref) {
  let { overlayProps, underlayProps } = useOverlay(
    {
      ...props,
      isOpen: state.isOpen,
      onClose: state.close
    },
    ref
  );
  usePreventScroll({
    isDisabled: !state.isOpen || !props.shouldBlockScroll
  });
  useOverlayFocusContain();
  useEffect(() => {
    if (state.isOpen && ref.current) {
      return ariaHideOutside([ref.current]);
    }
  }, [state.isOpen, ref]);
  return {
    modalProps: mergeProps(overlayProps),
    underlayProps
  };
}
export {
  useAriaModalOverlay
};
