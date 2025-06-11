import { DOMRefValue, FocusableRefValue, FocusableRef } from '@react-types/shared';
import { RefObject, Ref, MutableRefObject } from 'react';

declare function canUseDOM(): boolean;
declare const isBrowser: boolean;
declare function getUserAgentBrowser(navigator: Navigator): "Chrome for iOS" | "Edge" | "Silk" | "Chrome" | "Firefox" | "AOSP" | "IE" | "Safari" | "WebKit" | null;
type UserAgentBrowser = NonNullable<ReturnType<typeof getUserAgentBrowser>>;
declare function getUserAgentOS(navigator: Navigator): "Android" | "iOS" | "Windows" | "Mac" | "Chrome OS" | "Firefox OS" | null;
type UserAgentOS = NonNullable<ReturnType<typeof getUserAgentOS>>;
declare function detectDeviceType(navigator: Navigator): "tablet" | "phone" | "desktop";
type UserAgentDeviceType = NonNullable<ReturnType<typeof detectDeviceType>>;
declare function detectOS(os: UserAgentOS): boolean;
declare function detectBrowser(browser: UserAgentBrowser): boolean;
declare function detectTouch(): boolean;
declare function createDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T>): DOMRefValue<T>;
declare function createFocusableRef<T extends HTMLElement = HTMLElement>(domRef: RefObject<T>, focusableRef?: RefObject<HTMLElement>): FocusableRefValue<T>;
declare function useDOMRef<T extends HTMLElement = HTMLElement>(ref?: RefObject<T | null> | Ref<T | null>): RefObject<T>;
declare function useFocusableRef<T extends HTMLElement = HTMLElement>(ref: FocusableRef<T>, focusableRef?: RefObject<HTMLElement>): RefObject<T>;
interface ContextValue<T> {
    ref?: MutableRefObject<T>;
}
declare function useSyncRef<T>(context: ContextValue<T | null>, ref: RefObject<T>): void;
/**
 * Checks if two DOMRect objects intersect each other.
 *
 * @param rect1 - The first DOMRect object.
 * @param rect2 - The second DOMRect object.
 * @returns A boolean indicating whether the two DOMRect objects intersect.
 */
declare function areRectsIntersecting(rect1: DOMRect, rect2: DOMRect): boolean;

export { ContextValue, UserAgentBrowser, UserAgentDeviceType, UserAgentOS, areRectsIntersecting, canUseDOM, createDOMRef, createFocusableRef, detectBrowser, detectDeviceType, detectOS, detectTouch, getUserAgentBrowser, getUserAgentOS, isBrowser, useDOMRef, useFocusableRef, useSyncRef };
