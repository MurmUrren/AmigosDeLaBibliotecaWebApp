import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useAllBarCodes = () => {
    const [barcodes, setBarCodes] = useState([]);

    const fetchBarCodes = async () => {
        const { data, error } = await supabase
            .from('Barcodes')
            .select('*');

        if (error) {
            console.error('Error fetching barcodes', error);
        }
        if (data) {
            setBarCodes(data);
        }
    };

    useEffect(() => {
        fetchBarCodes();
    }, []);

    return {
        barcodes,
        refetch: fetchBarCodes, // Return the refetch function
    };
};

export default useAllBarCodes;
