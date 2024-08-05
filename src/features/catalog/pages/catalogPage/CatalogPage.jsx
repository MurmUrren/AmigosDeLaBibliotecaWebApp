import React, { useEffect, useState } from 'react';
import './CatalogPage.css';
// import books from '@data/books.json';

import { getBookCoverByISBN } from '../../api/bookApi';
import BookCard from '@components/bookCard/BookCard';

const CatalogPage = () => {
  const [bookCovers, setBookCovers] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);

  const GENRES = ['messi', 'lol', 'cr7', 'pepe', 'casa'];

  // THIS METHOD IS TEMPORARY, DATA MUST BE RETRIEVED FROM A DATABASE
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks === null) {
      books.forEach(async book => {
        const bookCoverURL = await getBookCoverByISBN(book.ISBN);
        setBookCovers(prevState => {
          const newState = {
            ...prevState,
            [book.ISBN]: bookCoverURL.coverUrl
          };
          localStorage.setItem('books', JSON.stringify(newState));
          return newState;
        });
      });
    } else {
      setBookCovers(JSON.parse(storedBooks));
    }
  }, [books]);

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenres(prevState =>
      checked ? [...prevState, value] : prevState.filter(genre => genre !== value)
    );
  };

  const filteredBooks = selectedGenres.length === 0 ? books : books.filter(book =>
    selectedGenres.some(genre => book.genres.includes(genre))
  );

  return (
    <div className="book-list-container" id="navbar">
      {/* filters */}
      <div>
        <h1>Filters</h1>
        {GENRES.map(genre => (
          <div key={genre}>
            <label>
              <input
                type="checkbox"
                value={genre}
                onChange={handleGenreChange}
              />
              {genre}
            </label>
          </div>
        ))}
      </div>
      <div className="book-list-container">
        {selectedGenres.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
