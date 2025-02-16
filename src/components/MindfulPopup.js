import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
const MindfulPopup = ({ isVisible, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [checks, setChecks] = useState({
        priceCompared: false,
        withinBudget: false,
        notImpulse: false,
        regularUse: false
    });
    // Disable scrolling when popup is visible
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }
        else {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isVisible]);
    useEffect(() => {
        if (isVisible && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isVisible, timeLeft]);
    const allChecked = Object.values(checks).every(Boolean);
    const canProceed = timeLeft === 0 && allChecked;
    const handleContinue = () => {
        onComplete();
    };
    if (!isVisible)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center", style: { background: 'rgba(0, 0, 0, 0.9)' }, children: _jsx("div", { className: "w-full h-full flex items-center justify-center px-4", children: _jsxs("div", { className: "bg-white rounded-lg p-8 max-w-2xl w-full relative overflow-hidden", children: [_jsx("div", { className: "absolute top-4 right-4", children: _jsx(Lock, { className: "text-gray-400", size: 24 }) }), _jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-2", children: "\uD83D\uDED1 Stop & Think" }), _jsxs("p", { className: "text-xl text-red-600 font-semibold", children: ["Waiting Period: ", timeLeft, " seconds"] }), _jsx("p", { className: "text-gray-600 mt-2", children: "This mandatory pause helps you make mindful purchasing decisions" })] }), _jsx("div", { className: "space-y-4 mb-8", children: Object.entries({
                            priceCompared: "I've thoroughly compared prices across different sellers",
                            withinBudget: "This purchase fits within my monthly budget",
                            notImpulse: "I'm making this purchase after careful consideration, not impulse",
                            regularUse: "I have a clear plan for how I'll use this item regularly"
                        }).map(([key, text]) => (_jsxs("label", { className: "flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group", children: [_jsx("input", { type: "checkbox", checked: checks[key], onChange: (e) => setChecks(prev => ({ ...prev, [key]: e.target.checked })), className: "mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" }), _jsx("span", { className: "ml-3 text-gray-700 font-medium group-hover:text-gray-900", children: text })] }, key))) }), _jsxs("div", { className: "text-center", children: [_jsx("button", { onClick: handleContinue, disabled: !canProceed, className: `w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all transform ${canProceed
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white scale-100 hover:scale-105'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`, children: canProceed ? 'Continue with Purchase' : 'Complete All Checks and Wait' }), !canProceed && (_jsx("p", { className: "mt-4 text-gray-500 text-sm", children: timeLeft > 0
                                    ? `Please wait ${timeLeft} more seconds and complete all checks`
                                    : 'Please complete all checkboxes to continue' }))] })] }) }) }));
};
export default MindfulPopup;
