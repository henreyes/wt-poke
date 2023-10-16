import { getServerSession } from "next-auth"
import Card from "../card/card"

// fetching poke image from db, passing it down to the card pro

export default async function pokeCard() {
  const session = await getServerSession();
{
  return (
    <>
        <Card imgSrc="" />
    </>
  )
};
};


