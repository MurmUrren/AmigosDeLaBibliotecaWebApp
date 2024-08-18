import { useState, useEffect } from 'react';
import supabase from '@config/supabaseClient';

const usePatrons = (startDate, endDate) => {
    const [patrons, setPatrons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatrons = async () => {
            let query = supabase
                .from('Patrons')
                .select('*');

            if (startDate && endDate) {
                query = query.gte('created_at', startDate).lte('created_at', endDate);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching patrons', error);
            }
            if (data) {
                setPatrons(data);
                setLoading(false);
            }
        };

        fetchPatrons();
    }, [startDate, endDate]);

    return { patrons, loading };
};

export default usePatrons;
