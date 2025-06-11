"use client";

// src/calendar-context.ts
import { createContext } from "@nextui-org/react-utils";
var [CalendarProvider, useCalendarContext] = createContext({
  name: "CalendarContext",
  strict: true,
  errorMessage: "useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider"
});

export {
  CalendarProvider,
  useCalendarContext
};
