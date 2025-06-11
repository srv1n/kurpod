"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allEvents = exports.changeEvents = exports.otherEvents = exports.transitionEvents = exports.animationEvents = exports.wheelEvents = exports.uiEvents = exports.pointerEvents = exports.touchEvents = exports.selectionEvents = exports.dragEvents = exports.mouseEvents = exports.mediaEvents = exports.keyboardEvents = exports.imageEvents = exports.formEvents = exports.focusEvents = exports.compositionEvents = exports.clipboardEvents = void 0;
// As defined on the list of supported events: https://reactjs.org/docs/events.html
exports.clipboardEvents = ['onCopy', 'onCut', 'onPaste'];
exports.compositionEvents = [
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
];
exports.focusEvents = ['onFocus', 'onBlur'];
exports.formEvents = ['onInput', 'onInvalid', 'onReset', 'onSubmit'];
exports.imageEvents = ['onLoad', 'onError'];
exports.keyboardEvents = ['onKeyDown', 'onKeyPress', 'onKeyUp'];
exports.mediaEvents = [
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
];
exports.mouseEvents = [
    'onClick',
    'onContextMenu',
    'onDoubleClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
];
exports.dragEvents = [
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
];
exports.selectionEvents = ['onSelect'];
exports.touchEvents = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];
exports.pointerEvents = [
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
];
exports.uiEvents = ['onScroll'];
exports.wheelEvents = ['onWheel'];
exports.animationEvents = [
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
];
exports.transitionEvents = ['onTransitionEnd'];
exports.otherEvents = ['onToggle'];
exports.changeEvents = ['onChange'];
exports.allEvents = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], exports.clipboardEvents, true), exports.compositionEvents, true), exports.focusEvents, true), exports.formEvents, true), exports.imageEvents, true), exports.keyboardEvents, true), exports.mediaEvents, true), exports.mouseEvents, true), exports.dragEvents, true), exports.selectionEvents, true), exports.touchEvents, true), exports.pointerEvents, true), exports.uiEvents, true), exports.wheelEvents, true), exports.animationEvents, true), exports.transitionEvents, true), exports.changeEvents, true), exports.otherEvents, true);
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
function makeEventProps(props, getArgs) {
    var eventProps = {};
    exports.allEvents.forEach(function (eventName) {
        var eventHandler = props[eventName];
        if (!eventHandler) {
            return;
        }
        if (getArgs) {
            eventProps[eventName] = (function (event) {
                return eventHandler(event, getArgs(eventName));
            });
        }
        else {
            eventProps[eventName] = eventHandler;
        }
    });
    return eventProps;
}
exports.default = makeEventProps;
