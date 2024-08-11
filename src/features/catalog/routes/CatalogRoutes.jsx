import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagementPage from '@pages/managementPage/ManagementPage';
import CatalogPage from '@pages/catalogPage/CatalogPage.jsx';
import GenresPage from '@pages/genresPage/GenresPage.jsx';
import BookManagementPage from '@pages/bookManagementPage/BookManagementPage';
import CollectionGenreManagementPage from '@pages/collectionGenreManagementPage/CollectionGenreManagementPage';

const CatalogRoutes = () => {
    return (
        <Routes>
            <Route
                path="/catalog/:genreId"
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
                path="/collection/:title/:collectionId"
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
                path="manage/co_ge"
                element={
                    <CollectionGenreManagementPage />
                }
            />
        </Routes>

    );
};

export default CatalogRoutes;