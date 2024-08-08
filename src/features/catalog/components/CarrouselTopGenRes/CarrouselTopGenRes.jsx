import React from 'react';
import './CarrouselTopGenRes.css';
import useGenres from "@hooks/useGenres";
import CollectionCard from '@components/collectionCard/CollectionCard';

const CarrouselTopGenRes = ({ id }) => {
    const genres = useGenres.getTopViews(id);

    return (
        <div className='Carrousel'>
            {
                genres?.map((genre, index) => (
                    <div className="Carrousel-box" key={index}>
                        <CollectionCard
                            title={genre.Title}
                            img={genre.Img}
                            genre={genre}
                            onClick={() => {
                                const title = genre.Title.replace(/\s+/g, '-').toLowerCase();
                                navigate(`/collection/${title}/${genre.id}`);
                            }}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default CarrouselTopGenRes;