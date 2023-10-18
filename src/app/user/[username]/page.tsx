import Link from "next/link";
import Logout from "../../logout";
import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { revalidatePath } from "next/cache";


export default async function UserPage({ params }: { params: { username: string } }) {

    let pokemon: AllPokemon = {
        id: 0,
        name: "template name",
        frontDefault: "",
        officialArtwork: "",
        url: "",
    };

    


    async function handleClick(formdata : FormData){
        "use server";
        let fetchedPokemon = await prisma.allPokemon.findUnique({
            where: { id: 2 },
          });
        pokemon = fetchedPokemon as AllPokemon
        revalidatePath(`user/${params.username}`);
    }
    


    return (
        <>
         <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-600">
        <div className="flex flex-row w-1/2 justify-between">
            <div>My username: {params.username}</div>
            <Link href="/">Dashboard</Link>
            <Link href={`/user/${params.username}/game/${1}`} >Play game</Link>
        </div>
        <div className="min-h-96 bg-gray-100 flex items-center py-20 px-40 justify-center rounded-2xl">
      <div className="max-w-md w-full space-y-8 transform transition duration-500 ease-in-out hover:scale-105">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{params.username}, let's play!</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your difficulty:
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <select

            className="w-full border-yellow-500 text-gray-700 rounded-md px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline border-2 focus:border-yellow-500 text-sm"
          >
            <option value="Gen 1">Gen 1</option>
            <option value="Gen 2">Gen 2</option>
            <option value="Gen 3">Gen 3</option>
            <option value="Gen 4">Gen 4</option>
            <option value="all">All Generations</option>
          </select>
          <div className="flex justify-center items-center mt-6">
    <Link href={`/user/${params.username}/game/${1}`}  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        play game
    </Link>
  </div>
        </form>
      </div>
    </div>

    </div>
       
</>
        
)
}