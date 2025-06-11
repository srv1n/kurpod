export declare const clipboardEvents: readonly ["onCopy", "onCut", "onPaste"];
export declare const compositionEvents: readonly ["onCompositionEnd", "onCompositionStart", "onCompositionUpdate"];
export declare const focusEvents: readonly ["onFocus", "onBlur"];
export declare const formEvents: readonly ["onInput", "onInvalid", "onReset", "onSubmit"];
export declare const imageEvents: readonly ["onLoad", "onError"];
export declare const keyboardEvents: readonly ["onKeyDown", "onKeyPress", "onKeyUp"];
export declare const mediaEvents: readonly ["onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting"];
export declare const mouseEvents: readonly ["onClick", "onContextMenu", "onDoubleClick", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp"];
export declare const dragEvents: readonly ["onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop"];
export declare const selectionEvents: readonly ["onSelect"];
export declare const touchEvents: readonly ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
export declare const pointerEvents: readonly ["onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture", "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut"];
export declare const uiEvents: readonly ["onScroll"];
export declare const wheelEvents: readonly ["onWheel"];
export declare const animationEvents: readonly ["onAnimationStart", "onAnimationEnd", "onAnimationIteration"];
export declare const transitionEvents: readonly ["onTransitionEnd"];
export declare const otherEvents: readonly ["onToggle"];
export declare const changeEvents: readonly ["onChange"];
export declare const allEvents: readonly ["onCopy", "onCut", "onPaste", "onCompositionEnd", "onCompositionStart", "onCompositionUpdate", "onFocus", "onBlur", "onInput", "onInvalid", "onReset", "onSubmit", "onLoad", "onError", "onKeyDown", "onKeyPress", "onKeyUp", "onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting", "onClick", "onContextMenu", "onDoubleClick", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onSelect", "onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart", "onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture", "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut", "onScroll", "onWheel", "onAnimationStart", "onAnimationEnd", "onAnimationIteration", "onTransitionEnd", "onChange", "onToggle"];
type AllEvents = (typeof allEvents)[number];
type EventHandler<ArgsType> = (event: any, args: ArgsType) => void;
type EventHandlerWithoutArgs<ArgsType, OriginalEventHandler> = OriginalEventHandler extends (event: infer Event, args: ArgsType) => void ? (event: Event) => void : never;
export type EventProps<ArgsType> = {
    [K in AllEvents]?: EventHandler<ArgsType>;
};
type Props<ArgsType> = Record<string, unknown> & EventProps<ArgsType>;
type EventPropsWithoutArgs<ArgsType, PropsType> = {
    [K in keyof PropsType as K extends AllEvents ? K : never]: EventHandlerWithoutArgs<ArgsType, PropsType[K]>;
};
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
export default function makeEventProps<ArgsType, PropsType extends Props<ArgsType> = Props<ArgsType>>(props: PropsType, getArgs?: (eventName: string) => ArgsType): EventPropsWithoutArgs<ArgsType, PropsType>;
export {};
