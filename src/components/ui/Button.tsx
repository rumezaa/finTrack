import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-[#f75a11] hover:bg-[#f75a11ec] cursor-pointer text-white rounded-md disabled:bg-gray-400 font-semibold uppercase text-xs ${className}`}
    >
      {children}
    </button>
  );
}
