
import axios from 'axios';

const BASE_URL = 'https://bookcover.longitood.com/bookcover';

export const getBookCoverByTitleAndAuthor = async (bookTitle, authorName) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      book_title: bookTitle,
      author_name: authorName
    }
  });
  return response.data;
};

export const getBookCoverByISBN = async (isbn) => {
  const response = await axios.get(`${BASE_URL}/${isbn}`);
  return response.data;
};
