import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';
import * as tailwind_variants from 'tailwind-variants';

/**
 * User wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, name, description} = user({...})
 *
 * @example
 * <div className={base())}>
 *   // avatar element @see avatar
 *  <div className={wrapper())}>
 *    <span className={name())}>user name</span>
 *    <span className={description())}>user description</span>
 *  </div>
 * </div>
 */
declare const user: tailwind_variants.TVReturnType<{
    [key: string]: {
        [key: string]: tailwind_variants.ClassValue | {
            base?: tailwind_variants.ClassValue;
            description?: tailwind_variants.ClassValue;
            name?: tailwind_variants.ClassValue;
            wrapper?: tailwind_variants.ClassValue;
        };
    };
} | {
    [x: string]: {
        [x: string]: tailwind_variants.ClassValue | {
            base?: tailwind_variants.ClassValue;
            description?: tailwind_variants.ClassValue;
            name?: tailwind_variants.ClassValue;
            wrapper?: tailwind_variants.ClassValue;
        };
    };
} | {}, {
    base: string[];
    wrapper: string;
    name: string;
    description: string;
}, undefined, tailwind_variants_dist_config.TVConfig<unknown, {
    [key: string]: {
        [key: string]: tailwind_variants.ClassValue | {
            base?: tailwind_variants.ClassValue;
            description?: tailwind_variants.ClassValue;
            name?: tailwind_variants.ClassValue;
            wrapper?: tailwind_variants.ClassValue;
        };
    };
} | {}>, {
    [key: string]: {
        [key: string]: tailwind_variants.ClassValue | {
            base?: tailwind_variants.ClassValue;
            description?: tailwind_variants.ClassValue;
            name?: tailwind_variants.ClassValue;
            wrapper?: tailwind_variants.ClassValue;
        };
    };
} | {}, {
    base: string[];
    wrapper: string;
    name: string;
    description: string;
}, tailwind_variants.TVReturnType<unknown, {
    base: string[];
    wrapper: string;
    name: string;
    description: string;
}, undefined, tailwind_variants_dist_config.TVConfig<unknown, {
    [key: string]: {
        [key: string]: tailwind_variants.ClassValue | {
            base?: tailwind_variants.ClassValue;
            description?: tailwind_variants.ClassValue;
            name?: tailwind_variants.ClassValue;
            wrapper?: tailwind_variants.ClassValue;
        };
    };
} | {}>, unknown, unknown, undefined>>;
type UserSlots = keyof ReturnType<typeof user>;

export { UserSlots, user };
