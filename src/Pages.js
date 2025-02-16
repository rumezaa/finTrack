import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import FormPage from "./components/FormPage";
import { UserContext } from "./firebase/UserProvider";
function Pages() {
    const user = useContext(UserContext);
    return (_jsx("div", { className: "px-6", children: user ? (_jsx(_Fragment, { children: (user?.signInFirstTime && _jsx(FormPage, {})) || _jsx(DashboardPage, {}) })) : (_jsx(AuthPage, {})) }));
}
export default Pages;
