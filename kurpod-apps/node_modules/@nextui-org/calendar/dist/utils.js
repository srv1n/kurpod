"use client";
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

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  addMonths: () => addMonths,
  getMonthsInYear: () => getMonthsInYear,
  getYearRange: () => getYearRange
});
module.exports = __toCommonJS(utils_exports);
var import_date = require("@internationalized/date");
function getYearRange(start, end) {
  const years = [];
  if (!start || !end) {
    return years;
  }
  let current = (0, import_date.startOfYear)(start);
  while (current.compare(end) <= 0) {
    years.push(current);
    current = (0, import_date.startOfYear)(current.add({ years: 1 }));
  }
  return years;
}
function addMonths(date, months) {
  return date.add({ months });
}
function getMonthsInYear(year) {
  const firstMonth = (0, import_date.startOfYear)(year);
  const months = [firstMonth];
  while (months.length < 12) {
    const prevMonth = months[months.length - 1];
    months.push(addMonths(prevMonth, 1));
  }
  return months;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addMonths,
  getMonthsInYear,
  getYearRange
});
