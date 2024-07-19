import React, { useState } from 'react';
import { useBookList } from '../hooks/useBookList';
import BookCover from './BookCover';

const BookSearch = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const { getBook, loading, error  } = useBookList();

  const handleSearchByISBN = async () => {
    await getBook();
  };

  const handleSearchByTitleAndAuthor = async () => {
    await getBook({ title, author });
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
          value={ISBN} 
          onChange={(e) => setISBN(e.target.value)} 
        />
        <button onClick={handleSearchByISBN} disabled={loading}>
          {loading ? 'Loading...' : 'Search by ISBN'}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
      <BookCover  />
    </div>
  );
};

export default BookSearch;
