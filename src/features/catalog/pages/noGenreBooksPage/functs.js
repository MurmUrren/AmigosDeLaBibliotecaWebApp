import supabase from "@config/supabaseClient";

export const assignGenreToBook = async (books_id, genreId) => {
    const { data, error } = await supabase
        .from('BookGenres')
        .insert(books_id.map(id => ({ Book_Id: id, Genre_Id: genreId })))

    if (error) {
        console.error('error assigning genre to book', error)
    }

    if (data) {
        console.log('genre assigned to book successfully', data)
    }
    
};