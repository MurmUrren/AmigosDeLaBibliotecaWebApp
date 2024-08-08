import React from 'react';
import './BookDetails.css';
import BookCover from '../bookCover/BookCover';
import noCover from '../../../../assets/imgs/noCover.jpeg';
import useClickOutside from '../../hooks/useClickOutside';

function BookDetails({ book, onClose }) {
  const wrapperRef = useClickOutside(onClose);

  return (
    <div className="overlay">
      <div className="details-wrapper" ref={wrapperRef}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="details-container">
          <div className='details-cover'>
            <img src={book.Cover || noCover} className="book-cover" />
          </div>
          <div className="book-info">
            <h2>{book.Title}</h2>
            <h3>{book.Creators}</h3>
            <p>{book.Description}</p>
            <p>Publisher: {book.Publisher}</p>
            <p>Published: {book.Publish_Date}</p>
            <p>Pages: {book.Length}</p>
            <p>ISBN: {book.Ean_Isbn13}</p>
            <p>Notes: {book.Notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;