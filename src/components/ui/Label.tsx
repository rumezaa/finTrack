import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

export default function Label({ children }: LabelProps) {
  return (
    <label className="text-xs font-semibold uppercase text-nowrap">
      {children}
    </label>
  );
}