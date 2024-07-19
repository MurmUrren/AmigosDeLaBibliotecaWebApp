// BookList.jsx
import React, { useState } from 'react';
import { useBookList } from '../hooks/useBookList';
import BookCover from './BookCover';

const BookList = () => {
  const { books, getBook, removeBook, loading, error } = useBookList();
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = async () => {
    await getBook({ title: bookTitle, author: authorName, isbn });
    setBookTitle('');
    setAuthorName('');
    setIsbn('');
  };

  return (
    <div>
      <h2>Book List</h2>
      <div>
        <input 
          type="text" 
          placeholder="Book Title" 
          value={bookTitle} 
          onChange={(e) => setBookTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Author Name" 
          value={authorName} 
          onChange={(e) => setAuthorName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="ISBN" 
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
        />
        <button onClick={handleAddBook} disabled={loading}>
          {loading ? 'Loading...' : 'Add Book'}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {books.map(book => (
          <li key={book.isbn}>
            <div>
              <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn})
              <BookCover url={book.coverUrl} />
            </div>
            <button onClick={() => removeBook(book.isbn)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
