import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useAllBarCodes = (startDate, endDate) => {
    const [barcodes, setBarCodes] = useState([]);

    const fetchBarCodes = async () => {
        const { data, error } = await supabase
            .from('Barcodes')
            .select('*');

        if (startDate && endDate) {
            query = query.gte('created_at', startDate).lte('created_at', endDate);
        }    

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
