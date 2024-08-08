import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useStorageImages = (collections) => {
    const [collectionImages, setCollectionImages] = useState({});

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

    return collectionImages;
};

export default useStorageImages;