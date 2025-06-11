import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Accordion wrapper **Tailwind Variants** component
 *
 * const styles = accordion({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // accordion elements
 * </div>
 */
declare const accordion: tailwind_variants.TVReturnType<{
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}, undefined, "px-2", tailwind_variants_dist_config.TVConfig<{
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}, {
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}>, {
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}, undefined, tailwind_variants.TVReturnType<{
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}, undefined, "px-2", tailwind_variants_dist_config.TVConfig<{
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}, {
    variant: {
        light: "";
        shadow: "px-4 shadow-medium rounded-medium bg-content1";
        bordered: "px-4 border-medium border-divider rounded-medium";
        splitted: "flex flex-col gap-2";
    };
    fullWidth: {
        true: "w-full";
    };
}>, unknown, unknown, undefined>>;
/**
 * AccordionItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, startContent, title, subtitle, content } = accordionItem({...})
 *
 * @example
 * <div className={base())}>
 *   <div className={heading())}>
 *    <button className={trigger())}>
 *      <div className={startContent()}>
 *         // content
 *      </div>
 *      <div className={titleWrapper()}>
 *        <h3 className={title())}>Title</h3>
 *        <span className={subtitle())}>Subtitle</span>
 *      </div>
 *      <span className={indicator())}>Indicator</span>
 *    </button>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
declare const accordionItem: tailwind_variants.TVReturnType<{
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    heading: string;
    trigger: string[];
    startContent: string;
    indicator: string;
    titleWrapper: string;
    title: string;
    subtitle: string;
    content: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}, {
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}>, {
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    heading: string;
    trigger: string[];
    startContent: string;
    indicator: string;
    titleWrapper: string;
    title: string;
    subtitle: string;
    content: string;
}, tailwind_variants.TVReturnType<{
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    heading: string;
    trigger: string[];
    startContent: string;
    indicator: string;
    titleWrapper: string;
    title: string;
    subtitle: string;
    content: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}, {
    variant: {
        splitted: {
            base: string;
        };
    };
    isCompact: {
        true: {
            trigger: string;
            title: string;
            subtitle: string;
            indicator: string;
            content: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    hideIndicator: {
        true: {
            indicator: string;
        };
    };
    disableAnimation: {
        true: {
            content: string;
        };
        false: {
            indicator: string;
            trigger: string;
        };
    };
    disableIndicatorAnimation: {
        true: {
            indicator: string;
        };
        false: {
            indicator: string;
        };
    };
}>, unknown, unknown, undefined>>;
type AccordionGroupVariantProps = VariantProps<typeof accordion>;
type AccordionItemVariantProps = VariantProps<typeof accordionItem>;
type AccordionItemSlots = keyof ReturnType<typeof accordionItem>;

export { AccordionGroupVariantProps, AccordionItemSlots, AccordionItemVariantProps, accordion, accordionItem };
