import {
  tv
} from "./chunk-UWE6H66T.mjs";

// src/components/date-picker.ts
var datePicker = tv({
  slots: {
    base: "group w-full",
    selectorButton: "-mx-2 text-inherit",
    selectorIcon: "text-lg text-inherit pointer-events-none flex-shrink-0",
    popoverContent: "p-0 w-full",
    calendar: "w-[calc(var(--visible-months)_*_var(--calendar-width))] shadow-none",
    calendarContent: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    timeInputLabel: "font-medium",
    timeInput: "px-5 pb-4 flex-wrap gap-x-6"
  }
});
var dateRangePicker = tv({
  extend: datePicker,
  slots: {
    calendar: "group",
    bottomContent: "flex flex-col gap-y-2",
    timeInputWrapper: "flex flex-col group-data-[has-multiple-months=true]:flex-row",
    separator: "-mx-1 text-inherit"
  }
});

export {
  datePicker,
  dateRangePicker
};
