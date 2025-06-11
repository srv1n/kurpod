var $0294ea432cd92340$exports = require("./usePress.main.js");
var $ev4bP$reactariautils = require("@react-aria/utils");
var $ev4bP$react = require("react");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "Pressable", () => $e1dbec26039c051d$export$27c701ed9e449e99);
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


const $e1dbec26039c051d$export$27c701ed9e449e99 = /*#__PURE__*/ (0, ($parcel$interopDefault($ev4bP$react))).forwardRef(({ children: children, ...props }, ref)=>{
    ref = (0, $ev4bP$reactariautils.useObjectRef)(ref);
    let { pressProps: pressProps } = (0, $0294ea432cd92340$exports.usePress)({
        ...props,
        ref: ref
    });
    let child = (0, ($parcel$interopDefault($ev4bP$react))).Children.only(children);
    return /*#__PURE__*/ (0, ($parcel$interopDefault($ev4bP$react))).cloneElement(child, // @ts-ignore
    {
        ref: ref,
        ...(0, $ev4bP$reactariautils.mergeProps)(child.props, pressProps)
    });
});


//# sourceMappingURL=Pressable.main.js.map
