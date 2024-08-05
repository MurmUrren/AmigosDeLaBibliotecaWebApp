import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import CatalogRoutes from '@routes/CatalogRoutes.jsx';
import CollectionPage from '@pages/collectionPage/CollectionPage.jsx';
import NavBar from '@components/navBar/NavBar.jsx';

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
