import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

const useBarcode = (bookBarcode) => {
    const [bookData, setBookData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchBookData = async () => {
            try {
                const { data, error } = await supabase
                    .from('Barcodes')
                    .select('*')
                    .eq('barcode', bookBarcode);

                if (error) {
                    console.error('Error fetching book data based on barcode', error);
                } else if (data && data.length > 0) {
                    if (isMounted) {
                        setBookData(data[0]);
                    }
                } else {
                    console.warn('No data found for the given barcode');
                }
            } catch (err) {
                console.error('Unexpected error fetching book data', err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchBookData();

        return () => {
            isMounted = false;
        };
    }, [bookBarcode]);

    return { bookData, loading };
};

export default useBarcode;