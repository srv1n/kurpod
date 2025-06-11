var $1c7f9157d722357d$exports = require("./focusSafely.main.js");
var $ggOO2$reactariautils = require("@react-aria/utils");
var $ggOO2$react = require("react");
var $ggOO2$reactariainteractions = require("@react-aria/interactions");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "FocusableProvider", () => $fb504d83237fd6ac$export$13f3202a3e5ddd5);
$parcel$export(module.exports, "useFocusable", () => $fb504d83237fd6ac$export$4c014de7c8940b4c);
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



let $fb504d83237fd6ac$var$FocusableContext = /*#__PURE__*/ (0, ($parcel$interopDefault($ggOO2$react))).createContext(null);
function $fb504d83237fd6ac$var$useFocusableContext(ref) {
    let context = (0, $ggOO2$react.useContext)($fb504d83237fd6ac$var$FocusableContext) || {};
    (0, $ggOO2$reactariautils.useSyncRef)(context, ref);
    // eslint-disable-next-line
    let { ref: _, ...otherProps } = context;
    return otherProps;
}
/**
 * Provides DOM props to the nearest focusable child.
 */ function $fb504d83237fd6ac$var$FocusableProvider(props, ref) {
    let { children: children, ...otherProps } = props;
    let objRef = (0, $ggOO2$reactariautils.useObjectRef)(ref);
    let context = {
        ...otherProps,
        ref: objRef
    };
    return /*#__PURE__*/ (0, ($parcel$interopDefault($ggOO2$react))).createElement($fb504d83237fd6ac$var$FocusableContext.Provider, {
        value: context
    }, children);
}
let $fb504d83237fd6ac$export$13f3202a3e5ddd5 = /*#__PURE__*/ (0, ($parcel$interopDefault($ggOO2$react))).forwardRef($fb504d83237fd6ac$var$FocusableProvider);
function $fb504d83237fd6ac$export$4c014de7c8940b4c(props, domRef) {
    let { focusProps: focusProps } = (0, $ggOO2$reactariainteractions.useFocus)(props);
    let { keyboardProps: keyboardProps } = (0, $ggOO2$reactariainteractions.useKeyboard)(props);
    let interactions = (0, $ggOO2$reactariautils.mergeProps)(focusProps, keyboardProps);
    let domProps = $fb504d83237fd6ac$var$useFocusableContext(domRef);
    let interactionProps = props.isDisabled ? {} : domProps;
    let autoFocusRef = (0, $ggOO2$react.useRef)(props.autoFocus);
    (0, $ggOO2$react.useEffect)(()=>{
        if (autoFocusRef.current && domRef.current) (0, $1c7f9157d722357d$exports.focusSafely)(domRef.current);
        autoFocusRef.current = false;
    }, [
        domRef
    ]);
    return {
        focusableProps: (0, $ggOO2$reactariautils.mergeProps)({
            ...interactions,
            tabIndex: props.excludeFromTabOrder && !props.isDisabled ? -1 : undefined
        }, interactionProps)
    };
}


//# sourceMappingURL=useFocusable.main.js.map
