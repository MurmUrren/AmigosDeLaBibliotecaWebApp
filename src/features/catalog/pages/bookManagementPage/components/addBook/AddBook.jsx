import React, { useEffect, useState } from 'react';
import { useBookList } from '@hooks/useBookList';
import useAllGenres from '@hooks/useAllGenres';
import supabase from '@config/supabaseClient';
import './AddBook.css';
import ManualAddBook from '../manualAddBook/ManualAddBook';
import BarcodeScanner from '../barcodeScanner/BarcodeScanner';

const AddBook = () => {
  const { books, getBook, removeBook, loading, error } = useBookList();
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [booksToAdd, setBooksToAdd] = useState({});
  const [qrScannerActive, setQrScannerActive] = useState(false);

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
    await getBook({ title: bookTitle, author: authorName, isbn });
    setBookTitle('');
    setAuthorName('');
    setIsbn('');
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
        {books?.map(book => (
          <ManualAddBook bookData={book} saveBookGenres={saveBookGenres} removeBook={removeBook}/>
        ))}
    </div>
  );
};

export default AddBook;