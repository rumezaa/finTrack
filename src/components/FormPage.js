import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
export default function FormPage() {
    const [step, setStep] = useState(1);
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-col justify-center items-center gap-2 text-center mb-8", children: [_jsx("h1", { children: "Welcome NAME" }), _jsx("p", { children: "Help us understand your financial habits." })] }), step == 1 && _jsx(Form1, { setStep: setStep }), step == 2 && _jsx(Form2, {}), step == 3 && _jsx(Form3, {})] }));
}
