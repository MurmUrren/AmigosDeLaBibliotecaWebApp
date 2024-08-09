import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";
import BookCard from "@components/bookCard/BookCard";

function DeleteBook() {
    const [isbn13, setIsbn13] = useState('');
    const [book, setBook] = useState({});
    const [enableDelete, setEnableDelete] = useState(false);

    const fetchBook = async () => {
        const { data, error } = await supabase
            .from('Books')
            .select('*')
            .eq('Ean_Isbn13', isbn13)

        if (error) {
            console.error('error fetching book by isbn13', error)
        }
        if (data) {
            if (data.length !== 0) {
                setBook(data[0])
                setEnableDelete(true)
            }
        }
    };

    const deleteBook = async () => {
        setEnableDelete(false)
        const { data, error } = await supabase
            .from('Books')
            .delete()
            .eq('Ean_Isbn13', isbn13)

        if (error) {
            console.error('error deleting book by isbn13', error)
        }
        if (data) {
            console.log('book deleted successfully', data)
        }
        setEnableDelete(true)
    };

    return (
        <div>
            <h1>Deletear Libro</h1>
            <div>
                <label>ISBN13</label>
                <input
                    type="text"
                    value={isbn13}
                    onChange={(e) => setIsbn13(e.target.value)}
                />
                <button onClick={fetchBook}>Buscar Libro</button>
            </div>
            <div>
                {book && Object.keys(book).length > 0 ?
                    <BookCard book={book} />
                    : <h2>No book found</h2>
                }
            </div>
            <div>
                <button 
                    onClick={deleteBook}
                    disabled={!enableDelete}
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
}

export default DeleteBook;
