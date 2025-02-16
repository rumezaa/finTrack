import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import Header from "./components/Header";
import { UserProvider } from "./firebase/UserProvider";
import Pages from "./Pages";
function App() {
    return (_jsx(UserProvider, { children: _jsxs("div", { className: "w-[25rem] h-[30rem] flex flex-col gap-2 border border-red-500", children: [_jsx(Header, {}), _jsx(Pages, {})] }) }));
}
export default App;
