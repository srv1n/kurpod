import * as _nextui_org_system_rsc from '@nextui-org/system-rsc';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system-rsc';
import { SpacerVariantProps } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { Space } from './utils.js';

interface Props extends HTMLNextUIProps<"span"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The x-axis margin.
     * @default 1
     *
     * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
     */
    x?: Space;
    /**
     * The y-axis margin.
     * @default 1
     *
     * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
     */
    y?: Space;
}
type UseSpacerProps = Props & SpacerVariantProps;
declare const getMargin: (value: Space) => string;
declare function useSpacer(originalProps: UseSpacerProps): {
    Component: _nextui_org_system_rsc.As<any>;
    getSpacerProps: PropGetter<Record<string, unknown>, _nextui_org_system_rsc.DOMAttributes<_nextui_org_system_rsc.DOMElement>>;
};
type UseSpacerReturn = ReturnType<typeof useSpacer>;

export { UseSpacerProps, UseSpacerReturn, getMargin, useSpacer };
