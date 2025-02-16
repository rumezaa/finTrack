import { useContext, useEffect } from "react";
import { UserContext } from "../firebase/UserProvider"; // Assuming UserContext is set up
import Game from "./Game";

// Define the User type (if not defined elsewhere)
type User = {
  full_name: string; // Assuming displayName is in "First Last" format
  email: string;
  signInFirstTime: boolean;
  id: string;
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

const DashboardPage = () => {
  const user = useContext<User | null>(UserContext); // Fetching user from context

  // Trigger ML function whenever the user object changes
  useEffect(() => {
    if (user) {
      // Prepare the data for prediction
      const userData = {
        age: Number(user.age), // Ensure age is a number
        gender: user.gender === "male" ? 1 : user.gender === "female" ? 2 : 3, // Encode gender: 1 = male, 2 = female, 3 = other
        income: Number(user.annualIncome), // Convert income to number
        categories: Number(user.purchaseFrequency), // Convert purchase frequency to number
        debt_comfort_level: Number(user.debtComfortLevel), // Convert debt comfort level to number
        online_purchase_frequency: Number(user.purchaseFrequency), // Assuming purchaseFrequency is online purchase frequency
      };

      console.log(userData)
      // Call the predict function
    //   predict(userData)
    //     .then((result: any) => {
    //       console.log("Prediction Result:", result);
    //     })
    //     .catch((error: any) => {
    //       console.error("Prediction failed:", error);
    //     });
    }
  }, [user]); // Dependency array ensures that useEffect runs when the user object changes

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-green-500 text-white py-6 text-center rounded-b-lg shadow-md">
        <h1 className="text-3xl font-semibold">Welcome to Your Dashboard</h1>
      </div>

      <div className="container mx-auto p-6">
        {user ? (
          <div className="bg-white ite p-6 rounded-lg shadow-lg">
            <Game />
          </div>
        ) : (
          <div className="text-center mt-6">
            <p className="text-xl text-gray-500">No user is logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
