import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useAllBarCodes = () => {
    const [barcodes, setBarCodes] = useState([]);

    useEffect(() => {
        const fetchBarCodes = async () => {
            const { data, error } = await supabase
            .from('Barcodes')
            .select('*')

            if (error) {
                console.error('error fetching barCodes', error)
            }
            if (data) {
                setBarCodes(data)
            }
        }
        fetchBarCodes();
    }, []);
    return barcodes;
};

export default useAllBarCodes;