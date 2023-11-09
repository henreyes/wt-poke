// components/ChooseDifficulty.js
"use client"
// components/ChooseDifficulty.js
import { useState } from 'react';
type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' ;

const typeToColor: { [key in Difficulty]?: string } = {
  "Gen 1": 'bg-green-500',
  "Gen 2": 'bg-purple-500',
  "Gen 3": 'bg-red-500',
};

const activeColor: { [key in Difficulty]?: string } = {
  "Gen 1": 'bg-green-800',
  "Gen 2": 'bg-purple-800',
  "Gen 3": 'bg-red-800',
};

export default function ChooseDifficulty({ onSelectDifficulty }: { onSelectDifficulty: (difficulty: Difficulty) => void }) {
  const difficulties: Difficulty[] = ['Gen 1', 'Gen 2', 'Gen 3'];
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleSelectDifficulty = (gen: Difficulty) => {
    setSelectedDifficulty(gen);
    onSelectDifficulty(gen);
  };

  return (
    <div className="flex space-x-4 mb-40 mt-10">
      {difficulties.map((gen, index) => (
        <button
          key={index}
          className={`relative w-24 h-24 ${selectedDifficulty === gen ? activeColor[gen] : typeToColor[gen] || 'bg-slate-200'} rounded-full cursor-pointer flex items-center justify-center transform transition-all duration-300 ${selectedDifficulty === gen ? 'w-32 h-32' : ''}`}
          onClick={() => handleSelectDifficulty(gen)}
          aria-label={`Select ${gen}`}
        >
          <span className="text-white text-lg font-bold">{gen}</span>
          {selectedDifficulty === gen && (
            <div className="absolute top-full mt-2 w-32 bg-white p-2 shadow rounded transition-opacity duration-300 ease-in-out text-gray-700">
              <p>Information about {gen}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
