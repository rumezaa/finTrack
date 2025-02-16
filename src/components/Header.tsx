import CashCornLogo from "../../public/cashcorn-logo-full.png"
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Header() {

    async function handleSignOut() {
        signOut(auth)
          .then(() => {
            localStorage.clear(); // we need somethig less volatile
          })
          .catch((error: string) => {
            console.error("Error signing out:", error);
          });
      }
    return (
        <div className="bg-[#F75A11] px-2 flex flex-row justify-between items-center">
            <img src={CashCornLogo} alt="CashCorn Logo" className="h-8"/>

            <div onClick={handleSignOut}>sign out</div>

        </div>
    )
}
