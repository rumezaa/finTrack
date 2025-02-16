import { InputValue } from "../../types";
interface SelectBoxProps {
  children: React.ReactNode;
  value: InputValue;
  selected: InputValue;
  setSelected: (value: InputValue) => void;
}

export default function SelectBox({
  children,
  value,
  selected,
  setSelected,
}: SelectBoxProps) {
  const isSelected = value == selected;

  return (
    <button
      type="button"
      onClick={() => setSelected(value)}
      className={`text-xs font-semibold uppercase px-4 py-1 rounded-md cursor-pointer border-2 ${
        isSelected ? "border-[#f75a11]" : "border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}
