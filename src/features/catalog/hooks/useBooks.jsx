import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

// Hook personalizado para obtener libros por género
const useBooks = (genreId) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);
            
            const { data, error } = await supabase
                .from('BookGenres')
                .select(`
                    Books (
                        *
                    )
                `)
                .eq('Genre_Id', genreId);

            if (error) {
                console.error('Error fetching books by genre', error);
                setError(error.message);
            }
            
            if (data) {
                const bookForSet = data.map(entry => entry.Books);
                setBooks(bookForSet);
            }

            setLoading(false);
        };

        fetchBooks();
    }, [genreId]);

    return { books, loading, error };
};

// Función para actualizar la URL de la portada de un libro
const updateUrlCover = async (id, url) => {
    try {
        const { data, error } = await supabase
            .from('Books')
            .update({ url_cover: url })
            .eq('id', id);

        if (error) {
            console.error('Error updating URL cover', error);
            return -1;
        }

        console.log('URL cover updated', data);
        return 1;

    } catch (error) {
        console.error('Unexpected error updating URL cover', error);
        return -1;
    }
};

export { useBooks, updateUrlCover };
