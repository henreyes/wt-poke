"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";


export async function getStats(username: string){
    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    })
    return user;
}

export async function updatePokeFound(username: string, pokeId: number){
    const updatedUser = await prisma.user.update({
        where: {
            username: username,
        },
        data: {
            pokeFound: {
                increment: 1
            }
        }
    });
    const newUserPokemon = await prisma.userPokemon.create({
        data: {
          username: username,
          pokemonId: pokeId,
        },
      });


    revalidatePath("/");
    return updatedUser;
}

export async function getPokemon(pokeId: number) {
    const pokemon = await prisma.allPokemon.findFirst({
        where: {
            id: pokeId

        }
    })

    return pokemon;

}



  