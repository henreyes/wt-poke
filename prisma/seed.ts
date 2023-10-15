import { PokemonClient } from "pokenode-ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type pokeDb =  {
    id: number;
    name: string;
    frontDefault: string;
    officialArtwork: string;
    url: string;
};

async function main ()  {
    const pokeApi = new PokemonClient();
    
    const all = await pokeApi.listPokemons(0, 820);

  
    const formattedPokemon: pokeDb[] = all.results.map((p, index) => ({
      id: index + 1,
      name: p.name,
      frontDefault: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`,
      officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
      url:  p.url
    }));
    
    const creation = await prisma.allPokemon.createMany({
        data: formattedPokemon,
      });

    console.log(creation)
};
  
main();