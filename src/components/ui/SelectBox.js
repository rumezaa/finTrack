import { jsx as _jsx } from "react/jsx-runtime";
export default function SelectBox({ children, onClick }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: "text-sm font-medium px-4 py-1 rounded-md border-2 border-gray-300 cursor-pointer", children: children }));
}
