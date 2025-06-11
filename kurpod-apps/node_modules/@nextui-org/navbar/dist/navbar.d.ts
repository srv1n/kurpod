import * as _nextui_org_system from '@nextui-org/system';
import { UseNavbarProps } from './use-navbar.js';
import 'react';
import 'tailwind-variants';
import '@nextui-org/theme';
import '@nextui-org/react-utils';
import 'framer-motion';

interface NavbarProps extends Omit<UseNavbarProps, "hideOnScroll"> {
    children?: React.ReactNode | React.ReactNode[];
}
declare const Navbar: _nextui_org_system.InternalForwardRefRenderFunction<"div", NavbarProps, never>;

export { NavbarProps, Navbar as default };
