import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Input from "./ui/Input";
import Label from "./ui/Label";
import SelectBox from "./ui/SelectBox";
export default function Form1({ setStep }) {
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [debtComfortLevel, setDebtComfortLevel] = useState("2");
    const [annualIncome, setAnnualIncome] = useState();
    const [avgMonthlySavings, setAvgMonthlySavings] = useState();
    return (_jsxs("form", { className: "flex flex-col gap-4", onSubmit: (e) => {
            e.preventDefault();
            setStep(2);
            console.log(`age: ${age}, gender: ${gender}, debt comfort level: ${debtComfortLevel}, annual income: ${annualIncome}, avg monthly savings: ${avgMonthlySavings}`);
        }, children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "YOUR AGE" }), _jsx(Input, { type: "number", value: age, onChange: (e) => setAge(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "YOUR GENDER IDENTITY" }), _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx(SelectBox, { onClick: () => setGender("male"), children: "Male" }), _jsx(SelectBox, { onClick: () => setGender("void"), children: "Prefer not to say" }), _jsx(SelectBox, { onClick: () => setGender("female"), children: "Female" })] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "DEBT COMFORT LEVEL" }), _jsx("input", { type: "range", min: "1", max: "10", value: debtComfortLevel, onChange: (e) => setDebtComfortLevel(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "ANNUAL INCOME" }), _jsx(Input, { type: "number", value: annualIncome, onChange: (e) => setAnnualIncome(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { children: "AVERAGE MONTHLY SAVINGS" }), _jsx(Input, { type: "number", value: avgMonthlySavings, onChange: (e) => setAvgMonthlySavings(e.target.value) })] }), _jsx("button", { type: "submit", children: "Continue to habits" })] }));
}
