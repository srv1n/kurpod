import {useSafelyMouseToSubmenu as $d275435c250248f8$export$85ec83e04c95f50a} from "./useSafelyMouseToSubmenu.mjs";
import {useRef as $dXlYe$useRef, useCallback as $dXlYe$useCallback} from "react";
import {useId as $dXlYe$useId, useEffectEvent as $dXlYe$useEffectEvent, useLayoutEffect as $dXlYe$useLayoutEffect} from "@react-aria/utils";
import {useLocale as $dXlYe$useLocale} from "@react-aria/i18n";

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



function $0065b146e7192841$export$7138b0d059a6e743(props, state, ref) {
    let { parentMenuRef: parentMenuRef, submenuRef: submenuRef, type: type = 'menu', isDisabled: isDisabled, delay: delay = 200 } = props;
    let submenuTriggerId = (0, $dXlYe$useId)();
    let overlayId = (0, $dXlYe$useId)();
    let { direction: direction } = (0, $dXlYe$useLocale)();
    let openTimeout = (0, $dXlYe$useRef)(undefined);
    let cancelOpenTimeout = (0, $dXlYe$useCallback)(()=>{
        if (openTimeout.current) {
            clearTimeout(openTimeout.current);
            openTimeout.current = undefined;
        }
    }, [
        openTimeout
    ]);
    let onSubmenuOpen = (0, $dXlYe$useEffectEvent)((focusStrategy)=>{
        cancelOpenTimeout();
        state.open(focusStrategy);
    });
    let onSubmenuClose = (0, $dXlYe$useEffectEvent)(()=>{
        cancelOpenTimeout();
        state.close();
    });
    (0, $dXlYe$useLayoutEffect)(()=>{
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
    (0, $d275435c250248f8$export$85ec83e04c95f50a)({
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


export {$0065b146e7192841$export$7138b0d059a6e743 as useSubmenuTrigger};
//# sourceMappingURL=useSubmenuTrigger.module.js.map
