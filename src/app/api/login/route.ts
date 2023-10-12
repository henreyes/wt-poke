import { signJwtAcessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";


interface RequestBody {
    username: string,
    password: string,
}

 export async function POST(request: Request) {
    const body:RequestBody = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            username: body.username,

        }
    })
    
     // ( await bcrypt.compare(body.password, user.password))
    if(user && user.password === body.password ){
        const {password, ...userWithoutPass} = user;
        const accessToken = signJwtAcessToken(userWithoutPass);
        const res = {
            ...userWithoutPass,
            accessToken,
        }
        return new Response(JSON.stringify(res));
    } 
        return new Response(JSON.stringify(null));
    

};