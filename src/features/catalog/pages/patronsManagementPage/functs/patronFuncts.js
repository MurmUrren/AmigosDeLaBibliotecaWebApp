import supabase from "@config/supabaseClient";

export const deletePatron = async (patronId) => {
    console.log('deleting patron', patronId)
    const { error } = await supabase
        .from('Patrons')
        .delete()
        .eq('id', patronId)

    if (error) {
        console.error('error deleting patron', error)
        return false;
    }
    return true;
};