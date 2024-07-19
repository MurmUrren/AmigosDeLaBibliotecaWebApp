import React, { useState } from 'react';
import { useBookList } from '../hooks/useBookList';
import BookCover from './BookCover';

const BookSearch = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const { books, getBook, loading, error  } = useBookList();

  const handleSearch = async () => {
    var book = {title: title, author: author, isbn: ISBN};
    await getBook(book);
  };

  return (
    <div>
      <h2>Search Book Cover</h2>
      <div>
        <input 
          type="text" 
          placeholder="Book Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Author Name" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search by Title and Author'}
        </button>
      </div>
      <div>
        <input 
          type="text" 
          placeholder="ISBN" 
          value={ISBN} 
          onChange={(e) => setISBN(e.target.value)} 
        />
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
