import React, { useEffect, useState } from 'react';
import useBooks from '@hooks/useBooks';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.css';

import { getBookCoverByISBN } from '../../api/bookApi';
import BookCard from '@components/bookCard/BookCard';

const CatalogPage = () => {
  const { genreId } = useParams();
  const books = useBooks(genreId);
  const navigate = useNavigate();

  // THIS METHOD IS TEMPORARY, DATA MUST BE RETRIEVED FROM A DATABASE
  // useEffect(() => {
  //   const storedBooks = localStorage.getItem('books');
  //   if (storedBooks === null) {
  //     books.forEach(async book => {
  //       const bookCoverURL = await getBookCoverByISBN(book.ISBN);
  //       setBookCovers(prevState => {
  //         const newState = {
  //           ...prevState,
  //           [book.ISBN]: bookCoverURL.coverUrl
  //         };
  //         localStorage.setItem('books', JSON.stringify(newState));
  //         return newState;
  //       });
  //     });
  //   } else {
  //     setBookCovers(JSON.parse(storedBooks));
  //   }
  // }, [books]);

  return (
    <div className="book-list-container" id="navbar">
      {/* filters */}
      <div className="book-list-container">
        <div className="book-list">
          {books.length > 0 ?
            books?.map(book => (
              <BookCard key={book.id} book={book} />
            )
          ) : (
              <h1>No se encontraron libros</h1>
          )}
        </div>
        {/* {selectedGenres.length > 0 ? (
          selectedGenres.map(genre => (
            <div className="book-list-genre" key={genre}>
              <div className="book-genre-title">
                <h1>{genre}</h1>
              </div>
              <div className="book-list">
                {books
                  .filter(book => book.genres.includes(genre))
                  .map(book => (
                    <BookCard key={book.ISBN} book={book} bookCoverURL={bookCovers[book.ISBN]} />
                  ))}
              </div>
            </div>
          ))
        ) : (
          GENRES.map(genre => (
            <div className="book-list-genre" key={genre}>
              <div className="book-genre-title">
                <h1>{genre}</h1>
              </div>
              <div className="book-list">
                {books
                  .filter(book => book.genres.includes(genre))
                  .map(book => (
                    <BookCard key={book.ISBN} book={book} bookCoverURL={bookCovers[book.ISBN]} />
                  ))}
              </div>
            </div>
          ))
        )} */}
      </div>
    </div>
  );
};

export default CatalogPage;
