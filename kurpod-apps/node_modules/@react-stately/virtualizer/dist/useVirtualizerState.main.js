var $41b7691783731623$exports = require("./Rect.main.js");
var $e1bc15d49d21df0e$exports = require("./Virtualizer.main.js");
var $amfZP$react = require("react");
var $amfZP$reactariautils = require("@react-aria/utils");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useVirtualizerState", () => $f02ef43b5e8eee9b$export$1505db82fe357e65);
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



function $f02ef43b5e8eee9b$export$1505db82fe357e65(opts) {
    let [visibleRect, setVisibleRect] = (0, $amfZP$react.useState)(new (0, $41b7691783731623$exports.Rect)(0, 0, 0, 0));
    let [isScrolling, setScrolling] = (0, $amfZP$react.useState)(false);
    let [invalidationContext, setInvalidationContext] = (0, $amfZP$react.useState)({});
    let visibleRectChanged = (0, $amfZP$react.useRef)(false);
    let [virtualizer] = (0, $amfZP$react.useState)(()=>new (0, $e1bc15d49d21df0e$exports.Virtualizer)({
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
    (0, $amfZP$reactariautils.useLayoutEffect)(()=>{
        if (visibleRectChanged.current) {
            visibleRectChanged.current = false;
            opts.onVisibleRectChange(visibleRect);
        }
    });
    let mergedInvalidationContext = (0, $amfZP$react.useMemo)(()=>{
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
    let startScrolling = (0, $amfZP$react.useCallback)(()=>{
        setScrolling(true);
    }, []);
    let endScrolling = (0, $amfZP$react.useCallback)(()=>{
        setScrolling(false);
    }, []);
    let state = (0, $amfZP$react.useMemo)(()=>({
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


//# sourceMappingURL=useVirtualizerState.main.js.map
