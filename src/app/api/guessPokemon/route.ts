interface RequestBody{
    userGuess: string,
    answer: string
}
export async function POST(request: Request) {
    const body:RequestBody = await request.json();

    if(body.userGuess === body.answer){
        return  new Response(JSON.stringify("the guess was correct"));
    }
    else {
        return  new Response(JSON.stringify("false"))
    }
}