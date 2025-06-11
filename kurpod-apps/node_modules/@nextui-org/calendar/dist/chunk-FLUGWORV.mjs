"use client";

// src/utils.ts
import { startOfYear } from "@internationalized/date";
function getYearRange(start, end) {
  const years = [];
  if (!start || !end) {
    return years;
  }
  let current = startOfYear(start);
  while (current.compare(end) <= 0) {
    years.push(current);
    current = startOfYear(current.add({ years: 1 }));
  }
  return years;
}
function addMonths(date, months) {
  return date.add({ months });
}
function getMonthsInYear(year) {
  const firstMonth = startOfYear(year);
  const months = [firstMonth];
  while (months.length < 12) {
    const prevMonth = months[months.length - 1];
    months.push(addMonths(prevMonth, 1));
  }
  return months;
}

export {
  getYearRange,
  addMonths,
  getMonthsInYear
};
