import React from "react";
import useGenres from "@hooks/useGenres";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './GenresPage.css';

import CollectionCard from "@components/collectionCard/CollectionCard";

function GenresPage() {
    const navigate = useNavigate();
    const { title, collectionId } = useParams();
    const genres = useGenres(collectionId);

    return (
        <div className="genresP-wrapper">
            <div className="genresP-header">
                <h1>{title}</h1>
                <h1>Generos</h1>
            </div>
            <div className="genresP-list">
                {genres?.length > 0 ?
                    genres.map((genre, index) => (
                        <div classname="genresP-box" key={index}>
                            <CollectionCard
                                title={genre.Title}
                                img={genre.Img}
                                onClick={() => navigate(`/catalog/${genre.id}`)}
                            />
                        </div>
                    )) : (
                        <h1>No se encontraron generos</h1>
                    )}
            </div>
        </div>

    );
};

export default GenresPage;