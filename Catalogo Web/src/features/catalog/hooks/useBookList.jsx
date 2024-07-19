import { useState } from 'react';
import { useBookCover } from './useBookCover';

export const useBookList = () => {
  const [books, setBooks] = useState([]);
  const {fetchCoverByISBN} = useBookCover();

  const addBook = (book) => {
    
    setBooks([...books, fetchCoverByISBN(book.isbn)]);
  };

  const removeBook = (isbn) => {
    setBooks(books.filter(book => book.isbn !== isbn));
  };

  return { books, addBook, removeBook };
};
