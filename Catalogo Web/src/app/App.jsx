import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from '../features/catalog/components/BookList.jsx'
import BookSearch from '../features/catalog/components/BookSearch.jsx'
import NavBar from '../features/catalog/components/NavBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='library-catalog'>
       <NavBar/>
      <h1>Library Catalog</h1>
      <BookSearch />
      <BookList />
    </div>
  )
}

export default App
