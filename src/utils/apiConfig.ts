import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

const apiConfig = axios.create({
  baseURL: 'https://rest.coinapi.io/v1/',
  headers: { "X-CoinAPI-Key" : apiKey },
});

export default apiConfig;