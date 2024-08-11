import React, { useEffect, useState } from 'react';
import { useBookList } from '@hooks/useBookList';
import useAllGenres from '@hooks/useAllGenres';
import supabase from '../../../../../../config/supabaseClient';
import './AddBook.css';

const AddBook = () => {
  const { books, getBook, removeBook, loading, error } = useBookList();
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [booksToAdd, setBooksToAdd] = useState({});

  const allGenres = useAllGenres();

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

  const saveBook = async (book) => {
    if (!booksToAdd[book.isbn13] || booksToAdd[book.isbn13].length === 0) {
      console.log("No genres selected for this book. Save operation aborted.");
      return;
    }

    const { data, error } = await supabase
      .from('Books')
      .insert([
        {
          Title: book.title,
          Creators: book.author,
          Ean_Isbn13: book.isbn13,
          Upc_Isbn10: book.isbn10,
          Description: book.description,
          Publisher: book.publisher,
          Publish_Date: book.publishedDate,
          Length: book.length_b
        }
      ])
      .select();

    if (error) {
      console.log('Error inserting book: ', error.message);
    }

    if (data) {
      const bookGenres = booksToAdd[book.isbn13] || [];
      bookGenres.forEach(async genreId => {
        await saveBookGenres(data[0].id, genreId, book.isbn13);
      });

      setBooksToAdd(prevBooksToAdd => {
        const updatedGenres = prevBooksToAdd[book.isbn13] || [];
        if (updatedGenres.length === 0) {
          const { [book.isbn13]: value, ...rest } = prevBooksToAdd;
          return rest;
        }
        return prevBooksToAdd;
      });

      removeBook(book.isbn13)
    }
  };

  const handleGenreChange = (isbn, event) => {
    const selectedOption = Number(event.target.value);

    setBooksToAdd(prevBooksToAdd => {
      const updatedGenres = prevBooksToAdd[isbn] || [];
      if (updatedGenres.includes(selectedOption)) {
        return {
          ...prevBooksToAdd,
          [isbn]: updatedGenres.filter(genre => genre !== selectedOption)
        };
      } else {
        return {
          ...prevBooksToAdd,
          [isbn]: [...updatedGenres, selectedOption]
        };
      }
    });
  };

  const renderInput = (value, onChange, placeholder) => (
      <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      />
  );

  return (
    <div className='manage-books-wrapper' id="navbar">
      <h2 className='modal-title'>Agregar Libro</h2>
      <div className='add-book-inputs'>
        {renderInput(bookTitle, setBookTitle, "Titulo del Libro")}
        {renderInput(authorName, setAuthorName, "Nombre del Autor")}
        {renderInput(isbn, setIsbn, "ISBN13")}
        <button className='add-book-button' onClick={handleAddBook} disabled={loading}>
          {loading ? 'Cargando...' : 'Agregar Libro'}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {books?.map(book => (
          <li key={book.isbn13} className='book-item'>
            <div>
              <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn13})
            </div>
            <div>
              <select
                multiple
                value={booksToAdd[book.isbn13] || []}
                onChange={event => handleGenreChange(book.isbn13, event)}
              >
                {allGenres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.Title}
                  </option>
                ))}
              </select>
              {booksToAdd[book.isbn13]?.length > 0 && (
                <div>
                  Generos Seleccionados:
                  {booksToAdd[book.isbn13].map(genreId => {
                    const genre = allGenres.find(genre => genre.id === genreId);
                    return <span key={genre.id}>{genre.Title}</span>;
                  })}
                </div>
              )}
            </div>
            <button onClick={() => removeBook(book.isbn13)}>Remover</button>
            <button onClick={() => saveBook(book)}>Guardar Libro</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddBook;