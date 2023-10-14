
import SignInButton from '@/src/components/SignInButton'
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link'
import Logout from './logout';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-28 bg-gray-950">
     
      <div className=" flex flex-row  ">
        {!session && 
          <>
          <div className=" flex flex-row text-center   group rounded-lg border border-transparent px-8 py-4 transition-colors hover:border-gray-900 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/10 ">
             <Link href={"/login"}>Sign in</Link>
          </div>
          <div className=" flex flex-row text-center   group rounded-lg border border-transparent px-8 py-4 transition-colors hover:border-gray-900 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/10 ">
            <Link href={"/register"}>Register</Link> 
          </div>
          </>
        }
        {!!session && <Logout /> }
      

      </div>
      <Link className="transition-colors hover:text-yellow-600" href={"/UserAccount"}> View account</Link>

      
  </main>
  )
}
