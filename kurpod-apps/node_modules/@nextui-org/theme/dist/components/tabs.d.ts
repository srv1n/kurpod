import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Tabs wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, tabList, tab, panel} = tabs({...})
 *
 * <div className={base())}>
 *  <div className={tabList())}>
 *    <div className={tab())} data-selected="boolean">Tab 1</div>
 *    <div className={tab())} data-selected="boolean" data-disabled="boolean">Tab 2</div>
 *    <div className={tab())} data-selected="boolean">Tab 3</div>
 *  </div>
 *  <div className={panel())}>Selected panel</div>
 * </div>
 * ```
 */
declare const tabs: tailwind_variants.TVReturnType<{
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}, {
    base: string;
    tabList: string[];
    tab: string[];
    tabContent: string[];
    cursor: string[];
    panel: string[];
    wrapper: never[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}, {
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}>, {
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}, {
    base: string;
    tabList: string[];
    tab: string[];
    tabContent: string[];
    cursor: string[];
    panel: string[];
    wrapper: never[];
}, tailwind_variants.TVReturnType<{
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}, {
    base: string;
    tabList: string[];
    tab: string[];
    tabContent: string[];
    cursor: string[];
    panel: string[];
    wrapper: never[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}, {
    variant: {
        solid: {
            cursor: string;
        };
        light: {
            tabList: string;
            cursor: string;
        };
        underlined: {
            tabList: string;
            cursor: string;
        };
        bordered: {
            tabList: string;
            cursor: string;
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
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    radius: {
        none: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        sm: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        md: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        lg: {
            tabList: string;
            tab: string;
            cursor: string;
        };
        full: {
            tabList: string;
            tab: string;
            cursor: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
            tabList: string;
        };
    };
    isDisabled: {
        true: {
            tabList: string;
        };
    };
    disableAnimation: {
        true: {
            tab: string;
            tabContent: string;
        };
    };
    placement: {
        top: {};
        start: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        end: {
            tabList: string;
            panel: string;
            wrapper: string;
        };
        bottom: {
            wrapper: string;
        };
    };
}>, unknown, unknown, undefined>>;
type TabsVariantProps = VariantProps<typeof tabs>;
type TabsSlots = keyof ReturnType<typeof tabs>;
type TabsReturnType = ReturnType<typeof tabs>;

export { TabsReturnType, TabsSlots, TabsVariantProps, tabs };
