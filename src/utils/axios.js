import axios from 'axios';

const axiosService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
});

export default axiosService;
