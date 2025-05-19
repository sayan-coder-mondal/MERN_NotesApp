import { useState } from 'react'
// import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button className="bg-amber-400 p-3 border-2 border-gray-500 rounded-2xl cursor-pointer" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="bg-sky-400 text-[50px] p-4  mt-6">Tailwind test</p>

      <Button className='mt-2'>Shadcn</Button>
    </>
  )
}

export default App
