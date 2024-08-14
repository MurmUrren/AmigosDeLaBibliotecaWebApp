import supabase from "@config/supabaseClient";

export const createPatron = async (patron) => {
    const { data, error } = await supabase
        .from('Patrons')
        .insert(patron)
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
