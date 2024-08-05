import React from "react";
import CollectionCard from "../collectionCard/CollectionCard";
import { useNavigate } from 'react-router-dom';
import './CollectionPage.css';

function CollectionPage() {
    const navigate = useNavigate();
    
    const collections = [
        { title: 'Messi', img: 'https://th.bing.com/th/id/OIP.AWX4OdiKNkWcQw80HEUh7gAAAA?rs=1&pid=ImgDetMain' },
        { title: 'CR7', img: 'https://th.bing.com/th/id/OIP.AWX4OdiKNkWcQw80HEUh7gAAAA?rs=1&pid=ImgDetMain' },
        { title: 'Pepe', img: 'https://th.bing.com/th/id/OIP.AWX4OdiKNkWcQw80HEUh7gAAAA?rs=1&pid=ImgDetMain' },
        { title: 'Casa', img: 'https://th.bing.com/th/id/OIP.AWX4OdiKNkWcQw80HEUh7gAAAA?rs=1&pid=ImgDetMain' },
        { title: 'Lol', img: 'https://th.bing.com/th/id/OIP.AWX4OdiKNkWcQw80HEUh7gAAAA?rs=1&pid=ImgDetMain' }
    ];

    return (
        <div className="collection-wrapper">
            <div className="collections-header">
                <h1>Colecciones</h1>
            </div>
            <div className="collection-list">
                    {Object.entries(collections).map(([key, collection]) => (
                        <div classname="collection-box" key={key}>
                            <CollectionCard 
                                title={collection.title} 
                                img={collection.img}
                                onClick={() => navigate(`/collection/${collection.title}`)}
                            />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default CollectionPage;