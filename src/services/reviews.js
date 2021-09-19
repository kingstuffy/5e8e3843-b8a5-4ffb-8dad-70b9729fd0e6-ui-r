import axios from 'axios';
import { BASE_API_URL } from 'config/api';

const reviewUrl = `${ BASE_API_URL }/review`;

export const addReview = async (review) => {
  const { data } = await axios.post(reviewUrl, review);
  return data;
};
