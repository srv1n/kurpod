// src/index.ts
import { useIsSSR } from "@react-aria/ssr";
var MOBILE_SCREEN_WIDTH = 700;
function useIsMobile() {
  let isSSR = useIsSSR();
  if (isSSR || typeof window === "undefined") {
    return false;
  }
  return window.screen.width <= MOBILE_SCREEN_WIDTH;
}
export {
  useIsMobile
};
