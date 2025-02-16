import { signInWithGoogle } from "../firebase/firebaseFuncs"
import { useState } from "react";


export default function AuthPage() {
    const [error, setError] = useState<string>("");
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-sm font-semibold">Welcome to CashCorn</h1>
            <div onClick={() => signInWithGoogle(setError)}>Login with Google</div>
        </div>
    )
}