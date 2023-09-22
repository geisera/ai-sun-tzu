'use client'
import {
  useEffect,
  useState
} from 'react'

import { PongSpinner } from "react-spinners-kit";

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  const handleKeyDown = (event) => {
    if( event.keycode === 13 || event.which === 13 ){
      sendQuery()
    }
  }
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query + ' in the handbook')
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  return (
    <main className="flex flex-col h-screen items-center justify-between bg-blue-300">
      <div className="flex min-h-full max-w-md flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="
          border-b rounded-lg 
          bg-white 
          shadow-2xl
          border-blue-900
          min-w-full 
          px-4 
          py-5">
          <div className="mt-10 w-full">
            <h4 className="
              mt-10 
              text-center 
              text-xl 
              font-bold 
              leading-9 
              tracking-tight 
              text-gray-900">
              M&S - AI Employee Handbook
            </h4>
            <div>
              <input 
                className="
                  block 
                  w-full 
                  rounded-md 
                  border-0 
                  my-5 
                  px-3 
                  py-1.5 
                  text-gray-900 
                  shadow-sm 
                  ring-1 
                  ring-inset 
                  ring-blue-900 
                  ring-opacity-55
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset 
                  focus:ring-blue-600 
                  sm:text-sm 
                  sm:leading-6"
                onChange={e => setQuery(e.target.value)}
                tabIndex={0} 
                onKeyDown={e => handleKeyDown(e)} />
            </div>
            <div>
                <button 
                  className="
                    flex 
                    w-full 
                    justify-center 
                    rounded-md 
                    bg-blue-900 
                    mb-5 
                    px-3 
                    py-1.5 
                    text-sm 
                    font-semibold 
                    leading-6 
                    text-white 
                    shadow-sm 
                    hover:opacity-90 
                    focus-visible:outline 
                    focus-visible:outline-2 
                    focus-visible:outline-offset-2 
                    focus-visible:outline-blue-600" 
                  onClick={sendQuery}>
                  What do you want to know?</button>
            </div>
          </div>
          <div className='flex justify-center'>
          {
            <PongSpinner size={30} color="#002c77" loading={loading} />
          }
          </div>
          {
            result && <p className='text-gray-900'>{result}</p>
          }
          {/* consider removing this button from the UI once the embeddings are created ... */}
          {/* <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button> */}
        </div>
      </div>
    </main>
  )
}
