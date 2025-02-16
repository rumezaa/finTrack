export default function Form3() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">YOUR AGE</label>
        <input type="select" className="border rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">YOUR GENDER IDENTITY</label>
        <div className="flex justify-center gap-2">
          <button className="bg-white text-sm">male</button>
          <button>prefer not to say</button>
          <button>female</button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">DEBT COMFORT LEVEL</label>
        <input type="range" min="1" max="10" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">ANNUAL INCOME</label>
        <input type="number" className="border rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">AVERAGE MONTHLY SAVINGS</label>
        <input type="number" className="border rounded-md" />
      </div>
      <button>Continue to habits</button>
    </form>
  );
}
