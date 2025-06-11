type ScrollValue = {
    x: number;
    y: number;
};
interface UseScrollPositionOptions {
    /**
     * The wait time in milliseconds before triggering the callback.
     * @default 30
     */
    delay?: number;
    /**
     * Whether the scroll position should be tracked or not.
     * @default true
     */
    isEnabled?: boolean;
    /**
     * The element to track the scroll position for.
     */
    elementRef?: React.RefObject<HTMLElement> | null;
    /**
     * The callback function to be called when the scroll position changes.
     */
    callback?: ({ prevPos, currPos }: {
        prevPos: ScrollValue;
        currPos: ScrollValue;
    }) => void;
}
declare const useScrollPosition: (props: UseScrollPositionOptions) => ScrollValue;

export { ScrollValue, UseScrollPositionOptions, useScrollPosition };
