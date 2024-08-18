import React, { useState } from 'react';
import QRCodeGenerator from '../../components/qrGenerator/QRCodeGenerator';
import PatronQRCodeGenerator from '../../components/qrGenerator/PatronQRCodeGenerator'; // Adjust the import path as needed
import './BarcodesPage.css';

function BarcodesPage() {
    const [selectedComponent, setSelectedComponent] = useState('');

    return (
        <div className="barcodes-page">
            <h1>Barcodes Page</h1>
            <div className="button-group">
                <button 
                    className={selectedComponent === 'books' ? 'active' : ''}
                    onClick={() => setSelectedComponent('books')}
                >
                    Generate Book QR Codes
                </button>
                <button 
                    className={selectedComponent === 'patrons' ? 'active' : ''}
                    onClick={() => setSelectedComponent('patrons')}
                >
                    Generate Patron QR Codes
                </button>
            </div>
            <div className="qr-code-container">
                {selectedComponent === 'books' && <QRCodeGenerator />}
                {selectedComponent === 'patrons' && <PatronQRCodeGenerator />}
            </div>
        </div>
    );
}

export default BarcodesPage;
