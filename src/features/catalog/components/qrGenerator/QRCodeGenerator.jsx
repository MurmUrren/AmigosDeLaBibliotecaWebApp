import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import useAllBooks from '@hooks/useAllBooks';
import useAllBarCodes from '@hooks/useAllBarCodes';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
    const [qrCodes, setQRCodes] = useState([]);
    const barcodes = useAllBarCodes();
    const books = useAllBooks();

    // Funcion para calcular modulo 10
    const calculateChecksum = (number) => {
        let sum = 0;
        for (let i = 0; i < number.length; i++) {
            let digit = parseInt(number[i]);
            if (i % 2 === 0) {
                sum += digit;
            } else {
                sum += digit * 3;
            }
        }
        const remainder = sum % 10;
        return remainder === 0 ? 0 : 10 - remainder;
    };

    const generateSKU = (bookIndex) => {
        const prefix = "201";
        const paddedNumber = bookIndex.toString().padStart(9, '0');
        const partialSKU = prefix + paddedNumber;
        const checksum = calculateChecksum(partialSKU);
        return partialSKU + checksum;
    };

    const generateQRCodes = () => {
        let offset = 0; // Initialize the offset
    
        const qrList = books.flatMap((book, index) => {
            const existingBarcodes = barcodes.filter(
                (barcode) => barcode.ean_isbn13 === book.Ean_Isbn13
            );
    
            if (existingBarcodes.length > 0) {
                // Handle existing barcodes for multiple copies
                return Array.from({ length: book.Copies }).map((_, i) => {
                    const existingBarcode = existingBarcodes[i];
                    if (existingBarcode) {
                        return {
                            id: book.id,
                            sku: existingBarcode.barcode,
                            title: existingBarcode.title,
                            creators: existingBarcode.creators,
                        };
                    } else {
                        // If there are more copies than existing barcodes, generate new barcodes for the remaining copies
                        return {
                            id: book.id,
                            sku: generateSKU(index + offset + i), // Use index + offset + i
                            title: book.Title,
                            creators: book.Creators,
                        };
                    }
                });
            } else {
                // Generate new barcodes for all copies if no existing barcodes are found
                const newBarcodes = Array.from({ length: book.Copies }).map((_, i) => ({
                    id: book.id,
                    sku: generateSKU(index + offset + i), // Use index + offset + i
                    title: book.Title,
                    creators: book.Creators,
                }));
                offset += book.Copies; // Increment the offset
                return newBarcodes;
            }
        });
    
        setQRCodes(qrList);
    };
    return (
        <div>
            <h1>QR Code Generator for Books</h1>
            <button onClick={generateQRCodes}>Generate QR Codes</button>
            <div className="labels-sheet">
                {qrCodes.map((code) => (
                    <div key={code.id} className="label">
                        <QRCode value={code.sku} size={64} />
                        <div className="book-info">
                            <p><strong>Title:</strong> {code.title}</p>
                            <p><strong>Creators:</strong> {code.creators}</p>
                            <p><strong>SKU:</strong> {code.sku}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QRCodeGenerator;
