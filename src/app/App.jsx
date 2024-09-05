import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import ManagementPage from '@pages/managementPage/ManagementPage';
import CatalogPage from '@pages/catalogPage/CatalogPage.jsx';
import GenresPage from '@pages/genresPage/GenresPage.jsx';

import Stats from '@pages/stats/Stats';
import BookManagementPage from '@pages/bookManagementPage/BookManagementPage';
import CollectionGenreManagementPage from '@pages/collectionGenreManagementPage/CollectionGenreManagementPage';
import NoGenreBooksPage from '@pages/noGenreBooksPage/NoGenreBooksPage';
import PatronsManagementPage from '@pages/patronsManagementPage/PatronsManagementPage';
import PatronEditPage from '@pages/patronEditPage/PatronEditPage';
import CreatePatronPage from '@pages/createPatronPage/CreatePatronPage';
import BarcodesPage from '@pages/barcodesPage/BarcodesPage';
import LendingPage from '@pages/lendingPage/LendingPage';
import Login from '@pages/login/Login';
import CollectionPage from '@pages/collectionPage/CollectionPage.jsx';
import NavBar from '@components/navBar/NavBar.jsx';

function App() {
  return (
    <div>
      <NavBar />
      <div className='main-content mt-24'>
        <Routes>
          <Route path="/" element={<CollectionPage />} />
          <Route
                path="books/:letter"
                element={
                    <h1>Books</h1>
                }
            />
            <Route
                path='login'
                element={
                    <Login />
                }
            />
            <Route
                path="catalog/:genreId"
                element={
                    <CatalogPage />
                }
            />
            <Route
                path="/manage"
                element={
                    <ManagementPage />
                }
            />
            <Route
                path="barcodes"
                element={
                    <BarcodesPage />
                }
            />

            <Route
                path="lending"
                element={
                    <LendingPage />
                }
            />

            <Route
                path="collection/:title/:collectionId"
                element={
                    <GenresPage />
                }
            />
            <Route
                path="manage/books"
                element={
                    <BookManagementPage />
                }
            />
            <Route

                path="stats"
                element={
                    <Stats/>
                }
            />
            <Route
                path="manage/co_ge"
                element={
                    <CollectionGenreManagementPage />
                }
            />

            <Route
                path="manage/books-no-genre"
                element={
                    <NoGenreBooksPage />

                }
            />
            <Route
                path="manage/patrons"
                element={
                    <PatronsManagementPage />
                }
            />
            <Route
                path="edit/patron/:patron_id"
                element={
                    <PatronEditPage />
                }
            />
            <Route
                path="create_patron"
                element={
                    <CreatePatronPage />
                }
            />
            <Route 
                path="*"
                element={
                  <h1>404</h1>
                }
            />
        </Routes>
      </div>
    </div>
  );
}

export default App;
