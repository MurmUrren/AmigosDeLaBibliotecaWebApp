import React from 'react';
import noCover from '../../../../assets/imgs/noCover.jpeg';

const BookCover = ({ url }) => {
  return (
    <img src={url || noCover} alt="Book Cover" />
  );
};

export default BookCover;
