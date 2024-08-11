import React, { useState, useMemo, useEffect } from 'react';
import useNoGenreBooks from "@hooks/useNoGenreBooks";
import useAllGenres from "@hooks/useAllGenres";
import Pagination from "@components/pagination/Pagination";
import { assignGenreToBook } from './functs';

function NoGenreBooksPage() {
    const {books, loading, error } = useNoGenreBooks();
    const genres = useAllGenres();
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 20;
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleCheckboxChange = (bookId) => {
        setSelectedBooks((prevSelectedBooks) =>
            prevSelectedBooks.includes(bookId)
                ? prevSelectedBooks.filter((id) => id !== bookId)
                : [...prevSelectedBooks, bookId]
        );
    };

    // useEffect(() => {
    //     console.log('selectedBooks', selectedBooks);
    //     console.log('selectedGenre', selectedGenre);
    //     console.log('books', books);
    // }, [selectedBooks, selectedGenre]);

    const handleAssignGenre = async() => {
        if (selectedBooks.length === 0 || !selectedGenre || selectedGenre === '') {
            return;
        }
        await assignGenreToBook(selectedBooks, selectedGenre);
        setSelectedBooks([]);
        setSelectedGenre(null);

        // Refetch books
        // This is not the best way to do this, but it works for now
        window.location.reload();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentBooks = useMemo(() => {
        const indexOfLastBook = currentPage * booksPerPage;
        const indexOfFirstBook = indexOfLastBook - booksPerPage;
        return books.slice(indexOfFirstBook, indexOfLastBook);
      }, [currentPage, books]);

    return (
        <div>
            <h1>Books with no genre</h1>
            <Pagination
                currentPage={currentPage}
                totalCount={books.length}
                pageSize={booksPerPage}
                onPageChange={handlePageChange}
            />
            <div>
                <div>
                    <ul>
                        {currentBooks.map((book) => (
                            <li key={book.id}>
                            <input
                                type="checkbox"
                                checked={selectedBooks.includes(book.id)}
                                onChange={() => handleCheckboxChange(book.id)}
                            />
                            <h5>{book.Title}</h5>
                        </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        required={true}
                    >
                        <option value=""></option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.Title}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAssignGenre}>Assign Genre</button>
            </div>
        </div>
    );
}

export default NoGenreBooksPage;