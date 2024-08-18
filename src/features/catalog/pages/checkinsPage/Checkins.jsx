import { useState } from "react";
import useAllCheckouts from "@hooks/useAllCheckouts";
import { check_in } from "./functs/checkinFuncts";
import "./Checkins.css";
const Checkins = () => {
    const checkouts = useAllCheckouts();
    
    const handleCheckin = async (checkout) => {
        const status = await check_in(checkout);
    };

    return (
        <div className="checkins-container">
            <div className="table-wrapper">
                <table className="checkins-table">
                    <thead>
                        <tr>
                            <th>Patron Barcode</th>
                            <th>Book Barcode</th>
                            <th>Checkout Date</th>
                            <th>Due Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkouts.length > 0 ? (
                            checkouts.map((checkout) => (
                                <tr key={checkout.id}>
                                    <td data-label="Patron Barcode">{checkout.book_barcode}</td>
                                    <td data-label="Book Barcode">{checkout.patron_barcode}</td>
                                    <td data-label="Checkout Date">{checkout.checked_out}</td>
                                    <td data-label="Due Date">{checkout.due_date}</td>
                                    <td data-label="">
                                        <button className="checkin-button" onClick={() => {handleCheckin(checkout)}}>Checkin</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>No checkouts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Checkins;