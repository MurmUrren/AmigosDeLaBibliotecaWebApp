// src/components/BookCover.jsx
import React from 'react';

const BookCover = ({ url }) => {
  if (!url || url === 'No disponible') return <p>No cover available</p>;

  return (
    <div>
      <img src={url} alt="Book Cover" style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

export default BookCover;
