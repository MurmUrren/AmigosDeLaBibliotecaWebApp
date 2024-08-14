import React, { useRef } from 'react';
import './CarrouselTopGenRes.css';
import useGenres from "@hooks/useGenres";
import CollectionCard from '@components/collectionCard/CollectionCard';
import { useNavigate } from 'react-router-dom';

const CarrouselTopGenRes = ({ id }) => {
    const genres = useGenres.getTopViews(id);
    const navigate = useNavigate();
    const carrouselRef = useRef(null);

    const scrollLeft = () => {
        if (carrouselRef.current) {
            carrouselRef.current.scrollBy({
                left: -1000, // Ajusta el desplazamiento según el ancho de los elementos y el espacio entre ellos
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (carrouselRef.current) {
            carrouselRef.current.scrollBy({
                left: 1000, // Ajusta el desplazamiento según el ancho de los elementos y el espacio entre ellos
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='Carrousel'>
            <button className='Carrousel-button Carrousel-button-left' onClick={scrollLeft}>◄</button>
            <div className='Carrousel-container' ref={carrouselRef}>
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
            <button className='Carrousel-button Carrousel-button-right' onClick={scrollRight}>►</button>
        </div>
    );
};

export default CarrouselTopGenRes;
