import { useState } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import FormPage from "./components/FormPage";
import Header from "./components/Header";

function App() {
  const [page, setPage] = useState<string>("auth");

  return (
    <>
      <div className="w-[25rem] h-[37.5rem] flex flex-col gap-2">
        <Header />
        <div className="px-6">
          <ul className="flex gap-2 text-xs">
            <li onClick={() => setPage("auth")}>Auth</li>
            <li onClick={() => setPage("form")}>Form</li>
            <li onClick={() => setPage("dashboard")}>Dashboard</li>
          </ul>
          {page == "auth" && <AuthPage />}
          {page == "form" && <FormPage setPage={setPage} />}
          {page == "dashboard" && <DashboardPage />}
        </div>
      </div>
    </>
  );
}

export default App;
