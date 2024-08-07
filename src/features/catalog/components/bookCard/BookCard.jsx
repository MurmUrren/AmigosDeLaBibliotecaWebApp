import React from 'react';
import { useState } from 'react';
import './BookCard.css';
import noCover from '../../../../assets/imgs/noCover.jpeg';
import BookDetails from '../bookDetails/BookDetails';

function BookCard({ book, bookCoverURL }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    console.log("Book: ", book),
    <>
      {showDetails && <BookDetails book={book} img={bookCoverURL} onClose={handleCloseDetails} />}
      <div className="book-item" onClick={handleCardClick}>
        <img src={bookCoverURL || noCover} alt={`${book.Title} cover`} className="book-cover" />
        <h2 className="book-title">{book.Title}</h2>
        <h3 className="book-author">{book.Creators}</h3>
        
      </div>
    </>
  );
}

export default BookCard;
