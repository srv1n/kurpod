"use client";

// src/navbar-context.ts
import { createContext } from "@nextui-org/react-utils";
var [NavbarProvider, useNavbarContext] = createContext({
  name: "NavbarContext",
  strict: true,
  errorMessage: "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />"
});

export {
  NavbarProvider,
  useNavbarContext
};
