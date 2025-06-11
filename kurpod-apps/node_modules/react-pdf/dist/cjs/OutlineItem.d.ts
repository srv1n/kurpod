import type { PDFDocumentProxy } from 'pdfjs-dist';
type PDFOutline = Awaited<ReturnType<PDFDocumentProxy['getOutline']>>;
type PDFOutlineItem = PDFOutline[number];
type OutlineItemProps = {
    item: PDFOutlineItem;
    pdf?: PDFDocumentProxy | false;
};
export default function OutlineItem(props: OutlineItemProps): React.ReactElement;
export {};
