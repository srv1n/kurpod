"use client";

// src/checkbox-group-context.ts
import { createContext } from "@nextui-org/react-utils";
var [CheckboxGroupProvider, useCheckboxGroupContext] = createContext({
  name: "CheckboxGroupContext",
  strict: false
});

export {
  CheckboxGroupProvider,
  useCheckboxGroupContext
};
