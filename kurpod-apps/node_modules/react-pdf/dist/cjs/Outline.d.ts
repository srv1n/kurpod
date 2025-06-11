import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { EventProps } from 'make-event-props';
import type { ClassName, OnItemClickArgs } from './shared/types.js';
type PDFOutline = Awaited<ReturnType<PDFDocumentProxy['getOutline']>>;
export type OutlineProps = {
    /**
     * Class name(s) that will be added to rendered element along with the default `react-pdf__Outline`.
     *
     * @example 'custom-class-name-1 custom-class-name-2'
     * @example ['custom-class-name-1', 'custom-class-name-2']
     */
    className?: ClassName;
    /**
     * A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Outline>` component.
     *
     * @example (ref) => { this.myOutline = ref; }
     * @example this.ref
     * @example ref
     */
    inputRef?: React.Ref<HTMLDivElement>;
    /**
     * Function called when an outline item has been clicked. Usually, you would like to use this callback to move the user wherever they requested to.
     *
     * @example ({ dest, pageIndex, pageNumber }) => alert('Clicked an item from page ' + pageNumber + '!')
     */
    onItemClick?: (props: OnItemClickArgs) => void;
    /**
     * Function called in case of an error while retrieving the outline.
     *
     * @example (error) => alert('Error while retrieving the outline! ' + error.message)
     */
    onLoadError?: (error: Error) => void;
    /**
     * Function called when the outline is successfully retrieved.
     *
     * @example (outline) => alert('The outline has been successfully retrieved.')
     */
    onLoadSuccess?: (outline: PDFOutline | null) => void;
    pdf?: PDFDocumentProxy | false;
} & EventProps<PDFOutline | null | false | undefined>;
/**
 * Displays an outline (table of contents).
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function.
 */
export default function Outline(props: OutlineProps): React.ReactElement | null;
export {};
