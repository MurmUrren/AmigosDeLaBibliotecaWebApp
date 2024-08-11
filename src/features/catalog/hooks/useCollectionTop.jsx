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
    const [topCollection, setTopCollection] = useState(null);

    useEffect(() => {
        const fetchCollectionData = async () => {
            let tc = [];
           //get all collections from supabase and check in the table Genres which one has the most views on the sum of all the genres
            const { data, error } = await supabase
                .from('Collections')
                .select()

            data.map(async (collection) => {
                const { data: genres, error: genresError } = await supabase
                    .from('Genres')
                    .select("Views", { count: 'exact' })
                    .eq('Collection_Id', collection.id)

                let sumTotalViews = genres.reduce((acc, genre) => acc + genre.Views, 0)
                tc.push({ id: collection.id, title: collection.Title, TotalViews: sumTotalViews })
            })

            if (error) {
                console.error('error fetching collections', error)
            }
            if (data) {
                //find the collection with the most views
                setTopCollection(tc)
            }
        }
        fetchCollectionData();
    }, []);

    return topCollection;
};

export default useCollectionTop;
export { useAllViewsCollections };
