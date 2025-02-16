import { auth, db } from "./config";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { collection, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
async function addUser(data) {
    const usersCollection = collection(db, "users");
    try {
        if (!auth.currentUser?.uid) {
            throw new Error("No authenticated user found");
        }
        const userRef = doc(usersCollection, auth.currentUser.uid);
        await setDoc(userRef, data);
        await updateDoc(userRef, { id: userRef.id });
        console.log("Document successfully written!");
        return userRef;
    }
    catch (e) {
        console.error("Error writing document: ", e);
        throw e;
    }
}
export const signInWithGoogle = async (setError) => {
    try {
        // Get OAuth token from Chrome
        const token = await new Promise((resolve, reject) => {
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                }
                else if (!token) {
                    reject(new Error("No token received"));
                }
                else {
                    resolve(token);
                }
            });
        });
        // Create credential with the token
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(null, token);
        // Sign in to Firebase with the credential
        const result = await signInWithCredential(auth, credential);
        const user = result.user;
        if (!user.email) {
            throw new Error('No email provided from Google authentication');
        }
        // Check if user exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            // If user doesn't exist, create a new user document
            const data = {
                full_name: user.displayName,
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
            try {
                await addUser(data);
                console.log("New user document created in Firestore:", data);
            }
            catch (error) {
                console.error("Error creating new user:", error);
                throw error;
            }
        }
        return user;
    }
    catch (error) {
        const errorMessage = error?.message || 'An unknown error occurred';
        console.error('Sign-in error:', error);
        setError(errorMessage);
        setTimeout(() => {
            setError("");
        }, 3000);
        throw error;
    }
};
