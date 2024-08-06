import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useBooks = (genreId) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
            .from('BookGenres')
            .select(`
                Books (
                    id,
                    Title,
                    Creators,
                    Description
                )
            `)
            .eq('Genre_Id', genreId)

            if (error) {
                console.error('error fetching books by genre', error)
            }
            if (data) {
                const bookForSet = data.map(entry => entry.Books)
                setBooks(bookForSet)
            }
        }
        fetchBooks();
    }, [genreId]);

    return books;
}

export default useBooks;