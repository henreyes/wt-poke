
import { prisma } from "@/lib/prisma";


import Link from "next/link";

export const typeToColor: { [key: string]: string } = {
  // to do: custom colors 
  grass: 'bg-green-500 hover:bg-green-700',
  poison: 'bg-purple-500 hover:bg-purple-700',
  fire: 'bg-red-500 hover:bg-red-700',
  water: 'bg-blue-500 hover:bg-blue-700',
  electric: 'bg-yellow-500',
  dark: 'bg-bermuda',
  ground: 'bg-brown-900',


};

export const getBgClassForType = (typeName: string) => {
  return typeToColor[typeName.toLowerCase()] || 'bg-gray-200'
};


export default async function Page({ params }: { params: { username: string} }) {
  const userWithPokemons = await prisma.user.findUnique({
    where: {username: params.username },
    include: {
      pokemons: {
        include: {pokemon: true },
            },
      },
    });

    if(!userWithPokemons) return null;
    const allUserPokemons = userWithPokemons.pokemons.map(up => up.pokemon);

    async function fetchPokemonTypes() {
      const pokemonsWithTypes = await Promise.all(allUserPokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return { ...pokemon, types: data.types.map((typeEntry: { type: { name: any; }; }) => typeEntry.type.name) } }))
      return pokemonsWithTypes;
    };

      const res= await fetchPokemonTypes();
      console.log(res);
      return (
        <>
          <div className='min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800 '>
            <h1 className="text-white self-start ml-28 text-3xl py-24">{params.username}, here are the Pokémon you found</h1>
            <div className="flex flex-row flex-wrap w-full items-center justify-center gap-4">
            {res.map((pokemon, index) => (
            <div key={index} className="transform transition duration-500 hover:scale-105 hover:shadow-2xl bg-slate-700 bg-opacity-90 rounded-xl overflow-hidden w-60 flex">
              <img src={pokemon.frontDefault} alt={pokemon.name} className="w-24 h-24 object-contain"/>
              <div className="p-2 flex flex-col justify-center items-center">
                <h2 className="text-xl  text-slate-200 capitalize font-light mb-2">{pokemon.name}</h2>
                <div className="flex flex-row flex-nowrap overflow-hidden">
                  {pokemon.types.map((typeName: string) => (
                    <div key={typeName} className={`${getBgClassForType(typeName)} capitalize px-2 py-1 rounded-2xl text-sm my-1 mr-1`}>
                      {typeName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
              ))}
            </div>

          <div className="flex flex-row min-w-2/5 justify-between items-center p-24">
            <div>
              <Link href={"/"} className="p-4 w-1/2 bg-gradient-to-b from-indigo-300 to-indigo-400 rounded-2xl text-center">Play again</Link>
            </div>
            <div>
              <Link href={"/"} className="p-4 w-1/2 bg-gradient-to-b from-indigo-700 to-indigo-800 rounded-2xl text-center">View Leaderboard</Link>
            </div>
          </div>
        </div>
      </>
    )
      

  }