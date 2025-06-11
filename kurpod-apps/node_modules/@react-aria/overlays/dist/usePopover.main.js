var $08ef1685902b6011$exports = require("./ariaHideOutside.main.js");
var $cd94b4896dd97759$exports = require("./useOverlayPosition.main.js");
var $82711f9cb668ecdb$exports = require("./useOverlay.main.js");
var $5c2f5cd01815d369$exports = require("./usePreventScroll.main.js");
var $jkVOI$reactariautils = require("@react-aria/utils");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "usePopover", () => $6c2dfcdee3e15e20$export$542a6fd13ac93354);
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




function $6c2dfcdee3e15e20$export$542a6fd13ac93354(props, state) {
    let { triggerRef: triggerRef, popoverRef: popoverRef, isNonModal: isNonModal, isKeyboardDismissDisabled: isKeyboardDismissDisabled, shouldCloseOnInteractOutside: shouldCloseOnInteractOutside, ...otherProps } = props;
    let { overlayProps: overlayProps, underlayProps: underlayProps } = (0, $82711f9cb668ecdb$exports.useOverlay)({
        // If popover is in the top layer, it should not prevent other popovers from being dismissed.
        isOpen: state.isOpen && !otherProps['data-react-aria-top-layer'],
        onClose: state.close,
        shouldCloseOnBlur: true,
        isDismissable: !isNonModal,
        isKeyboardDismissDisabled: isKeyboardDismissDisabled,
        shouldCloseOnInteractOutside: shouldCloseOnInteractOutside
    }, popoverRef);
    let { overlayProps: positionProps, arrowProps: arrowProps, placement: placement } = (0, $cd94b4896dd97759$exports.useOverlayPosition)({
        ...otherProps,
        targetRef: triggerRef,
        overlayRef: popoverRef,
        isOpen: state.isOpen,
        onClose: isNonModal ? state.close : undefined
    });
    (0, $5c2f5cd01815d369$exports.usePreventScroll)({
        isDisabled: isNonModal || !state.isOpen
    });
    (0, $jkVOI$reactariautils.useLayoutEffect)(()=>{
        if (state.isOpen && !isNonModal && popoverRef.current) return (0, $08ef1685902b6011$exports.ariaHideOutside)([
            popoverRef.current
        ]);
    }, [
        isNonModal,
        state.isOpen,
        popoverRef
    ]);
    return {
        popoverProps: (0, $jkVOI$reactariautils.mergeProps)(overlayProps, positionProps),
        arrowProps: arrowProps,
        underlayProps: underlayProps,
        placement: placement
    };
}


//# sourceMappingURL=usePopover.main.js.map
