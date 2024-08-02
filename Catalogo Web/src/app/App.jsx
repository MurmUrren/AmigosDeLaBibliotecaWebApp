import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import BookList from '../features/catalog/components/BookList.jsx'
import BookSearch from '../features/catalog/components/BookSearch.jsx'
import NavBar from '../features/catalog/components/NavBar.jsx'
import CatalogRoutes from '../features/catalog/routes/CatalogRoutes.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <CatalogRoutes />
          }
        />

        <Route
          path="/"
          element={
            <NavBar />
          }
        />
      </Routes>
    </>
    // <div className='library-catalog'>
    //    <NavBar/>
    //   <h1>Library Catalog</h1>
    //   {/* <BookSearch />
    //   <BookList /> */}
    // </div>
  )
}

export default App
