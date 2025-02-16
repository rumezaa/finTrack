import { db, auth } from "./config";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define the User type
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


// 1. Define the context type to be `User | null`
export const UserContext = createContext<User | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const docRef = doc(db, "users", userAuth.uid);
        const docUnsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser(docSnap.data() as User);
      
          } else {
            console.log("No such document!");
 
          }
        });

        return () => docUnsubscribe();
      } else {
        setUser(null);

      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
