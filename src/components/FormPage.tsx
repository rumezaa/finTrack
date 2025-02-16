import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { InputValue } from "../types";
import { useContext } from "react";
import { UserContext } from "../firebase/UserProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";


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


export default function FormPage() {
  const user = useContext<User | null>(UserContext);
  const [step, setStep] = useState<number>(1);
  const [age, setAge] = useState<InputValue>();
  const [gender, setGender] = useState<InputValue>();
  const [debtComfortLevel, setDebtComfortLevel] = useState<InputValue>(5);
  const [annualIncome, setAnnualIncome] = useState<InputValue>();
  const [avgMonthlySavings, setAvgMonthlySavings] = useState<InputValue>();

  const [purchaseFrequency, setPurchaseFrequency] = useState<InputValue>();
  const [foodSpend, setFoodSpend] = useState<InputValue>();
  const [clothingSpend, setClothingSpend] = useState<InputValue>();
  const [electronicsSpend, setElectronicsSpend] = useState<InputValue>();
  const [subscriptionsSpend, setSubscriptionsSpend] = useState<InputValue>();
  const [otherSpend, setOtherSpend] = useState<InputValue>();


  const formData = {
    age,
    setAge,
    gender,
    setGender,
    debtComfortLevel,
    setDebtComfortLevel,
    annualIncome,
    setAnnualIncome,
    avgMonthlySavings,
    setAvgMonthlySavings,
    purchaseFrequency,
    setPurchaseFrequency,
    foodSpend,
    setFoodSpend,
    clothingSpend,
    setClothingSpend,
    electronicsSpend,
    setElectronicsSpend,
    subscriptionsSpend,
    setSubscriptionsSpend,
    otherSpend,
    setOtherSpend,
  };




  const submitData = {
    age,
    gender,
    debtComfortLevel,
    annualIncome,
    avgMonthlySavings,
    purchaseFrequency,
    foodSpend,
    clothingSpend,
    electronicsSpend,
    subscriptionsSpend,
    otherSpend,
  };


  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("hi")
    // Update only the preferences field

    if (!user?.id) {
      console.error("User ID is missing");
      return;
    }

    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      ...submitData,
      signInFirstTime: false,
    });

  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 text-center mb-8">
        <h1>Welcome NAME</h1>
        <p>Help us understand your financial habits.</p>
      </div>

      {step == 1 && <Form1 setStep={setStep} formData={formData} />}
      {step == 2 && (
        <Form2 formData={formData} handleFormSubmit={handleUpdate} />
      )}
    </div>
  );
}