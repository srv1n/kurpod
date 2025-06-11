import LinkService from './LinkService.js';
import type { EventProps } from 'make-event-props';
import type { ClassName, DocumentCallback, ExternalLinkRel, ExternalLinkTarget, File, ImageResourcesPath, NodeOrRenderer, OnDocumentLoadError, OnDocumentLoadProgress, OnDocumentLoadSuccess, OnError, OnItemClickArgs, OnPasswordCallback, Options, PasswordResponse, RenderMode, ScrollPageIntoViewArgs } from './shared/types.js';
type OnItemClick = (args: OnItemClickArgs) => void;
type OnPassword = (callback: OnPasswordCallback, reason: PasswordResponse) => void;
type OnSourceError = OnError;
type OnSourceSuccess = () => void;
export type DocumentProps = {
    children?: React.ReactNode;
    /**
     * Class name(s) that will be added to rendered element along with the default `react-pdf__Document`.
     *
     * @example 'custom-class-name-1 custom-class-name-2'
     * @example ['custom-class-name-1', 'custom-class-name-2']
     */
    className?: ClassName;
    /**
     * What the component should display in case of an error.
     *
     * @default 'Failed to load PDF file.'
     * @example 'An error occurred!'
     * @example <p>An error occurred!</p>
     * @example {this.renderError}
     */
    error?: NodeOrRenderer;
    /**
     * Link rel for links rendered in annotations.
     *
     * @default 'noopener noreferrer nofollow'
     */
    externalLinkRel?: ExternalLinkRel;
    /**
     * Link target for external links rendered in annotations.
     */
    externalLinkTarget?: ExternalLinkTarget;
    /**
     * What PDF should be displayed.
     *
     * Its value can be an URL, a file (imported using `import … from …` or from file input form element), or an object with parameters (`url` - URL; `data` - data, preferably Uint8Array; `range` - PDFDataRangeTransport.
     *
     * **Warning**: Since equality check (`===`) is used to determine if `file` object has changed, it must be memoized by setting it in component's state, `useMemo` or other similar technique.
     *
     * @example 'https://example.com/sample.pdf'
     * @example importedPdf
     * @example { url: 'https://example.com/sample.pdf' }
     */
    file?: File;
    /**
     * The path used to prefix the src attributes of annotation SVGs.
     *
     * @default ''
     * @example '/public/images/'
     */
    imageResourcesPath?: ImageResourcesPath;
    /**
     * A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Document>` component.
     *
     * @example (ref) => { this.myDocument = ref; }
     * @example this.ref
     * @example ref
     */
    inputRef?: React.Ref<HTMLDivElement | null>;
    /**
     * What the component should display while loading.
     *
     * @default 'Loading PDF…'
     * @example 'Please wait!'
     * @example <p>Please wait!</p>
     * @example {this.renderLoader}
     */
    loading?: NodeOrRenderer;
    /**
     * What the component should display in case of no data.
     *
     * @default 'No PDF file specified.'
     * @example 'Please select a file.'
     * @example <p>Please select a file.</p>
     * @example {this.renderNoData}
     */
    noData?: NodeOrRenderer;
    /**
     * Function called when an outline item or a thumbnail has been clicked. Usually, you would like to use this callback to move the user wherever they requested to.
     *
     * @example ({ dest, pageIndex, pageNumber }) => alert('Clicked an item from page ' + pageNumber + '!')
     */
    onItemClick?: OnItemClick;
    /**
     * Function called in case of an error while loading a document.
     *
     * @example (error) => alert('Error while loading document! ' + error.message)
     */
    onLoadError?: OnDocumentLoadError;
    /**
     * Function called, potentially multiple times, as the loading progresses.
     *
     * @example ({ loaded, total }) => alert('Loading a document: ' + (loaded / total) * 100 + '%')
     */
    onLoadProgress?: OnDocumentLoadProgress;
    /**
     * Function called when the document is successfully loaded.
     *
     * @example (pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')
     */
    onLoadSuccess?: OnDocumentLoadSuccess;
    /**
     * Function called when a password-protected PDF is loaded.
     *
     * @example (callback) => callback('s3cr3t_p4ssw0rd')
     */
    onPassword?: OnPassword;
    /**
     * Function called in case of an error while retrieving document source from `file` prop.
     *
     * @example (error) => alert('Error while retrieving document source! ' + error.message)
     */
    onSourceError?: OnSourceError;
    /**
     * Function called when document source is successfully retrieved from `file` prop.
     *
     * @example () => alert('Document source retrieved!')
     */
    onSourceSuccess?: OnSourceSuccess;
    /**
     * An object in which additional parameters to be passed to PDF.js can be defined. Most notably:
     * - `cMapUrl`;
     * - `httpHeaders` - custom request headers, e.g. for authorization);
     * - `withCredentials` - a boolean to indicate whether or not to include cookies in the request (defaults to `false`)
     *
     * For a full list of possible parameters, check [PDF.js documentation on DocumentInitParameters](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html#~DocumentInitParameters).
     *
     * **Note**: Make sure to define options object outside of your React component, and use `useMemo` if you can't.
     *
     * @example { cMapUrl: '/cmaps/' }
     */
    options?: Options;
    /**
     * Rendering mode of the document. Can be `"canvas"`, `"custom"` or `"none"``. If set to `"custom"`, `customRenderer` must also be provided.
     *
     * @default 'canvas'
     * @example 'custom'
     */
    renderMode?: RenderMode;
    /**
     * Rotation of the document in degrees. If provided, will change rotation globally, even for the pages which were given `rotate` prop of their own. `90` = rotated to the right, `180` = upside down, `270` = rotated to the left.
     *
     * @example 90
     */
    rotate?: number | null;
} & EventProps<DocumentCallback | false | undefined>;
/**
 * Loads a document passed using `file` prop.
 */
declare const Document: React.ForwardRefExoticComponent<DocumentProps & React.RefAttributes<{
    linkService: React.RefObject<LinkService>;
    pages: React.RefObject<HTMLDivElement[]>;
    viewer: React.RefObject<{
        scrollPageIntoView: (args: ScrollPageIntoViewArgs) => void;
    }>;
}>>;
export default Document;
