import { useState, useEffect } from "react";
import supabase from "../../../config/supabaseClient";

const useCollectionTop = () => {
    const [topCollection, setTopCollection] = useState(null);

    useEffect(() => {
        const fetchCollectionData = async () => {
            const tc = [];

            // Obtener todas las colecciones
            const { data: collections, error } = await supabase
                .from('Collections')
                .select();

            if (error) {
                console.error('Error fetching collections:', error);
                return;
            }

            // Obtener las vistas de los géneros y calcular el total de vistas por colección
            const promises = collections.map(async (collection) => {
                const { data: genres, error: genresError } = await supabase
                    .from('Genres')
                    .select("Views")
                    .eq('Collection_Id', collection.id);

                if (genresError) {
                    console.error('Error fetching genres:', genresError);
                    return null;
                }

                const sumTotalViews = genres.reduce((acc, genre) => acc + genre.Views, 0);
                return { id: collection.id, title: collection.Title, TotalViews: sumTotalViews };
            });

            const results = await Promise.all(promises);
            const validResults = results.filter(result => result !== null);

            // Ordenar por TotalViews de mayor a menor
            validResults.sort((a, b) => b.TotalViews - a.TotalViews);

            // Establecer la colección con más vistas
            if (validResults.length > 0) {
                setTopCollection(validResults[0]);
            }
        };

        fetchCollectionData();
    }, []);

    return topCollection;
};

const useAllViewsCollections = () => {
    const [collectionsViews, setCollectionsViews] = useState([]);

    useEffect(() => {
        const fetchCollectionData = async () => {
            let tc = [];

            // Obtener todas las colecciones
            const { data: collections, error: collectionsError } = await supabase
                .from('Collections')
                .select();

            if (collectionsError) {
                console.error('Error fetching collections:', collectionsError);
                return;
            }

            // Obtener las vistas de los géneros y calcular el total de vistas por colección
            const promises = collections.map(async (collection) => {
                const { data: genres, error: genresError } = await supabase
                    .from('Genres')
                    .select("Views")
                    .eq('Collection_Id', collection.id);

                if (genresError) {
                    console.error(`Error fetching genres for collection ${collection.id}:`, genresError);
                    return null;
                }

                const sumTotalViews = genres.reduce((acc, genre) => acc + genre.Views, 0);
                return { id: collection.id, title: collection.Title, TotalViews: sumTotalViews };
            });

            const results = await Promise.all(promises);
            const validResults = results.filter(result => result !== null);

            // Establecer todas las colecciones con sus vistas totales
            setCollectionsViews(validResults);
        };

        fetchCollectionData();
    }, []);

    return collectionsViews;
};

export default useCollectionTop;
export { useAllViewsCollections };
