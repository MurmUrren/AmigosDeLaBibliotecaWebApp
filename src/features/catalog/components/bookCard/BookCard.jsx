import React from 'react';
import './BookCard.css';
import noCover from '../../../../assets/imgs/noCover.jpeg';

function BookCard({ book, bookCoverURL }) {
  return (
    <div className="book-item">
      <img src={bookCoverURL || noCover} alt={`${book.Title} cover`} className="book-cover" />
      <h2 className="book-title">{book.Title}</h2>
      <h3 className="book-author">{book.Creators}</h3>
      <p className="book-description">{book.Description}</p>
    </div>
  );
}

export default BookCard;
