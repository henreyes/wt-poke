"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AllPokemon } from '@prisma/client'
import Link from 'next/link'
import { getPokemon, updatePokeFound } from './_actions'
import CountdownBar from './Countdown'
import CircularCountdown from './Countdown'

export default function pokeid({ params }: { params: { username: string, id: number } }) {
    const [startGame, setGame] = useState<Boolean>(false);
    const [pokemon, setPokemon] = useState<AllPokemon | null >(null);
    const [guess, setGuess] = useState<String>("");
    // todo, local storage 
    //const [attempts, setAttemps] = useState<number>(3);
    const [attempts, setAttemps] = useState<number>(3);
      
    const [gameOver, setGameOVer] = useState<Boolean>(false);
    const [result, setResult] = useState<Boolean | null>(null)
    
    useEffect(() => {
        const savedState = localStorage.getItem('attempts');
        if(!savedState){
            localStorage.setItem('attempts', attempts.toString());
        }
        setAttemps(  Number(savedState) );

    },[]);
        
    
        
    const router = useRouter();

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      const randomNumber = getRandomNumber(1, 100);

    function resetStats () {
        console.log("rest stats")
        setResult(null);
        router.push(`/user/test/${ getRandomNumber(1, 100)}`)

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
        //setScore(score => [...score, pokemon.id]);
        updatePokeFound("test", pokemon.id);
        setResult(true);
      
    } else {
        console.log("Incorrect Guess.");
        setResult(false)
        setAttemps((attempt) => {
            const newat = attempt - 1;
            localStorage.setItem('attempts', newat.toString());
            return newat
        });
        
        if(attempts === 1){
            setGameOVer(true);
            console.log("game over")
        }
       
    }
    
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setGuess(event.target.value);
    setResult(null);
  }
return (
  <>
          <div className='min-h-screen flex flex-col items-center bg-slate-800'>
            <div className='w-3/4 py-2 mt-2 mb-10 bg-indigo-700 rounded-2xl flex flex-row items-center justify-center shadow-lg'>
                <Link href={'/'} className='mx-10 text-white font-bold hover:text-indigo-300'>Home</Link>
                <Link href={'/'} className='mx-10 text-white font-bold hover:text-indigo-300'>Leaderboard</Link>
            </div>

            <div className="w-full max-w-2xl min-w-min p-8 mx-auto mt-10 bg-slate-700 rounded-lg shadow-md space-y-5">
                <div className="w-full h-4 rounded overflow-hidden">
                    <CircularCountdown onEnd={() => {
                        console.log("Time's up!");
                        setGameOVer(true);
                    }} />
                </div>
                <div className="font-bold text-indigo-200">attempts left: {attempts.toString()}</div>
                {gameOver && <div className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg">game over!</div>}
            </div>

                <div className="w-full max-w-2xl min-w-min p-8 mx-auto mt-10 bg-slate-700 rounded-lg shadow-md">
                    <div className="flex justify-center mb-5">
                        {pokemon && <img src={pokemon?.frontDefault}></img>}
                    </div>

                    <form className="flex flex-col" onSubmit={checkUserGuess}>
                        <div className="mt-6">
                            <label htmlFor="pokemon-guess" className="block text-gray-400 text-sm font-medium mb-2">
                                Guess the Pokémon:
                            </label>
                            <input 
                                type="text" 
                                id="pokemon-guess" 
                                placeholder="Enter Pokémon name" 
                                className="w-full px-3 py-2 text-gray-200 bg-slate-600 border rounded-md focus:outline-none focus:border-indigo-500"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mt-4">
                            <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-800"
                                    type='submit'>
                                Guess
                            </button>
                        </div>
                    </form>

                    {result && (
                    <div className="p-2 mt-3 rounded-2xl border-2 border-green-500 text-green-400 w-full text-center font-bold shadow-xl transform transition-all duration-300 hover:scale-105">
                        Correct!
                    </div>
                    )}
                    {result === false && (
                    <div className="p-2 mt-3 rounded-2xl border-2 border-rose-500 text-rose-400 w-full text-center font-bold shadow-xl transform transition-all duration-300 hover:scale-105">
                        Not quite!
                    </div>
                    )}
                </div>

                <div className='flex flex-row mt-6 gap-4'>
                    <button className="p-3 bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:outline-none focus:bg-indigo-900" onClick={rerouteClient}>Reroute</button>
                    <button className="p-3 bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:bg-yellow-800" onClick={resetStats}>Next poke</button>
                </div>
            </div>
        </>
)
}
  



