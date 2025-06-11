"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PaginationItemType: () => PaginationItemType,
  usePagination: () => usePagination
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
var import_i18n = require("@react-aria/i18n");
var import_shared_utils = require("@nextui-org/shared-utils");
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
  const [activePage, setActivePage] = (0, import_react.useState)(page || initialPage);
  const { direction } = (0, import_i18n.useLocale)();
  const isRTL = direction === "rtl";
  const onChangeActivePage = (newPage) => {
    setActivePage(newPage);
    onChange && onChange(newPage);
  };
  (0, import_react.useEffect)(() => {
    if (page && page !== activePage) {
      setActivePage(page);
    }
  }, [page]);
  const setPage = (0, import_react.useCallback)(
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
  const formatRange = (0, import_react.useCallback)(
    (range2) => {
      if (showControls) {
        return isRTL ? ["next" /* NEXT */, ...range2, "prev" /* PREV */] : ["prev" /* PREV */, ...range2, "next" /* NEXT */];
      }
      return range2;
    },
    [isRTL, showControls]
  );
  const paginationRange = (0, import_react.useMemo)(() => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= total) {
      return formatRange((0, import_shared_utils.range)(1, total));
    }
    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries);
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return formatRange([
        ...(0, import_shared_utils.range)(1, leftItemCount),
        "dots" /* DOTS */,
        ...(0, import_shared_utils.range)(total - (boundaries - 1), total)
      ]);
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return formatRange([
        ...(0, import_shared_utils.range)(1, boundaries),
        "dots" /* DOTS */,
        ...(0, import_shared_utils.range)(total - rightItemCount, total)
      ]);
    }
    return formatRange([
      ...(0, import_shared_utils.range)(1, boundaries),
      "dots" /* DOTS */,
      ...(0, import_shared_utils.range)(leftSiblingIndex, rightSiblingIndex),
      "dots" /* DOTS */,
      ...(0, import_shared_utils.range)(total - boundaries + 1, total)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PaginationItemType,
  usePagination
});
