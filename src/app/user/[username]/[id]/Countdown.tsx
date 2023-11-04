

import React, { useState, useEffect } from 'react';

interface Props {
  duration?: number;  
  onEnd?: () => void;
}

const CountdownBar: React.FC<Props> = ({ duration = 15, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 1000); // now in milliseconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd?.();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 50);  
    }, 50);  

    return () => clearInterval(intervalId);
  }, [timeLeft, onEnd]);

  const percentage = (timeLeft / (duration * 1000)) * 100;  


  const determineColor = (percentage: number) => {
    if (percentage > 75) return 'bg-green-600';
    if (percentage > 50) return 'bg-yellow-500'; 
    if (percentage > 25) return 'bg-orange-500';
    if (percentage > 10) return 'bg-orange-500'; 
    return 'bg-red-600';  
  };

  const barColor = determineColor(percentage);

  return (
    <div className="relative w-1/4 h-4 bg-gray-200 rounded">
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-300 rounded ${barColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CountdownBar;



