
"use client";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import Logout from "../logout";
import Image from 'next/image'
import GameCard from "../gameCard/gc";
import Card from "../card/card";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "../modal/modal";


export default  function Dashboard () {
    const session =  useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleOptionSelected = (option: string) => {
      setSelectedOption(option);
      setIsModalOpen(false); // Close the modal
    };
  
   
   
    return (
        <>
            <div className=" flex flex-row justify-between text-black bg-red-100 p-2   ">
                <p className="text-md font-bold px-2 ">Hello, { session.data?.user.username}</p>
                <p className="text-md font-light px-2 "> pokemon found: { session.data?.user.pokeFound} </p>
                <Logout />
            </div>

            <div>
            <button onClick={handleOpenModal} className="bg-gradient-to-r from-blue-400 to-blue-900 text-white active:from-purple-600 active:via-pink-700 active:to-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            Choose Gen
      </button>

      <p>Selected Option: {selectedOption}</p>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOptionSelected={handleOptionSelected}
        options={['Gen I', 'Gen II ', 'Gen III', 'Gen IV', 'Gen V']}
        title="Choose Gen"
      />
    </div>
           
            <div className=" flex flex-col h-screen items-center justify-center px-20 py-10 bg-slate-600 ">

                <div className="flex flex-col items-center bg-slate-800 rounded-xl w-full h-full">
                    
             
                    <Card imgSrc="/bulb.jpeg" />
                    
                </div>

            </div>
            

   
 
        
</>
)
}

