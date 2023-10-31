import { prisma } from "@/lib/prisma";

interface RequestBody {
    id: number,
    
}


export async function POST(request: Request) {
    
    const body:RequestBody = await request.json();

    const pokemon = await prisma.allPokemon.findFirst({
        where: {
            id: body.id,

        }
    })

   
    return new Response(JSON.stringify(pokemon));

}