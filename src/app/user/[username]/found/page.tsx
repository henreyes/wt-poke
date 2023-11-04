
export default function Page({ params }: { params: { username: string} }) {

    return (
      <>
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-t from-gray-900 to-slate-800'>
      <h1>{params.username}, here are the pokemon you found</h1>
    </div>

      </>
    )
  }