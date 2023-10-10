import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-28 bg-zinc-900">
     
    <div>
      <h2>Whos that Pokemon </h2>
    </div>
    <div className="mb-64 flex flex-row text-center ">
      <a
        href=""
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Log in
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum reprehenderit ut iusto rerum autem laudantium dolor minima, mollitia aperiam quas harum tenetur illo quam aliquid temporibus nesciunt velit distinctio eveniet?
        </p>
      </a>

      <a
        href=""
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Sign up
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum a dolorum odio mollitia ipsam eius nulla esse, molestias ducimus laboriosam harum temporibus voluptatibus ad voluptas obcaecati iure iste saepe quasi.
        </p>
      </a>


    </div>
  </main>
  )
}
