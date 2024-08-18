import supabase from '@config/supabaseClient';

export const bookExistsF = async (isbn) => {
    const { data, error } = await supabase
        .from('Books')
        .select('Ean_Isbn13')
        .eq('Ean_Isbn13', isbn);
    
    if (error) {
        console.log('Error checking if book exists: ', error.message);
    }

    return data.length > 0;
};

export const fetchBook = async (isbn) => {
    const { data, error } = await supabase
        .from('Books')
        .select('*')
        .eq('Ean_Isbn13', isbn);

    if (error) {
        console.log('Error fetching book: ', error.message);
    }

    if (data) {
        return data[0];
    }

    return data;
};

export const updateBookCopies = async (isbn, copies) => {
    const { data, error } = await supabase
        .from('Books')
        .update({ Copies: copies })
        .eq('Ean_Isbn13', isbn);

    if (error) {
        console.log('Error updating book copies: ', error.message);
    }

    return data;
};