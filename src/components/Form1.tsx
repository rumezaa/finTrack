import Input from "./ui/Input";
import Label from "./ui/Label";
import SelectBox from "./ui/SelectBox";
import { FormData } from "../types";
import Button from "./ui/Button";

interface Form1Props {
  setStep: (step: number) => void;
  formData: FormData;
}

export default function Form1({ setStep, formData }: Form1Props) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setStep(2);
      }}
    >
      <div className="flex flex-col gap-2">
        <Label>YOUR AGE</Label>
        <Input
          type="number"
          value={formData.age}
          onChange={(e) => formData.setAge(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>YOUR GENDER IDENTITY</Label>
        <div className="flex justify-center gap-2">
          <SelectBox
            value="male"
            selected={formData.gender}
            setSelected={formData.setGender}
          >
            Male
          </SelectBox>
          <SelectBox
            value="void"
            selected={formData.gender}
            setSelected={formData.setGender}
          >
            Prefer not to say
          </SelectBox>
          <SelectBox
            value="female"
            selected={formData.gender}
            setSelected={formData.setGender}
          >
            Female
          </SelectBox>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>DEBT COMFORT LEVEL</Label>
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm font-medium">0</p>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.debtComfortLevel}
            onChange={(e) => formData.setDebtComfortLevel(e.target.value)}
            className="w-70"
            required
          />
          <p className="text-sm font-medium">10</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>ANNUAL INCOME</Label>
        <Input
          type="number"
          value={formData.annualIncome}
          onChange={(e) => formData.setAnnualIncome(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>AVERAGE MONTHLY SAVINGS</Label>
        <Input
          type="number"
          value={formData.avgMonthlySavings}
          onChange={(e) => formData.setAvgMonthlySavings(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Continue to habits</Button>
    </form>
  );
}
