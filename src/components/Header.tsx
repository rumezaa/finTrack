import CashCornLogo from "../../public/cashcorn-logo-full.png"

export default function Header() {
    return (
        <div className="bg-[#F75A11] px-2">
            <img src={CashCornLogo} alt="CashCorn Logo" className="h-8"/>
        </div>
    )
}
