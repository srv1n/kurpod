"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useResolver;
const react_1 = require("react");
function reducer(state, action) {
    switch (action.type) {
        case 'RESOLVE':
            return { value: action.value, error: undefined };
        case 'REJECT':
            return { value: false, error: action.error };
        case 'RESET':
            return { value: undefined, error: undefined };
        default:
            return state;
    }
}
function useResolver() {
    return (0, react_1.useReducer)((reducer), { value: undefined, error: undefined });
}
