import {isAppleDevice as $jUnAJ$isAppleDevice, isMac as $jUnAJ$isMac} from "@react-aria/utils";

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
function $feb5ffebff200149$export$d3e3bd3e26688c04(e) {
    // Ctrl + Arrow Up/Arrow Down has a system wide meaning on macOS, so use Alt instead.
    // On Windows and Ubuntu, Alt + Space has a system wide meaning.
    return (0, $jUnAJ$isAppleDevice)() ? e.altKey : e.ctrlKey;
}
function $feb5ffebff200149$export$16792effe837dba3(e) {
    if ((0, $jUnAJ$isMac)()) return e.metaKey;
    return e.ctrlKey;
}


export {$feb5ffebff200149$export$d3e3bd3e26688c04 as isNonContiguousSelectionModifier, $feb5ffebff200149$export$16792effe837dba3 as isCtrlKeyPressed};
//# sourceMappingURL=utils.module.js.map
