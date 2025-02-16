import { jsx as _jsx } from "react/jsx-runtime";
export default function Input({ type, placeholder, className, onChange, value, }) {
    return (_jsx("input", { type: type, placeholder: placeholder, className: `w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f75a11] focus:border-transparent transition-all duration-200 bg-white ${className}`, onChange: onChange, value: value }));
}
