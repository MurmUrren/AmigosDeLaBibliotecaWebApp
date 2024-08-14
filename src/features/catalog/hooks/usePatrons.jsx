import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

const usePatrons = () => {
    const [patrons, setPatrons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatrons = async () => {
            const { data, error } = await supabase
                .from('Patrons')
                .select('*')

            if (error) {
                console.error('error fetching patrons', error)
            }
            if (data) {
                setPatrons(data)
                setLoading(false)
            }
        }

        fetchPatrons();
    }, [])

    return { patrons, loading }
};

export default usePatrons;