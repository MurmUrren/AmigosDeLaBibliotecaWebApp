import React from "react";
import useCollectionTop from '@hooks/useCollectionTop';

const TopCollection = () => {

    const topCollection = useCollectionTop();
    return (
        <>
        <h1>Catalogo más visto:</h1>
            <h2>{topCollection?.title} </h2>
            <p>Vistas Totales: {topCollection?.TotalViews}</p>
        </>
    );
}

export default TopCollection;