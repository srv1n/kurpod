"use client";

// src/utils.ts
import { useContext, useMemo } from "react";
import { mergeProps, mergeRefs, useObjectRef } from "@react-aria/utils";
var DEFAULT_SLOT = Symbol("default");
function useSlottedContext(context, slot) {
  let ctx = useContext(context);
  if (slot === null) {
    return null;
  }
  if (ctx && typeof ctx === "object" && "slots" in ctx && ctx.slots) {
    let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map((p) => `"${p}"`));
    if (!slot && !ctx.slots[DEFAULT_SLOT]) {
      throw new Error(`A slot prop is required. Valid slot names are ${availableSlots}.`);
    }
    let slotKey = slot || DEFAULT_SLOT;
    if (!ctx.slots[slotKey]) {
      throw new Error(`Invalid slot "${slot}". Valid slot names are ${availableSlots}.`);
    }
    return ctx.slots[slotKey];
  }
  return ctx;
}
function useContextProps(props, ref, context) {
  let ctx = useSlottedContext(context, props.slot) || {};
  let { ref: contextRef, ...contextProps } = ctx;
  let mergedRef = useObjectRef(useMemo(() => mergeRefs(ref, contextRef), [ref, contextRef]));
  let mergedProps = mergeProps(contextProps, props);
  if ("style" in contextProps && contextProps.style && "style" in props && props.style) {
    if (typeof contextProps.style === "function" || typeof props.style === "function") {
      mergedProps.style = (renderProps) => {
        let contextStyle = typeof contextProps.style === "function" ? contextProps.style(renderProps) : contextProps.style;
        let defaultStyle = { ...renderProps.defaultStyle, ...contextStyle };
        let style = typeof props.style === "function" ? props.style({ ...renderProps, defaultStyle }) : props.style;
        return { ...defaultStyle, ...style };
      };
    } else {
      mergedProps.style = { ...contextProps.style, ...props.style };
    }
  }
  return [mergedProps, mergedRef];
}

export {
  DEFAULT_SLOT,
  useSlottedContext,
  useContextProps
};
