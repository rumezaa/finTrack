import { jsx as _jsx } from "react/jsx-runtime";
export default function Button({ children, onClick, disabled = false, }) {
    return (_jsx("button", { onClick: onClick, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400", children: children }));
}
