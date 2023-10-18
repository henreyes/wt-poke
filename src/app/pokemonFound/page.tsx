import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { AllPokemon, PrismaClient } from '@prisma/client'


type UserPokemon = {
    userId: number;
    pokemonId: number;
  };

export default async function page() {
    const prisma = new PrismaClient()
    const session = await getServerSession(authConfig);
    const user = await prisma.user.findUnique({
        where: {
          id: session?.user.id,
        },
        include: {
          pokemons: true // Include the related 'pokemons' records
        }
      })
      if(!user){
        return null
      }

      const poke1 = await prisma.allPokemon.findUnique({
        where: {
            id: user?.pokemons[0].pokemonId,
        }
    })
    const userPokemons: AllPokemon[] = [];

    for (const userPokemon of user.pokemons) {
        // Retrieve the detailed info of each Pokémon using its 'pokemonId'
        const pokemon = await prisma.allPokemon.findUnique({
          where: { id: userPokemon.pokemonId },
        });
    
        if (pokemon) {
          userPokemons.push(pokemon);
        } else {
          console.log(`No details found for Pokémon with ID: ${userPokemon.pokemonId}`);
        }
      }

    if(session){
    
        return (

            <>
  <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-0">
        <div>
          <button
         
            className="text-white text-lg font-semibold focus:outline-none"
          >
            Who's that Pokémon
          </button>
        </div>
        <div className="text-center font-bold text-lg">{user.username}</div>
        <div>
          <button
           
            className="text-white text-lg font-semibold bg-red-500 hover:bg-red-700 transition duration-200 ease-in-out rounded focus:outline-none"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
           
    <div className="mt-12 w-full px-4">
        <h2 className="text-3xl font-extrabold text-yellow-500 mb-6">Pokémon Found:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userPokemons.map((pokemon) => (
            <div key={pokemon.id} className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <h1 className="text-lg font-bold text-gray-900">{pokemon.name}</h1>
                <img src={pokemon?.frontDefault} alt="" className="mt-2 w-32 h-32 object-contain"/>
            </div>
            ))}
         </div>
        </div>
            </>
          );


}}
