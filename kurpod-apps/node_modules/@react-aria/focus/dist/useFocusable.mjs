import {focusSafely as $6a99195332edec8b$export$80f3e147d781571c} from "./focusSafely.mjs";
import {useSyncRef as $h8xso$useSyncRef, useObjectRef as $h8xso$useObjectRef, mergeProps as $h8xso$mergeProps} from "@react-aria/utils";
import $h8xso$react, {useContext as $h8xso$useContext, useRef as $h8xso$useRef, useEffect as $h8xso$useEffect} from "react";
import {useFocus as $h8xso$useFocus, useKeyboard as $h8xso$useKeyboard} from "@react-aria/interactions";

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 



let $e6afbd83fe6ebbd2$var$FocusableContext = /*#__PURE__*/ (0, $h8xso$react).createContext(null);
function $e6afbd83fe6ebbd2$var$useFocusableContext(ref) {
    let context = (0, $h8xso$useContext)($e6afbd83fe6ebbd2$var$FocusableContext) || {};
    (0, $h8xso$useSyncRef)(context, ref);
    // eslint-disable-next-line
    let { ref: _, ...otherProps } = context;
    return otherProps;
}
/**
 * Provides DOM props to the nearest focusable child.
 */ function $e6afbd83fe6ebbd2$var$FocusableProvider(props, ref) {
    let { children: children, ...otherProps } = props;
    let objRef = (0, $h8xso$useObjectRef)(ref);
    let context = {
        ...otherProps,
        ref: objRef
    };
    return /*#__PURE__*/ (0, $h8xso$react).createElement($e6afbd83fe6ebbd2$var$FocusableContext.Provider, {
        value: context
    }, children);
}
let $e6afbd83fe6ebbd2$export$13f3202a3e5ddd5 = /*#__PURE__*/ (0, $h8xso$react).forwardRef($e6afbd83fe6ebbd2$var$FocusableProvider);
function $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props, domRef) {
    let { focusProps: focusProps } = (0, $h8xso$useFocus)(props);
    let { keyboardProps: keyboardProps } = (0, $h8xso$useKeyboard)(props);
    let interactions = (0, $h8xso$mergeProps)(focusProps, keyboardProps);
    let domProps = $e6afbd83fe6ebbd2$var$useFocusableContext(domRef);
    let interactionProps = props.isDisabled ? {} : domProps;
    let autoFocusRef = (0, $h8xso$useRef)(props.autoFocus);
    (0, $h8xso$useEffect)(()=>{
        if (autoFocusRef.current && domRef.current) (0, $6a99195332edec8b$export$80f3e147d781571c)(domRef.current);
        autoFocusRef.current = false;
    }, [
        domRef
    ]);
    return {
        focusableProps: (0, $h8xso$mergeProps)({
            ...interactions,
            tabIndex: props.excludeFromTabOrder && !props.isDisabled ? -1 : undefined
        }, interactionProps)
    };
}


export {$e6afbd83fe6ebbd2$export$13f3202a3e5ddd5 as FocusableProvider, $e6afbd83fe6ebbd2$export$4c014de7c8940b4c as useFocusable};
//# sourceMappingURL=useFocusable.module.js.map
