import React from "react";
import CollectionCard from "../collectionCard/CollectionCard";
import { useParams } from 'react-router-dom';
import './GenresPage.css';

function GenresPage() {
    const { collectionName } = useParams();

    const genres = [
        { title: 'Messi', img: 'https://th.bing.com/th/id/R.0068d486c0720727ff24d5ef0ffce53b?rik=VP4ZV3h2yv079g&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f10500000%2fBowser-bowser-10504156-968-984.jpg&ehk=XDIMRRETmKvR7M93N0ptKcquyIZmKT8rLWJikGCfunM%3d&risl=&pid=ImgRaw&r=0' },
        { title: 'CR7', img: 'https://th.bing.com/th/id/R.0068d486c0720727ff24d5ef0ffce53b?rik=VP4ZV3h2yv079g&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f10500000%2fBowser-bowser-10504156-968-984.jpg&ehk=XDIMRRETmKvR7M93N0ptKcquyIZmKT8rLWJikGCfunM%3d&risl=&pid=ImgRaw&r=0' },
        { title: 'Pepe', img: 'https://th.bing.com/th/id/R.0068d486c0720727ff24d5ef0ffce53b?rik=VP4ZV3h2yv079g&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f10500000%2fBowser-bowser-10504156-968-984.jpg&ehk=XDIMRRETmKvR7M93N0ptKcquyIZmKT8rLWJikGCfunM%3d&risl=&pid=ImgRaw&r=0' },
        { title: 'Casa', img: 'https://th.bing.com/th/id/R.0068d486c0720727ff24d5ef0ffce53b?rik=VP4ZV3h2yv079g&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f10500000%2fBowser-bowser-10504156-968-984.jpg&ehk=XDIMRRETmKvR7M93N0ptKcquyIZmKT8rLWJikGCfunM%3d&risl=&pid=ImgRaw&r=0' },
        { title: 'Lol', img: 'https://th.bing.com/th/id/R.0068d486c0720727ff24d5ef0ffce53b?rik=VP4ZV3h2yv079g&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f10500000%2fBowser-bowser-10504156-968-984.jpg&ehk=XDIMRRETmKvR7M93N0ptKcquyIZmKT8rLWJikGCfunM%3d&risl=&pid=ImgRaw&r=0' }
    ];

    return (
        <div className="genresP-wrapper">
            <div className="genresP-header">
                <h1>Generos</h1>
            </div>
            <div className="genresP-list">
                    {Object.entries(genres).map(([key, genre]) => (
                        <div classname="genresP-box" key={key}>
                            <CollectionCard 
                                title={genre.title} 
                                img={genre.img}
                            />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default GenresPage;