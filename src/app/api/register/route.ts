import { prisma } from "@/src/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string,
    password: string,
}
export async function POST(request: Request) {
    
    const body:RequestBody = await request.json();

    // check to see if username is taken 
    const uniqueUserName = await prisma.user.findUnique({
        where : {
            username: body.username,
        },
    });

    if (!uniqueUserName) {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: await bcrypt.hash(body.password, 10),
                currentScore: 0,
                highScore: 0,
                pokeFound: 0,
            },
        });

        const {password, ...userWithoutPass} = user;
        return new Response(JSON.stringify(userWithoutPass));

    } else {
        return new Response(JSON.stringify(null));
    }



}