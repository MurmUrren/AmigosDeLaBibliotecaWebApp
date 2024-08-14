import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

const usePatron = (patronId) => {
    const [patron, setPatron] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatron = async () => {
            const { data, error } = await supabase
                .from('Patrons')
                .select('*')
                .eq('id', patronId)

            if (error) {
                console.error('error fetching patron', error)
            }
            if (data) {
                setPatron(data[0])
                setLoading(false)
            }
        }

        fetchPatron();
    }, [patronId])

    return { patron, loading }
};

export default usePatron;