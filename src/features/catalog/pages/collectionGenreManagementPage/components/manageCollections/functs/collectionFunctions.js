import supabase from "@config/supabaseClient";

export const deleteCollection = async (collectionId) => {
    const { data, error } = await supabase
        .from('Collections')
        .delete()
        .eq('id', collectionId)

    if (error) {
        console.error('error deleting collection by id', error)
    }
    if (data) {
        console.log('collection deleted successfully', data)
    }
};

export const updateCollection = async (collectionId, collectionData) => {
    const { data, error } = await supabase
        .from('Collections')
        .update(collectionData)
        .eq('id', collectionId)

    if (error) {
        console.error('error updating collection by id', error)
    }
    if (data) {
        console.log('collection updated successfully', data)
    }
};

export const createCollection = async (collectionData) => {
    console.log('collectionData', collectionData)
    const { data, error } = await supabase
        .from('Collections')
        .insert(collectionData)

    if (error) {
        console.error('error creating collection', error)
    }
    if (data) {
        console.log('collection created successfully', data)
    }
};