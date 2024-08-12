import React from "react";
import { useAllViewsCollections } from '@hooks/useCollectionTop';

const ViewsCollections = () => {
    const allViewsCollections = useAllViewsCollections();

    return (
        <div>
            <h1>Estadísticas de colecciones</h1>
            <div>
                {allViewsCollections?.length > 0 ?
                    allViewsCollections.map((collection, index) => (
                        <div key={index}>
                            <h2>{collection.title}</h2>
                            <p>Vistas totales: {collection.TotalViews}</p>
                        </div>
                    )) : (
                        <h1>No se encontraron colecciones</h1>
                    )}
            </div>
        </div>
    );
}

export default ViewsCollections;