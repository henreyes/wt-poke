
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import Logout from "../logout";
import Image from 'next/image'
import GameCard from "../gameCard/gc";


export default async function Dashboard () {
    const session = await getServerSession(authConfig);
   
    return (
        <>
            <div className=" flex flex-row justify-between text-black bg-red-100 p-2   ">
                <p className="text-md font-bold px-2 ">Hello, {session?.user.username}</p>
                <p className="text-md font-light px-2 "> pokemon found: {session?.user.currentScore} </p>
                <Logout />
            </div>
            
            <div className=" flex flex-col h-screen items-center justify-center px-20 py-10 bg-slate-600 ">
                <div className="flex flex-col items-center bg-slate-800 rounded-xl w-full h-full">
                    <div className="">
                        <details className="dropdown text-white">
                            <summary className="p-1 btn flex-col font-bold">Dificulty</summary>
                            <ul className="p-3 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 rounded-lg text-white font-light text-sm bg-white bg-opacity-50 ">
                                <li className="rounded-md text-center transition ease-in-out delay-10 bg-blue-300 hover:-translate-y-1 hover:scale-110"><a>Gen 1 </a></li>
                                <li className="rounded-md text-center transition ease-in-out delay-10 bg-blue-500 hover:-translate-y-1 hover:scale-110"><a>Gen 2</a></li>
                                <li className="rounded-md text-center transition ease-in-out delay-10 bg-blue-700 hover:-translate-y-1 hover:scale-110"><a>Gen 3</a></li>
                                <li className="rounded-md text-center transition ease-in-out delay-10 bg-blue-800 hover:-translate-y-1 hover:scale-110"><a>Gen 4</a></li>
                                <li className="rounded-md text-center transition ease-in-out delay-10 bg-blue-950 hover:-translate-y-1 hover:scale-110"><a>Gen 5</a></li>
                            </ul>
                        </details>
                    </div>        
                        
                    <GameCard/>
                    
                </div>

            </div>
            

   
 
        
</>
)
}