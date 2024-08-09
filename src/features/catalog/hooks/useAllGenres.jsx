import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useAllGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const { data, error } = await supabase
            .from('Genres')
            .select('*')

            if (error) {
                console.error('error fetching genres', error)
            }
            if (data) {
                setGenres(data)
            }
        }
        fetchGenres();
    }, []);
    return genres;
};

export default useAllGenres;