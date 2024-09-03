import React, { useEffect } from "react";
import useStorageImages from "@hooks/useStorageImages";
import useCollections from "@hooks/useCollections";
import useAllBooks from "@hooks/useAllBooks";
import CarrouselTopGenRes from "@components/CarrouselTopGenRes/CarrouselTopGenRes";
import { useNavigate } from 'react-router-dom';
import './CollectionPage.css';

import CollectionCard from "@components/collectionCard/CollectionCard";

function CollectionPage() {
    const navigate = useNavigate();
    const collections = useCollections();
    const collectionImages = useStorageImages(collections); // DEBERIAMOS DE NO USAR EL STORAGE PARA LAS IMAGENES

    const allBooks = useAllBooks();


    const sortAllBooks = (books) => {
        const sortedBooks = books.sort((a, b) => {
            //sort by title
            const titleA = a.Title.toUpperCase();
            const titleB = b.Title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
        }
        );
        return sortedBooks;
    }
    const firstLetterAtThebooks = new Set(allBooks.map((book) => book.Title[0].toUpperCase()));

    return (
        <div className="collection-wrapper">

            <div className="collections-container">
                <div className="collections-header">
                    <h3>Bienvenido a nuestro catalogo, explora nuestra variedad de libros.</h3>
                </div>
                <div className="collection-list">
                    {collections?.map((collection, index) => (
                        <div className="collection-box" key={index}>
                            <CollectionCard
                                title={collection.Title}
                                img={collectionImages[collection.Title]}
                                //enviar el objeto completo con la informacion de la coleccion mas la imagen
                                genre={collection}
                                onClick={() => {
                                    const title = collection.Title.replace(/\s+/g, '-').toLowerCase();
                                    navigate(`/collection/${title}/${collection.id}`);
                                }}
                            />
                        </div>
                    ))}
                </div>
                {collections?.map((collection, index) => (
                    <>
                        <div className="collections-header">
                            <h3>Mas vistos de {collection.Title}</h3>
                        </div>
                        <div className="collection-carrousel">
                            {
                                <CarrouselTopGenRes id={collection.id} />
                            }
                        </div>
                    </>
                ))
                }
                <div className="my-6 flex gap-3 w-11/12 overflow-x-auto no-scrollbar">
                    {Array.from(firstLetterAtThebooks).map((letter, index) => (
                        <a className="dark:bg-slate-50 dark:text-slate-800 p-2 w-16 h-10 rounded-md bg-slate-800 text-white" href={`/#${letter}`} key={index}>{letter}</a>
                    ))}
                </div>
                <div className="w-full h-80 overflow-scroll scroll-smooth no-scrollbar" >
                    <h3>Todos los libros</h3>

                    {sortAllBooks(allBooks)?.map((book, index) => (
                        <div id={book.Title[0]} className="flex gap-6" key={index}>
                            <h2>{book.Title[0]}</h2><p>-</p><h2>{book.Title}</h2>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    );
};

export default CollectionPage;