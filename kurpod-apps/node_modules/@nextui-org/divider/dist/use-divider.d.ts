import * as _nextui_org_system_rsc from '@nextui-org/system-rsc';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system-rsc';
import { DividerVariantProps } from '@nextui-org/theme';
import { Ref } from 'react';
import { SeparatorProps } from './use-separator.js';
import '@react-types/shared';

interface Props extends HTMLNextUIProps<"hr"> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLElement> | undefined;
}
type UseDividerProps = Props & DividerVariantProps & Omit<SeparatorProps, "elementType">;
declare function useDivider(props: UseDividerProps): {
    Component: _nextui_org_system_rsc.As<any>;
    getDividerProps: PropGetter<Record<string, unknown>, _nextui_org_system_rsc.DOMAttributes<_nextui_org_system_rsc.DOMElement>>;
};
type UseDividerReturn = ReturnType<typeof useDivider>;

export { UseDividerProps, UseDividerReturn, useDivider };
