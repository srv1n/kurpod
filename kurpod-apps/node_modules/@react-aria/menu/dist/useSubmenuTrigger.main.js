var $62347d8c4183e713$exports = require("./useSafelyMouseToSubmenu.main.js");
var $23MMN$react = require("react");
var $23MMN$reactariautils = require("@react-aria/utils");
var $23MMN$reactariai18n = require("@react-aria/i18n");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useSubmenuTrigger", () => $5f4753043c9f6cdf$export$7138b0d059a6e743);
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 



function $5f4753043c9f6cdf$export$7138b0d059a6e743(props, state, ref) {
    let { parentMenuRef: parentMenuRef, submenuRef: submenuRef, type: type = 'menu', isDisabled: isDisabled, delay: delay = 200 } = props;
    let submenuTriggerId = (0, $23MMN$reactariautils.useId)();
    let overlayId = (0, $23MMN$reactariautils.useId)();
    let { direction: direction } = (0, $23MMN$reactariai18n.useLocale)();
    let openTimeout = (0, $23MMN$react.useRef)(undefined);
    let cancelOpenTimeout = (0, $23MMN$react.useCallback)(()=>{
        if (openTimeout.current) {
            clearTimeout(openTimeout.current);
            openTimeout.current = undefined;
        }
    }, [
        openTimeout
    ]);
    let onSubmenuOpen = (0, $23MMN$reactariautils.useEffectEvent)((focusStrategy)=>{
        cancelOpenTimeout();
        state.open(focusStrategy);
    });
    let onSubmenuClose = (0, $23MMN$reactariautils.useEffectEvent)(()=>{
        cancelOpenTimeout();
        state.close();
    });
    (0, $23MMN$reactariautils.useLayoutEffect)(()=>{
        return ()=>{
            cancelOpenTimeout();
        };
    }, [
        cancelOpenTimeout
    ]);
    let submenuKeyDown = (e)=>{
        switch(e.key){
            case 'ArrowLeft':
                if (direction === 'ltr' && e.currentTarget.contains(e.target)) {
                    var _ref_current;
                    e.stopPropagation();
                    onSubmenuClose();
                    (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
                }
                break;
            case 'ArrowRight':
                if (direction === 'rtl' && e.currentTarget.contains(e.target)) {
                    var _ref_current1;
                    e.stopPropagation();
                    onSubmenuClose();
                    (_ref_current1 = ref.current) === null || _ref_current1 === void 0 ? void 0 : _ref_current1.focus();
                }
                break;
            case 'Escape':
                e.stopPropagation();
                state.closeAll();
                break;
        }
    };
    var _state_focusStrategy;
    let submenuProps = {
        id: overlayId,
        'aria-labelledby': submenuTriggerId,
        submenuLevel: state.submenuLevel,
        ...type === 'menu' && {
            onClose: state.closeAll,
            autoFocus: (_state_focusStrategy = state.focusStrategy) !== null && _state_focusStrategy !== void 0 ? _state_focusStrategy : undefined,
            onKeyDown: submenuKeyDown
        }
    };
    let submenuTriggerKeyDown = (e)=>{
        switch(e.key){
            case 'ArrowRight':
                if (!isDisabled) {
                    if (direction === 'ltr') {
                        if (!state.isOpen) onSubmenuOpen('first');
                        if (type === 'menu' && !!(submenuRef === null || submenuRef === void 0 ? void 0 : submenuRef.current) && document.activeElement === (ref === null || ref === void 0 ? void 0 : ref.current)) submenuRef.current.focus();
                    } else if (state.isOpen) onSubmenuClose();
                    else e.continuePropagation();
                }
                break;
            case 'ArrowLeft':
                if (!isDisabled) {
                    if (direction === 'rtl') {
                        if (!state.isOpen) onSubmenuOpen('first');
                        if (type === 'menu' && !!(submenuRef === null || submenuRef === void 0 ? void 0 : submenuRef.current) && document.activeElement === (ref === null || ref === void 0 ? void 0 : ref.current)) submenuRef.current.focus();
                    } else if (state.isOpen) onSubmenuClose();
                    else e.continuePropagation();
                }
                break;
            case 'Escape':
                state.closeAll();
                break;
            default:
                e.continuePropagation();
                break;
        }
    };
    let onPressStart = (e)=>{
        if (!isDisabled && (e.pointerType === 'virtual' || e.pointerType === 'keyboard')) // If opened with a screen reader or keyboard, auto focus the first submenu item.
        onSubmenuOpen('first');
    };
    let onPress = (e)=>{
        if (!isDisabled && (e.pointerType === 'touch' || e.pointerType === 'mouse')) // For touch or on a desktop device with a small screen open on press up to possible problems with
        // press up happening on the newly opened tray items
        onSubmenuOpen();
    };
    let onHoverChange = (isHovered)=>{
        if (!isDisabled) {
            if (isHovered && !state.isOpen) {
                if (!openTimeout.current) openTimeout.current = setTimeout(()=>{
                    onSubmenuOpen();
                }, delay);
            } else if (!isHovered) cancelOpenTimeout();
        }
    };
    let onBlur = (e)=>{
        var _parentMenuRef_current;
        if (state.isOpen && ((_parentMenuRef_current = parentMenuRef.current) === null || _parentMenuRef_current === void 0 ? void 0 : _parentMenuRef_current.contains(e.relatedTarget))) onSubmenuClose();
    };
    let shouldCloseOnInteractOutside = (target)=>{
        if (target !== ref.current) return true;
        return false;
    };
    (0, $62347d8c4183e713$exports.useSafelyMouseToSubmenu)({
        menuRef: parentMenuRef,
        submenuRef: submenuRef,
        isOpen: state.isOpen,
        isDisabled: isDisabled
    });
    return {
        submenuTriggerProps: {
            id: submenuTriggerId,
            'aria-controls': state.isOpen ? overlayId : undefined,
            'aria-haspopup': !isDisabled ? type : undefined,
            'aria-expanded': state.isOpen ? 'true' : 'false',
            onPressStart: onPressStart,
            onPress: onPress,
            onHoverChange: onHoverChange,
            onKeyDown: submenuTriggerKeyDown,
            onBlur: onBlur,
            isOpen: state.isOpen
        },
        submenuProps: submenuProps,
        popoverProps: {
            isNonModal: true,
            disableFocusManagement: true,
            shouldCloseOnInteractOutside: shouldCloseOnInteractOutside
        }
    };
}


//# sourceMappingURL=useSubmenuTrigger.main.js.map
