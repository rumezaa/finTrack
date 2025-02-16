
import "./App.css";
import Header from "./components/Header";
import { UserProvider } from "./firebase/UserProvider";
import Pages from "./Pages";

function App() {
  

  return (
    <UserProvider>
      <div className="w-[25rem] h-[30rem] flex flex-col gap-2">
        <Header />
        <Pages />
      </div>
    </UserProvider>
  );
}

export default App;
