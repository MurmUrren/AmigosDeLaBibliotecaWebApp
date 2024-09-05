import React, { useState, useEffect } from 'react';
import './BookCard.css';
import { updateUrlCover } from '@hooks/useBooks';
import BookCover from '@components/bookCover/BookCover';
import BookDetails from '@components/bookDetails/BookDetails';
import useBookCover from '@hooks/useBookCover';
import noCover from '../../../../assets/imgs/noCover.jpeg'; // Asegúrate de que esta ruta sea correcta

function BookCard({ book }) {
  const [showDetails, setShowDetails] = useState(false);
  const { bookCoverURL, loading } = useBookCover(book);

  useEffect(() => {
    const updateCoverIfEmpty = async () => {
      if (!book.url_cover && bookCoverURL && bookCoverURL !== noCover) {
        const result = await updateUrlCover(book.id, bookCoverURL);
        if (result === 1) {
          //return anything
        } else {
          console.error(`No se pudo actualizar la portada para el libro con ID ${book.id}`);
        }
      }
    };

    if (!loading) {
      updateCoverIfEmpty();
    }
  }, [bookCoverURL, book.id, book.url_cover, loading]);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      {showDetails && (
        <BookDetails book={book} imgUrl={bookCoverURL || noCover} onClose={handleCloseDetails} />
      )}
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
