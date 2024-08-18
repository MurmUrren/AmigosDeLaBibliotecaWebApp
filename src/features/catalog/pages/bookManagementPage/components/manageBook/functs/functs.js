import supabase from '@config/supabaseClient';

export const addGenreToBook = async (bookId, genreId) => {
    const { data, error } = await supabase
        .from('BookGenres')
        .insert([
            {
                Book_Id: bookId,
                Genre_Id: genreId
            }
        ])
        .select();
    if (error) {
        console.error('error adding genre to book', error);
    }
    if (data) {
        console.log('genre added to book', data);
    }
};

export const removeGenreFromBook = async (bookId, genreId) => {
    const { data, error } = await supabase
        .from('BookGenres')
        .delete()
        .eq('Book_Id', bookId)
        .eq('Genre_Id', genreId)
        .select();
    if (error) {
        console.error('error removing genre from book', error);
    }
    if (data) {
        console.log('genre removed from book', data);
    }
};

export const deleteBook = async (isbn13) => {
    const { data, error } = await supabase
        .from('Books')
        .delete()
        .eq('Ean_Isbn13', isbn13);
    if (error) {
        console.error('error deleting book by isbn13', error);
    }
    if (data) {
        console.log('book deleted successfully', data);
    }
};