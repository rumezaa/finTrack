import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface MindfulPopupProps {
  isVisible: boolean;
  onComplete: () => void;
}

const MindfulPopup: React.FC<MindfulPopupProps> = ({ isVisible, onComplete }) => {
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
    } else {
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

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.9)' }}
    >
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Lock className="text-gray-400" size={24} />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🛑 Stop & Think</h2>
            <p className="text-xl text-red-600 font-semibold">
              Waiting Period: {timeLeft} seconds
            </p>
            <p className="text-gray-600 mt-2">
              This mandatory pause helps you make mindful purchasing decisions
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {Object.entries({
              priceCompared: "I've thoroughly compared prices across different sellers",
              withinBudget: "This purchase fits within my monthly budget",
              notImpulse: "I'm making this purchase after careful consideration, not impulse",
              regularUse: "I have a clear plan for how I'll use this item regularly"
            }).map(([key, text]) => (
              <label 
                key={key}
                className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checks[key as keyof typeof checks]}
                  onChange={(e) => setChecks(prev => ({...prev, [key]: e.target.checked}))}
                  className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900">
                  {text}
                </span>
              </label>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={!canProceed}
              className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all transform ${
                canProceed 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white scale-100 hover:scale-105' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canProceed ? 'Continue with Purchase' : 'Complete All Checks and Wait'}
            </button>
            
            {!canProceed && (
              <p className="mt-4 text-gray-500 text-sm">
                {timeLeft > 0 
                  ? `Please wait ${timeLeft} more seconds and complete all checks`
                  : 'Please complete all checkboxes to continue'
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfulPopup;
