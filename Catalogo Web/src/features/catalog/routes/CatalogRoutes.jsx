import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from '../components/bookList/BookList.jsx';
import CatalogPage from '../components/catalogPage/CatalogPage.jsx';

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
        </Routes>

    );
};

export default CatalogRoutes;