"use client"
import Link from "next/link";
import Logout from "../../logout";
import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { revalidatePath } from "next/cache";
import ChooseDifficulty from "../ChooseDificulty";
import router from "next/router";
import { useState } from "react";

let pokemon: AllPokemon = {
    id: 0,
    name: "template name",
    frontDefault: "",
    officialArtwork: "",
    url: "",
};
type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' | null;

export default  function UserPage({ params }: { params: { username: string } }) {
    const [difficulty, setDifficulty] = useState<Difficulty>(null);

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      const randomNumber = getRandomNumber(1, 100);

    return (
        <>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800 justify-center">
        <h1 className="font-bold text-4xl mb-20">Game configuration</h1>
        <ChooseDifficulty onSelectDifficulty={setDifficulty} />
        <button
          disabled={!difficulty}
          className={`inline-block text-xl px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${difficulty ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'}`}
          onClick={() => router.push(`/user/${params.username}/${randomNumber}`)}
        >
          {difficulty ? 'Play Game' : 'Select Difficulty'}
        </button>
      </div>
       
        </>
    )
    }
    
