import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import router from "next/navigation";


export default async function UserPage({ params }: { params: { username: string, id: number } }) {
    let fetchedPokemon = await prisma.allPokemon.findUnique({
        where: { id: Number(params.id)},
      });

    const user = await prisma.user.findUnique({
        where: { username: params.username },
        include: { pokemons: true }
    })

    if(!user){
        return null
      }

    const userFound = await prisma.allPokemon.findUnique({
        where: { id: user?.pokemons[0].pokemonId }
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

    
    async function submit(formData: FormData) {
        "use server";
        let fetchedPokemon = await prisma.allPokemon.findUnique({
            where: { id: Number(params.id)},
          });

        if(formData.get("guess") === fetchedPokemon?.name){
            // update user table, to include the id
            const pokemon = await prisma.userPokemon.create({
                data: {
                  userId: 1,
                  pokemonId: fetchedPokemon.id,
                },
              });
            redirect(`/user/${params.username}/game/${Number(params.id )+ 1}`)
        }
        else {
            redirect(`/user/${params.username}/game/${params.id}`)
        }
       
    }

return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">

    <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-xl text-center">
        <img src={fetchedPokemon?.officialArtwork} alt="poke image" className="w-64 h-64 object-contain rounded-full border-4 p-5 shadow brightness-0  border-yellow-500" />
        <h2 className="text-2xl font-extrabold text-gray-900 mt-4">{`Hello, ${params.username}`}</h2>
        <p className="text-gray-700">{`Guess Pokémon #${params.id}`}</p>
    </div>

    <form action={submit} className="mt-8 w-full">
        <div className="flex items-center justify-center">
            <input
            id="simple-input"
            name="guess"
            type="text"
            required
            className="w-full max-w-md px-4 py-2 placeholder-gray-500 text-gray-900 bg-white border-2 border-transparent focus:outline-none focus:border-yellow-500 rounded-lg transition duration-300"
            placeholder="Guess the Pokémon"
            />
            <button type="submit" className="ml-4 px-4 py-2 text-white bg-yellow-500 rounded-lg shadow transition duration-300 hover:bg-yellow-600 transform hover:-translate-y-1">
            Guess
            </button>
        </div>
    </form>



</div>
    
    </>
);

}