import {RootView as $ad1d98aa8f0c31b4$export$e21886a4eef6b29a} from "./ReusableView.module.js";
import {isSetEqual as $fc36f9a046a9ce79$export$a8d0d0c8d1c5df64} from "./utils.module.js";
import {OverscanManager as $364191b3decf3697$export$4455ee6afb38dcbb} from "./OverscanManager.module.js";
import {Rect as $60423f92c7f9ad87$export$c79fc6492f3af13d} from "./Rect.module.js";
import {Size as $ee1bfa90a957fb8a$export$cb6da89c6af1a8ec} from "./Size.module.js";

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




class $38b9490c1cca8fc4$export$89be5a243e59c4b2 {
    /** Returns whether the given key, or an ancestor, is persisted. */ isPersistedKey(key) {
        // Quick check if the key is directly in the set of persisted keys.
        if (this.persistedKeys.has(key)) return true;
        // If not, check if the key is an ancestor of any of the persisted keys.
        for (let k of this.persistedKeys)while(k != null){
            let layoutInfo = this.layout.getLayoutInfo(k);
            if (!layoutInfo || layoutInfo.parentKey == null) break;
            k = layoutInfo.parentKey;
            if (k === key) return true;
        }
        return false;
    }
    getParentView(layoutInfo) {
        return layoutInfo.parentKey != null ? this._visibleViews.get(layoutInfo.parentKey) : this._rootView;
    }
    getReusableView(layoutInfo) {
        let parentView = this.getParentView(layoutInfo);
        let view = parentView.getReusableView(layoutInfo.type);
        view.layoutInfo = layoutInfo;
        this._renderView(view);
        return view;
    }
    _renderView(reusableView) {
        if (reusableView.layoutInfo) {
            let { type: type, key: key, content: content } = reusableView.layoutInfo;
            reusableView.content = content || this.collection.getItem(key);
            reusableView.rendered = this._renderContent(type, reusableView.content);
        }
    }
    _renderContent(type, content) {
        let cached = content != null ? this._renderedContent.get(content) : null;
        if (cached != null) return cached;
        let rendered = this.delegate.renderView(type, content);
        if (content) this._renderedContent.set(content, rendered);
        return rendered;
    }
    /**
   * Returns the key for the item view currently at the given point.
   */ keyAtPoint(point) {
        let rect = new (0, $60423f92c7f9ad87$export$c79fc6492f3af13d)(point.x, point.y, 1, 1);
        let layoutInfos = rect.area === 0 ? [] : this.layout.getVisibleLayoutInfos(rect);
        // Layout may return multiple layout infos in the case of
        // persisted keys, so find the first one that actually intersects.
        for (let layoutInfo of layoutInfos){
            if (layoutInfo.rect.intersects(rect)) return layoutInfo.key;
        }
        return null;
    }
    relayout(context = {}) {
        // Update the layout
        this.layout.update(context);
        this.contentSize = this.layout.getContentSize();
        // Constrain scroll position.
        // If the content changed, scroll to the top.
        let visibleRect = this.visibleRect;
        let contentOffsetX = context.contentChanged ? 0 : visibleRect.x;
        let contentOffsetY = context.contentChanged ? 0 : visibleRect.y;
        contentOffsetX = Math.max(0, Math.min(this.contentSize.width - visibleRect.width, contentOffsetX));
        contentOffsetY = Math.max(0, Math.min(this.contentSize.height - visibleRect.height, contentOffsetY));
        if (contentOffsetX !== visibleRect.x || contentOffsetY !== visibleRect.y) {
            // If the offset changed, trigger a new re-render.
            let rect = new (0, $60423f92c7f9ad87$export$c79fc6492f3af13d)(contentOffsetX, contentOffsetY, visibleRect.width, visibleRect.height);
            this.delegate.setVisibleRect(rect);
        } else this.updateSubviews();
    }
    getVisibleLayoutInfos() {
        let isTestEnv = false;
        let isClientWidthMocked = isTestEnv && typeof HTMLElement !== 'undefined' && Object.getOwnPropertyNames(HTMLElement.prototype).includes('clientWidth');
        let isClientHeightMocked = isTestEnv && typeof HTMLElement !== 'undefined' && Object.getOwnPropertyNames(HTMLElement.prototype).includes('clientHeight');
        let rect;
        if (isTestEnv && !(isClientWidthMocked && isClientHeightMocked)) rect = new (0, $60423f92c7f9ad87$export$c79fc6492f3af13d)(0, 0, this.contentSize.width, this.contentSize.height);
        else rect = this._overscanManager.getOverscannedRect();
        let layoutInfos = rect.area === 0 ? [] : this.layout.getVisibleLayoutInfos(rect);
        let map = new Map;
        for (let layoutInfo of layoutInfos)map.set(layoutInfo.key, layoutInfo);
        return map;
    }
    updateSubviews() {
        let visibleLayoutInfos = this.getVisibleLayoutInfos();
        let removed = new Set();
        for (let [key, view] of this._visibleViews){
            let layoutInfo = visibleLayoutInfos.get(key);
            // If a view's parent changed, treat it as a delete and re-create in the new parent.
            if (!layoutInfo || view.parent !== this.getParentView(layoutInfo)) {
                this._visibleViews.delete(key);
                view.parent.reuseChild(view);
                removed.add(view); // Defer removing in case we reuse this view.
            }
        }
        for (let [key, layoutInfo] of visibleLayoutInfos){
            let view = this._visibleViews.get(key);
            if (!view) {
                view = this.getReusableView(layoutInfo);
                view.parent.children.add(view);
                this._visibleViews.set(key, view);
                removed.delete(view);
            } else {
                view.layoutInfo = layoutInfo;
                let item = this.collection.getItem(layoutInfo.key);
                if (view.content !== item) {
                    if (view.content != null) this._renderedContent.delete(view.content);
                    this._renderView(view);
                }
            }
        }
        // The remaining views in `removed` were not reused to render new items.
        // They should be removed from the DOM. We also clear the reusable view queue
        // here since there's no point holding onto views that have been removed.
        // Doing so hurts performance in the future when reusing elements due to FIFO order.
        for (let view of removed){
            view.parent.children.delete(view);
            view.parent.reusableViews.clear();
        }
        // Reordering DOM nodes is costly, so we defer this until scrolling stops.
        // DOM order does not affect visual order (due to absolute positioning),
        // but does matter for assistive technology users.
        if (!this._isScrolling) // Layout infos must be in topological order (parents before children).
        for (let key of visibleLayoutInfos.keys()){
            let view = this._visibleViews.get(key);
            view.parent.children.delete(view);
            view.parent.children.add(view);
        }
    }
    /** Performs layout and updates visible views as needed. */ render(opts) {
        let mutableThis = this;
        let needsLayout = false;
        let offsetChanged = false;
        let sizeChanged = false;
        let itemSizeChanged = false;
        let needsUpdate = false;
        if (opts.collection !== this.collection) {
            mutableThis.collection = opts.collection;
            needsLayout = true;
        }
        if (opts.layout !== this.layout || this.layout.virtualizer !== this) {
            if (this.layout) this.layout.virtualizer = null;
            opts.layout.virtualizer = this;
            mutableThis.layout = opts.layout;
            needsLayout = true;
        }
        if (opts.persistedKeys && !(0, $fc36f9a046a9ce79$export$a8d0d0c8d1c5df64)(opts.persistedKeys, this.persistedKeys)) {
            mutableThis.persistedKeys = opts.persistedKeys;
            needsUpdate = true;
        }
        if (!this.visibleRect.equals(opts.visibleRect)) {
            this._overscanManager.setVisibleRect(opts.visibleRect);
            let shouldInvalidate = this.layout.shouldInvalidate(opts.visibleRect, this.visibleRect);
            if (shouldInvalidate) {
                offsetChanged = !opts.visibleRect.pointEquals(this.visibleRect);
                sizeChanged = !opts.visibleRect.sizeEquals(this.visibleRect);
                needsLayout = true;
            } else needsUpdate = true;
            mutableThis.visibleRect = opts.visibleRect;
        }
        if (opts.invalidationContext !== this._invalidationContext) {
            if (opts.invalidationContext) {
                sizeChanged || (sizeChanged = opts.invalidationContext.sizeChanged || false);
                offsetChanged || (offsetChanged = opts.invalidationContext.offsetChanged || false);
                itemSizeChanged || (itemSizeChanged = opts.invalidationContext.itemSizeChanged || false);
                needsLayout || (needsLayout = itemSizeChanged || sizeChanged || offsetChanged);
                needsLayout || (needsLayout = opts.invalidationContext.layoutOptions !== this._invalidationContext.layoutOptions);
            }
            this._invalidationContext = opts.invalidationContext;
        }
        if (opts.isScrolling !== this._isScrolling) {
            this._isScrolling = opts.isScrolling;
            if (!opts.isScrolling) // Update to fix the DOM order after scrolling.
            needsUpdate = true;
        }
        if (needsLayout) this.relayout({
            offsetChanged: offsetChanged,
            sizeChanged: sizeChanged,
            itemSizeChanged: itemSizeChanged,
            layoutOptions: this._invalidationContext.layoutOptions
        });
        else if (needsUpdate) this.updateSubviews();
        return Array.from(this._rootView.children);
    }
    getVisibleView(key) {
        return this._visibleViews.get(key);
    }
    invalidate(context) {
        this.delegate.invalidate(context);
    }
    updateItemSize(key, size) {
        if (!this.layout.updateItemSize) return;
        let changed = this.layout.updateItemSize(key, size);
        if (changed) this.invalidate({
            itemSizeChanged: true
        });
    }
    constructor(options){
        this.delegate = options.delegate;
        this.collection = options.collection;
        this.layout = options.layout;
        this.contentSize = new (0, $ee1bfa90a957fb8a$export$cb6da89c6af1a8ec);
        this.visibleRect = new (0, $60423f92c7f9ad87$export$c79fc6492f3af13d);
        this.persistedKeys = new Set();
        this._visibleViews = new Map();
        this._renderedContent = new WeakMap();
        this._rootView = new (0, $ad1d98aa8f0c31b4$export$e21886a4eef6b29a)(this);
        this._isScrolling = false;
        this._invalidationContext = {};
        this._overscanManager = new (0, $364191b3decf3697$export$4455ee6afb38dcbb)();
    }
}


export {$38b9490c1cca8fc4$export$89be5a243e59c4b2 as Virtualizer};
//# sourceMappingURL=Virtualizer.module.js.map
