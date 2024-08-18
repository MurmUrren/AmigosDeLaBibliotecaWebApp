import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import usePatrons from '@hooks/usePatrons'; // Adjust the import path as needed
import './QRCodeGenerator.css';

const PatronQRCodeGenerator = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { patrons } = usePatrons(startDate, endDate);
    const [showQRCodes, setShowQRCodes] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showQRCodes) {
            setLoading(false);
            setTimeout(() => {
                window.print();
            }, 0); // Trigger print after a short delay to ensure rendering
        }
    }, [showQRCodes]);

    const handleGenerateAndPrint = () => {
        setLoading(true);
        setShowQRCodes(true);
    };

    return (
        <div className='patron-qr-generator-wrapper'>
            <h1>Patron QR Code Generator</h1>
            <div className="date-filter">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleGenerateAndPrint} disabled={loading}>
                {loading ? 'Generating...' : 'Generate QR Codes and Print'}
            </button>
            
            {showQRCodes && (
                <div className="labels-sheet">
                    {patrons.map((patron) => (
                        <div key={patron.barcode} className="label">
                            <QRCode value={patron.barcode} size={64} />
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
};

export default PatronQRCodeGenerator;
