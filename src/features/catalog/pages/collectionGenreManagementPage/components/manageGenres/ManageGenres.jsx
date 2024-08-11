import { useState, useEffect } from 'react';
import useAllGenres from '@hooks/useAllGenres';
import useCollections from '@hooks/useCollections';
import { createGenre, deleteGenre, updateGenre } from './functs/genreFunctions';

const ManageGenres = () => {
    const genres = useAllGenres();
    const collections = useCollections();
    const [newGenres, setNewGenres] = useState([]);
    const [existingGenres, setExistingGenres] = useState([]);

    useEffect(() => {
        setExistingGenres(genres);
    }, [genres]);

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
        for (const genre of existingGenres) {
            if (genre.isUpdated) {
                await updateGenre(genre.id, genre);
            }
        }
        console.log("New Genres:", newGenres);
        console.log("Updated Existing Genres:", existingGenres);
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
            const updated = [...existingGenres];
            const index = updated.findIndex(g => g.id === id);
            if (index !== -1) {
                updated[index].Title = e.target.value;
                updated[index].isUpdated = true;
                setExistingGenres(updated);
            }
        }
    };

    const handleSelectChange = (e, id) => {
        const updated = [...existingGenres];
        const index = updated.findIndex(g => g.id === id);
        if (index !== -1) {
            updated[index].Collection_Id = e.target.value;
            updated[index].isUpdated = true;
            setExistingGenres(updated);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Genre Name</th>
                        <th>Collection</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {existingGenres.map(genre => (
                        <tr key={genre.id}>
                            <td>
                                <input
                                    type="text"
                                    value={genre.Title}
                                    onChange={e => handleInputChange(e, genre.id, false)}
                                />
                            </td>
                            <td>
                                <select
                                    value={genre.Collection_Id}
                                    onChange={e => handleSelectChange(e, genre.id)}
                                >
                                    <option value="">Select Collection</option>
                                    {collections.map(collection => (
                                        <option key={collection.id} value={collection.id}>
                                            {collection.Title}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteGenre(genre.id, false)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {newGenres.map(genre => (
                        <tr key={genre.id}>
                            <td>
                                <input
                                    type="text"
                                    value={genre.Title}
                                    onChange={e => handleInputChange(e, genre.id, true)}
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
                                >
                                    <option value="">Select Collection</option>
                                    {collections.map(collection => (
                                        <option key={collection.id} value={collection.id}>
                                            {collection.Title}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteGenre(genre.id, true)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3">
                            <button onClick={handleNewGenre}>Create Genre</button>
                            <button onClick={handleSaveGenres}>Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManageGenres;
