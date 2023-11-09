// components/ChooseDifficulty.js
"use client"
import { useState } from 'react';
type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' | null;

export default function ChooseDifficulty({ onSelectDifficulty }: { onSelectDifficulty: (difficulty: Difficulty) => void }) {
  const difficulties: Difficulty[] = ['Gen 1', 'Gen 2', 'Gen 3'];
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>(null);

  return (
    <div className="flex space-x-4 mb-40 mt-10">
      {difficulties.map((gen, index) => (
        <button
          key={index}
          className={`relative w-24 h-24 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center transform transition-all duration-300 ${activeDifficulty === gen ? 'bg-blue-700 w-32 h-32' : ''}`}
          onClick={() => {
            setActiveDifficulty(gen);
            onSelectDifficulty(gen);
          }}
          onMouseEnter={() => setActiveDifficulty(gen)}
          onMouseLeave={() => setActiveDifficulty(null)}
          aria-label={`Select ${gen}`}
        >
          <span className="text-white text-lg font-bold">{gen}</span>
          {activeDifficulty === gen && (
            <div className="absolute top-full mt-2 w-32 bg-white p-2 shadow rounded transition-opacity duration-300 ease-in-out text-gray-700">
              <p>Information about {gen}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
