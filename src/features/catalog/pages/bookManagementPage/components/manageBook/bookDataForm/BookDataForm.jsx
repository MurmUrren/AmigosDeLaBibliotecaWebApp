import { useState } from "react";
import "./BookDataForm.css";

function BookDataForm({
    bookTitle, setBookTitle,
    authorName, setAuthorName,
    description, setDescription,
    publisher, setPublisher,
    publishedDate, setPublishedDate,
    length, setLength
}) {
    return (
        <div className='manual-add-book-wrapper'>
            <div className='add-book-inputs'>
                <label htmlFor="bookTitleM">Título del libro</label>
                <input
                    id="bookTitleM"
                    type="text"
                    value={bookTitle}
                    onChange={e => setBookTitle(e.target.value)}
                    placeholder="Título del libro"
                />
                <label htmlFor="authorNameM">Nombre del autor</label>
                <input
                    id="authorNameM"
                    type="text"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    placeholder="Nombre del autor"
                />
                <label htmlFor="descriptionM">Descripción</label>
                <textarea
                    id="descriptionM"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descripción"
                />
                <label htmlFor="publisherM">Editorial</label>
                <input
                    id="publisherM"
                    type="text"
                    value={publisher}
                    onChange={e => setPublisher(e.target.value)}
                    placeholder="Editorial"
                />
                <label htmlFor="publishedDateM">Fecha de publicación</label>
                <input
                    id="publishedDateM"
                    type="date"
                    value={publishedDate}
                    onChange={e => setPublishedDate(e.target.value)}
                />
                <label htmlFor="lengthM">Número de páginas</label>
                <input
                    id="lengthM"
                    type="number"
                    value={length}
                    onChange={e => setLength(e.target.value)}
                    placeholder="Número de páginas"
                />
            </div>
        </div>
    );
}

export default BookDataForm;