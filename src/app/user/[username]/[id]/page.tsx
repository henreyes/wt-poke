"use client"
import React, { useEffect, useState } from 'react'
import { AllPokemon } from '@prisma/client'
import Link from 'next/link'

export default function pokeid() {
    const [pokemon, setPokemon] = useState<AllPokemon>()
    useEffect(()=>{
        console.log("hello in effect")
        fetch('/api/getPokemon', {
            method: "POST",
            body:JSON.stringify({
                id: 1
            }),
        })
      .then((res) => res.json())
      .then((data) => {

        console.log(data)
        setPokemon(data)
      })

    },[])


  return (
    <>
     <div className='flex min-h-screen flex-col items-center  bg-gray-900 '>
      <div className='w-3/4 py-2 mt-2 mb-10 bg-slate-800 rounded-2xl flex flex-row items-center justify-center'>
          <Link href={'/'} className='px-5 mr-10 font-bold'>Home</Link>
          <Link href={'/'} className='px-5 mr-10 font-bold'>Leaderboard</Link>
      </div>
      <div className='flex justify-evenly min-w-full py-7'>
        <div>Pokemon found</div>
        <div>Username</div>
        <div>Timer</div>
        <div>Attempts</div>
      </div>
      <div className="w-full max-w-2xl min-w-min p-8 mx-auto mt-10 bg-white rounded shadow-lg">
      <div className="flex justify-center">
      {pokemon && <img src={pokemon?.frontDefault}></img>}
      </div>

      <div className="mt-6">
        <label htmlFor="pokemon-guess" className="block text-gray-700 text-sm font-bold mb-2">
          Guess the Pokémon:
        </label>
        <input 
          type="text" 
          id="pokemon-guess" 
          placeholder="Enter Pokémon name" 
          className="w-1/2 px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-4">
        <button className="w-1/2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700">
          Guess
        </button>
      </div>
    </div>

    </div>

   
    </>
  )
}
