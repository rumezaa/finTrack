import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { InputValue } from "../types";

interface FormPageProps {
  setPage: (page: string) => void;
}

export default function FormPage({ setPage }: FormPageProps) {
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

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(submitData);
    setPage("dashboard");
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 text-center mb-8">
        <h1>Welcome NAME</h1>
        <p>Help us understand your financial habits.</p>
      </div>

      {step == 1 && <Form1 setStep={setStep} formData={formData} />}
      {step == 2 && (
        <Form2 formData={formData} handleFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
