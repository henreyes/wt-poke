
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import Logout from "../logout";
import Image from 'next/image'

import PokeCard from "../pokemonCard/pokeCard";


export default async function Dashboard () {
  const session =await getServerSession(authConfig);
   
    return (
        <>
          <div className=" flex flex-col h-screen items-center justify-center px-20 py-10 bg-slate-600 ">

              <div className="flex flex-col items-center bg-slate-800 rounded-xl w-full h-full">
                <h1>{session?.user.username}</h1>
                <PokeCard/>
                  
              </div>

          </div>
          

   
 
        
</>
)
}



