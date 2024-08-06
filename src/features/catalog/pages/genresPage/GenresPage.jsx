import React, { useState, useEffect } from "react";
import CollectionCard from "@components/collectionCard/CollectionCard";
import supabase from "../../../../config/supabaseClient";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './GenresPage.css';

function GenresPage() {
    const navigate = useNavigate();
    const { collectionId } = useParams();
    const [genres, setGenres] = useState([]);
    
    useEffect(() => {
        const fetchGenresData = async () => {
            if (!collectionId) return;

            const { data, error } = await supabase
                .from('Genres')
                .select()
                .eq('Collection_Id', collectionId)

            if (error) {
                console.error('error fetching genres', error)
            }
            if (data) {
                setGenres(data)
            }
        }
        fetchGenresData();
    }, []);

    return (
        <div className="genresP-wrapper">
            <div className="genresP-header">
                <h1>Generos</h1>
            </div>
            <div className="genresP-list">
                    {genres?.map((genre, index) => (
                        <div classname="genresP-box" key={index}>
                            <CollectionCard 
                                title={genre.Title} 
                                // img={genre.img}
                                onClick={() => navigate(`/catalog/${genre.id}`)}
                            />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default GenresPage;