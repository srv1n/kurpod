"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const DEFAULT_LINK_REL = 'noopener noreferrer nofollow';
class LinkService {
    constructor() {
        this.externalLinkEnabled = true;
        this.externalLinkRel = undefined;
        this.externalLinkTarget = undefined;
        this.isInPresentationMode = false;
        this.pdfDocument = undefined;
        this.pdfViewer = undefined;
    }
    setDocument(pdfDocument) {
        this.pdfDocument = pdfDocument;
    }
    setViewer(pdfViewer) {
        this.pdfViewer = pdfViewer;
    }
    setExternalLinkRel(externalLinkRel) {
        this.externalLinkRel = externalLinkRel;
    }
    setExternalLinkTarget(externalLinkTarget) {
        this.externalLinkTarget = externalLinkTarget;
    }
    setHistory() {
        // Intentionally empty
    }
    get pagesCount() {
        return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
    get page() {
        (0, tiny_invariant_1.default)(this.pdfViewer, 'PDF viewer is not initialized.');
        return this.pdfViewer.currentPageNumber || 0;
    }
    set page(value) {
        (0, tiny_invariant_1.default)(this.pdfViewer, 'PDF viewer is not initialized.');
        this.pdfViewer.currentPageNumber = value;
    }
    get rotation() {
        return 0;
    }
    set rotation(_value) {
        // Intentionally empty
    }
    goToDestination(dest) {
        return new Promise((resolve) => {
            (0, tiny_invariant_1.default)(this.pdfDocument, 'PDF document not loaded.');
            (0, tiny_invariant_1.default)(dest, 'Destination is not specified.');
            if (typeof dest === 'string') {
                this.pdfDocument.getDestination(dest).then(resolve);
            }
            else if (Array.isArray(dest)) {
                resolve(dest);
            }
            else {
                dest.then(resolve);
            }
        }).then((explicitDest) => {
            (0, tiny_invariant_1.default)(Array.isArray(explicitDest), `"${explicitDest}" is not a valid destination array.`);
            const destRef = explicitDest[0];
            new Promise((resolve) => {
                (0, tiny_invariant_1.default)(this.pdfDocument, 'PDF document not loaded.');
                if (destRef instanceof Object) {
                    this.pdfDocument
                        .getPageIndex(destRef)
                        .then((pageIndex) => {
                        resolve(pageIndex);
                    })
                        .catch(() => {
                        (0, tiny_invariant_1.default)(false, `"${destRef}" is not a valid page reference.`);
                    });
                }
                else if (typeof destRef === 'number') {
                    resolve(destRef);
                }
                else {
                    (0, tiny_invariant_1.default)(false, `"${destRef}" is not a valid destination reference.`);
                }
            }).then((pageIndex) => {
                const pageNumber = pageIndex + 1;
                (0, tiny_invariant_1.default)(this.pdfViewer, 'PDF viewer is not initialized.');
                (0, tiny_invariant_1.default)(pageNumber >= 1 && pageNumber <= this.pagesCount, `"${pageNumber}" is not a valid page number.`);
                this.pdfViewer.scrollPageIntoView({
                    dest: explicitDest,
                    pageIndex,
                    pageNumber,
                });
            });
        });
    }
    navigateTo(dest) {
        this.goToDestination(dest);
    }
    goToPage(pageNumber) {
        const pageIndex = pageNumber - 1;
        (0, tiny_invariant_1.default)(this.pdfViewer, 'PDF viewer is not initialized.');
        (0, tiny_invariant_1.default)(pageNumber >= 1 && pageNumber <= this.pagesCount, `"${pageNumber}" is not a valid page number.`);
        this.pdfViewer.scrollPageIntoView({
            pageIndex,
            pageNumber,
        });
    }
    addLinkAttributes(link, url, newWindow) {
        link.href = url;
        link.rel = this.externalLinkRel || DEFAULT_LINK_REL;
        link.target = newWindow ? '_blank' : this.externalLinkTarget || '';
    }
    getDestinationHash() {
        return '#';
    }
    getAnchorUrl() {
        return '#';
    }
    setHash() {
        // Intentionally empty
    }
    executeNamedAction() {
        // Intentionally empty
    }
    cachePageRef() {
        // Intentionally empty
    }
    isPageVisible() {
        return true;
    }
    isPageCached() {
        return true;
    }
    executeSetOCGState() {
        // Intentionally empty
    }
}
exports.default = LinkService;
