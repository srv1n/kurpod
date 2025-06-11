import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import { ReactElement } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { SnippetVariantProps, SlotsToClasses, SnippetSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { TooltipProps } from '@nextui-org/tooltip';
import { ButtonProps } from '@nextui-org/button';

interface UseSnippetProps extends Omit<HTMLNextUIProps, "onCopy">, SnippetVariantProps {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * The content of the snippet.
     * if `string[]` is passed, it will be rendered as a multi-line snippet.
     */
    children?: React.ReactNode | string | string[];
    /**
     * The symbol to show before the snippet.
     * @default "$"
     */
    symbol?: string | React.ReactNode;
    /**
     * The time in milliseconds to wait before resetting the clipboard.
     * @default 2000
     */
    timeout?: number;
    copyIcon?: ReactElement;
    checkIcon?: ReactElement;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Snippet classNames={{
     *    base:"base-classes",
     *    pre: "pre-classes",
     *    copyButton: "copy-classes", // copy button classes
     *    copyIcon: "copy-classes", // copy icon classes
     *    checkIcon: "check-classes", // check icon classes
     *    content: "content-classes", // content when is multiline
     *    symbol: "symbol-classes", // symbol classes
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<SnippetSlots>;
    /**
     * Whether the copy button should receive focus on render.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The code string to copy. if `codeString` is passed, it will be copied instead of the children.
     */
    codeString?: string;
    /**
     * Whether to hide the tooltip.
     * @default false
     */
    disableTooltip?: boolean;
    /**
     * Whether to disable the copy functionality.
     * @default false
     */
    disableCopy?: boolean;
    /**
     * Whether to hide the copy button.
     * @default false
     */
    hideCopyButton?: boolean;
    /**
     * Whether to hide the symbol.
     * @default false
     */
    hideSymbol?: boolean;
    /**
     * Tooltip props.
     * @see [Tooltip](https://nextui.org/components/tooltip) for more details.
     * @default {
     *  offset: 15,
     *  delay: 1000,
     *  content: "Copy to clipboard",
     *  color: snippetProps?.color, // same as the snippet color
     *  isDisabled: disableCopy,
     * }
     */
    tooltipProps?: Partial<TooltipProps>;
    /**
     * Copy button props.
     * @see [Button](https://nextui.org/components/button) for more details.
     * @default {
     *   isDisabled: disableCopy,
     *   onPress: onCopy
     *   size:"sm",
     *   variant:"light",
     *   isIconOnly: true,
     * }
     */
    copyButtonProps?: Partial<ButtonProps>;
    /**
     * Callback when the text is copied.
     */
    onCopy?: (value: string | string[]) => void;
}
declare function useSnippet(originalProps: UseSnippetProps): {
    Component: _nextui_org_system.As<any>;
    as: _nextui_org_system.As<any> | undefined;
    domRef: react.RefObject<HTMLDivElement>;
    preRef: react.RefObject<HTMLPreElement>;
    children: string[] | react.ReactNode;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pre: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        symbol: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        copyButton: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        copyIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        checkIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pre: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        symbol: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        copyButton: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        copyIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        checkIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "none" | "sm" | "md" | "lg" | undefined;
            fullWidth?: boolean | undefined;
            variant?: "flat" | "solid" | "shadow" | "bordered" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"symbol" | "base" | "pre" | "content" | "copyButton" | "copyIcon" | "checkIcon"> | undefined;
    copied: boolean;
    onCopy: () => void;
    copyIcon: ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
    checkIcon: ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
    symbolBefore: string | number | boolean | ReactElement<any, string | react.JSXElementConstructor<any>> | react.ReactFragment | null;
    isMultiLine: boolean | "" | 0 | null | undefined;
    isFocusVisible: boolean;
    hideCopyButton: boolean;
    disableCopy: boolean;
    disableTooltip: boolean;
    hideSymbol: boolean;
    tooltipProps: Partial<TooltipProps>;
    getSnippetProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getCopyButtonProps: () => ButtonProps;
};
type UseSnippetReturn = ReturnType<typeof useSnippet>;

export { UseSnippetProps, UseSnippetReturn, useSnippet };
