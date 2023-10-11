
import SignInButton from '@/components/SignInButton'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-28 bg-zinc-900">
     
      <div className=" flex flex-row text-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ">
        
        <SignInButton />

      </div>
  </main>
  )
}
