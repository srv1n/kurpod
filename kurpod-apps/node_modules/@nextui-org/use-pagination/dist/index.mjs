// src/index.ts
import { useMemo, useCallback, useState, useEffect } from "react";
import { useLocale } from "@react-aria/i18n";
import { range } from "@nextui-org/shared-utils";
var PaginationItemType = /* @__PURE__ */ ((PaginationItemType2) => {
  PaginationItemType2["DOTS"] = "dots";
  PaginationItemType2["PREV"] = "prev";
  PaginationItemType2["NEXT"] = "next";
  return PaginationItemType2;
})(PaginationItemType || {});
function usePagination(props) {
  const {
    page,
    total,
    siblings = 1,
    boundaries = 1,
    initialPage = 1,
    showControls = false,
    onChange
  } = props;
  const [activePage, setActivePage] = useState(page || initialPage);
  const { direction } = useLocale();
  const isRTL = direction === "rtl";
  const onChangeActivePage = (newPage) => {
    setActivePage(newPage);
    onChange && onChange(newPage);
  };
  useEffect(() => {
    if (page && page !== activePage) {
      setActivePage(page);
    }
  }, [page]);
  const setPage = useCallback(
    (pageNumber) => {
      if (pageNumber <= 0) {
        onChangeActivePage(1);
      } else if (pageNumber > total) {
        onChangeActivePage(total);
      } else {
        onChangeActivePage(pageNumber);
      }
    },
    [total, activePage, onChangeActivePage]
  );
  const next = () => isRTL ? setPage(activePage - 1) : setPage(activePage + 1);
  const previous = () => isRTL ? setPage(activePage + 1) : setPage(activePage - 1);
  const first = () => isRTL ? setPage(total) : setPage(1);
  const last = () => isRTL ? setPage(1) : setPage(total);
  const formatRange = useCallback(
    (range2) => {
      if (showControls) {
        return isRTL ? ["next" /* NEXT */, ...range2, "prev" /* PREV */] : ["prev" /* PREV */, ...range2, "next" /* NEXT */];
      }
      return range2;
    },
    [isRTL, showControls]
  );
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= total) {
      return formatRange(range(1, total));
    }
    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries);
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return formatRange([
        ...range(1, leftItemCount),
        "dots" /* DOTS */,
        ...range(total - (boundaries - 1), total)
      ]);
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return formatRange([
        ...range(1, boundaries),
        "dots" /* DOTS */,
        ...range(total - rightItemCount, total)
      ]);
    }
    return formatRange([
      ...range(1, boundaries),
      "dots" /* DOTS */,
      ...range(leftSiblingIndex, rightSiblingIndex),
      "dots" /* DOTS */,
      ...range(total - boundaries + 1, total)
    ]);
  }, [total, activePage, siblings, boundaries, formatRange]);
  return {
    range: paginationRange,
    activePage,
    setPage,
    next,
    previous,
    first,
    last
  };
}
export {
  PaginationItemType,
  usePagination
};
