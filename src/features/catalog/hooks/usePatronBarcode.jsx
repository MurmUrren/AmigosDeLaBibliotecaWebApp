import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

const usePatronBarcode = (patronBarcode) => {
    const [patronData, setPatronData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchPatronData = async () => {
            try {
                const { data, error } = await supabase
                    .from('Patrons')
                    .select('*')
                    .eq('barcode', patronBarcode);

                if (error) {
                    console.error('Error fetching patron data based on barcode', error);
                } else if (data && data.length > 0) {
                    if (isMounted) {
                        setPatronData(data[0]);
                    }
                } else {
                    console.warn('No data found for the given barcode');
                }
            } catch (err) {
                console.error('Unexpected error fetching patron data', err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPatronData();

        return () => {
            isMounted = false;
        };
    }, [patronBarcode]);

    return { patronData, loading };
};

export default usePatronBarcode;