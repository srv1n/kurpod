import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ScrollShadowVariantProps } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { UseDataScrollOverflowProps } from '@nextui-org/use-data-scroll-overflow';

interface Props extends HTMLNextUIProps<"div">, Omit<UseDataScrollOverflowProps, "domRef"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The shadow size in pixels.
     * @default 40
     */
    size?: number;
}
type UseScrollShadowProps = Props & ScrollShadowVariantProps;
declare function useScrollShadow(originalProps: UseScrollShadowProps): {
    Component: _nextui_org_system.As<any>;
    styles: string;
    domRef: react.RefObject<HTMLElement>;
    children: react.ReactNode;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseScrollShadowReturn = ReturnType<typeof useScrollShadow>;

export { UseScrollShadowProps, UseScrollShadowReturn, useScrollShadow };
