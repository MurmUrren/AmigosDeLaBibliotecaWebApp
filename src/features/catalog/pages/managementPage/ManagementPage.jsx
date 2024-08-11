import React from "react";
import { useNavigate } from 'react-router-dom';
import './ManagementPage.css';
function ManagementPage() {
    const navigate = useNavigate();

    const managmentOptions = [
        {title: 'Administrar Libros', path: '/manage/books'},
        {title: 'Administrar Collecciones/Generos', path: '/manage/co_ge'},
        {title: 'Libros sin generos', path: '/manage/books-no-genre'},
        {title: 'Agregar proximas visitas', path: '/manage/add-visits'},
        {title: 'Estadisticas', path: '/stats'}
    ]

    return (
        <div className="admin-container">
            <h1 className="admin-header">Administrar</h1>
            <div className="manage-options">
                {managmentOptions.map((option, index) => (
                    <div className='manage-option' key={index}>
                        <button onClick={() => navigate(option.path)}>{option.title}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagementPage;