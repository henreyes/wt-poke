
import SignInButton from '@/src/components/SignInButton'
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession();


  return (
    <main className="flex min-h-screen flex-col justify-center items-center  bg-gray-950 ">
      <div className="  flex flex-col min-w-full rounded-xl items-center py-10 text-gray-300 ">
        <h1 className="block font-sans text-3xl font-semibold leading-tight tracking-normal text-inherit antialiased ">
          Who's that Pokemon
        </h1>

      </div>
      <div className="w-full max-w-sm mx-auto  mb-5 bg-gray-500 rounded-lg p-10">
      <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">
        Enter Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Your Username"
        className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p className="text-gray-300 mt-4 text-sm">
        We need your username to keep track of the leaderboard.
      </p>
    </div>
      <Link href={`/user/test`}  className="inline-block bg-blue-500 text-white text-xl px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">Play Game</Link>
       

    </main>
  )
}
