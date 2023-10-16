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
            <div className="min-h-screen bg-gray-500 py-6 flex flex-col justify-center sm:py-12">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                    <div className="text-center">
                      <h2 className="text-3xl font-semibold text-gray-800">{session?.user.username}'s' stats</h2>
                      <p className="mt-2 text-sm text-gray-500">Tailwind CSS example with React TypeScript</p>
                    </div>
                    <div className="mt-8">
                      <p className="text-base text-gray-700">Pokemon found: {user?.pokemons.length}</p>
                      {userPokemons.map((pokemon) => (
                            <div key={pokemon.id} className="card">
                                <h1 className="text-green-600">{pokemon.name}</h1>
                                <img src={pokemon?.frontDefault} alt=""></img>
                              
                            </div>
                        ))}
                    </div>
                      <div>
                    <div>
   
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          );


}}
