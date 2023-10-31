
'use client';


import { redirect } from 'next/navigation';
import { useRouter} from 'next/router';
import { FormEvent, startTransition } from 'react';
import { AllPokemon} from '@prisma/client'

interface PokeProp{
    pokemon: AllPokemon
    
}

export default function PokeForm(props: PokeProp) {
    console.log(props.pokemon)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
         const router = useRouter()
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/guessPokemon`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userGuess: formData.get('username'),
                answer: props.pokemon.name,
              }),
            });
      
            // assuming your API returns JSON
            try {
                const res = await response.json();
                
                if (res) {
                  // Using the push method and catching any errors
                  startTransition(() => {
                    router.push({
                        pathname: "/",
                        query: { ...router.query, correctGuess: 'true' },
                      }).catch(e => {console.log("An error occurred during the route transition: ")});
                  });
    
                }
              } catch (error) {
                console.error("An error occurred during the route transition: ", error);
                throw("An error occurred during the route transition: ")
                // Handle the error appropriately
                // Maybe set an error message in the state to display to the user
              }
          } catch (error) {
            console.log()
            throw('An error occurred while submitting the form');
          }
        }

  return (
    <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
    <img className="w-full" src={props.pokemon.officialArtwork} alt="Pokemon" />
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        name="username"
        className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none"
        placeholder="Guess the Pokemon"
        type="text"
      />
      <button type="submit" className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">
        Submit
      </button>
    </form>
    </div>
    </>
  );
}