import React, { useState } from 'react';
import { useBookList } from '../../../../hooks/useBookList';
import BookCover from './BookCover';

const BookSearch = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const { books, getBook, loading, error, removeBook } = useBookList();

  const handleSearch = async () => {
    const book = { title, author, isbn: ISBN };
    await getBook(book);
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
    <div>
      <h2>Search Book Cover</h2>
      <div>
        {renderInput(title, setTitle, "Book Title")}
        {renderInput(author, setAuthor, "Author Name")}
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search by Title and Author'}
        </button>
      </div>
      <div>
        {renderInput(ISBN, setISBN, "ISBN")}
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search by ISBN'}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
      {books.map(book => (
        <li key={book.isbn}>
          <div>
            <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn})
            <BookCover url={book.coverUrl} />
          </div>
          <button onClick={() => removeBook(book.isbn)}>Remove</button>
        </li>
      ))}
    </div>
  );
};

export default BookSearch;
