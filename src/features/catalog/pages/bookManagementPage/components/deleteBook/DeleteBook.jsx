import { useState, useEffect } from "react";
import supabase from "@config/supabaseClient";
import BookCard from "@components/bookCard/BookCard";
import "./DeleteBook.css";

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
        <div className="delete-book-container">
            <h1>Eliminar libro</h1>
            <div className="delete-book-input-group">
                <input
                    type="text"
                    value={isbn13}
                    onChange={(e) => setIsbn13(e.target.value)}
                    className="delete-book-input"
                    placeholder="ISBN13"

                />
                <button onClick={fetchBook} className="delete-book-button">Buscar Libro</button>
            </div>
            <div className="delete-book-result">
                {book && Object.keys(book).length > 0 ? (
                    <BookCard book={book} />
                ) : (
                    <h2>No book found</h2>
                )}
            </div>
            <div className="delete-book-action">
                <button 
                    onClick={deleteBook}
                    disabled={!enableDelete}
                    className="delete-book-button"
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
}

export default DeleteBook;
