import { useState } from "react";
import { createPatron } from "./functs/createPatronFuncts"

const CreatePatronPage = () => {
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

    const handleSubmission = async () => {
        if (!firstName || !lastName) {
            console.error('first name and last name are required');
            return;
        }

        const status = createPatron({
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
            console.log('patron created');
        }
        else {
            console.error('error created patron');
        }
    };

    return (
        <div>
            Create datos de Patron
            <div>
                <div>
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <div>
                        <label>Address 1</label>
                        <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                    </div>
                    <div>
                        <label>Address 2</label>
                        <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>City</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label>State</label>
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div>
                        <label>Country</label>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Zip Code</label>
                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Patron Id</label>
                        <input type="text" value={patronId} onChange={(e) => setPatronId(e.target.value)} />
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handleSubmission}>Guardar</button>
            </div>
        </div>
    );
};

export default CreatePatronPage;