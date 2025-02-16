import { useContext } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import FormPage from "./components/FormPage";
import { UserContext } from "./firebase/UserProvider";


function Pages() {
  const user = useContext(UserContext);

  return (
    <div className="px-6">
      {user ? (
        <>{(user?.signInFirstTime && <FormPage />) || <DashboardPage />}</>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default Pages;
