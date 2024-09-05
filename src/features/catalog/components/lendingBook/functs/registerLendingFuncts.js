import supabase from "@config/supabaseClient";

export const getBook = async (bookBarcode) => {
    try {
        const { data, error } = await supabase
            .from('Barcodes')
            .select('*')
            .eq('barcode', bookBarcode);

        if (error) {
            console.error('Error fetching book data based on barcode', error);
        } else if (data && data.length > 0) {
            return data[0];
        } else {
            console.warn('No data found for the given barcode');
            return [];
        }
    } catch (err) {
        console.error('Unexpected error fetching book data', err);
    }
    return [];

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
        return true;
    }
};

export const isBookAvailable = async (bookBarcode) => {
    const { data, error } = await supabase
        .from("Checkouts")
        .select('*')
        .eq('book_barcode', bookBarcode)

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

export const getPatron = async (patronBarcode) => {
    try {
        const { data, error } = await supabase
            .from('Patrons')
            .select('*')
            .eq('barcode', patronBarcode);

        if (error) {
            console.error('Error fetching patron data based on barcode', error);
        } else if (data && data.length > 0) {
            return data[0];
        } else {
            console.warn('No data found for the given barcode');
            return {};
        }
    } catch (err) {
        console.error('Unexpected error fetching patron data', err);
    }
    return {};
};