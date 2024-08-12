import React, { useState } from 'react';
import './BookCard.css';
import BookCover from '@components/bookCover/BookCover';
import BookDetails from '@components/bookDetails/BookDetails';
import useBookCover from '@hooks/useBookCover';
import noCover from '../../../../assets/imgs/noCover.jpeg'; // Ensure this path is correct

function BookCard({ book }) {
  const [showDetails, setShowDetails] = useState(false);
  const { bookCoverURL, loading } = useBookCover(book);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      {showDetails && <BookDetails book={book} imgUrl={bookCoverURL} onClose={handleCloseDetails} />}
      <div className="book-item" onClick={handleCardClick}>
        {loading ? (
          <p>Loading cover...</p>
        ) : (
          <BookCover url={bookCoverURL || noCover} />
        )}
        <h2 className="book-title">{book.Title}</h2>
        <h3 className="book-author">{book.Creators}</h3>
      </div>
    </>
  );
}

export default BookCard;
