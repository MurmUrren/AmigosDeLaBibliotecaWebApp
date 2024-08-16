import { useState } from "react";
import useAllCheckouts from "@hooks/useAllCheckouts";
import { check_in } from "./functs/checkinFuncts";

const Checkins = () => {
    const checkouts = useAllCheckouts();
    
    const handleCheckin = async (checkout) => {
        const status = await check_in(checkout);
    };

    return (
        <div>
            <div>
                <table>
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
                                    <td>{checkout.book_barcode}</td>
                                    <td>{checkout.patron_barcode}</td>
                                    <td>{checkout.checked_out}</td>
                                    <td>{checkout.due_date}</td>
                                    <td>
                                        <button onClick={() => {handleCheckin(checkout)}}>Checkin</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No checkouts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Checkins;