import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

const useAllBooks = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
            .from('Books')
            .select('*')
            .order('Title', { ascending: true });

            if (error) {
                setError(error)
            }
            if (data) {
                setBooks(data)
            }
            setLoading(false)
        }
        fetchBooks();
    }, []);

    return { loading, error, books };
};

export default useAllBooks;