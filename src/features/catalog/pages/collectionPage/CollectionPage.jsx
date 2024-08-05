import React, { useState, useEffect } from "react";
import CollectionCard from "@components/collectionCard/CollectionCard";
import supabase from "../../../../config/supabaseClient";
import { useNavigate } from 'react-router-dom';
import './CollectionPage.css';

function CollectionPage() {
    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);
    const [collectionImages, setCollectionImages] = useState({});

    useEffect(() => {
        const fetchCollectionData = async () => {
            const { data, error } = await supabase
                .from('Collections')
                .select()

            if (error) {
                console.error('error fetching collections', error)
            }
            if (data) {
                setCollections(data)
            }
        }
        fetchCollectionData();
    }, []);

    useEffect(() => {
        const fetchCollectionImages = async () => {
            if (collections.length === 0) return;

            const promises = collections.map(async (collection) => {
                const { data, error } = await supabase.storage
                    .from('collectionsimgbucket')
                    .getPublicUrl(`${collection.Title}.jpeg`);

                if (error) {
                    console.error('error fetching collection images', error);
                    return null;
                }
                return { title: collection.Title, url: data.publicUrl };
            });

            const results = await Promise.all(promises);
            const images = results.reduce((acc, result) => {
                if (result) {
                    acc[result.title] = result.url;
                }
                return acc;
            }, {});

            setCollectionImages(images);
        };
        fetchCollectionImages();
    }, [collections]);

    console.log(collectionImages);

    return (
        <div className="collection-wrapper">
            <div className="collections-header">
                <h1>Colecciones</h1>
            </div>
            <div className="collection-list">
                    {collections?.map((collection, index) => (
                        <div classname="collection-box" key={index}>
                            <CollectionCard 
                                title={collection.Title} 
                                img={collectionImages[collection.Title]}
                                onClick={() => navigate(`/collection/${collection.Title}`)}
                            />
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default CollectionPage;