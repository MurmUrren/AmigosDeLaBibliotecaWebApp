import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from '../components/bookList/BookList.jsx';
import CatalogPage from '../components/catalogPage/CatalogPage.jsx';
import GenresPage from '../components/genresPage/GenresPage.jsx';

const CatalogRoutes = () => {
    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <CatalogPage />
                }
            />
            <Route
                path="/manage"
                element={
                    <BookList />
                }
            />
            <Route
                path="/collection/:collectionName"
                element={
                    <GenresPage />
                }
            />
        </Routes>

    );
};

export default CatalogRoutes;