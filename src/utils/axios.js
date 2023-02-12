import axios from 'axios';

const axiosService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default axiosService;
