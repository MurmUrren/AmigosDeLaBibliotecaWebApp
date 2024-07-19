// src/features/book-catalog/components/BookList.js
import React, { useState } from 'react';
import { useBookList } from '../hooks/useBookList';

const initialBooks = [
  { title: 'The Pale Blue Dot', author: 'Carl Sagan', isbn: '978-0345376596' },
  { title: '1984', author: 'George Orwell', isbn: '978-0451524935' },
  { title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0060850524' },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '978-1451673319' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0060935467' },
];

const BookList = () => {
  const [books, setBooks] = useState(initialBooks);
  const { loading, error } = useBookList(books);

  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = () => {
    setBooks([...books, { title: bookTitle, author: authorName, isbn }]);
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
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {books.map(book => (
          <li key={book.isbn}>
            <div>
              <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn})
              {book.coverUrl && <img src={book.coverUrl} alt="Book Cover" style={{ width: '100px', height: 'auto' }} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
