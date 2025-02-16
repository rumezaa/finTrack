import { useState, useContext, useEffect } from "react";
import { UserContext } from "./firebase/UserProvider";
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import FormPage from "./components/FormPage";
import Game from "./components/Game";

// Define types for user context
type User = {
  full_name: string; // Assuming displayName is in "First Last" format
  email: string;
  signInFirstTime: boolean;
  id: string,
  age: string | number; // Age field
  gender: string; // Gender identity
  debtComfortLevel: number; // Debt comfort level, assuming it's a number (e.g., 1-10)
  annualIncome: string | number; // Annual income, this could be a string or number
  avgMonthlySavings: string | number; // Average monthly savings
  purchaseFrequency: string; // How often the user makes purchases (e.g., monthly, weekly)
  foodSpend: string | number; // Food-related spending
  clothingSpend: string | number; // Clothing-related spending
  electronicsSpend: string | number; // Electronics-related spending
  subscriptionsSpend: string | number; // Subscriptions-related spending
  otherSpend: string | number; // Other spending categories
};

function Pages() {
  const user = useContext<User | null>(UserContext);  // UserContext can be null if no user is logged in
  const [showGame, setShowGame] = useState<boolean>(false);  // State to control game visibility


  useEffect(() => {
    // Listen for button clicks to show the game
    const interceptPurchaseButtons = () => {
      const buttons = document.querySelectorAll<HTMLElement>("button, a, div"); // Select potential buttons

      buttons.forEach((button) => {
        const textContent = button.textContent?.toLowerCase() || "";
        const purchaseKeywords = [
          "buy",
          "add to cart",
          "checkout",
          "purchase",
          "place order",
          "add to basket",
          "proceed to checkout",
        ];

        if (purchaseKeywords.some((keyword) => textContent.includes(keyword))) {
          button.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default action (add to cart, checkout)

            setShowGame(true); // Show the game popup

            setTimeout(() => {
              // Allow the purchase action to continue after the game
              button.click(); // Continue the original purchase action after showing the game
            }, 5000); // Wait for 5 seconds before triggering the purchase
          });
        }
      });
    };

    interceptPurchaseButtons();
  }, []); // Only run once on mount

  return (
    <div className="px-6">
      {user ? (
        <>
          {user.signInFirstTime ? (
            <FormPage />
          ) : (
            <DashboardPage />
          )}
          {/* Conditionally render the game if showGame is true */}
          {showGame && <Game />}
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default Pages;
