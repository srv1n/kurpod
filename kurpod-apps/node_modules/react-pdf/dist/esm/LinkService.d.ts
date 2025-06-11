import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { Dest, ExternalLinkRel, ExternalLinkTarget, ScrollPageIntoViewArgs } from './shared/types.js';
import type { IPDFLinkService } from 'pdfjs-dist/types/web/interfaces.js';
type PDFViewer = {
    currentPageNumber?: number;
    scrollPageIntoView: (args: ScrollPageIntoViewArgs) => void;
};
export default class LinkService implements IPDFLinkService {
    externalLinkEnabled: boolean;
    externalLinkRel?: ExternalLinkRel;
    externalLinkTarget?: ExternalLinkTarget;
    isInPresentationMode: boolean;
    pdfDocument?: PDFDocumentProxy | null;
    pdfViewer?: PDFViewer | null;
    constructor();
    setDocument(pdfDocument: PDFDocumentProxy): void;
    setViewer(pdfViewer: PDFViewer): void;
    setExternalLinkRel(externalLinkRel?: ExternalLinkRel): void;
    setExternalLinkTarget(externalLinkTarget?: ExternalLinkTarget): void;
    setHistory(): void;
    get pagesCount(): number;
    get page(): number;
    set page(value: number);
    get rotation(): number;
    set rotation(_value: number);
    goToDestination(dest: Dest): Promise<void>;
    navigateTo(dest: Dest): void;
    goToPage(pageNumber: number): void;
    addLinkAttributes(link: HTMLAnchorElement, url: string, newWindow: boolean): void;
    getDestinationHash(): string;
    getAnchorUrl(): string;
    setHash(): void;
    executeNamedAction(): void;
    cachePageRef(): void;
    isPageVisible(): boolean;
    isPageCached(): boolean;
    executeSetOCGState(): void;
}
export {};
