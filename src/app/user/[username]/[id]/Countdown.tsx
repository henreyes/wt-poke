// components/CountdownBar.tsx

import React, { useState, useEffect } from 'react';

interface Props {
  duration?: number;   
  onEnd?: () => void;
}

const CountdownBar: React.FC<Props> = ({ duration = 15, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 1000);  

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


  return (
    <div className="relative w-full h-4 bg-gray-800 rounded">
      <div
        className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-300 rounded"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CountdownBar;
