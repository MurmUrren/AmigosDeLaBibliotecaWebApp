import React from "react";
import useStorageImages from "@hooks/useStorageImages";
import useCollections from "@hooks/useCollections";
import { useNavigate } from 'react-router-dom';
import './CollectionPage.css';

import CollectionCard from "@components/collectionCard/CollectionCard";

function CollectionPage() {
    const navigate = useNavigate();
    const collections = useCollections();
    const collectionImages = useStorageImages(collections); // DEBERIAMOS DE NO USAR EL STORAGE PARA LAS IMAGENES

    return (
        <div className="collection-wrapper">
            <div className="collections-header">
                <h3>Bienvenido a nuestro catalogo, explora nuestra variedad de libros.</h3>
            </div>
            <div className="collection-list">
                    {collections?.map((collection, index) => (
                        <div className="collection-box" key={index}>
                            <CollectionCard 
                                title={collection.Title} 
                                img={collectionImages[collection.Title]}
                                onClick={() => {
                                    const title = collection.Title.replace(/\s+/g, '-').toLowerCase();
                                    navigate(`/collection/${title}/${collection.id}`);
                                }}
                            />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default CollectionPage;