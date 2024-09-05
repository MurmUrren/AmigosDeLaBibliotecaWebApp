import React from 'react';

import CollectionCard from "@components/collectionCard/CollectionCard";
import useGenres from "@hooks/useGenres";

const GenresPList = ({id}) => {

    const genres = useGenres.useGenres(id);

    const handleClick = async (event) => {
        let id = event.currentTarget.id;
        //with supabase increment the views of the genre
        await useGenres.updateViews(id);
        navigate(`/catalog/${id}`)
    }

    return (
        <div className="genresP-list">
            {genres?.length > 0 ?
                genres.map((genre, index) => (
                    <div className="genresP-box" key={index}>
                        <CollectionCard
                            title={genre.Title}
                            img={genre.Img}
                            genre={genre}
                            onClick={handleClick}
                        />
                    </div>
                )) : (
                    <h1>No se encontraron generos</h1>
                )}
        </div>
    );
};

export default GenresPList;