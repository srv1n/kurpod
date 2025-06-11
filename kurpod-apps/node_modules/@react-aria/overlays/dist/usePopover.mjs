import {ariaHideOutside as $5e3802645cc19319$export$1c3ebcada18427bf} from "./ariaHideOutside.mjs";
import {useOverlayPosition as $2a41e45df1593e64$export$d39e1813b3bdd0e1} from "./useOverlayPosition.mjs";
import {useOverlay as $a11501f3d1d39e6c$export$ea8f71083e90600f} from "./useOverlay.mjs";
import {usePreventScroll as $49c51c25361d4cd2$export$ee0f7cc6afcd1c18} from "./usePreventScroll.mjs";
import {useLayoutEffect as $m0yab$useLayoutEffect, mergeProps as $m0yab$mergeProps} from "@react-aria/utils";

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 




function $f2f8a6077418541e$export$542a6fd13ac93354(props, state) {
    let { triggerRef: triggerRef, popoverRef: popoverRef, isNonModal: isNonModal, isKeyboardDismissDisabled: isKeyboardDismissDisabled, shouldCloseOnInteractOutside: shouldCloseOnInteractOutside, ...otherProps } = props;
    let { overlayProps: overlayProps, underlayProps: underlayProps } = (0, $a11501f3d1d39e6c$export$ea8f71083e90600f)({
        // If popover is in the top layer, it should not prevent other popovers from being dismissed.
        isOpen: state.isOpen && !otherProps['data-react-aria-top-layer'],
        onClose: state.close,
        shouldCloseOnBlur: true,
        isDismissable: !isNonModal,
        isKeyboardDismissDisabled: isKeyboardDismissDisabled,
        shouldCloseOnInteractOutside: shouldCloseOnInteractOutside
    }, popoverRef);
    let { overlayProps: positionProps, arrowProps: arrowProps, placement: placement } = (0, $2a41e45df1593e64$export$d39e1813b3bdd0e1)({
        ...otherProps,
        targetRef: triggerRef,
        overlayRef: popoverRef,
        isOpen: state.isOpen,
        onClose: isNonModal ? state.close : undefined
    });
    (0, $49c51c25361d4cd2$export$ee0f7cc6afcd1c18)({
        isDisabled: isNonModal || !state.isOpen
    });
    (0, $m0yab$useLayoutEffect)(()=>{
        if (state.isOpen && !isNonModal && popoverRef.current) return (0, $5e3802645cc19319$export$1c3ebcada18427bf)([
            popoverRef.current
        ]);
    }, [
        isNonModal,
        state.isOpen,
        popoverRef
    ]);
    return {
        popoverProps: (0, $m0yab$mergeProps)(overlayProps, positionProps),
        arrowProps: arrowProps,
        underlayProps: underlayProps,
        placement: placement
    };
}


export {$f2f8a6077418541e$export$542a6fd13ac93354 as usePopover};
//# sourceMappingURL=usePopover.module.js.map
