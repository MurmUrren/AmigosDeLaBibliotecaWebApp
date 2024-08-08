import { useState, useEffect } from 'react';
import { getBookCoverByISBN, getBookCoverByTitleAndAuthor } from '../api/bookApi';

const useBookCover = (book) => {
  const [bookCoverURL, setBookCoverURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCover = async () => {
      setLoading(true);
      try {
        let coverURL;
        if (book.Ean_Isbn13) {
          coverURL = await getBookCoverByISBN(book.Ean_Isbn13);
        } else {
          coverURL = await getBookCoverByTitleAndAuthor(book.Title, book.Creators);
        }
        setBookCoverURL(coverURL.coverUrl || null);
      } catch (error) {
        console.error('Error fetching book cover:', error);
        setBookCoverURL(null); // Set to null to trigger fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, [book]);

  return { bookCoverURL, loading };
};

export default useBookCover;
