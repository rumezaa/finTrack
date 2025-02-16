import { useState } from "react";
import Input from "./ui/Input";
import Label from "./ui/Label";
import SelectBox from "./ui/SelectBox";

interface Form1Props {
  setStep: (step: number) => void;
}

export default function Form1({ setStep }: Form1Props) {
  const [age, setAge] = useState<string | number | readonly string[] | undefined>();
  const [gender, setGender] = useState<string | number | readonly string[] | undefined>();
  const [debtComfortLevel, setDebtComfortLevel] = useState<string | number | readonly string[] | undefined>("2");
  const [annualIncome, setAnnualIncome] = useState<string | number | readonly string[] | undefined>();
  const [avgMonthlySavings, setAvgMonthlySavings] = useState<string | number | readonly string[] | undefined>();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setStep(2);
        console.log(
          `age: ${age}, gender: ${gender}, debt comfort level: ${debtComfortLevel}, annual income: ${annualIncome}, avg monthly savings: ${avgMonthlySavings}`
        );
      }}
    >
      <div className="flex flex-col gap-2">
        <Label>YOUR AGE</Label>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>YOUR GENDER IDENTITY</Label>
        <div className="flex justify-center gap-2">
          <SelectBox onClick={() => setGender("male")}>Male</SelectBox>
          <SelectBox onClick={() => setGender("void")}>
            Prefer not to say
          </SelectBox>
          <SelectBox onClick={() => setGender("female")}>Female</SelectBox>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>DEBT COMFORT LEVEL</Label>
        <input
          type="range"
          min="1"
          max="10"
          value={debtComfortLevel}
          onChange={(e) => setDebtComfortLevel(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>ANNUAL INCOME</Label>
        <Input
          type="number"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>AVERAGE MONTHLY SAVINGS</Label>
        <Input
          type="number"
          value={avgMonthlySavings}
          onChange={(e) => setAvgMonthlySavings(e.target.value)}
        />
      </div>
      <button type="submit">Continue to habits</button>
    </form>
  );
}
