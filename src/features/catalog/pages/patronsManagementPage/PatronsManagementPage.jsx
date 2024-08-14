import { useState, useEffect, useMemo } from "react";
import usePatrons from "@hooks/usePatrons";
import Pagination from "@components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { deletePatron } from "./functs/patronFuncts";
import SearchBar from "@components/searchBar/SearchBar";

const PatronsManagementPage = () => {
    const navigate = useNavigate();
    const { patrons, loading } = usePatrons();
    const [patronList, setPatronList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const patronsPerPage = 20;

    useEffect(() => {
        if (patrons) {
            setPatronList(patrons);
        }
    }, [patrons]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredPatrons = useMemo(() => {
        if (!searchTerm) {
            return patronList;
        }
        return patronList.filter(patron =>
            patron.first_name && patron.first_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patronList, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
      };

    const currentPatrons = useMemo(() => {
        const indexOfLastPatron = currentPage * patronsPerPage;
        const indexOfFirstPatron = indexOfLastPatron - patronsPerPage;
        return filteredPatrons.slice(indexOfFirstPatron, indexOfLastPatron);
    }, [currentPage, filteredPatrons]);

    const handleDelete = async (id) => {
        const status = await deletePatron(id);

        if (status) {
            console.log('patron deleted');
        }
        else {
            console.error('error deleting patron');
        }
        setPatronList(patronList.filter(patron => patron.id !== id));
    };

    return (
        <div>
            <h1>Patrons Management Page</h1>
            <SearchBar onSearch={handleSearch} />
            <Pagination
                currentPage={currentPage}
                totalCount={filteredPatrons.length}
                pageSize={patronsPerPage}
                onPageChange={handlePageChange}
            />
            <div>
                <button
                    onClick={() => {navigate("/create_patron")}}
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
                                        onClick={() => {navigate(`/edit/patron/${patron.id}`)}}
                                    >
                                        Editar
                                    </button>
                                    {/* <button
                                        onClick={() => {handleDelete(patron.id)}}
                                    >
                                        Eliminar
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={filteredPatrons.length}
                pageSize={patronsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PatronsManagementPage;