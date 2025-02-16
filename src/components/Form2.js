import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Input from "./ui/Input";
import Label from "./ui/Label";
export default function Form2() {
    return (_jsxs("form", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "HOW FREQUENTLY DO YOU MAKE ONLINE PURCHASES" }), _jsx("input", { type: "range", min: "1", max: "10" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "RANK THE CATEGORIES" }), _jsx(Input, {})] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "AVERAGE MONTHLY SAVINGS" }), _jsx(Input, {})] }), _jsx("button", { children: "Continue to habits" })] }));
}
