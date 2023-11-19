import GameComponent from "./GameComponent";
import { getStats } from "./_actions";


export default async function GameHome({ params }: { params: { username: string, gen: string, id: number } }){
  const userStats = await getStats(params.username);
  console.log(userStats);
  if (!userStats){
    return null;
  }
  console.log('generation', params.gen);


  return (
    <>
      <GameComponent params={{ username: params.username,  id: Number(params.id), gen: params.gen, pokeFound: userStats?.pokeFound }} />
    </>
  )
}