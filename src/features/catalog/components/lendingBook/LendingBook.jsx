import React, { useState } from 'react';
import useBarcode from '@hooks/useBarcode';
import usePatronBarcode from '@hooks/usePatronBarcode';
import { registerLending, isBookAvailable, getBook, getPatron } from './functs/registerLendingFuncts';
// import useBookCover from '@hooks/useBookCover';
// import noCover from '@assets/imgs/noCover.jpeg';
// import BookCover from '@components/bookCover/BookCover';
import './LendingBook.css';

const LendingBook = () => {
    const current = new Date();
    const [bookBarcode, setBookBarcode] = useState('');
    const [books, setBooks] = useState([]);
    const [patronBarcode, setPatronBarcode] = useState('');
    const [isPatronAdded, setIsPatronAdded] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);
    const [patronData, setPatronData] = useState({});
    const [patronLoading, setPatronLoading] = useState(false);

    // const { bookData, loading: bookLoading } = useBarcode(bookBarcode);
    // const { patronData, loading: patronLoading } = usePatronBarcode(patronBarcode);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const checkoutDate = formatDate(current);
    const dueDate = formatDate(new Date(current.setDate(current.getDate() + 14))); // Example due date: 1 day after checkout

    const handleAddBook = async () => {
        setBookLoading(true);
        let availability = await isBookAvailable(bookBarcode);
        if (!availability) {
            alert('Book is not available');
            setBookBarcode('');
            setBookLoading(false);
            return
        }
        const fetchedBookData = await getBook(bookBarcode);
        console.log('Fetched Book Data:', fetchedBookData);
        if (fetchedBookData && fetchedBookData.barcode) {
            setBooks([...books, fetchedBookData]);
            setBookBarcode('');
        }
        setBookLoading(false);
    };

    const handleAddPatron = async () => {
        const fetchedPatronData = await getPatron(patronBarcode);
        // console.log('Fetched Patron Data:', fetchedPatronData);
        if (Object.keys(fetchedPatronData).length > 0) {
            setPatronData(fetchedPatronData);
            setIsPatronAdded(true);
        } else {
            alert('Patron not found');
        }
    };

    const handleCheckout = async () => {
        console.log('Books to Checkout:', books);
        console.log('Patron Data:', patronData);

        const lendingArray = books.map((book) => ({
            patron_barcode: patronData.barcode,
            book_barcode: book.barcode,
            checked_out: checkoutDate,
            due_date: dueDate,
        }));

        // Assuming registerLending can handle an array of lending objects
        for (let lending of lendingArray) {
            let status = await registerLending(lending);
            console.log('Lending status:', status);
        }
    };

    return (
        <div className="container">
            <div>
                <h3>Add Book Barcode</h3>
                <input
                    type="text"
                    value={bookBarcode}
                    onChange={(e) => setBookBarcode(e.target.value)}
                    placeholder="Enter book barcode"
                    className="input"
                />
                <button id="lending" onClick={handleAddBook} disabled={!bookBarcode}>
                    {bookLoading ? 'Loading...' : 'Add Book'}
                </button>
                <div>
                    {books.map((book, index) => (
                        <div key={index} className="card" id="book">
                            {/* <BookCover url={book.coverURL || noCover} /> */}
                            <p>{book.title} by {book.creators}</p>
                            <p>ISBN: {book.ean_isbn13}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3>Patron Barcode</h3>
                <input
                    type="text"
                    value={patronBarcode}
                    onChange={(e) => setPatronBarcode(e.target.value)}
                    placeholder="Enter patron barcode"
                    className="input"
                    disabled={isPatronAdded}
                />
                <button id="lending" onClick={handleAddPatron} disabled={!patronBarcode || isPatronAdded || patronLoading}>
                    {patronLoading ? 'Loading...' : 'Add Patron'}
                </button>
                {isPatronAdded && (
                    <div className="card" id="patron">
                        <p>{patronData.first_name} {patronData.last_name}</p>
                        <p>Email: {patronData.email || 'N/A'}</p>
                        <p>Barcode: {patronData.barcode}</p>
                    </div>
                )}
            </div>
            <div>
                <h3>Checkout Date</h3>
                {checkoutDate}
            </div>
            <div>
                <h3>Due Date</h3>
                {dueDate}
            </div>
            <div className="align-center">
                <button id="lending" onClick={handleCheckout} disabled={!isPatronAdded || books.length === 0}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default LendingBook;