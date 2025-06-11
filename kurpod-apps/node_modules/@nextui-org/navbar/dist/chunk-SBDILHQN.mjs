"use client";

// src/navbar-transitions.ts
import { TRANSITION_EASINGS } from "@nextui-org/framer-utils";
var hideOnScrollVariants = {
  visible: {
    y: 0,
    transition: {
      ease: TRANSITION_EASINGS.easeOut
    }
  },
  hidden: {
    y: "-100%",
    transition: {
      ease: TRANSITION_EASINGS.easeIn
    }
  }
};

export {
  hideOnScrollVariants
};
