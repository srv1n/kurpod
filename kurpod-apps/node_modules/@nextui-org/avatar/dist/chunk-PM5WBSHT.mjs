"use client";

// src/avatar-group-context.ts
import { createContext } from "@nextui-org/react-utils";
var [AvatarGroupProvider, useAvatarGroupContext] = createContext({
  name: "AvatarGroupContext",
  strict: false
});

export {
  AvatarGroupProvider,
  useAvatarGroupContext
};
