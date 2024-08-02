// src/components/BookCover.jsx
import React from 'react';

const BookCover = ({ url }) => {
  if (!url || url === 'No disponible') return <p>No cover available</p>;

  return (
      <img src={url} alt="Book Cover" />
  );
};

export default BookCover;
