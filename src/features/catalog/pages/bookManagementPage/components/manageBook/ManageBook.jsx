import { useState, useEffect } from "react";
import useAllGenres from "@hooks/useAllGenres";
import supabase from "@config/supabaseClient";
import BookCard from "@components/bookCard/BookCard";
import "./ManageBook.css";
import GenreList from "../genreList/GenreList";

function ManageBook() {
    const allGenres = useAllGenres();
    const [isbn13, setIsbn13] = useState('');
    const [book, setBook] = useState({});
    const [bookGenres, setBookGenres] = useState([]);
    const [enableButtons, setEnableButtons] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        console.log('selected genres', selectedGenres)
    }, [selectedGenres])

    const fetchBookGenres = async (bookId) => {
        console.log('fetching book genres ', bookId)
        const { data, error } = await supabase
            .from('BookGenres')
            .select(`
                Genres (
                    *
                )
            `)
            .eq('Book_Id', bookId)

        if (error) {
            console.error('error fetching book genres', error)
        }
        if (data) {
            console.log('book genres', data)
            const genresForSet = data.map(entry => entry.Genres)
            setBookGenres(genresForSet.map(genre => genre.id))
            setSelectedGenres(genresForSet.map(genre => genre.id))
        }
    }

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
                setEnableButtons(true)
            }
            fetchBookGenres(data[0].id)
        }
    };

    const handleSelectGenre = (genreId) => {
        let gId = Number(genreId);
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(gId)
                ? prevSelected.filter(id => id !== gId)
                : [...prevSelected, gId]
        );
    };

    const removeGenreFromBook = async (genreId) => {
        const { data, error } = await supabase
            .from('BookGenres')
            .delete()
            .eq('Book_Id', book.id)
            .eq('Genre_Id', genreId)
            .select()

        if (error) {
            console.error('error removing genre from book', error)
        }
        if (data) {
            console.log('genre removed from book', data)
        }
    };

    const addGenreToBook = async (genreId) => {
        console.log('ggg ', genreId, ' bbb ', book.id)
        const { data, error } = await supabase
            .from('BookGenres')
            .insert([
                {
                    Book_Id: book.id,
                    Genre_Id: genreId
                }
            ])
            .select()
        
        if (error) {
            console.error('error adding genre to book', error)
        }
        if (data) {
            console.log('genre added to book', data)
        }
    };

    const saveBookGenres = async () => {
        // remove genres that were deselected
        bookGenres.map(genreId => {
            if (!selectedGenres.includes(genreId)) {
                removeGenreFromBook(genreId)
                console.log('este no pls ')
            }
        });

        // add genres that were selected
        selectedGenres.map(genreId => {
            if (!bookGenres.includes(genreId)) {
                addGenreToBook(genreId)
                console.log('ucddsiuiu ')
            }
        });
    };

    const saveBook = async () => {
        setEnableButtons(false)
        saveBookGenres()
        // set to default
        setBookGenres([])
        setSelectedGenres([])
        setBook({})
        setIsbn13('')
        setEnableButtons(true)
    };

    const deleteBook = async () => {
        setEnableButtons(false)
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
        setEnableButtons(true)
    };

    return (
        <div className="delete-book-container">
            <h1>Modificar libro</h1>
            <div className="delete-book-input-group">
                <input
                    type="text"
                    value={isbn13}
                    onChange={(e) => setIsbn13(e.target.value)}
                    className="delete-book-input"
                    placeholder="ISBN13"

                />
                <button onClick={fetchBook} className="search-book-button">Buscar Libro</button>
            </div>
            <div className="delete-book-result">
                {book && Object.keys(book).length > 0 ? (
                    <>
                        <BookCard book={book} />
                        <GenreList allGenres={allGenres} bookGenres={selectedGenres} handleSelectGenre={handleSelectGenre} />
                    </>
                ) : (
                    <h2>No book found</h2>
                )}
            </div>
            <div className="delete-book-action">
                <button
                    onClick={saveBook}
                    disabled={!enableButtons}
                    className="save-book-button"
                >
                    Guardar
                </button>
                <button
                    onClick={deleteBook}
                    disabled={!enableButtons}
                    className="delete-book-button"
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
}

export default ManageBook;
