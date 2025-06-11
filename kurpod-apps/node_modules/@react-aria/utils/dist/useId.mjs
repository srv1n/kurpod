import {useLayoutEffect as $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c} from "./useLayoutEffect.mjs";
import {useValueEffect as $1dbecbe27a04f9af$export$14d238f342723f25} from "./useValueEffect.mjs";
import {useState as $eKkEp$useState, useRef as $eKkEp$useRef, useCallback as $eKkEp$useCallback, useEffect as $eKkEp$useEffect} from "react";
import {useSSRSafeId as $eKkEp$useSSRSafeId} from "@react-aria/ssr";

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



// copied from SSRProvider.tsx to reduce exports, if needed again, consider sharing
let $bdb11010cef70236$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
let $bdb11010cef70236$var$idsUpdaterMap = new Map();
function $bdb11010cef70236$export$f680877a34711e37(defaultId) {
    let [value, setValue] = (0, $eKkEp$useState)(defaultId);
    let nextId = (0, $eKkEp$useRef)(null);
    let res = (0, $eKkEp$useSSRSafeId)(value);
    let updateValue = (0, $eKkEp$useCallback)((val)=>{
        nextId.current = val;
    }, []);
    if ($bdb11010cef70236$var$canUseDOM) {
        // TS not smart enough to know that `has` means the value exists
        if ($bdb11010cef70236$var$idsUpdaterMap.has(res) && !$bdb11010cef70236$var$idsUpdaterMap.get(res).includes(updateValue)) $bdb11010cef70236$var$idsUpdaterMap.set(res, [
            ...$bdb11010cef70236$var$idsUpdaterMap.get(res),
            updateValue
        ]);
        else $bdb11010cef70236$var$idsUpdaterMap.set(res, [
            updateValue
        ]);
    }
    (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(()=>{
        let r = res;
        return ()=>{
            $bdb11010cef70236$var$idsUpdaterMap.delete(r);
        };
    }, [
        res
    ]);
    // This cannot cause an infinite loop because the ref is updated first.
    // eslint-disable-next-line
    (0, $eKkEp$useEffect)(()=>{
        let newId = nextId.current;
        if (newId) {
            nextId.current = null;
            setValue(newId);
        }
    });
    return res;
}
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
    if (idA === idB) return idA;
    let setIdsA = $bdb11010cef70236$var$idsUpdaterMap.get(idA);
    if (setIdsA) {
        setIdsA.forEach((fn)=>fn(idB));
        return idB;
    }
    let setIdsB = $bdb11010cef70236$var$idsUpdaterMap.get(idB);
    if (setIdsB) {
        setIdsB.forEach((fn)=>fn(idA));
        return idA;
    }
    return idB;
}
function $bdb11010cef70236$export$b4cc09c592e8fdb8(depArray = []) {
    let id = $bdb11010cef70236$export$f680877a34711e37();
    let [resolvedId, setResolvedId] = (0, $1dbecbe27a04f9af$export$14d238f342723f25)(id);
    let updateId = (0, $eKkEp$useCallback)(()=>{
        setResolvedId(function*() {
            yield id;
            yield document.getElementById(id) ? id : undefined;
        });
    }, [
        id,
        setResolvedId
    ]);
    (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(updateId, [
        id,
        updateId,
        ...depArray
    ]);
    return resolvedId;
}


export {$bdb11010cef70236$export$f680877a34711e37 as useId, $bdb11010cef70236$export$cd8c9cb68f842629 as mergeIds, $bdb11010cef70236$export$b4cc09c592e8fdb8 as useSlotId};
//# sourceMappingURL=useId.module.js.map
