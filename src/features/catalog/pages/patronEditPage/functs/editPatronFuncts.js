import supabase from "@config/supabaseClient";

export const savePatron = async (patron) => {
    const { data, error } = await supabase
        .from('Patrons')
        .upsert(patron)

    if (error) {
        console.error('error saving patron', error)
        return false;
    }
    if (data) {
        console.log('patron saved', data)
        return true;
    }
}