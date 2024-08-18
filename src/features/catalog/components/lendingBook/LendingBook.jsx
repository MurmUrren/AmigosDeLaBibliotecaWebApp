import React, { useState } from 'react';
import useBarcode from '@hooks/useBarcode';
import usePatronBarcode from '@hooks/usePatronBarcode';
import { registerLending, isBookAvailable, getBook, getPatron } from './functs/registerLendingFuncts';
import RemoveButton from '../buttons/RemoveButton';
// import useBookCover from '@hooks/useBookCover';
// import noCover from '@assets/imgs/noCover.jpeg';
// import BookCover from '@components/bookCover/BookCover';
import './LendingBook.css';

const LendingBook = () => {

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const current = new Date();
    const maxDueDate = new Date(current.getTime() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now

    const [bookBarcode, setBookBarcode] = useState('');
    const [books, setBooks] = useState([]);
    const [patronBarcode, setPatronBarcode] = useState('');
    const [isPatronAdded, setIsPatronAdded] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);
    const [patronData, setPatronData] = useState({});
    const [patronLoading, setPatronLoading] = useState(false);
    const [dueDate, setDueDate] = useState(formatDate(maxDueDate)); // Initialize due date to 2 weeks from today

    const checkoutDate = formatDate(current);

    const handleDueDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        if (selectedDate < current) {
            setDueDate(formatDate(current));
        } else if (selectedDate > maxDueDate) {
            setDueDate(formatDate(maxDueDate));
        } else {
            setDueDate(e.target.value);
        }
    };

    const handleAddBook = async () => {
        setBookLoading(true);
        let availability = await isBookAvailable(bookBarcode);
        if (!availability) {
            alert('Book is already lent out');
            setBookBarcode('');
            setBookLoading(false);
            return;
        }
        const fetchedBookData = await getBook(bookBarcode);
        console.log('Fetched Book Data:', fetchedBookData);
        if (fetchedBookData.length === 0) {
            alert('Book not found');
        } else if (fetchedBookData && fetchedBookData.barcode) {
            setBooks([...books, fetchedBookData]);
            setBookBarcode('');
        }
        setBookLoading(false);
    };

    const handleRemoveBook = (barcode) => {
        setBooks(books.filter((book) => book.barcode !== barcode));
    };

    const handleAddPatron = async () => {
        const fetchedPatronData = await getPatron(patronBarcode);
        if (Object.keys(fetchedPatronData).length > 0) {
            setPatronData(fetchedPatronData);
            setIsPatronAdded(true);
        } else {
            alert("Patron doesn't exist");
        }
    };

    const handleRemovePatron = () => {
        setPatronData({});
        setIsPatronAdded(false);
        setPatronBarcode('');
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

        for (let lending of lendingArray) {
            let status = await registerLending(lending);
            console.log('Lending status:', status);
        }
    };

    return (
        <div className="lending-container">
            <div className="book-lending-container">
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
                <div className="book-lend-card-container">
                    {books.map((book, index) => (
                        <div key={index} className="card" id="book">
                            <RemoveButton onClick={() => handleRemoveBook(book.barcode)}>×</RemoveButton>
                            {/* <BookCover url={book.coverURL || noCover} /> */}
                            <p>{book.title} by {book.creators}</p>
                            <p>ISBN: {book.ean_isbn13}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="patron-lending-container">
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
                        <RemoveButton onClick={handleRemovePatron}></RemoveButton>
                        <p>{patronData.first_name} {patronData.last_name}</p>
                        <p>Email: {patronData.email || 'N/A'}</p>
                        <p>Barcode: {patronData.barcode}</p>
                    </div>
                )}
            </div>
            <div className='date-container'>
                <div>
                    <h3>Checkout Date</h3>
                    {checkoutDate}
                </div>
                <div>
                    <h3>Due Date</h3>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        min={checkoutDate}
                        max={formatDate(maxDueDate)}
                    />
                </div>
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
