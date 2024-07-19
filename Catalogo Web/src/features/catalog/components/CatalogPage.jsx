import React from 'react';
import './CatalogPage.css';
import BookList from './BookList';


const CatalogPage = () => {
  return (
    <div className="catalog-page">
      <h1>Library Catalog</h1>
      <div className="book-list">

        <BookList/>
      </div>
    </div>
  );
};

export default CatalogPage;
