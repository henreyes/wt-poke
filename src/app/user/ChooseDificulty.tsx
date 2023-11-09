// components/ChooseDifficulty.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' | 'Gen 4' | 'Gen 5';

const typeToColor: { [key in Difficulty]: string } = {
  "Gen 1": 'bg-green-500',
  "Gen 2": 'bg-purple-500',
  "Gen 3": 'bg-red-500',
  "Gen 4": 'bg-blue-500',
  "Gen 5": 'bg-orange-500',
};

interface ChooseDifficultyProps {
  username: string;
  starterData: any[]; // Replace 'any' with the appropriate type
}

export default function ChooseDifficulty({ username, starterData }: ChooseDifficultyProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [inclusive, setInclusive] = useState<boolean>(false);
  const router = useRouter();

  const playGame = () => {
    if (selectedDifficulty) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      router.push(`/user/${username}/${randomNumber}`);
    }
  };

  const handleSelectDifficulty = (gen: Difficulty) => {
    setSelectedDifficulty(gen);
    // If we are selecting a new difficulty, reset the inclusive setting
    setInclusive(false);
  };

  const toggleInclusive = () => {
    setInclusive(!inclusive);
  };

  const isGenSelected = (gen: Difficulty): boolean => {
    if (!selectedDifficulty) return false;
    const selectedGenIndex = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'].indexOf(selectedDifficulty);
    const genIndex = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'].indexOf(gen);
    return inclusive ? genIndex <= selectedGenIndex : genIndex === selectedGenIndex;
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-8">
      <div className="grid grid-cols-5 gap-6">
        {(['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'] as Difficulty[]).map((gen) => (
          <button
            key={gen}
            className={`w-24 h-24 ${typeToColor[gen]} rounded-full cursor-pointer flex items-center justify-center transform transition duration-300 ease-out shadow-lg ${isGenSelected(gen) ? 'ring-4 ring-blue-300' : 'opacity-50'}`}
            onClick={() => handleSelectDifficulty(gen)}
          >
            <span className="text-white text-lg font-bold">{gen}</span>
          </button>
        ))}
      </div>
      {selectedDifficulty && (
        <div className="flex items-center space-x-2 mt-4">
          <label htmlFor="inclusive-toggle" className="text-white cursor-pointer">
            Include all generations up to {selectedDifficulty}
          </label>
          <div className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${inclusive ? 'bg-blue-500' : ''}`} onClick={toggleInclusive}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ease-in-out ${inclusive ? 'translate-x-6' : ''}`}></div>
          </div>
        </div>
      )}
      <button
        disabled={!selectedDifficulty}
        className={`mt-10 text-xl px-6 py-3 rounded-full transition duration-300 ease-in-out transform ${selectedDifficulty ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'} shadow-md hover:shadow-lg`}
        onClick={playGame}
      >
        {selectedDifficulty ? 'Play Game' : 'Select Difficulty'}
      </button>
    </div>
  );
};
