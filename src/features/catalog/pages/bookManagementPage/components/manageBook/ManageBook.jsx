import { useState } from "react";
import useAllGenres from "@hooks/useAllGenres";
import supabase from "@config/supabaseClient";
import BookCard from "@components/bookCard/BookCard";
import "./ManageBook.css";
import GenreList from "../genreList/GenreList";
import BarcodeScanner from '../barcodeScanner/BarcodeScanner';
import BookDataForm from "./bookDataForm/BookDataForm";
import { addGenreToBook, removeGenreFromBook, deleteBook } from "./functs/functs";

function ManageBook() {
    const allGenres = useAllGenres();
    const [isbn13, setIsbn13] = useState('');
    const [book, setBook] = useState({});
    const [bookGenres, setBookGenres] = useState([]);
    const [enableButtons, setEnableButtons] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [qrScannerActive, setQrScannerActive] = useState(false);

    const [bookTitle, setBookTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [description, setDescription] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [length, setLength] = useState('');

    const setToDefault = () => {
        setIsbn13('');
        setBook({});
        setBookGenres([]);
        setSelectedGenres([]);
        setEnableButtons(false);
        setBookTitle('');
        setAuthorName('');
        setDescription('');
        setPublisher('');
        setPublishedDate('');
        setLength('');
    };

    const fetchBookGenres = async (bookId) => {
        const { data, error } = await supabase
            .from('BookGenres')
            .select(`
                Genres (
                    *
                )
            `)
            .eq('Book_Id', bookId);
        if (error) {
            console.error('error fetching book genres', error);
        }
        if (data) {
            const genresForSet = data.map(entry => entry.Genres);
            setBookGenres(genresForSet.map(genre => genre.id));
            setSelectedGenres(genresForSet.map(genre => genre.id));
        }
    };

    const fetchBook = async () => {
        const { data, error } = await supabase
            .from('Books')
            .select('*')
            .eq('Ean_Isbn13', isbn13);
        if (error) {
            console.error('error fetching book by isbn13', error);
        }
        if (data) {
            if (data.length > 0) {
                const bookData = data[0];
                setBook(bookData);
                setEnableButtons(true);
                fetchBookGenres(bookData.id);
                setBookTitle(bookData.Title);
                setAuthorName(bookData.Creators);
                setDescription(bookData.Description);
                setPublisher(bookData.Publisher);
                setPublishedDate(bookData.Publish_Date);
                setLength(bookData.Length);
            } else {
                alert('No book found');
            }
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

    const saveBookGenres = async () => {
        bookGenres.map(genreId => {
            if (!selectedGenres.includes(genreId)) {
                removeGenreFromBook(book.id, genreId);
            }
        });
        selectedGenres.map(genreId => {
            if (!bookGenres.includes(genreId)) {
                addGenreToBook(book.id, genreId);
            }
        });
    };

    const saveBook = async () => {
        setEnableButtons(false);
        const { data, error } = await supabase
            .from('Books')
            .update({
                Title: bookTitle,
                Creators: authorName,
                Description: description,
                Publisher: publisher,
                Publish_Date: publishedDate,
                Length: length
            })
            .eq('Ean_Isbn13', isbn13)
            .select();
        if (error) {
            console.error('error updating book', error);
        }
        if (data) {
            console.log('book updated successfully', data);
            saveBookGenres();
            setToDefault();
        }
    };

    const handleDeleteBook = async () => {
        deleteBook(isbn13);
        setToDefault();
    };

    const getScannerISBN = (isbn) => {
        setIsbn13(isbn);
    };

    return (
        <div className="delete-book-container">
            <h1>Modificar libro</h1>
            {qrScannerActive &&
                <BarcodeScanner getScannerISBN={getScannerISBN} />
            }
            <button className='add-book-button' onClick={() => setQrScannerActive(!qrScannerActive)}>
                {qrScannerActive ? 'Cerrar Escaner' : 'Escanear ISBN'}
            </button>
            <div className="delete-book-input-group">
                <input
                    type="text"
                    value={isbn13}
                    onChange={(e) => setIsbn13(e.target.value)}
                    className="delete-book-input"
                    placeholder="ISBN13"
                />
                <button onClick={fetchBook} className="search-book-button">Buscar Libro</button>
                <button onClick={setToDefault} className="reset-book-button" disabled={!enableButtons}>Resetear</button>
            </div>
            <div className="delete-book-result">
                {book && Object.keys(book).length > 0 ? (
                    <>
                        <BookCard book={book} />
                        <BookDataForm
                            bookTitle={bookTitle}
                            setBookTitle={setBookTitle}
                            authorName={authorName}
                            setAuthorName={setAuthorName}
                            description={description}
                            setDescription={setDescription}
                            publisher={publisher}
                            setPublisher={setPublisher}
                            publishedDate={publishedDate}
                            setPublishedDate={setPublishedDate}
                            length={length}
                            setLength={setLength}
                        />
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
                    onClick={handleDeleteBook}
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