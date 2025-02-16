import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import { FormData } from "../types";
interface Form2Props {
  formData: FormData;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form2({ formData, handleFormSubmit }: Form2Props) {
  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => handleFormSubmit(e)}>
      <div className="flex flex-col gap-2">
        <Label>HOW FREQUENTLY DO YOU MAKE ONLINE PURCHASES</Label>
        <div className="flex justify-between items-center gap-2">
          <p className="text-xs font-medium uppercase text-center">Barely</p>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.purchaseFrequency}
            onChange={(e) => formData.setPurchaseFrequency(e.target.value)}
            className="w-70"
            required
          />
          <p className="text-xs font-medium uppercase text-center">Every day</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>ENTER MONTHLY SPENDING GOAL FOR EACH CATEGORY</Label>
        <div className="flex items-center gap-2">
          <Label>🍔 Food:</Label>
          <Input
            type="number"
            value={formData.foodSpend}
            onChange={(e) => formData.setFoodSpend(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>👖 Clothing:</Label>
          <Input
            type="number"
            value={formData.clothingSpend}
            onChange={(e) => formData.setClothingSpend(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>📱 Electronics:</Label>
          <Input
            type="number"
            value={formData.electronicsSpend}
            onChange={(e) => formData.setElectronicsSpend(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>💳 Subscriptions:</Label>
          <Input
            type="number"
            value={formData.subscriptionsSpend}
            onChange={(e) => formData.setSubscriptionsSpend(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>🤑 Other:</Label>
          <Input
            type="number"
            value={formData.otherSpend}
            onChange={(e) => formData.setOtherSpend(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit">Start saving! :P</Button>
    </form>
  );
}
