import Link from "next/link";
import Logout from "../../logout";
import { prisma } from "@/lib/prisma";
import { AllPokemon } from "@prisma/client";
import { revalidatePath } from "next/cache";


export default async function UserPage({ params }: { params: { username: string } }) {

    let pokemon: AllPokemon = {
        id: 0,
        name: "template name",
        frontDefault: "",
        officialArtwork: "",
        url: "",
    };



    return (
  
      <div> hello user </div>
        
)
}