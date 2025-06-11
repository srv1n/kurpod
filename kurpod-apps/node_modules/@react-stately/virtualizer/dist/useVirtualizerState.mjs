import {Rect as $60423f92c7f9ad87$export$c79fc6492f3af13d} from "./Rect.mjs";
import {Virtualizer as $38b9490c1cca8fc4$export$89be5a243e59c4b2} from "./Virtualizer.mjs";
import {useState as $3Fik3$useState, useRef as $3Fik3$useRef, useMemo as $3Fik3$useMemo, useCallback as $3Fik3$useCallback} from "react";
import {useLayoutEffect as $3Fik3$useLayoutEffect} from "@react-aria/utils";

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



function $fc0b13b484ac1194$export$1505db82fe357e65(opts) {
    let [visibleRect, setVisibleRect] = (0, $3Fik3$useState)(new (0, $60423f92c7f9ad87$export$c79fc6492f3af13d)(0, 0, 0, 0));
    let [isScrolling, setScrolling] = (0, $3Fik3$useState)(false);
    let [invalidationContext, setInvalidationContext] = (0, $3Fik3$useState)({});
    let visibleRectChanged = (0, $3Fik3$useRef)(false);
    let [virtualizer] = (0, $3Fik3$useState)(()=>new (0, $38b9490c1cca8fc4$export$89be5a243e59c4b2)({
            collection: opts.collection,
            layout: opts.layout,
            delegate: {
                setVisibleRect (rect) {
                    setVisibleRect(rect);
                    visibleRectChanged.current = true;
                },
                // TODO: should changing these invalidate the entire cache?
                renderView: opts.renderView,
                invalidate: setInvalidationContext
            }
        }));
    // onVisibleRectChange must be called from an effect, not during render.
    (0, $3Fik3$useLayoutEffect)(()=>{
        if (visibleRectChanged.current) {
            visibleRectChanged.current = false;
            opts.onVisibleRectChange(visibleRect);
        }
    });
    let mergedInvalidationContext = (0, $3Fik3$useMemo)(()=>{
        if (opts.layoutOptions != null) return {
            ...invalidationContext,
            layoutOptions: opts.layoutOptions
        };
        return invalidationContext;
    }, [
        invalidationContext,
        opts.layoutOptions
    ]);
    let visibleViews = virtualizer.render({
        layout: opts.layout,
        collection: opts.collection,
        persistedKeys: opts.persistedKeys,
        layoutOptions: opts.layoutOptions,
        visibleRect: visibleRect,
        invalidationContext: mergedInvalidationContext,
        isScrolling: isScrolling
    });
    let contentSize = virtualizer.contentSize;
    let startScrolling = (0, $3Fik3$useCallback)(()=>{
        setScrolling(true);
    }, []);
    let endScrolling = (0, $3Fik3$useCallback)(()=>{
        setScrolling(false);
    }, []);
    let state = (0, $3Fik3$useMemo)(()=>({
            virtualizer: virtualizer,
            visibleViews: visibleViews,
            setVisibleRect: setVisibleRect,
            contentSize: contentSize,
            isScrolling: isScrolling,
            startScrolling: startScrolling,
            endScrolling: endScrolling
        }), [
        virtualizer,
        visibleViews,
        setVisibleRect,
        contentSize,
        isScrolling,
        startScrolling,
        endScrolling
    ]);
    return state;
}


export {$fc0b13b484ac1194$export$1505db82fe357e65 as useVirtualizerState};
//# sourceMappingURL=useVirtualizerState.module.js.map
