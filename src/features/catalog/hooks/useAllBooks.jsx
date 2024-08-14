import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useAllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
            .from('Books')
            .select('*')

            if (error) {
                console.error('error fetching books', error)
            }
            if (data) {
                setBooks(data)
            }
        }
        fetchBooks();
    }, []);
    return books;
};

export default useAllBooks;