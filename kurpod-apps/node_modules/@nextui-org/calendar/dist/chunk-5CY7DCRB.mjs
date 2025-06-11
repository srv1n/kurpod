"use client";

// src/calendar-transitions.ts
var transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3
};
var slideVariants = {
  enter: (direction) => ({
    x: `${direction * 100}%`
  }),
  center: {
    x: "0%"
  },
  exit: (direction) => ({
    x: `${direction * -100}%`
  })
};

export {
  transition,
  slideVariants
};
