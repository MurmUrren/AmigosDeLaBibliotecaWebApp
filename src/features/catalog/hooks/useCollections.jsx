import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useCollections = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollectionData = async () => {
            const { data, error } = await supabase
                .from('Collections')
                .select()

            if (error) {
                console.error('error fetching collections', error)
            }
            if (data) {
                setCollections(data)
            }
        }
        fetchCollectionData();
    }, []);

    return collections;
};

export default useCollections;