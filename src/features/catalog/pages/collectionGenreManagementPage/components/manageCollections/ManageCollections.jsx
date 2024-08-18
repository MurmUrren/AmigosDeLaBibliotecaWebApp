//
// TODO: que no se actualize todo de una.
//

import { useState, useEffect } from "react";
import useCollections from "@hooks/useCollections";
import { createCollection, deleteCollection, updateCollection } from "./functs/collectionFunctions";
import "./ManageCollections.css";
import ConfirmDelete from "../../../../components/confirmDelete/ConfirmDelete";

function ManageCollections() {
    const collections = useCollections();
    const [newCollections, setNewCollections] = useState([]);
    const [existingCollections, setExistingCollections] = useState([]);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [collectionToDelete, setCollectionToDelete] = useState(null);

    useEffect(() => {
        setExistingCollections(collections);
    }, [collections]);

    const handleNewCollection = () => {
        setNewCollections([...newCollections, { Title: '' }]);
    };

    const handleDeleteCollection = async (id, isNew) => {
        if (isNew) {
            setNewCollections(newCollections.filter(collection => collection.id !== id));
        } else {
            setExistingCollections(existingCollections.filter(collection => collection.id !== id));
            await deleteCollection(id);
        }
    };

    const handleSaveCollections = async () => {
        for (const collection of newCollections) {
            await createCollection(collection);
        }
        for (const collection of existingCollections) {
            if (collection.isUpdated) {
                await updateCollection(collection.id, collection);
            }
        }
        console.log("New Collections:", newCollections);
        console.log("Updated Existing Collections:", existingCollections);
    };

    const handleInputChange = (e, id, isNew) => {
        if (isNew) {
            const updated = [...newCollections];
            const index = updated.findIndex(c => c.id === id);
            if (index !== -1) {
                updated[index].Title = e.target.value;
                setNewCollections(updated);
            }
        } else {
            const updated = [...existingCollections];
            const index = updated.findIndex(c => c.id === id);
            if (index !== -1) {
                updated[index].Title = e.target.value;
                updated[index].isUpdated = true; // Mark as updated
                setExistingCollections(updated);
            }
        }
    };

    const handleShowDeleteModal = (id, isNew) => {
        setCollectionToDelete({ id, isNew });
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        if (collectionToDelete) {
            await handleDeleteCollection(collectionToDelete.id, collectionToDelete.isNew);
        }
        setShowConfirmDelete(false);
        setCollectionToDelete(null);
    };

    return (
        <div>
            <tr>
                <td colSpan="2">
                    <button onClick={handleNewCollection} className="collection-button">Crear Colección</button>
                    <button onClick={handleSaveCollections} className="collection-button">Guardar Cambios</button>
                </td>
            </tr>
            
            <table className="collections-table">
                <thead>
                    <tr>
                        <th>Nombre de la Colección</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {existingCollections.map(collection => (
                        <tr key={collection.id}>
                            <td>
                                <input
                                    type="text"
                                    value={collection.Title}
                                    onChange={e => handleInputChange(e, collection.id, false)}
                                    className="collection-input"
                                />
                            </td>
                            <td>
                                <button onClick={() => handleShowDeleteModal(collection.id, false)} className="collection-button delete-collection-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    {newCollections.map(collection => (
                        <tr key={collection.id}>
                            <td>
                                <input
                                    type="text"
                                    value={collection.Title}
                                    onChange={e => handleInputChange(e, collection.id, true)}
                                    className="collection-input"
                                />
                            </td>
                            <td>
                                <button onClick={() => handleShowDeleteModal(collection.id, true)} className="collection-button delete-collection-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmDelete
                show={showConfirmDelete}
                handleClose={() => setShowConfirmDelete(false)}
                handleConfirm={confirmDelete}
                message="¿Estás seguro de que quieres eliminar esta colección?"
            />
        </div>
    );
}

export default ManageCollections;
