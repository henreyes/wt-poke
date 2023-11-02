"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AllPokemon } from '@prisma/client'
import Link from 'next/link'
import { getPokemon, updatePokeFound } from './_actions'

export default function pokeid({ params }: { params: { username: string, id: number } }) {
    const [startGame, setGame] = useState<Boolean>(false);
    const [pokemon, setPokemon] = useState<AllPokemon | null >(null);
    const [guess, setGuess] = useState<String>("");
    const [score, setScore] = useState<Number[]>([]);
    const [correct, setCorrect] = useState<Boolean>(false);
    const router = useRouter();

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      const randomNumber = getRandomNumber(1, 100);

    function resetStats () {
        console.log("rest stats")
        router.push('/user/test/5')

    }

    if(startGame === false){
        fetch('/api/getPokemon', {
            method: "POST",
            body:JSON.stringify({
                id: Number(params.id)
            }),
        })
      .then((res) => res.json())
      .then((data) => {

        setPokemon(data)
      })
      setGame(true);

    }


  function rerouteClient()  {
    console.log("button works");
    
  }

  function checkUserGuess(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (pokemon && guess.toLowerCase() === pokemon.name.toLowerCase()) {
        console.log("Correct Guess!");
        setScore(score => [...score, pokemon.id]);
        updatePokeFound("test", pokemon.id);
        setCorrect(true);
      
    } else {
        console.log("Incorrect Guess.");
    }
    
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setGuess(event.target.value);
  }



  return (
    <>
     <div className='flex min-h-screen flex-col items-center  bg-gray-500 '>
      <div className='w-3/4 py-2 mt-2 mb-10 bg-slate-400 rounded-2xl flex flex-row items-center justify-center'>
          <Link href={'/'} className='px-5 mr-10 font-bold'>Home</Link>
          <Link href={'/'} className='px-5 mr-10 font-bold'>Leaderboard</Link>
      </div>
      <div className='flex justify-evenly min-w-full py-7'>
        <div>Pokemon found: {score.length}</div>
        <div>{params.username}</div>    
        <div>Timer</div>
        <div>Attempts</div>
      </div>
      <div className="w-full max-w-2xl min-w-min p-8 mx-auto mt-10 bg-gray-400 rounded shadow-lg">
      <div className="flex justify-center">
      {pokemon && <img src={pokemon?.frontDefault}></img>}
      </div>

      <form onSubmit={checkUserGuess}>
      <div className="mt-6">
        <label htmlFor="pokemon-guess" className="block text-gray-700 text-sm font-bold mb-2">
          Guess the Pokémon:
        </label>
        <input 
        type="text" 
        id="pokemon-guess" 
        placeholder="Enter Pokémon name" 
        className="w-1/2 px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleInputChange}
/>
      </div>

      <div className="mt-4">
        <button className="w-1/2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
            type='submit'>
          Guess
        </button>
      </div>
      </form>
      {correct && <button className='bg-green-700 text-gray-800 p-5 rounded:2xl '>Correct!</button> }
    </div>
   
    <div className='flex flex-row '>
        <button className="p-3 bg-slate-500 rounded-lg mt-5 hover:bg-slate-700" onClick={rerouteClient}>Reroute</button>
        <button className="p-3 bg-amber-500 rounded-lg mt-5 hover:bg-amber-700" onClick={resetStats}>Next poke</button>
    </div>
   

  
    </div>

   
    </>
  )
}


