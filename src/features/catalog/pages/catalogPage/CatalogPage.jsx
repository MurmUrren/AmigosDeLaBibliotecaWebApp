import React, { useEffect, useState, useMemo } from 'react';
import useBooks from '@hooks/useBooks';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.css';

import { getBookCoverByISBN } from '../../api/bookApi';
import BookCard from '@components/bookCard/BookCard';
import Pagination from '@components/pagination/Pagination';

const CatalogPage = () => {
  const navigate = useNavigate();
  const { genreId } = useParams();
  const books = useBooks(genreId);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;

  const handlePageChange = (page) => {
    setCurrentPage(page);
};

  const currentBooks = useMemo(() => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return books.slice(indexOfFirstBook, indexOfLastBook);
}, [currentPage, books]);

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
      <Pagination
        currentPage={currentPage}
        totalCount={books.length}
        pageSize={booksPerPage}
        onPageChange={handlePageChange}
      />
      <div className="book-list-container">
        <div className="book-list">
          {books.length > 0 ?
            currentBooks?.map(book => (
              <BookCard key={book.id} book={book} />
            )
          ) : (
              <h1>No se encontraron libros</h1>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={books.length}
        pageSize={booksPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CatalogPage;
