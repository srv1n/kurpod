import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const classNames = form({...})
 *
 * <form className={base()}>
 *    // form content
 * </form>
 * ```
 */
declare const form: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "flex flex-col gap-2 items-start", tailwind_variants_dist_config.TVConfig<unknown, {} | {}>, {} | {}, undefined, tailwind_variants.TVReturnType<unknown, undefined, "flex flex-col gap-2 items-start", tailwind_variants_dist_config.TVConfig<unknown, {} | {}>, unknown, unknown, undefined>>;
type FormVariantProps = VariantProps<typeof form>;

export { FormVariantProps, form };
