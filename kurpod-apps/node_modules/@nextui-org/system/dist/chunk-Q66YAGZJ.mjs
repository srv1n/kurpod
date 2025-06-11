"use client";

// src/provider-context.ts
import { createContext } from "@nextui-org/react-utils";
var [ProviderContext, useProviderContext] = createContext({
  name: "ProviderContext",
  strict: false
});

export {
  ProviderContext,
  useProviderContext
};
