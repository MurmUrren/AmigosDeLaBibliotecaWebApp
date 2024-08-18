import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import usePatrons from '@hooks/usePatrons'; // Adjust the import path as needed
import './QRCodeGenerator.css';

const PatronQRCodeGenerator = () => {
    const { patrons} = usePatrons();
    const [showQRCodes, setShowQRCodes] = useState(false);



    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='patron-qr-generator-wrapper'>
            <h1>Patron QR Code Generator</h1>
            <button onClick={() => setShowQRCodes(true)}>Generate QR Codes</button>
            <button onClick={handlePrint}>Print</button>
            
            {showQRCodes && (
                <div className="labels-sheet">
                    {patrons.map((patron) => (
                        <div key={patron.barcode} className="label">
                            <QRCode value={patron.barcode} size={64}/>
                            <div className="patron-info">
                                <p><strong>Name:</strong> {patron.first_name}</p>
                                <p><strong>SKU:</strong> {patron.barcode}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PatronQRCodeGenerator;
