"use client";

// src/radio-group-context.ts
import { createContext } from "@nextui-org/react-utils";
var [RadioGroupProvider, useRadioGroupContext] = createContext({
  name: "RadioGroupContext",
  strict: false
});

export {
  RadioGroupProvider,
  useRadioGroupContext
};
