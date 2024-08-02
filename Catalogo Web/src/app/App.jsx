import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import CatalogRoutes from '../features/catalog/routes/CatalogRoutes.jsx';
import CatalogPage from '../features/catalog/components/catalogPage/CatalogPage.jsx';
import NavBar from '../features/catalog/components/navBar/NavBar.jsx';

function App() {

  return (
    <>
      <NavBar />
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
            <CatalogPage />
          }
        />
      </Routes>
    </>
  )
}

export default App
