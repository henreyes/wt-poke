"use client";


import React, { FormEvent, useState } from 'react'
import Image from 'next/image'




function GameCard() {
    const [res, setRes] = useState("");


    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        

      };


  return (
    <div className=" flex flex-col items-center justify-center bg-slate-900 w-full h- h-full ">
    <div className=" bg-gray-300 rounded-md overflow-hidden shadow-lg">
        <div className=" flex flex-col items-center justify-center px-6 py-4">
            <div>
                <Image
                    src="/bulb.jpeg"
                    width={200}
                    height={200}
                    alt ="pic of pokemon"
                    
                />
                <div className="gap-4"></div>
            </div>

            <div className="flex flex-row p-10 ">
                <input className="font-light text-md mb-2 rounded-xl text-black border border-blue-400" />
                <div className="px-5"></div>
                <button className="font-bold text-md border rounded-xl p-2 border-blue-400 text-blue-700  hover:bg-gray-100 "> submit </button>
            </div>


        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">type</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">fire</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">fairy</span>
        </div>
    </div>
</div>
  )
}

export default GameCard