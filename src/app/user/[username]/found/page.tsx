
import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

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
    console.log(allUserPokemons);


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
        <div className='min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800'>
          <h1>{params.username}, here are the pokemon you found</h1>
          <div className="flex flex-row flex-wrap w-3/4 items-center justify-between">
          {res.map((pokemon, index) => (
            <div key={index} className="bg-slate-500 px-5 rounded-xl flex flex-col items-center">
              <h1>{pokemon.name}</h1>
              {pokemon.types.map((typeName: string) => ( // typeName is now a string
                <h2 key={typeName}>{typeName}</h2> // make sure to use a unique key here
              ))}
              <img src={pokemon.frontDefault} alt={pokemon.name}/>
            </div>
          ))}
          </div>
          


        </div>

      </>
    )
  }