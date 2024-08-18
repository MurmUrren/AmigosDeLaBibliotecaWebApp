import { useState } from 'react';
import useAllGenres from '@hooks/useAllGenres';
import useCollections from '@hooks/useCollections';
import { createGenre, deleteGenre, updateGenre } from './functs/genreFunctions';
import ConfirmDelete from '@components/confirmDelete/ConfirmDelete';
import './ManageGenres.css';
import { useEffect } from 'react';

const ManageGenres = () => {
    const [genres, setGenres] = useState([]);
    const fetchedGenres = useAllGenres();

    useEffect(() => {
        if (fetchedGenres) {
            setGenres(fetchedGenres);
        }
    }, [fetchedGenres]);

    const collections = useCollections();
    const [newGenres, setNewGenres] = useState([]);
    const [updateGenres, setUpdateGenres] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState(null);
    const [isNewGenre, setIsNewGenre] = useState(false);

    const handleNewGenre = () => {
        setNewGenres([...newGenres, { id: Date.now(), Title: '', Collection_Id: '' }]);
    };

    const handleShowDeleteModal = (id, isNew) => {
        setGenreToDelete(id);
        setIsNewGenre(isNew);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        if (isNewGenre) {
            setNewGenres(newGenres.filter(genre => genre.id !== genreToDelete));
        } else {
            await deleteGenre(genreToDelete);
            setGenres(genres.filter(genre => genre.id !== genreToDelete));
        }
        setShowConfirmDelete(false);
        setGenreToDelete(null);
    };

    const handleDeleteGenre = (id, isNew) => {
        handleShowDeleteModal(id, isNew);
    };

    const handleSaveGenres = async () => {
        for (const genre of newGenres) {
            await createGenre(genre);
        }
        for (const genre of updateGenres) {
            await updateGenre(genre.id, genre);
        }
        console.log("New Genres:", newGenres);
        console.log("Updated Existing Genres:", updateGenres);
    };

    const handleInputChange = (e, id, isNew) => {
        if (isNew) {
            const updated = [...newGenres];
            const index = updated.findIndex(g => g.id === id);
            if (index !== -1) {
                updated[index].Title = e.target.value;
                setNewGenres(updated);
            }
        } else {
            const updatedGenre = genres.find(g => g.id === id);

            if (updatedGenre !== null) {
                const updatedGenreWithChanges = { ...updatedGenre, Collection_Id: e.target.value };

                const genreExists = updateGenres.find(g => g.id === id);

                if (genreExists) {
                    const updatedGenresList = updateGenres.map(genre =>
                        genre.id === id ? updatedGenreWithChanges : genre
                    );
                    setUpdateGenres(updatedGenresList);
                } else {
                    setUpdateGenres([...updateGenres, updatedGenreWithChanges]);
                }
            }
        }
    };

    const handleSelectChange = (e, id) => {
        const updatedGenre = genres.find(g => g.id === id);
        console.log("updated: ", updatedGenre, "id: ", id);

        if (updatedGenre !== null) {
            const updatedGenreWithChanges = { ...updatedGenre, Collection_Id: e.target.value };

            const genreExists = updateGenres.find(g => g.id === id);

            if (genreExists) {
                const updatedGenresList = updateGenres.map(genre =>
                    genre.id === id ? updatedGenreWithChanges : genre
                );
                setUpdateGenres(updatedGenresList);
            } else {
                setUpdateGenres([...updateGenres, updatedGenreWithChanges]);
            }
        }
    };

    return (
        <div>
            <tr>
                <td colSpan="3" className="action-buttons">
                    <button onClick={handleNewGenre} className="genre-button">Crear género</button>
                    <button onClick={handleSaveGenres} className="genre-button">Guardar cambios</button>
                </td>
            </tr>
            <table className="genre-table">
                <thead>
                    <tr>
                        <th className="genre-table-header">Género</th>
                        <th className="genre-table-header">Colección</th>
                        <th className="genre-table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {collections.length === 0 && genres.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="no-data">No se encontraron géneros o colecciones</td>
                        </tr>
                    ) : (
                        <>
                            {genres.length > 0 && collections.length > 0 && genres.map(genre => (
                                <tr key={genre.id}>
                                    <td>
                                        <input
                                            type="text"
                                            defaultValue={genre.Title}
                                            onChange={e => handleInputChange(e, genre.id, false)}
                                            className="genre-input"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            defaultValue={genre.Collection_Id}
                                            onChange={e => handleSelectChange(e, genre.id)}
                                            required={true}
                                            className="genre-select"
                                        >
                                            <option value="">Sin Colección</option>
                                            {collections.map(collection => (
                                                <option key={collection.id} value={collection.id}>
                                                    {collection.Title}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteGenre(genre.id, false)} className="genre-button delete-genre-button">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            {newGenres.length > 0 && newGenres.map(genre => (
                                <tr key={genre.id}>
                                    <td>
                                        <input
                                            type="text"
                                            value={genre.Title}
                                            onChange={e => handleInputChange(e, genre.id, true)}
                                            className="genre-input"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={genre.Collection_Id}
                                            onChange={e => {
                                                const updated = [...newGenres];
                                                const index = updated.findIndex(g => g.id === genre.id);
                                                if (index !== -1) {
                                                    updated[index].Collection_Id = e.target.value;
                                                    setNewGenres(updated);
                                                }
                                            }}
                                            className="genre-select"
                                        >
                                            <option value="">Seleccione colección</option>
                                            {collections.map(collection => (
                                                <option key={collection.id} value={collection.id}>
                                                    {collection.Title}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteGenre(genre.id, true)} className="genre-button delete-genre-button">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>

            <ConfirmDelete
                show={showConfirmDelete}
                handleClose={() => setShowConfirmDelete(false)}
                handleConfirm={confirmDelete}
                message="¿Estás seguro de que quieres eliminar este género?"
            />
        </div>
    );
};

export default ManageGenres;
