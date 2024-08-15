import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, message }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value); // Llama a la función de búsqueda cada vez que cambia el valor de entrada
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <i className="search-icon"></i>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder={message}
        />
      </div>
    </div>
  );
}

export default SearchBar;