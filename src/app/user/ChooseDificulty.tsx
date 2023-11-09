// components/ChooseDifficulty.tsx
"use client"
// components/ChooseDifficulty.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' | 'Gen 4' | 'Gen 5';

const typeToColor: { [key in Difficulty]: string } = {
  "Gen 1": 'bg-green-500 hover:bg-green-600',
  "Gen 2": 'bg-purple-500 hover:bg-purple-600',
  "Gen 3": 'bg-red-500 hover:bg-red-600',
  "Gen 4": 'bg-blue-500 hover:bg-blue-600',
  "Gen 5": 'bg-orange-500 hover:bg-orange-600',
};

interface ChooseDifficultyProps {
  username: string;
  starterData: any[]; // Replace 'any' with the appropriate type
}

const PoketypeToColor: { [key: string]: string } = {
  grass: 'bg-green-500',
  poison: 'bg-purple-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  flying: "bg-sky-300"
};

export default function ChooseDifficulty({ username, starterData }: ChooseDifficultyProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const router = useRouter();

  const playGame = () => {
    if (selectedDifficulty) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      router.push(`/user/${username}/${randomNumber}`);
    }
  };

  const getBgClassForType = (typeName: string) => {
    return PoketypeToColor[typeName.toLowerCase()] || 'bg-gray-200';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {(['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'] as Difficulty[]).map((gen,index) => (
          <div key={gen} className="group relative">
            <button
              className={`w-24 h-24 ${typeToColor[gen]} rounded-full cursor-pointer flex items-center justify-center transform transition duration-300 ease-out ${selectedDifficulty === gen ? 'scale-125' : 'scale-100'}`}
              onClick={() => setSelectedDifficulty(gen)}
            >
              <span className="text-white text-lg font-bold">{gen}</span>
            </button>
            <div className={`absolute bottom-0  translate-y-full mb-2 w-96 flex flex-row bg-white p-3 shadow-md rounded-md transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100`}>
            {starterData.slice(3 * (index),3 * (index + 1)).map((pokemon, index) => (
        <div key={index} className="transform transition duration-500 hover:scale-105 hover:shadow-2xl bg-slate-700 bg-opacity-90 rounded-xl overflow-hidden w-60">
          <div className={` ${getBgClassForType(pokemon.types[0])} bg-opacity-20  flex justify-center items-center`}>
            <img src={pokemon.frontDefault} alt={pokemon.name} className="h-32 w-32 object-contain"/>
          </div>
        </div>
      ))}
            </div>
          </div>
        ))}
      </div>
      <button
        disabled={!selectedDifficulty}
        className={`text-xl px-6 py-3 rounded-full transition duration-300 ease-in-out ${selectedDifficulty ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'}`}
        onClick={playGame}
      >
        {selectedDifficulty ? 'Play Game' : 'Select Difficulty'}
      </button>

    </div>
  );
};