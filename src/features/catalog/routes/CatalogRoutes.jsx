import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagementPage from '@pages/managementPage/ManagementPage';
import CatalogPage from '@pages/catalogPage/CatalogPage.jsx';
import GenresPage from '@pages/genresPage/GenresPage.jsx';

import BookManagementPage from '../pages/bookManagementPage/BookManagementPage';
import Stats from '@pages/stats/Stats';
import BookManagementPage from '@pages/bookManagementPage/BookManagementPage';
import CollectionGenreManagementPage from '@pages/collectionGenreManagementPage/CollectionGenreManagementPage';
import NoGenreBooksPage from '@pages/noGenreBooksPage/NoGenreBooksPage';

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

                path="/stats"
                element={
                    <Stats/>

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
        </Routes>

    );
};

export default CatalogRoutes;