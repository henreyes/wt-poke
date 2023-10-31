"use client"
import React from 'react'

export default function game() {
  return (
    <div className='flex min-h-screen flex-col items-center  bg-gray-950 '>
      <div>
        
      </div>
      <div className='flex justify-evenly min-w-full py-7'>
        <div>Pokemon found</div>
        <div>Username</div>
        <div>Timer</div>
        <div>Attempts</div>
      </div>
      <div className="w-full max-w-2xl min-w-min p-8 mx-auto mt-10 bg-white rounded shadow-lg">
      <div className="flex justify-center">
        <img src="/path-to-pokemon-image.jpg" alt="Pokémon" className="w-300 h-300" />
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
  )
}
