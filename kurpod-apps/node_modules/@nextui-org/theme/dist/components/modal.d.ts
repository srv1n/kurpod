import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Modal **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, backdrop, header, body, footer} = modal({...})
 *
 * <div>
 *    <button>Open Modal</button>
 *    <div className={backdrop()}/>
 *    <div className={base()}>
 *       <div className={header()}>Header</div>
 *       <div className={body()}>Body</div>
 *       <div className={footer()}>Footer</div>
 *    </div>
 * </div>
 * ```
 */
declare const modal: tailwind_variants.TVReturnType<{
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}, {
    wrapper: string[];
    base: string[];
    backdrop: string;
    header: string;
    body: string;
    footer: string;
    closeButton: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}, {
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}>, {
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}, {
    wrapper: string[];
    base: string[];
    backdrop: string;
    header: string;
    body: string;
    footer: string;
    closeButton: string[];
}, tailwind_variants.TVReturnType<{
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}, {
    wrapper: string[];
    base: string[];
    backdrop: string;
    header: string;
    body: string;
    footer: string;
    closeButton: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}, {
    size: {
        xs: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        xl: {
            base: string;
        };
        "2xl": {
            base: string;
        };
        "3xl": {
            base: string;
        };
        "4xl": {
            base: string;
        };
        "5xl": {
            base: string;
        };
        full: {
            base: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    placement: {
        auto: {
            wrapper: string;
        };
        center: {
            wrapper: string;
        };
        top: {
            wrapper: string;
        };
        "top-center": {
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
        "bottom-center": {
            wrapper: string;
        };
    };
    shadow: {
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
    };
    backdrop: {
        transparent: {
            backdrop: string;
        };
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    scrollBehavior: {
        normal: {
            base: string;
        };
        inside: {
            base: string;
            body: string;
        };
        outside: {
            wrapper: string;
            base: string;
        };
    };
    disableAnimation: {
        false: {
            wrapper: string[];
        };
    };
}>, unknown, unknown, undefined>>;
type ModalVariantProps = VariantProps<typeof modal>;
type ModalSlots = keyof ReturnType<typeof modal>;

export { ModalSlots, ModalVariantProps, modal };
