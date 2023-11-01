import Link from "next/link";
import Logout from "../../logout";
import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { revalidatePath } from "next/cache";
import ChooseDifficulty from "../ChooseDificulty";

let pokemon: AllPokemon = {
    id: 0,
    name: "template name",
    frontDefault: "",
    officialArtwork: "",
    url: "",
};


export default async function UserPage({ params }: { params: { username: string } }) {

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      const randomNumber = getRandomNumber(1, 100);



    return (
        <>
        <div className="flex flex-col items-center justify-center p-20">
        <div> hello {params.username} </div>
         <ChooseDifficulty/>
         <Link href={`/user/${params.username}/${randomNumber}`}  className="inline-block bg-blue-500 text-white text-xl px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">Play Game</Link>
        </div>
       
        </>
     
        
)
}