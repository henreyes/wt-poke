"use client";
import React from 'react';

const HeartIcon: React.FC<{ fill?: string }> = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill={fill || "none"}  
    stroke="" 
  >
    <path
      strokeLinecap="round"  
      strokeLinejoin="round"  
      strokeWidth={2}  
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

const HeartContainer: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="flex justify-center items-center w-8 h-8">
    <HeartIcon fill={active ? "#ffa07a" : "#36383F"} />
  </div>
);
 
const AttemptsIndicator: React.FC<{ attempts: number; totalAttempts?: number }> = ({
  attempts,
  totalAttempts = 3,  
}) => (
  <div className="flex justify-evenly items-center h-full">
    {Array.from({ length: totalAttempts }, (_, i) => (
      <HeartContainer key={i} active={i < attempts} />
    ))}
  </div>
);

export default AttemptsIndicator;

