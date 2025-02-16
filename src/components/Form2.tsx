import Input from "./ui/Input";
import Label from "./ui/Label";

export default function Form2() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>HOW FREQUENTLY DO YOU MAKE ONLINE PURCHASES</Label>
        <input type="range" min="1" max="10" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>ANNUAL INCOME</Label>
        <Input />
      </div>
      <div className="flex flex-col gap-2">
        <Label>AVERAGE MONTHLY SAVINGS</Label>
        <Input />
      </div>
      <button>Continue to habits</button>
    </form>
  );
}
