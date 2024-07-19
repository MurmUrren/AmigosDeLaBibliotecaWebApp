import { useState } from 'react';
import { getBookCoverByTitleAndAuthor, getBookCoverByISBN } from '../api/bookApi';

export const useBookCover = () => {
  const [coverUrl, setCoverUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoverByTitleAndAuthor = async (title, author) => {
    setLoading(true);
    try {
      const data = await getBookCoverByTitleAndAuthor(title, author);
      setCoverUrl(data.url);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoverByISBN = async (isbn) => {
    setLoading(true);
    try {
      const data = await getBookCoverByISBN(isbn);
      setCoverUrl(data.url);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { coverUrl, loading, error, fetchCoverByTitleAndAuthor, fetchCoverByISBN };
};
