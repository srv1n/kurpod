type ScrollOverflowVisibility = "auto" | "top" | "bottom" | "left" | "right" | "both" | "none";
type ScrollOverflowEdgeCheck = "all" | "top" | "bottom" | "left" | "right";
type ScrollOverflowOrientation = "horizontal" | "vertical";
type ScrollOverflowCheck = ScrollOverflowOrientation | "both";
interface UseDataScrollOverflowProps {
    /**
     * The reference to the DOM element on which we're checking overflow.
     */
    domRef?: React.RefObject<HTMLElement>;
    /**
     * Determines the direction of overflow to check.
     * - "horizontal" will check for overflow on the x-axis.
     * - "vertical" will check for overflow on the y-axis.
     * - "both" (default) will check for overflow on both axes.
     *
     * @default "both"
     */
    overflowCheck?: ScrollOverflowCheck;
    /**
     * Controlled visible state. Passing "auto" will make the shadow visible only when the scroll reaches the edge.
     * use "left" / "right" for horizontal scroll and "top" / "bottom" for vertical scroll.
     * @default "auto"
     */
    visibility?: ScrollOverflowVisibility;
    /**
     * Enables or disables the overflow checking mechanism.
     * @default true
     */
    isEnabled?: boolean;
    /**
     * Defines a buffer or margin within which we won't treat the scroll as reaching the edge.
     *
     * @default 0 - meaning the check will behave exactly at the edge.
     */
    offset?: number;
    /**
     * List of dependencies to update the overflow check.
     */
    updateDeps?: any[];
    /**
     * Callback to be called when the overflow state changes.
     *
     * @param visibility ScrollOverflowVisibility
     */
    onVisibilityChange?: (overflow: ScrollOverflowVisibility) => void;
}
declare function useDataScrollOverflow(props?: UseDataScrollOverflowProps): void;
type UseDataScrollOverflowReturn = ReturnType<typeof useDataScrollOverflow>;

export { ScrollOverflowCheck, ScrollOverflowEdgeCheck, ScrollOverflowOrientation, ScrollOverflowVisibility, UseDataScrollOverflowProps, UseDataScrollOverflowReturn, useDataScrollOverflow };
