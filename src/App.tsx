import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { useEffect } from "react";
import { UserProvider } from "./firebase/UserProvider";
import { auth } from "./firebase/config";
import Pages from "./Pages";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      setLoading(false);
    });

    return unsubscribe;
  }, []);






  return (
    <UserProvider>
      <div className="w-[25rem] h-[30rem] flex flex-col gap-2 border border-red-500">
        <Header />
        <Pages />
      </div>
    </UserProvider>
  );
}

export default App;
