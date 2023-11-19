"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AllPokemon } from '@prisma/client'
import Link from 'next/link'
import { getPokemon, updatePokeFound } from './_actions'
import CountdownBar from './Countdown'
import AttemptsIndicator from './Attempts'

export default function pokeid({ params }: { params: { username: string, id: number, gen: string, pokeFound: number} }) {
    const [startGame, setGame] = useState<Boolean>(false);
    const [pokemon, setPokemon] = useState<AllPokemon | null >(null);
    const [guess, setGuess] = useState<String>("");
    const [attempts, setAttemps] = useState<number>(3);
    const [gameOver, setGameOVer] = useState<Boolean>(false);
    const [result, setResult] = useState<Boolean | null>(null)
    const [countdownActive, setCountdown] = useState<boolean>(true);
    const router = useRouter();

    
    useEffect(() => {
        const savedState = localStorage.getItem('attempts');
        if(!savedState){
            localStorage.setItem('attempts', attempts.toString());
        }
        setAttemps(Number(savedState) );

    },[]);
        
    

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
      .then((res) => res.json()).then((data) => {

        setPokemon(data)
      })

      setGame(true);
    
    }

  function rerouteClient()  {console.log("button works");}

  function checkUserGuess(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (pokemon && guess.toLowerCase() === pokemon.name.toLowerCase()) {
        console.log("Correct Guess!");
        //setScore(score => [...score, pokemon.id]);
        updatePokeFound("Henry", pokemon.id);
        setResult(true);
        setCountdown(false);
      
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

  const renderGameOverOverlay = () => (
    <div className="absolute inset-0 bg-slate-800 bg-opacity-80 flex flex-col justify-center items-center backdrop-blur-md z-10">
      <span className="text-white font-bold text-4xl">Game Over</span>
      <div className="text-indigo-200 mt-10">
        You found <span className='font-bold'>{params.pokeFound} </span> Pokémon!
        <Link href={`/user/${params.username}/found/`} className='text-indigo-400 px-2 hover:underline'>Click here to view</Link>
      </div>
    </div>
  );

return (
  <>
          <div className='min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800'>


            <div className="w-full max-w-2xl min-w-min p-8 mx-auto mt-40 flex items-center justify-evenly bg-slate-900 rounded-xl shadow-md">
                <div>{pokemon?.name}</div>
                <div>Gen: {params.gen}</div>
                <div className="w-1/5 h-4 rounded overflow-hidden">
                    <CountdownBar active={countdownActive}  onEnd={() => {
                        console.log("Time's up!");
                        setGameOVer(true);
                    }} />
                    
                </div>
                <div className=' w-1/5 h-10 p-1 rounded-lg' >
                    <AttemptsIndicator attempts={attempts} />
                </div>
              
            </div>

            <div className=" relative w-full max-w-2xl min-w-min p-8 mx-auto mt-10 bg-slate-700 rounded-lg shadow-md">
                {gameOver && renderGameOverOverlay()}
                <div className="flex justify-center mb-5">
                    {pokemon && <img 
                                className={`w-96 transition-all duration-500 ${result ? 'brightness-100' : 'brightness-0'}`}
                                src={pokemon?.officialArtwork} alt='image'>
                                
                                </img>}
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
                        <button className="w-full px-4 py-2 text-indigo-200 text-bold bg-slate-800  rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-800"
                                type='submit'>
                            Guess
                        </button>
                    </div>
                </form>

                {result !== null && (
            <div className={`p-2 mt-3 rounded-2xl text-white w-full text-center font-bold shadow-xl transform transition-all duration-300 ${result ? 'bg-green-500 animate-pulse' : 'bg-rose-500 animate-pulse'} `}>
              {result ? 'Correct!' : 'Not quite, try again!'}
            </div>
          )}
            </div>
            <div className='flex justify-center mt-6'>
          <button 
            className="p-3 bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:bg-yellow-800 transition-all duration-300 transform hover:scale-105"
            onClick={resetStats}
            disabled={Boolean(result)}
          >
            Next poke
          </button>
        </div>
            </div>
        </>
)
}
  



