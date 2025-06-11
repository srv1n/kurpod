import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

declare const autocomplete: tailwind_variants.TVReturnType<{
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}, {
    base: string;
    listboxWrapper: string;
    listbox: string;
    popoverContent: string;
    endContentWrapper: string;
    clearButton: string[];
    selectorButton: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}, {
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}>, {
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}, {
    base: string;
    listboxWrapper: string;
    listbox: string;
    popoverContent: string;
    endContentWrapper: string;
    clearButton: string[];
    selectorButton: string;
}, tailwind_variants.TVReturnType<{
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}, {
    base: string;
    listboxWrapper: string;
    listbox: string;
    popoverContent: string;
    endContentWrapper: string;
    clearButton: string[];
    selectorButton: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}, {
    isClearable: {
        true: {};
        false: {
            clearButton: string;
        };
    };
    disableAnimation: {
        true: {
            selectorButton: string;
        };
        false: {
            selectorButton: string;
        };
    };
    disableSelectorIconRotation: {
        true: {};
        false: {
            selectorButton: string;
        };
    };
}>, unknown, unknown, undefined>>;
type AutocompleteVariantProps = VariantProps<typeof autocomplete>;
type AutocompleteSlots = keyof ReturnType<typeof autocomplete>;

export { AutocompleteSlots, AutocompleteVariantProps, autocomplete };
