export type InputValue = string | number | readonly string[] | undefined;

export type SubmitData = {
  age: InputValue;
  gender: InputValue;
  debtComfortLevel: InputValue;
  annualIncome: InputValue;
  avgMonthlySavings: InputValue;
  purchaseFrequency: InputValue;
  foodSpend: InputValue;
  clothingSpend: InputValue;
  electronicsSpend: InputValue;
  subscriptionsSpend: InputValue;
  otherSpend: InputValue;
};

export type FormData = SubmitData & {
  setAge: React.Dispatch<React.SetStateAction<InputValue>>;
  setGender: React.Dispatch<React.SetStateAction<InputValue>>;
  setDebtComfortLevel: React.Dispatch<React.SetStateAction<InputValue>>;
  setAnnualIncome: React.Dispatch<React.SetStateAction<InputValue>>;
  setAvgMonthlySavings: React.Dispatch<React.SetStateAction<InputValue>>;
  setPurchaseFrequency: React.Dispatch<React.SetStateAction<InputValue>>;
  setFoodSpend: React.Dispatch<React.SetStateAction<InputValue>>;
  setClothingSpend: React.Dispatch<React.SetStateAction<InputValue>>;
  setElectronicsSpend: React.Dispatch<React.SetStateAction<InputValue>>;
  setSubscriptionsSpend: React.Dispatch<React.SetStateAction<InputValue>>;
  setOtherSpend: React.Dispatch<React.SetStateAction<InputValue>>;
};