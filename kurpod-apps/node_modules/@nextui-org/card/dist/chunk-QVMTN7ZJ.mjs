"use client";

// src/card-context.ts
import { createContext } from "@nextui-org/react-utils";
var [CardProvider, useCardContext] = createContext({
  name: "CardContext",
  strict: true,
  errorMessage: "useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"
});

export {
  CardProvider,
  useCardContext
};
