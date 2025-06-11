var $cBYLt$reactariautils = require("@react-aria/utils");
var $cBYLt$reactariainteractions = require("@react-aria/interactions");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "focusSafely", () => $1c7f9157d722357d$export$80f3e147d781571c);
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

function $1c7f9157d722357d$export$80f3e147d781571c(element) {
    // If the user is interacting with a virtual cursor, e.g. screen reader, then
    // wait until after any animated transitions that are currently occurring on
    // the page before shifting focus. This avoids issues with VoiceOver on iOS
    // causing the page to scroll when moving focus if the element is transitioning
    // from off the screen.
    const ownerDocument = (0, $cBYLt$reactariautils.getOwnerDocument)(element);
    if ((0, $cBYLt$reactariainteractions.getInteractionModality)() === 'virtual') {
        let lastFocusedElement = ownerDocument.activeElement;
        (0, $cBYLt$reactariautils.runAfterTransition)(()=>{
            // If focus did not move and the element is still in the document, focus it.
            if (ownerDocument.activeElement === lastFocusedElement && element.isConnected) (0, $cBYLt$reactariautils.focusWithoutScrolling)(element);
        });
    } else (0, $cBYLt$reactariautils.focusWithoutScrolling)(element);
}


//# sourceMappingURL=focusSafely.main.js.map
