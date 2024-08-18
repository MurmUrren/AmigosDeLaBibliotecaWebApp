import supabase from "@config/supabaseClient";

export const check_in = async (checkout) => {
    const { data, error} = await supabase
    .from('Checkins')
    .insert([
        {
            patron_barcode: checkout.patron_barcode,
            book_barcode: checkout.book_barcode,
            checked_in: new Date().toISOString()
        }
    ])
    .select()

    if (error) {
        console.error('error checking in', error)
        return false;
    }
    if (data) {
        console.log('checked in', data)
        const status = await _removeCheckout(checkout); // lo hace instantaneamente, revisar
        return data[0];
    }
};

const _removeCheckout = async (checkout) => {
    const { data, error } = await supabase
    .from('Checkouts')
    .delete()
    .eq('id', checkout.id)

    if (error) {
        console.error('error removing checkout', error)
        return false;
    }
    if (data) {
        console.log('checkout removed', data)
        return true;
    }
};