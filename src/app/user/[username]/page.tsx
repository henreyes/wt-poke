
import Link from "next/link";
import Logout from "../../logout";
import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { revalidatePath } from "next/cache";
import ChooseDifficulty from "../ChooseDificulty";
import { useState } from "react";

const typeToColor: { [key: string]: string } = {
    grass: 'bg-green-500',
    poison: 'bg-purple-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    flying: "bg-sky-300"
  };
  


export default async function UserPage({ params }: { params: { username: string } }) {
    const starters = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501];
    const pokemons = await prisma.allPokemon.findMany({
        where: {
          id: {
            in: starters,
          },
        },
      });

      async function fetchPokemonTypes() {
        const pokemonsWithTypes = await Promise.all(pokemons.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return { ...pokemon, types: data.types.map((typeEntry: { type: { name: any; }; }) => typeEntry.type.name) } }))
        return pokemonsWithTypes;
      };

    const allData = await fetchPokemonTypes();
    console.log(allData)
    const getBgClassForType = (typeName: string) => {
        return typeToColor[typeName.toLowerCase()] || 'bg-gray-200'
      };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800 justify-center">
            {allData.map((pokemon, index) => (
                <div key={index} className="transform transition duration-500 hover:scale-105 hover:shadow-2xl bg-slate-700 bg-opacity-90 rounded-xl overflow-hidden w-60">
                  <div className={` ${getBgClassForType(pokemon.types[0])} bg-opacity-20 p-4 flex justify-center items-center`}>
                    
                    <img src={pokemon.frontDefault} alt={pokemon.name} className="h-32 w-32 object-contain"/>
                  </div>
                  <div className="p-2 flex justify-evenly overflow-hidden">
                    <h2 className=" text-xl text-slate-200 capitalize">{pokemon.name}</h2>
                    <div className="flex justify-evenly px-2 ">
                      {pokemon.types.map((typeName: string) => (
                        <div key={typeName} className={`${getBgClassForType(typeName)} capitalize px-3 mr-2 py-1 rounded-2xl  text-sm  my-1`}>
                       
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
      <h1 className="font-bold text-4xl mb-20">Game configuration</h1>

      <ChooseDifficulty username={params.username} />
    </div>
  );
}