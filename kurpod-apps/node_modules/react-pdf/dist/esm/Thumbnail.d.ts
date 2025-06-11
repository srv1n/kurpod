import type { PageProps } from './Page.js';
import type { ClassName, OnItemClickArgs } from './shared/types.js';
export type ThumbnailProps = Omit<PageProps, 'className' | 'customTextRenderer' | 'onGetAnnotationsError' | 'onGetAnnotationsSuccess' | 'onGetTextError' | 'onGetTextSuccess' | 'onRenderAnnotationLayerError' | 'onRenderAnnotationLayerSuccess' | 'onRenderTextLayerError' | 'onRenderTextLayerSuccess' | 'renderAnnotationLayer' | 'renderForms' | 'renderTextLayer'> & {
    /**
     * Class name(s) that will be added to rendered element along with the default `react-pdf__Thumbnail`.
     *
     * @example 'custom-class-name-1 custom-class-name-2'
     * @example ['custom-class-name-1', 'custom-class-name-2']
     */
    className?: ClassName;
    /**
     * Function called when a thumbnail has been clicked. Usually, you would like to use this callback to move the user wherever they requested to.
     *
     * @example ({ dest, pageIndex, pageNumber }) => alert('Clicked an item from page ' + pageNumber + '!')
     */
    onItemClick?: (args: OnItemClickArgs) => void;
};
/**
 * Displays a thumbnail of a page. Does not render the annotation layer or the text layer. Does not register itself as a link target, so the user will not be scrolled to a Thumbnail component when clicked on an internal link (e.g. in Table of Contents). When clicked, attempts to navigate to the page clicked (similarly to a link in Outline).
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function.
 */
export default function Thumbnail(props: ThumbnailProps): React.ReactElement;
