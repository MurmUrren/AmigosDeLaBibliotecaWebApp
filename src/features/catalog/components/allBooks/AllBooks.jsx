import React, { useEffect, useState } from 'react';

import BookCover from '@components/bookCover/BookCover';
import useAllBooks from "@hooks/useAllBooks";

const AllBooks = () => {
    const { loading, error, books } = useAllBooks();
    const [actualBooks, setActualBooks] = useState(books);

    useEffect(() => {
        setActualBooks(books);
    }, [books]);

    const booksByLetter = Object.entries(books.reduce((acc, book) => {
        const letter = book.Title[0].toUpperCase();
        if (!acc[letter]) {
            acc[letter] = [];
        }
        acc[letter].push(book);
        return acc;
    }, {})).sort(([a], [b]) => a.localeCompare(b)).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    return (
        <div className='w-4/5'>
            <div className="mx-auto my-6 flex gap-3 w-1/2 overflow-x-auto no-scrollbar">
                {loading && <p>Cargando menu...</p>}
                {error && <p>Error: {error.message}</p>}
                <button
                    className={`text-white bg-blue-500 px-3 py-1 rounded-lg focus:outline-none bg-blue-950`}
                    onClick={() => setActualBooks(books)}
                >
                    ALL
                </button>
                {Object.keys(booksByLetter).map((letter, index) => (
                    <button
                        key={index}
                        className={`text-white bg-blue-500 px-3 py-1 rounded-lg focus:outline-none ${actualBooks === index ? 'bg-blue-700' : ''}`}
                        onClick={() => setActualBooks(booksByLetter[letter])}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="w-full h-80 overflow-scroll scroll-smooth no-scrollbar">
                {actualBooks?.map((book, index) => (
                    <div id={book.Title[0]} className="flex gap-6 my-2" key={index}>
                        <div className="size-16">
                            <BookCover url={book.url_cover} />
                        </div>
                        <h2>{book.Title[0]}</h2><p>-</p><h2>{book.Title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
