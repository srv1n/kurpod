import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Keyboard Key wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const { base, abbr, content } = kbd()
 *
 * <kbd className={base()} >
 *    <abbr title="Command" className={abbr()}>⌘</abbr>
 *    <abbr title="Shift" className={abbr()}>⇧</abbr>
 *    <abbr title="Control" className={abbr()}>⌃</abbr>
 *    <abbr title="Option" className={abbr()}>⌥</abbr>
 *    <abbr title="Enter" className={abbr()}>↵</abbr>
 *    <abbr title="Delete" className={abbr()}>⌫</abbr>
 *    <abbr title="Escape" className={abbr()}>⎋</abbr>
 *    <abbr title="Tab" className={abbr()}>⇥</abbr>
 *    <abbr title="Caps Lock" className={abbr()}>⇪</abbr>
 *    <abbr title="Up" className={abbr()}>↑</abbr>
 *    <abbr title="Right" className={abbr()}>→</abbr>
 *    <abbr title="Down" className={abbr()}>↓</abbr>
 *    <abbr title="Left" className={abbr()}>←</abbr>
 *    <abbr title="Page Up" className={abbr()}>⇞</abbr>
 *    <abbr title="Page Down" className={abbr()}>⇟</abbr>
 *    <abbr title="Home" className={abbr()}>↖</abbr>
 *    <abbr title="End" className={abbr()}>↘</abbr>
 *    <abbr title="Help" className={abbr()}>?</abbr>
 *    <abbr title="Space" className={abbr()}>␣</abbr>
 *    <span className={content()}>A</span>
 * </kbd>
 */
declare const kbd: tailwind_variants.TVReturnType<{}, {
    base: string[];
    abbr: string;
    content: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{}, {}>, {}, {
    base: string[];
    abbr: string;
    content: string;
}, tailwind_variants.TVReturnType<{}, {
    base: string[];
    abbr: string;
    content: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{}, {}>, unknown, unknown, undefined>>;
type KbdVariantProps = VariantProps<typeof kbd>;
type KbdSlots = keyof ReturnType<typeof kbd>;

export { KbdSlots, KbdVariantProps, kbd };
