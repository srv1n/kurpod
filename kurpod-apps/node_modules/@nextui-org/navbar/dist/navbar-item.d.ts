import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';

interface NavbarItemProps extends HTMLNextUIProps<"li"> {
    children?: React.ReactNode;
    /**
     * Whether the item is active or not.
     * @default false
     */
    isActive?: boolean;
}
declare const NavbarItem: _nextui_org_system.InternalForwardRefRenderFunction<"li", NavbarItemProps, never>;

export { NavbarItemProps, NavbarItem as default };
