import React, { useState } from 'react';
import supabase from '../../../../../../config/supabaseClient';
import useAllGenres from '@hooks/useAllGenres';
import './ManualAddBook.css';

const ManualAddBook = ({ bookData, saveBookGenres, removeBook }) => {
  const [bookTitle, setBookTitle] = useState(bookData.title || '');
  const [authorName, setAuthorName] = useState(bookData.author || '');
  const [isbn13, setIsbn13] = useState(bookData.isbn13 || '');
  const [isbn10, setIsbn10] = useState(bookData.isbn10 || '');
  const [description, setDescription] = useState(bookData.description || '');
  const [publisher, setPublisher] = useState(bookData.publisher || '');
  const [publishedDate, setPublishedDate] = useState(bookData.publishedDate || '');
  const [length, setLength] = useState(bookData.length_b || '');
  const [selectedGenres, setSelectedGenres] = useState(bookData.selectedGenres || []);
  
  const allGenres = useAllGenres();

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('Books')
      .insert([
        {
          Title: bookTitle,
          Creators: authorName,
          Ean_Isbn13: isbn13,
          Upc_Isbn10: isbn10,
          Description: description,
          Publisher: publisher,
          Publish_Date: publishedDate,
          Length: length
        }
      ])
      .select();

    if (error) {
      console.log('Error inserting book: ', error.message);
    }

    if (data) {
      selectedGenres.forEach(async genreId => {
        await saveBookGenres(data[0].id, genreId, isbn13);
      });
      removeBook(isbn13);
      console.log('Book saved successfully: ', data);
    }
  };

  const handleGenreChange = (event) => {
    const selectedOption = Number(event.target.value);

    setSelectedGenres(prevGenres => {
      if (prevGenres.includes(selectedOption)) {
        return prevGenres.filter(genre => genre !== selectedOption);
      } else {
        return [...prevGenres, selectedOption];
      }
    });
  };

  return (
    <div className='manual-add-book-wrapper'>
      <h3>Verifica o modifica la información del libro</h3>
      <div className='add-book-inputs'>
        <label htmlFor="bookTitle">Título del libro</label>
        <input 
          id="bookTitle"
          type="text" 
          value={bookTitle} 
          onChange={e => setBookTitle(e.target.value)} 
          placeholder="Título del libro" 
        />
        <label htmlFor="authorName">Nombre del autor</label>
        <input 
          id="authorName"
          type="text" 
          value={authorName} 
          onChange={e => setAuthorName(e.target.value)} 
          placeholder="Nombre del autor" 
        />
        <label htmlFor="description">Descripción</label>
        <textarea 
          id="description"
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Descripción" 
        />
        <label htmlFor="publisher">Editorial</label>
        <input 
          id="publisher"
          type="text" 
          value={publisher} 
          onChange={e => setPublisher(e.target.value)} 
          placeholder="Editorial" 
        />
        <label htmlFor="publishedDate">Fecha de publicación</label>
        <input 
          id="publishedDate"
          type="date" 
          value={publishedDate} 
          onChange={e => setPublishedDate(e.target.value)} 
        />
        <label htmlFor="length">Número de páginas</label>
        <input 
          id="length"
          type="number" 
          value={length} 
          onChange={e => setLength(e.target.value)} 
          placeholder="Número de páginas" 
        />
        <label htmlFor="genres">Géneros</label>
        <div className="genres-container">
          <select
            id="genres"
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            className="select-multiple"
          >
            {allGenres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.Title}
              </option>
            ))}
          </select>
          {selectedGenres.length > 0 && (
            <div className='selected-genres'>
              Géneros seleccionados:
              <ul className='genre-list'>
                {selectedGenres.map(genreId => {
                  const genre = allGenres.find(genre => genre.id === genreId);
                  return <li key={genre.id} className='genre-item'>{genre.Title}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <button className='save-book-button' onClick={handleSave}>Guardar Libro</button>
    </div>
  );
};

export default ManualAddBook;
