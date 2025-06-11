import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';

interface NavbarMenuItemProps extends HTMLNextUIProps<"li"> {
    /**
     * Whether the item is active or not.
     * @default false
     */
    isActive?: boolean;
    children?: React.ReactNode;
}
declare const NavbarMenuItem: _nextui_org_system.InternalForwardRefRenderFunction<"li", NavbarMenuItemProps, never>;

export { NavbarMenuItemProps, NavbarMenuItem as default };
