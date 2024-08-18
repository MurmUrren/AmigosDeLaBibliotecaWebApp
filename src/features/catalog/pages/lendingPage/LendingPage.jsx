import React, { useState } from 'react';
import LendingBook from "@components/lendingBook/LendingBook";
import Checkins from "../checkinsPage/Checkins";
import './LendingPage.css';

function LendingPage() {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div>
            <h1>Welcome to the Lending Page</h1>
            <div className="select-lend-option">
                <button className="select-lend-button" onClick={() => setSelectedOption('lend')}>Lend</button>
                <button className="select-lend-button" onClick={() => setSelectedOption('checkin')}>CheckIn</button>
            </div>
            {selectedOption === 'lend' && <LendingBook />}
            {selectedOption === 'checkin' && <Checkins />}
        </div>
    );
}

export default LendingPage;