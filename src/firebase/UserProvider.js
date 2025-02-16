import { jsx as _jsx } from "react/jsx-runtime";
import { db, auth } from "./config";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
// 1. Define the context type to be `User | null`
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                const docRef = doc(db, "users", userAuth.uid);
                const docUnsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                    }
                    else {
                        console.log("No such document!");
                    }
                });
                return () => docUnsubscribe();
            }
            else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    return (_jsx(UserContext.Provider, { value: user, children: children }));
};
