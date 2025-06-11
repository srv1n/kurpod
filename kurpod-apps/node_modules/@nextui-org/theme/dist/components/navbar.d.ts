import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {
 *  base,
 *  wrapper,
 *  toggle,
 *  srOnly,
 *  toggleIcon,
 *  brand,
 *  content,
 *  item,
 *  menu,
 *  menuItem
 * } = navbar({...})
 *
 * <nav className={base()} style={{ "--navbar-height": "4rem" }}>
 *    <header className={wrapper()}>
 *      <button className={toggle()}>
 *        <span className={srOnly()}>Open/Close menu</span>
 *        <span className={toggleIcon()} aria-hidden="true"/>
 *      </button>
 *      <div className={brand()}>Brand</div>
 *      <ul className={content()}>
 *        <li className={item()}>Item 1</li>
 *        <li className={item()}>Item 2</li>
 *        <li className={item()}>Item 3</li>
 *      </ul>
 *      <ul className={content()}>
 *        <li className={item()}>Login</li>
 *        <li className={item()}>Sign Up</li>
 *      </ul>
 *    </header>
 *    <ul className={menu()}>
 *      <li className={menuItem()}>Item 1</li>
 *      <li className={menuItem()}>Item 2</li>
 *      <li className={menuItem()}>Item 3</li>
 *   </ul>
 * </nav>
 * ```
 */
declare const navbar: tailwind_variants.TVReturnType<{
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}, {
    base: string[];
    wrapper: string[];
    toggle: string[];
    srOnly: string[];
    toggleIcon: string[];
    brand: string[];
    content: string[];
    item: string[];
    menu: string[];
    menuItem: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}, {
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}>, {
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}, {
    base: string[];
    wrapper: string[];
    toggle: string[];
    srOnly: string[];
    toggleIcon: string[];
    brand: string[];
    content: string[];
    item: string[];
    menu: string[];
    menuItem: string[];
}, tailwind_variants.TVReturnType<{
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}, {
    base: string[];
    wrapper: string[];
    toggle: string[];
    srOnly: string[];
    toggleIcon: string[];
    brand: string[];
    content: string[];
    item: string[];
    menu: string[];
    menuItem: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}, {
    position: {
        static: {
            base: string;
        };
        sticky: {
            base: string;
        };
    };
    maxWidth: {
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
        xl: {
            wrapper: string;
        };
        "2xl": {
            wrapper: string;
        };
        full: {
            wrapper: string;
        };
    };
    hideOnScroll: {
        true: {
            base: string[];
        };
    };
    isBordered: {
        true: {
            base: string[];
        };
    };
    isBlurred: {
        false: {
            base: string;
            menu: string;
        };
        true: {
            base: string[];
            menu: string[];
        };
    };
    disableAnimation: {
        true: {
            menu: string[];
        };
    };
}>, unknown, unknown, undefined>>;
type NavbarVariantProps = VariantProps<typeof navbar>;
type NavbarSlots = keyof ReturnType<typeof navbar>;

export { NavbarSlots, NavbarVariantProps, navbar };
