import React from 'react';
import './CollectionCard.css'

function CollectionCard ({ title, img, onClick } ) {
    return(
        <div className='collection-card-container' onClick={onClick}>
            <img src={img} alt={title}/>
            <h1>{title}</h1>
        </div>
    );
};

export default CollectionCard;