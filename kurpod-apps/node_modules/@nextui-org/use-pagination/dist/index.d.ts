declare enum PaginationItemType {
    DOTS = "dots",
    PREV = "prev",
    NEXT = "next"
}
interface UsePaginationProps {
    /**
     * The total number of pages.
     */
    total: number;
    /**
     * The selected page on initial render.
     * @default 1
     */
    initialPage?: number;
    /**
     * The controlled selected page.
     */
    page?: number;
    /**
     * The number of pages to show on each side of the current page.
     * @default 1
     */
    siblings?: number;
    /**
     * The number of pages to show at the beginning and end of the pagination.
     * @default 1
     */
    boundaries?: number;
    /**
     * If `true`, the range will include "prev" and "next" buttons.
     * @default false
     */
    showControls?: boolean;
    /**
     * Callback fired when the page changes.
     */
    onChange?: (page: number) => void;
}
type PaginationItemValue = number | PaginationItemType;
declare function usePagination(props: UsePaginationProps): {
    range: PaginationItemValue[];
    activePage: number;
    setPage: (pageNumber: number) => void;
    next: () => void;
    previous: () => void;
    first: () => void;
    last: () => void;
};
type UsePaginationReturn = ReturnType<typeof usePagination>;

export { PaginationItemType, PaginationItemValue, UsePaginationProps, UsePaginationReturn, usePagination };
