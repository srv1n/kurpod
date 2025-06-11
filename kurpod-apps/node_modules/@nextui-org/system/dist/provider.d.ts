import '@nextui-org/system-rsc';
import './types.js';
import { ModalProviderProps } from '@react-aria/overlays';
import { ProviderContextProps } from './provider-context.js';
import { Href, RouterOptions } from '@react-types/shared';
import { I18nProviderProps } from '@react-aria/i18n';
import 'react';
import '@internationalized/date';
import '@react-types/datepicker';

interface NextUIProviderProps extends Omit<ModalProviderProps, "children">, ProviderContextProps {
    children: React.ReactNode;
    /**
     * Controls whether `framer-motion` animations are skipped within the application.
     * This property is automatically enabled (`true`) when the `disableAnimation` prop is set to `true`,
     * effectively skipping all `framer-motion` animations. To retain `framer-motion` animations while
     * using the `disableAnimation` prop for other purposes, set this to `false`. However, note that
     * animations in NextUI Components are still omitted if the `disableAnimation` prop is `true`.
     */
    skipFramerMotionAnimations?: boolean;
    /**
     * Defines a new default transition for the entire tree.
     * @default "never"
     * See: https://www.framer.com/motion/motion-config/#props
     */
    reducedMotion?: "user" | "always" | "never";
    /**
     * The locale to apply to the children.
     * @default "en-US"
     */
    locale?: I18nProviderProps["locale"];
    /**
     * Provides a client side router to all nested components such as
     * Link, Menu, Tabs, Table, etc.
     */
    navigate?: (path: Href, routerOptions: RouterOptions | undefined) => void;
    /**
     * Convert an `href` provided to a link component to a native `href`
     * For example, a router might accept hrefs relative to a base path,
     * or offer additional custom ways of specifying link destinations.
     * The original href specified on the link is passed to the navigate function of the RouterProvider,
     * and useHref is used to generate the full native href to put on the actual DOM element.
     */
    useHref?: (href: Href) => string;
}
declare const NextUIProvider: React.FC<NextUIProviderProps>;

export { NextUIProvider, NextUIProviderProps };
