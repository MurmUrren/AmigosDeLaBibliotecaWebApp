import supabase from "@config/supabaseClient";

export const deleteGenre = async (genreId) => {
    const { data, error } = await supabase
        .from('Genres')
        .delete()
        .eq('id', genreId)

    if (error) {
        console.error('error deleting genre by id', error)
    }
    if (data) {
        console.log('genre deleted successfully', data)
    }
};

export const updateGenre = async (genreId, genreData) => {
    const { data, error } = await supabase
        .from('Genres')
        .update(genreData)
        .eq('id', genreId)

    if (error) {
        console.error('error updating genre by id', error)
    }
    if (data) {
        console.log('genre updated successfully', data)
    }
};

export const createGenre = async (genreData) => {
    console.log('genreData', genreData)
    const { data, error } = await supabase
        .from('Genres')
        .insert(genreData)

    if (error) {
        console.error('error creating genre', error)
    }
    if (data) {
        console.log('genre created successfully', data)
    }
};