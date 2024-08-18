import { useState } from 'react';
import useAllGenres from '@hooks/useAllGenres';
import useCollections from '@hooks/useCollections';
import { createGenre, deleteGenre, updateGenre } from './functs/genreFunctions';
import './ManageGenres.css';

const ManageGenres = () => {
    const genres = useAllGenres();
    const collections = useCollections();
    const [newGenres, setNewGenres] = useState([]);
    const [updateGenres, setUpdateGenres] = useState([]);

    const handleNewGenre = () => {
        setNewGenres([...newGenres, { Title: '', Collection_Id: '' }]);
    };

    const handleDeleteGenre = async (id, isNew) => {
        if (isNew) {
            setNewGenres(newGenres.filter(genre => genre.id !== id));
        } else {
            // setExistingGenres(existingGenres.filter(genre => genre.id !== id));
            // await deleteGenre(id);
        }
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
                    <button onClick={handleNewGenre} className="genre-button">Crear genero</button>
                    <button onClick={handleSaveGenres} className="genre-button">Guardar cambios</button>
                </td>
            </tr>
            <table className="genre-table">
                <thead>
                    <tr>
                        <th className="genre-table-header">Genero</th>
                        <th className="genre-table-header">Coleccion</th>
                        <th className="genre-table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {collections.length === 0 && genres.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="no-data">No se encontraron generos o colecciones</td>
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
                                    <option value="">Sin Coleccion</option>
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
                                    <option value="">Seleccione coleccion</option>
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
        </div>
    );
};

export default ManageGenres;
