import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithGoogle } from "../firebase/firebaseFuncs";
import { useState } from "react";
export default function AuthPage() {
    const [error, setError] = useState("");
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("h1", { className: "text-sm font-semibold", children: "Welcome to CashCorn" }), _jsx("div", { onClick: () => signInWithGoogle(setError), children: "Login with Google" }), _jsx("p", { children: error })] }));
}
