// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../firebase/UserProvider";
// import { predict } from "../ml/model";

// // Define the User type (if not defined elsewhere)
// interface User {
//   full_name: string; // Assuming displayName is in "First Last" format
//   email: string;
//   signInFirstTime: boolean;
//   id: string;
//   age: string | number; // Age field
//   gender: string; // Gender identity
//   debtComfortLevel: number; // Debt comfort level, assuming it's a number (e.g., 1-10)
//   annualIncome: string | number; // Annual income, this could be a string or number
//   avgMonthlySavings: string | number; // Average monthly savings
//   purchaseFrequency: string; // How often the user makes purchases (e.g., monthly, weekly)
//   foodSpend: string | number; // Food-related spending
//   clothingSpend: string | number; // Clothing-related spending
//   electronicsSpend: string | number; // Electronics-related spending
//   subscriptionsSpend: string | number; // Subscriptions-related spending
//   otherSpend: string | number; // Other spending categories
// }

// const DashboardPage = () => {
//   const user = useContext<User | null>(UserContext); // Fetching user from context
//   const [predictions, setPrediction] = useState<number | null>(null);

//   // Trigger ML function whenever the user object changes
//   useEffect(() => {
//     if (user) {
//       // Prepare the data for prediction
//       const userData = {
//         age: Number(user.age), // Ensure age is a number
//         gender: user.gender === "male" ? 1 : user.gender === "female" ? 2 : 3, // Encode gender: 1 = male, 2 = female, 3 = other
//         income: Number(user.annualIncome), // Convert income to number
//         categories: Number(user.purchaseFrequency), // Convert purchase frequency to number
//         debt_comfort_level: Number(user.debtComfortLevel), // Convert debt comfort level to number
//         online_purchase_frequency: Number(user.purchaseFrequency), // Assuming purchaseFrequency is online purchase frequency
//       };

//       const runPrediction = async () => {
//         try {
//           const result = await predict(userData); // Example input

//           // Check for undefined or null before setting state
//           if (result !== undefined && result !== null) {
//             setPrediction(result);
//           } else {
//             console.warn("Prediction returned undefined or null.");
//           }
//           console.log("Prediction result:", result);
//         } catch (error) {
//           console.error("Prediction error:", error);
//         }
//       };

//       runPrediction();
//     }
//   }, [user]); // Dependency array ensures that useEffect runs when the user object changes

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="bg-green-500 text-white py-6 text-center rounded-b-lg shadow-md">
//         <h1 className="text-3xl font-semibold">Welcome to Your Dashboard</h1>
//       </div>

//       <div className="container mx-auto p-6">
//         {user ? (
//           <div className="bg-white ite p-6 rounded-lg shadow-lg">
//             {predictions}
//           </div>
//         ) : (
//           <div className="text-center mt-6">
//             <p className="text-xl text-gray-500">No user is logged in.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../firebase/UserProvider";
import Game from "./Game";
import Label from "./ui/Label";
import { predict } from "../ml/model";

// Define the User type (if not defined elsewhere)
interface User {
  full_name: string;
  email: string;
  signInFirstTime: boolean;
  id: string;
  age: string | number;
  gender: string;
  debtComfortLevel: number;
  annualIncome: string | number;
  avgMonthlySavings: string | number;
  purchaseFrequency: string;
  foodSpend: string | number;
  clothingSpend: string | number;
  electronicsSpend: string | number;
  subscriptionsSpend: string | number;
  otherSpend: string | number;
}

const DashboardPage = () => {
  const user = useContext<User | null>(UserContext);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);

  const cashGoal = 1025.0; // Total monthly cash goal
  const expenses = {
    food: 300.0, // Food expense
    clothing: 150.0, // Clothing expense
    electronics: 0.0, // Electronics expense
    subscriptions: 17.99, // Subscriptions expense
    other: 55.0, // Other expense
  };

  const totalExpenses = Object.values(expenses).reduce(
    (acc, value) => acc + value,
    0
  );
  const progressPercentage = (totalExpenses / cashGoal) * 100;

  useEffect(() => {
    // Listen for message from content script
    const handleMessage = (message: any) => {
      console.log(message);
      if (message.action === "showGame") {
        setShowGame(true);
      }
    };

    console.log(showGame, prediction);

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // Trigger ML function whenever the user object changes
  useEffect(() => {
    if (user) {
      const userData = {
        age: Number(user.age),
        gender: user.gender === "male" ? 1 : user.gender === "female" ? 2 : 3,
        income: Number(user.annualIncome),
        categories: Number(user.purchaseFrequency),
        debt_comfort_level: Number(user.debtComfortLevel),
        online_purchase_frequency: Number(user.purchaseFrequency),
      };

      const runPrediction = async () => {
        try {
          const result = await predict(userData); // Example input

          // Check for undefined or null before setting state
          if (result !== undefined && result !== null) {
            setPrediction(result);
          } else {
            console.warn("Prediction returned undefined or null.");
          }
          console.log("Prediction result:", result);
        } catch (error) {
          console.error("Prediction error:", error);
        }
      };
      runPrediction();
    }
  }, [user]);

  return (
    <>
      {showGame ? (
        <Game />
      ) : user ? (
        <div className="min-h-screen">
          <div className="container mx-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="flex flex-col justify-center items-center gap-2 text-center mb-8">
                  <h1>Welcome Back {user?.full_name}</h1>
                </div>

                <div>
                  <Label>MONTHLY CASH GOAL</Label>
                  <div className="w-full bg-gray-200 h-4 rounded-lg">
                    <div
                      className="bg-green-500 h-4 rounded-lg"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm">
                    {progressPercentage.toFixed(2)}% of your budget used
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Label>🍔 Food:</Label>
                    <p>${expenses.food.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>👖 Clothing:</Label>
                    <p>${expenses.clothing.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>📱 Electronics:</Label>
                    <p>${expenses.electronics.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>💳 Subscriptions:</Label>
                    <p>${expenses.subscriptions.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>🤑 Other:</Label>
                    <p>${expenses.other.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="text-xl text-gray-500">No user is logged in.</p>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
