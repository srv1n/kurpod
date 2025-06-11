import * as react from 'react';
import { ReactNode, MouseEventHandler } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ButtonVariantProps } from '@nextui-org/theme';
import { AriaButtonProps } from '@nextui-org/use-aria-button';
import { RippleProps } from '@nextui-org/ripple';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends HTMLNextUIProps<"button"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLButtonElement | null>;
    /**
     * Whether the button should display a ripple effect on press.
     * @default false
     */
    disableRipple?: boolean;
    /**
     * The button start content.
     */
    startContent?: ReactNode;
    /**
     * The button end content.
     */
    endContent?: ReactNode;
    /**
     * Spinner to display when loading.
     * @see https://nextui.org/components/spinner
     */
    spinner?: ReactNode;
    /**
     * The spinner placement.
     * @default "start"
     */
    spinnerPlacement?: "start" | "end";
    /**
     * Whether the button should display a loading spinner.
     * @default false
     */
    isLoading?: boolean;
    /**
     * The native button click event handler.
     * use `onPress` instead.
     * @deprecated
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
type UseButtonProps = Props & Omit<AriaButtonProps, keyof ButtonVariantProps> & Omit<ButtonVariantProps, "isInGroup">;
declare function useButton(props: UseButtonProps): {
    Component: _nextui_org_system.As<any>;
    children: ReactNode;
    domRef: react.RefObject<HTMLButtonElement>;
    spinner: ReactNode;
    styles: string;
    startContent: react.DetailedReactHTMLElement<react.HTMLAttributes<HTMLElement>, HTMLElement> | null;
    endContent: react.DetailedReactHTMLElement<react.HTMLAttributes<HTMLElement>, HTMLElement> | null;
    isLoading: boolean;
    spinnerPlacement: "start" | "end";
    spinnerSize: "sm" | "md" | "lg" | undefined;
    disableRipple: boolean;
    getButtonProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getRippleProps: () => RippleProps;
    isIconOnly: boolean;
};
type UseButtonReturn = ReturnType<typeof useButton>;

export { UseButtonProps, UseButtonReturn, useButton };
