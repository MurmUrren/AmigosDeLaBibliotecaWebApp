import React from 'react';
import useCollectionTop, {useAllViewsCollections} from '@hooks/useCollectionTop';

const Stats = () => {
    const topCollection = useCollectionTop();
    const allViewsCollections = useAllViewsCollections();

    console.log("Hola: ", allViewsCollections);
    //print all collections
    allViewsCollections.map((collection, index) => {
        console.log("Collection: ", collection);
    });
    return(
        <div>
            <h1>Catalogo más visto:</h1>
            <h2>{topCollection?.title} </h2>
            <p>Vistas Totales: {topCollection?.TotalViews}</p>
            <h1>Colecciones:</h1>
            <ul>
                {allViewsCollections?.map((collection, index) => (
                    <li key={index}>
                        <h3>{collection.title}</h3>
                        <p>Vistas Totales: {collection.TotalViews}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stats;