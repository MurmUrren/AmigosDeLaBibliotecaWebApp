import React from 'react';
import './BookDetails.css';
import BookCover from '../bookCover/BookCover';
import noCover from '../../../../assets/imgs/noCover.jpeg';
function BookDetails ({ book, onClose }){
    return (
        <div className="overlay">
          <div className="details-wrapper">
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
                    <p>Publiser: {book.Publisher}</p>
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