import { auth, db } from "./config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { collection, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";

async function addUser(data: any) {
  const usersCollection = collection(db, "users");

  try {
    const userRef = doc(usersCollection, auth.currentUser?.uid);
    await setDoc(userRef, data);
    await updateDoc(userRef, { id: userRef.id });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

// Function to verify email and password input



export const signInWithGoogle = async (setError: (error: string) => void) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;


    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // If user doesn't exist, create a new user document
      const data = {
       full_name: user.displayName, // Assuming displayName is in "First Last" format
       email: user.email,
       signInFirstTime: true,
       rankings: [],
       age: "",
       debtLev: "",
       annInc: "",
       avgMonthSpend: "",
       genderIdentity: "",
       purchaseFreq: "",
      };

      addUser(data);
      console.log("New user document created in Firestore:", data);
    }
  } catch (error: any) {
    const errorMessage = error.message;
    setError(errorMessage);
    setTimeout(() => {
      setError(""); // Reset after 5 seconds
    }, 3000);
  }
};

