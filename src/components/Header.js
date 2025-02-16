import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CashCornLogo from "../../public/cashcorn-logo-full.png";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
export default function Header() {
    async function handleSignOut() {
        signOut(auth)
            .then(() => {
            localStorage.clear(); // we need somethig less volatile
        })
            .catch((error) => {
            console.error("Error signing out:", error);
        });
    }
    return (_jsxs("div", { className: "bg-[#F75A11] px-2 flex flex-row justify-between", children: [_jsx("img", { src: CashCornLogo, alt: "CashCorn Logo", className: "h-8" }), _jsx("div", { onClick: handleSignOut, children: "sign out" })] }));
}
