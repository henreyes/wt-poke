// components/ChooseDifficulty.js
"use client";

import { useState } from 'react';
type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' | null;


export default function ChooseDifficulty() {
    const difficulties: Difficulty[] = ['Gen 1', 'Gen 2', 'Gen 3'];



    const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>(null);


  return (
    <div className="flex space-x-4 mb-40 mt-10">
      {difficulties.map((gen, index) => (
        <div
          key={index}
          className={`relative w-24 h-24 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center transform transition-all duration-300 ${activeDifficulty === gen ? 'w-32 h-32' : ''}`}
          onMouseEnter={() => setActiveDifficulty(gen)}
          onMouseLeave={() => setActiveDifficulty(null)}
        >
          <span className="text-white">{gen}</span>
          {activeDifficulty === gen && (
            <div className="absolute top-full mt-2 w-32 bg-white p-2 shadow rounded transition-opacity duration-400 ease-in-out text-gray-400">
              <p>Information about {gen}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
