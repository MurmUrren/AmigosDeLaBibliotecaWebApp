import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import CatalogRoutes from '../features/catalog/routes/CatalogRoutes.jsx';
import CollectionPage from '../features/catalog/components/collectionPage/CollectionPage.jsx';
import CatalogPage from '../features/catalog/components/catalogPage/CatalogPage.jsx';
import NavBar from '../features/catalog/components/navBar/NavBar.jsx';

function App() {

  return (
    <div>
      <NavBar />
      <div className='main-content'>
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
              <CollectionPage />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
