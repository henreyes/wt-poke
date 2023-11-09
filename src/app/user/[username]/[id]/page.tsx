import GameComponent from "./GameComponent";
import { getStats } from "./_actions";


export default async function GameHome({ params }: { params: { username: string, id: number } }){
  const userStats = await getStats(params.username);
  console.log(userStats);
  if (!userStats){
    return null;
  }


  return (
    <>
      <GameComponent params={{ username: params.username,  id: Number(params.id), pokeFound: userStats?.pokeFound }} />
    </>
  )
}