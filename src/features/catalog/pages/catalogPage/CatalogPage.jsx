import React, { useState, useMemo } from 'react';
import { useBooks } from '@hooks/useBooks';
import { useParams } from 'react-router';
import './CatalogPage.css';
import SearchBar from '@components/searchBar/SearchBar';
import BookCard from '@components/bookCard/BookCard';
import Pagination from '@components/pagination/Pagination';

const CatalogPage = () => {
  const { genreId } = useParams();
  const { books, loading, error } = useBooks(genreId);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBooks = useMemo(() => {
    if (!searchTerm) {
      return books;
    }
    return books.filter(book =>
      book.Title && book.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  const currentBooks = useMemo(() => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  }, [currentPage, filteredBooks]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Cargando libros...</div>; // Spinner o indicador de carga
  }

  if (error) {
    return <div>Error al cargar los libros: {error}</div>; // Mostrar mensaje de error
  }

  return (
    <div className="book-list-container">
      <SearchBar onSearch={handleSearch} message="Buscar libros por título..." />
      <Pagination
        currentPage={currentPage}
        totalCount={filteredBooks.length}
        pageSize={booksPerPage}
        onPageChange={handlePageChange}
      />
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          currentBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <h1>No se encontraron libros</h1>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={filteredBooks.length}
        pageSize={booksPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CatalogPage;
