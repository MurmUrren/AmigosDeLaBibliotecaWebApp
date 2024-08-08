import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

//update views of genre id
const updateViews = async (genreId) => {
    //get the genre
    const { data, error } = await supabase
        .from('Genres')
        .select('Views')
        .eq('id', genreId)

    //increment the views
    const views = data[0].Views + 1;
    const { data: updatedData, error: updateError } = await supabase
        .from('Genres')
        .update({ Views: views })
        .eq('id', genreId)

    if (error) {
        console.error('error updating views', error)
    }
    if (data) {
        // console.log('views updated', data)
    }
}

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
                //sort genres by title
                data.sort((a, b) => a.Title.localeCompare(b.Title));
                setGenres(data)
            }
        }
        fetchGenresData();
    }, [collectionId]);

    return  genres;
};

const getTopViews = (collectionId) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenresData = async () => {
            if (!collectionId) return;

            const { data, error } = await supabase
                .from('Genres')
                .select()
                .eq('Collection_Id', collectionId)
                .order('Views', { ascending: false })
                .limit(10)

            if (error) {
                console.error('error fetching genres', error)
            }
            if (data) {
                //sort genres by title
                setGenres(data)
            }
        }
        fetchGenresData();
    }, [collectionId]);

    return  genres;
}

export default {useGenres, updateViews, getTopViews};