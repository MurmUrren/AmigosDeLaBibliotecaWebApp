import { useState, useEffect } from 'react';
import supabase from "../../../config/supabaseClient";

const useNoGenreBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch BookGenres
                const { data: bookGenres, error: bookGenresError } = await supabase
                    .from('BookGenres')
                    .select('*');

                if (bookGenresError) throw bookGenresError;

                // Fetch Books
                const { data: bookL, error: booksError } = await supabase
                    .from('Books')
                    .select('*');

                if (booksError) throw booksError;

                console.log('bookL', bookL);
                console.log('bookGenres', bookGenres);

                const joinedData = bookL
                    .filter(book => !bookGenres.some(bg => bg.Book_Id === book.id))
                    .map(book => book);

                setBooks(joinedData);
            } catch (error) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return { books, loading, error };
};

export default useNoGenreBooks;