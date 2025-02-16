interface SelectBoxProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function SelectBox({ children, onClick }: SelectBoxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-medium px-4 py-1 rounded-md border-2 border-gray-300 cursor-pointer"
    >
      {children}
    </button>
  );
}
