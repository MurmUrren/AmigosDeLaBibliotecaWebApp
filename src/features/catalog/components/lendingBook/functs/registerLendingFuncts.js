import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";

export const getBook = async () => {
    const [bookData, setBookData] = useState({});
    const [loading, setLoading] = useState(true);

    try {
        const { data, error } = await supabase
            .from('Barcodes')
            .select('*')
            .eq('barcode', bookBarcode);

        if (error) {
            console.error('Error fetching book data based on barcode', error);
        } else if (data && data.length > 0) {
            setBookData(data[0]);
        } else {
            console.warn('No data found for the given barcode');
        }
    } catch (err) {
        console.error('Unexpected error fetching book data', err);
    }

    return { bookData, loading };
};

export const registerLending = async (lending) => {
    const { data, error } = await supabase
        .from("Checkouts")
        .insert(lending)
        .select()

    if (error) {
        console.error('error creating patron', error)
        return false;
    }
    if (data) {
        console.log('patron created', data)
        return true;
    }
};

export const isBookAvailable = async (bookBarcode) => {
    const { data, error } = await supabase
        .from("Checkouts")
        .select()
        .eq('book_barcode', bookBarcode)


    console.log('data:', data)
    if (error) {
        console.error('error checking book availability', error)
        return false;
    }
    if (data) {
        if (data.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
};