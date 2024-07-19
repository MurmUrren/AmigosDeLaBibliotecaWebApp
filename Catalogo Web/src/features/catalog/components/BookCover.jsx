import React from 'react';

const BookCover = ({ url }) => {
  if (!url) return null;

  return (
    <div>
      <img src={url} alt="Book Cover" style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

export default BookCover;
