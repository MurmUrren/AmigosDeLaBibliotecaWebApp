import React from 'react';
import './CollectionCard.css'

function CollectionCard ({ genre, onClick } ) {
    console.log(genre)
    return(
        <div id={genre.id} className='collection-card-container' onClick={onClick}>
            <img className='collection-card-container-img' src={genre.Img} alt={`Catalogo o coleccion de ${genre.Title}`}/>
            <p>{genre.Descripction}</p>
            <h1>{genre.Title}</h1>
        </div>
    );
};

export default CollectionCard;