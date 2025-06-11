"use client";

// src/modal-context.ts
import { createContext } from "@nextui-org/react-utils";
var [ModalProvider, useModalContext] = createContext({
  name: "ModalContext",
  errorMessage: "useModalContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Modal />`"
});

export {
  ModalProvider,
  useModalContext
};
