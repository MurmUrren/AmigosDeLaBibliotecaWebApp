import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from '../components/BookList';

const CatalogRoutes = () => {
    return (
        <Routes>
            <Route
                path="/books"
                element={
                    <BookList />
                }
            />
        </Routes>

    );
};

export default CatalogRoutes;