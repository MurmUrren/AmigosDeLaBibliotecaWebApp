import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient"; // Adjust the import path as needed

const useAllBarCodes = (startDate, endDate) => {
    const [barcodes, setBarCodes] = useState([]);

    const fetchBarCodes = async () => {
        let query = supabase
            .from('Barcodes')
            .select('*');

        if (startDate && endDate) {
            query = query.gte('created_at', startDate).lte('created_at', endDate);
            console.log('Fetching barcodes from', startDate, 'to', endDate);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching barcodes', error);
        } else if (data) {
            setBarCodes(data);
        }
    };

    useEffect(() => {
        fetchBarCodes();
    }, [startDate, endDate]); // Re-fetch when dates change

    return {
        barcodes,
        refetch: fetchBarCodes,
    };
};

export default useAllBarCodes;
