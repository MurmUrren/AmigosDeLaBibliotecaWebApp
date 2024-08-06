import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import CatalogRoutes from '@routes/CatalogRoutes.jsx';
import CollectionPage from '@pages/collectionPage/CollectionPage.jsx';
import NavBar from '@components/navBar/NavBar.jsx';

function App() {
  return (
    <div>
      <NavBar />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<CollectionPage />} />
          <Route path="/*" element={<CatalogRoutes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
