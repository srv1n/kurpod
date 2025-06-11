var $gP8Dl$reactariautils = require("@react-aria/utils");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "isNonContiguousSelectionModifier", () => $ee0bdf4faa47f2a8$export$d3e3bd3e26688c04);
$parcel$export(module.exports, "isCtrlKeyPressed", () => $ee0bdf4faa47f2a8$export$16792effe837dba3);
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
function $ee0bdf4faa47f2a8$export$d3e3bd3e26688c04(e) {
    // Ctrl + Arrow Up/Arrow Down has a system wide meaning on macOS, so use Alt instead.
    // On Windows and Ubuntu, Alt + Space has a system wide meaning.
    return (0, $gP8Dl$reactariautils.isAppleDevice)() ? e.altKey : e.ctrlKey;
}
function $ee0bdf4faa47f2a8$export$16792effe837dba3(e) {
    if ((0, $gP8Dl$reactariautils.isMac)()) return e.metaKey;
    return e.ctrlKey;
}


//# sourceMappingURL=utils.main.js.map
