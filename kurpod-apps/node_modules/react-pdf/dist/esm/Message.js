import { jsx as _jsx } from "react/jsx-runtime";
export default function Message({ children, type }) {
    return _jsx("div", { className: `react-pdf__message react-pdf__message--${type}`, children: children });
}
