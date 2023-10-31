import { getServerSession } from "next-auth"
import { authConfig } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { FormEvent } from "react";
import PokeForm from "./form";
import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  // this function could potentially fetch a new Pokemon if correctGuess is true
  const { correctGuess } = context.query; // getting the query param from the URL

  let pokemon;
  
  if (correctGuess) {
    // if correctGuess is true, fetch a new Pokemon
    const newPokemonId = Math.floor(Math.random() * 101); // or however you determine the new ID
    pokemon = await prisma.allPokemon.findUnique({
      where: { id: newPokemonId },
    });
  } else {
    // if correctGuess is not true, fetch a default or specific Pokemon
    const defaultPokemonId = 1; // for example
    pokemon = await prisma.allPokemon.findUnique({
      where: { id: defaultPokemonId },
    });
  }

  // handle the case if no pokemon is found
  if (!pokemon) {
    // Return a 404 status and page if desired, or handle the missing data in another appropriate way
    return {
      notFound: true, // This will render the Next.js 404 page
    };
  }

  // return your data as props
  return {
    props: {
      pokemon, // this will be the prop your component receives
    }, 
  };
};

export default async function PokeCard() {
  const session = await getServerSession(authConfig);


  function getRandomNumber(): number {
    return Math.floor(Math.random() * 101);
}
  let pokemon = await prisma.allPokemon.findUnique({
    where: { id: getRandomNumber() },
  });

  if(!pokemon){
    return null;
  }

  return (
    
    <PokeForm pokemon={pokemon}/>
  
  )
};



