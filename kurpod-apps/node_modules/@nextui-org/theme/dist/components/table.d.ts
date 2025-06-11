import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Table **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, table, thead, tbody, tr, th, td, tfoot} = table({...})
 *
 * <div className={base()}>
 *   <table className={table()}>
 *    <thead className={thead()}>
 *      <tr className={tr()}>
 *        <th className={th()}>...</th>
 *        <th className={th()}>...</th>
 *      </tr>
 *    </thead>
 *    <tbody className={tbody()}>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *      </tr>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *     </tr>
 *   </tbody>
 *    <tfoot className={tfoot()}>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *      </tr>
 *    </tfoot>
 *  </table>
 * </div>
 * ```
 */
declare const table: tailwind_variants.TVReturnType<{
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}, {
    base: string;
    wrapper: string[];
    table: string;
    thead: string;
    tbody: string;
    tr: string[];
    th: string[];
    td: string[];
    tfoot: string;
    sortIcon: string[];
    emptyWrapper: string;
    loadingWrapper: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}, {
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}>, {
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}, {
    base: string;
    wrapper: string[];
    table: string;
    thead: string;
    tbody: string;
    tr: string[];
    th: string[];
    td: string[];
    tfoot: string;
    sortIcon: string[];
    emptyWrapper: string;
    loadingWrapper: string;
}, tailwind_variants.TVReturnType<{
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}, {
    base: string;
    wrapper: string[];
    table: string;
    thead: string;
    tbody: string;
    tr: string[];
    th: string[];
    td: string[];
    tfoot: string;
    sortIcon: string[];
    emptyWrapper: string;
    loadingWrapper: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}, {
    color: {
        default: {
            td: string;
        };
        primary: {
            td: string;
        };
        secondary: {
            td: string;
        };
        success: {
            td: string;
        };
        warning: {
            td: string;
        };
        danger: {
            td: string;
        };
    };
    layout: {
        auto: {
            table: string;
        };
        fixed: {
            table: string;
        };
    };
    radius: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    shadow: {
        none: {
            wrapper: string;
        };
        sm: {
            wrapper: string;
        };
        md: {
            wrapper: string;
        };
        lg: {
            wrapper: string;
        };
    };
    hideHeader: {
        true: {
            thead: string;
        };
    };
    isStriped: {
        true: {
            td: string[];
        };
    };
    isCompact: {
        true: {
            td: string;
        };
        false: {};
    };
    isHeaderSticky: {
        true: {
            thead: string;
        };
    };
    isSelectable: {
        true: {
            tr: string;
            td: string[];
        };
    };
    isMultiSelectable: {
        true: {
            td: string[];
        };
        false: {
            td: string[];
        };
    };
    fullWidth: {
        true: {
            base: string;
            wrapper: string;
            table: string;
        };
    };
    align: {
        start: {
            th: string;
            td: string;
        };
        center: {
            th: string;
            td: string;
        };
        end: {
            th: string;
            td: string;
        };
    };
}>, unknown, unknown, undefined>>;
type TableVariantProps = VariantProps<typeof table>;
type TableSlots = keyof ReturnType<typeof table>;
type TableReturnType = ReturnType<typeof table>;

export { TableReturnType, TableSlots, TableVariantProps, table };
