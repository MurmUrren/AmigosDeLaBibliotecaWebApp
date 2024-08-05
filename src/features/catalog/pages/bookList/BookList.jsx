import React, { useState } from 'react';
import { useBookList } from '../../hooks/useBookList';
import BookCover from '../../components/bookCover/BookCover';

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
      <h2 className='modal-title'>Book List</h2>
      <div>
        {renderInput(bookTitle, setBookTitle, "Book Title")}
        {renderInput(authorName, setAuthorName, "Author Name")}
        {renderInput(isbn, setIsbn, "ISBN")}
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
