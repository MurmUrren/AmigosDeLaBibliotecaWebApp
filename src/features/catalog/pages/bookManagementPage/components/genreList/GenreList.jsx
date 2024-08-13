import { useState } from "react";
import "./GenreList.css";

const GenreList = ({ allGenres, bookGenres, handleSelectGenre }) => {

    return (
        <div>
            <h4>Generos</h4>
            <div>
                {allGenres.length === 0 ? (
                    <p>Generos no disponibles</p>
                ) : (
                    <select
                        multiple
                        className="genre-select"
                        value={bookGenres}
                        onChange={event => handleSelectGenre(event.target.value)}
                    >
                        {allGenres.map((genre) => (
                            <option
                                key={genre.id}
                                value={genre.id}
                            >
                                {genre.Title}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default GenreList;