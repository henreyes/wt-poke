// components/ChooseDifficulty.tsx
// router.push(`/user/${username}/${randomNumber}`);
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
  starterData: any[]; 
}

export default function ChooseDifficulty({ username, starterData }: ChooseDifficultyProps) {
  const [hoveredDifficulty, setHoveredDifficulty] = useState<Difficulty | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [displayGenInfo, setDisplayGenInfo] = useState<boolean>(false)
  const [inclusive, setInclusive] = useState<boolean>(false);
  const router = useRouter();

  const handleSelectDifficulty = (gen: Difficulty) => {
    setSelectedDifficulty(gen);
    setInclusive(false); 
  };

  const toggleInclusive = () => {
    setInclusive(prev => !prev);
  };
  const isGenSelected = (gen: Difficulty): boolean => {
    if (!selectedDifficulty) return false;
    const selectedGenIndex = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'].indexOf(selectedDifficulty);
    const genIndex = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'].indexOf(gen);
    return inclusive ? genIndex <= selectedGenIndex : genIndex === selectedGenIndex;
  };


  const playGame = () => {
    if (selectedDifficulty) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      router.push(`/user/${username}/${randomNumber}`);
    }
  };

  return (
    
    <div className="flex flex-col items-center space-y-4 my-8">
      <div className="grid grid-cols-5 gap-4">
        {(['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'] as Difficulty[]).map((gen, index) => (
          <div key={gen} className="group relative">
            <button
            className={`w-24 h-24 ${typeToColor[gen]} rounded-full cursor-pointer flex items-center justify-center transform transition duration-300 ease-out shadow-lg ${isGenSelected(gen) ? 'ring-4 ring-blue-300' : 'opacity-50'}`}              onClick={() => handleSelectDifficulty(gen)}
              onMouseEnter={() => setHoveredDifficulty(gen)}
              onMouseLeave={() => setHoveredDifficulty(null)}
            >
              <span className="text-white text-lg font-bold">{gen}</span>
            </button>
            {hoveredDifficulty === gen && (
              <div className="absolute inset-x-0 top-full mt-2 p-4  z-10 flex flex-row bg-white  w-96  shadow-lg text-gray-800 rounded-3xl">
                {starterData.slice(3 * index, 3 * (index + 1)).map((pokemon, idx) => (
                  <div key={idx} className="my-2 p-2 flex justify-evenly items-center  bg-gray-200 rounded-2xl mx-3 ">
                    <img src={pokemon.officialArtwork} alt={pokemon.name} className="h-16 w-16 mx-5 object-contain"/>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      

      {selectedDifficulty && (
        <div className="flex items-center space-x-2">
          <label htmlFor="inclusive-toggle" className="text-white cursor-pointer">
            Include all generations up to {selectedDifficulty}
          </label>
          <div className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${inclusive ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-200`}
               onClick={toggleInclusive}>
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${inclusive ? 'translate-x-6' : ''}`}></div>
          </div>
        </div>
      )}

      <div className="p-20 "></div>
      <button
        disabled={!selectedDifficulty}
        className={`text-xl px-6 py-3 rounded-full transition duration-300 ease-in-out ${selectedDifficulty ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-indigo-300 text-gray-500 cursor-not-allowed'}`}
        onClick={playGame}
      >
        {selectedDifficulty ? 'Play Game' : 'Select Difficulty'}
      </button>
    </div>
  );
};




