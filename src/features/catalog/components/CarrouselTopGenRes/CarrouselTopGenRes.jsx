import React from 'react';
import './CarrouselTopGenRes.css';
import useGenres from "@hooks/useGenres";
import CollectionCard from '@components/collectionCard/CollectionCard';
import { useNavigate } from 'react-router-dom';

const CarrouselTopGenRes = ({ id }) => {
    const genres = useGenres.getTopViews(id);
    const navigate = useNavigate();

    return (
        <div className='Carrousel'>
            {
                genres?.map((genre, index) => (
                    <div className="Carrousel-box" key={index}>
                        <CollectionCard
                            title={genre.Title}
                            img={genre.Img}
                            genre={genre}
                            onClick={async () => {
                                await useGenres.updateViews(genre.id);
                                const title = genre.Title.replace(/\s+/g, '-').toLowerCase();
                                navigate(`/catalog/${genre.id}`);
                                //navigate(`/collection/${title}/${genre.id}`);
                            }}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default CarrouselTopGenRes;