import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
      <div className='bg-purple-300'>
        <div onClick={() => setCount(count + 1)}>
          {count}
        </div>

      </div>
       
    </>
  )
}

export default App
