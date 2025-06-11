import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';

interface NavbarContentProps extends HTMLNextUIProps<"ul"> {
    /**
     * The content of the Navbar.Content. It is usually the `NavbarItem`,
     */
    children?: React.ReactNode | React.ReactNode[];
    /**
     * The justify of the content
     * @default start
     */
    justify?: "start" | "end" | "center";
}
declare const NavbarContent: _nextui_org_system.InternalForwardRefRenderFunction<"ul", NavbarContentProps, never>;

export { NavbarContentProps, NavbarContent as default };
