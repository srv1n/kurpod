"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDocumentContext;
const react_1 = require("react");
const DocumentContext_js_1 = __importDefault(require("../../DocumentContext.js"));
function useDocumentContext() {
    return (0, react_1.useContext)(DocumentContext_js_1.default);
}
