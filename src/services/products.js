import axios from 'axios';
import { BASE_API_URL, DEFAULT_PRODUCT_SLUG } from 'config/api';

const defaultProductUrl = `${ BASE_API_URL }/product/${ DEFAULT_PRODUCT_SLUG }`;

export const getDefaultProduct = async () => {
  const { data } = await axios.get(defaultProductUrl);
  return data.data;
};
