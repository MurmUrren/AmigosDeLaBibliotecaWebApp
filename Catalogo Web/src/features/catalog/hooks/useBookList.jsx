// useBookList.js
import { useState, useCallback } from 'react';
import { getBookCoverByTitleAndAuthor, getBookCoverByISBN } from '../api/bookApi'; // Ajusta la ruta si es necesario

export const useBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBook = useCallback(async (book) => {
    setLoading(true);
    setError(null);
    try {
      let bookData = { coverUrl: null, author: 'Desconocido' }; // Valores por defecto

      if (book.isbn) {
        bookData = await getBookCoverByISBN(book.isbn);
        console.log("Data de libro: ", bookData);
      } else if (book.title && book.author) {
        bookData = await getBookCoverByTitleAndAuthor(book.title, book.author);
      }

      setBooks(prevBooks => [...prevBooks, { ...book, ...bookData }]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeBook = useCallback((isbn) => {
    setBooks(prevBooks => prevBooks.filter(book => book.isbn !== isbn));
  }, []);

  return { books, getBook, removeBook, loading, error };
};
