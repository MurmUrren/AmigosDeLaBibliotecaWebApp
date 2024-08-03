import React from 'react';
import './CollectionCard.css'

function CollectionCard ({ title, img } ){
    return(
        <div className='collection-card-container'>
            <img src={img} alt={title}/>
            <h1>{title}</h1>
        </div>
    );
};

export default CollectionCard;