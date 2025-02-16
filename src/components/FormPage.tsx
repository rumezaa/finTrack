import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

export default function FormPage() {
  const [step, setStep] = useState<number>(1);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 text-center mb-8">
        <h1>Welcome NAME</h1>
        <p>Help us understand your financial habits.</p>
      </div>

      {step == 1 && <Form1 setStep={setStep} />}
      {step == 2 && <Form2 />}
      {step == 3 && <Form3 />}
    </div>
  );
}
