import { InputValue } from "../../types";

interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: InputValue;
  required?: boolean;
}

export default function Input({
  type,
  placeholder,
  className,
  onChange,
  value,
  required,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f75a11] focus:border-transparent transition-all duration-200 bg-white ${className}`}
      onChange={onChange}
      value={value}
    />
  );
}