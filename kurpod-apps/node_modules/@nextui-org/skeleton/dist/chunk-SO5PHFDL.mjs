"use client";
import {
  useSkeleton
} from "./chunk-YENB4D5W.mjs";

// src/skeleton.tsx
import { forwardRef } from "@nextui-org/system";
import { jsx } from "react/jsx-runtime";
var Skeleton = forwardRef((props, ref) => {
  const { Component, children, getSkeletonProps, getContentProps } = useSkeleton({ ...props });
  return /* @__PURE__ */ jsx(Component, { ref, ...getSkeletonProps(), children: /* @__PURE__ */ jsx("div", { ...getContentProps(), children }) });
});
Skeleton.displayName = "NextUI.Skeleton";
var skeleton_default = Skeleton;

export {
  skeleton_default
};
