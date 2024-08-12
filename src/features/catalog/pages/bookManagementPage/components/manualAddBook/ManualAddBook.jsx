import React, { useState } from 'react';
import supabase from '../../../../../../config/supabaseClient';
import useAllGenres from '@hooks/useAllGenres';
import './ManualAddBook.css';

const ManualAddBook = ({ bookData, saveBookGenres }) => {
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
          Length: length,
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
      <h2>Verify or Modify Book Information</h2>
      <div className='add-book-inputs'>
        <input 
          type="text" 
          value={bookTitle} 
          onChange={e => setBookTitle(e.target.value)} 
          placeholder="Book Title" 
        />
        <input 
          type="text" 
          value={authorName} 
          onChange={e => setAuthorName(e.target.value)} 
          placeholder="Author Name" 
        />
        <input 
          type="text" 
          value={isbn13} 
          onChange={e => setIsbn13(e.target.value)} 
          placeholder="ISBN13" 
        />
        <input 
          type="text" 
          value={isbn10} 
          onChange={e => setIsbn10(e.target.value)} 
          placeholder="ISBN10" 
        />
        <textarea 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Description" 
        />
        <input 
          type="text" 
          value={publisher} 
          onChange={e => setPublisher(e.target.value)} 
          placeholder="Publisher" 
        />
        <input 
          type="date" 
          value={publishedDate} 
          onChange={e => setPublishedDate(e.target.value)} 
        />
        <input 
          type="number" 
          value={length} 
          onChange={e => setLength(e.target.value)} 
          placeholder="Length" 
        />
        <div className="genres-container">
          <select
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
              Selected Genres:
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
      <button className='save-book-button' onClick={handleSave}>Save Book</button>
    </div>
  );
};

export default ManualAddBook;
