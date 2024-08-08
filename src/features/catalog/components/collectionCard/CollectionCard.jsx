import React from 'react';
import './CollectionCard.css'

function CollectionCard ({ genre, img, onClick } ) {
    console.log(genre)
    console.log(img)
    return(
        genre &&
        <div id={genre?.id} className='collection-card-container' onClick={onClick}>
            <img className='collection-card-container-img' src={genre.Img || img} alt={`Catalogo o coleccion de ${genre.Title}`}/>
            <h1>{genre.Title}</h1>
        </div>
    );
};

export default CollectionCard;