"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResponses = exports.usePageContext = exports.useOutlineContext = exports.useDocumentContext = exports.Thumbnail = exports.Page = exports.Outline = exports.Document = exports.pdfjs = void 0;
const pdfjs = __importStar(require("pdfjs-dist"));
exports.pdfjs = pdfjs;
const Document_js_1 = __importDefault(require("./Document.js"));
exports.Document = Document_js_1.default;
const Outline_js_1 = __importDefault(require("./Outline.js"));
exports.Outline = Outline_js_1.default;
const Page_js_1 = __importDefault(require("./Page.js"));
exports.Page = Page_js_1.default;
const Thumbnail_js_1 = __importDefault(require("./Thumbnail.js"));
exports.Thumbnail = Thumbnail_js_1.default;
const useDocumentContext_js_1 = __importDefault(require("./shared/hooks/useDocumentContext.js"));
exports.useDocumentContext = useDocumentContext_js_1.default;
const useOutlineContext_js_1 = __importDefault(require("./shared/hooks/useOutlineContext.js"));
exports.useOutlineContext = useOutlineContext_js_1.default;
const usePageContext_js_1 = __importDefault(require("./shared/hooks/usePageContext.js"));
exports.usePageContext = usePageContext_js_1.default;
const PasswordResponses_js_1 = __importDefault(require("./PasswordResponses.js"));
exports.PasswordResponses = PasswordResponses_js_1.default;
const utils_js_1 = require("./shared/utils.js");
(0, utils_js_1.displayWorkerWarning)();
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';
