import React from "react";

interface LabelProps {
    children: React.ReactNode
}

export default function Label({children}: LabelProps) {
    return <label className="text-sm font-semibold uppercase">{children}</label>

}