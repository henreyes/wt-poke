import { prisma } from "@/lib/prisma";

interface RequestBody {
    id: number,
    
}


export async function GET(request: Request) {
    
    const body:RequestBody = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            id: body.id,

        }
    })

   
    return new Response(JSON.stringify(user));

}