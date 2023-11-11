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

    function getGeneration(index: number){
        if (index >= 0 && index < 152) {
          return "one";
      } else if (index >= 152 && index < 252) {
          return "two";
      } else if (index >= 252 && index < 387) {
          return "three";
      } else if (index >= 387 && index < 495) {
          return "four";
      } else if (index >= 495 && index < 649) {
          return "five";
      } else if (index >= 649 && index < 722) {
          return "six";
      } else {
          return "seven"; 
    }
      
    }

  
    const formattedPokemon: pokeDb[] = all.results.map((p, index) => ({
      id: index + 1,
      name: p.name,
      frontDefault: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`,
      officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
      url:  p.url,
      generation: getGeneration(index + 1),
    }));
    
    const creation = await prisma.allPokemon.createMany({
        data: formattedPokemon,
      });

    console.log(creation)
};
  
main();