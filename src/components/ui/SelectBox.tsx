import { InputValue } from "../../types";
interface SelectBoxProps {
  children: React.ReactNode;
  text: string;
  selected: InputValue;
  setSelected: (value: InputValue) => void;
}

export default function SelectBox({
  children,
  text,
  selected,
  setSelected,
}: SelectBoxProps) {
  const isSelected = text == selected;


  return (
    <button
      type="button"
      onClick={() => setSelected(text)}
      className={`text-xs font-semibold uppercase px-4 py-1 rounded-md cursor-pointer border-2 ${
        isSelected ? "border-[#f75a11]" : "border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}