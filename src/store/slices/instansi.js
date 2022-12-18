// project imports
import axios from 'utils/axios';

export async function getInstansi(params) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/instansis`, { params });
  return response.data;
}

export async function getLokasiById(id) {
  const response = await axios.get(`${process.env.BASE_URL_API}/instansi/${id}`);
  return response.data;
}
