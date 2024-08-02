import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from '../features/catalog/components/navBar/NavBar.jsx'
import CatalogRoutes from '../features/catalog/routes/CatalogRoutes.jsx';

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
          path="/home"
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
