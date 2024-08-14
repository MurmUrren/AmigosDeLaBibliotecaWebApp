import { useState, useMemo } from "react";
import usePatrons from "@hooks/usePatrons";
import Pagination from "@components/pagination/Pagination";
import { useNavigate } from "react-router-dom";

const PatronsManagementPage = () => {
    const navigate = useNavigate();
    const { patrons, loading } = usePatrons();
    const [currentPage, setCurrentPage] = useState(1);
    const patronsPerPage = 20;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentPatrons = useMemo(() => {
        const indexOfLastPatron = currentPage * patronsPerPage;
        const indexOfFirstPatron = indexOfLastPatron - patronsPerPage;
        return patrons.slice(indexOfFirstPatron, indexOfLastPatron);
    }, [currentPage, patrons]);

    return (
        <div>
            <h1>Patrons Management Page</h1>
            <Pagination
                currentPage={currentPage}
                totalCount={patrons.length}
                pageSize={patronsPerPage}
                onPageChange={handlePageChange}
            />
            <div>
                <button
                    onClick={() => {navigate("/home")}}
                >
                    Agregar Patron
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address 1</th>
                            <th>Address 2</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Zip Code</th>
                            <th>Patron Id</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="10">Loading...</td>
                            </tr>
                        ) : currentPatrons?.map(patron => (
                            <tr key={patron.id}>
                                <td>{patron.first_name}</td>
                                <td>{patron.last_name}</td>
                                <td>{patron.email}</td>
                                <td>{patron.phone}</td>
                                <td>{patron.address1}</td>
                                <td>{patron.address2}</td>
                                <td>{patron.city}</td>
                                <td>{patron.state}</td>
                                <td>{patron.country}</td>
                                <td>{patron.zip}</td>
                                <td>{patron.patron_id}</td>
                                <td>
                                    <button 
                                        onClick={() => {navigate("/home")}}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => {navigate("/")}}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={patrons.length}
                pageSize={patronsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PatronsManagementPage;