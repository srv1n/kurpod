import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { EventProps } from 'make-event-props';
import type { ClassName, CustomRenderer, CustomTextRenderer, NodeOrRenderer, OnGetAnnotationsError, OnGetAnnotationsSuccess, OnGetStructTreeError, OnGetStructTreeSuccess, OnGetTextError, OnGetTextSuccess, OnPageLoadError, OnPageLoadSuccess, OnRenderAnnotationLayerError, OnRenderAnnotationLayerSuccess, OnRenderError, OnRenderSuccess, OnRenderTextLayerError, OnRenderTextLayerSuccess, PageCallback, RenderMode } from './shared/types.js';
export type PageProps = {
    _className?: string;
    _enableRegisterUnregisterPage?: boolean;
    /**
     * Canvas background color. Any valid `canvas.fillStyle` can be used.
     *
     * @example 'transparent'
     */
    canvasBackground?: string;
    /**
     * A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to `<canvas>` rendered by `<PageCanvas>` component.
     *
     * @example (ref) => { this.myCanvas = ref; }
     * @example this.ref
     * @example ref
     */
    canvasRef?: React.Ref<HTMLCanvasElement>;
    children?: React.ReactNode;
    /**
     * Class name(s) that will be added to rendered element along with the default `react-pdf__Page`.
     *
     * @example 'custom-class-name-1 custom-class-name-2'
     * @example ['custom-class-name-1', 'custom-class-name-2']
     */
    className?: ClassName;
    /**
     * Function that customizes how a page is rendered. You must set `renderMode` to `"custom"` to use this prop.
     *
     * @example MyCustomRenderer
     */
    customRenderer?: CustomRenderer;
    /**
     * Function that customizes how a text layer is rendered.
     *
     * @example ({ str, itemIndex }) => str.replace(/ipsum/g, value => `<mark>${value}</mark>`)
     */
    customTextRenderer?: CustomTextRenderer;
    /**
     * The ratio between physical pixels and device-independent pixels (DIPs) on the current device.
     *
     * @default window.devicePixelRatio
     * @example 1
     */
    devicePixelRatio?: number;
    /**
     * What the component should display in case of an error.
     *
     * @default 'Failed to load the page.'
     * @example 'An error occurred!'
     * @example <p>An error occurred!</p>
     * @example this.renderError
     */
    error?: NodeOrRenderer;
    /**
     * Page height. If neither `height` nor `width` are defined, page will be rendered at the size defined in PDF. If you define `width` and `height` at the same time, `height` will be ignored. If you define `height` and `scale` at the same time, the height will be multiplied by a given factor.
     *
     * @example 300
     */
    height?: number;
    /**
     * The path used to prefix the src attributes of annotation SVGs.
     *
     * @default ''
     * @example '/public/images/'
     */
    imageResourcesPath?: string;
    /**
     * A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Page>` component.
     *
     * @example (ref) => { this.myPage = ref; }
     * @example this.ref
     * @example ref
     */
    inputRef?: React.Ref<HTMLDivElement | null>;
    /**
     * What the component should display while loading.
     *
     * @default 'Loading page…'
     * @example 'Please wait!'
     * @example <p>Please wait!</p>
     * @example this.renderLoader
     */
    loading?: NodeOrRenderer;
    /**
     *  What the component should display in case of no data.
     *
     * @default 'No page specified.'
     * @example 'Please select a page.'
     * @example <p>Please select a page.</p>
     * @example this.renderNoData
     */
    noData?: NodeOrRenderer;
    /**
     * Function called in case of an error while loading annotations.
     *
     * @example (error) => alert('Error while loading annotations! ' + error.message)
     */
    onGetAnnotationsError?: OnGetAnnotationsError;
    /**
     * Function called when annotations are successfully loaded.
     *
     * @example (annotations) => alert('Now displaying ' + annotations.length + ' annotations!')
     */
    onGetAnnotationsSuccess?: OnGetAnnotationsSuccess;
    /**
     * Function called in case of an error while loading structure tree.
     *
     * @example (error) => alert('Error while loading structure tree! ' + error.message)
     */
    onGetStructTreeError?: OnGetStructTreeError;
    /**
     * Function called when structure tree is successfully loaded.
     *
     * @example (structTree) => alert(JSON.stringify(structTree))
     */
    onGetStructTreeSuccess?: OnGetStructTreeSuccess;
    /**
     * Function called in case of an error while loading text layer items.
     *
     * @example (error) => alert('Error while loading text layer items! ' + error.message)
     */
    onGetTextError?: OnGetTextError;
    /**
     * Function called when text layer items are successfully loaded.
     *
     * @example ({ items, styles }) => alert('Now displaying ' + items.length + ' text layer items!')
     */
    onGetTextSuccess?: OnGetTextSuccess;
    /**
     * Function called in case of an error while loading the page.
     *
     * @example (error) => alert('Error while loading page! ' + error.message)
     */
    onLoadError?: OnPageLoadError;
    /**
     * Function called when the page is successfully loaded.
     *
     * @example (page) => alert('Now displaying a page number ' + page.pageNumber + '!')
     */
    onLoadSuccess?: OnPageLoadSuccess;
    /**
     * Function called in case of an error while rendering the annotation layer.
     *
     * @example (error) => alert('Error while rendering annotation layer! ' + error.message)
     */
    onRenderAnnotationLayerError?: OnRenderAnnotationLayerError;
    /**
     * Function called when annotations are successfully rendered on the screen.
     *
     * @example () => alert('Rendered the annotation layer!')
     */
    onRenderAnnotationLayerSuccess?: OnRenderAnnotationLayerSuccess;
    /**
     * Function called in case of an error while rendering the page.
     *
     * @example (error) => alert('Error while loading page! ' + error.message)
     */
    onRenderError?: OnRenderError;
    /**
     * Function called when the page is successfully rendered on the screen.
     *
     * @example () => alert('Rendered the page!')
     */
    onRenderSuccess?: OnRenderSuccess;
    /**
     * Function called in case of an error while rendering the text layer.
     *
     * @example (error) => alert('Error while rendering text layer! ' + error.message)
     */
    onRenderTextLayerError?: OnRenderTextLayerError;
    /**
     * Function called when the text layer is successfully rendered on the screen.
     *
     * @example () => alert('Rendered the text layer!')
     */
    onRenderTextLayerSuccess?: OnRenderTextLayerSuccess;
    /**
     * Which page from PDF file should be displayed, by page index. Ignored if `pageNumber` prop is provided.
     *
     * @default 0
     * @example 1
     */
    pageIndex?: number;
    /**
     * Which page from PDF file should be displayed, by page number. If provided, `pageIndex` prop will be ignored.
     *
     * @default 1
     * @example 2
     */
    pageNumber?: number;
    /**
     * pdf object obtained from `<Document />`'s `onLoadSuccess` callback function.
     *
     * @example pdf
     */
    pdf?: PDFDocumentProxy | false;
    registerPage?: undefined;
    /**
     * Whether annotations (e.g. links) should be rendered.
     *
     * @default true
     * @example false
     */
    renderAnnotationLayer?: boolean;
    /**
     * Whether forms should be rendered. `renderAnnotationLayer` prop must be set to `true`.
     *
     * @default false
     * @example true
     */
    renderForms?: boolean;
    /**
     * Rendering mode of the document. Can be `"canvas"`, `"custom"` or `"none"`. If set to `"custom"`, `customRenderer` must also be provided.
     *
     * @default 'canvas'
     * @example 'custom'
     */
    renderMode?: RenderMode;
    /**
     * Whether a text layer should be rendered.
     *
     * @default true
     * @example false
     */
    renderTextLayer?: boolean;
    /**
     * Rotation of the page in degrees. `90` = rotated to the right, `180` = upside down, `270` = rotated to the left.
     *
     * @default 0
     * @example 90
     */
    rotate?: number | null;
    /**
     * Page scale.
     *
     * @default 1
     * @example 0.5
     */
    scale?: number;
    unregisterPage?: undefined;
    /**
     * Page width. If neither `height` nor `width` are defined, page will be rendered at the size defined in PDF. If you define `width` and `height` at the same time, `height` will be ignored. If you define `width` and `scale` at the same time, the width will be multiplied by a given factor.
     *
     * @example 300
     */
    width?: number;
} & EventProps<PageCallback | false | undefined>;
/**
 * Displays a page.
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function, however some advanced functions like linking between pages inside a document may not be working correctly.
 */
export default function Page(props: PageProps): React.ReactElement;
