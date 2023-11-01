import GameComponent from "./GameComponent";
import { getStats } from "./_actions";


export default async function GameHome({ params }: { params: { username: string, id: number } }){
  const userStats = await getStats(params.username);
  console.log(userStats);
  
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const randomNumber = getRandomNumber(1, 100);

  return (
    <>
      <div>{userStats?.username}</div>
      <div>Poke found: {userStats?.pokeFound}</div>
      <GameComponent params={{ username: params.username,  id: randomNumber }} />
    </>
  )
}