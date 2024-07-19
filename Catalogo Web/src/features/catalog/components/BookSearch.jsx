import React, { useState } from 'react';
import { useBookCover } from '../hooks/useBookCover';
import BookCover from './BookCover';

const BookSearch = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const { coverUrl, loading, error, fetchCoverByTitleAndAuthor, fetchCoverByISBN } = useBookCover();

  const handleSearchByTitleAndAuthor = () => {
    fetchCoverByTitleAndAuthor(title, author);
  };

  const handleSearchByISBN = () => {
    fetchCoverByISBN(isbn);
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
        <button onClick={handleSearchByTitleAndAuthor} disabled={loading}>
          {loading ? 'Loading...' : 'Search by Title and Author'}
        </button>
      </div>
      <div>
        <input 
          type="text" 
          placeholder="ISBN" 
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
        />
        <button onClick={handleSearchByISBN} disabled={loading}>
          {loading ? 'Loading...' : 'Search by ISBN'}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
      <BookCover url={coverUrl} />
    </div>
  );
};

export default BookSearch;
