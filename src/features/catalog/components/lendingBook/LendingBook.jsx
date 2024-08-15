import React, { useState } from 'react';
import useBarcode from '@hooks/useBarcode';
import usePatronBarcode from '@hooks/usePatronBarcode';
import { registerLending } from './functs/registerLendingFuncts'
import './LendingBook.css';

const LendingBook = () => {
    const current = new Date();
    const [bookBarcode, setBookBarcode] = useState('');
    const [books, setBooks] = useState([]);
    const [patronBarcode, setPatronBarcode] = useState('');
    const [isPatronAdded, setIsPatronAdded] = useState(false);

    const { bookData, loading: bookLoading } = useBarcode(bookBarcode);
    const { patronData, loading: patronLoading } = usePatronBarcode(patronBarcode);

    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const handleAddBook = () => {
        if (bookData && bookData.barcode) {
            setBooks([...books, bookData]);
            setBookBarcode('');
        }
    };

    const handleAddPatron = () => {
        if (patronData && patronData.barcode) {
            setIsPatronAdded(true);
        }
    };

    const handleCheckout = async () => {
        console.log('Books to Checkout:', books);
        console.log('Patron Data:', patronData);
    
        const dueDate = ''; // Set the due date as needed
    
        const lendingArray = books.map((book) => ({
            patron_barcode: patronData.barcode,
            book_barcode: book.barcode,
            // checked_out: dueDate,
            // due_date: dueDate,
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
                <button onClick={handleAddBook} disabled={bookLoading || !bookBarcode || !isPatronAdded}>
                    {bookLoading ? 'Loading...' : 'Add Book'}
                </button>
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>
                            {book.title} by {book.creators} (ISBN: {book.ean_isbn13})
                        </li>
                    ))}
                </ul>
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
                <button onClick={handleAddPatron} disabled={patronLoading || !patronBarcode || isPatronAdded}>
                    {patronLoading ? 'Loading...' : 'Add Patron'}
                </button>
                {isPatronAdded && (
                    <div>
                        <p>{patronData.first_name} {patronData.last_name}</p>
                        <p>Email: {patronData.email || 'N/A'}</p>
                        <p>Barcode: {patronData.barcode}</p>
                    </div>
                )}
            </div>
            <div>
                <h3>Checkout Date</h3>
                {date}
            </div>
            <div>
                <h3>Due Date</h3>
                <h5>Manana</h5>
            </div>
            <div className="align-center">
                <button onClick={handleCheckout} disabled={!isPatronAdded || books.length === 0}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default LendingBook;
