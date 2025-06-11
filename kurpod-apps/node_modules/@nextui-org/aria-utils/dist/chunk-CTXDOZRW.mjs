"use client";

// src/overlays/ariaShouldCloseOnInteractOutside.ts
var ariaShouldCloseOnInteractOutside = (element, triggerRef, state) => {
  const trigger = triggerRef == null ? void 0 : triggerRef.current;
  if (!trigger || !trigger.contains(element)) {
    const startElements = document.querySelectorAll("body > span[data-focus-scope-start]");
    let focusScopeElements = [];
    startElements.forEach((startElement) => {
      focusScopeElements.push(startElement.nextElementSibling);
    });
    if (focusScopeElements.length === 1) {
      state.close();
      return false;
    }
  }
  return !trigger || !trigger.contains(element);
};

export {
  ariaShouldCloseOnInteractOutside
};
