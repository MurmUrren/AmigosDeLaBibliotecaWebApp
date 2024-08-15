import { useState, useEffect } from "react";
import usePatron from "@hooks/usePatron";
import { useParams } from "react-router-dom";
import { savePatron } from "./functs/editPatronFuncts"
import "./PatronEditPage.css";

const PatronEditPage = () => {
    const { patron_id } = useParams();
    const { patron, loading } = usePatron(patron_id);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [patronId, setPatronId] = useState("");

    useEffect(() => {
        if (patron) {
            console.log(patron);
            setFirstName(patron.first_name);
            setLastName(patron.last_name);
            setEmail(patron.email);
            setPhoneNumber(patron.phone);
            setAddress1(patron.address1);
            setAddress2(patron.address2);
            setCity(patron.city);
            setState(patron.state);
            setCountry(patron.country);
            setZipCode(patron.zip);
            setPatronId(patron.patron_id);
        }
    }, [patron]);

    const handleSubmission = async () => {
        const status = savePatron({
            id: patron.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phoneNumber,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            country: country,
            zip: zipCode,
            patron_id: patronId,
        });

        if (status) {
            console.log('patron saved');
        }
        else {
            console.error('error saving patron');
        }
    };

    return (
        <div className="patron-edit-container">
            <h2>Modificar datos de Patron</h2>
            <form className="patron-edit-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Address 1</label>
                    <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Address 2</label>
                    <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Patron Id</label>
                    <input type="text" value={patronId} onChange={(e) => setPatronId(e.target.value)} />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={handleSubmission}>Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default PatronEditPage;