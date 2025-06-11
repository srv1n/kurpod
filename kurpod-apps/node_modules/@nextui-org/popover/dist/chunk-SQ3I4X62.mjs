"use client";

// src/popover-context.ts
import { createContext } from "@nextui-org/react-utils";
var [PopoverProvider, usePopoverContext] = createContext({
  name: "PopoverContext",
  errorMessage: "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"
});

export {
  PopoverProvider,
  usePopoverContext
};
