// components/ChooseDifficulty.tsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3';

const typeToColor: { [key in Difficulty]: string } = {
  "Gen 1": 'bg-green-500',
  "Gen 2": 'bg-purple-500',
  "Gen 3": 'bg-red-500',
};

interface ChooseDifficultyProps {
  username: string;
}

const ChooseDifficulty: React.FC<ChooseDifficultyProps> = ({ username }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const router = useRouter();

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const playGame = () => {
    if (selectedDifficulty) {
      const randomNumber = getRandomNumber(1, 100);
      router.push(`/user/${username}/${randomNumber}`);
    }
  };

  return (
    <>
      <div className="flex space-x-4 mb-10">
        {(['Gen 1', 'Gen 2', 'Gen 3'] as Difficulty[]).map((gen) => (
          <button
            key={gen}
            className={`w-24 h-24 ${typeToColor[gen]} rounded-full cursor-pointer flex items-center justify-center ${selectedDifficulty === gen ? 'scale-125' : ''}`}
            onClick={() => setSelectedDifficulty(gen)}
          >
            <span className="text-white text-lg font-bold">{gen}</span>
          </button>
        ))}
      </div>
      <button
        disabled={!selectedDifficulty}
        className={`text-xl px-6 py-3 rounded-full transition duration-300 ease-in-out transform ${selectedDifficulty ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'}`}
        onClick={playGame}
      >
        {selectedDifficulty ? 'Play Game' : 'Select Difficulty'}
      </button>
    </>
  );
};

export default ChooseDifficulty;
