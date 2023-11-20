import { prisma } from "@/lib/prisma";
import ChooseDifficulty from "../ChooseDificulty";

export default async function UserPage({ params }: { params: { username: string } }) {
    const starters = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501];
    const pokemons = await prisma.allPokemon.findMany({ where: { id: { in: starters,}, }, });
    async function fetchPokemonTypes() {
      const pokemonsWithTypes = await Promise.all(pokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return { ...pokemon, types: data.types.map((typeEntry: { type: { name: any; }; }) => typeEntry.type.name) } }))
      return pokemonsWithTypes;
      };

    const starterData = await fetchPokemonTypes();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800 justify-center">

      <h1 className="font-bold text-5xl mb-10 text-gray-100">Game configuration</h1>
      <h3 className="text-gray-400 mb-4">Choose the generation of pokemon you wish to guess</h3>
      <ChooseDifficulty username={params.username} starterData={starterData} />
    </div>
  );
}