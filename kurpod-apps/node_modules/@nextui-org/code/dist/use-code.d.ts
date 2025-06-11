import * as react from 'react';
import * as _nextui_org_system_rsc from '@nextui-org/system-rsc';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system-rsc';
import { CodeVariantProps } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';

interface UseCodeProps extends HTMLNextUIProps<"code">, CodeVariantProps {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
}
declare function useCode(originalProps: UseCodeProps): {
    Component: _nextui_org_system_rsc.As<any>;
    children: react.ReactNode;
    getCodeProps: PropGetter<Record<string, unknown>, _nextui_org_system_rsc.DOMAttributes<_nextui_org_system_rsc.DOMElement>>;
};
type UseCodeReturn = ReturnType<typeof useCode>;

export { UseCodeProps, UseCodeReturn, useCode };
