import { db, auth } from "./config";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define the User type
type User = {
  full_name: string; // Assuming displayName is in "First Last" format
  email: string;
  signInFirstTime: string;
  rankings: any;
  age: string;
  debtLev: string;
  annInc: string;
  avgMonthSpend: string;
  genderIdentity: string;
  purchaseFreq: string; // Optional field
  // Add other fields as needed
};

// 1. Define the context type to be `User | null`
export const UserContext = createContext<User | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const docRef = doc(db, "users", userAuth.uid);
        const docUnsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser(docSnap.data() as User);
            setInitializing(false);
          } else {
            console.log("No such document!");
            setInitializing(false);
          }
        });

        return () => docUnsubscribe();
      } else {
        setUser(null);
        setInitializing(false);
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
