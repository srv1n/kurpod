"use client";

// src/button-group-context.ts
import { createContext } from "@nextui-org/react-utils";
var [ButtonGroupProvider, useButtonGroupContext] = createContext({
  name: "ButtonGroupContext",
  strict: false
});

export {
  ButtonGroupProvider,
  useButtonGroupContext
};
