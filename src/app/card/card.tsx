"use client";
import React, { useState, FormEvent } from "react";

interface CardProps {
  imgSrc: string; // The URL for the image to display
  // any other props that are necessary
}

const Card: React.FC<CardProps> = ({ imgSrc }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would handle the guess, perhaps sending it to an API or processing it in some other way
    console.log("User Guess: ", guess);
    // Clear the input field after submit
    setGuess("");
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg max-w-xs mx-auto bg-white">
      {/* Image Container */}
      <div className="flex justify-center items-center bg-gray-200 h-48">
        {/* Image */}
        <img className="max-h-full max-w-full object-contain" src={imgSrc} alt="Display" />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-between p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              placeholder="Your guess here..."
              aria-label="Guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center px-4 py-2 ml-2 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
            >
              Guess
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Card;