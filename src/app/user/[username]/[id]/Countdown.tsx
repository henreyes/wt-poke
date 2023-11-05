

import React, { useState, useEffect } from 'react';

interface Props {
  duration?: number;  
  onEnd?: () => void;
  active?: boolean;
}

const CountdownBar: React.FC<Props> = ({ duration = 1, onEnd, active=true}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 10000); // now in milliseconds

  useEffect(() => {

    if (!active) {
      return;
    }
    if (timeLeft <= 0) {
      onEnd?.();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 50);  
    }, 50);  

    return () => clearInterval(intervalId);
  }, [timeLeft, onEnd, active]);

  const percentage = (timeLeft / (duration * 10000)) * 100;  


  const determineColor = (percentage: number) => {
    if (percentage > 75) return 'bg-green-600';
    if (percentage > 50) return 'bg-yellow-500'; 
    if (percentage > 25) return 'bg-orange-500';
    if (percentage > 10) return 'bg-orange-500'; 
    return 'bg-red-600';  
  };

  const barColor = determineColor(percentage);

  return (
    <div className="relative w-full h-5 bg-slate-600 rounded">
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-300 rounded ${barColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CountdownBar;



