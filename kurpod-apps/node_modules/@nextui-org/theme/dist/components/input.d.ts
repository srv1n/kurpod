import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Input wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, label, inputWrapper, input, clearButton, description, errorMessage} = input({...})
 *
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={inputWrapper()}>
 *    <input className={input()}/>
 *    <button className={clearButton()}>Clear</button>
 *  </div>
 *  <span className={description()}>Description</span>
 *  <span className={errorMessage()}>Invalid input</span>
 * </div>
 * ```
 */
declare const input: tailwind_variants.TVReturnType<{
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}, {
    base: string;
    label: string[];
    mainWrapper: string;
    inputWrapper: string;
    innerWrapper: string;
    input: string[];
    clearButton: string[];
    helperWrapper: string;
    description: string;
    errorMessage: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}, {
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}>, {
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}, {
    base: string;
    label: string[];
    mainWrapper: string;
    inputWrapper: string;
    innerWrapper: string;
    input: string[];
    clearButton: string[];
    helperWrapper: string;
    description: string;
    errorMessage: string;
}, tailwind_variants.TVReturnType<{
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}, {
    base: string;
    label: string[];
    mainWrapper: string;
    inputWrapper: string;
    innerWrapper: string;
    input: string[];
    clearButton: string[];
    helperWrapper: string;
    description: string;
    errorMessage: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}, {
    variant: {
        flat: {
            inputWrapper: string[];
        };
        faded: {
            inputWrapper: string[];
            value: string;
        };
        bordered: {
            inputWrapper: string[];
        };
        underlined: {
            inputWrapper: string[];
            innerWrapper: string;
            label: string;
        };
    };
    color: {
        default: {};
        primary: {};
        secondary: {};
        success: {};
        warning: {};
        danger: {};
    };
    size: {
        sm: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        md: {
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
        lg: {
            label: string;
            inputWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    radius: {
        none: {
            inputWrapper: string;
        };
        sm: {
            inputWrapper: string;
        };
        md: {
            inputWrapper: string;
        };
        lg: {
            inputWrapper: string;
        };
        full: {
            inputWrapper: string;
        };
    };
    labelPlacement: {
        outside: {
            mainWrapper: string;
        };
        "outside-left": {
            base: string;
            inputWrapper: string;
            mainWrapper: string;
            label: string;
        };
        inside: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
        false: {};
    };
    isClearable: {
        true: {
            input: string;
            clearButton: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
            inputWrapper: string;
            label: string;
        };
    };
    isInvalid: {
        true: {
            label: string;
            input: string;
        };
    };
    isRequired: {
        true: {
            label: string;
        };
    };
    isMultiline: {
        true: {
            label: string;
            inputWrapper: string;
            innerWrapper: string;
            input: string;
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            input: string;
            inputWrapper: string;
            label: string;
        };
        false: {
            inputWrapper: string;
            label: string[];
            clearButton: string[];
        };
    };
}>, unknown, unknown, undefined>>;
type InputVariantProps = VariantProps<typeof input>;
type InputSlots = keyof ReturnType<typeof input>;

export { InputSlots, InputVariantProps, input };
