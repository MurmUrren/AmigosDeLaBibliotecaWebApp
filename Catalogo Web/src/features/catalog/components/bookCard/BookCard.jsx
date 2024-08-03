import React from 'react';
import './BookCard.css';
import noCover from '../../../../assets/imgs/noCover.jpeg';

function BookCard({ book, bookCoverURL }) {
  return (
    <div className="book-item">
      <img src={bookCoverURL || noCover} alt={`${book.title} cover`} className="book-cover" />
      <h2 className="book-title">{book.title}</h2>
      <h3 className="book-author">{book.author}</h3>
      <p className="book-description">{book.description}</p>
    </div>
  );
}

export default BookCard;
