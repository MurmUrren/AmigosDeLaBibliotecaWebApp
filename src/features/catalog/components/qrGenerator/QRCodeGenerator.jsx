import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import supabase from '@config/supabaseClient';
import useAllBooks from '@hooks/useAllBooks';
import useAllBarCodes from '@hooks/useAllBarCodes';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
    const [qrCodes, setQRCodes] = useState([]);
    const { barcodes, refetch } = useAllBarCodes();
    const books = useAllBooks();
    const [lastBarcode, setLastBarcode] = useState(null);

    useEffect(() => {
        const fetchLastBarcode = async () => {
            const { data, error } = await supabase
                .from('Barcodes')
                .select('barcode')
                .order('barcode', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error fetching last barcode:', error);
            } else if (data && data.length > 0) {
                setLastBarcode(data[0].barcode);
            } else {
                setLastBarcode('2010000000000'); // Start from this if no barcodes exist
            }
        };

        fetchLastBarcode();
    }, []);

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

    const incrementSKU = (lastSKU) => {
        const prefix = lastSKU.slice(0, 3);
        const numericPart = lastSKU.slice(3, 12); // Extract the numeric part without checksum
        const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(9, '0');
        const newPartialSKU = prefix + nextNumber;
        const checksum = calculateChecksum(newPartialSKU);
        return newPartialSKU + checksum;
    };

    const generateQRCodes = async () => {
        if (!lastBarcode) return;

        let currentSKU = lastBarcode;
        const newBarcodesToInsert = [];

        const qrList = books.flatMap((book) => {
            const existingBarcodes = barcodes.filter(
                (barcode) => barcode.ean_isbn13 === book.Ean_Isbn13
            );

            if (existingBarcodes.length > 0) {
                return Array.from({ length: book.Copies }).map((_, i) => {
                    const existingBarcode = existingBarcodes[i];
                    if (existingBarcode) {
                        return {
                            id: `${book.id}-${i}`,
                            sku: existingBarcode.barcode,
                            title: existingBarcode.title,
                            creators: existingBarcode.creators,
                        };
                    } else {
                        currentSKU = incrementSKU(currentSKU);
                        const newBarcode = {
                            id: `${book.id}-${i}`,
                            sku: currentSKU,
                            title: book.Title,
                            creators: book.Creators,
                        };
                        newBarcodesToInsert.push({
                            ean_isbn13: book.Ean_Isbn13,
                            barcode: newBarcode.sku,
                            title: newBarcode.title,
                            creators: newBarcode.creators,
                        });
                        return newBarcode;
                    }
                });
            } else {
                const newBarcodes = Array.from({ length: book.Copies }).map((_, i) => {
                    currentSKU = incrementSKU(currentSKU);
                    const newBarcode = {
                        id: `${book.id}-${i}`,
                        sku: currentSKU,
                        title: book.Title,
                        creators: book.Creators,
                    };
                    newBarcodesToInsert.push({
                        ean_isbn13: book.Ean_Isbn13,
                        barcode: newBarcode.sku,
                        title: newBarcode.title,
                        creators: newBarcode.creators,
                    });
                    return newBarcode;
                });
                return newBarcodes;
            }
        });

        if (newBarcodesToInsert.length > 0) {
            const { error } = await supabase
                .from('Barcodes')
                .insert(newBarcodesToInsert);
                console.log('Barcodes inserted:', newBarcodesToInsert);
            if (error) {
                console.error('Error inserting new barcodes:', error);
            } else {
                refetch();
            }
        }

        setQRCodes(qrList);

        print(qrCodes);
    };

    return (
    <>
        <div class name="book-qr-generator-wrapper">
            <h1>QR Code Generator for Books</h1>
            <button onClick={generateQRCodes}>Generate QR Codes</button>
            <button onClick={() => {print(qrCodes)}}>Print</button>
            <div className="labels-sheet">
                {qrCodes.map((code) => (
                    <div key={`${code.id}-${code.sku}`} className="label">
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
    </>
    );
};

export default QRCodeGenerator;
