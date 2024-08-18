import React, { useEffect, useState } from 'react';
import { useBookList } from '@hooks/useBookList';
import supabase from '@config/supabaseClient';
import './AddBook.css';
import ManualAddBook from '../manualAddBook/ManualAddBook';
import BarcodeScanner from '../barcodeScanner/BarcodeScanner';
import { bookExistsF, fetchBook, updateBookCopies } from './functs/functs';

const AddBook = () => {
  const { books, getBook, removeBook, loading, error } = useBookList();
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [booksToAdd, setBooksToAdd] = useState({});
  const [qrScannerActive, setQrScannerActive] = useState(false);
  const [bookExists, setBookExists] = useState(false);

  // lo siento
  const [fetchedBook, setFetchedBook] = useState(null);
  const [copies, setCopies] = useState(0);

  useEffect(() => {
    setBooksToAdd(prevBooksToAdd => {
      const updatedBooksToAdd = { ...prevBooksToAdd };
  
      books.forEach(book => {
        if (!updatedBooksToAdd[book.isbn13]) {
          updatedBooksToAdd[book.isbn13] = [];
        }
      });
  
      Object.keys(updatedBooksToAdd).forEach(isbn13 => {
        if (!books.some(book => book.isbn13 === isbn13)) {
          delete updatedBooksToAdd[isbn13];
        }
      });
  
      return updatedBooksToAdd;
    });
  }, [books]);

  const handleAddBook = async () => {
    if (!isbn) {
      console.log('Please fill out all fields(isbn) before adding a book.');
      return;
    }
    const bookExists = await bookExistsF(isbn);
    if (bookExists) {
      setBookExists(true);
      const fetchedBook = await fetchBook(isbn);
      setFetchedBook(fetchedBook);
      setCopies(fetchedBook.Copies);
    } 
    else {
      await getBook({ title: bookTitle, author: authorName, isbn });
      setBookTitle('');
      setAuthorName('');
      setIsbn('');
    }
  };

  const removeGenreFromBook = async (isbn, genreId) => {
    setBooksToAdd(prevBooksToAdd => {
      const updatedGenres = prevBooksToAdd[isbn] || [];
      return {
        ...prevBooksToAdd,
        [isbn]: updatedGenres.filter(genre => genre !== genreId)
      }
    });
  };

  const saveBookGenres = async (bookId, genreId, isbn13) => {
    const { data, error } = await supabase
      .from('BookGenres')
      .insert([
        {
          Book_Id: bookId,
          Genre_Id: genreId
        }
      ])
      .select();

    if (error) {
      console.log('Error inserting book genres: ', error.message);
    }

    if (data) {
      console.log('Book genres inserted successfully: ', data);
      removeGenreFromBook(isbn13, genreId);
    }
  };

  const renderInput = (value, onChange, placeholder) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );

  const getScannerISBN = (isbn) => {
    setIsbn(isbn);
  };

  const handleUpdateBookCopies = async () => {
    if (copies === 0) {
      console.log('Please fill out all fields(copies) before adding a book.');
      return;
    }
    await updateBookCopies(isbn, Number(fetchedBook.Copies) + 1);
    setFetchedBook(null);
    setCopies(0);
    setBookExists(false);
    setIsbn('');
  };

  const handleCopiesChange = (e) => {
    setCopies(e.target.value);
  };

  return (
    <div className='manage-books-wrapper' id="navbar">
      {qrScannerActive &&
        <BarcodeScanner getScannerISBN={getScannerISBN}/>
      }
      <button className='add-book-button' onClick={() => setQrScannerActive(!qrScannerActive)}>
        {qrScannerActive ? 'Cerrar Escaner' : 'Escanear ISBN'}
      </button>
      <h2 className='modal-title'>Agregar Libro</h2>
      <div className='add-book-inputs'>
        {renderInput(isbn, setIsbn, "ISBN13")}
        <button className='add-book-button' onClick={handleAddBook} disabled={loading}>
          {loading ? 'Cargando...' : 'Agregar Libro'}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
      {bookExists && fetchedBook && (
        <div className='fetched-book-container'>
          <h3 className='fetched-book-title'>Ya existe "{fetchedBook.Title}"</h3>
          <p>Se agregara una copia</p>
          <button
            className='update-copies-button'
            onClick={handleUpdateBookCopies}
          >
            Agregar Copia
          </button>
        </div>
        // <div className='fetched-book-container'>
        //   <h3 className='fetched-book-title'>Ya existe "{fetchedBook.Title}"</h3>
        //   <p>Actualizar copias</p>
        //   <input
        //     className='update-copies-input'
        //     type="number"
        //     value={copies}
        //     onChange={handleCopiesChange}
        //     placeholder="Copias"
        //   />
        //   <button
        //     className='update-copies-button'
        //     onClick={handleUpdateBookCopies}
        //   >
        //     Actualizar Copias
        //   </button>
        // </div>
      )}
        {books?.map(book => (
          <ManualAddBook bookData={book} saveBookGenres={saveBookGenres} removeBook={removeBook}/>
        ))}
    </div>
  );
};

export default AddBook;