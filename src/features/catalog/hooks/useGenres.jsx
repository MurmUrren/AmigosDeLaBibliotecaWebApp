import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useGenres = (collectionId) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenresData = async () => {
            if (!collectionId) return;

            const { data, error } = await supabase
                .from('Genres')
                .select()
                .eq('Collection_Id', collectionId)

            if (error) {
                console.error('error fetching genres', error)
            }
            if (data) {
                setGenres(data)
            }
        }
        fetchGenresData();
    }, [collectionId]);

    return genres;
};

export default useGenres;