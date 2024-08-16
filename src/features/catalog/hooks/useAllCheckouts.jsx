import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

const useAllCheckouts = () => {
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        const fetchCheckouts = async () => {
            const { data, error } = await supabase
            .from('Checkouts')
            .select('*')

            if (error) {
                console.error('error fetching checkouts', error)
            }
            if (data) {
                setCheckouts(data)
            }
        }
        fetchCheckouts();
    }, []);

    return checkouts;
};

export default useAllCheckouts;