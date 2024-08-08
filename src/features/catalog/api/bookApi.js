import axios from 'axios';

const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes';
const BOOKCOVER_URL = 'https://bookcover.longitood.com/bookcover';

const fetchCoverFromLongitood = async (isbn) => {
  try {
    const response = await axios.get(`${BOOKCOVER_URL}/${isbn}`);
    console.log("Respuesta de Longitood: ", response.data);
    // Ensure response has the expected structure
    if (response.data && response.data.url) {
      return response.data.url;
    } else {
      console.warn('La respuesta de Longitood no contiene la URL esperada');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la portada desde Longitood: ', error.message);
    return null;
  }
};

const fetchBookData = async (query, isbn) => {
  try {
    const { data } = await axios.get(GOOGLE_BOOKS_URL, { params: { q: query } });
    console.log("Respuesta de Google Books: ", data);
    const book = data.items?.[0];

    if (book) {
      const coverUrl = await fetchCoverFromLongitood(isbn) || book.volumeInfo.imageLinks?.thumbnail;
      return {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || 'Desconocido',
        coverUrl: coverUrl || null,
      };
    }
    throw new Error('No se encontró el libro');
  } catch (error) {
    console.error('Error al obtener datos del libro: ', error.message);
    throw error;
  }
};

export const getBookCoverByTitleAndAuthor = async (bookTitle, authorName) => {
  const query = `intitle:${encodeURIComponent(bookTitle)}+inauthor:${encodeURIComponent(authorName)}`;
  return fetchBookData(query, null);
};

export const getBookCoverByISBN = async (isbn) => {
  const cleanIsbn = isbn.replace(/-/g, '');
  const query = `isbn:${cleanIsbn}`;
  return fetchBookData(query, cleanIsbn);
};
