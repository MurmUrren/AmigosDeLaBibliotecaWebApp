import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './GenresPage.css';
import CarrouselTopGenRes from "@components/CarrouselTopGenRes/CarrouselTopGenRes";
import GenresPList from "@components/genresPList/GenresPList";

function GenresPage() {
    const navigate = useNavigate();
    const { title, collectionId } = useParams();

    useEffect(() => {
        console.log(collectionId);
    }
    , [navigate]);

    return (
        <div className="genresP-wrapper">
            <div className="genresP-header">
                <h1>Generos</h1>
                <h1>{title}</h1>
            </div>

            <div className="collections-header">
                <h3>Mas vistos de {title}</h3>
            </div>
            <div className="collection-carrousel">
                {
                    <CarrouselTopGenRes id={collectionId} />
                }
            </div>

            <GenresPList id={collectionId} />
        </div>

    );
};

export default GenresPage;